/**
 * Sanity-check Neon: Chennai city row + published article counts.
 * Uses same env order as db:seed (secrets/database.local.env → .env.local → .env).
 *
 *   npm run db:check
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { and, asc, count, desc, eq, isNotNull } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";

loadEnv({ path: "secrets/database.local.env" });
loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

function requireDatabaseUrl(): string {
  const v = process.env.DATABASE_URL;
  if (!v) {
    console.error("DATABASE_URL missing — add secrets/database.local.env or .env.local");
    process.exit(1);
  }
  return v;
}

const databaseUrl = requireDatabaseUrl();

const db = drizzle(neon(databaseUrl), { schema });

async function main() {
  console.log("Target host:", databaseUrl.replace(/:[^:@]+@/, ":****@"));

  const cityRows = await db
    .select({ id: cities.id, slug: cities.slug, name: cities.name })
    .from(cities)
    .where(eq(cities.slug, "chennai"))
    .limit(1);

  const city = cityRows[0];
  if (!city) {
    console.error("\n❌ No city with slug `chennai`. Run: npm run db:seed");
    process.exit(1);
  }
  console.log("\n✓ Chennai city:", city.id, city.name);

  const total = await db
    .select({ n: count() })
    .from(articles)
    .where(eq(articles.cityId, city.id));
  console.log("  Articles (all statuses) for Chennai:", total[0]?.n ?? 0);

  const homeEligible = await db
    .select({ n: count() })
    .from(articles)
    .where(
      and(
        eq(articles.cityId, city.id),
        eq(articles.status, "published"),
        isNotNull(articles.publishedAt),
      ),
    );
  console.log(
    "  Home / news listing eligible (published + published_at):",
    homeEligible[0]?.n ?? 0,
  );

  const featured = await db
    .select({ n: count() })
    .from(articles)
    .where(
      and(
        eq(articles.cityId, city.id),
        eq(articles.status, "published"),
        isNotNull(articles.publishedAt),
        eq(articles.featured, true),
      ),
    );
  console.log("  Featured (for editor picks):", featured[0]?.n ?? 0);

  const newest = await db
    .select({
      slug: articles.slug,
      title: articles.title,
      publishedAt: articles.publishedAt,
    })
    .from(articles)
    .where(
      and(
        eq(articles.cityId, city.id),
        eq(articles.status, "published"),
        isNotNull(articles.publishedAt),
      ),
    )
    .orderBy(desc(articles.publishedAt))
    .limit(8);
  console.log("\n  Latest 8 (newest first):");
  for (const a of newest) {
    console.log(
      "   -",
      a.publishedAt?.toISOString() ?? "?",
      "|",
      a.slug.slice(0, 56) + (a.slug.length > 56 ? "…" : ""),
    );
  }

  const oldest = await db
    .select({
      slug: articles.slug,
      publishedAt: articles.publishedAt,
    })
    .from(articles)
    .where(
      and(
        eq(articles.cityId, city.id),
        eq(articles.status, "published"),
        isNotNull(articles.publishedAt),
      ),
    )
    .orderBy(asc(articles.publishedAt))
    .limit(3);
  console.log("\n  Oldest 3 published:");
  for (const a of oldest) {
    console.log("   -", a.publishedAt?.toISOString() ?? "?", a.slug);
  }

  console.log(
    "\nIf counts look good but mychennaicity.in shows empty news, ensure Vercel has DATABASE_URL and redeploy after this fix (home page is now force-dynamic).",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
