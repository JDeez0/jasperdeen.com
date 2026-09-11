import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Content collection schemas. Zod both validates frontmatter at build time
 * and gives you typed `data` in content pages.
 *
 * Install: Astro 7 loader-based Content Layer API (astro/content.config.ts
 * + `glob()` loader). `draft` + `pubDate` drive the publish filter (see
 * src/lib/content.ts).
 */

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
    // Date for ordering + scheduled publishing. Compare as YYYY-MM-DD.
    pubDate: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Projects are intentionally a looser shape than the blog: they carry a
// one-line blurb, an optional status, and an optional external link, while
// the body (if any) lives in the MD/MDX content below the frontmatter.
const current = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/current" }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
    status: z.enum(["active", "beta", "archived"]).optional(),
    link: z.url().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, current };