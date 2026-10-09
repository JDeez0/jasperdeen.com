import { LAST_UPDATED } from "./data.js";

export default function App() {
  return (
    <>
      <div id="header">
        <h1>Jasper Deen</h1>
        <span class="email">
          <a href="mailto:jasper@jasperdeen.com">jasper@jasperdeen.com</a>
        </span>
      </div>
      <div id="header-rule"></div>

      <div id="content">
        <p>
          I write software. I also keep a journal, some of which ends up on{" "}
          <a href="https://jasperdeen.com/">my other page</a>.
        </p>

        <h2>Links</h2>
        <div class="cols">
          <ul>
            <li><a href="https://jasperdeen.com/">jasperdeen.com</a> — the modern site</li>
            <li><a href="http://www.slashdot.org/">Slashdot</a> — news for nerds</li>
            <li><a href="http://www.yahoo.com/">Yahoo</a></li>
            <li><a href="http://www.altavista.digital.com/">AltaVista</a></li>
          </ul>
        </div>

        <h2>Software</h2>
        <ul>
          <li>kbdprobe — keyboard diagnostics</li>
          <li>aura — device activity tools</li>
          <li>various half-finished things</li>
        </ul>
      </div>

      <div id="footer">
        <span class="right">Last updated {LAST_UPDATED}</span>
        &copy; 1996 Jasper Deen
      </div>
    </>
  );
}