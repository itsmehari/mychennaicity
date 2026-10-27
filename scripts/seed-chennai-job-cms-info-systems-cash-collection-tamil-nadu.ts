/**
 * Part-time cash collection executive — CMS Info Systems, across Tamil Nadu.
 * Source note (24 Oct 2026): part-time; 10:00 AM–2:00 PM, Saturday and Sunday
 * availability, flexible by assignment; ₹10,000–₹30,000 per month depending on
 * hours, assignments, and eligibility; own bike, valid DL, smartphone, Aadhaar;
 * pickup from assigned locations including railway stations.
 * Named districts: Chennai, Coimbatore, Madurai, Trichy, Salem, Tirunelveli,
 * Vellore, Erode, Thanjavur, and other districts. Vacancy count unstated.
 * The note prints HR contact 936131790 (nine digits). Do not pad it.
 *
 * Dev:  `npm run db:seed:chennai-job:cms-cash-collection`
 * Live: `npm run db:seed:chennai-job:cms-cash-collection:live`
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

const EMPLOYER_SLUG = "cms-info-systems";
const EMPLOYER_NAME = "CMS Info Systems";
const EMPLOYER_SITE = "https://www.cms.com/careers";
const JOB_SLUG = "part-time-cash-collection-executive-cms-info-systems-tamil-nadu";
/** Printed as nine digits. Do not add a digit or a country code. */
const PHONE_PRINTED = "936131790";

const body = `
**CMS Info Systems** is named in a hiring note for a **part-time cash collection executive**. The note says the work is **across Tamil Nadu**, including Chennai, with pickup from assigned locations.

This page is compiled from that note. It is not the company’s careers page. Check [cms.com/careers](${EMPLOYER_SITE}) before you travel, share documents, or handle cash. The note does not name a branch, a street, or a vacancy count.

## Role at a glance

- **Position:** Part-time cash collection executive
- **Company named in the note:** CMS Info Systems
- **Engagement:** Part-time
- **Hours named:** 10:00 AM – 2:00 PM; Saturday and Sunday availability; flexible availability based on assignments
- **Pay named:** ₹10,000 – ₹30,000 per month, depending on working hours, assignments, and eligibility
- **Work:** Cash collection and pickup, including railway stations and other designated locations, then travel to those assignments
- **Asked for:** Own bike, valid driving licence, smartphone, Aadhaar card
- **Who they say they want:** People looking for part-time work, willing to travel, and who are responsible and punctual

## What the note says you would do

- Collect and pick up cash from different locations
- Take pickup assignments at railway stations and other designated locations
- Travel to the assigned locations
- Finish the collection as per company instructions

## Where

The note says **all over Tamil Nadu**, and names Chennai, Coimbatore, Madurai, Trichy, Salem, Tirunelveli, Vellore, Erode, Thanjavur, and other districts. It does not print a reporting office.

## Pay

**₹10,000 – ₹30,000 per month.** The note says the amount depends on working hours, assignments, and eligibility. Confirm the figure, and what it covers, before you accept.

## How to apply

The note asks interested candidates to **contact HR** for the application process. The only contact it prints is **${PHONE_PRINTED}**.

That number is **nine digits**. An Indian mobile number is ten digits. This listing does not add a missing digit, and it does not open a call or WhatsApp button for it. If someone sent you this note, ask them for the full number, then confirm you are speaking to CMS before you share an Aadhaar copy, a licence photo, or bank details.

You can also look up current openings on the company’s public careers page: [cms.com/careers](${EMPLOYER_SITE}).

Do not pay a registration or security fee. Do not collect or move cash for a contact you have not met at a CMS office you can identify.

## Common questions

### Is this a Chennai-only job?

No. The note says the work is across Tamil Nadu, and it names Chennai along with Coimbatore, Madurai, Trichy, Salem, Tirunelveli, Vellore, Erode, Thanjavur, and other districts. It does not print a street or a branch.

### What are the hours?

The note lists 10:00 AM – 2:00 PM, Saturday and Sunday availability, and flexible availability based on assignments. Confirm which of those applies to you.

### What is the salary?

₹10,000 – ₹30,000 per month, depending on working hours, assignments, and eligibility. The note does not say how that band is calculated.

### What do I need?

Own bike, a valid driving licence, a smartphone, and an Aadhaar card. The note also asks for people who want part-time work, can travel to assigned locations, and are responsible and punctual.

### How do I apply?

The note prints HR contact ${PHONE_PRINTED}. That is nine digits, so this page does not turn it into a call or WhatsApp link. Confirm the full number, and check [cms.com/careers](${EMPLOYER_SITE}), before you share documents or handle cash.
`.trim();

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
        ilike(jobPostings.body, `%${PHONE_PRINTED}%`),
        ilike(jobPostings.title, "%cash collection%CMS%"),
        eq(jobPostings.slug, JOB_SLUG),
      ),
    );

  const other = matches.filter((row) => row.slug !== JOB_SLUG);
  if (other.length > 0) {
    console.log("[seed-job] Same phone or role already on another listing. Skipping.");
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
      .set({
        name: EMPLOYER_NAME,
        websiteUrl: EMPLOYER_SITE,
        verified: false,
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer refreshed:", EMPLOYER_SLUG);
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
    .where(and(eq(jobPostings.cityId, city.id), eq(jobPostings.slug, JOB_SLUG)))
    .limit(1);

  const now = new Date();
  const validThrough = new Date(now);
  validThrough.setDate(validThrough.getDate() + 90);

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Part-time cash collection executive · CMS Info Systems · Tamil Nadu",
    body,
    locationLabel: "Across Tamil Nadu, including Chennai",
    status: "open" as const,
    employmentType: "PART_TIME" as const,
    validThrough,
    applicationUrl: EMPLOYER_SITE,
    salaryDisclosed: true,
    salaryMin: 10_000,
    salaryMax: 30_000,
    openingsCount: 1,
    remotePolicy: "field" as const,
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
  await finishListingSeedLive({
    jobSlug: JOB_SLUG,
    label: "seed-cms-cash-collection",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
