/**
 * Reader listing: tuition teacher wanted — Grade 3 CBSE, Perumbakkam.
 *
 * Dev:  `npm run db:seed:perumbakkam-grade3-tuition-teacher-wanted`
 * Live: `npm run db:seed:perumbakkam-grade3-tuition-teacher-wanted:live` — uses `.env.production.local` only
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

const SLUG = "reader-listing-perumbakkam-grade3-tuition-teacher-june-2026";
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
  const publishedAt = now;

  const reportBody = `## Tuition teacher wanted — Grade 3 CBSE, Perumbakkam

**ReGina AniGer** is looking for a **home tuition teacher** for a **Grade 3** student following the **CBSE** syllabus.

### Requirement
- **All subjects**, including **Tamil**
- **2 hours every day**
- Tuition at or near **Perumbakkam**, Chennai

### Contact
Call **[${PHONE_DISPLAY}](${PHONE_TEL})** to discuss availability, fees, and whether you can cover the full subject list.`.trim();

  const analysisBody = `## Editorial note

This page is a **reader-submitted classified listing** published for visibility only. **mychennaicity.in does not verify** the advertiser, tuition qualifications, or safety of home visits. Meet in a safe setting, ask for references or ID where appropriate, and agree fees and timings in writing before you start.

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
    title: "Tuition teacher wanted: Grade 3 CBSE, Perumbakkam",
    summary:
      "Home tuition for Grade 3 CBSE — all subjects including Tamil, 2 hours daily in Perumbakkam. Contact ReGina AniGer on 9962872406.",
    dek: "Reader listing · verify details before you visit or agree fees.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    areaHubSlug: "omr-perungudi-sholinganallur",
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
    await revalidateNewsAfterSeed({ slug: SLUG, label: "seed-perumbakkam-grade3-tuition-teacher-wanted" });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
