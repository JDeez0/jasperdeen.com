// Knuth-Plass-style minimum-raggedness line breaking, measured with
// @chenglou/pretext (canvas-backed, browser-font-engine ground truth).
//
// We keep the page's spacing exactly as-is; this only chooses *where* the
// line ends, minimizing sum of squared leftover space over all lines but
// the last (classic ragged-right Knuth-Plass simplification — no stretch/
// shrink glue needed since we're not justifying).
import { prepareWithSegments, measureLineStats } from "@chenglou/pretext";

const widthCache = new Map();

function tokenWidth(token, font) {
  const key = font + "\u0000" + token;
  let w = widthCache.get(key);
  if (w === undefined) {
    const prepared = prepareWithSegments(token, font);
    w = measureLineStats(prepared, 1e6).maxLineWidth;
    widthCache.set(key, w);
  }
  return w;
}

// Inter-word space width for the font, derived from pretext measurements.
export function spaceWidth(font) {
  return tokenWidth("x x", font) - 2 * tokenWidth("x", font);
}

export function breakLines(text, font, maxWidth) {
  const words = text.trim().split(/\s+/);
  if (words.length === 0) return [];
  const sw = spaceWidth(font);
  const widths = words.map((w) => tokenWidth(w, font));
  const n = words.length;
  const INF = 1e18;

  // best[i] = min raggedness cost of formatting words[i..]; from[i] = next line's first word
  const best = new Array(n + 1).fill(INF);
  const from = new Array(n + 1).fill(0);
  best[n] = 0;

  for (let i = n - 1; i >= 0; i--) {
    let w = 0;
    for (let j = i; j < n; j++) {
      w += widths[j] + (j > i ? sw : 0);
      if (w > maxWidth && j > i) break; // single overlong word still allowed alone
      const leftover = maxWidth - w;
      const cost = j === n - 1 ? 0 : leftover * leftover;
      if (cost + best[j + 1] < best[i]) {
        best[i] = cost + best[j + 1];
        from[i] = j + 1;
      }
    }
    if (from[i] === 0) from[i] = i + 1; // word alone overflows the box; let it
  }

  const lines = [];
  let i = 0;
  while (i < n) {
    const j = Math.max(from[i], i + 1);
    lines.push(words.slice(i, j).join(" "));
    i = j;
  }
  return lines;
}