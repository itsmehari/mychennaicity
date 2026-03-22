# Deployment runbook — mychennaicity.in

Follow this after the code is in GitHub. **Do not commit secrets.** Use Vercel / Neon / Google UIs for credentials.

## 1. GitHub

1. Create a new repository (private recommended).
2. From the project root: `git remote add origin https://github.com/<org>/<repo>.git`
3. `git push -u origin main` (rename branch with `git branch -M main` if needed).
4. Optional: branch protection on `main`, require CI to pass.

## 2. Vercel

1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new).
2. Framework: Next.js. Root: repository root.
3. Add environment variables (Production and Preview):

| Variable | Notes |
|----------|--------|
| `DATABASE_URL` | Neon pooled connection string |
| `NEXT_PUBLIC_SITE_URL` | `https://mychennaicity.in` (prod); preview can use the Vercel preview URL if you prefer |
| `AUTH_SECRET` | `openssl rand -base64 32` |
| `AUTH_URL` | `https://mychennaicity.in` (match deployed URL) |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Optional OAuth |
| `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` | Optional OAuth |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 `G-…` (optional) |

4. Deploy and confirm the production build is green.

## 3. Neon (Postgres)

1. Create a project at [console.neon.tech](https://console.neon.tech) (region e.g. `aws-ap-south-1` if available).
2. Copy the **pooled** `DATABASE_URL` into Vercel and local `.env.local`.
3. Apply schema: `npm run db:push` from your machine (or run SQL from `drizzle/` if you use migrations). **Fresh DB:** `db:push` is enough.

## 4. BigRock DNS → Vercel

**Option A — Vercel nameservers (simplest)**  
In Vercel → Project → Domains → add `mychennaicity.in` and `www.mychennaicity.in`. Set BigRock nameservers to the values Vercel shows.

**Option A records at BigRock**  
Point `@` to Vercel’s apex IPs and `www` CNAME to `cname.vercel-dns.com` (exact values from Vercel’s domain UI).

Wait for DNS propagation; HTTPS certificates are issued by Vercel.

## 5. Google Analytics (GA4)

1. Create a GA4 property and web data stream for `https://mychennaicity.in`.
2. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX` in Vercel and redeploy.

## 6. Google Search Console

1. Add a **Domain** or **URL-prefix** property for `mychennaicity.in`.
2. Verify via DNS TXT (recommended with domain property) or HTML file.
3. Submit sitemap: `https://mychennaicity.in/sitemap.xml`.

## 7. Auth.js OAuth (optional)

1. [Google Cloud Console](https://console.cloud.google.com/): OAuth client (Web), redirect URI: `https://mychennaicity.in/api/auth/callback/google` (and preview URL if needed).
2. [GitHub Developer Settings](https://github.com/settings/developers): OAuth App, callback `https://mychennaicity.in/api/auth/callback/github`.

At least one provider must be configured for sign-in to work.

## Database note (auth migration)

If you already applied the initial migration with a `users` (uuid) table, the current schema uses Auth.js tables (`user`, `account`, `session`, `verificationToken`) and `articles.author_id` as `text`. **New Neon databases:** run `npm run db:push`. **Existing data:** back up first; you may need a manual migration—ask before altering production data.
