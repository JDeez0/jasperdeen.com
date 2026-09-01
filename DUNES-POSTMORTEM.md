# Dune Banner — Attempt Postmortem

**Goal:** A wide (full-bleed, ~1200–1600px) dune line-art illustration across the top of the home page, matching the hand-drawn style of three reference images provided by Jasper (an engraving-style dune scene, a bold high-contrast dune strip, and a flowing-line study). The references are too narrow to use directly as a banner, so the task was to **learn the style and generate new, wider artwork in it**.

**Outcome:** Not achieved. ~15 iterations across three fundamentally different approaches all failed to reach illustration quality. This document records what was tried, why it failed, and what was learned.

---

## What the references taught us (the "dune grammar")

Before the failed attempts, close analysis of the references established rules that any successful version must follow:

1. **Value comes from line density, not fills** — white paper → sparse lines → tight hatching → merged black, in that order. Shadows in the references are *dense line hatching*, never solid fills.
2. **Lit faces are empty paper** — a face needs only its skyline edge, maybe 1–2 faint contours.
3. **One bold shadow stroke per peak** — whenever there is a near-vertical dark mark, there is exactly one, descending from a peak. Never clusters of vertical lines.
4. **Lines follow form** — contours curve with the sand surface, parallel within a face, never straight, never cross-hatched.
5. **Crisp brink lines** — the crest between lit and shadow faces is a single confident curve, the darkest single stroke in the drawing.
6. **No troughs** — dunes flow together; the skyline rises and falls without valley cut-ins.
7. **Consistent light** — one wind/light direction throughout; every shadow falls on the lee side.
8. **Hierarchy** — one hero dune dominates; supporting dunes are smaller and simpler.

Every attempt below was judged against this grammar, and the strongest failures got progressively closer to it — but never close enough.

---

## Attempt history (chronological)

### Phase 1 — Procedural geometry (labs 1–4)

| Attempt | Approach | Why it failed |
|---|---|---|
| Lab 1 | Catmull-Rom curves through random control points | "Angular tents." Control-point math produces sharp polylines, not flowing sand. Dunes read as triangles. |
| Lab 2 | Sum-of-Gaussians height field + contour extraction | Smooth but anonymous. Looked like a topographic map / weather chart, not a drawing. No line intention. |
| Lab 3 | Offset-stacked skyline contours (like wood-grain) | Uniform line spacing everywhere → zero value contrast. Flat, boring, no lit/shadow distinction. |
| Lab 4 | Per-dune crescent shapes (barchan stamps) | Dunes floated as isolated "tent/mountain" shapes instead of flowing together. Violated the no-troughs rule. |

**Common failure mode:** pure geometry has no *reason* for any line. In a real drawing every line is a decision about form and light; in procedural output every line is just the nearest contour of a function. Viewers feel the difference instantly.

### Phase 2 — Value systems (labs 5–8)

| Attempt | Approach | Why it failed |
|---|---|---|
| Lab 5 | Solid black shadow fills on lee faces | Rejected immediately: "none of our examples had anything like this." References use hatched shadows, not fills. Solid fill also killed the line-art character. |
| Lab 6 | Tapered shadow ribbons (one bold stroke per slip face) | Right idea, wrong execution. Ribbons looked like "grass tufts" — too uniform, too spiky, mechanically repeated. |
| Lab 7 | Gradient line-spacing (density = shadow depth) | The mechanism was correct in theory but the output had no *composition*: density varied smoothly everywhere instead of decisively at brink edges. Looked airbrushed. |
| Lab 8 | Hand-placed control points for one dune, then cloned | The single dune was OK; the clones made the banner obviously repetitive. Compositional variety doesn't survive copy-paste. |

**Common failure mode:** the value system was applied *uniformly by formula* instead of *decisively by composition*. Illustrators make a few bold decisions and let most of the drawing stay quiet; the procedural versions distributed detail evenly, which reads as noise.

### Phase 3 — Learned-from-reference rebuilds (labs 9–12, generator)

