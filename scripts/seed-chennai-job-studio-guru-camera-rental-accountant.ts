/**
 * Accountant — Studio Guru Camera Rental, Chennai.
 * Source note (20 Oct 2026): full-time; Tally, GST, MS Excel; accounting,
 * billing, payment management, bookkeeping; salary based on experience;
 * contact 84388 94524. Street and vacancy count were not supplied.
 *
 * Dev:  `npm run db:seed:chennai-job:studio-guru-accountant`
 * Live: `npm run db:seed:chennai-job:studio-guru-accountant:live`
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

const EMPLOYER_SLUG = "studio-guru-camera-rental";
const EMPLOYER_NAME = "Studio Guru Camera Rental";
const JOB_SLUG = "accountant-studio-guru-camera-rental-chennai";
const PHONE_DISPLAY = "84388 94524";
const WA_APPLY = `https://wa.me/918438894524?text=${encodeURIComponent(
  "Hello, I am applying for the Accountant role at Studio Guru Camera Rental in Chennai. I saw the opening on MyChennaiCity.",
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
        ilike(jobPostings.title, "%Studio Guru%"),
        ilike(jobPostings.body, "%8438894524%"),
        ilike(jobPostings.body, "%84388 94524%"),
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
  validThrough.setDate(validThrough.getDate() + 90);

  const body = `
**Studio Guru Camera Rental** is hiring a full-time **accountant** in **Chennai**. The note asks for someone responsible and detail-oriented. Pay is **based on experience**. A street address and a vacancy count were not given. Call or WhatsApp **${PHONE_DISPLAY}**.

## Role at a glance

- **Position:** Accountant
- **Job type:** Full-time, onsite
- **Location:** Chennai
- **Salary:** Based on experience (no figure was stated)
- **Employer:** Studio Guru Camera Rental

## Requirements

- Knowledge of Tally, GST, and MS Excel
- Experience in accounting, billing, payment management, and bookkeeping
- Good record-keeping and organisational skills

The note does not state a minimum number of years.

## How to apply

Call or WhatsApp **${PHONE_DISPLAY}**. Say you are applying for the accountant role at Studio Guru Camera Rental, and that you saw it on MyChennaiCity.

This page is compiled from the hiring note. It is not a Studio Guru Camera Rental careers page.

## Common questions

### Who is hiring the accountant in Chennai?

Studio Guru Camera Rental. The notice says Chennai and does not give a door number.

### What does the role need?

Knowledge of Tally, GST, and MS Excel. Experience in accounting, billing, payment management, and bookkeeping. The note also asks for good record-keeping and organisational skills, and for someone responsible and detail-oriented.

### What is the salary?

Based on experience. No amount was stated, so this listing does not publish a pay band.

### How do I apply?

Call or WhatsApp ${PHONE_DISPLAY}. Mention the accountant opening at Studio Guru Camera Rental.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Accountant — Studio Guru Camera Rental, Chennai",
    body,
    locationLabel: "Chennai",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    applicationUrl: WA_APPLY,
    salaryDisclosed: false,
    salaryMin: null,
    salaryMax: null,
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

  console.log("[seed-job] Done. Detail:", `/chennai-jobs/${JOB_SLUG}`);
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
