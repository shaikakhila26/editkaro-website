# Project Report — EditKaro.in Website

**Project:** Major Project — Complete the Editkaro.in Website (+ Mini Project — Portfolio Page)
**Submitted by:** _[your name]_
**GitHub repo:** _[paste link after pushing]_
**Live URL:** _[paste Vercel/Netlify/GitHub Pages link after deploying]_

> Note: replace the bracketed placeholders above before submitting, and
> adjust any section below to match what you actually changed once you've
> made the project your own.

## What was built

A four-page static site for EditKaro.in:

- **Home** — intro, the 9 edit categories as clickable chips, a services
  grid, stats, and an email newsletter signup.
- **Portfolio** — all 9 required categories (Short Form, Long Form, Gaming,
  Football Edits, eCommerce Ads, Documentary Style, Color Grading, Anime,
  Ads), filterable by category with a click, plus a lightbox for a closer
  look at each entry. The mini project's brief is fully covered by this
  page on its own.
- **About** — mission, vision, a four-step process explainer, and a
  placeholder team section (random names, initials-avatars) per the brief's
  instruction to fill unknown sections with placeholders.
- **Contact** — a name/email/phone/message form.

Both forms (newsletter + contact) submit to a single Google Apps Script Web
App, which appends rows to two tabs of a Google Sheet (`Emails` and
`Contacts`) — satisfying the "store submissions in Google Sheets" 
requirement for both the home page and contact page without needing a
separate backend server.

The site has no build step or framework dependency: plain HTML, CSS, and
vanilla JavaScript, so it deploys as-is to any static host.

## Design decisions

Since the brief left visual direction open, the site borrows its language
from the editing software itself rather than a generic marketing template:
a near-black "grading suite" background, a timecode-ruler motif reused
across every page as a section divider, and portfolio thumbnails styled
like burned-in timecode frames rather than stock photography. This kept the
design distinct while staying obviously on-brief for a video editing
client.

## Challenges and how they were resolved

- **No real client video files or links were available.** The brief allows
  placeholders where specific information isn't provided, so portfolio
  entries use realistic placeholder titles/descriptions per category,
  structured as plain data (`js/portfolio-data.js`) so real links/files can
  be dropped in later without touching the page markup or JS logic.
- **Storing form data without a paid backend.** Google Apps Script, bound to
  a Google Sheet, was used as a free serverless endpoint. The main snag was
  CORS: Apps Script Web Apps don't support the preflight `OPTIONS` request
  that fetch sends when you set `Content-Type: application/json`. This was
  solved by sending the JSON payload as a plain string body (browser
  defaults to `text/plain`, which doesn't trigger a preflight) and parsing
  it as JSON on the script side instead.
- **One endpoint, two destinations.** Rather than deploying two separate
  Apps Script projects, both forms send a `formType` field
  (`newsletter`/`contact`) and the script routes each submission to the
  matching sheet tab, creating it automatically on first use.
- **Categorized filtering without a framework.** The portfolio's filter bar
  and grid are rendered from a single data array and re-rendered on each
  filter click, with the active category also reflected in the URL
  (`?cat=gaming`) so a filtered view is shareable/linkable directly from the
  home page's category chips.
- **Responsiveness.** Grids use `auto-fit`/`auto-fill` with `minmax()` so
  the category, services, portfolio, and team grids reflow from multi-column
  to single-column without separate breakpoints for each component; the nav
  collapses into a toggled mobile menu under ~820px.

## What's left for a real client handoff

- Swap placeholder portfolio entries for real client video links/files.
- Swap placeholder team names/photos for the real team (or remove the
  section if the client prefers not to list staff).
- Replace placeholder email/phone/address/social links with real ones.
- Run a Lighthouse pass post-deploy and compress/replace any real video
  thumbnails as `.webp` with `loading="lazy"`.
