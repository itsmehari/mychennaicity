/**
 * Marketing Executive — North Chennai modular OEM market.
 * Poster (5 Nov 2026): promote products in that market, develop business,
 * maintain client relationships, and hit sales and growth targets.
 * Requirements: communication and negotiation; B2B sales / marketing
 * experience preferred; self-motivated and result driven.
 * Contact 9092988900. Company, product name, street, pay, hours, job type,
 * and vacancy count are not printed. The poster photo is not a gender rule.
 * English only.
 *
 * Flyer: `public/images/listings/marketing-executive-north-chennai-modular-oem-2026.png`
 *
 * Dev:  `npm run db:seed:chennai-job:marketing-executive-north-chennai-modular-oem`
 * Live: `npm run db:seed:chennai-job:marketing-executive-north-chennai-modular-oem:live`
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

const EMPLOYER_SLUG = "marketing-executive-north-chennai-modular-oem-note";
const EMPLOYER_NAME = "Hiring note, North Chennai";
const JOB_SLUG = "marketing-executive-north-chennai-modular-oem";
const FLYER =
  "/images/listings/marketing-executive-north-chennai-modular-oem-2026.png";
const PHONE_DISPLAY = "9092988900";
const TEL = "tel:+919092988900";

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
        ilike(jobPostings.body, "%9092988900%"),
        ilike(jobPostings.body, "%90929 88900%"),
        ilike(jobPostings.applicationUrl, "%919092988900%"),
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
  // 30 days from 5 Nov 2026. Last moment of 5 Dec 2026 IST.
  const validThrough = new Date("2026-12-05T23:59:59+05:30");
  const stillOpen = validThrough.getTime() > now.getTime();

  const body = `
A hiring poster is looking for a **Marketing Executive** for the **North Chennai modular OEM market**. The poster does not name the company, the product, or a street.

![Hiring poster — Marketing Executive for the North Chennai modular OEM market](${FLYER})

## Role

- **Position:** Marketing Executive
- **Market:** North Chennai modular OEM market
- **Contact:** [${PHONE_DISPLAY}](${TEL})

The poster does not name hours, full-time or contract, pay, or how many seats are open. The photograph on the poster is not a gender rule.

## What the role covers

1. **Promote products** in the North Chennai modular OEM market.
2. **Develop new business** and maintain client relationships.
3. **Achieve sales and growth targets.**

## What they ask for

- Good communication and negotiation skills
- Experience in B2B sales / marketing (preferred)
- Self-motivated and result driven

## Pay

Pay is **not stated** on the poster.

## How to apply

Call **[${PHONE_DISPLAY}](${TEL})**.

Say you are applying for the Marketing Executive role for the North Chennai modular OEM market, and that you saw it on MyChennaiCity.

This page is compiled from the hiring poster. Confirm the company, the product, the territory, and the pay before you join.

## Common questions

### Where is the job?

North Chennai, for the modular OEM market. No company name, product name, or street was printed.

### Who can apply?

The poster asks for good communication and negotiation skills, and for someone self-motivated and result driven. Experience in B2B sales or marketing is preferred. No degree, age, or years of experience were printed.

### What is the pay?

The poster does not print a salary.

### How do I apply?

Call ${PHONE_DISPLAY}.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Marketing Executive — North Chennai modular OEM market",
    body,
    locationLabel: "North Chennai",
    status: (stillOpen ? "open" : "closed") as "open" | "closed",
    employmentType: null,
    validThrough,
    applicationUrl: TEL,
    salaryDisclosed: false,
    salaryMin: null,
    salaryMax: null,
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
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
