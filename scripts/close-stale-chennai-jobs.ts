/**
 * Close job_postings still marked `open` whose `valid_through` is in the past.
 *
 * Public hub / sitemap / JobPosting JSON-LD already hide expired rows even if
 * status is still `open`. This script persists `closed` so admin + seeds stay honest.
 *
 * Dev:  `npm run db:jobs:close-stale`
 * Live: `npm run db:jobs:close-stale:live` — uses `.env.production.local`
 *
 * `--dry-run` lists slugs without updating.
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq, isNotNull, lte } from "drizzle-orm";
import { finishListingSeedLive } from "./lib/seed-event-shared";
import * as schema from "../src/db/schema";
import { jobPostings } from "../src/db/schema/tables";

const live =
  process.env.SEED_LIVE === "1" || process.argv.includes("--live");
const dryRun = process.argv.includes("--dry-run");

if (live) {
  loadEnv({ path: ".env.production.local" });
} else {
  loadEnv({ path: "secrets/database.local.env" });
  loadEnv({ path: ".env.local" });
  loadEnv({ path: ".env" });
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    live
      ? "Live: DATABASE_URL missing (.env.production.local)."
      : "DATABASE_URL missing — add to .env.local",
  );
  process.exit(1);
}

const db = drizzle(neon(url), { schema });

async function main() {
  const now = new Date();
  const staleWhere = and(
    eq(jobPostings.status, "open"),
    isNotNull(jobPostings.validThrough),
    lte(jobPostings.validThrough, now),
  );

  const stale = await db
    .select({
      slug: jobPostings.slug,
      title: jobPostings.title,
      validThrough: jobPostings.validThrough,
    })
    .from(jobPostings)
    .where(staleWhere);

  if (stale.length === 0) {
    console.log("[jobs-hygiene] No expired-open rows.");
    return;
  }

  for (const row of stale) {
    console.log(
      `[jobs-hygiene] ${dryRun ? "would close" : "closing"}:`,
      row.slug,
      "validThrough=",
      row.validThrough?.toISOString(),
    );
  }

  if (dryRun) {
    console.log(`[jobs-hygiene] Dry run — ${stale.length} row(s) unchanged.`);
    return;
  }

  await db
    .update(jobPostings)
    .set({ status: "closed", updatedAt: now })
    .where(staleWhere);

  console.log(`[jobs-hygiene] Closed ${stale.length} expired job(s).`);
  await finishListingSeedLive({ label: "jobs-close-stale" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
