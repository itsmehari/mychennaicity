/**
 * Swiggy QRT — Audit & Pod Management (Chennai).
 * Source: hiring note supplied 1 Oct 2026 (call / WhatsApp 82487 83206).
 * Fixed salary ₹19,000 / month and travel allowance ₹2,300 were stated.
 * Joining bonus and monthly performance bonus were named without amounts.
 * No locality, reporting address, or general-shift hours were stated — do not invent them.
 * Do not expand “QRT”; the note prints it as-is.
 *
 * Dev:  `npm run db:seed:chennai-job:swiggy-qrt-audit-pod-management`
 * Live: `npm run db:seed:chennai-job:swiggy-qrt-audit-pod-management:live`
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

const EMPLOYER_SLUG = "swiggy-chennai";
const EMPLOYER_NAME = "Swiggy";
const EMPLOYER_SITE = "https://www.swiggy.com";
const JOB_SLUG = "swiggy-qrt-audit-pod-management-chennai";
const PHONE_DISPLAY = "82487 83206";
const WA_APPLY = `https://wa.me/918248783206?text=${encodeURIComponent(
  "Hello, I am applying for the Swiggy QRT Audit & Pod Management role in Chennai. I have a bike and a valid driving licence. I saw the opening on MyChennaiCity.",
)}`;

const BODY = `
**Swiggy QRT** is hiring for **Audit & Pod Management** in **Chennai**. The note asks for immediate joiners and says vacancies are limited.

This page is compiled from the employer’s hiring note. It is a community listing, not Swiggy’s official careers page. Confirm the reporting point, shift hours, and who you will work for before you accept.

## Role at a glance

- **Position:** Audit & Pod Management (Swiggy QRT)
- **Location:** Chennai (no area or street address was stated)
- **Shift:** General shift (hours were not stated)
- **Work:** Pod visits, pod auditing, and pod management and coordination
- **Fixed salary:** **₹19,000** per month
- **Travel allowance:** **₹2,300**
- **Also named:** a joining bonus and a monthly performance bonus — amounts were not stated

JobPosting pay on this page is the stated fixed salary only. The travel allowance is separate. Ask the contact what the bonuses are before you join.

## Requirements

- **Bike — mandatory**
- **Valid driving licence — required**
- Immediate joiners preferred

## How to apply

Call or WhatsApp **${PHONE_DISPLAY}**, or use the **Apply via WhatsApp** button on this listing. Mention that you saw the opening on MyChennaiCity jobs.

**Safety note:** Do **not** pay any upfront “registration”, “training”, or “bike” fee to get this interview. Confirm that the number is hiring for this Swiggy QRT role, and confirm pay, allowance, and bonus terms in writing before you accept.
`.trim();

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
        name: EMPLOYER_NAME,
        websiteUrl: EMPLOYER_SITE,
        verified: false,
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: EMPLOYER_NAME,
        slug: EMPLOYER_SLUG,
        websiteUrl: EMPLOYER_SITE,
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

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Audit & Pod Management — Swiggy QRT · Chennai",
    body: BODY,
    locationLabel: "Chennai · general shift · bike required",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    applicationUrl: WA_APPLY,
    salaryDisclosed: true,
    salaryMin: 19_000,
    salaryMax: 19_000,
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
      publishedAt: now,
      createdAt: now,
    });
    console.log("[seed-job] Inserted open job:", JOB_SLUG);
  }

  console.log("[seed-job] Done. Detail:", `/chennai-jobs/${JOB_SLUG}`);
  await finishListingSeedLive({
    jobSlug: JOB_SLUG,
    label: "seed-job-swiggy-qrt-audit-pod-management",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
