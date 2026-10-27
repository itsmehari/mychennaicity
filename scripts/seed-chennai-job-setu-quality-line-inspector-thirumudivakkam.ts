/**
 * Quality Line Inspector — SETU Talent Solutions, Thirumudivakkam.
 * Poster (23 Oct 2026): Diploma or B.E.; 1–2 years; ₹24,000 per month;
 * 12 hours (8 regular + 4 OT); day and night shifts. Factory name, street,
 * and vacancy count are not printed. English only.
 *
 * Flyer: `public/images/listings/setu-talent-quality-line-inspector-thirumudivakkam-2026.png`
 *
 * Dev:  `npm run db:seed:chennai-job:setu-quality-line-inspector`
 * Live: `npm run db:seed:chennai-job:setu-quality-line-inspector:live`
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

const EMPLOYER_SLUG = "setu-talent-solutions";
const EMPLOYER_NAME = "SETU Talent Solutions";
const JOB_SLUG = "quality-line-inspector-setu-talent-thirumudivakkam";
const FLYER =
  "/images/listings/setu-talent-quality-line-inspector-thirumudivakkam-2026.png";
const PHONE_DISPLAY = "81228 78264";
const EMAIL = "setutalentsolutions@gmail.com";

function waApply(text: string) {
  return `https://wa.me/918122878264?text=${encodeURIComponent(text)}`;
}

const body = `
**SETU Talent Solutions** is hiring a **Quality Line Inspector** in **Thirumudivakkam, Chennai**. The poster marks it urgent. Diploma or B.E. holders with **1–2 years** in quality inspection can apply. Pay printed on the poster is **₹24,000 per month**. Shifts are **day and night**. Share an updated CV on WhatsApp **${PHONE_DISPLAY}** or by email at **${EMAIL}**.

SETU prints itself as a talent partner. The factory name, a street, and a vacancy count are not on the poster.

![SETU Talent Solutions poster — Quality Line Inspector, Thirumudivakkam, Chennai](${FLYER})

## Role at a glance

- **Position:** Quality Line Inspector
- **Location:** Thirumudivakkam, Chennai
- **Qualification:** Diploma or B.E.
- **Experience:** 1–2 years in quality inspection
- **Salary:** ₹24,000 per month
- **Working hours:** 12 hours (8 hours regular duty + 4 hours OT), as printed
- **Shifts:** Day and night
- **Hiring poster:** SETU Talent Solutions

## What the role covers

1. **In-process quality inspection** — inspect products during production to the quality standard.
2. **Measuring instruments and inspection** — use measuring instruments to check dimensions and specifications.
3. **Defect identification and rejection control** — identify defects and control rejected products.
4. **Production line monitoring** — monitor the line and keep quality in line with the process.
5. **Documentation and reporting** — keep inspection records and prepare quality reports.
6. **Quality coordination** — work with the production team to close quality issues.

## What they ask for

- Diploma or B.E.
- 1–2 years of relevant experience in quality inspection
- Knowledge of measuring instruments and quality checking methods
- Willingness to work day and night shifts

## How to apply

WhatsApp an updated CV to **[${PHONE_DISPLAY}](https://wa.me/918122878264)** or email **[${EMAIL}](mailto:${EMAIL})**. Say you are applying for the Quality Line Inspector role in Thirumudivakkam, and that you saw it on MyChennaiCity.

The poster does not say whether the ₹24,000 figure already includes the overtime hours.

This page is compiled from the SETU Talent Solutions poster. It is not a SETU careers page.

## Common questions

### Who can apply for the Quality Line Inspector job in Thirumudivakkam?

Diploma or B.E. holders with 1–2 years in quality inspection, who know measuring instruments and quality checks, and who can work day and night shifts.

### What is the salary and the shift?

The poster prints ₹24,000 per month. Working hours are 12 hours: 8 hours regular duty and 4 hours OT. Shifts are day and night.

### Who is hiring, and where?

SETU Talent Solutions, for a quality line in Thirumudivakkam, Chennai. The poster does not name the factory or a door number.

### How do I apply?

WhatsApp ${PHONE_DISPLAY} or email ${EMAIL} with an updated CV. Mention the Quality Line Inspector opening in Thirumudivakkam.
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
        ilike(jobPostings.body, "%8122878264%"),
        ilike(jobPostings.body, "%81228 78264%"),
        ilike(jobPostings.body, "%setutalentsolutions@gmail.com%"),
        ilike(jobPostings.applicationUrl, "%918122878264%"),
      ),
    );

  const other = matches.filter((row) => row.slug !== JOB_SLUG);
  if (other.length > 0) {
    console.log("[seed-job] Same phone or email already on another listing. Skipping.");
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

  const [existingEmp] = await db
    .select({ id: employers.id })
    .from(employers)
    .where(eq(employers.slug, EMPLOYER_SLUG))
    .limit(1);

  let employerId: string;
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

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Quality Line Inspector, Thirumudivakkam",
    body,
    locationLabel: "Thirumudivakkam, Chennai",
    status: "open" as const,
    employmentType: null,
    validThrough,
    applicationUrl: waApply(
      "Hello, I am applying for the Quality Line Inspector role in Thirumudivakkam with SETU Talent Solutions. I saw the opening on MyChennaiCity. Updated CV attached.",
    ),
    salaryDisclosed: true,
    salaryMin: 24000,
    salaryMax: 24000,
    openingsCount: 1,
    remotePolicy: "onsite" as const,
    updatedAt: now,
  };

  if (existingJob) {
    await db.update(jobPostings).set(values).where(eq(jobPostings.id, existingJob.id));
    console.log("[seed-job] Refreshed open job:", JOB_SLUG);
  } else {
    await db.insert(jobPostings).values({
      ...values,
      publishedAt: now,
      createdAt: now,
    });
    console.log("[seed-job] Inserted open job:", JOB_SLUG);
  }

  console.log("[seed-job] EN:", `/chennai-jobs/${JOB_SLUG}`);
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
