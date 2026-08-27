// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Override the default cloudflare-module preset to target Vercel's Node.js runtime.
  // Without this, the SSR bundle is built for Cloudflare Workers and the
  // react/jsx-runtime module fails to resolve, causing the jsxDEV crash.
  nitro: {
    preset: "vercel",
  },
  vite: {
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    esbuild: {
      jsx: "automatic",
      jsxDev: false,
    },
    ssr: {
      // Don't bundle React into the SSR output — let it resolve from node_modules
      // at runtime so the correct production jsx-runtime is used.
      noExternal: [],
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "react-dom/server",
      ],
    },
  },
});
