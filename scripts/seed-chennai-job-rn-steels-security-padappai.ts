/**
 * Security — RN STEELS PVT LTD, Padappai.
 * Source note (5 Nov 2026): free room and lunch; salary 20k;
 * male only; duty 12 hours; call 78457 96811. English only.
 * Street, shift clock, and vacancy count were not given.
 *
 * Dev:  `npm run db:seed:chennai-job:rn-steels-security-padappai`
 * Live: `npm run db:seed:chennai-job:rn-steels-security-padappai:live`
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

const EMPLOYER_SLUG = "rn-steels-pvt-ltd";
const EMPLOYER_NAME = "RN STEELS PVT LTD";
const JOB_SLUG = "security-rn-steels-padappai";
const PHONE_DISPLAY = "78457 96811";
const TEL = "tel:+917845796811";

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
        ilike(jobPostings.body, "%7845796811%"),
        ilike(jobPostings.body, "%78457 96811%"),
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
  // 30 days from 5 Nov 2026. Last moment of 5 Dec 2026 IST.
  const validThrough = new Date("2026-12-05T23:59:59+05:30");
  const stillOpen = validThrough.getTime() > now.getTime();

  const body = `
**RN STEELS PVT LTD** is hiring for **security** in **Padappai, Chennai**.

## Role

- **Position:** Security
- **Company:** RN STEELS PVT LTD
- **Place:** Padappai, Chennai (no door number or street)
- **Who can apply:** Male only, as stated by the employer
- **Duty:** 12 hours (start and end times were not given)
- **Pay:** ₹20,000 (the note prints **20k**; this listing reads that as per month)
- **Benefits:** Free room and lunch
- **Contact:** [+91 ${PHONE_DISPLAY}](${TEL})

The note does not name a street, a shift clock, experience, age, or how many seats are open. It does not say full-time, part-time, or contract.

## Pay and stay

**₹20,000**, written as 20k. **Free room** and **lunch** are provided. The note does not print a pay period; amounts in this band are shown as monthly.

## How to apply

Call **[+91 ${PHONE_DISPLAY}](${TEL})**.

Say you are applying for the security role at RN STEELS PVT LTD, Padappai, and that you saw it on MyChennaiCity.

This page is compiled from the hiring note. It is not a company careers page. Confirm the workplace, hours, room, lunch, and pay with the employer before you join.

## Common questions

### Where is the job?

Padappai, Chennai, with RN STEELS PVT LTD. No door number or street was given.

### Who can apply?

The employer asked for male candidates only.

### What are the hours, pay, and stay?

Duty is 12 hours. Pay is ₹20,000, read here as per month. Free room and lunch are provided. The note does not give the shift start time.

### How do I apply?

Call +91 ${PHONE_DISPLAY}.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Security — RN STEELS PVT LTD, Padappai, Chennai",
    body,
    locationLabel: "Padappai, Chennai",
    status: (stillOpen ? "open" : "closed") as "open" | "closed",
    employmentType: null,
    validThrough,
    applicationUrl: TEL,
    salaryDisclosed: true,
    salaryMin: 20_000,
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

  console.log("[seed-job] Done. Detail:", `/chennai-jobs/${JOB_SLUG}`);
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
