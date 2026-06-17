/**
 * Telecaller — Unique Business Solutions, Ambattur (female; fresher / experienced).
 *
 * Dev:  `npm run db:seed:chennai-job:unique-business-solutions-telecaller`
 * Live: `npm run db:seed:chennai-job:unique-business-solutions-telecaller:live` — uses `.env.production.local`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
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

const EMPLOYER_SLUG = "unique-business-solutions-ambattur";
const JOB_SLUG = "telecaller-unique-business-solutions-ambattur";

const PHONE_PRIMARY = "6380144053";
const PHONE_SECONDARY = "8056728676";
const PHONE_APPLY = "tel:+916380144053";

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
        name: "Unique Business Solutions · Ambattur",
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed name:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "Unique Business Solutions · Ambattur",
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
**Unique Business Solutions** is hiring **telecallers** at **Ambattur, Chennai**.

## Role at a glance
- **Open to:** Female candidates only
- **Experience:** Freshers and experienced welcome
- **Location:** Ambattur

## Working hours
Choose one shift:
- **10:00 AM – 2:00 PM**, or
- **2:00 PM – 6:00 PM**

## Compensation
- **₹6,000 per month** (confirm exact structure with the employer)
- **Daily cash incentives** on top of base pay

## How to apply
Call **${PHONE_PRIMARY}** or **${PHONE_SECONDARY}** for details and next steps.

Mention that you saw the opening on MyChennaiCity jobs.

**Safety note:** Do **not** pay any upfront “registration” or “security” fee to third parties — verify that you are dealing with the real hiring contact.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Telecaller — Unique Business Solutions · Ambattur",
    body,
    locationLabel: "Ambattur, Chennai",
    status: "open" as const,
    employmentType: "PART_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: PHONE_APPLY,
    salaryDisclosed: true,
    salaryMin: 6_000,
    salaryMax: 6_000,
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
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
