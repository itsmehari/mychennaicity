# Neon `DATABASE_URL` — learnings and Vercel setup

## What this app expects

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

**Fix (in repo):** `/`, `/chennai-local-news`, topic pages, article `[slug]`, and `feed.xml` use **`export const dynamic = "force-dynamic"`** so each request loads articles from Neon using **runtime** env vars. After setting `DATABASE_URL` on Vercel, **redeploy** once.

## Security learnings

- Treat `DATABASE_URL` like a password: **no commits**, no Slack/Discord, no chat logs.
- If leaked: **rotate** credentials in Neon and update Vercel + `secrets/database.local.env` + `.env.local`.
- The `secrets/` copy is for **your machine and trusted backups** only; CI should use Vercel/GitHub **encrypted secrets**, not files in the repo.
