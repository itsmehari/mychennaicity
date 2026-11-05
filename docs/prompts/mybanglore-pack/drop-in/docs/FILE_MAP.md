# File map

Prompt 0 creates every path below. A later phase replaces the stub body. It does not move the file.

`public/` is the only docroot. `public/index.php` includes `app/` and `views/`. A request must not be able to download `app/`, `config/`, or `database/`.

## Boot

| Path | Phase | First body |
| --- | --- | --- |
| `public/index.php` | 0 | Load `app/bootstrap.php`, dispatch `app/routes.php`. |
| `public/.htaccess` | 0 | Send non-files to `index.php`. |
| `.htaccess` | 0 | Deny `app`, `config`, `database`, `storage` if the host docroot is the repo root by mistake. |
| `app/bootstrap.php` | 0 | Config, PDO or null, escape helper, CSRF, view renderer. |
| `app/routes.php` | 0 | Every route in this map exists on day one. |
| `app/db.php` | 0 | PDO. Failure returns null and logs. |
| `config/config.example.php` | 0 | DB name `mybanglore`, empty WhatsApp invite, `site_url`. |
| `config/config.php` | 0 | Gitignored copy of the example for the local machine. |
| `.gitignore` | 0 | `config/config.php`, `storage/*.log`, `public/assets/uploads/`. |
| `README.md` | 0 | PHP 8.2, docroot `public`, the two import commands. |
| `storage/.gitkeep` | 0 | Log folder. |

## Chrome and homepage

| Path | Phase | First body |
| --- | --- | --- |
| `views/layout.php` | 0, painted in 1 | Header, main, footer. Title segment. |
| `views/partials/header.php` | 1 | Sticky bar, MB, mega nav, contact, WhatsApp join, search. |
| `views/partials/footer.php` | 1 | Fat footer from the design contract. |
| `views/partials/section.php` | 1 | Eyebrow, title, deck, action link. |
| `views/home/page.php` | 0 placeholders, 1 visual, 2 data | Includes the partials below in contract order. |
| `views/home/hero.php` | 1 | Four slides, Alpine, 7 seconds, pause on hover. |
| `views/home/trust.php` | 1 | Access, Trust, Mobile. |
| `views/home/tools.php` | 1 | Five tool links. |
| `views/home/explore.php` | 1 | Photo band and terracotta button. |
| `views/home/zones.php` | 1 labels, 2 table | Twelve pills. |
| `views/home/map.php` | 1 map, 2 table | Leaflet, same twelve hubs. |
| `views/home/stats.php` | 1 zeros, 2 counts | Open jobs, upcoming events, published stories. |
| `views/home/classifieds.php` | 1 | Omitted until an open classified exists. |
| `views/home/jobs.php` | 1 | Omitted until an open job exists. |
| `views/home/events.php` | 1 | Omitted until an upcoming event exists. |
| `views/home/directory.php` | 1 | Dashed empty panel until a published entry exists. |
| `views/home/topics.php` | 1 | Links to hubs and areas that exist. |
| `views/home/news.php` | 1 empty line, 2 rows | Bulletin and editor picks. |
| `views/home/pulse.php` | 1 | Only rows that have a destination. |
| `views/home/seasonal.php` | 1 | “How this desk works” until a real seasonal item exists. |
| `views/home/sources.php` | 1 | One official external source, one editorial link. |
| `views/home/community.php` | 1 form, 4 saves | Digest form and join link. |
| `public/assets/css/tokens.css` | 0 | Colours and type from the design contract. |
| `public/assets/css/base.css` | 1 | Reset, focus, 1280px container. |
| `public/assets/css/header.css` | 1 | |
| `public/assets/css/footer.css` | 1 | |
| `public/assets/css/home.css` | 1 | |
| `public/assets/js/home.js` | 1 | Only what Alpine in the template does not cover. |

## Repositories

Create these in phase 0. If PDO is null, return empty lists and zero counts. Phase 2 fills in the SQL. Do not put SQL in the views.

| Path | Reads |
| --- | --- |
| `app/repositories/areas.php` | `areas` |
| `app/repositories/articles.php` | published `articles` |
| `app/repositories/jobs.php` | open `job_postings` |
| `app/repositories/events.php` | upcoming `events` |
| `app/repositories/directory.php` | published `directory_entries` |
| `app/repositories/classifieds.php` | open `classified_listings` |
| `app/repositories/home.php` | counts and the lists for `/` |
| `app/domain/dates.php` | Store UTC. Display `Asia/Kolkata`. |
| `app/domain/urls.php` | Paths in the table at the bottom of this file. |
| `app/domain/jsonld.php` | Phase 4. Real rows only. |

