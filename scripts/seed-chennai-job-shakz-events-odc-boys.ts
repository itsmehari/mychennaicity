/**
 * Shakz Events — one catering ODC listing for Sunday 18 Oct 2026.
 * 30 outlet codes, 80 boys, one shift. Spot payment; amount not printed.
 *
 * Dev:  `npm run db:seed:chennai-job:shakz-events-odc-boys`
 * Live: `npm run db:seed:chennai-job:shakz-events-odc-boys:live`
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { finishListingSeedLive, isLiveSeed, loadEventSeedEnv } from "./lib/seed-event-shared";
import {
  SHAKZ_ODC_EMPLOYER_NAME,
  SHAKZ_ODC_EMPLOYER_SLUG,
  SHAKZ_ODC_LOCATION_LABEL,
  SHAKZ_ODC_SLUG,
  SHAKZ_ODC_TITLE,
  SHAKZ_ODC_TOTAL_BOYS,
  buildShakzOdcBody,
  shakzOdcWhatsAppUrl,
} from "../src/content/jobs/shakz-events-odc-boys";
import * as schema from "../src/db/schema";
import { cities, employers, jobPostings } from "../src/db/schema/tables";

const live = isLiveSeed();
loadEventSeedEnv(live);

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    live
      ? "Live: DATABASE_URL missing (.env.production.local)."
      : "DATABASE_URL missing — add to .env.local",
  );
  process.exit(1);
}

if (SHAKZ_ODC_TOTAL_BOYS !== 80) {
  console.error(`Expected 80 boys, counted ${SHAKZ_ODC_TOTAL_BOYS}.`);
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
    console.error("City slug 'chennai' not found. Seed cities first.");
    process.exit(1);
  }

  let employerId: string;
  const [existingEmp] = await db
    .select({ id: employers.id })
    .from(employers)
    .where(eq(employers.slug, SHAKZ_ODC_EMPLOYER_SLUG))
    .limit(1);

  if (existingEmp) {
    employerId = existingEmp.id;
    await db
      .update(employers)
      .set({
        name: SHAKZ_ODC_EMPLOYER_NAME,
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer refreshed:", SHAKZ_ODC_EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: SHAKZ_ODC_EMPLOYER_NAME,
        slug: SHAKZ_ODC_EMPLOYER_SLUG,
        verified: false,
      })
      .returning({ id: employers.id });
    employerId = ins.id;
    console.log("[seed-job] Inserted employer:", SHAKZ_ODC_EMPLOYER_SLUG);
  }

  const now = new Date();
  const validThrough = new Date("2026-10-18T23:59:59+05:30");
  const body = buildShakzOdcBody();

  const [row] = await db
    .select({ id: jobPostings.id })
    .from(jobPostings)
    .where(eq(jobPostings.slug, SHAKZ_ODC_SLUG))
    .limit(1);

  const values = {
    employerId,
    cityId: city.id,
    slug: SHAKZ_ODC_SLUG,
    title: SHAKZ_ODC_TITLE,
    body,
    locationLabel: SHAKZ_ODC_LOCATION_LABEL,
    status: "open" as const,
    employmentType: "PART_TIME",
    validThrough,
    applicationUrl: shakzOdcWhatsAppUrl(),
    salaryDisclosed: false,
    salaryMin: null,
    salaryMax: null,
    openingsCount: SHAKZ_ODC_TOTAL_BOYS,
    remotePolicy: "field" as const,
    updatedAt: now,
  };

  if (row) {
    await db.update(jobPostings).set(values).where(eq(jobPostings.id, row.id));
    console.log("[seed-job] Refreshed open job:", SHAKZ_ODC_SLUG);
  } else {
    await db.insert(jobPostings).values({
      ...values,
      publishedAt: now,
      createdAt: now,
    });
    console.log("[seed-job] Inserted open job:", SHAKZ_ODC_SLUG);
  }

  console.log("[seed-job] Done.");
  console.log("[seed-job] URL:", `/chennai-jobs/${SHAKZ_ODC_SLUG}`);
  await finishListingSeedLive({ jobSlug: SHAKZ_ODC_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
