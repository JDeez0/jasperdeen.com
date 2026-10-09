// justify.js — TeX (Knuth-Plass) justification, ported from
// Lincoln504/wall-of-shame (site/src/justify.ts).
//
// Plain CSS `text-align: justify` uses the browser's greedy first-fit and
// leaves rivers/large gaps in narrow columns. tex-linebreak runs the
// Knuth-Plass total-fit algorithm with TeX en-us hyphenation for properly
// even spacing.
//
// The library mutates the DOM (inserts <br>, sets word-spacing), so it must
// run AFTER the framework renders and re-run when the column WIDTH changes —
// never on height-only changes (mobile URL bar). See onResizeRejustify.

import { createHyphenator, justifyContent, unjustifyContent } from "tex-linebreak";
import enUs from "hyphenation.en-us";

const hyphenate = createHyphenator(enUs);

/**
 * Justify the given elements. Idempotent: reverses any previous pass first.
 * Silently no-ops on failure (elements keep their CSS `text-align: justify`
 * fallback).
 */
export async function justifyElements(els) {
  if (!els.length) return;
  try {
    if (document.fonts?.ready) await document.fonts.ready;
    for (const el of els) {
      try { unjustifyContent(el); } catch { /* not previously justified */ }
    }
    justifyContent(els, hyphenate);
  } catch {
    /* keep CSS fallback */
  }
}

/**
 * Re-justify ONLY when the layout WIDTH changes. Knuth-Plass line breaking
 * depends solely on column width, but a naive `resize` listener also fires
 * when a mobile URL bar shows/hides during scroll (height, not width).
 * We watch window.innerWidth (which INCLUDES the scrollbar, and is immune to
 * scrollbar-toggling feedback loops) with a threshold, via ResizeObserver.
 * Returns a disposer.
 */
export function onResizeRejustify(getEls, delay = 150) {
  let t;
  const root = document.documentElement;
  const widthNow = () => window.innerWidth;
  let lastW = widthNow();
  const schedule = () => {
    if (t) clearTimeout(t);
    t = window.setTimeout(() => void justifyElements(getEls()), delay);
  };
  const onMaybeWidthChange = () => {
    const w = widthNow();
    if (Math.abs(w - lastW) < 24) return; // scrollbar toggle / jitter — ignore
    lastW = w;
    schedule();
  };

  if (typeof ResizeObserver !== "undefined") {
    const ro = new ResizeObserver(onMaybeWidthChange);
    ro.observe(root);
    return () => { if (t) clearTimeout(t); ro.disconnect(); };
  }
  window.addEventListener("resize", onMaybeWidthChange);
  return () => { if (t) clearTimeout(t); window.removeEventListener("resize", onMaybeWidthChange); };
}