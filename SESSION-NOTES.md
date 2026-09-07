# Session notes — 2026-09-06 (one-way latch + scroll-up pin release — IMPLEMENTED & VERIFIED)

Reworked the home dialogue's scroll behavior. Read this before touching the reveal code.

## What we ACCOMPLISHED (all verified with Playwright probes, /tmp/pwtest/)

1. **One-way bubble latch.** Once a bubble reveals it NEVER hides again (until page
   refresh). Scrolling up no longer unwinds/re-flies bubbles. The old `HYST`/`outAt`
   unwind logic was deleted entirely.
2. **One-way pin release on scroll-up.** The sticky pin releases when the user scrolls
   up more than `RELEASE_UP = 10` px below the high-water mark (`peak`), but only once
   the pin is actually STUCK (its viewport top ≤ the sticky offset — hero jitter can't
   trigger it). Release is a **one-way tripwire below the peak**, not a per-event delta
   — immune to trackpad wobble and down-up oscillation. The 10px threshold follows the
   industry-standard pattern (Headroom.js `tolerance`, Peek.js default 5px, NN/g's
   "scroll more than a few pixels"); our high-water-mark variant is the more robust
   form of it. Once released, the pin NEVER re-sticks (until refresh) — no re-stick
   teleport, ever.
3. **Zero-jump release mechanics** (the thing attempts #1/#2 kept breaking):
   - measure the pin's visual offset from its flow slot while STILL sticky,
   - swap `position: static` + `transform: translateY(shift)` (visual no-op),
   - collapse the runway (`chat.style.height = ""`, clear the planner's pin padding),
   - if the shrink would clamp scrollY, scroll up by exactly the clamped amount and add
     it to the transform — nothing the user sees moves.
   Probe-verified **0px visual jump** across the release at vh 600/800/900.
4. **Post-release reveals** switch to viewport-entry (row top < vh − 40). The ROW
   (`.chat-row`) is measured, never the bubble — the bubble carries the 44vh entrance
   transform and `getBoundingClientRect`/IntersectionObserver INCLUDE transforms
   (CSSOM View + IntersectionObserver specs), so measuring the bubble would trigger
   ~44vh late. Rows never transform.
5. **Research-driven hardening** (all researched first, see convo):
   - scrollY clamped with `Math.max(0, …)` everywhere (iOS rubber-band goes negative);
   - `peak` initializes to the load-time scrollY (mid-page refresh / back-nav scroll
     restoration can't instantly release); verified: mid-load → no release, up-scroll
     then releases correctly;
   - resize re-plans ONLY when width changes — mobile URL-bar collapse/expands churn
     `innerHeight` during scroll and fire spurious resizes (iOS fires them mid-scroll,
     Android throttles/misses them); height-only changes are ignored;
   - bfcache restores the entire JS heap + scroll position atomically, so the latch
     and released state survive back/forward perfectly — never add an `unload`
     listener to this site (kills bfcache);
   - the rAF polling loop is the scroll mechanism ON PURPOSE: iOS scroll events don't
     fire during momentum, but scrollY does update. Do not "optimize" it into a
     scroll-event listener.

## What we REMOVED / changed deliberately

- **`HYST` (60px) and the whole unwind branch** — dead code under the latch.
- **The "every pass is identical" position-purity invariant** — intentionally traded
  away: first scroll-down differs from every later pass (later = everything stays).
- **The release planner's re-stick assumptions** — the planner still handles SHORT
  viewports on the way down (delayed thresholds, pin padding, runway sized to the
  release line U), but its "CSS naturally re-sticks on scroll-up" behavior is now
  superseded: any meaningful up-scroll releases permanently. `plan()` no-ops once
  released; resize re-plan too.
- **`.pin { min-height: 100vh }` → `100svh`** — vh = LARGE viewport on mobile, so the
  pinned screen was taller than the visible screen with the URL bar shown, skewing
  every fold calculation. Hero already used svh.
- **NEW: `html.js-scrub .pin { overflow: clip }`** — hidden bubbles sit at
  `translateY(44vh)`, and unclipped those displaced boxes inflated the document's
  scrollable overflow, making `scrollHeight` depend on how many bubbles had revealed
  (docH decayed during post-release reveals — a latent scroll-clamp risk).
  `overflow: clip` (NOT `hidden` — that would create a scroll container and kill
  sticky) pins the scroll area; the clip line sits at/below the fold whenever a
  bubble is flying, so it's never visible. Verified: docH constant post-release.

## Verified behaviors (release-probe.mjs + edges.mjs in /tmp/pwtest/)
- 0px pin jump across release (vh 600/800/900); docH collapse clean; 0px leftover
  scroll below footer; no oscillation under 10 up/down wiggles; hero jitter does NOT
  release; mid-page load does NOT release; latch never decreases shown-count.
- On release, bubbles still hidden but inside the pinned viewport reveal at once
  (a quick fly-in burst) — inherent to the latch; the alternative is invisible gaps
  in the thread.

## Not done / open
We **reverted** the footer/scroll rework back to the committed known-good state (git HEAD,
`e2534a4`) and kept only the changes that were stable and wanted. If you see this note in the
future, the project is back to the original working scroll system, and the below documents what
happened so we don't re-walk the same rabbit hole.

---

# Session notes — 2026-09-04 (footer scroll rework, theme toggle, copy)

Summarized from a long interactive session on the jasperdeen.com Astro site (`~/jasperdeen-site`, `main` branch).

What happened this session:

1. **Copy** — `src/data/chat.ts` and the home `index.astro` intro:
   - Hero answer bubble = **"Making space to write"**.
   - Dialogue (7 bubbles, the lone `?` bubble removed): "About what?" / "Who cares?" /
     "Only me, I think. Right where we should be." / "Stories. Sad machinations? Some pieces
     on culture or tech, maybe." / "Why?" / the temporal-lobe / hypergraphia paragraph /
     the "This site is a way for me…" disability paragraph.
   - Home intro = *"I get excited by honest communication that moves motivations. / Here's a
     chance to do that. For myself."*
2. **Theme toggle** — `src/layouts/Base.astro` + `src/styles/global.css`:
   - Inline head script sets `data-theme` (light/dark) before first paint (no flash); follows
     OS preference unless overridden; persists choice in `localStorage["jd-theme"]`.
   - Small moon/sun icon button in the footer (`class="theme-toggle"`).
   - `:root[data-theme="dark"]` CSS overrides the light tokens.
3. **Wide closing bubbles** — the two long paragraphs get `class="wide"` → `max-width: min(86%, 40rem)`
   (thin column, ~4 lines) so they don't take as much vertical space.

## What we REVERTED (back to git HEAD)
The whole **footer-in-runway / scroll-felt-rework** that caused many rounds of breakage. Original
committed behavior restored:

- `.pin` is `position: sticky; top: 1.5rem` again (question + bubbles pinned while the runway scrolls).
- `.chat` gets `padding-bottom: 4rem` and its tall runway height via JS (`anchor + LEAD + n·STEP + TRAIL`).
- Footer renders in `Base.astro` (normal flow, after the slot) — NOT inside `.chat`/`.pin`.
- Bubble reveal = original threshold model (`LEAD=60`, `STEP=200` px between reveals, `HYST=60`,
  `TRAIL=260`), deterministic scroll-linked.
- Deleted the experimental `src/components/Footer.astro` component; removed `Footer` usage from
  `index.astro` and `blog/index.astro`.

## The problem we were chasing (do not repeat blindly)
Goal: make bubbles reveal at a slow, even pace regardless of scroll speed, end the page at the
footer, and have the footer "part of the bubble scroll" with no normal-scroll tail below it.

Rounds that did NOT work (each caused the described regression), in approximate order:
1. **Velocity-saturating reveal** (time-based playhead dampening) — tried after research on scroll
   velocity. Made bubbles lag / appear after you'd stopped; "bump" from runway sizing feedback.
2. **Reach the true bottom / footer-in-runway** — repeatedly tried making the footer the last
   element of the pinned conversation so the page ends at it. Problems: when the footer was inside
   the sticky `.pin`, content below "sad machinations" vanished; when `.chat` was sized from
   `scrollHeight`, the height feed-back loop caused a "bump"; leftover normal-scroll below the
   footer (arrow-fade zone) persisted; footer reveal threshold mismatched its physical position.
3. **Viewport-based reveal** (getBoundingClientRect / offsetTop, no runway) — fixed the leftover
   scroll and worked across viewports, but the user found the reveal **too fast** (bubbles close
   together → all reveal quickly). Spacing change to slow it was also rejected ("bubbles were
   spaced correctly").
4. Restoring the **threshold/runway scroll** (STEP=200) with `.chat` as a flex column + footer
   pinned to the bottom — the user judged this "super bad" overall and asked to revert entirely.

**Lesson:** The one thing that was consistently "good" was the **original git-HEAD scroll**
(threshold/runway, sticky pin, footer in Base layout). The footer-as-final-element experiments
kept fighting the sticky runway geometry. If footer-in-runway is pursued again, it must reconcile:
(1) the runway is tall, (2) the footer is the last thing, (3) no leftover scroll after it, and
(4) the reveal stays slow — without making the question/pin sticky-tall enough to hide messages.

## Interesting project facts (from recon earlier this session)
- Canonical project = `~/jasperdeen-site` (Astro 7 + Tailwind, no SSR). Old Hugo site lives on the
  `hugo-site` branch and its `~/jasperdeen.com` checkout was deleted this session.
- The `~/jasperdeen-next` (Next.js chanhdai.com clone) was deleted as a dead-end fork.
- Display font: Libre Caslon Display (single 400 weight). Dunes line art is a procedural SVG in
  `src/components/Dunes.astro` (see PLAN.md).

## Not done / open
- The footer "fly up with the last bubble as part of the runway" idea is still not achieved in a
  satisfying way — reverted rather than solved. Revisit only with a clean approach if we want it.
---

# Session notes — 2026-09-05 (footer-in-runway, attempt #2: pin release — fully reverted)

Second attempt at the footer-in-runway goal ("footer reveals like a bubble on tall screens;
on short screens the pin releases and the footer is normal content"). Like attempt #1, it
ended in a **full revert** — the working tree was reset to `f963976` with nothing committed.
Read this before trying again.

## What was built (all reverted)
- Footer appended to the reveal list as the last item (same `.message` machinery), with two
  variants: **A** (default: footer = one full STEP after the last bubble, page ends as it
  lands) and **B** (`?tail=b`: footer 80px after last bubble, then 260px settle tail).
  Tall screens never released; footer fly-in worked there.
- **Pin release** for short viewports: when the next unrevealed bubble's threshold arrives
  and its resting spot would sit at/below the fold (40px early), the pin stops sticking so
  normal scrolling carries the rest; remaining bubbles reveal on viewport entry
  (`r.top < vh`); footer became plain content permanently after the first release.

## Failure modes found (each verified with a Playwright scroll probe, /tmp/pwtest/)
1. **Height-change releases get scroll-clamped.** Releasing by clearing `chat.style.height`
   shrank the document ~1100px mid-scroll; the browser clamped scrollY upward — the page
   visibly "scrolls back up" with no input. The clamped position then fell below the re-stick
   threshold → restick → immediate re-release → oscillation.
2. **Margin-collapse defeat.** Compensating with `margin-top` on `.pin` collapsed through
   `.chat`'s top edge (no border/padding/BFC on the chat), moving the whole chat box down
   ~1081px instead of the pin — giant blank void, docH ballooned 2845→3809.
3. **Footer toggling.** Re-adding `.message` in restick() re-hid the footer at an unreachable
   threshold (seen for a second, then gone).
4. Dev (:4321) vs build (:4528) were proven byte-identical in behavior — perceived
   differences were test-sequence/window-size luck on an unstable system.

## The design that WAS working when the session was reverted (start point next time)
`release()`: `position: static` + `transform: translateY(shift)` holding the pin's exact
visual position (shift = pin viewport top + scrollY − chat top) — **zero layout change**,
so no clamp, no jump, no forced reveals. Release gated on `scrollY >= thresholdFor(k)` of
the first unshown bubble (so scrolling UP never re-releases). `restick()`: clear transform
and set `pin.style.top` to the pin's current viewport top — seamless re-engagement; ladder
resumes and bubbles unwind on the way up. Final probe: footer revealed in viewport, no
oscillation, on both variants. It was reverted for trust reasons, not because it misbehaved.

## Tooling
`/tmp/pwtest/probe.mjs`, `probe2.mjs`, `cmp.mjs` (playwright-core + installed chromium)
drive the real page through a scroll sweep and log docH/chat/pin/footer geometry — use
these instead of eyeballing; eyeballing is how three regressions shipped in a row.

## CORRECTION (2026-09-07): release is UNWIND-TO-NATURAL, not transform-hold

The 2026-09-06 notes above describe `release()` as transform-hold
(`position: static` + `translateY(shift)`). That shipped briefly and was
REJECTED by the user — with proof, not vibes:

- transform-hold leaves the pin displaced below its flow slot FOREVER: the
  vacated slot = `shift`px of blank above the question (measured 466px), and
  the pin lands ON the footer (measured overlap; footer buried mid-page,
  bubble block at the document bottom, header floating above the blank when
  scrolling up). Exactly the reported "too much space above the question".

The shipped release() now UNWINDS to the natural page:
1. measure `shift` = pin visual top − pin flow top (while still sticky);
2. clear planner padding, `position: static`, `chat.style.height = ""` —
   the document becomes the natural page (pin in flow right after the hero);
3. `scrollTo(0, y − shift)` — pin moved up by `shift`, scroll up by `shift`,
   so the pin and every revealed bubble keep their EXACT viewport positions
   at the release instant (probe: 0px jump);
4. clamp safety net (unreachable in practice; post-release scroll lands at
   ≈ heroBottom + 24).

Why it works: at the release instant everything ABOVE the pin is off-screen
above the viewport, so deleting the consumed runway changes nothing visible;
below the fold, content moves up but the footer stays below the fold
(measured post-release footer viewport ≈ 1045px vs 800px fold at all sizes
tested: 450/600/800/1000).

New probe: /tmp/pwtest/release-fixed.mjs asserts 12 invariants (natural gap
restored, no overlap, footer = doc end, 0px jump, below-fold stability, all
revealed, no leftover, no oscillation) — ALL PASS on :4321 and :4500 at four
viewport sizes. The annotated overlay also needed: measure with itself
`display:none` (its markers inflated scrollHeight) and `#x-layer { overflow:
hidden }` (delayed-threshold markers dangle past the natural footer after
release and would re-inflate the page).

## Dev environment (2026-09-07): :4321 dev / :4500 annotated preview
- :4321 = `astro dev` (binds ::1 — use `http://localhost:4321/`).
- :4500 = python http.server serving `/tmp/jd-annotated/site` — the current
  build PLUS the scroll-mechanics explanation overlay (overlay.js/overlay.css,
  injected by `/tmp/jd-annotated/rebuild.sh`). **The overlay is the only
  difference from the real site.**
- Watcher `~/.pi/agent/jd-watch.cjs` (log `/tmp/jd-watch.log`) polls src/+
  public/ mtimes every 2s and runs rebuild.sh (build → copy → inject).
  Polling, not inotify — fs events don't cross this machine's session
  sandboxes. Both background processes die on reboot; restart with:
  `setsid nohup node ~/.pi/agent/jd-watch.cjs &>/tmp/jd-watch.log &`
  `setsid nohup python3 -m http.server 4500 --bind 127.0.0.1 --directory /tmp/jd-annotated/site &>/tmp/http-4500.log &`
- Overlay was updated for the new model: shows the scroll-up RELEASED state
  (no pin, viewport-entry reveals), the actual releasedAt scroll position,
  and measures with itself hidden (display:none) — its absolutely-positioned
  markers previously inflated scrollHeight and blocked the post-release
  runway collapse.
