# Property and jobs advertise — PRD, WBS, implementation

Status: five phases implemented in the repo. Property fee and duration are still unset on purpose (`src/content/advertise-listings.ts`). Classifieds public queries filter `status = open` only. They do not hide a row because `expires_at` has passed. That behaviour was left as it is.
Canonical site: https://mychennaicity.in
Rule: retrofit. Do not replace classifieds, jobs, contact, or admin.

## What already exists

People cannot publish a property ad or a job themselves. There is no public create endpoint. You publish. They send details.

| Surface | Route | What it does today |
| --- | --- | --- |
| Classifieds board | `GET /chennai-classifieds` | Open ads. Categories: vehicles, tuition, services, partnership, flatmates-roommates, wanted. No `property`. |
| Classified detail | `GET /chennai-classifieds/[slug]` | Title, body, photos, area, phone gate. |
| Phone reveal | `POST /api/classifieds/reveal-phone` | Returns the poster phone after the enquirer submits their mobile. |
| Jobs board | `GET /chennai-jobs` | Open jobs, not past `validThrough`. |
| Job detail | `GET /chennai-jobs/[slug]` | Role page. Apply link stays the employer’s. |
| Job view count | `POST /api/jobs/[slug]/view` | Increments a view. Does not create a job. |
| Jobs feed | `GET /chennai-jobs/feed.xml` | Open jobs. |
| Looking for work | `GET /chennai-jobs/looking-for-work` and `[slug]` | Job-seeker profiles. Separate from employer posts. |
| Contact desk | `GET /contact#jobs` | Checklist already asks for role, company, area, apply link, salary. WhatsApp uses `WHATSAPP_BUSINESS_E164`. |
| Jobs admin | `GET /admin/jobs`, `/admin/jobs/new`, `/admin/jobs/[id]` | Auth.js. Create, edit, close, close expired. |
| Classifieds admin | none | Rows are seeded. Table `classified_listings` already has category, images, phone, featured, `expires_at`. |
| Generic advertise strips | `AdvertisePanel` on home, jobs, classifieds, areas | Business-ad WhatsApp. Copy in `src/lib/advertise-panel-copy.ts`. This is not the property or job pitch page. |

Jobs intake is done. Property intake is not. Property has nowhere that says fee, duration, and “send us the listing.”

## PRD

### Users

| Who | Property | Jobs |
| --- | --- | --- |
| Owner or broker you pitch | Decide to pay, then send the listing | — |
| Employer you pitch | — | Send a role you then place |
| Reader | Browse property ads and reach the poster | Browse jobs and apply on the employer’s link |
| You | Seed the classified, set expiry, send the URL | Use `/admin/jobs`, send the URL |

### Offers

Property: you place sale, rent, plot, or commercial. They pay a single package. They send photos, area, price, size, and phone on WhatsApp or email. You seed the row. Public page is the existing classified detail. Phone uses the existing gate. The ad drops off when `expires_at` passes.

Jobs: same operator model, already built. Pitch page explains `/contact#jobs` and `/admin/jobs`. Do not invent a fee. The jobs hub already invites employers to list. Apply stays off-site.

### In scope

- `/advertise/property` and `/advertise/property-tamil`
- `/advertise/jobs` and `/advertise/jobs-tamil`
- Category `property` on the classifieds hub
- Links from home, footer, classifieds hub, and the jobs employer block
- Sitemap rows for the four pitch URLs
- This tracking table, updated as each ID is checked

### Out of scope

Seller or employer login. Public POST that publishes. Online payment. New tables. A property admin screen. A second jobs board. Per-area pitch pages. Changing `POST /api/jobs/[slug]/view` or `POST /api/classifieds/reveal-phone`. Replacing `AdvertisePanel` business ads.

### Requirements

1. Pitch pages do not publish a listing.
2. Property fee, duration, and WhatsApp number are real values you supply. Until then the property pitch page is not published.
3. Jobs pitch buttons use the existing contact channel and jobs WhatsApp prefill. No second inbox.
4. Property samples and job samples are rows already public. No fake listings.
5. Tamil pages are written and cross-linked with `hreflang`.
6. Adding `property` does not change other category filters.
7. Expired classifieds and jobs stay hidden the way they are today.

### Open before property copy ships

Fee. Days live. WhatsApp number if it is not already `WHATSAPP_BUSINESS_E164`. Inbox email if you want a mailto.

Jobs are not blocked by those four.

## Where a change shows up

