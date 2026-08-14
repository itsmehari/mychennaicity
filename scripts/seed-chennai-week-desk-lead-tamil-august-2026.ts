/**
 * Lead Tamil twins (4) + weekend/Monday watch (EN+TA).
 *
 * Dev:  `npm run db:seed:chennai-week-desk-lead-tamil-august-2026`
 * Live: `npm run db:seed:chennai-week-desk-lead-tamil-august-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import {
  CHENNAI_WEEK_LEAD_TAMIL_AND_WATCH,
  WEEK_DESK_SOCIAL_POSTS,
} from "./content/chennai-week-desk-lead-tamil-august-2026";
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

async function main() {
  const [city] = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, "chennai"))
    .limit(1);

  if (!city) {
    console.error("City slug 'chennai' not found.");
    process.exit(1);
  }

  const now = new Date();
  let inserted = 0;
  let updated = 0;

  for (const article of CHENNAI_WEEK_LEAD_TAMIL_AND_WATCH) {
    const body = `${article.reportBody}\n\n---\n\n${article.analysisBody}`;
    const publishedAt = new Date(article.publishedAt);

    const [existing] = await db
      .select({ id: articles.id })
      .from(articles)
      .where(and(eq(articles.cityId, city.id), eq(articles.slug, article.slug)))
      .limit(1);

    const values = {
      cityId: city.id,
      slug: article.slug,
      title: article.title,
      summary: article.summary,
      dek: article.dek,
      body,
      reportBody: article.reportBody,
      analysisBody: article.analysisBody,
      category: article.category,
      status: "published" as const,
      publishedAt,
      featured: article.featured,
      heroImageUrl: article.heroImageUrl,
      sourceUrl: article.sourceUrl,
      sourceName: article.sourceName,
      authorByline: article.authorByline,
      areaHubSlug: article.areaHubSlug,
      interactiveJson: article.interactiveJson,
      updatedAt: now,
    };

    if (existing) {
      await db.update(articles).set(values).where(eq(articles.id, existing.id));
      updated += 1;
      console.log("[seed-week-ta] Updated:", article.slug);
    } else {
      await db.insert(articles).values({ ...values, createdAt: now });
      inserted += 1;
      console.log("[seed-week-ta] Inserted:", article.slug);
    }
  }

  console.log(
    `[seed-week-ta] Done — inserted ${inserted}, updated ${updated}, total ${CHENNAI_WEEK_LEAD_TAMIL_AND_WATCH.length}`,
  );
  for (const article of CHENNAI_WEEK_LEAD_TAMIL_AND_WATCH) {
    console.log(`  https://mychennaicity.in/chennai-local-news/${article.slug}`);
  }

  console.log("\n[seed-week-ta] Social copy (X / WhatsApp) — paste from WEEK_DESK_SOCIAL_POSTS:");
  for (const post of WEEK_DESK_SOCIAL_POSTS) {
    console.log(`\n--- ${post.id} (${post.channel} ${post.lang}) ---\n${post.text}`);
  }

  if (live) {
    await revalidateNewsAfterSeed({
      label: "seed-chennai-week-desk-lead-tamil-august-2026",
    });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
