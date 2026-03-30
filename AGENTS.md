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

## Optional: Google site verification (Search Console)

- **`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`** — paste the **content** value from GSC’s HTML tag method (not the full tag). Next.js `metadata.verification.google` in `src/app/layout.tsx` will emit the meta tag. Set in Vercel for Production (and Preview if you verify preview hosts separately).

## Learnings from project chats (read before large tasks)

Full narrative, agent habits, and **SOPs** (DB deploy, live empty home, ads/legal, seeds, browser handoffs): **`docs/AGENT_LEARNINGS_AND_SOPS.md`**.

**Non-negotiables in short:**

- Keep **plan todos** in `.cursor/plans/` aligned with reality when the user tracks work there.
- **Plain, Chennai-first** copy on public hubs when the user asks to avoid “markety” internal labels.
- **No fake JSON-LD** for mock data; match schema to real, stable rows.
- **Production DB:** after env or schema changes, **redeploy Vercel**; use `docs/DATABASE_AND_VERCEL.md` for push/seed/check-live flows.
- **Secrets:** never commit; rotate if exposed in chat.
- **Browser steps** (GitHub/Vercel/registrar/Neon): coordinate with the user—they log in, then automate or guide the next clicks.
