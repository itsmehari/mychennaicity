# Routing plan — Next.js App Router

## Principles

- **Chennai-first URLs** for public content; the product is **single-city** (Greater Chennai) with `city_id` in the data model for a future multi-city URL scheme.
- **No legacy MyOMR paths** — do not mirror `/omr-*` or old PHP URL shapes.
- **Stable slugs** — unique per city + content type (enforced in Drizzle with composite uniques).

## Public routes (implemented)

| Route | Purpose |
|-------|---------|
| `/` | Home — map/explore, DB-backed news sections when `DATABASE_URL` is set, mock-backed spotlights for jobs/events/directory where noted in code |
| `/chennai-local-news` | News hub — DB articles when available, else mock fallback |
| `/chennai-local-news/[slug]` | Article detail — layouts, hero image, JSON-LD, `notFound` when missing |
| `/chennai-local-news/topic/[topic]` | Topic desk — category ↔ slug via `TOPIC_SLUG_TO_CATEGORY` |
| `/chennai-local-news/feed.xml` | RSS (excerpt policy: see [CONTENT_ARCHITECTURE.md](CONTENT_ARCHITECTURE.md)) |
| `/news` | **308/301** permanent redirect to `/chennai-local-news` |
| `/chennai-local-events` | Events hub — open **scheduled** events from DB when present; else mock list (no fake `ItemList` JSON-LD when on mock) |
| `/chennai-local-events/[slug]` | Event detail — DB row or `notFound` |
| `/chennai-jobs` | Chennai jobs hub — open postings from DB when present; else mock list |
| `/chennai-jobs/[slug]` | Job posting detail — DB or `notFound` |
| `/jobs`, `/jobs/[slug]` | **301** → `/chennai-jobs` / `/chennai-jobs/[slug]` (`next.config.ts`) |
| `/guides/chennai-tech-careers` | Evergreen careers / JD guide (internal links from hub + Economy desk) |
| `/directory` | Directory hub — primarily mock/sample tiles until listings API is wired |
| `/areas/[slug]` | Macro zone hubs (`chennaiZones`) |
| `/about`, `/contact`, `/editorial-standards` | Static trust and info pages |
| `/glossary` | Chennai entity glossary + SEO helpers (`src/lib/seo/chennai-glossary.ts`) |

## SEO / feeds

- **`/sitemap.xml`** — `src/app/sitemap.ts`: static hubs, areas, articles, topics, eligible events/jobs from DB (best-effort if DB unavailable).
- **`/news-sitemap.xml`** — news sitemap route for eligible article URLs.
- **`/robots.ts`** — crawler policy and sitemap reference.

## Admin

- **`/admin`** — Auth-gated shell (`middleware` + session); placeholder dashboard (sign-in/out, role display). CRUD UIs: see [ADMIN_SYSTEM_PLAN.md](ADMIN_SYSTEM_PLAN.md).
- **`/api/auth/[...nextauth]`** — Auth.js route handler.

## Technical

- **Middleware** — protects `/admin` routes; extend for locale or city segment normalization if needed later.
- **Multi-city (future)** — e.g. `/{citySlug}/chennai-local-news/...` or subdomain `chennai.mychennaicity.in`; keep `city_id` on all scoped entities regardless of URL choice.
