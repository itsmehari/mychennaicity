/**
 * One-shot: print /sitemap-recent.xml to stdout (uses local/prod DATABASE_URL).
 *   npx tsx scripts/print-sitemap-recent.ts
 *   npx tsx scripts/print-sitemap-recent.ts --live
 */
import { config as loadEnv } from "dotenv";
import {
  listRecentSitemapUrls,
  recentSitemapXml,
  recentSitemapSince,
  RECENT_SITEMAP_WINDOW_DAYS,
} from "../src/lib/seo/sitemap-recent";

const live = process.argv.includes("--live");
if (live) {
  loadEnv({ path: ".env.production.local" });
} else {
  loadEnv({ path: "secrets/database.local.env" });
  loadEnv({ path: ".env.local" });
  loadEnv({ path: ".env" });
}

async function main() {
  const now = new Date();
  const urls = await listRecentSitemapUrls(now);
  process.stderr.write(
    `[sitemap-recent] window=${RECENT_SITEMAP_WINDOW_DAYS}d since=${recentSitemapSince(now).toISOString()} urls=${urls.length}\n`,
  );
  process.stdout.write(recentSitemapXml(urls));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
