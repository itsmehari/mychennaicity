/**
 * Installation Engineer / Technician — top telecom company (urgent walk-in; Tamil Nadu).
 *
 * Dev:  `npm run db:seed:chennai-job:top-telecom-installation-engineer`
 * Live: `npm run db:seed:chennai-job:top-telecom-installation-engineer:live` — uses `.env.production.local`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
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

const EMPLOYER_SLUG = "top-telecom-company-tamil-nadu";
const JOB_SLUG =
  "installation-engineer-technician-top-telecom-chennai-tamil-nadu";

const WA_DISPLAY = "8190857335";
const WA_APPLY = `https://wa.me/918190857335?text=${encodeURIComponent(
  "Hi, I saw the Installation Engineer / Technician opening (top telecom company) on MyChennaiCity and would like to apply. Please find my resume attached.",
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
        name: "Top telecom company — Tamil Nadu",
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed name:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "Top telecom company — Tamil Nadu",
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
    .where(
      and(eq(jobPostings.cityId, city.id), eq(jobPostings.slug, JOB_SLUG)),
    )
    .limit(1);

  const now = new Date();
  const validThrough = new Date(now);
  validThrough.setDate(validThrough.getDate() + 90);

  const body = `
A **top telecom company** is hiring **installation engineers / technicians** across **Chennai and all Tamil Nadu districts**. **Urgent walk-in interviews** — **freshers welcome**.

## Role at a glance
- **Salary:** ₹17,000 – ₹25,000 per month (confirm exact band with HR)
- **Employment:** Permanent role · **immediate joining**
- **Training:** On-the-job training provided
- **Fees:** No security deposit or hidden charges (zero fees)

## Eligibility
- **Education:** 12th / ITI / Diploma / any degree
- **Age:** 18 to 33 years
- **Experience:** Freshers OK

## Documents to carry
- Aadhaar card
- PAN card
- Driving licence
- Education certificates

## Work location
**Chennai and all districts across Tamil Nadu** — confirm your posting with HR.

## Benefits
- PF, ESI, and insurance
- Monthly salary with timely payments
- Career growth and stable employment

## How to apply
Send your **resume on WhatsApp** to HR: **[${WA_DISPLAY}](${WA_APPLY})**

Mention that you saw the opening on MyChennaiCity jobs.

**Safety note:** This listing states **zero fees** — do **not** pay any third-party “registration” or “security” deposit. Verify you are dealing with the real HR contact.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Installation Engineer / Technician — top telecom (urgent walk-in · Chennai & TN)",
    body,
    locationLabel: "Chennai & all Tamil Nadu districts",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: WA_APPLY,
    salaryDisclosed: true,
    salaryMin: 17_000,
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
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
