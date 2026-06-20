/**
 * International Yoga Day 2026 — Chennai wellness editorial article.
 *
 * Dev:  `npm run db:seed:international-yoga-day-2026-chennai`
 * Live: `npm run db:seed:international-yoga-day-2026-chennai:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import {
  YOGA_DAY_2026_META_DESCRIPTION,
  YOGA_DAY_2026_SEO_TITLE,
  YOGA_DAY_2026_SLUG,
  YOGA_DAY_HERO_IMAGE,
  yogaDayFaq,
} from "../src/content/special-articles/international-yoga-day-2026-chennai";
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

const ARTICLE_URL = `https://mychennaicity.in/chennai-local-news/${YOGA_DAY_2026_SLUG}`;

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

  const publishedAt = new Date("2026-06-20T12:30:00.000Z");
  const now = new Date();

  const reportBody = `## Summary

**International Yoga Day 2026** (June 21) carries the theme **Yoga for Healthy Ageing**. For Chennai, this is a practical reminder to build daily wellness habits across homes, schools, offices, beaches, parks, and apartment communities — not just a one-day public event.

**Read the full article:** [${YOGA_DAY_2026_SEO_TITLE}](${ARTICLE_URL})

## Key points

| Topic | Detail |
| --- | --- |
| Date | June 21, 2026 |
| Theme | Yoga for Healthy Ageing |
| Local focus | Chennai wellness — beaches, parks, homes, offices |
| Habit goal | 10 minutes daily |
| Local event | CMRL × Rotary Club sessions at Shenoy Nagar Metro amphitheatre |

## Who benefits in Chennai

- IT professionals — posture, breathing, screen fatigue
- Students — focus, exam-time stability
- Senior citizens — mobility, balance, social connection
- Families — simple 15-minute home routines
- Apartment communities — terrace and hall group sessions

Continue yoga beyond June 21.`.trim();

  const analysisBody = `## Editorial note

This article is **MyChennaiCity editorial guidance** on preventive wellness — not medical advice. Senior citizens and people with chronic conditions should consult qualified professionals before starting new routines.

**Image credits:** Hero, workplace, family, and senior wellness photos via [Unsplash](https://unsplash.com) (free licence). India public session photo via [Wikimedia Commons](https://commons.wikimedia.org). CMRL event poster reproduced for local information.`.trim();

  const body = `${reportBody}\n\n---\n\n${analysisBody}`;

  const [existing] = await db
    .select({ id: articles.id })
    .from(articles)
    .where(and(eq(articles.cityId, city.id), eq(articles.slug, YOGA_DAY_2026_SLUG)))
    .limit(1);

  const values = {
    cityId: city.id,
    slug: YOGA_DAY_2026_SLUG,
    title: YOGA_DAY_2026_SEO_TITLE,
    summary: YOGA_DAY_2026_META_DESCRIPTION,
    dek: "Chennai can turn International Yoga Day into a daily wellness habit for families, elders, students, and working professionals.",
    body,
    reportBody,
    analysisBody,
    category: "Health & Wellness",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: YOGA_DAY_HERO_IMAGE,
    sourceUrl: ARTICLE_URL,
    sourceName: "MyChennaiCity Editorial",
    authorByline: "MyChennaiCity Editorial Team",
    interactiveJson: {
      type: "faq",
      items: yogaDayFaq,
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-yoga-day] Refreshed article:", YOGA_DAY_2026_SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-yoga-day] Inserted article:", YOGA_DAY_2026_SLUG);
  }

  console.log(
    "[seed-yoga-day] Public URL:",
    `/chennai-local-news/${YOGA_DAY_2026_SLUG}`,
  );
  console.log(
    "[seed-yoga-day] Short redirect:",
    `/international-yoga-day-2026-chennai-yoga-for-healthy-ageing`,
  );

  if (live) {
    await revalidateNewsAfterSeed({
      slug: YOGA_DAY_2026_SLUG,
      label: "seed-international-yoga-day-2026-chennai",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