| Change | Files | Reader sees it |
| --- | --- | --- |
| Property category | `src/lib/classifieds/categories.ts` | Classifieds filter chip and hub blurb. Other chips stay. |
| Property rows | `scripts/seed-*.ts`, `public/images/classifieds/` | `/chennai-classifieds?category=property` and `/chennai-classifieds/[slug]`. Sitemap picks up open classifieds already. |
| Pitch routes | `src/app/(public)/advertise/property/page.tsx`, `property-tamil/page.tsx`, `jobs/page.tsx`, `jobs-tamil/page.tsx` | Those four URLs only. |
| Shared offer numbers | one module under `src/content/` or `src/lib/` | English and Tamil property pages show the same fee and days. |
| Home and footer | `src/app/(public)/page.tsx`, `src/components/site/site-footer.tsx` | “Post a property” and “Post a job”. |
| Classifieds banner | `src/app/(public)/chennai-classifieds/page.tsx` | Link to `/advertise/property`. Leave `AdvertisePanel` business strip as it is. |
| Jobs employer block | `src/components/jobs/chennai-jobs-hub-sections.tsx` | Primary path becomes `/advertise/jobs`, which then links to `/contact#jobs`. |
| Sitemap | `src/app/sitemap.ts` | Four pitch URLs. Existing job and classified URLs stay. |

Not touched: `/admin/jobs`, reveal-phone, job view API, looking-for-work, job feed, area-hub classifieds blocks, generic `AdvertisePanel` copy.

## WBS

1. Decisions — fee, days, property WhatsApp, email. Owner: you. Jobs do not wait.
2. Property category — add id, label, hub description. No schema migration.
3. Sample property ads — seed real rows only when you have them. Pitch page ships with zero samples if none are public, and says the board is the proof.
4. Jobs pitch EN and TA — offer, what to send (reuse `CONTACT_CHANNELS` jobs checklist), links to `/chennai-jobs` and `/contact#jobs`.
5. Property pitch EN and TA — after section 1. Same shape. Fee and days from the shared module.
6. Discovery links — home, footer, classifieds banner, jobs employer block.
7. Sitemap — four URLs.
8. Validate — tracking table below. Mark each ID after the check, not before.

## Implementation order

1. Add `property` to categories. Run the classifieds category tests if present, or the hub filter by hand.
2. Build `/advertise/jobs` and `/advertise/jobs-tamil`. Wire the jobs employer block to the English or Tamil pitch.
3. Add home and footer links for jobs now, property when that URL exists.
4. When fee, days, and number are set, build the two property pitch pages from the shared module.
5. Seed property ads when you have real copy and photos.
6. Add the four URLs to `src/app/sitemap.ts`.
7. Walk the tracking table.

## Tracking

Mark `pass` only after the check. `blocked` means a decision is missing. Do not mark a row pass because the file exists.

| ID | Change | Check | Result |
| --- | --- | --- | --- |
| P1 | Category `property` | `/chennai-classifieds?category=property` returned 200 and includes Property. | pass |
| P2 | Other categories unchanged | Hub chips still list the old categories, plus Property. | pass |
| P3 | Sample ads | Property pitch says no sample is up yet. | pass |
| P4 | Property pitch EN | 200. Checklist, WhatsApp, `/contact#property`. Package sentence has no fee. A ₹49 on the page is the existing resume partner ad. | pass |
| P5 | Property pitch TA | 200. Same package module. | pass |
| P6 | Expiry | `expires_at` is still not a public filter. | left unchanged |
| J1 | Jobs pitch EN | 200. Links to `/contact#jobs` and `/chennai-jobs`. Says list for free. | pass |
| J2 | Jobs pitch TA | 200. Tamil checklist. Cross-link to English. | pass |
| J3 | Existing intake | `/contact` 200. Jobs checklist unchanged. `/contact#property` added. | pass |
| J4 | Admin untouched | `/admin/jobs` files not edited. | pass |
| J5 | Apply path | Job detail apply field not edited. | pass |
| D1 | Home | Homepage HTML includes both pitch links. | pass |
| D2 | Footer | Work column links to both pitch pages. | pass |
| D3 | Classifieds hub | Property link plus the existing classifieds advertise panel. | pass |
| D4 | Jobs hub | `/chennai-jobs` HTML links to `/advertise/jobs`. | pass |
| S1 | Sitemap | Four paths added in `src/app/sitemap.ts`. XML not fetched in this check. | code in |
| A1 | APIs | reveal-phone and job view routes not edited. No create route added. | pass |

Package copy test: `src/content/advertise-listings.test.ts` (fee stays null, sentence has no rupee amount).

## Go / no-go

Jobs pitch, property category, and discovery links for jobs can start now.

Property pitch pages wait on fee, duration, and the WhatsApp number or email.
