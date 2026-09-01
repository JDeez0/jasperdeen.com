# Dev plan — jasperdeen.com (Astro)

Tracked as we go. `main` is the active Astro site; `hugo-site` branch holds the old Hugo site.

## Open design questions (defer until later — do not lose)
These came up during home-screen polish and still need decisions. Plain-language versions:

1. **Hero composition** — where things sit on the first screen. Current: full-screen stack of
   name → caption → intro → question → answer (answer pinned to the bottom). To decide: keep the
   full-screen stack, or change spacing/order/alignment?
2. **Animation feel** — fly-up distance, speed, springiness, how far up the screen a bubble
   triggers, and whether consecutive bubbles should stagger slightly. Current knobs live in
   `src/layouts/Base.astro` (JS thresholds) and `src/styles/global.css` (transition + distance/scale).
3. **Bubble styling** — corner radius, padding, max width, border weight, left/right alignment,
   and confirming the outlined (no fill/color) look.
4. **Page-level polish** — footer content, header/nav behavior, hover states, any motion for the
   hero answer itself.

## Current task — sand-dune line art across the top (below the header)
### Reference image analysis (done, programmatic — model cannot view images directly)
- Source: 700×700 PNG, pure white background (RGB 255,255,255), black ink, ~9.3% ink coverage.
- The art is a **horizontal band** ~700px wide × ~184px tall (y ≈ 265–449) — a line of dunes
  spanning the full width, not a full square composition.
- **Composition**: one continuous, undulating **ridge/crest line** runs across the whole width
  with ~6 rounded peaks; this crest is the top outline of the dunes.
- **Shading technique**: below the ridge, dune bodies are shaded with **hatching** — many short,
  near-parallel diagonal strokes. Direction rotates dune-to-dune (each face hatched along its own
  slope); density peaks toward the middle of the band and tapers to nothing at the crest and base.
  Single uniform stroke weight (~1–2px), no fills, no grays — pure line shading (pen-and-ink style).

### Recreation approach (BUILT — `src/components/Dunes.astro`)
- **Crescent/sickle dune field**, procedurally generated, deterministic seeded RNG.
- **One reusable `buildDune()` unit**: crest (gentle windward rise → peak → short steep slip
  face), dense slip-face shadow (short near-vertical strokes + cross strokes, front layers),
  long windward ripple contours trailing toward the next dune.
- **12–16 dunes** across the width in **2–3 staggered layers** (back small/high/light → front
  large/low/dark); layers peek through gaps; a few low wide ridge dunes mixed in (~25%).
- **Orientation varies coherently**: slip-side direction follows a smooth function of
  position (groups, not random flapping).
- **Light/shadow contrast**: dark dense slip faces vs light sparse windward sides;
  ground ripple lines fill the bottom of the band.
- Static SVG, zero runtime JS, `currentColor` + `non-scaling-stroke` (crisp, dark-mode safe).
- **Consistent at any width** — just re-run the seeded generator with more/less width.

### Tunables (all in `Dunes.astro`)
- `layerPlan[]` — per layer: dune count (`n`), `footY`, height/width ranges, slip-face
  density (`slipN`), ripple count, phase stagger, orientation phase.
- `buildDune()` — crest curve shape, slip stroke length/fan, ripple length/curve.
- Seed (`mulberry32(seed)`) changes the whole field deterministically.
- Band height: `--dunes-h` in `global.css`.
