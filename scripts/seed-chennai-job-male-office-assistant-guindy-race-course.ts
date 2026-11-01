/**
 * Male office assistant — Guindy Race Course, Chennai.
 * Source note (1 Nov 2026): individual employer, no company name;
 * Tamil + Hindi or Tamil + Telugu; 6 hours a day; ₹15,000 per month;
 * contact 76710 65348. English only.
 * Same note on https://mynanganallur.in/jobs/male-office-assistant-guindy-race-course
 *
 * Dev:  `npm run db:seed:chennai-job:male-office-assistant-guindy`
 * Live: `npm run db:seed:chennai-job:male-office-assistant-guindy:live`
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

const EMPLOYER_SLUG = "individual-employer-guindy-race-course";
const EMPLOYER_NAME = "Individual employer, Guindy Race Course";
const JOB_SLUG = "male-office-assistant-guindy-race-course";
const PHONE_DISPLAY = "76710 65348";
const SISTER =
  "https://mynanganallur.in/jobs/male-office-assistant-guindy-race-course";
const WA_APPLY = `https://wa.me/917671065348?text=${encodeURIComponent(
  "Hi, I saw the male office assistant opening at Guindy Race Course on MyChennaiCity and would like to apply.",
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
        ilike(jobPostings.body, "%7671065348%"),
        ilike(jobPostings.body, "%76710 65348%"),
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
  // 30 days from 1 Nov 2026. Last moment of 1 Dec 2026 IST.
  const validThrough = new Date("2026-12-01T23:59:59+05:30");
  const stillOpen = validThrough.getTime() > now.getTime();

  const body = `
An **individual employer** at **Guindy Race Course, Chennai** is hiring a **male office assistant**. No company name was given. The same note is on [MyNanganallur](${SISTER}).

## Role

- **Position:** Male office assistant
- **Place:** Guindy Race Course, Chennai (no door number or company name)
- **Who can apply:** Male, as stated by the employer
- **Languages:** Tamil and Hindi, or Tamil and Telugu
- **Hours:** 6 hours a day (start and end times were not given)
- **Pay:** ₹15,000 per month
- **Contact:** [+91 ${PHONE_DISPLAY}](tel:+917671065348)

The note does not name a company, a street number, a shift start time, or how many seats are open. It does not say whether the 6 hours are morning or evening.

## Pay

**₹15,000 per month**, as stated.

## Languages

**Tamil and Hindi**, or **Tamil and Telugu**.

## How to apply

Call or WhatsApp **[+91 ${PHONE_DISPLAY}](tel:+917671065348)**.

Say you are applying for the male office assistant role at Guindy Race Course, and that you saw it on MyChennaiCity.

This page is compiled from the hiring note. It is not a company careers page. Confirm the workplace, hours, and pay with the employer before you join.

## Common questions

### Where is the job?

Guindy Race Course, Chennai. No door number or company name was given.

### Who can apply?

The employer asked for a male office assistant who speaks Tamil and Hindi, or Tamil and Telugu.

### What are the hours and pay?

6 hours a day. ₹15,000 per month. The note does not give the start time.

### How do I apply?

Call or WhatsApp +91 ${PHONE_DISPLAY}.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Male office assistant — Guindy Race Course, Chennai",
    body,
    locationLabel: "Guindy Race Course, Chennai",
    status: (stillOpen ? "open" : "closed") as "open" | "closed",
    employmentType: null,
    validThrough,
    applicationUrl: WA_APPLY,
    salaryDisclosed: true,
    salaryMin: 15_000,
    salaryMax: 15_000,
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
