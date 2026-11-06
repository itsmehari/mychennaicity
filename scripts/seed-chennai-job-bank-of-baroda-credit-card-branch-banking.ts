/**
 * Bank of Baroda (BOB) — Credit Card · Branch Banking (Chennai / TN / Kerala).
 * Hiring contact: Preetha (HR) 74184 50666.
 *
 * Dev:  `npm run db:seed:chennai-job:bank-of-baroda-credit-card-branch-banking`
 * Live: `npm run db:seed:chennai-job:bank-of-baroda-credit-card-branch-banking:live` — uses `.env.production.local`
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

const EMPLOYER_SLUG = "bank-of-baroda-credit-card";
const JOB_SLUG = "credit-card-branch-banking-bank-of-baroda-chennai-kerala";

const BOB_CAREERS = "https://www.bankofbaroda.in/career-opportunities";
const HR_NAME = "Preetha (HR)";
const PHONE_DISPLAY = "74184 50666";
const PHONE_APPLY = "tel:+917418450666";
const WA_APPLY = `https://wa.me/917418450666?text=${encodeURIComponent(
  "Hi Preetha, I saw the Bank of Baroda Credit Card – Branch Banking role on MyChennaiCity jobs. I would like to share my resume.",
)}`;

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
        name: "Bank of Baroda (BOB)",
        websiteUrl: BOB_CAREERS,
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "Bank of Baroda (BOB)",
        slug: EMPLOYER_SLUG,
        websiteUrl: BOB_CAREERS,
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
A hiring note names **Bank of Baroda (BOB)** for **Credit Card – Branch Banking** roles across **Chennai**, wider **Tamil Nadu**, and **Kerala**. **Freshers and experienced** candidates may apply.

This page is compiled from that note. It is not the bank’s official careers portal — cross-check any offer with [Bank of Baroda career opportunities](${BOB_CAREERS}) before you share documents or pay any fee.

## Role at a glance

| | |
| --- | --- |
| **Position** | Credit Card – Branch Banking |
| **Locations** | Chennai, Tamil Nadu & Kerala |
| **Who can apply** | Freshers & experienced |
| **Languages** | Tamil & English |
| **Work type** | **No field work** · **No bike required** (branch banking as per the note) |
| **Weekly off** | Sunday + **2nd & 4th Saturday** off |
| **Joining** | Immediate joiners preferred |

## Pay (as in the note)

- **Salary:** ₹20,000 – ₹25,000 per month
- **Incentives:** up to ₹30,000 (confirm structure with HR)

## How to apply

**WhatsApp or call ${HR_NAME}:** **${PHONE_DISPLAY}**

Send your **updated resume** on WhatsApp today if you are interested.

Mention that you saw the opening on MyChennaiCity jobs.

**Safety note:** Do **not** pay registration, training, or security deposits to third parties. Verify that you are dealing with the real hiring contact and understand whether the role is direct bank employment or through a partner before you join.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Credit Card – Branch Banking · Bank of Baroda (BOB) · Chennai, TN & Kerala",
    body,
    locationLabel: "Chennai, Tamil Nadu & Kerala",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: WA_APPLY,
    salaryDisclosed: true,
    salaryMin: 20_000,
    salaryMax: 25_000,
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
  console.log("[seed-job] Call apply:", PHONE_APPLY);
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
