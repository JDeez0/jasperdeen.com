import { createSignal } from "solid-js";
import { HITS, VISITS, LAST_UPDATED } from "./data.js";

const NEW = () => (
  <span class="blink" style="color:#ff0000;font-weight:bold;font-size:9pt;"> NEW!</span>
);

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
      <marquee style="color:#ffff00;background:#000000;border:2px ridge #808080;padding:2px;">
        &#9733; WELCOME TO THE JASPER DEEN HOMEPAGE &#9733; SIGN MY GUESTBOOK
        BEFORE YOU LEAVE &#9733; BEST VIEWED IN NETSCAPE NAVIGATOR 3.0 AT
        800x600 &#9733; THIS SITE IS Y2K COMPLIANT &#9733;
      </marquee>

      <table class="page" cellpadding="0" cellspacing="0">
        <tbody>
          <tr>
            <td class="banner" colspan="2">
              <h1>Jasper Deen's Home Page</h1>
              <p>
                <span class="smaller">~*~ The coolest home page on the World Wide Web ~*~</span>
              </p>
            </td>
          </tr>
          <tr>
            <td class="nav">
              <p class="navhead">NAVIGATION</p>
              <ul>
                <li><a href="#about">About Me</a></li>
                <li><a href="#interests">Interests</a></li>
                <li><a href="#links">Cool Links</a><NEW /></li>
                <li><a href="#new">What's New</a></li>
                <li><a href="#guestbook">Guestbook</a><NEW /></li>
              </ul>
              <p class="navhead">CONTACT</p>
              <ul>
                <li><a href="mailto:jasper@jasperdeen.com">E-Mail Me</a></li>
                <li>ICQ#: 8392047</li>
              </ul>
              <p class="navhead">HITS</p>
              <p style="text-align:center;margin:2px 0 10px;">
                <span class="counter">{String(count()).padStart(6, "0")}</span>
              </p>
              <p class="tiny" style="text-align:center;">
                <a href="#" onClick={(e) => { e.preventDefault(); setCount((c) => c + 1); }}>
                  hit the counter
                </a>
              </p>
              <hr />
              <p class="tiny" style="text-align:center;">
                <a class="badge blue" href="http://home.netscape.com/">NETSCAPE<br />NOW!</a>
                <a class="badge" href="http://www.yahoo.com/">YAHOO!<br />SEARCH</a>
              </p>
              <p class="tiny" style="text-align:center;">
                Made with<br /><b>Windows Notepad</b>
              </p>
            </td>

            <td class="main">
              <h2><a name="about"></a>About Me</h2>
              <p>
                Hello! My name is <b>Jasper Deen</b> and this is my home page.
                I built it myself using Windows Notepad and a 14.4k modem. It
                took <i>forever</i> so please sign the guestbook.
              </p>
              <p>
                I am into computers, writing, and surfing the Information
                Superhighway. Right now this page is always under construction,
                so check back for new stuff!
              </p>

              <hr class="rainbow" />

              <h2><a name="interests"></a>My Interests</h2>
              <table class="boxed" cellpadding="4" cellspacing="0">
                <tbody>
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
                      E-mail me anytime —{" "}
                      <a href="mailto:jasper@jasperdeen.com">jasper@jasperdeen.com</a>
                    </td>
                  </tr>
                </tbody>
              </table>

              <hr class="rainbow" />

              <h2><a name="links"></a>Cool Links</h2>
              <p class="bigger"><b>Places I go on the Web:</b></p>
              <ul>
                <li><a href="https://jasperdeen.com/">My new fancy modern site</a></li>
                <li><a href="http://www.yahoo.com/">Yahoo!</a> — my favorite way to find things</li>
                <li><a href="http://www.altavista.digital.com/">AltaVista</a> — search the whole Web!<NEW /></li>
                <li><a href="http://www.slashdot.org/">Slashdot</a> — news for nerds, stuff that matters</li>
                <li><a href="http://www.spacejam.com/">Space Jam</a> — the official site. really.</li>
              </ul>

              <hr class="rainbow" />

              <h2><a name="new"></a>What's New</h2>
              <ul>
                <li><b>10/09/96</b> — Added a guestbook! Sign it below! <NEW /></li>
                <li><b>10/02/96</b> — Fixed the table (it was all messed up in IE)</li>
                <li><b>09/28/96</b> — This page went up! Wow!</li>
              </ul>

              <hr class="rainbow" />

              <h2><a name="guestbook"></a>Sign My Guestbook</h2>
              <table class="boxed" cellpadding="4" cellspacing="0">
                <tbody>
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
                </tbody>
              </table>
              <br />
              <form onSubmit={sign}>
                <table class="boxed" cellpadding="4" cellspacing="0">
                  <tbody>
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
                      <td colspan="2" style="text-align:center;">
                        <button type="submit"><b>Submit</b></button>{" "}
                        <button type="reset">Clear</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>

              <hr class="rainbow" />

              <p class="webring">
                [ <a href="#">Previous</a> | <a href="#">Random</a> |{" "}
                <a href="#">Next</a> | <a href="#">Skip One</a> ]<br />
                This site is a proud member of{" "}
                <b>The Personal Homepages WebRing</b>.<br />
                <span class="tiny">
                  Want to join the ring?{" "}
                  <a href="mailto:webring-master@aol.com">E-mail the ringmaster</a>.
                </span>
              </p>

              <p class="construction">
                <span>&#9888; THIS PAGE IS ALWAYS UNDER CONSTRUCTION &#9888;</span>
              </p>

              <p class="center lastmod" style="text-align:center;">
                This page last updated: {LAST_UPDATED}<br />
                &copy; 1996 Jasper Deen. All rights reserved.<br />
                <a href="mailto:jasper@jasperdeen.com">jasper@jasperdeen.com</a>
                {" "}| <a href="#top">Back to Top</a>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
    </>
  );
}