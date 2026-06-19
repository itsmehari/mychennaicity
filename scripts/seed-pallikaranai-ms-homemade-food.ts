/**
 * Local business listing: MS homemade food — village-style lunch delivery, Pallikaranai.
 *
 * Dev:  `npm run db:seed:pallikaranai-ms-homemade-food`
 * Live: `npm run db:seed:pallikaranai-ms-homemade-food:live` — uses `.env.production.local` only
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities, directoryEntries } from "../src/db/schema/tables";
import { serializeDirectoryEntryMetadata } from "../src/lib/directory/metadata";
import { finishListingSeedLive } from "./lib/seed-event-shared";

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

const TYPE = "restaurant" as const;
const SLUG = "ms-homemade-food-pallikaranai";
const HERO_IMAGE_URL =
  "/images/listings/ms-homemade-food-pallikaranai-catering.png";
const PHONE = "7200151282";
const PHONE_DISPLAY = "72001 51282";
const PHONE_TEL = "tel:+917200151282";

/** Wrongly published under Chennai local news — remove on seed. */
const LEGACY_NEWS_SLUG =
  "reader-listing-ms-homemade-food-pallikaranai-june-2026";

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

  const reportBody = `## MS homemade food — village-style meals in Pallikaranai

**Village-style homemade food** with **free lunch door delivery in Pallikaranai**. Weekly and monthly subscriptions available.

### Daily lunch delivery
- **Lunch** delivered to your door in Pallikaranai
- **Weekly** and **monthly** subscription plans
- Meals **with or without rice**
- **Veg and non-veg** — order **one day before**
- **Side dishes alone** can be ordered separately

### Non-veg (same day, with notice)
- **Curry, fry, and gravy** available through the day
- Order **at least 4 hours before** delivery
- Menu can be **customized** to your preference
- **100% homemade fresh masalas**
- **Spice level and salt** adjustable on request

### Catering & bulk orders
- **Party orders** — minimum **15–20 members**
- **Corporate office** catering
- Also serves **senior citizens** and **bachelor** meal plans (per advertiser)

### Contact
Call **[${PHONE_DISPLAY}](${PHONE_TEL})** for menus, subscription rates, and party or corporate quotes.`.trim();

  const analysisBody = `## Listing note

This page is a **local business listing** published for visibility only. **mychennaicity.in does not verify** food safety certificates, pricing, or delivery coverage. Confirm hygiene, ingredients, timings, and payment terms directly with the kitchen before you subscribe or place a bulk order.

If this listing is outdated or was posted without authorisation, use the site **Contact** page so we can review it.`.trim();

  const metadata = serializeDirectoryEntryMetadata({
    summary:
      "Village-style veg and non-veg meals with free Pallikaranai door delivery. Weekly/monthly subscriptions, side dishes, party and corporate catering. Call 7200151282.",
    dek: "Local business listing · verify menu, pricing, and delivery before you order.",
    reportBody,
    analysisBody,
    heroImageUrl: HERO_IMAGE_URL,
    areaHubSlug: "omr-perungudi-sholinganallur",
  });

  const values = {
    cityId: city.id,
    type: TYPE,
    slug: SLUG,
    name: "MS homemade food",
    address: "Pallikaranai, Chennai",
    localityLabel: "Pallikaranai",
    phone: PHONE,
    websiteUrl: null as string | null,
    verified: false,
    metadata,
    updatedAt: now,
  };

  const [existing] = await db
    .select({ id: directoryEntries.id })
    .from(directoryEntries)
    .where(
      and(
        eq(directoryEntries.cityId, city.id),
        eq(directoryEntries.type, TYPE),
        eq(directoryEntries.slug, SLUG),
      ),
    )
    .limit(1);

  if (existing) {
    await db
      .update(directoryEntries)
      .set(values)
      .where(eq(directoryEntries.id, existing.id));
    console.log("[seed-directory] Refreshed listing:", `${TYPE}/${SLUG}`);
  } else {
    await db.insert(directoryEntries).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-directory] Inserted listing:", `${TYPE}/${SLUG}`);
  }

  const removedNews = await db
    .delete(articles)
    .where(
      and(eq(articles.cityId, city.id), eq(articles.slug, LEGACY_NEWS_SLUG)),
    )
    .returning({ id: articles.id });

  if (removedNews.length) {
    console.log(
      "[seed-directory] Removed misplaced news article:",
      LEGACY_NEWS_SLUG,
    );
  }

  console.log("[seed-directory] Public URL:", `/directory/${TYPE}/${SLUG}`);

  await finishListingSeedLive({
    directoryType: TYPE,
    directorySlug: SLUG,
    label: "seed-pallikaranai-ms-homemade-food",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
