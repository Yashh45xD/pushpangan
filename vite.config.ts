// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsxDevShim = path.resolve(__dirname, "./src/lib/jsx-dev-runtime-shim.ts");

export default defineConfig(({ command }) => {
  const isBuild = command === "build";
  return {
    tanstackStart: {
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
      // nitro/vite builds from this
      server: { entry: "server" },
    },
    // Target Vercel's Node.js runtime for Nitro SSR builds.
    nitro: {
      preset: "vercel",
      alias: {
        "react/jsx-dev-runtime": jsxDevShim,
      },
    },
    react: {
      jsxRuntime: "automatic",
      jsxImportSource: "react",
    },
    vite: {
      esbuild: {
        ...(isBuild ? { jsxDev: false } : {}),
      },
      resolve: {
        alias: {
          "react/jsx-dev-runtime": jsxDevShim,
        },
      },
      ssr: {
        external: ["tslib"],
      },
    },
  };
});



