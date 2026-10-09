import { createSignal } from "solid-js";
import { HITS, VISITS, LAST_UPDATED } from "./data.js";

export default function App() {
  const [count, setCount] = createSignal(VISITS);
  const [guestbook, setGuestbook] = createSignal(HITS.slice());
  const [name, setName] = createSignal("");
  const [msg, setMsg] = createSignal("");

  function sign(e) {
    e.preventDefault();
    const n = name().trim() || "Anonymous Coward";
    setGuestbook((g) => [{ name: n, msg: msg().trim() || "(no comment)" }, ...g]);
    setName("");
    setMsg("");
  }

  return (
    <>
      <table class="layout" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            {/* ===== masthead ===== */}
            <h1 class="center">Jasper Deen's Home Page</h1>
            <p class="center smaller">
              <b>Welcome to my corner of the World Wide Web!</b> This page is
              best viewed with <i>Netscape Navigator 3.0</i> at 800x600
              resolution.
            </p>
            <hr />

            {/* ===== intro ===== */}
            <h2>About Me</h2>
            <p>
              Hello! My name is <b>Jasper Deen</b>. Welcome to my personal home
              page on the Internet. I made this page myself using a text editor
              and a lot of coffee. It took a long time.
            </p>
            <p>
              On this page you can find out all about me and the things I am
              interested in. I update it whenever I have time, so be sure to{" "}
              <a href="#bookmark">bookmark this page</a> and check back often!
            </p>

            {/* ===== interests table ===== */}
            <h2>My Interests</h2>
            <table class="boxed" cellpadding="4" cellspacing="0">
              <tr>
                <th width="30%">Topic</th>
                <th>Description</th>
              </tr>
              <tr>
                <td><b>Computers</b></td>
                <td>
                  I like making software. Currently running{" "}
                  <span class="smaller">Linux 1.2.13</span> — it is fast and
                  free!
                </td>
              </tr>
              <tr>
                <td><b>Writing</b></td>
                <td>I keep a journal and write short essays.</td>
              </tr>
              <tr>
                <td><b>The Internet</b></td>
                <td>
                  Surfing the Information Superhighway. E-mail me anytime —{" "}
                  <a href="mailto:jasper@jasperdeen.com">jasper@jasperdeen.com</a>
                </td>
              </tr>
            </table>
            <p class="smaller">
              <i>Click a column header to... actually no, tables can't do that
              yet. Maybe in a future version of HTML!</i>
            </p>

            <hr />

            {/* ===== link farm ===== */}
            <h2>Cool Links</h2>
            <p class="bigger"><b>Places I go on the Web:</b></p>
            <ul>
              <li><a href="https://jasperdeen.com/">My new fancy modern site (under construction)</a></li>
              <li><a href="http://www.yahoo.com/">Yahoo!</a> — my favorite way to find things</li>
              <li><a href="http://www.altavista.digital.com/">AltaVista</a> — search the whole Web!</li>
              <li><a href="http://www.slashdot.org/">Slashdot</a> — news for nerds</li>
            </ul>

            <hr />

            {/* ===== what's new ===== */}
            <h3><a name="bookmark"></a>What's New</h3>
            <ul>
              <li><b>10/09/96</b> — Added a guestbook! Sign it below!</li>
              <li><b>10/02/96</b> — Fixed the table (it was all messed up in IE)</li>
              <li><b>09/28/96</b> — This page went up! Wow!</li>
            </ul>

            <hr />

            {/* ===== guestbook ===== */}
            <h2>Sign My Guestbook</h2>
            <p>
              <b>You are visitor number:</b>{" "}
              <span class="counter">{String(count()).padStart(6, "0")}</span>
              {" "}
              <span class="smaller">
                (since 09/28/96) —{" "}
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setCount((c) => c + 1); }}
                >reload to count yourself again</a>
              </span>
            </p>

            <table class="boxed" cellpadding="4" cellspacing="0">
              <tr>
                <th width="25%">Name</th>
                <th>Comments</th>
              </tr>
              <tr>
                <td><b>WebMaster</b></td>
                <td>Thanks for stopping by! Please sign the guestbook below.</td>
              </tr>
              {guestbook().map((g) => (
                <tr>
                  <td><b>{g.name}</b></td>
                  <td>{g.msg}</td>
                </tr>
              ))}
            </table>
            <br />
            <form onSubmit={sign}>
              <table class="boxed" cellpadding="4" cellspacing="0">
                <tr>
                  <th colspan="2">Add your entry:</th>
                </tr>
                <tr>
                  <td><b>Your name:</b></td>
                  <td>
                    <input
                      size="30"
                      value={name()}
                      onInput={(e) => setName(e.currentTarget.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td><b>Comments:</b></td>
                  <td>
                    <input
                      size="50"
                      value={msg()}
                      onInput={(e) => setMsg(e.currentTarget.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="center">
                    <button type="submit"><b>Submit</b></button>{" "}
                    <button type="reset">Clear</button>
                  </td>
                </tr>
              </table>
            </form>

            <hr />

            {/* ===== construction + footer ===== */}
            <p class="construction">
              <span>&#9888; THIS PAGE IS UNDER CONSTRUCTION &#9888;</span>
            </p>
            <p class="center smaller lastmod">
              This page last updated: {LAST_UPDATED}<br />
              &copy; 1996 Jasper Deen. All rights reserved.<br />
              <a href="mailto:jasper@jasperdeen.com">jasper@jasperdeen.com</a>
              {" "}| <a href="#top">Back to Top</a>
            </p>
          </td>
        </tr>
      </table>
      <br />
    </>
  );
}