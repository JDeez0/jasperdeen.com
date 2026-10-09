import { LAST_UPDATED } from "./data.js";

export default function App() {
  return (
    <div id="wrapper">
      <h1>Jasper Deen</h1>

      <p>
        I write software. I also keep a journal, some of which ends up on{" "}
        <a href="https://jasperdeen.com/">my other page</a>.
      </p>

      <h2>Stuff</h2>
      <ul>
        <li><a href="https://jasperdeen.com/">jasperdeen.com</a> — the modern site</li>
        <li><a href="http://www.slashdot.org/">Slashdot</a> — news for nerds</li>
        <li><a href="http://www.yahoo.com/">Yahoo</a></li>
      </ul>

      <h2>Software</h2>
      <ul>
        <li>kbdprobe — keyboard diagnostics</li>
        <li>aura — device activity tools</li>
        <li>various half-finished things</li>
      </ul>

      <hr />

      <p class="smaller">
        Mail me: <a href="mailto:jasper@jasperdeen.com">jasper@jasperdeen.com</a>.
        Last updated {LAST_UPDATED}. &copy; 1996 Jasper Deen.
      </p>
    </div>
  );
}