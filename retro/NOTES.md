# 1995-era web conventions vs. today — reference notes

Compared against how the modern site (the Astro `main` branch) does things.

## Overall design & layout

| 1995 | Today (jasperdeen.com main) |
|---|---|
| Pages are **documents**, not apps: one long scrolled column, navigation by links and `<a name>` anchors | Structured layouts, fixed nav, scroll-driven narrative (pinned conversation) |
| **640px fixed-width table layout** (or full-bleed); designed for 640×480 / 800×600 monitors | Responsive, viewport-relative (`svh`, clamp), mobile-first |
| Structure = `<table>`s, `<hr>` rules, 1px black borders, `<th>` with gray `#c0c0c0` fill | Structure = CSS grid/flexbox, hairline keylines, spacing systems |
| **Default browser styling embraced**: blue underlined links, purple visited, serif body | Full custom design system (type scale, colors, dark mode, custom fonts) |
| Content-first: About Me / Interests / Cool Links / What's New / Guestbook | Composition-first: hero stack, animation timing, visual hierarchy |
| "Best viewed in Netscape Navigator 800×600" badges, "Under Construction" GIFs | Deliberate polish everywhere; shipping unfinished is a bug |
| Hit counters, guestbooks, `mailto:` links, `last updated` timestamp | No visitor metrics on page; contact via forms/modern channels |
| Everything local, everything text; images were precious (56k modem) | Fonts, SVG art, animations, rich media |

## Typography & text rendering (the small stuff)

| 1995 | Today |
|---|---|
| **Times New Roman 12pt serif default** (or Courier for `pre`/counters) — the font is chosen by the OS, not the site | Custom fonts (Instrument Serif / Libre Caslon via `@fontsource`), deliberate display scale |
| Base line-height ~1.2 (browser default), no letter-spacing control | Tuned line-height/spacing per element; unified 1.0625rem body scale |
| **Text rendering was hinted & aliased**: at 12pt Times rendered from bitmaps on Win95, slightly crunchy stems; ClearType came in 2000; Macs had light AA (the "blurry" complaints) | Subpixel + grayscale antialiasing everywhere; `font-smoothing`, hinting invisible at normal sizes |
| `<b>` and `<i>` were physical markup; `<font size="+1">` for emphasis steps | Semantic weights, variable font weights, tracking control |
| Link colors were *state-based, system-default* (#0000EE / #551A8B / #FF0000) | Custom link styling, no visited-color signaling |
| White (or gray `#c0c0c0` / tiled texture) backgrounds, pure `#000` text | Tinted palette, muted greys (`--muted`, `--outline`), dark mode |
| No kerning control, no ligatures, no font synthesis worries | Optical sizing, kerning on by default |

## This app's specific era-choices

- Fixed 640px centered `<table class="layout">` with real `border=1` tables for data
- Times New Roman 12pt, line-height 1.2, **no font smoothing overrides** (keeps the era crunch)
- Era-default link colors incl. red `:active`; underline always; nothing hovers-decorated
- Flat 1px gray `<hr>` rules as the main rhythm device
- Black `#000` on white `#fff` only; accent = gray `#c0c0c0` header fills, green-on-black counter
- Guestbook + hit counter (SolidJS reactivity, but behaving like a CGI script)
- "Under Construction" bar, "Best viewed in Netscape", `last updated` stamp

(The "Under Construction" bar uses `repeating-conic-gradient` as a checker — a 2026 trick
faking a 1996 dithered GIF.)