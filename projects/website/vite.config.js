import { fileURLToPath, URL } from "node:url"
import { defineConfig, normalizePath } from "vite"

/* The website is one project inside the Vagora repository, and it consumes the
   repository's canonical asset library rather than keeping a copy of its own:

     <repository root>/
       assets/               ← the one approved library (brand, fonts, imagery, video)
       projects/website/     ← this project

   THE RULE: reference the library by relative path — `../../assets/...` from
   index.html, `../../../../assets/...` from src/styles/main.css. Vite resolves
   those against the file they appear in and bundles what the page references
   into `dist/assets/` with hashed names, exactly as before the move. Nothing is
   copied by hand and there is no symlink to break on Windows.

   The one thing Vite does not do by itself is serve those files during
   development. The build resolves the relative paths; the dev server leaves
   HTML attributes untouched, and a browser normalises `../../assets/x` to
   `/assets/x`, which nothing serves. Vite's own answer for CSS `url()` in the
   same situation is to rewrite the reference to `/@fs/<absolute path>`, so the
   small dev-only plugin below does the same for index.html. `server.fs.allow`
   still governs what `/@fs/` may reach. */
const REPO_ROOT = fileURLToPath(new URL("../..", import.meta.url))
const ASSETS = normalizePath(fileURLToPath(new URL("../../assets", import.meta.url)))

const serveRepositoryAssets = () => ({
  name: "vagora:serve-repository-assets",
  apply: "serve",
  transformIndexHtml: {
    order: "pre",
    handler: (html) => html.replace(/(\s(?:src|href|poster)=")\.\.\/\.\.\/assets\//g, `$1/@fs/${ASSETS}/`),
  },
})

// Relative base so the built site deploys from any path (root, a subfolder,
// GitHub Pages) without a rebuild.
export default defineConfig({
  base: "./",
  plugins: [serveRepositoryAssets()],
  server: {
    fs: {
      // The dev server may serve files from the whole repository, so the
      // library above is reachable. Nothing outside the repository is.
      allow: [REPO_ROOT],
    },
  },
  build: {
    target: "es2020",
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/gsap") || id.includes("node_modules/lenis")) return "motion"
        },
      },
    },
  },
})
