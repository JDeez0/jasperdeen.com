# Writing content

This site's content is plain Markdown files in this repo — one file per
post/entry. There is **no CMS and no database**: create a file, it becomes a
page.

## Places things live

- **Blog posts** → `src/content/blog/*.md`
- **Current work tiles** → `src/content/current/*.md`
- Reusable templates → `content-templates/` (copy one and fill it in)

## How to write a post

**Easy path (recommended):** scaffold a file with today's date and an empty
draft, then open it in any editor:

```bash
npm run new-post -- "My title"
```

Then edit `src/content/blog/YYYY-MM-DD-my-title.md`. Run `npm run dev` and
open `http://localhost:4321/blog/` to preview. `draft: true` keeps it hidden
from the public list until you're ready.

**Manual path:** copy `content-templates/blog_TEMPLATE.md` into
`src/content/blog/`, rename it `YYYY-MM-DD-your-slug.md`, and fill in the
frontmatter + body.

## Frontmatter fields (top of every file, between the `---` lines)

Blog:
```
title        — the heading (required)
description  — one line for the tile card + RSS
pubDate      — YYYY-MM-DD, orders the list, enables scheduling
tags         — optional list, shown as categories in RSS
draft        — true hides it from the public site
```

Current tile:
```
title        — required
description  — the card text
status       — optional: active | beta | archived
link         — optional external URL
tags         — optional
```

Scheduling: set `pubDate` to a future date and it won't appear until after
that day's first build. Drafts are always hidden from production.

## Markdown

Anything GitHub-Flavored Markdown: headings, bold/italic, lists, tables,
footnotes, code blocks. `.mdx` files (same folder) also allow embedding
components if you ever need interactive content.

## Publishing

This is a static build. To make a new post go live: build + deploy. See the
deployment setup (in progress) — the build is `npm run build`. Drafts and
future-dated posts are excluded from `npm run build` automatically.