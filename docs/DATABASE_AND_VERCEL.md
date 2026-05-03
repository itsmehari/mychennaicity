# Neon `DATABASE_URL` — learnings and Vercel setup

## What this app expects

- **`NEXT_PUBLIC_SITE_URL`** — canonical **origin** only (e.g. `https://mychennaicity.in`, no trailing slash). Used for `metadataBase`, Open Graph `url`, canonical links, sitemap `loc`, and robots sitemap lines. Set this in **Vercel → Production** to the hostname you want indexed; preview deployments may override with the preview URL if you choose, but Production must match the live domain or you risk split signals (duplicate canonicals). The app normalizes via [`getSiteUrl()`](../src/lib/env.ts): trims whitespace, strips trailing slashes, uses `URL.origin`, and upgrades `http` to `https` when `NODE_ENV=production`.
- **Single variable:** `DATABASE_URL` — full Postgres URI from Neon (pooled connection string is recommended for serverless / Vercel).
- **Runtime:** Next.js reads **`.env.local`** in development and **Vercel Environment Variables** in production. It does **not** read `secrets/database.local.env` automatically.
- **Tooling:** `drizzle.config.ts` and seed scripts load, in order:
  1. `secrets/database.local.env` (optional team-local backup)
  2. `.env.local`
  3. `.env`  
  Live seed: **only** `.env.production.local` (e.g. after `vercel env pull`).

## Neon checklist

