/**
 * POST /api/revalidate/sitemap on production — refresh sitemap.xml + news-sitemap.xml + sitemap-recent.xml.
 *
 * Requires REVALIDATE_SECRET in .env.production.local (same as other revalidate routes).
 *
 *   npm run revalidate:sitemap:live
 */
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.production.local" });
loadEnv({ path: ".env.local" });

async function main() {
  const secret = process.env.REVALIDATE_SECRET?.trim();
  const site = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mychennaicity.in"
  ).replace(/\/$/, "");

  if (!secret) {
    console.error(
      "REVALIDATE_SECRET missing — add to .env.production.local (must match Vercel env).",
    );
    process.exit(1);
  }

  const params = new URLSearchParams({ secret });
  const endpoints = [
    "/api/revalidate/sitemap",
    "/api/revalidate/listings",
    "/api/revalidate/news",
  ];

  let ok = false;
  for (const endpoint of endpoints) {
    const url = `${site}${endpoint}?${params.toString()}`;
    try {
      const res = await fetch(url, { method: "POST" });
      const body = await res.text();
      console.log(`[revalidate-sitemap-live] ${endpoint}`, res.status, body);
      if (res.ok) ok = true;
    } catch (err) {
      console.warn(`[revalidate-sitemap-live] ${endpoint} failed:`, err);
    }
  }

  if (!ok) {
    console.warn(
      "All revalidate calls failed — deploy latest code and check REVALIDATE_SECRET on Vercel.",
    );
    process.exit(1);
  }

  console.log("Sitemaps revalidated:");
  console.log(`  ${site}/sitemap.xml`);
  console.log(`  ${site}/news-sitemap.xml`);
  console.log(`  ${site}/sitemap-recent.xml`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
