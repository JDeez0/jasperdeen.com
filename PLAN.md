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
- **Connected crescent-dune field** on the corrected anatomy: a long gentle CONVEX
  windward ramp rising to the brink/crest, then a STEEP slip face descending the FULL
  dune height (~30-34°, angle of repose) to the toe, then flat trough before the next
  dune. Crest = where the two incline families meet at an obtuse angle.
- **Three line families per layer** (drawn back→front):
  1. Windward ripple contours — curvy lines flowing down each ramp, flattening into
     troughs (per-dune families that merge). Light.
  2. Slip-face shading — dense curved concave strokes down the full face + cross
     strokes (front layers darker). Dark.
  3. Crest stroke — a separate upright curved line over the peak and down the slip
     edge, moderate variety (arc / lean / verticalish / sweep). Heavier.
- **Wind direction same everywhere** (left→right; slip faces all right).
- **2–3 staggered layers**, front overlaps/occludes, back peeks through troughs;
  ground ripple lines fill the bottom of the band.
- Static SVG, zero runtime JS, `currentColor` + `non-scaling-stroke`, deterministic
  seeded RNG — consistent at any width.

### Tunables (all in `Dunes.astro`)
- `layers[]` — dune count (`n`), base level (`by`), height range, phase stagger, slip
  density (`slipN`).
- `buildDune()` — crest stroke styles array, ripple count/fractions, slip stroke
  geometry, windward ramp shape.
- Seed (`mulberry32(seed)`) changes the whole field deterministically.
- Band height: `--dunes-h` in `global.css`.
