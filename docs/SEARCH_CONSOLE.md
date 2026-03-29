# Google Search Console checklist

1. Open [Google Search Console](https://search.google.com/search-console).
2. Add property:
   - **Domain** property: `mychennaicity.in` (covers all subdomains and paths) — verify via **DNS TXT** at your DNS host (BigRock or Vercel DNS).
   - Or **URL-prefix**: `https://mychennaicity.in/` — verify via HTML tag or file if you prefer.
3. After verification, go to **Sitemaps** → submit: `https://mychennaicity.in/sitemap.xml`.
4. Optional: If you pursue Google News / Publisher surfaces, also submit `https://mychennaicity.in/news-sitemap.xml` (generated from recent published articles; see `src/app/news-sitemap.xml/route.ts`).
5. Optional: In GA4, **Admin → Product links → Search Console links** to link GA4 and GSC.

No API keys are required for basic URL inspection and sitemap submission.
