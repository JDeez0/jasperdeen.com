// A block of text whose end-of-line breaks are chosen by Knuth-Plass
// (minimum raggedness) using @chenglou/pretext measurements. Spacing,
// margins, and line-height are untouched — the browser still renders each
// line at the inherited line-height; only the break points are ours.
// props.prefix: bold lead-in ("Q"/"A") whose "X: " is measured as part of
// the text (bold width delta is sub-pixel at these sizes; epsilon absorbs it).
import { createSignal, onMount, onCleanup, For } from "solid-js";
import { breakLines } from "./kp.js";

export default function KPBlock(props) {
  const [lines, setLines] = createSignal([]);
  let el;

  const fullText = () =>
    props.prefix ? `${props.prefix}: ${props.text}` : props.text;

  function recompute() {
    if (!el || !el.clientWidth) return;
    // 1px epsilon: never trust a measured fit at exactly the box edge
    setLines(breakLines(fullText(), props.font, el.clientWidth - 1));
  }

  onMount(() => {
    recompute();
    const onResize = () => recompute();
    window.addEventListener("resize", onResize);
    onCleanup(() => window.removeEventListener("resize", onResize));
  });

  const prefixLen = () => (props.prefix ? props.prefix.length + 2 : 0);

  return (
    <div class={props.cls} ref={el}>
      <For each={lines()}>
        {(line, i) => (
          <span class="fmt-line">
            {i() === 0 && props.prefix && <b>{props.prefix}: </b>}
            {line.slice(i() === 0 ? prefixLen() : 0)}
          </span>
        )}
      </For>
    </div>
  );
}