# mybanglore.in — agent rules

You are building the Bengaluru city desk. The public host is **https://mybanglore.in** (no trailing slash, no www). The brand string in chrome is **mybanglore.in**. In sentences, the city is **Bengaluru**. Residents also say Bangalore; use that only when quoting search language or a printed source. Do not “correct” the domain to mybangalore.in or mybengaluru.in.

This site is an independent city desk in the same family as mychennaicity.in and mycovai.in. It is not the Bruhat Bengaluru Mahanagara Palike, Greater Bengaluru Authority, BMRCL, BMTC, BWSSB, BESCOM, or the Karnataka government.

## Stack (locked)

- PHP 8.2+ with PDO and prepared statements.
- MySQL 8 or MariaDB 10.6+.
- HTML5, hand-written CSS3, a little Alpine.js.
- Apache or nginx. Clean URLs. Works if the docroot is cPanel `public_html`.
- No Node, npm, Vite, Webpack, React, Next.js, Tailwind, Bootstrap theme, or Laravel unless the operator later asks.
- Composer is allowed for PHP-only packages. v1 needs none beyond PDO.

Browser libraries, loaded from a CDN with Subresource Integrity, or vendored under `public/assets/vendor/`:

- Alpine.js 3 — hero rotation, mega menu, mobile drawer.
- Leaflet — homepage map. OpenStreetMap tiles with visible attribution.
- GSAP 3 + ScrollTrigger — the seasonal band only. If `prefers-reduced-motion: reduce`, do not run it.

Fonts, self-hosted under `public/assets/fonts/` (SIL OFL):

- Geist Sans for all UI. Fallback: `"Segoe UI", system-ui, sans-serif`.
- Source Serif 4 for the single “Explore Bengaluru” headline only.

## Product

A city-scale desk for Bengaluru: local news, jobs, events, a directory, neighbourhood hubs, and later civic tools. Free to browse. One admin desk. One database. One public URL per story.

Personas: resident, contributor (moderated), employer or business, operator.

The public site is English only. Do not add a Kannada, Hindi, Tamil, or Telugu interface. On the About page, say in English that Kannada is the language of the city and that this desk publishes in English.

v1 ships the shell, the full homepage, four public hubs (news, jobs, events, directory), twelve area hubs, legal pages, sitemap, and a small admin that can publish a story. Elections and an education portal wait.

## Voice

Plain, resident-first, specific. Write the way a careful city editor writes, not the way an ad writes. Short sentences. Name the neighbourhood. Say what is known and what is not.

Title template: `{Segment} · mybanglore.in`. Do not put the domain inside the segment or the title doubles.

## Facts

- The database and the operator’s source win. Do not guess a ward number, a fare, a phone, a salary, a deadline, or a zone count.
- A missing figure stays blank. An empty list hides its homepage block.
- JSON-LD only for rows that are really published. No CollectionPage, JobPosting, or Event schema on an empty hub.
- News pages carry a disclaimer near the top and a short AI-assisted fine print at the end.
- Job salary appears only when the source printed a figure. Apply links go to the employer. Do not invent a company name.
- Map pins and GeoJSON are editorial browsing aids. Say so on the map. They are not a legal boundary survey.
- Greater Bengaluru’s municipal map changed after BBMP. Residents still say BBMP. Glossary may record that. Do not publish a ward finder until a file from an official source is in the repo.
- WhatsApp: public buttons go to `/whatsapp-community/join`. Store name, phone, and area, then show the invite. The invite lives in config outside git. Do not print `chat.whatsapp.com` in the header, footer, homepage, or JSON-LD.
- Canonical host is `https://mybanglore.in`. `www` 301s to the apex. No other TLD in copy, links, or schema.
- Time zone `Asia/Kolkata`. Rupees as INR. Dates in Indian English.

## Security

- Escape every text node with `htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')`.
- SQL only through PDO prepared statements.
- Admin session cookie: HttpOnly, Secure, SameSite=Lax. Passwords with `password_hash`.
- CSRF token on every POST.
- `config/config.php` is gitignored. Commit `config/config.example.php` only.
- Deny web access to `/app`, `/config`, `/database`, and `/storage`.

## Briefing

Decisions from the Chennai desk session are in `docs/SESSION_RECORD.md`. The homepage contract and this file win if an older line disagrees.

## Repo shape

```
app/                 PHP — not public. See docs/FILE_MAP.md
views/               PHP templates — not public
config/config.example.php
database/schema.sql  Do not redesign.
database/seed.sql    one city + twelve areas
public/              docroot
docs/HOMEPAGE_DESIGN_CONTRACT.md
docs/FILE_MAP.md
docs/MODULES.md
AGENTS.md
```

The file map is the list of skeletal files. Create those paths in Prompt 0. Fill them in the phase the map names. Do not invent a second folder layout.

Routes the public site must grow into (build only the phase that asks for them):

- `/` homepage
- `/bengaluru-local-news`, `/bengaluru-local-news/topic/{slug}`, `/bengaluru-local-news/{slug}`, `/bengaluru-local-news/feed.xml`
- `/bengaluru-jobs`, `/bengaluru-jobs/{slug}`
- `/bengaluru-local-events`, `/bengaluru-local-events/{slug}`
- `/bengaluru-classifieds` (list shell in a later phase)
- `/directory`, `/directory/{type}/{slug}`
- `/areas`, `/areas/{slug}`
- `/search`
- `/about`, `/contact`, `/editorial-standards`, `/privacy`, `/terms`, `/cookies`, `/community-guidelines`
- `/whatsapp-community/join`
- `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/humans.txt`
- `/desk` admin login

## Homepage law

The homepage section order is fixed in `docs/HOMEPAGE_DESIGN_CONTRACT.md`. Do not reorder, rename the visual system, or restyle it into a generic Bootstrap city template. Match the Chennai homepage feel: warm paper page, teal accent, forest-green hero, mustard highlights, fat dark footer.

## When you finish a phase

Say what a resident can click, the URL, and what is still empty on purpose. Do not claim a civic tool is live when the page is only a link to an official site.


