# Project Report — EditKaro.in Website

Name: Akhila
Project: Major Project — Complete the Editkaro.in Website
GitHub repo: https://github.com/shaikakhila26/editkaro-website
Live site: [add link]

## What I did

I built out the full Editkaro.in site as 4 pages — Home, Portfolio, About,
and Contact — using plain HTML, CSS and JavaScript, no framework, since
the brief was already scoped around that.

The home page has an intro section, a row of the 9 video categories that
link straight into the portfolio page filtered to that category, a
services section, and an email signup form.

The portfolio page covers all 9 categories from the brief (Short Form,
Long Form, Gaming, Football Edits, eCommerce Ads, Documentary Style, Color
Grading, Anime, Ads) with a filter bar so you can click a category and only
see those, plus a lightbox that opens when you click on a card. This page
on its own is basically the mini project too, so I submitted it separately
as well.

About page has mission/vision text, a short "how a project moves through
editing" section, and a team section. I didn't have real team
info for this client so I used placeholder names with simple initials
avatars, like the brief said was fine to do.

Contact page has a form for name, email, phone and message.

For the "store form data in Google Sheets" requirement, both the email
signup and the contact form post to one Google Apps Script Web App I set
up, which writes to two different tabs in a Google Sheet depending on
which form was submitted.

## Challenges I ran into

**No real video content from the client.** I didn't have actual
videos/links to use, so I built the portfolio entries as placeholder data
(title, category, duration, short description) instead of hardcoding them
into the page. They're all just objects in one JS file, so it should be
quick to drop in real content later without touching the actual page
markup.

**Getting the form data into Google Sheets without a backend.** I used
Google Apps Script bound to a Sheet, deployed as a web app. The main issue
was CORS — if I set the `Content-Type: application/json` header on the
fetch call, the browser tries to send a preflight `OPTIONS` request first,
and Apps Script doesn't respond to that properly, so the whole request
just fails silently. I fixed it by not setting a Content-Type header at
all (so it defaults to `text/plain`) and parsing the body as JSON manually
on the Apps Script side. It works, but the response you get back in the
browser isn't always reliable because of how Apps Script handles CORS, so
while testing I mostly just checked the Sheet directly to see if the row
actually went in.

**Using one form endpoint for two different forms.** Instead of writing
two separate Apps Scripts, I added a `formType` field to whichever form
gets submitted (`newsletter` or `contact`), and the script checks that
field to decide which sheet tab to write to, creating the tab the first
time it's needed.

**Making the filtering work without a framework.** The portfolio page
re-renders the grid every time you click a filter pill, and updates the
URL with the selected category (like `?cat=gaming`) so the home page can
link straight into a filtered view of the portfolio page.

**Responsiveness.** I used CSS grid with `auto-fit`/`minmax()` for most of
the grid layouts so they reflow on their own across screen sizes instead of
me having to write separate rules for each breakpoint. The nav turns into a
toggled mobile menu under about 820px wide.

## What I'd do differently with more time

Swap in real client videos and team photos, add proper validation messages
on the forms instead of just a generic status line, and probably test the
Apps Script setup with a larger volume of submissions to make sure nothing
breaks.