## Public pages

Phase 0 stub, inside the shared layout: “This page is filled in phase N.”

| Path | Route | Phase |
| --- | --- | --- |
| `views/news/index.php` | `/bengaluru-local-news` | 3 |
| `views/news/topic.php` | `/bengaluru-local-news/topic/{slug}` | 3 |
| `views/news/show.php` | `/bengaluru-local-news/{slug}` | 3 |
| `views/news/feed.php` | `/bengaluru-local-news/feed.xml` | 3 |
| `views/jobs/index.php` | `/bengaluru-jobs` | 3 |
| `views/jobs/show.php` | `/bengaluru-jobs/{slug}` | 3 |
| `views/jobs/seeker.php` | `/bengaluru-jobs/looking-for-work/{slug}` | later |
| `views/events/index.php` | `/bengaluru-local-events` | 3 |
| `views/events/show.php` | `/bengaluru-local-events/{slug}` | 3 |
| `views/directory/index.php` | `/directory` | 3 |
| `views/directory/show.php` | `/directory/{type}/{slug}` | 3 |
| `views/areas/index.php` | `/areas` | 2 |
| `views/areas/show.php` | `/areas/{slug}` | 2 |
| `views/search/index.php` | `/search` | 3 |
| `views/classifieds/index.php` | `/bengaluru-classifieds` | 3 |
| `views/classifieds/show.php` | `/bengaluru-classifieds/{slug}` | 3 |
| `views/static/about.php` | `/about` | 4 |
| `views/static/contact.php` | `/contact` | 4 |
| `views/static/editorial-standards.php` | `/editorial-standards` | 4 |
| `views/static/privacy.php` | `/privacy` | 4 |
| `views/static/terms.php` | `/terms` | 4 |
| `views/static/cookies.php` | `/cookies` | 4 |
| `views/static/community-guidelines.php` | `/community-guidelines` | 4 |
| `views/static/humans.php` | `/humans.txt` | 4 |
| `views/whatsapp/join.php` | `/whatsapp-community/join` | 4 |
| `views/whatsapp/thanks.php` | `/whatsapp-community/join/thanks` | 4 |
| `views/discovery/sitemap.php` | `/sitemap.xml` | 4 |
| `views/discovery/robots.php` | `/robots.txt` | 4 |
| `views/discovery/llms.php` | `/llms.txt` | 4 |
| `views/civic/index.php` | `/civic-tools` | 5 |
| `views/civic/today.php` | `/bengaluru-today` | 5 |
| `views/guides/afford.php` | `/guides/afford-this-area` | 5 |
| `views/guides/commute.php` | `/guides/commute` | 5 |
| `views/guides/water.php` | `/guides/water` | 5 |
| `views/guides/khata.php` | `/guides/khata-and-tax` | 5 |

BESCOM is a link on Bengaluru today, not its own tool. These pages do not get a live traffic, outage, tanker-rate, or khata lookup table.

## Desk

| Path | Route | Phase |
| --- | --- | --- |
| `app/desk/auth.php` | session and CSRF | 4 |
| `views/desk/login.php` | `/desk` | 4 |
| `views/desk/articles/index.php` | `/desk/articles` | 4 |
| `views/desk/articles/form.php` | `/desk/articles/new` and `/desk/articles/{id}` | 4 |

## SQL

| Path | Phase |
| --- | --- |
| `database/schema.sql` | 0. Copy from this starter. Do not shorten it. |
| `database/seed.sql` | 0. One city and twelve areas. |
| `database/fixture.sql` | 3. One labelled fixture story, one job, one event. Not for production. |

## One URL, one table

| URL | Table | Shown to the public when |
| --- | --- | --- |
| `/bengaluru-local-news/{slug}` | `articles` | `status = published` and `published_at` is in the past |
| `/bengaluru-jobs/{slug}` | `job_postings` | `status = open` and not past `valid_through` |
| `/bengaluru-jobs/looking-for-work/{slug}` | `job_seeker_posts` | `status = open` (page can wait) |
| `/bengaluru-local-events/{slug}` | `events` | `status = scheduled` and not ended |
| `/directory/{type}/{slug}` | `directory_entries` | `status = published` |
| `/bengaluru-classifieds/{slug}` | `classified_listings` | `status = open` and not past `expires_at` |
| `/areas/{slug}` | `areas` | row exists |
