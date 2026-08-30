# jasperdeen.com

Personal site for Jasper Deen — a static, two-page site built with
[Astro](https://astro.build) 7 + Tailwind CSS v4.

## Pages

- `/` — the landing page: a minimal hero ("Jasper Deen", caption, intro,
  question, and answer) followed by a scroll-revealed dialogue styled as an
  SMS/iMessage conversation. Reader's hypothetical thoughts sit on the right,
  Jasper's replies on the left.
- `/blog/` — empty stub for future writing.

## The landing conversation

- Copy lives in `src/data/chat.ts` — add/remove messages there without
  touching markup or animation code.
- Messages fly up as they enter the viewport using **pure CSS scroll-driven
  animations** (`animation-timeline: view()`): zero JS, runs on the
  compositor thread.
- Progressive enhancement: with JS/scroll-timeline unsupported, or under
  `prefers-reduced-motion`, all messages are simply visible. No scroll
  hijacking anywhere — content is a normal readable document.

## Commands

```bash
npm install     # install dependencies
npm run dev     # dev server (localhost:4321)
npm run build   # static build → dist/
npm run preview # preview the production build
npm run check   # astro check (types)
```

## Deployment

GitHub Pages via `.github/workflows/deploy.yml` (Actions → Pages artifact).

1. Push or merge to `main`.
2. In the repo settings, set **Settings → Pages → Source** to **GitHub Actions**.
3. Add the `jasperdeen.com` CNAME (already in `public/CNAME`) under
   **Settings → Pages → Custom domain**.