/**
 * Reader listing: 3BHK ground-floor house for rent — Saidapet.
 *
 * Dev:  `npm run db:seed:saidapet-house-rent`
 * Live: `npm run db:seed:saidapet-house-rent:live` — uses `.env.production.local` only
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { picsumHeroUrlForSlug } from "../src/lib/article-hero-image";
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

const SLUG = "reader-listing-saidapet-3bhk-ground-floor-may-2026";

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

  const now = new Date();
  const publishedAt = now;

  const reportBody = `## House for rent in Saidapet

Spacious **3BHK ground-floor house** in a convenient location — suitable for families looking for a comfortable, well-ventilated home.

### Layout
- **3** bedrooms
- **1** hall
- **1** dining
- **2** washrooms
- **Ground floor**

### Notes from the advertiser
- Well ventilated, family-friendly setting
- **Vegetarians preferred** (as stated by the advertiser)

### Location
**Saidapet**, Chennai — confirm exact street and access with the contact below before visiting.

### Contact
Call **[9994313571](tel:+919994313571)** for rent, availability, and viewing.`.trim();

  const analysisBody = `## Editorial note

This page is a **reader-submitted listing** published for visibility only. **mychennaicity.in does not verify** ownership, possession, or rent terms. Inspect the property yourself, ask for identity proof where appropriate, and use a written lease for deposits and conditions.

If this listing is outdated or was posted without authorisation, use the site **Contact** page so we can review it.`.trim();

  const body = `${reportBody}\n\n---\n\n${analysisBody}`;

  const [existing] = await db
    .select({ id: articles.id })
    .from(articles)
    .where(and(eq(articles.cityId, city.id), eq(articles.slug, SLUG)))
    .limit(1);

  const heroImageUrl = picsumHeroUrlForSlug(SLUG);
  const values = {
    cityId: city.id,
    slug: SLUG,
    title: "House for rent: 3BHK ground floor, Saidapet",
    summary:
      "3BHK ground-floor house in Saidapet — hall, dining, two washrooms; families welcome. Contact 9994313571. Vegetarians preferred per advertiser.",
    dek: "Reader listing · verify details before you pay or sign.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    areaHubSlug: "saidapet-guindy-alandur",
    status: "published" as const,
    publishedAt,
    featured: false,
    heroImageUrl,
    sourceUrl: null as string | null,
    sourceName: null as string | null,
    interactiveJson: null as Record<string, unknown> | null,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-listing] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-listing] Inserted article:", SLUG);
  }

  console.log("[seed-listing] Public URL:", `/chennai-local-news/${SLUG}`);

  if (live) {
    await revalidateNewsAfterSeed({ slug: SLUG, label: "seed-saidapet-house-rent" });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
