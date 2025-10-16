import path from "node:path";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import tsconfigPaths from "vite-tsconfig-paths";
import { reactRouter } from "@react-router/dev/vite";
import { addRenderIds } from "./plugins/addRenderIds";
import { aliases } from "./plugins/aliases";
import consoleToParent from "./plugins/console-to-parent";
import { layoutWrapperPlugin } from "./plugins/layouts";
import { loadFontsFromTailwindSource } from "./plugins/loadFontsFromTailwindSource";
import { nextPublicProcessEnv } from "./plugins/nextPublicProcessEnv";
import { restart } from "./plugins/restart";
import { restartEnvFileChange } from "./plugins/restartEnvFileChange";

const resolvePath = (...segments: string[]) => path.resolve(process.cwd(), ...segments);

export default defineConfig({
  envPrefix: "NEXT_PUBLIC_",
base: "/",
  // ✅ Build output for static hosting
  build: {
    outDir: "build/client",
    emptyOutDir: true,
    sourcemap: false,
    target: "esnext",
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"), // ensures index.html entry
    },
  },

  // ✅ No SSR
  // ssr: false,

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
    allowedHosts: ["localhost"],
    host: "0.0.0.0",
    port: 4000,
    hmr: { overlay: false },
  },
});
