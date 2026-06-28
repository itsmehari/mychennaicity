/**
 * Regional Student Enrollment Officer — Auxsyon Tech Pvt Ltd (TN & Puducherry).
 *
 * Dev:  `npm run db:seed:chennai-job:auxsyon-regional-student-enrollment-officer`
 * Live: `npm run db:seed:chennai-job:auxsyon-regional-student-enrollment-officer:live` — uses `.env.production.local`
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

const EMPLOYER_SLUG = "auxsyon-tech-pvt-ltd";
const JOB_SLUG = "regional-student-enrollment-officer-auxsyon-tn-puducherry";

const APPLY_URL = "https://forms.gle/tvMmQmdJk7Hj3eSh7";
const PROJECT_URL = "https://www.auxsyon.com/Auxsyonedu.php";

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
        name: "Auxsyon Tech Pvt Ltd",
        websiteUrl: PROJECT_URL,
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed name:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "Auxsyon Tech Pvt Ltd",
        slug: EMPLOYER_SLUG,
        websiteUrl: PROJECT_URL,
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
**Auxsyon Tech Pvt Ltd** is hiring **Regional Student Enrollment Officers** across **Tamil Nadu** and **Puducherry** to support student enrollment for ongoing education projects.

## Role at a glance
- **Title:** Regional Student Enrollment Officer
- **Location:** Tamil Nadu & Puducherry — **work in your own district**
- **Salary:** Negotiable

## Eligibility
- Experience in **school tie-ups**, **educational outreach**, or **student enrollment** activities
- Strong **communication** and **relationship-building** skills
- Ability to work **independently** within your assigned district

## Key responsibilities
- Coordinate with **schools and educational institutions** in your district
- **Enroll students** for ongoing projects
- **Build, lead, and manage** a local enrollment team
- Achieve **student enrollment targets** and ensure smooth execution of project activities

## Preferred candidates
Individuals with prior experience in **school partnerships**, **admissions**, **educational marketing**, or **student mobilization**.

## How to apply
**[Apply online (Google Form)](${APPLY_URL})**

Project background: [auxsyon.com](${PROJECT_URL})

Mention that you saw the opening on MyChennaiCity jobs.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Regional Student Enrollment Officer — Auxsyon Tech · Tamil Nadu & Puducherry (your district)",
    body,
    locationLabel: "Tamil Nadu & Puducherry (your district)",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: APPLY_URL,
    salaryDisclosed: false,
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
  console.log("[seed-job] Apply:", APPLY_URL);
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
