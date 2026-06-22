/**
 * Tiruvallur ammonia leak at seafood export unit — industrial safety editorial (June 2026).
 *
 * Dev:  `npm run db:seed:tiruvallur-ammonia-leak-2026`
 * Live: `npm run db:seed:tiruvallur-ammonia-leak-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import {
  TIRUVALLUR_AMMONIA_LEAK_HERO_IMAGE,
  TIRUVALLUR_AMMONIA_LEAK_META_DESCRIPTION,
  TIRUVALLUR_AMMONIA_LEAK_SEO_TITLE,
  TIRUVALLUR_AMMONIA_LEAK_SLUG,
  TIRUVALLUR_AMMONIA_LEAK_SOURCE_URL,
} from "../src/content/special-articles/tiruvallur-ammonia-leak-2026";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const live =
  process.env.SEED_LIVE === "1" || process.argv.includes("--live");

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
      : "DATABASE_URL missing — add to .env.local or secrets/database.local.env",
  );
  process.exit(1);
}

const db = drizzle(neon(url), { schema });

const ARTICLE_URL = `https://mychennaicity.in/chennai-local-news/${TIRUVALLUR_AMMONIA_LEAK_SLUG}`;

async function main() {
  const [city] = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, "chennai"))
    .limit(1);

  if (!city) {
    console.error("City slug 'chennai' not found. Run db:seed or create city first.");
    process.exit(1);
  }

  const publishedAt = new Date("2026-06-21T09:30:00.000Z");
  const now = new Date();

  const reportBody = `## Summary

**Five women workers died** and **67 remain under treatment** after an ammonia gas leak at St Peter & Paul Sea Foods Exports in Kannigaipair, Tiruvallur district, on Sunday, 21 June 2026. A state health bulletin on Monday, 22 June, confirmed the toll.

Early Sunday reports cited seven deaths; the official health bulletin revised the confirmed toll to five.

**Read the full article:** [${TIRUVALLUR_AMMONIA_LEAK_SEO_TITLE}](${ARTICLE_URL})

## Key facts (updated 22 June 2026)

| Detail | Value |
| --- | --- |
| Deaths | 5 (all women from Odisha) |
| Under treatment | 67 |
| Discharged | 2 |
| Total exposed | 74 |
| Location | Kannigaipair/Manjangaranai, near Periyapalayam, Tiruvallur |
| Leak time | ~11 am Sunday, 21 June 2026 |
| Cause | Ammonia gas leak from refrigeration system (under investigation) |
| Ammonia level at plant | ~300 ppm (per Health Minister) |
| Response | NDRF CBRN team; owners detained; CM forms 3-member probe committee |

## What happened

- Leak occurred while workers were off duty in hostel rooms ~50 m from the ammonia plant.
- Gas spread to worker accommodation; 130 unaffected workers shifted to Govinda Bhavanam marriage hall.
- Two workers died Sunday night; three more died Monday morning per health bulletin.
- Police case under BNS Sections 105 and 125(a); unit owners Mohan and Joseph detained.
- CM announced ₹2 lakh per family; Labour Minister ordered statewide hazardous-industry inspection.
- Exact mechanical cause of leak not yet officially confirmed.`.trim();

  const analysisBody = `## Editorial note

This article is **MyChennaiCity editorial analysis** on industrial safety compliance, worker accommodation risks, and ammonia refrigeration governance — not a substitute for official investigation findings.

**Image credit:** Scene photograph via [The New Indian Express](${TIRUVALLUR_AMMONIA_LEAK_SOURCE_URL}).`.trim();

  const body = `${reportBody}\n\n---\n\n${analysisBody}`;

  const [existing] = await db
    .select({ id: articles.id })
    .from(articles)
    .where(
      and(eq(articles.cityId, city.id), eq(articles.slug, TIRUVALLUR_AMMONIA_LEAK_SLUG)),
    )
    .limit(1);

  const values = {
    cityId: city.id,
    slug: TIRUVALLUR_AMMONIA_LEAK_SLUG,
    title: TIRUVALLUR_AMMONIA_LEAK_SEO_TITLE,
    summary: TIRUVALLUR_AMMONIA_LEAK_META_DESCRIPTION,
    dek: "Five women workers died and 67 remain under treatment after ammonia gas leaked from St Peter & Paul Sea Foods Exports at Kannigaipair near Periyapalayam. Updated 22 June with official health bulletin figures.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: TIRUVALLUR_AMMONIA_LEAK_HERO_IMAGE,
    sourceUrl: TIRUVALLUR_AMMONIA_LEAK_SOURCE_URL,
    sourceName: "The New Indian Express",
    authorByline: "MyChennaiCity Editorial",
    updatedAt: now,
  };

  if (existing) {
    await db
      .update(articles)
      .set(values)
      .where(eq(articles.id, existing.id));
    console.log("[seed-tiruvallur-ammonia-leak] Updated article:", TIRUVALLUR_AMMONIA_LEAK_SLUG);
  } else {
    await db.insert(articles).values({ ...values, createdAt: now });
    console.log("[seed-tiruvallur-ammonia-leak] Inserted article:", TIRUVALLUR_AMMONIA_LEAK_SLUG);
  }

  if (live) {
    await revalidateNewsAfterSeed({ slug: TIRUVALLUR_AMMONIA_LEAK_SLUG });
  }

  console.log("[seed-tiruvallur-ammonia-leak] Public URL:", `/chennai-local-news/${TIRUVALLUR_AMMONIA_LEAK_SLUG}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
