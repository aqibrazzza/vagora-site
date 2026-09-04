import { defineConfig } from "vite"

// Relative base so the built site deploys from any path (root, a subfolder,
// GitHub Pages) without a rebuild.
export default defineConfig({
  base: "./",
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
