# Chennai local events — product, UI, and ops

**Routes:** `/chennai-local-events` (hub) · `/chennai-local-events/[slug]` (detail)

**Domain code:** `src/domains/events/` · **Seeds:** `scripts/seed-event-*.ts`

For **how to add a new event to production**, start with **[`docs/prompts/ADD_CHENNAI_EVENT.md`](prompts/ADD_CHENNAI_EVENT.md)** (agent/user checklist + copy-paste prompt). Cursor also loads [`.cursor/rules/chennai-events.mdc`](../.cursor/rules/chennai-events.mdc) when working on event files.

---

## 1. Data model (`events` table)

| Column | Notes |
|--------|--------|
| `slug` | Unique per `city_id`; URL segment. Lowercase, hyphenated, stable. |
| `title` | H1 and JSON-LD `name`. |
| `description` | Markdown prose on standard detail pages. Use `**Organiser:**` or `**X** presents` if organiser should appear in UI/JSON-LD. |
| `starts_at` / `ends_at` | `timestamptz`; store UTC instants that match **IST** wall times. |
| `all_day` | When true, calendar + display use date-only formatting. |
| `venue_name`, `venue_address`, `locality_label` | Location card, maps link, hub card venue line. |
| `status` | Public site only shows `scheduled` with `COALESCE(ends_at, starts_at) >= now()`. |
| `featured` | Hub “Featured” row + filter chip. |
| `presentation_key` + `content_ref` | Optional rich layout (`festival_rich` + bundle under `src/content/special-events/`). |

There is **no** `organizer`, `category`, `price`, or `image_url` column yet — UI infers tags and images from content (see below).

