import { defineConfig } from "vite";
import { resolve } from "path";
import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync(resolve(__dirname, "package.json"), "utf-8")) as { version: string };

export default defineConfig(({ command }) => {
  const isDev = command === "serve";

  return {
    // Single source of truth for the version shown in the UI — bumping
    // package.json is enough, no hardcoded strings in components.
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
    },

    // In production, assets must be served from /leneda-panel/static/ (matches panel.py).
    // In dev, Vite's root "/" is fine — no iframe rewriting needed.
    // If VITE_BASE_URL is set (e.g. for GitHub Pages), use that.
    base: process.env.VITE_BASE_URL || (isDev ? "/" : "/leneda-panel/static/"),

    build: {
      // Output built files directly into the integration's frontend/ directory
      outDir: resolve(__dirname, "../custom_components/leneda/frontend"),
      emptyOutDir: true,
      rollupOptions: {
        input: resolve(__dirname, "index.html"),
      },
    },

    server: {
      port: 5175,
      open: false,
    },

    // Dev-only: load the mock/live API plugin
    plugins: isDev
      ? [
          // Lazy-load to avoid importing dev deps in production builds
          (async () => {
            const { lenedaDevApi } = await import("./dev/dev-server-plugin");
            return lenedaDevApi();
          })() as any,
        ]
      : [],

    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
  };
});
