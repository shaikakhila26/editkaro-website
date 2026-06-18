# EditKaro.in Website

This is my submission for the VaultofCodes major project — completing the
website for Editkaro.in, a video editing and social media agency.

It's a plain HTML/CSS/JS site, no framework. 4 pages: Home, Portfolio,
About, Contact.

**Live site:** https://editkaro-website-iota.vercel.app/
**Repo:** https://github.com/shaikakhila26/editkaro-website

## Pages

- `index.html` – home page, intro + services + the 9 category links + email
  signup form
- `portfolio.html` – all 9 categories from the brief, with a filter bar and
  a lightbox when you click a card
- `about.html` – mission/vision, a short process section, and a team
  section with placeholder names since I didn't have real team info
- `contact.html` – contact form (name, email, phone, message)

`css/style.css`, `js/main.js`, and `js/portfolio-data.js` are shared across
all 4 pages.

## How to run it

Just serve the folder, don't open the file directly (the JS won't load
properly with file:// in some browsers):

```
python3 -m http.server 8000
```

then go to `localhost:8000`.

## Portfolio videos

I didn't have actual client footage for this, so the portfolio entries
in `js/portfolio-data.js` are placeholders (title, category, duration,
short blurb). They're just plain JS objects in one array, so swapping in
real videos later is just editing that file, nothing else needs to change.

## Email + contact form → Google Sheets

Both forms send their data to one Google Apps Script, which writes into a
Google Sheet (different tab for newsletter signups vs. contact messages).

Steps I followed to set this up, in case I (or anyone) need to redo it:

1. Made a new Google Sheet.
2. Extensions → Apps Script, pasted in `apps-script/Code.gs`.
3. Deploy → New deployment → Web app. Execute as **Me**, who has access
   **Anyone**. Deployed it, accepted the "unverified app" warning since
   it's my own script.
4. Copied the `/exec` URL it gave me and pasted it into the
   `APPS_SCRIPT_URL` variable at the top of `js/main.js`.
5. Tested both forms and checked the Sheet to confirm rows were showing
   up. It auto-creates the "Emails" and "Contacts" tabs the first time
   each form is used.

One thing that tripped me up: if you set `Content-Type: application/json`
on the fetch request, the browser sends a CORS preflight first, and Apps
Script doesn't handle that, so the request just fails. Fix was to send the
body as a plain string (no headers set) so it defaults to `text/plain`,
and just `JSON.parse()` it on the Apps Script side instead. Also, if you
edit `Code.gs` after deploying, you have to make a **new version** under
Manage deployments — just saving the script doesn't push the change live.

## Deployment

Deployed on Vercel.

## Things I'd improve with more time

- Real video links/thumbnails instead of placeholders
- Real team photos instead of the initials avatars
- Form validation messages styled a bit better
- Maybe an actual loading spinner instead of just changing the button text
  while the form is submitting