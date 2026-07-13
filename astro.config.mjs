import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: "static",
  site: process.env.SITE_URL ?? "http://localhost:4321",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes("/404"),
    }),
  ],
});
