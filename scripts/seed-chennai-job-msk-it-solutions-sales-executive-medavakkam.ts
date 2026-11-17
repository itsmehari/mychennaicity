/**
 * MSK IT Solutions / MSK Infotech — Sales Executive, retail laptop showroom · Medavakkam.
 * Flyer: `public/images/listings/msk-it-solutions-sales-executive-medavakkam-2026.jpg`
 *
 * Dev:  `npm run db:seed:chennai-job:msk-it-solutions-sales-executive-medavakkam`
 * Live: `npm run db:seed:chennai-job:msk-it-solutions-sales-executive-medavakkam:live`
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

const EMPLOYER_SLUG = "msk-it-solutions-medavakkam";
const EMPLOYER_NAME = "MSK IT Solutions (MSK Infotech)";
const JOB_SLUG = "sales-executive-retail-laptop-showroom-msk-medavakkam-2026";
const PHONE = "9940318771";
const PHONE_DISPLAY = "99403 18771";
const FLYER = "/images/listings/msk-it-solutions-sales-executive-medavakkam-2026.jpg";
const WA_APPLY = `https://wa.me/91${PHONE}?text=${encodeURIComponent(
  "Hi, I saw the Sales Executive role at MSK IT Solutions (retail laptop showroom), Medavakkam, on MyChennaiCity jobs. I am sharing my CV.",
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
        ilike(jobPostings.body, "%99403 18771%"),
        ilike(jobPostings.body, "%MSK IT%"),
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
  validThrough.setDate(validThrough.getDate() + 60);

  const body = `
![Hiring flyer — Sales Executive, MSK IT Solutions retail laptop showroom, Medavakkam](${FLYER})

**MSK IT Solutions** (branded **MSK Infotech** — *Retail Laptop Showroom & Service*) is hiring a **Sales Executive** for its **retail laptop showroom** in **Medavakkam, Chennai**.

## Role at a glance

| | |
| --- | --- |
| **Role** | Sales Executive — retail laptop showroom |
| **Education** | Any degree (as on flyer) |
| **Experience** | **1 year and above** in **store sales** |
| **Location** | **Medavakkam**, Chennai |
| **Pay** | **₹25,000 per month** plus **incentives** (as printed) |

The flyer does not name a street address, shift timing, or gender preference. Confirm showroom timing, target, and incentive structure before you join.

## What they want

- Store-floor **laptop retail sales** experience (1+ year)
- Degree holder (any discipline, per flyer)

## How to apply

**Share your CV on WhatsApp:** **[${PHONE_DISPLAY}](${WA_APPLY})**

Mention that you saw the opening on **MyChennaiCity jobs**. Do not pay registration fees to third parties — verify you are dealing with MSK IT Solutions / MSK Infotech.

This page is compiled from the hiring flyer. It is not the employer’s own careers page.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Sales Executive — retail laptop showroom · MSK IT Solutions, Medavakkam",
    body,
    locationLabel: "Medavakkam, Chennai",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    applicationUrl: WA_APPLY,
    salaryDisclosed: true,
    salaryMin: 25_000,
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
    label: "seed-msk-it-solutions-sales-executive-medavakkam",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});