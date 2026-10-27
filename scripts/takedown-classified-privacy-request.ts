/**
 * Privacy takedown for classified listings (poster / data-principal request).
 *
 * Closes matching rows, wipes contact_phone, and replaces the public body
 * so the number cannot stay on the live page, hub, or sitemap.
 *
 * Dev:  npx tsx scripts/takedown-classified-privacy-request.ts
 * Live: npx tsx scripts/takedown-classified-privacy-request.ts --live
 *
 * Optional: PRIVACY_PHONE=… also matches any other listing with that number.
 * Do not log or commit the phone.
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq, inArray, or } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { cities, classifiedListings } from "../src/db/schema/tables";
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

const DEFAULT_SLUGS = [
  "female-bachelor-room-wanted-perungudi-adyar-thiruvanmiyur-june-2026",
  "urgent-1rk-1bhk-rental-wanted-working-woman-thiruvanmiyur-aug-2026",
];

const REMOVAL_BODY = `This listing was removed at the poster's request.

Contact details that previously appeared here are no longer published.`;

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

async function main() {
  const extraSlugs = process.argv
    .filter((a) => a.startsWith("--slug="))
    .map((a) => a.slice("--slug=".length).trim())
    .filter(Boolean);
  const slugs = extraSlugs.length > 0 ? extraSlugs : DEFAULT_SLUGS;
  const privacyPhone = digitsOnly(process.env.PRIVACY_PHONE ?? "");

  const [city] = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, "chennai"))
    .limit(1);

  if (!city) {
    console.error("City slug 'chennai' not found.");
    process.exit(1);
  }

  const slugMatch = and(
    eq(classifiedListings.cityId, city.id),
    inArray(classifiedListings.slug, slugs),
  );

  const where =
    privacyPhone.length >= 10
      ? or(slugMatch, eq(classifiedListings.contactPhone, privacyPhone))
      : slugMatch;

  const rows = await db
    .select({
      id: classifiedListings.id,
      slug: classifiedListings.slug,
      status: classifiedListings.status,
    })
    .from(classifiedListings)
    .where(where);

  if (rows.length === 0) {
    console.log("[privacy-takedown] No matching classified listings.");
    process.exit(0);
  }

  const now = new Date();
  for (const row of rows) {
    await db
      .update(classifiedListings)
      .set({
        status: "closed",
        contactPhone: null,
        posterName: null,
        posterUrl: null,
        featured: false,
        body: REMOVAL_BODY,
        updatedAt: now,
      })
      .where(eq(classifiedListings.id, row.id));
    console.log(
      `[privacy-takedown] Closed ${row.slug} (was ${row.status})`,
    );
    await finishListingSeedLive({
      classifiedSlug: row.slug,
      label: `privacy-takedown-${row.slug}`,
    });
  }

  console.log(`[privacy-takedown] Updated ${rows.length} listing(s).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
