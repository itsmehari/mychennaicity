/**
 * Isoftronics — IT jobs for freshers, pay after placement.
 * Note (14 Nov 2026): Developer, Full Stack, Tester / QA, Data Analyst,
 * Business Analyst. Graduates 2022–2026, 0–1 year. Resume help, interview
 * prep, training, placement assistance. No advance fee; any fee in writing
 * with a receipt; bank or UPI only; no cash. Deposit as per company bond;
 * refund only on the bond terms if not placed in the agreed period and every
 * interview was attended. No refund for rejecting a valid offer, missing
 * interviews, fake documents, or breaking the bond. They say they are
 * placement assistance, not the employer. No job or salary guaranteed.
 * Contact 9384862561. City, street, hours, job type, vacancy count, fee
 * amount, deposit amount, and bond length are not printed. English only.
 *
 * Dev:  `npm run db:seed:chennai-job:isoftronics-fresher-it`
 * Live: `npm run db:seed:chennai-job:isoftronics-fresher-it:live`
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

const EMPLOYER_SLUG = "isoftronics";
const EMPLOYER_NAME = "Isoftronics";
const JOB_SLUG = "it-jobs-freshers-isoftronics-pay-after-placement";
const PHONE_DISPLAY = "93848 62561";
const PHONE_DIGITS = "919384862561";
const TEL = `tel:+${PHONE_DIGITS}`;

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
        ilike(jobPostings.body, "%9384862561%"),
        ilike(jobPostings.body, "%93848 62561%"),
        ilike(jobPostings.applicationUrl, "%919384862561%"),
      ),
    );

  const other = matches.filter((row) => row.slug !== JOB_SLUG);
  if (other.length > 0) {
    console.log("[seed-job] Same phone already on another listing. Skipping.");
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
  // 30 days from 14 Nov 2026. Last moment of 14 Dec 2026 IST.
  const validThrough = new Date("2026-12-14T23:59:59+05:30");
  const stillOpen = validThrough.getTime() > now.getTime();

  const body = `
A note from **Isoftronics** offers **IT jobs for freshers** under the heading **pay after placement**. The same note says Isoftronics is **placement assistance, not the employer**. It does not name a hiring company, a city, a street, hours, or how many seats are open.

## Roles

The note lists these roles together. It does not split pay, place, or vacancies by title.

- Developer
- Full Stack
- Tester / QA
- Data Analyst
- Business Analyst

- **Company name (as written):** Isoftronics
- **Contact:** [${PHONE_DISPLAY}](${TEL})

The note does not say full-time, part-time, contract, office, or work from home.

## Who can apply

- Graduates of **2022, 2023, 2024, 2025, or 2026**
- **0 to 1 year** of experience

## What the note says you get

- Resume help
- Interview prep
- Training
- Placement assistance

## Fees

**No advance fee.** If any fee applies, the note says you are informed **in writing**, with a **receipt**. Payment is only by **bank or UPI**. **No cash.**

The note does not print a rupee amount for a fee, a deposit, or a salary.

## Deposit and bond

A **deposit** is collected **as per the company bond agreement**.

The note says a **refund** is given by the company **as per the bond terms** if you are **not placed in the agreed period** and you **attended all interviews**.

**No refund** if you:

- reject a valid offer
- remain absent for interviews
- give fake documents
- discontinue or break the bond

The note does not print the deposit amount, the bond length, or how long the agreed placement period is.

## What they say about the offer

- They are **placement assistance, not the employer**.
- **No job or salary is guaranteed.**
- Selection is by the hiring company, based on **skills and the interview**.
- **Liability is limited to the fee paid.**
- Data is shared **only with hiring companies**.

## How to apply

Call **[${PHONE_DISPLAY}](${TEL})**.

Say you saw the Isoftronics fresher IT note on MyChennaiCity.

This page is compiled from that note. Read the bond before you pay a deposit or share certificates. Confirm any fee in writing, with a receipt, and confirm which company would hire you. The heading “pay after placement” sits next to a deposit and a bond. It is not a promise of a job or a salary.

## Common questions

### Is Isoftronics the employer?

The note names Isoftronics as the company, and it also says they are placement assistance, not the employer. It does not name the hiring company.

### Who can apply?

Graduates of 2022 through 2026, with 0 to 1 year of experience. The roles listed are Developer, Full Stack, Tester / QA, Data Analyst, and Business Analyst.

### Is there a fee?

The note says there is no advance fee. If any fee applies, it says you are told in writing and given a receipt. Payment is by bank or UPI only, not cash. A deposit is collected as per the company bond. No rupee amount is printed for the fee, the deposit, or a salary.

### When is the deposit refunded?

The note says the company refunds the deposit as per the bond terms if you are not placed in the agreed period and you attended all interviews. It says there is no refund if you reject a valid offer, miss interviews, give fake documents, or discontinue or break the bond.

### Is a job guaranteed?

No. The note says no job or salary is guaranteed. Selection is by the hiring company, based on skills and the interview.

### Where is the job?

The note does not name a city or a street.

### How do I apply?

Call ${PHONE_DISPLAY}.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "IT jobs for freshers — Isoftronics (pay after placement)",
    body,
    locationLabel: "City not stated",
    status: (stillOpen ? "open" : "closed") as "open" | "closed",
    employmentType: null,
    validThrough,
    applicationUrl: TEL,
    salaryDisclosed: false,
    salaryMin: null,
    salaryMax: null,
    openingsCount: 1,
    remotePolicy: "unspecified",
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
