/**
 * POST /api/revalidate/listings on production (bust sitemap + jobs/events hubs).
 *
 * Requires REVALIDATE_SECRET in .env.production.local (same as news revalidate).
 *
 *   npm run revalidate:listings:live
 *   npm run revalidate:listings:live -- --jobSlug=office-roles-tic-guindy-chennai
 */
import { config as loadEnv } from "dotenv";
import { revalidateListingsAfterSeed } from "./lib/revalidate-listings-after-seed";

loadEnv({ path: ".env.production.local" });
loadEnv({ path: ".env.local" });

function argValue(flag: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`${flag}=`));
  return hit?.slice(flag.length + 1)?.trim() || undefined;
}

async function main() {
  await revalidateListingsAfterSeed({
    jobSlug: argValue("--jobSlug"),
    eventSlug: argValue("--eventSlug"),
    label: "revalidate-listings-live",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