| Attempt | Approach | Why it failed |
|---|---|---|
| Lab 9–10 | Full grammar implementation: flowing parallel contours, value via spacing, tapered ribbons, crisp brinks, layered masses | Closest procedural result. Still read as "scribbles" — line families intersected at shallow angles, contour flow contradicted itself between adjacent dunes, no single confident stroke anywhere. |
| Lab 11 | Reduced line count, bolder strokes, longer sweeps | Cleaner but emptier — became generic minimal wave art, losing the dune identity. |
| Lab 12 | Seeded randomness sweep (500 variants rendered, measured ink %/angle histograms against ex-2's measured metrics) | Metrics matched (ink ~28%, angle peaks at 0°/130–140°) but statistical similarity ≠ visual similarity. None of the 500 looked right. |
| dune-generator | Interactive generator with all parameters exposed | Proved the space had no good region: parameter sweeps converge on the same families of failure. |

**Common failure mode:** measurable properties (ink coverage, line angle distributions, density bands) can be matched without the drawing looking right. Style lives in *which* lines are drawn, not in *aggregate* line statistics.

### Phase 4 — Hand-crafted SVG paths (v1–v5, traced)

After the procedural failures, the approach switched to literally hand-authoring path coordinates, using the best reference (ex-2) side-by-side:

| Attempt | Approach | Why it fell short |
|---|---|---|
| v1–v2 | Hand-written skyline + hatched shadow groups | Proportions were off: skylines too low, content too sparse for the 1200×180 viewBox. |
| v3 | Bold hero shadow mass, sharp peaks | Best balance of drama vs. restraint, but shadows still undersized vs. ex-2 and peaks not sharp enough. |
| traced/v4 | Organic tapered crescent shadows hand-drawn per peak | Shadows read as "eyeliner" — thin strips hugging the ridge, not the large lit/shadow face contrast of the reference. |
| v5 | Deliberately oversized shadow crescents with 12 internal white contour lines | Closest overall. Hero shadow finally had mass and internal form. Remaining gaps: shapes too clean/geometric, small-dune shadows too subtle, and overall polish below illustration quality. |

**Honest assessment:** hand-crafting is the right approach and each iteration measurably improved, but the gap between "competent geometric composition" and "confident illustration" did not close. Each hand-iteration is also slow (30+ coordinates per shape, screenshot-verify, adjust), and quality plateaued around v5.

---

## Root causes (why this didn't work)

1. **Style is decision-making, not parameters.** The reference illustrations embody thousands of micro-decisions about where a line goes and — just as importantly — where it *doesn't*. Procedural generation distributes marks by formula; hand-coding paths re-implements the formula one shape at a time. Neither captures judgment.

2. **Self-evaluation can see problems but not fix them.** Comparing output to references reliably identifies *that* something is wrong (too sparse, too mechanical, shadow too small), but translating that observation into corrected coordinates was only marginally better than random search. Visual iteration loops were slow and plateaued.

3. **Aggregate metrics are the wrong target.** Matching ink coverage and angle histograms (lab 12) proved that statistical similarity doesn't produce perceptual similarity.

4. **Scale mismatch.** The references are small, dense works (617–700px). Translating their vocabulary to a 1200–1600px banner required inventing composition the references never demonstrated — and composition is exactly what the failed approaches couldn't do.

---

## What was still gained

- A written **dune grammar** (top of this document) — a usable brief for a human illustrator.
- A tested **integration path**: `Dunes.astro` component, `currentColor` for dark mode, `preserveAspectRatio="none"` strip layout, performance-friendly static SVG.
- A quality bar: side-by-side comparison harness (Playwright screenshots, reference next to output) that makes assessment fast and honest.
- Confirmation that the site works well *without* the banner — shipping can proceed and the banner can land later.

---

## Recommended paths forward

1. **Commission or license an illustration** (or extend one of the reference images). Hand the artist the dune grammar above as the brief. Engineering integration is ready and is a same-day task once art exists.
2. **Human hand-draws, assistant engineers.** Even rough pencil sketches per dune "stamp" could be vectorized, cleaned, and composed across the banner — separating art (human) from arrangement (code).
3. **Ship without the banner.** The site is complete and deployed; the hero works as pure typography. Revisit the illustration when the right art exists.

## Scratch artifacts (in repo, safe to delete)

`dune-generator.html`, `public/dune-lab.html` … `public/dune-lab12.html`, `public/dune-v2.html` … `public/dune-v5.html`, `public/dune-traced.html`, `public/dune-traced2.html`, `public/dune-handcrafted.html`, `public/977e0509-*.png` (reference copy).
