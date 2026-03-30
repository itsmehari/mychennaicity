# AdSense pre-flight runbook

Use this after code for legal pages, `ads.txt`, and optional AdSense script is merged and deployed. Google approval still depends on live content and policies—this list is operational only.

## 0. Deploy the latest app first

Legal routes (`/privacy`, `/cookies`, `/terms`, `/community-guidelines`) and the dynamic `ads.txt` route exist in the repo. **Production must run a build that includes them.** Until then, those URLs may 404 (verify with [Privacy](https://mychennaicity.in/privacy) after deploy).

---

## 1. Production: enough real content

AdSense reviewers look at the **live** site. Thin or mostly mock pages hurt approval.

| Action | Command / check |
|--------|------------------|
| Confirm Neon has articles | `npm run db:check:live` (requires `.env.production.local` from `vercel env pull`) |
| Seed Chennai + articles if needed | `npm run db:seed:live` (same env; see [DATABASE_AND_VERCEL.md](DATABASE_AND_VERCEL.md)) |
| Optional: jobs / events seeds | `npm run db:seed:chennai-jobs:live`, event scripts as needed |
| Manual QA | Open [Chennai local news](https://mychennaicity.in/chennai-local-news) and confirm stories are DB-backed, not only placeholders |

---

## 2. Vercel environment variables

In [Vercel → Project → Settings → Environment Variables](https://vercel.com/dashboard), set at least:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Neon pooled URI (already required for news) |
| `NEXT_PUBLIC_SITE_URL` | `https://mychennaicity.in` (no trailing slash) |
| `ADSENSE_PUBLISHER_ID` | `pub-xxxxxxxxxxxxxxxx` so [https://mychennaicity.in/ads.txt](https://mychennaicity.in/ads.txt) returns a valid seller line (not 404) |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | `ca-pub-xxxxxxxxxxxxxxxx` — add **after** AdSense gives you a client ID; loads `adsbygoogle.js` |

Optional but recommended:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | GSC HTML-tag **content** value; `metadata` in `src/app/layout.tsx` emits the tag |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 `G-…` if you use Analytics |

**Redeploy** after changing env vars so serverless and edge see new values.

---

## 3. Search Console (domain or URL verified)

Follow [SEARCH_CONSOLE.md](SEARCH_CONSOLE.md): add the property, verify (DNS TXT or HTML tag), submit `https://mychennaicity.in/sitemap.xml` (and optionally `news-sitemap.xml`). AdSense can use Search Console verification as an alternative to pasting code in some flows—see [Google Help](https://support.google.com/adsense/answer/12176698).

---

## 4. Mobile-Friendly Test

Open the [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly), enter `https://mychennaicity.in/`, and confirm the page is usable on mobile.

---

## 5. Indexing sanity (`site:`)

In Google Search, run:

`site:mychennaicity.in`

Expect important URLs to appear over time (not instant). Use [URL Inspection](https://search.google.com/search-console) in GSC for key pages if needed.

---

## 6. AdSense: add site and request review

1. Sign in to [Google AdSense](https://www.google.com/adsense).
2. Add **mychennaicity.in** as a site (exact protocol and host you use in production).
3. Ensure **either** the AdSense snippet is active (`NEXT_PUBLIC_ADSENSE_CLIENT_ID` set and redeployed) **or** ownership is proven via **Search Console** / **ads.txt** as Google describes in [What to do when your site is not ready](https://support.google.com/adsense/answer/12176698).
4. If the Policy center shows issues, fix content or implementation and use **Request review** on the Sites page.

---

## 7. Quick verification URLs (after deploy + env)

| Check | URL |
|-------|-----|
| Privacy | https://mychennaicity.in/privacy |
| Terms | https://mychennaicity.in/terms |
| Cookies | https://mychennaicity.in/cookies |
| Community | https://mychennaicity.in/community-guidelines |
| ads.txt (with `ADSENSE_PUBLISHER_ID`) | https://mychennaicity.in/ads.txt |
| Sitemap | https://mychennaicity.in/sitemap.xml |

---

## Reference

- [Make sure your site's pages are ready for AdSense](https://support.google.com/adsense/answer/7299563)
- [Eligibility requirements](https://support.google.com/adsense/answer/9724)
- [Program policies](https://support.google.com/adsense/answer/48182)
