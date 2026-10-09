import { LAST_UPDATED } from "./data.js";
import KPBlock from "./KPBlock.jsx";

/* Content lifted from the current jasperdeen.com (Astro) version:
   hero caption/intro, the "What's going on?" dialogue, and the blog. */

const dialogue = [
  { who: "Q", text: "What's going on?" },
  { who: "A", text: "Making space to write" },
  { who: "Q", text: "About what? Who cares?" },
  { who: "A", text: "Only me, I think. Right where we should be." },
  { who: "A", text: "Stories. Sad machinations? Some pieces on culture or tech, maybe." },
  { who: "Q", text: "Why?" },
  {
    who: "A",
    text:
      "I was slapped with new perspective(s) on my professional identity after " +
      "being diagnosed with frequent seizures in my temporal lobe for the last " +
      "four years. Aside from spooky déjà vu, side effects often include " +
      "hypergraphia (compulsion to write) and unusual preoccupation with " +
      "moral/religious ideas.",
  },
  {
    who: "A",
    text:
      "This site is a way for me to work through my disability (and passions) " +
      "while living with my parents post-grad. Braving the medical system for " +
      "twelve months and counting, I'm grateful to be able to focus " +
      "much-needed attention on my pursuit of health. Including attempts to " +
      "find solutions to various digital problems.",
  },
];

export default function App() {
  return (
    <>
      <div id="header">
        <h1>Jasper Deen</h1>
        <span class="caption">Word wonk and inexorable optimist</span>
        <span class="email">
          <a href="mailto:jasper@jasperdeen.com">jasper@jasperdeen.com</a>
        </span>
      </div>
      <div id="header-rule"></div>

      <div id="content">
        <KPBlock
          cls="intro"
          font="17px Georgia, 'Times New Roman', serif"
          text="I get excited when honest communications move motivations. Now's a chance to do that."
        />

        <div class="qa">
          {dialogue.map((m) => (
            <KPBlock
              cls={m.who === "Q" ? "q" : "a"}
              font="17px Georgia, 'Times New Roman', serif"
              prefix={m.who}
              text={m.text}
            />
          ))}
        </div>

        <h2>Writing</h2>
        <ul>
          <li>
            <a href="https://jasperdeen.com/blog/dog-days-in-cuba/">Dog Days in Cuba</a>{" "}
            <span class="date">(Oct 5)</span> — A reflection on Paulina
            Zelitsky's <i>Dog Days in Cuba</i>: political satire told through a
            Dobermann's eyes.
          </li>
          <li>More to come. <i>Hypergraphia permitting.</i></li>
        </ul>

        <h2>Software</h2>
        <ul>
          <li>kbdprobe — keyboard diagnostics</li>
          <li>aura — device activity tools</li>
          <li>various half-finished things</li>
        </ul>

        <h2>Elsewhere</h2>
        <ul>
          <li><a href="https://jasperdeen.com/">jasperdeen.com</a> — the modern site</li>
          <li><a href="http://www.slashdot.org/">Slashdot</a> — news for nerds</li>
        </ul>
      </div>

      <div id="footer">
        <span class="right">Last updated {LAST_UPDATED}</span>
        &copy; 1996 Jasper Deen
      </div>
    </>
  );
}