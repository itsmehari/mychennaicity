<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Database (Neon) and env

- **`DATABASE_URL`** is required for Drizzle, seeds, and server components that query the DB. Never commit real values; `.env.local` and `secrets/database.local.env` are gitignored (see `.gitignore`).
- **Local reference file:** `secrets/database.local.env` — optional backup URI for this repo. Scripts load it **before** `.env.local`; **Next.js** still needs `DATABASE_URL` in **`.env.local`** (or the shell) for `next dev` / `next build` unless you export it another way.
- **Production:** set `DATABASE_URL` in **Vercel → Settings → Environment Variables** for Production (and Preview if desired), then redeploy.
- **Full checklist:** `docs/DATABASE_AND_VERCEL.md`.
- If a user pastes a live connection string in chat, advise **rotating** the Neon password and updating Vercel + local secrets.
