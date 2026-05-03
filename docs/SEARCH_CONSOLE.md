# Google Search Console checklist

1. Open [Google Search Console](https://search.google.com/search-console).
2. Add property:
   - **Domain** property: `mychennaicity.in` (covers all subdomains and paths) — verify via **DNS TXT** at your DNS host (BigRock or Vercel DNS).
   - Or **URL-prefix**: `https://mychennaicity.in/` — verify via HTML tag or file if you prefer.
3. After verification, go to **Sitemaps** → submit: `https://mychennaicity.in/sitemap.xml`.
4. Optional: If you pursue Google News / Publisher surfaces, also submit `https://mychennaicity.in/news-sitemap.xml` (generated from recent published articles; see `src/app/news-sitemap.xml/route.ts`).
5. Optional: In GA4, **Admin → Product links → Search Console links** to link GA4 and GSC.

## After submission (monitoring)

- **Pages** (or **Indexing → Pages**): watch *Indexed* vs *Not indexed* and reasons (duplicate, crawled not indexed, etc.).
- **Sitemaps**: confirm `sitemap.xml` shows *Success* and the discovered URL count is in line with expectations. If it drops sharply while the site is up, check production `DATABASE_URL` and server logs — [`src/app/sitemap.ts`](../src/app/sitemap.ts) still emits static URLs when the DB call fails but omits dynamic article/event/job URLs.
- **Experience** (Core Web Vitals): use **Web Vitals** / **Page experience** reports for field data; cross-check **Vercel Speed Insights** if enabled.
- **URL Inspection**: spot-check the home page and a sample article after deploys; confirm *View crawled page* shows the expected title and main content.
- **Enhancements / Rich results**: if you use article JSON-LD, run [Rich Results Test](https://search.google.com/test/rich-results) on live URLs occasionally.

Optional automation: `npm run gsc:submit-sitemap` (requires Search Console API credentials — see `.env.example`).

No API keys are required for basic URL inspection and sitemap submission.

## See also

- [ADSENSE_PRE_FLIGHT.md](ADSENSE_PRE_FLIGHT.md) — use verified GSC property + sitemaps as part of AdSense site setup.