Indexation rules: [`CONTENT_ARCHITECTURE.md`](CONTENT_ARCHITECTURE.md#events-and-jobs-public-indexation).

---

## 2. Hub listing UI (2026-08)

**Goal:** listings and answer copy above the fold; ads / WhatsApp / advertise below.

| Piece | Path |
|-------|------|
| Page | `src/app/(public)/chennai-local-events/page.tsx` |
| Hero (answer + Next up + jumps) | `src/components/events/events-hub-hero.tsx` |
| Listing (client filter) | `src/components/events/events-hub-listing.tsx` |
| Card | `src/components/events/event-hub-card.tsx` |
| Card data / tags | `src/lib/events/event-hub-helpers.ts` |
| AEO strip (below grid) | `src/components/events/events-hub-aeo-strip.tsx` |
| Plain digest | `src/components/events/events-hub-this-week-digest.tsx` |
| Styles | `src/styles/events-hub.css` |

**Above-the-fold order:** breadcrumbs → hero (H1, direct answer, jump links, Next up) → Browse listings (`#browse-events`) with sticky category chips.

**Below fold:** plain digest → AEO facts → FAQ → planning → ads / WhatsApp / advertise / community.

**Behaviour:**

- DB rows → discovery cards; empty state points to Contact → Local events.
- Category chips: All, Festivals, Culture & arts, Community, Business & talks, Featured.
- Card image from festival rich gallery/OG or registered poster (`event-poster-image.ts`); else no image.
- Status line: **See details** (on-site). No fake “Free” pricing.
- Dynamic `generateMetadata` includes live upcoming count when available.

---

## 3. Event detail UI (2026-06)

| Layout | When | Main component |
|--------|------|----------------|
| Standard | `presentation_key` is null | `src/components/events/event-detail-standard.tsx` |
| Festival rich | e.g. `festival_rich` | `src/components/events/special/festival-rich-event-detail.tsx` |

**Standard detail additions:**

| Piece | Path |
|-------|------|
| Summary card, location, CTAs, audience | `src/components/events/event-detail-parts.tsx` |
| Mobile sticky actions (share, calendar, directions) | `src/components/events/event-mobile-actions.tsx` |
| Share (Web Share API + copy fallback) | `src/components/events/event-share-button.tsx` |
| Maps / calendar / organiser parse | `src/lib/events/event-detail-helpers.ts` |
| Styles | `src/styles/event-detail.css` |

**SEO:** `src/lib/seo/event-jsonld.ts` — Event + BreadcrumbList; `organizer` only when parsed from description. Rich festivals: `src/lib/seo/festival-event-jsonld.ts`.

**Post event CTA:** links to `/contact` until a dedicated submit route ships.

---

## 4. Rich festival events (`festival_rich`)

1. Add content bundle: `src/content/special-events/{name}.ts` + register in `src/content/special-events/index.ts`.
2. Seed row with `presentationKey: "festival_rich"`, `contentRef` matching bundle key.
3. Register page in `src/domains/events/presentations/registry.ts` if adding a new presentation key.
4. PDFs / images: prefer `public/documents/...` or allowlisted `next.config.ts` remote hosts.

Reference: `scripts/seed-event-mylapore-panguni-2026.ts`, `src/content/special-events/mylapore-kapali-panguni-2026.ts`.

---

## 5. Seeding and production

### Shared module

`scripts/lib/seed-event-shared.ts` — env load, Chennai `city_id`, idempotent `insertEventIfMissing`, `istToUtcDate()`.

### Per-event scripts

Pattern: `scripts/seed-event-{short-name}.ts` + `package.json` scripts:

```json
"db:seed:event:{name}": "tsx scripts/seed-event-{name}.ts",
"db:seed:event:{name}:live": "tsx scripts/seed-event-{name}.ts --live"
```

### Live checklist

1. Confirm Vercel `DATABASE_URL` target Neon project ([`DATABASE_AND_VERCEL.md`](DATABASE_AND_VERCEL.md)).
2. `vercel env pull .env.production.local --environment=production` (gitignored).
3. `npm run db:seed:event:{name}:live`
4. Verify: `npm run db:check:live` (if events counted) + open live hub and detail URL.
5. **Redeploy Vercel** if you changed code (not required for DB-only inserts on `force-dynamic` routes). A new poster file is not on the live CDN until that deploy.
6. **Private WhatsApp QR:** if the flyer says the group code is private, do not publish that code. Cover it on the self-hosted poster and do not put a `chat.whatsapp.com` link in the description.
7. Optional: companion **news article** seed (see `scripts/seed-edii-tn-ecommerce-training-2026.ts`).
8. New remote images → add host to `next.config.ts` `images.remotePatterns`.

### IST → UTC

Use `istToUtcDate(y, m, d, hour, minute)` from `seed-event-shared.ts`, or explicit ISO with `+05:30` offset. Wrong offsets shift date badges and calendar links.

---

## 6. Existing seed scripts (reference)

| Script | npm (live) |
|--------|------------|
| `seed-event-lions-champions-of-change-2026.ts` | `db:seed:event:lions-champions-of-change:live` |
| `seed-event-mylapore-panguni-2026.ts` | `db:seed:event:mylapore-panguni:live` |
| `seed-event-panguni.ts` | `db:seed:event:panguni:live` |
| `seed-edii-tn-ecommerce-training-2026.ts` | `db:seed:edii-tn-ecommerce-training-2026:live` |
| `seed-event-sj-jananiy-carnatic-august-2026.ts` | `db:seed:event:sj-jananiy-carnatic:live` |
| `seed-event-frangipani-kaber-vasuki-august-2026.ts` | `db:seed:event:frangipani-kaber-vasuki:live` (enriches `ticket9-frangipani-tour-chennai`) |
| `seed-event-sukoon-baithak-adyar-september-2026.ts` | `db:seed:event:sukoon-baithak-adyar:live` |
| `seed-event-tabla-poetry-september-2026.ts` | `db:seed:event:tabla-poetry:live` |
| `seed-event-tn-international-kite-festival-august-2026.ts` | `db:seed:event:tn-international-kite-festival:live` |
| `seed-event-shore-temple-classic-surfing-august-2026.ts` | `db:seed:event:shore-temple-classic-surfing:live` |
| `seed-event-madras-day-chennai-to-madras-august-2026.ts` | `db:seed:event:madras-day-chennai-to-madras:live` |
| `seed-event-made-of-chennai-food-music-festival-august-2026.ts` | `db:seed:event:made-of-chennai-food-music:live` |
| `seed-event-sri-kala-sudha-krishnaashtami-september-2026.ts` | `db:seed:event:sri-kala-sudha-krishnaashtami:live` |
| `seed-event-dharma-rakshana-mahotsava-october-2026.ts` | `db:seed:event:dharma-rakshana-mahotsava:live` |
| `seed-event-idhu-ungal-sothu-property-expo-october-2026.ts` | `db:seed:event:idhu-ungal-sothu-property-expo:live` |
| `seed-event-easwari-startup-peravai-october-2026.ts` | `db:seed:event:easwari-startup-peravai:live` |
| `seed-event-chennai-organic-market-perungudi-october-2026.ts` | `db:seed:event:chennai-organic-market-perungudi:live` |
| `seed-event-folk-arts-parai-workshop-anna-nagar-october-2026.ts` | `db:seed:event:folk-arts-parai-anna-nagar:live` |
| `seed-event-saturangam-tn-childrens-chess-november-2026.ts` | `db:seed:event:saturangam-tn-childrens-chess:live` |
| `seed-event-india-retail-investors-expo-october-2026.ts` | `db:seed:event:india-retail-investors-expo:live` |
| `seed-event-strings-of-rasa-siruseri-november-2026.ts` | `db:seed:event:strings-of-rasa:live` |
| `seed-event-tricku-or-murukku-october-2026.ts` | `db:seed:event:tricku-or-murukku:live` |
| `seed-event-gojobsync-mega-job-fair-december-2026.ts` | `db:seed:event:gojobsync-mega-job-fair:live` |
| `seed-meetup-chennai-aug-sep-2026.ts` | `db:seed:meetup-chennai-aug-sep:live` (15 Meetup/community rows) |

---

## 7. Roadmap (not built)

- DB columns for organiser, category, ticket URL, hero image (would simplify hub cards and JSON-LD).
- Home “Featured events” strip reuse of hub card components (home already has a DB-backed featured strip).

---

## 8. Changelog

| Date | Change |
|------|--------|
| 2026-06-10 | Hub: kynhood-style discovery cards + category filter. Detail: mobile-first summary, sticky actions, share/calendar/maps. Docs + `ADD_CHENNAI_EVENT` prompt + Cursor rule + `seed-event-shared.ts`. |
| 2026-08-10 | Four music listings: Jananiy Carnatic (Narada Gana Sabha), Frangipani/Kaber (enrich Ticket9), Sukoon baithak (Mathsya Adyar), Tabla Poetry (Music Academy Mini Hall). Self-hosted posters + live seeds. |
| 2026-08-10 | Hub overhaul: above-the-fold hero + Next up + browse grid; ads/community CTAs below; sticky filters; dynamic meta; stronger FAQ/AEO. Components: `events-hub-hero.tsx`, `events-hub-aeo-strip.tsx`. |
| 2026-08-10 | Meetup Aug–Sep batch (15 workshops/tech/networking/wellness) + thematic posters + AEO/FAQ meetup copy. |
| 2026-08-15 | TTDC ECR weekend: kite festival (TNIKF, Ocean View, 14–16 Aug) + WSL Shore Temple Classic (12–16 Aug). Companion tourism page `/chennai-tourism/this-weekend-ecr-plan`. Dedicated news `db:seed:tn-international-kite-festival-august-2026(:live)` → `/chennai-local-news/tamil-nadu-international-kite-festival-mamallapuram-august-2026`. |
| 2026-08-15 | Public submit form `/chennai-local-events/submit` — inserts `draft` rows, IP rate limit, IST datetime. Editors must schedule before the hub lists them. |
| 2026-08-21 | Madras Day 2026 Chennai-to-Madras photo exhibition (L Ramachandran, Anna Centenary Library, 22–31 Aug) via `db:seed:event:madras-day-chennai-to-madras(:live)`. Poster `public/images/events/madras-day-chennai-to-madras-photo-exhibition-august-2026.png`. |
| 2026-08-23 | Made of Chennai Food and Music Festival (The Hindu / Casagrand; YMCA Nandanam, 29 Aug, 4 PM onwards) via `db:seed:event:made-of-chennai-food-music(:live)`. Poster `public/images/events/made-of-chennai-food-music-festival-august-2026.png`. |
| 2026-09-13 | Sri Kala Sudha Telugu Association Krishnaashtami & 28th anniversary (Music Academy, TTK Road, 13 Sep 2026, 5:00 PM) via `db:seed:event:sri-kala-sudha-krishnaashtami(:live)`. Poster `public/images/events/sri-kala-sudha-telugu-association-krishnaashtami-september-2026.png`. |
| 2026-09-29 | Dharma Rakshana Mahotsava / Dashamanotsava of Sri Sri Vidyashreesha Tirtha Swamiji (B V Bhavan's Rajaji Vidyashram, Kilpauk, 4 Oct 2026, 4:00–8:00 PM) via `db:seed:event:dharma-rakshana-mahotsava(:live)`. Poster `public/images/events/dharma-rakshana-mahotsava-kilpauk-october-2026.jpg`. |
| 2026-09-30 | Idhu Ungal Sothu Mega Property Expo (ARK Eventz, 18th edition; 10–11 Oct 2026; Arul Murugan Towers, Old Pallavaram, and Swapna Thirumana Maaligai, Urapakkam) via `db:seed:event:idhu-ungal-sothu-property-expo(:live)`. No poster supplied. |
| 2026-09-30 | Chennai Organic Market (OFM / TNIVF marks; Vallalar Sanmargam Arangam, Perungudi; Sunday 11 Oct 2026, 10:00 AM–5:00 PM) via `db:seed:event:chennai-organic-market-perungudi(:live)`. Poster `public/images/events/chennai-organic-market-perungudi-october-2026.jpg`. |
| 2026-09-30 | Student Artists Federation free parai drumming workshop (Anna Nagar Tower Park, Sunday 4 Oct 2026, 11:00 AM–3:00 PM; Mr. Prem Kumar, 97898 49501) via `db:seed:event:folk-arts-parai-anna-nagar(:live)`. Poster `public/images/events/folk-arts-parai-workshop-anna-nagar-october-2026.jpg`. |
| 2026-10-04 | Saturangam 360 — 4th Tamil Nadu State Level Children's Chess Tournament (BVM Global Perungudi; Sunday 15 Nov 2026; reporting 8.30 am, first round 9.00 am; entry not open) via `db:seed:event:saturangam-tn-childrens-chess(:live)`. Poster `public/images/events/saturangam-360-tn-state-childrens-chess-perungudi-november-2026.jpg`. |
| 2026-10-18 | Easwari Startup Peravai (Easwari Engineering College, Bharathi Salai, Ramapuram; 30–31 Oct 2026; visitor pass free, event pass ₹499; seven catalogue sessions) via `db:seed:event:easwari-startup-peravai(:live)`. Poster `public/images/events/easwari-startup-peravai-october-2026.jpg`. Companion news `db:seed:easwari-startup-peravai-october-2026(:live)`. |
| 2026-10-19 | India Retail Investors Expo Season 3 (DFAIRS; D7 Auditorium, IIT Madras Research Park, Taramani; 31 Oct–1 Nov 2026, 10:00 AM–6:30 PM on MeetGrow, session grid to 6:00 PM; MeetGrow passes Gold ₹99 / Diamond ₹699 / Platinum ₹1,399; community code CMNITY100 from WhatsApp, not on the official pages) via `db:seed:event:india-retail-investors-expo(:live)`. |
| 2026-10-25 | Strings of Rasa (Ramana Balachandhran; Mohamad Satak Auditorium, Siruseri; Sun 1 Nov 2026, 5:30 PM; calendar held to 8:30 PM because the poster has no finish time; patron 88389 73850; tickets on MDnD, fare unprinted) via `db:seed:event:strings-of-rasa(:live)`. Poster not on the live CDN until this file is deployed. |
| 2026-10-25 | Tricku or Murukku (Curious Korner; ages 5–12; Sat 31 Oct 2026, 10:00 AM–1:00 PM; hall after RSVP; FOMRRA ₹200 off via the form’s FOMRRA WhatsApp group option; +91 90475 83033) via `db:seed:event:tricku-or-murukku(:live)`. Poster not on the live CDN until this file is deployed. |
| 2026-10-30 | Go JobSync Mega Job Fair (Dr. M.G.R. Educational and Research Institute, Maduravoyal; Sat 12 Dec 2026; hours unprinted so the calendar is all day; poster 500+ companies; note says 25,000+ openings; register page ₹99 vs note ₹100; poster enquiries 90320 73539 and Chandrapalreddyhr@gmail.com; register page also prints 73059 40312) via `db:seed:event:gojobsync-mega-job-fair(:live)`. Poster hides the private WhatsApp QR. Poster not on the live CDN until this file is deployed. Hub “Business & talks” now also matches “job fair” and “career fair”. |

