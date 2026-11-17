/**
 * Urgent — male admin staff for a Chennai showroom (Tally, email, bike plus).
 * Showroom name and street not in the note. Call 9940334453.
 *
 * Dev:  `npm run db:seed:chennai-job:urgent-showroom-admin-staff`
 * Live: `npm run db:seed:chennai-job:urgent-showroom-admin-staff:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq, ilike, or } from "drizzle-orm";
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

const EMPLOYER_SLUG = "chennai-showroom-admin-staff";
const EMPLOYER_NAME = "Chennai showroom";
const JOB_SLUG = "urgent-admin-staff-showroom-male-tally-chennai-november-2026";
const PHONE = "9940334453";
const PHONE_DISPLAY = "99403 34453";
const PHONE_APPLY = `tel:+91${PHONE}`;
const WA_APPLY = `https://wa.me/91${PHONE}?text=${encodeURIComponent(
  "Hi, I saw the urgent showroom admin staff opening on MyChennaiCity and I am immediately available. I would like to discuss the role.",
)}`;

async function main() {
  const matches = await db
    .select({
      slug: jobPostings.slug,
      title: jobPostings.title,
      status: jobPostings.status,
    })
    .from(jobPostings)
    .where(
      or(
        ilike(jobPostings.body, `%${PHONE}%`),
        ilike(jobPostings.body, "%99403 34453%"),
      ),
    );

  const other = matches.filter((row) => row.slug !== JOB_SLUG);
  if (other.length > 0) {
    console.log("[seed-job] Duplicate already live. Skipping.");
    for (const row of other) {
      console.log(`- ${row.status} /chennai-jobs/${row.slug} — ${row.title}`);
    }
    process.exit(0);
  }

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
      .set({ name: EMPLOYER_NAME, updatedAt: new Date() })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer refreshed:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: EMPLOYER_NAME,
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
    .where(and(eq(jobPostings.cityId, city.id), eq(jobPostings.slug, JOB_SLUG)))
    .limit(1);

  const now = new Date();
  const validThrough = new Date(now);
  validThrough.setDate(validThrough.getDate() + 45);

  const body = `
An employer with a **showroom in Chennai** is hiring **male administrative staff** on an **urgent, immediate** basis. The note does not name the showroom or give a street address.

## Role at a glance

- **Job role:** Showroom **administration and correspondence**
- **Who can apply:** **Male candidates only**
- **Salary:** **₹15,000 to ₹20,000 per month**, based on experience (as stated)
- **Availability:** **Immediately available** candidates preferred

## Requirements (as stated)

- **Basic computer knowledge**; **Tally proficiency preferred**
- **Mandatory experience** in handling **email communication**
- **Two-wheeler / personal bike** is an added advantage (showroom area not named — confirm travel distance on the call)

## Location

**Chennai** — showroom only. The hiring note does not print a locality or pin code. Ask for the full address and reporting time before you visit.

## How to apply

Call directly: **[+91 ${PHONE_DISPLAY}](${PHONE_APPLY})**

WhatsApp (optional): [Message the hiring contact](${WA_APPLY})

Say you saw the urgent admin opening on **MyChennaiCity jobs** and that you can join immediately.

## Before you join

MyChennaiCity does not verify the employer or pay band. Confirm showroom name, exact location, working hours, PF/ESI, and take-home pay on the call. Do not pay any registration or “security” fee to third parties.

This page is compiled from the hiring note. It is not the showroom’s own careers page.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Urgent — admin staff (showroom, male, Tally & email) — Chennai",
    body,
    locationLabel: "Chennai (showroom location not named in note)",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
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
    console.log("[seed-job] Refreshed:", JOB_SLUG);
  } else {
    await db.insert(jobPostings).values({
      ...values,
      publishedAt: now,
      createdAt: now,
    });
    console.log("[seed-job] Inserted:", JOB_SLUG);
  }

  console.log(
    "[seed-job] Done. Detail:",
    `https://mychennaicity.in/chennai-jobs/${JOB_SLUG}`,
  );
  await finishListingSeedLive({
    jobSlug: JOB_SLUG,
    label: "seed-urgent-showroom-admin-staff",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});