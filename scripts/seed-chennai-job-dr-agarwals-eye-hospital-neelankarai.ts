/**
 * Dr. Agarwal's Eye Hospital — Neelankarai branch healthcare seats.
 *
 * Flyer: `public/images/listings/dr-agarwals-eye-hospital-neelankarai-hiring-november-2026.jpg`
 * Contact: Vishwa HR 6382374664 (phone icon → call apply) and vishwa.m@dragarwal.com.
 * Salary printed as "As per Market Standard" — not a rupee band.
 * One poster, several titles, one listing. schemaEligible false.
 *
 * Dev:  `npm run db:seed:chennai-job:dr-agarwals-eye-hospital-neelankarai`
 * Live: `npm run db:seed:chennai-job:dr-agarwals-eye-hospital-neelankarai:live`
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

const EMPLOYER_SLUG = "dr-agarwals-eye-hospital";
const EMPLOYER_NAME = "Dr. Agarwal's Eye Hospital";
const WEBSITE = "https://www.dragarwal.com/";
const JOB_SLUG =
  "healthcare-professionals-dr-agarwals-eye-hospital-neelankarai-november-2026";
const PHONE = "6382374664";
const PHONE_DISPLAY = "63823 74664";
const CALL_APPLY = `tel:+91${PHONE}`;
const EMAIL = "vishwa.m@dragarwal.com";
const MAIL_APPLY = `mailto:${EMAIL}`;
const FLYER_IMAGE =
  "/images/listings/dr-agarwals-eye-hospital-neelankarai-hiring-november-2026.jpg";

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
        ilike(jobPostings.body, `%${EMAIL}%`),
        eq(jobPostings.slug, JOB_SLUG),
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
      .set({
        name: EMPLOYER_NAME,
        websiteUrl: WEBSITE,
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
        websiteUrl: WEBSITE,
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
![Dr. Agarwal's Eye Hospital hiring flyer — Neelankarai branch healthcare seats](${FLYER_IMAGE})

**Dr. Agarwal's Eye Hospital** (*For Eyes. For Life.*, as printed) is hiring **Health Care Professionals** for the **Neelankarai Branch**. Street address, shift hours, and qualification lines are **not** printed. Confirm the branch address and which seat you want with **Vishwa HR** before you travel.

**Salary — As per Market Standard** (as printed). There is no rupee figure on the flyer, so the structured salary on this page stays undisclosed. Freshers and experienced candidates can apply. The flyer says **both male and female** can apply.

This is a community listing from the hospital’s flyer.

## Vacancy details (as printed)

| Role | Seats |
| --- | --- |
| **Staff Nurse** | 1 |
| **Optical Staffs** | 2 |
| **Receptionist** | 3 |
| **Patient Care Assistant** | 3 |
| **Optometry** | 1 |
| **OT Technician** | 1 |
| **Pharmacy** | 1 |

**12 seats** in all. Titles are quoted as on the flyer (**Optical Staffs**, **Optometry**, **Pharmacy**).

## Perks and benefits (as printed)

- **ON Roll Job**
- **PF & ESI**
- **Yearly Bonus**
- **Quarterly Performance Incentives**

## How to apply

**Vishwa HR**

- Call **[${PHONE_DISPLAY}](${CALL_APPLY})**
- Email **[${EMAIL}](${MAIL_APPLY})**

Mention that you saw the opening on **MyChennaiCity jobs**, and which seat you are applying for.

**Safety note:** Do **not** pay any upfront “registration” or “security” fee to third parties — verify that you are dealing with Vishwa HR on this flyer. “As per Market Standard” is not a fixed offer until the hospital confirms it in writing.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Health Care Professionals — Dr. Agarwal's Eye Hospital, Neelankarai",
    body,
    locationLabel: "Neelankarai Branch, Chennai (street not printed on flyer)",
    status: "open" as const,
    employmentType: null as string | null,
    validThrough,
    applicationUrl: CALL_APPLY,
    salaryDisclosed: false,
    salaryMin: null as number | null,
    salaryMax: null as number | null,
    salaryUnit: null as string | null,
    schemaEligible: false,
    openingsCount: 12,
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

  console.log("[seed-job] Done:", `/chennai-jobs/${JOB_SLUG}`);
  await finishListingSeedLive({
    jobSlug: JOB_SLUG,
    label: "seed-chennai-job-dr-agarwals-eye-hospital-neelankarai",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
