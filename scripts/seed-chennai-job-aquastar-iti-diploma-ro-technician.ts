/**
 * ITI / Diploma — RO water purifier installation & maintenance — AquaStar, Porur.
 *
 * Dev:  `npm run db:seed:chennai-job:aquastar-iti-diploma-ro-technician`
 * Live: `npm run db:seed:chennai-job:aquastar-iti-diploma-ro-technician:live` — uses `.env.production.local`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import { finishListingSeedLive } from "./lib/seed-event-shared";
import * as schema from "../src/db/schema";
import { cities, employers, jobPostings } from "../src/db/schema/tables";

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
      : "DATABASE_URL missing — add to .env.local",
  );
  process.exit(1);
}

const db = drizzle(neon(url), { schema });

const EMPLOYER_SLUG = "aquastar";
const JOB_SLUG = "iti-diploma-ro-water-purifier-technician-aquastar-porur";

const PHONE_DISPLAY = "90928 11199";
const PHONE_APPLY = "tel:+919092811199";

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
    .where(eq(employers.slug, EMPLOYER_SLUG))
    .limit(1);

  if (existingEmp) {
    employerId = existingEmp.id;
    await db
      .update(employers)
      .set({
        name: "AquaStar",
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "AquaStar",
        slug: EMPLOYER_SLUG,
        verified: false,
      })
      .returning({ id: employers.id });
    employerId = ins.id;
    console.log("[seed-job] Inserted employer:", EMPLOYER_SLUG);
  }

  const [existingJob] = await db
    .select({ id: jobPostings.id })
    .from(jobPostings)
    .where(
      and(eq(jobPostings.cityId, city.id), eq(jobPostings.slug, JOB_SLUG)),
    )
    .limit(1);

  const now = new Date();
  const validThrough = new Date(now);
  validThrough.setDate(validThrough.getDate() + 90);

  const body = `
**AquaStar** is hiring **ITI / Diploma** candidates for **RO water purifier installation and maintenance** in **Chennai**.

## Role at a glance

- **Work:** RO water purifier installation & maintenance
- **Training location:** Chennai
- **Interview location:** Porur, Chennai
- **Perks:** Free food & accommodation during training

## Eligibility

- **Qualification:** ITI or Diploma
- **Age:** 18 to 30 years
- **Gender:** Male candidates only

## Salary

- **First 3 months (training):** ₹15,000 in-hand per month
- **From 4th month:** ₹20,000 + insurance

## Working hours

- **Days:** Monday to Saturday
- **Timing:** 9:00 AM – 6:00 PM
- **Week off:** Sunday

## How to apply

Call **${PHONE_DISPLAY}** for interview details and next steps.

Mention that you saw the opening on MyChennaiCity jobs.

**Safety note:** Do **not** pay any upfront “registration” or “security” fee to third parties — verify that you are dealing with the real hiring contact.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "ITI / Diploma — RO water purifier technician (AquaStar · Porur)",
    body,
    locationLabel: "Training: Chennai · Interview: Porur",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: PHONE_APPLY,
    salaryDisclosed: true,
    salaryMin: 15_000,
    salaryMax: 20_000,
    openingsCount: 1,
    remotePolicy: "onsite" as const,
    updatedAt: now,
  };

  if (existingJob) {
    await db
      .update(jobPostings)
      .set(values)
      .where(eq(jobPostings.id, existingJob.id));
    console.log("[seed-job] Refreshed open job:", JOB_SLUG);
  } else {
    await db.insert(jobPostings).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-job] Inserted open job:", JOB_SLUG);
  }

  console.log("[seed-job] Done. Detail:", `/chennai-jobs/${JOB_SLUG}`);
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
