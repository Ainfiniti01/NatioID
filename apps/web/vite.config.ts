import path from "node:path";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import tsconfigPaths from "vite-tsconfig-paths";
import { reactRouter } from "@react-router/dev/vite";
import { reactRouterHonoServer } from "react-router-hono-server/dev";
import { addRenderIds } from "./plugins/addRenderIds";
import { aliases } from "./plugins/aliases";
import consoleToParent from "./plugins/console-to-parent";
import { layoutWrapperPlugin } from "./plugins/layouts";
import { loadFontsFromTailwindSource } from "./plugins/loadFontsFromTailwindSource";
import { nextPublicProcessEnv } from "./plugins/nextPublicProcessEnv";
import { restart } from "./plugins/restart";
import { restartEnvFileChange } from "./plugins/restartEnvFileChange";

// ✅ Normalize Windows paths for consistency
const resolvePath = (...segments: string[]) => path.resolve(process.cwd(), ...segments);

export default defineConfig({
  envPrefix: "NEXT_PUBLIC_",

  // ✅ Client build config
  build: {
    outDir: "build/client",
    emptyOutDir: true,
    sourcemap: false,
    target: "esnext", // Enables modern syntax + top-level await
  },

  // ✅ SSR configuration for Node runtime
  ssr: {
    target: "node",
    noExternal: ["react-router", "hono"],
  },

  optimizeDeps: {
    include: ["fast-glob", "lucide-react"],
    exclude: [
      "@hono/auth-js/react",
      "@hono/auth-js",
      "@auth/core",
      "hono/context-storage",
      "@auth/core/errors",
      "fsevents",
      "lightningcss",
    ],
  },

  logLevel: "info",

  plugins: [
    nextPublicProcessEnv(),
    restartEnvFileChange(),

    // ✅ Hono SSR integration — no `build` key inside
    reactRouterHonoServer({
      serverEntryPoint: "./__create/index.ts",
      runtime: "node",
    }),

    babel({
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      exclude: /node_modules/,
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: ["styled-jsx/babel"],
      },
    }),

    restart({
      restart: [
        "src/**/page.jsx",
        "src/**/page.tsx",
        "src/**/layout.jsx",
        "src/**/layout.tsx",
        "src/**/route.js",
        "src/**/route.ts",
      ],
    }),

    consoleToParent(),
    loadFontsFromTailwindSource(),
    addRenderIds(),
    reactRouter(),
    tsconfigPaths(),
    aliases(),
    layoutWrapperPlugin(),
  ],

  resolve: {
    alias: {
      lodash: "lodash-es",
      "npm:stripe": "stripe",
      stripe: resolvePath("src/__create/stripe"),
      "@auth/create/react": "@hono/auth-js/react",
      "@auth/create": resolvePath("src/__create/@auth/create"),
      "@": resolvePath("src"),
    },
    dedupe: ["react", "react-dom"],
  },

  clearScreen: false,

  server: {
    allowedHosts: true,
    host: "0.0.0.0",
    port: 4000,
    hmr: { overlay: false },
    warmup: {
      clientFiles: [
        "./src/app/**/*",
        "./src/app/root.tsx",
        "./src/app/routes.ts",
      ],
    },
  },
});