1. Create project in [Neon Console](https://console.neon.tech).
2. Use **Connection details** → copy the **pooled** URI if you deploy to Vercel (host often contains `-pooler`).
3. Query params `sslmode=require` (and Neon’s `channel_binding=require` if shown) are normal; keep them unless a client library errors—in that case try Neon’s “no channel binding” URI from the dashboard.

## Vercel procedure (manual)

Direct link (team slug may vary):  
`https://vercel.com/<your-team>/mychennaicity/settings/environment-variables`

1. Open [Vercel Dashboard](https://vercel.com/dashboard) → select the **mychennaicity** project.
2. **Settings** → **Environment Variables**.
3. **If `DATABASE_URL` already exists** (common when **Vercel ↔ Neon** integration is connected): open the row **⋯ menu** → **Edit**, paste the new pooled URI from the **`mychennaicity`** Neon project, save. Do **not** add a duplicate key.
4. **If there is no `DATABASE_URL`:** **Add Environment Variable** → name `DATABASE_URL` → paste the Neon URI → apply to **Production** (and **Preview** / **Development** if you want).
5. **Save**. Trigger a **Redeploy** so serverless functions and SSR see the new value.
6. Optional: `vercel env pull .env.production.local --environment=production --yes` then `npm run db:push:live` / `npm run db:seed:live`.

### Learnings (Neon integration vs manual URI)

- Vercel can inject many vars at once (`POSTGRES_*`, `DATABASE_URL_UNPOOLED`, `NEON_PROJECT_ID`, etc.) from the **Integrations → Neon** link. Those refer to **one** Neon project. If you create a **new** Neon project (e.g. `mychennaicity` in Singapore), either:
  - **Reconnect** the integration to that project (recommended), or  
  - **Override** `DATABASE_URL` manually to the new URI and accept that other `POSTGRES_*` vars may still describe the old project until you fix the integration.
- The app code used in this repo reads **`DATABASE_URL`** for Drizzle (`src/db/client.ts`). Align that variable with the database you actually migrated and seeded.

### Vercel “Connect Project” modal — common mistakes

- **“Already connected to the target store”:** The **mychennaicity** project is already linked to a Neon database. You do **not** need a second connection for the same store. **Cancel** the modal. Use **Settings → Environment Variables** to confirm **`DATABASE_URL`** (and related `POSTGRES_*` vars) are present.
- **Custom prefix `STORAGE`:** That creates variables like **`STORAGE_URL`**, not **`DATABASE_URL`**. This app **does not** read `STORAGE_URL`. Leave the prefix **empty** (default) when connecting Neon so Vercel injects **`DATABASE_URL`**, or set **`DATABASE_URL` manually** to the pooled connection string from Neon **Connect**.

### Two Neon projects (easy to confuse)

- **Vercel-created Neon** (e.g. project id `super-lake-…` under “Vercel: …” org) is what **`DATABASE_URL` on Vercel** usually points at.
- A **separately created** Neon project (e.g. `ep-misty-mountain-…`) is a **different database**. Seeding locally with `secrets/database.local.env` fills **that** DB only. Production will stay empty until you run **`npm run db:push:live`** and **`npm run db:seed:live`** against the URI in **Vercel’s** `DATABASE_URL`, or until you point **`DATABASE_URL`** on Vercel at the same project you seeded locally.

## After `DATABASE_URL` is live

1. Push schema: `npm run db:push` (against dev DB) or `npm run db:push:live` (production `.env.production.local`).
2. Seed content: `npm run db:seed` or `npm run db:seed:live`.
3. **Verify DB:** `npm run db:check` (local env) or **`npm run db:check:live`** after `vercel env pull …` — prints Chennai article counts against the **production** `DATABASE_URL`.
4. Confirm the home **News bulletin** and `/chennai-local-news` show articles.

### Home page was empty on Vercel while DB had data

The app used **static generation** for `/` at build time. If `DATABASE_URL` was missing during the Vercel build (or the DB was empty then), Next.js shipped **HTML with zero articles** until the next change.

**Fix (in repo):** `/`, `/chennai-local-news`, topic pages, article `[slug]`, and `feed.xml` use **`export const dynamic = "force-dynamic"`** so each request loads articles from Neon using **runtime** env vars. After setting `DATABASE_URL` on Vercel, **redeploy** once. The home bulletin and public article reads additionally use **`unstable_cache`** (short revalidate, see `homeNewsBulletinCached` / `getPublishedArticleBySlugCached` in `src/domains/news/queries.ts`) to cut repeated DB work without reverting to build-time-only HTML.

## Security learnings

- Treat `DATABASE_URL` like a password: **no commits**, no Slack/Discord, no chat logs.
- If leaked: **rotate** credentials in Neon and update Vercel + `secrets/database.local.env` + `.env.local`.
- The `secrets/` copy is for **your machine and trusted backups** only; CI should use Vercel/GitHub **encrypted secrets**, not files in the repo.

---

## Production data: ways to add or update content (avoid local-only pain)

Local `vercel login` + `.env.production.local` works but breaks easily (new machine, no CLI session, OneDrive paths). Anything below uses **the same `DATABASE_URL` production already has**, without copying secrets into chat.

### 1. **CI job (recommended for seeds and migrations)**

Store **`DATABASE_URL`** (production pooled URI) as a **GitHub Actions secret** (e.g. `PRODUCTION_DATABASE_URL`). Add a **manual** workflow (`workflow_dispatch`) that checks out the repo, runs `npm ci`, then:

- `npx drizzle-kit push` (or migrate) with `DATABASE_URL` set from the secret, and  
- `npm run db:seed` **or** a dedicated `tsx scripts/your-seed.ts` that only upserts what you need.

**Why it helps:** One place to run “push schema + seed”; no Vercel CLI on your laptop; audit log in GitHub; you can require branch protection / approvals later.

**Caveat:** Rotating the Neon password means updating **both** Vercel env and the GitHub secret.

### 2. **Protected API route on Vercel (good for “run seed from production”)**

Add something like `POST /api/admin/reseed` (name it clearly) that:

- Checks a shared secret: `Authorization: Bearer <ADMIN_SEED_SECRET>` (value only in **Vercel env**, never committed).  
- Runs the same **idempotent** upsert logic your seed script uses (import shared functions or call a small internal module).  
- Returns JSON with row counts / errors.

**Why it helps:** `DATABASE_URL` is already injected on Vercel — **no env pull**. You trigger from curl, Postman, or a private admin page.

**Caveats:** Serverless **timeouts** (keep work under the limit or split into steps); **never** expose the route without the secret; rate-limit / IP allowlist if you can.

### 3. **Vercel Cron + tiny endpoint (optional)**

Same as (2) but triggered on a schedule — only if you truly need periodic sync from an external source. Usually unnecessary for editorial seed data.

### 4. **Admin UI (longer term)**

Use **Auth.js** (or similar) with an **admin role**, then build forms or “import JSON” that insert/update rows via Drizzle. Production DB is touched only by **logged-in admins**. Best for day-to-day content; seeds remain for bulk bootstrap.

### 5. **Keep the local path as a backup**

`vercel env pull .env.production.local --environment=production` + `npm run db:push:live` / `db:seed:live` / `db:check:live` stays valid for debugging from a trusted machine.

### Practical rule

| Situation | Prefer |
|-----------|--------|
| Bulk seed / schema sync after deploy | **GitHub Action** with `PRODUCTION_DATABASE_URL` |
| “I’m on a random PC, no CLI” | **Protected reseed route** + secret header |
| Daily editorial work | **Admin UI** (when you build it) |
| One-off SQL | **Neon SQL Editor** (small, careful changes) |

**Single source of truth:** Put upsert logic in **one module** (e.g. shared between `scripts/seed-articles.ts` and a future `app/api/admin/reseed/route.ts`) so production and local never drift.

### 6. **Cursor MCP server (local)**

This repo includes **`mcp/production-data`**: a small **stdio MCP** that runs `db:check:live`, `db:seed:live`, and `db:push:live` against **`MYCITY_DATABASE_URL`** (or `DATABASE_URL`) configured in **Cursor MCP settings** — no `vercel env pull` required for those commands. See **`mcp/production-data/README.md`** for install and JSON config. Destructive actions require explicit acknowledgement strings in the tool arguments.
