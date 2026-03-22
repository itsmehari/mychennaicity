# Entity model (Postgres) — draft

All tables include `created_at`, `updated_at` (timestamptz) unless noted. Use **UUID** primary keys for public entities if exposing IDs in URLs; serial is acceptable for internal-only tables.

## Geography

**`cities`**

- `id`, `slug` (unique), `name`, `country_code` (default `IN`)

**`localities`** (optional normalization)

- `id`, `city_id` → `cities`, `slug`, `name`, `kind` (enum: `area`, `zone`, `ward` — TBD)

## Content

**`articles`**

- `id`, `city_id` (nullable for global), `slug` (unique per city or globally — **unique index** definition TBD)
- `title`, `summary`, `body` (text/markdown/HTML — choose one in implementation)
- `status` (`draft` | `published` | `archived`)
- `published_at`, `author_id` → `users` (nullable)
- `featured` (boolean), `hero_image_url` (text, nullable)
- **Lesson from legacy:** single visibility rule; avoid scattered flags.

**`article_categories`** / **`articles_categories`** (M:N or FK — pick one; M:N for flexibility)

## Events

**`events`**

- `id`, `city_id`, `slug` (unique per city)
- `title`, `description`, `starts_at`, `ends_at`, `all_day`, `timezone` (default `Asia/Kolkata`)
- `venue_name`, `venue_address`, `locality_id` (nullable)
- `status` (`draft` | `scheduled` | `cancelled` | `completed`)
- `featured` (boolean), `submitted_by_user_id` (nullable)

## Jobs

**`employers`**

- `id`, `name`, `slug`, `website_url`, `logo_url`
- `billing_plan` (enum or FK to `plans`) — **reinterpret** employer pack

**`job_postings`**

- `id`, `employer_id`, `city_id`
- `title`, `slug` (unique per employer or global — prefer scoped unique)
- `description`, `location_label`
- `salary_min`, `salary_max` (integer INR, nullable), `salary_disclosed` (boolean)
- `experience_level` (enum), `remote_policy` (enum: `onsite` | `remote` | `hybrid`)
- `openings_count` (int), `status` (`draft` | `open` | `closed`)

**`job_applications`**

- `id`, `job_posting_id`, `applicant_user_id` or email + profile
- **Unique** `(job_posting_id, applicant_identity)` — align with legacy uniqueness intent

## Directory (unified option)

**`directory_entries`**

- `id`, `city_id`, `type` (enum: `bank`, `school`, `hospital`, …)
- `name`, `slug` (unique per `city_id` + `type`)
- `address`, `locality_id`, `geo` (PostGIS later — **defer**), `phone`, `website`
- `verified` (boolean), `metadata` (jsonb) for type-specific fields

**Alternative:** separate tables per vertical — better strict typing; more migrations. Choose in implementation based on team preference.

## Marketplace (future)

**`listings`** (generic)

- `vertical` enum: `buy_sell`, `classified`, `property`, …
- `seller_user_id`, `title`, `slug`, `price`, `status`, `expires_at`
- `media` rows in `listing_media` rather than JSON blobs for query efficiency.

## Users and auth

**`users`**

- `id`, `email` (unique), `password_hash` or external auth id
- `role` (`reader` | `contributor` | `editor` | `admin`) — or separate `user_roles` for RBAC

## Audit

**`audit_log`**

- `id`, `actor_user_id`, `action`, `entity_type`, `entity_id`, `payload` (jsonb), `created_at`

## Indexing notes

- Partial indexes on `status = 'published'` / `open` for hot lists.
- `(city_id, published_at desc)` for home feeds.
