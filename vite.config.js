import { defineConfig } from "vite"
import multipage from "vite-plugin-multipage"

export default defineConfig({
  plugins: [
    multipage({
      mimeCheck: true,
      open: "/",
      pageDir: "./src/pages",
      purgeDir: "./src/pages",
      removePageDirs: true,
    }),
  ],
})