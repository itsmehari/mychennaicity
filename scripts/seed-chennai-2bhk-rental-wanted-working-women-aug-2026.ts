/**
 * Reader listing: 2BHK rental wanted — two working women, Chennai.
 *
 * Dev:  `npm run db:seed:chennai-2bhk-rental-wanted-working-women-aug-2026`
 * Live: `npm run db:seed:chennai-2bhk-rental-wanted-working-women-aug-2026:live` — uses `.env.production.local` only
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

const SLUG = "reader-listing-chennai-2bhk-rental-wanted-working-women-aug-2026";
const SOURCE_URL =
  "https://www.facebook.com/groups/1300041970868444/user/61565616791743/";

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

  const reportBody = `## 2BHK rental wanted — two working women, Chennai

A reader and her roommate are looking for a **2BHK apartment** in a **good, safe locality** in Chennai.

### Budget
**₹25,000–₹30,000 per month**

### Must-haves
- **Both bedrooms** with **attached bathrooms**
- **Well-maintained** property
- **Semi-furnished or furnished** preferred

### Who is looking
- **Two working women** (roommates)

### Move-in
**August 2026**

### Also open to
**Two rooms** in an existing **3BHK or 4BHK** flat — with attached bathrooms — where current flatmates are filling vacancies.

### Contact
Message the advertiser on **Facebook** (DM): [Facebook profile](${SOURCE_URL})`.trim();

  const analysisBody = `## Editorial note

This page is a **reader-submitted wanted listing** published for visibility only. **mychennaicity.in does not verify** identities, budgets, or property details. Meet in safe, public settings first; inspect the flat and read the lease before you pay a deposit.

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
    title: "2BHK rental wanted: two working women, Chennai (Aug 2026)",
    summary:
      "Two working women seek a 2BHK in a safe Chennai locality — ₹25k–₹30k/month, attached baths, semi-furnished; move-in August 2026. Also open to 2 rooms in a shared 3BHK/4BHK.",
    dek: "Reader listing · verify details before you pay or sign.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    areaHubSlug: null as string | null,
    status: "published" as const,
    publishedAt,
    featured: false,
    heroImageUrl,
    sourceUrl: SOURCE_URL,
    sourceName: "Facebook",
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
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-chennai-2bhk-rental-wanted-working-women-aug-2026",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
