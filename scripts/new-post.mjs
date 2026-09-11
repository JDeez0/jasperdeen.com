#!/usr/bin/env node
// Scaffold a new blog post from the template with today's date.
// Usage: npm run new-post -- "My Title"
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const arg = process.argv.slice(2).join(" ").trim();
if (!arg) {
  console.error('Usage: npm run new-post -- "Your post title"');
  process.exit(1);
}

const root = fileURLToPath(new URL("..", import.meta.url));
const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const slug = arg
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

const dir = join(root, "src/content/blog");
const file = join(dir, `${today}-${slug}.md`);
mkdirSync(dir, { recursive: true });

const template = `---
title: "${arg}"
description: "One line for the tile card and RSS."
pubDate: ${today}
tags: []
draft: true
---

Write here.
`;

writeFileSync(file, template);
console.log(`Created: ${file}\nEdit it, then run \`npm run dev\` to preview.`);