# Content architecture

## Editorial workflow

1. **Draft** in admin — preview optional (server-rendered draft route with token or role gate).
2. **Publish** sets `published_at` and `status = published` atomically.
3. **Unpublish** sets `archived` without deleting (retain slug history for redirects if needed).

## Categories and tags

- **Categories:** controlled vocabulary for navigation SEO.
- **Tags:** optional free-form for clustering; avoid tag-sprawl with merge tools later.

## Locality attachment

- Prefer **`locality_id`** FK to normalized table; allow `location_label` override for edge cases.
- **City** always set for Chennai-scoped content; nullable only for India-wide editorial.

## Media

- Store **URLs** to object storage (e.g. Vercel Blob, S3-compatible) — not database blobs.
- Image optimization via `next/image` with allowed remote patterns.

## Legacy lesson

- Avoid parallel **static file** and **DB** article systems; one source of truth prevents sitemap and canonical conflicts.

## Slug changes and redirects

- **Never** reuse a slug for a different story; keep a redirect map from old slug → new canonical URL.
- Prefer **301** via middleware, edge config, or a small `redirects` table in the database (checked before `notFound()` on articles).
- Document each change in commit messages and, for major migrations, in release notes.

## RSS (`/chennai-local-news/feed.xml`)

- **Current default:** `description` per item is an **excerpt** (`summary` → `dek` → `title`) — not full article HTML. This reduces scraper dilution while keeping readers oriented.
- **Alternative:** full-text items improve reader apps but increase copy risk; if you switch, update the feed generator and note the policy here.

## On-page SEO / AEO habits

- **Summary vs dek:** `dek` is the short display line; `summary` is the factual lead — show both when they differ so the first screen matches meta description intent.
- **Primary source:** keep `source_url` / `source_name` accurate; the article template surfaces them as the outbound citation.
- **Interactives:** `interactive_json` supports `checklist`, `poll`, `takeaways`, `faq`, and `howto` shapes — use `faq` / `howto` only with real, non-thin Q&A or steps (avoid empty schema).

## Search measurement (ops)

- Add the site in **Google Search Console** and **Bing Webmaster Tools**; submit `sitemap.xml` (and optionally `news-sitemap.xml` if you pursue News surfaces).
- Track branded and local queries (e.g. Chennai + desk names, OMR, GCC) in GSC; pair with **CWV** reports for LCP/CLS regressions after image or map changes.

## Events and jobs (public indexation)

- **Events:** Public hub and sitemap only include rows with `status = scheduled` and `COALESCE(ends_at, starts_at) >= now()`. Cancelled, draft, or ended events are excluded; a bookmarked URL to an ended event should **404** (`notFound`).
- **Jobs:** Public hub and sitemap only include `status = open`. Closed or draft postings must not appear in `sitemap.xml` or list UIs.
- **Hub fallback:** When the database has **no** eligible rows, `/chennai-local-events` and `/jobs` keep the **mock** editorial lists — **without** `CollectionPage` / `ItemList` JSON-LD (avoid thin or fake structured data).

## Article metadata (optional columns)

- **`area_hub_slug`:** Must match a slug in `chennaiZones` when set; invalid values are ignored in UI and JSON-LD.
- **`author_byline` / `author_same_as`:** When `author_byline` is set, `NewsArticle` author becomes a `Person` in JSON-LD; `author_same_as` is comma-separated profile URLs.

## Build / QA checklist (release)

- Run `npm run build` (and CI) before deploy.
- After schema changes, apply migrations (`drizzle` SQL or `db:push`) to **preview** and **production** Neon.
- Spot-check **Rich Results Test** or Schema validator on: one long news article (TOC `ItemList` + optional Speakable), `/glossary`, one live **event** detail, one **open job** detail.
- Confirm `sitemap.xml` contains only URLs that return **200** and match public query rules (no closed jobs / ended events).

## Off-repo SEO / growth (not in this repo)

- **Orphan URLs:** Quarterly pass: URLs in the sitemap with no internal inlinks except the sitemap — add contextual links from hubs or related articles.
- **Backlinks / digital PR:** Pitch desks, partners, and community orgs for earned links to area hubs and explainers.
- **Tamil locale:** Strategy for Tamil titles or `ta` alternate pages (hreflang) when you have translated content — not enabled by default.
- **Google Business Profile / NAP:** If you have a physical office, keep NAP consistent with the site and GBP.
- **Entity glossary:** Only add Wikipedia/Wikidata `sameAs` in `chennai-glossary` after manual verification.

