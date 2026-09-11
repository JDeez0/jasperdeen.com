import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://jasperdeen.com",
  integrations: [mdx()],
  // Astro 7's default Sätteri (Rust) markdown compiler is used for .md and
  // .mdx automatically — GFM tables/strikethrough/task lists and smart
  // punctuation are on by default.
});