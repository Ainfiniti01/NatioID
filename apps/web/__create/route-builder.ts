import { readdir, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { Hono } from 'hono';
import type { Handler } from 'hono/types';
import updatedFetch from '../src/__create/fetch';

const API_BASENAME = '/api';
const api = new Hono();

// ✅ Use project root instead of relative path
const __dirname = resolve(process.cwd(), 'src/app/api');

if (globalThis.fetch) {
  globalThis.fetch = updatedFetch;
}

// 🔍 Recursively find all route.js files
async function findRouteFiles(dir: string): Promise<string[]> {
  const files = await readdir(dir);
  let routes: string[] = [];

  for (const file of files) {
    try {
      const filePath = join(dir, file);
      const statResult = await stat(filePath);

      if (statResult.isDirectory()) {
        routes = routes.concat(await findRouteFiles(filePath));
      } else if (file === 'route.js') {
        if (filePath === join(__dirname, 'route.js')) {
          routes.unshift(filePath);
        } else {
          routes.push(filePath);
        }
      }
    } catch (error) {
      console.error(`Error reading file ${file}:`, error);
    }
  }

  return routes;
}

// 🧩 Convert route file path to Hono route path
function getHonoPath(routeFile: string): { name: string; pattern: string }[] {
  const relativePath = routeFile.replace(__dirname, '');
  const parts = relativePath.split(/[\\/]/).filter(Boolean); // ✅ cross-platform
  const routeParts = parts.slice(0, -1);
  if (routeParts.length === 0) return [{ name: 'root', pattern: '' }];

  const transformedParts = routeParts.map((segment) => {
    const match = segment.match(/^\[(\.{3})?([^\]]+)\]$/);
    if (match) {
      const [, dots, param] = match;
      return dots === '...'
        ? { name: param, pattern: `:${param}{.+}` }
        : { name: param, pattern: `:${param}` };
    }
    return { name: segment, pattern: segment };
  });
  return transformedParts;
}

// 🧠 Import & register all routes
async function registerRoutes() {
  const routeFiles = (
    await findRouteFiles(__dirname).catch((error) => {
      console.error('Error finding route files:', error);
      return [];
    })
  )
    .slice()
    .sort((a, b) => b.length - a.length);

  api.routes = [];

  for (const routeFile of routeFiles) {
    try {
      // ✅ Convert absolute path to file:// URL for Windows compatibility
      const routeFileUrl = pathToFileURL(routeFile).href;
      const route = await import(/* @vite-ignore */ `${routeFileUrl}?update=${Date.now()}`);

      const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

      for (const method of methods) {
        if (!route[method]) continue;

        const parts = getHonoPath(routeFile);
        const honoPath = `/${parts.map(({ pattern }) => pattern).join('/')}`;

        const handler: Handler = async (c) => {
          const params = c.req.param();
          if (import.meta.env.DEV) {
            const updatedRoute = await import(
              /* @vite-ignore */ `${routeFileUrl}?update=${Date.now()}`
            );
            return await updatedRoute[method](c.req.raw, { params });
          }
          return await route[method](c.req.raw, { params });
        };

        switch (method.toLowerCase()) {
          case 'get':
            api.get(honoPath, handler);
            break;
          case 'post':
            api.post(honoPath, handler);
            break;
          case 'put':
            api.put(honoPath, handler);
            break;
          case 'delete':
            api.delete(honoPath, handler);
            break;
          case 'patch':
            api.patch(honoPath, handler);
            break;
        }
      }
    } catch (error) {
      console.error(`❌ Error importing route file ${routeFile}:`, error);
    }
  }
}

// 🔄 Initial route registration
await registerRoutes();

// 🔥 Hot reload routes in development
if (import.meta.env.DEV) {
  import.meta.glob('../src/app/api/**/route.js', { eager: true });
  if (import.meta.hot) {
    import.meta.hot.accept(() => {
      registerRoutes().catch((err) => {
        console.error('Error reloading routes:', err);
      });
    });
  }
}

export { api, API_BASENAME };
