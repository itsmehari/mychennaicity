/**
 * Weekend turf caretaker — Maduravoyal, Chennai.
 * Source ad had no public phone; apply CTA is the jobs contact form until a number is supplied.
 *
 * Dev:  `npm run db:seed:chennai-job:turf-caretaker-weekend-maduravoyal`
 * Live: `npm run db:seed:chennai-job:turf-caretaker-weekend-maduravoyal:live` — uses `.env.production.local`
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

const EMPLOYER_SLUG = "turf-maduravoyal";
const JOB_SLUG = "turf-caretaker-weekend-maduravoyal";

/** Original weekend listing said “contact us” with no phone/email. */
const APPLY_URL = "https://mychennaicity.in/contact#jobs";

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
        name: "Turf · Maduravoyal",
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "Turf · Maduravoyal",
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
A turf in **Maduravoyal, Chennai** needs a **responsible weekend caretaker** to supervise evening and night shifts, help players, and keep the ground in order.

## Working hours (weekends only)

- **Saturday:** 6:00 PM – 1:00 AM
- **Sunday:** 2:00 PM – 1:00 AM

This is a **part-time, onsite** role — not a weekday staff post.

## Responsibilities

- Supervise turf operations during the shift
- Handle customer bookings and assist players
- Keep the facility clean and well managed
- Switch lights on/off and store equipment safely
- Report any issues to management

## Pay

**₹3,000 per month**, as stated in the source ad. Confirm the amount and payment cycle with the employer when you apply.

## Location

**Maduravoyal, Chennai** — onsite at the turf. The original listing did not name the facility.

## How to apply

The weekend listing asked interested candidates to **contact for further details**, but it did **not** include a public phone or WhatsApp number. Use our [jobs contact form](${APPLY_URL}) and mention **Turf caretaker — Maduravoyal (weekend)** so we can help connect you if a hiring contact reaches us. If you already have the employer’s number from the original poster, call them directly.

Mention that you saw the opening on MyChennaiCity jobs.

**Safety note:** Do **not** pay any upfront “registration” or “security” fee to third parties — verify that you are dealing with the real hiring contact. Night shifts end at 1:00 AM; confirm travel and safety arrangements before you accept.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Turf caretaker — weekend shifts · Maduravoyal",
    body,
    locationLabel: "Maduravoyal, Chennai",
    status: "open" as const,
    employmentType: "PART_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: APPLY_URL,
    salaryDisclosed: true,
    salaryMin: 3_000,
    salaryMax: 3_000,
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
