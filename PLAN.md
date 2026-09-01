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
- Procedurally generated **inline SVG** (rendered once at build time → static, zero runtime JS).
- **Physics-first dune model**: layered receding ridges, each with a firm **crest** line,
  a dark **slip face** right below the crest, and a lighter **windward** face toward the
  next ridge.
- **Curved, surface-following shading**: every hatch line is an offset + laterally-sheared
  copy of the crest curve, so lines follow the dune's curvature and stay parallel/connected
  to the crest (no disconnected strokes).
- **Multiple directions**: horizontal contours + down-right windward diag + steep down-left
  slip diag + sparse opposite lean in the front shadows.
- **Graded density**: darkest under each crest, fading to light toward the next ridge;
  front dunes darker than back (atmospheric depth).
- `currentColor` ink, `vector-effect: non-scaling-stroke` → crisp, adapts to dark mode.
- Calibrated against the reference: ~24% ink, 0→42%→12% vertical gradient, multi-direction
  angle histogram.

### Tunables (all in `Dunes.astro` + `global.css`)
- Crest geometry: `layerDefs[].base/amp/f1/f2/ph1/ph2` (height, amplitude, waviness).
- Shading density: `sC` (contours), `sH` (windward diag), `sCore` (slip), `sCross` (cross).
- Slip-face extent: `core` = [from,to] fractions of the strip height.
- Lean/direction: `lxH`, `lxCore` (down-right / down-left shear).
- Band height: `--dunes-h` in `global.css`.
