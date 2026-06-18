# EditKaro.in — Website

A static, responsive site for **EditKaro.in**, a social media marketing and
video editing agency, built for the VaultofCodes mini project (Portfolio
Page) and major project (Complete Website).

No build step, no framework — plain HTML, CSS, and JavaScript.

## Pages

| Page | File | Covers |
|---|---|---|
| Home | `index.html` | Intro, services, stats, newsletter signup |
| Portfolio | `portfolio.html` | Filterable video grid across all 9 categories + lightbox |
| About | `about.html` | Mission, vision, process, team |
| Contact | `contact.html` | Contact form (name, email, phone, message) |

Shared assets: `css/style.css`, `js/main.js`, `js/portfolio-data.js`.

## Run it locally

No build tools needed — just serve the folder so the JS files load correctly
(opening `index.html` directly with `file://` will block `fetch`/scripts in
some browsers):

```bash
cd editkaro
python3 -m http.server 8000
# then open http://localhost:8000
```

## Replacing placeholder content

- **Videos**: `js/portfolio-data.js` holds every portfolio card as plain
  objects (`title`, `cat`, `duration`, `blurb`, `tc`). Swap in the client's
  real titles/descriptions, or extend each object with a `videoUrl` and
  update `main.js`'s lightbox to embed it once real footage/links exist.
- **Team**: the `TEAM` array at the bottom of `about.html` — swap names,
  roles, and colors (used to generate the initials avatars).
- **Contact details / socials**: search-and-replace the placeholder email,
  phone, and address in `contact.html`, `index.html`, and `about.html`'s
  footers.

## Wiring up the email + contact forms to Google Sheets

Both forms (`#email-form`-style newsletter signup on the home page, and the
contact form) post to **one Google Apps Script Web App**, which writes rows
into two tabs (`Emails`, `Contacts`) of a single Google Sheet.

1. **Create the Sheet.** Go to [sheets.google.com](https://sheets.google.com)
   and create a new, blank spreadsheet (e.g. "EditKaro Form Submissions").
2. **Open the script editor.** In the sheet, go to
   `Extensions > Apps Script`.
3. **Paste the code.** Delete the placeholder `Code.gs` content and paste in
   the contents of `apps-script/Code.gs` from this repo. Save (Ctrl/Cmd+S).
4. **Deploy as a Web App.**
   - Click **Deploy > New deployment**.
   - Click the gear icon next to "Select type" and choose **Web app**.
   - Set **Execute as**: `Me`.
   - Set **Who has access**: `Anyone`.
   - Click **Deploy**, and authorize the script when prompted (it's your own
     script — Google will show an "unverified app" warning since it isn't
     published; click **Advanced > Go to (project name)** to proceed).
   - Copy the **Web app URL** it gives you (ends in `/exec`).
5. **Paste the URL into the site.** Open `js/main.js` and replace:
   ```js
   const APPS_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```
   with your copied URL.
6. **Re-deploy after any script edit.** If you ever change `Code.gs`, you
   need **Deploy > Manage deployments > edit (pencil) > New version** for
   the changes to go live — saving alone isn't enough.
7. **Test it.** Submit each form once and check the Sheet — it will
   auto-create the `Emails` and `Contacts` tabs (with headers) the first
   time each form is used.

### Why the form uses `body: JSON.stringify(...)` with no headers

Setting an explicit `Content-Type: application/json` header would trigger a
CORS preflight request, which Apps Script Web Apps don't handle. Sending the
JSON as a plain string (browser defaults the content type to
`text/plain`) avoids the preflight; `Code.gs` parses it as JSON server-side
regardless.

### Troubleshooting

- **"Couldn't confirm delivery" but the row *did* appear in the Sheet:**
  this is a known quirk — Apps Script's CORS headers are inconsistent, so
  the browser sometimes can't read the response even though the write
  succeeded. Treat the Sheet as the source of truth while testing.
- **Nothing appears in the Sheet at all:** double-check "Execute as" is
  `Me` and "Who has access" is `Anyone`, and that you redeployed (not just
  saved) after the last script edit.

## Deployment

Any static host works since there's no build step.

**Vercel**
```bash
npm i -g vercel
cd editkaro
vercel
```

**Netlify** — drag the `editkaro` folder into
[app.netlify.com/drop](https://app.netlify.com/drop), or connect the GitHub
repo and set the publish directory to `/`.

**GitHub Pages** — push to a repo, then in
**Settings > Pages**, set the source to the `main` branch, root folder.

## SEO / performance notes already in place

- Each page has a unique `<title>` and `<meta name="description">`.
- Fonts are loaded from Google Fonts with `preconnect` for faster first
  paint.
- No render-blocking JS frameworks; all interactivity is vanilla JS.
- Images are CSS/SVG-generated (no external image requests), keeping the
  page weight small until real client video thumbnails are swapped in —
  at that point, serve thumbnails as compressed `.webp` and add
  `loading="lazy"` to any `<img>` tags you introduce.
