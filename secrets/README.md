# Secrets folder

## `database.local.env`

- Holds **`DATABASE_URL`** for the Neon project **`mychennaicity`** (Singapore pooler host).
- This file is **gitignored**. Never commit it or paste the URI into issues, chats, or screenshots.
- **If the password was ever shared publicly**, rotate it in Neon: **Project → Settings → Reset password** (or create a new role), then update this file and Vercel.

## Using it locally

1. **Recommended for Next.js:** copy the `DATABASE_URL=...` line into **`.env.local`** (also gitignored) so `next dev` and the app runtime pick it up automatically.
2. **Seeds / Drizzle:** repo scripts and `drizzle.config.ts` also load `secrets/database.local.env` before `.env.local`, so `npm run db:push` and `npm run db:seed` can work without duplicating the line (see `docs/DATABASE_AND_VERCEL.md`).

## Production

Production **`DATABASE_URL`** must be set in **Vercel** (and any other host), not only in this folder.
