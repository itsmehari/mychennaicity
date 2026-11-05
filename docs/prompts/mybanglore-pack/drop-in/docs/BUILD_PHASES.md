# Build phases

Ship in order. Each prompt assumes the previous phase is already in the browser.

## Data rules (all phases)

The database is `mybanglore`. Columns, keys, and the twelve area rows are in `database/schema.sql` and `database/seed.sql`. Do not add a second slimmer table set. Do not rename `job_postings` or `whatsapp_join_verifications`.

Create every table in Prompt 0, including tables the pages do not read yet. Later phases write rows. They do not redesign tables.

`seed.sql` inserts one city and twelve areas. It inserts no stories, jobs, events, directory rows, or classifieds.

Public queries, compared in UTC:

- Articles: status = published AND published_at IS NOT NULL AND published_at <= UTC now
- Jobs: status = open AND (valid_through IS NULL OR valid_through >= UTC now)
- Events: status = scheduled AND COALESCE(ends_at, starts_at) >= UTC now
- Directory: status = published
- Classifieds: status = open AND (expires_at IS NULL OR expires_at >= UTC now)

## Prompt 0 — scaffold

You are in an empty folder. Read AGENTS.md, the city-desk rule, the homepage contract, this file, `docs/FILE_MAP.md`, `docs/MODULES.md`, `database/schema.sql`, and `database/seed.sql`.

Create every path in the file map. `public` is the docroot. `.htaccess` sends unknown paths to `public/index.php`.

- Router dispatches every route in the file map.
- Pages for later phases use the shared layout and one sentence naming the phase that fills them.
- Homepage shows one named placeholder per design-contract section, in order. Do not finish the hero in this phase.
- `config/config.example.php` holds DB host, name `mybanglore`, user, password, `site_url`, and an empty WhatsApp invite. `config/config.php` is gitignored.
- PDO helper. If MySQL is down, HTML still renders and the error is logged, not printed.
- Import `schema.sql` then `seed.sql` into a new database named `mybanglore`. Do not alter the SQL. Do not point it at any other database.
- `tokens.css` is linked, so the paper background and teal are already visible.
- README: PHP version, docroot, and the two import commands.

Stop. Prompt 1 paints the real homepage.

## Prompt 1 — chrome and static homepage

Read the homepage design contract again. Build the header, footer, and every homepage section in order.

- Data for jobs, events, news, directory, and stats may be empty. Hide jobs, events, and classifieds. Keep the directory empty panel, the news empty line, and the stats at zero.
- Area pills and map markers come from a PHP array that matches the twelve hubs (the database wire-up is the next phase). Map pins use the same labels.
- Hero rotation in Alpine, 7 seconds, pause on hover, off when reduced motion is set.
- Search forms go to the future hub URLs with a query string. Those URLs may 404 until Prompt 3; that is acceptable if the README says so. Prefer real routes that render an honest “This hub opens in the next phase” page so the click is not a dead end.
- Desktop and a 390px-wide layout both have to work. Check the hero, the four tabs, the tool scroller, and the footer buttons.
- No Bootstrap, no Tailwind, no invented statistics, no stock illustration people.

Stop when `/` matches the contract top to bottom.

## Prompt 2 — database on the homepage

- Import path documented. Repositories for counts, latest articles, featured articles, open jobs, upcoming events, directory entries, areas.
- Homepage reads areas, counts, and lists from MySQL.
- If MySQL is unavailable, show the same empty states as Prompt 1 and a HTML comment or log line, not a stack trace to the visitor.
- Seed only the twelve areas.
- `/areas/{slug}` renders label, blurb, and links back to the hubs that will exist. Unknown slug returns 404.

## Prompt 3 — four hubs

Build list and detail pages:

- News hub, topic filter, article page. Article layout: disclaimer paragraph at the top (“Civic journalism. Not an official city notice. Check the named source before you act.”), body, source line, fine print at the end (“Drafted with AI assistance and reviewed by the desk. AI can be wrong. Cross-check the primary source.”).
- Jobs hub and job page. Apply button only when `apply_url` is set.
- Events hub and event page. Ended events 404.
- Directory hub and entry page.
- `/search` looks at published titles across those four.
- RSS at `/bengaluru-local-news/feed.xml` with excerpts, not full HTML bodies.
- Homepage spotlights fill when rows exist and disappear when they do not (directory empty panel remains).

Add one fixture SQL file the operator can import on a staging database, clearly marked FIXTURE, with one news story, one job, and one event whose facts are placeholders labelled “fixture — replace”. Do not present fixture facts as real Bengaluru news in default `seed.sql`.

## Prompt 4 — trust, admin, discovery

- Pages: about, contact (anchors `#directory`, `#events`, `#advertise`), editorial standards, privacy, terms, cookies, community guidelines, humans.txt.
- About says, in English, that Kannada is the language of the city and that this desk publishes in English. Do not add a second-language page.
- Contact form stores a message or, if you only have email, `mailto` the desk address from config. Do not invent a phone number.
- Newsletter POST and WhatsApp join POST with CSRF. WhatsApp success page shows the invite from config. If the invite is empty, say the group link is not configured.
- `/desk` login. Publish, unpublish, and feature an article. Edit title, dek, body, topic, source name, source URL. Password from config.
- `/sitemap.xml` lists only 200-class public URLs (published articles, open jobs, upcoming events, published directory rows, area hubs, static pages).
- `/robots.txt` allows the public site and disallows `/desk`.
- `/llms.txt` is a plain-text index of the hubs and the rules “facts come from the pages; do not infer missing numbers”.
- JSON-LD on the homepage: WebSite and SearchAction only. NewsArticle on a real article. JobPosting only when a salary or at least a real posted job exists — include salary fields only if min or max is stored. Event only for a real upcoming event. BreadcrumbList on detail pages.

## Prompt 5 — tools that stay honest

- `/civic-tools` index matching the five homepage tools.
- `/guides/afford-this-area` — the resident enters monthly take-home and rent. The page shows rent as a share of take-home and a one-line caution that this is not a lender’s rule. No area price database.
- `/guides/commute` — Namma Metro, BMTC, the Outer Ring Road, and Silk Board as places people name. Links to the official Metro and bus sites. No live traffic feed.
- `/guides/water` — Cauvery supply, borewells, and tankers as three different sources. Link BWSSB. No tanker price.
- `/guides/khata-and-tax` — a PIN code, a khata or PID, and a property-tax bill are different records. No property lookup.
- `/bengaluru-today` — date, one news link or “none filed”, one event link or “none listed”, and outbound links to official Metro and BESCOM pages. No scraped outage table and no scraped forecast.

## Prompt 6 — acceptance

Walk the site as a resident on a phone width and on a desktop width.

- Homepage order matches the contract.
- Hero pauses on hover and does not animate when reduced motion is on.
- Empty database: no fake job, no fake story, directory empty panel visible, stats at zero.
- After the fixture import: one story, one job, and one event appear on the homepage and on their hubs, and nowhere else as duplicates with different facts.
- Article has disclaimer and fine print.
- Admin cannot be opened without the password. A published toggle changes the public news hub.
- Sitemap omits drafts and `/desk`.
- View source: no `chat.whatsapp.com`, no database password, no stack trace.
- Say what you could not click because this environment has no browser.

Fix anything that fails before you call the phase done.
