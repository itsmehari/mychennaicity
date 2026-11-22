/**
 * Office Assistant — Royapettah, Chennai (unnamed employer; contact Joseph).
 * 2 seats; any degree; min 2 years; age 22–30; English; two-wheeler;
 * ₹26,000 take-home + PF + insurance + leave bonus. Call 7338877528.
 *
 * Dev:  `npm run db:seed:chennai-job:office-assistant-royapettah`
 * Live: `npm run db:seed:chennai-job:office-assistant-royapettah:live`
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

const EMPLOYER_SLUG = "chennai-employer-royapettah";
const EMPLOYER_NAME = "Chennai employer · Royapettah";
const JOB_SLUG = "office-assistant-royapettah-chennai-november-2026";
const PHONE = "7338877528";
const PHONE_DISPLAY = "73388 77528";
const CONTACT = "Joseph";
const CALL_APPLY = `tel:+91${PHONE}`;

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
        ilike(jobPostings.body, "%Office Assistant%Royapettah%"),
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

  const body = `
A hiring note asks for **Office Assistant** roles in **Royapettah, Chennai**. **2** positions. The note does not print a registered company name. The contact name is **${CONTACT}**.

## Role at a glance

| | |
| --- | --- |
| **Role** | Office Assistant |
| **Openings** | 2 |
| **Location** | Royapettah, Chennai |
| **Qualification** | Any degree |
| **Experience** | Minimum **2 years** as office assistant |
| **Age** | **22 to 30** (as printed) |
| **Pay** | **₹26,000 take-home** + PF + insurance + leave bonus |
| **Other** | Good English communication; own **two-wheeler** required |

Street address, hours, and exact employer name are not in the note. Confirm them on the call.

## How to apply

Call **${CONTACT}**: **[${PHONE_DISPLAY}](${CALL_APPLY})**.

Mention that you saw the opening on **MyChennaiCity jobs**.

**Safety note:** Do **not** pay any upfront “registration” or “security” fee to third parties — verify the workplace and package with ${CONTACT} before you join.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Office Assistant — Royapettah, Chennai",
    body,
    locationLabel: "Royapettah, Chennai",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    applicationUrl: CALL_APPLY,
    salaryDisclosed: true,
    salaryMin: 26_000,
    salaryMax: 26_000,
    salaryUnit: "MONTH",
    openingsCount: 2,
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
    label: "seed-chennai-job-office-assistant-royapettah",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
