# 1995-era conventions vs. today — reference notes

Final take: a plain personal homepage the way someone who didn't care
would make it — Linus's actual 90s homepage energy. No costume pieces
(no marquee/blink/badges/sidebar/starfield — all tried and stripped).

## What the page is
White background, default Times New Roman 12pt, h1 name, two short
sections of bullet lists, one `<hr>`, mailto + last-updated + copyright.
Five links total. Zero tables, zero images, zero JS beyond the framework
mount.

## Era vs. modern (jasperdeen.com main)

| 1995 (this page) | Today |
|---|---|
| Default serif, 12pt, line-height 1.2 — the OS picks the font | Custom fonts (Instrument Serif / Libre Caslon), tuned type scale |
| System link colors #0000EE / #551A8B / #FF0000, underline always | Custom link styling, no visited-color signaling |
| Pure #000 on #fff, gray `#808080` rules | Tinted muted palette, dark mode, hairline keylines |
| Document flow: h1 → paragraphs → `<ul>` lists → `<hr>` → footer line | Composition-first hero, scroll-driven pinned narrative |
| Content width was whatever the window was | Responsive, viewport-relative sizing |
| Hinted/aliased bitmap text rendering (pre-ClearType) | Invisible hinting, subpixel AA everywhere |
| Page as a list of facts; nobody "designed" it | Every pixel deliberate |

## What was tried and rejected (kept here so we don't repeat)
- Full-width table mosaic with sidebar nav, navy banner, silver chrome —
  "way overbuilt"
- Starfield tiled background, marquee, blinking NEW!, rainbow divider
  bars, Netscape badges, webring, hit counter, guestbook — pastiche,
  signals "1995 costume" instead of just being a 1995 page
---

# Knuth-Plass line breaking (the recipe — reuse for blog subpages)

**Status: the chosen long-form formatting technique.** The tex-linebreak
(Knuth-Plass total-fit + justification) approach from wall-of-shame was
tried and REVERTED — justified text looked worse here. We use ragged-right
minimum-raggedness KP on long-form prose instead.

## Files
- `src/kp.js` — the algorithm. DP over word boundaries minimizing
  Σ(leftover space)² across all lines but the last (ragged-right KP
  simplification — no stretch/shrink glue needed without justification).
  Word widths + space width (`"x x" − 2·"x"`) come from
  `@chenglou/pretext` (canvas measurement, browser font engine as ground
  truth — widths match DOM rendering). Memoized per token+font.
- `src/KPBlock.jsx` — Solid component: measures its own box AFTER mount
  (see gotcha #1), breaks `props.text` at `clientWidth − 1` (see gotcha
  #3), renders lines as `span.fmt-line` (display:block, inherits
  line-height). Recomputes on window resize. `props.prefix` prepends a
  bold lead-in ("Q: ") that is measured as part of the text.

## Usage (as in App.jsx)
```jsx
<KPBlock cls="intro" font="17px Georgia, 'Times New Roman', serif"
         prefix="Q" text={m.text} />
```
CSS: `.fmt-line { display: block; }` — spacing untouched, only break
points are ours.

## Gotchas (all hit, all fixed — do not rediscover)
1. **Measure after mount, not at render.** `clientWidth` is 0 while the
   element is outside the DOM. KPBlock computes in `onMount`.
2. **Pretext gotchas:** JSX comments render "undefined" in Solid (not
   pretext's fault, but same session); pretext itself is greedy first-fit
   only — KP is ours, on top of its measurements.
3. **1px epsilon** on max width: never trust a measured fit at exactly
   the box edge.
4. **Font string must match CSS exactly** (canvas font vs computed style):
   `17px Georgia, 'Times New Roman', serif`.
5. **Vite dep cache goes stale when swapping deps** (504 Outdated Optimize
   Dep / unresolvable import): `rm -rf node_modules/.vite && npm install
   && npm run dev -- --force`.
6. **Bold width delta**: prefix measured in regular weight; at body sizes
   the delta is sub-pixel, absorbed by the epsilon. If formatting display-
   size text with bold prefixes, measure the prefix separately.
7. **Re-flow on resize is handled** (window resize listener). Blog pages:
   wrap each long-form paragraph in KPBlock; content column is fluid, so
   breaks track the viewport.

## For blog subpages specifically
- Long-form prose → one KPBlock per paragraph (or per text node between
  inline elements). Inline links/bold inside a paragraph need the prefix
  treatment generalized (measure inline run widths, render first-N lines
  with their runs) — only build that when a post actually needs it.
- Keep headings, lists, and the footer un-KP'd (short lines, links).
