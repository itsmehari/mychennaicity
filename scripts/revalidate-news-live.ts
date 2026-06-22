/**
 * POST /api/revalidate/news on production — refresh home, news hub, and sitemaps.
 *
 *   npm run revalidate:news:live
 *   npm run revalidate:news:live -- --slug=my-article-slug
 */
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.production.local" });
loadEnv({ path: ".env.local" });

function argValue(flag: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`${flag}=`));
  return hit?.slice(flag.length + 1)?.trim() || undefined;
}

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
  const slug = argValue("--slug");
  if (slug) params.set("slug", slug);

  const url = `${site}/api/revalidate/news?${params.toString()}`;
  const res = await fetch(url, { method: "POST" });
  const body = await res.text();
  console.log("[revalidate-news-live]", res.status, body);

  if (!res.ok) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
