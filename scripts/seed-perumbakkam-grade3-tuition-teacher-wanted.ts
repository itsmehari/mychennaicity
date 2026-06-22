/**
 * Classified ad: tuition teacher wanted — Grade 3 CBSE, Perumbakkam.
 * Posted by Regina Aniger (Facebook).
 *
 * Dev:  `npm run db:seed:perumbakkam-grade3-tuition-teacher-wanted`
 * Live: `npm run db:seed:perumbakkam-grade3-tuition-teacher-wanted:live` — uses `.env.production.local` only
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities, classifiedListings } from "../src/db/schema/tables";
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

const SLUG = "tuition-teacher-wanted-grade3-perumbakkam";
/** Wrongly published under Chennai local news — remove on seed. */
const LEGACY_NEWS_SLUG =
  "reader-listing-perumbakkam-grade3-tuition-teacher-june-2026";

const POSTER_NAME = "Regina Aniger";
const POSTER_URL = "https://www.facebook.com/regina.aniger246/";
const PHONE = "9962872406";
const PHONE_DISPLAY = "99628 72406";
const PHONE_TEL = "tel:+919962872406";

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
  const expiresAt = new Date(now);
  expiresAt.setDate(expiresAt.getDate() + 90);

  const body = `## Tuition teacher wanted — Grade 3 CBSE

**${POSTER_NAME}** is looking for a **home tuition teacher** for a **Grade 3** student following the **CBSE** syllabus.

### Requirement
- **All subjects**, including **Tamil**
- **2 hours every day**
- Tuition at or near **Perumbakkam**, Chennai

### Contact
Call **[${PHONE_DISPLAY}](${PHONE_TEL})** or reach out via [Facebook](${POSTER_URL}) to discuss availability, fees, and subject coverage.`.trim();

  const values = {
    cityId: city.id,
    slug: SLUG,
    title: "Tuition teacher wanted: Grade 3 CBSE, Perumbakkam",
    body,
    category: "tuition",
    posterName: POSTER_NAME,
    posterUrl: POSTER_URL,
    locationLabel: "Perumbakkam, Chennai",
    contactPhone: PHONE,
    areaHubSlug: "omr-perungudi-sholinganallur",
    status: "open" as const,
    publishedAt: now,
    expiresAt,
    updatedAt: now,
  };

  const [existing] = await db
    .select({ id: classifiedListings.id })
    .from(classifiedListings)
    .where(and(eq(classifiedListings.cityId, city.id), eq(classifiedListings.slug, SLUG)))
    .limit(1);

  if (existing) {
    await db
      .update(classifiedListings)
      .set(values)
      .where(eq(classifiedListings.id, existing.id));
    console.log("[seed-classified] Refreshed listing:", SLUG);
  } else {
    await db.insert(classifiedListings).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-classified] Inserted listing:", SLUG);
  }

  const removedNews = await db
    .delete(articles)
    .where(
      and(eq(articles.cityId, city.id), eq(articles.slug, LEGACY_NEWS_SLUG)),
    )
    .returning({ id: articles.id });

  if (removedNews.length) {
    console.log(
      "[seed-classified] Removed misplaced news article:",
      LEGACY_NEWS_SLUG,
    );
  }

  console.log("[seed-classified] Public URL:", `/chennai-classifieds/${SLUG}`);

  await finishListingSeedLive({
    classifiedSlug: SLUG,
    label: "seed-perumbakkam-grade3-tuition-teacher-wanted",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
