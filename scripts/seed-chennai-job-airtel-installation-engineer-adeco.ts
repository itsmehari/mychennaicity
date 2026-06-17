/**
 * Installation Engineer & Assistance Engineer (Wireman) — Airtel via ADECO, Chennai & TN.
 *
 * Dev:  `npm run db:seed:chennai-job:airtel-installation-engineer-adeco`
 * Live: `npm run db:seed:chennai-job:airtel-installation-engineer-adeco:live` — uses `.env.production.local`
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

const EMPLOYER_SLUG = "airtel-adeco-chennai";
const JOB_SLUG =
  "installation-assistance-engineer-airtel-adeco-chennai-tamil-nadu";

const PHONE_DISPLAY = "8190857335";
const WA_APPLY = `https://wa.me/918190857335?text=${encodeURIComponent(
  "Hi Dheena, I saw the Airtel Installation / Assistance Engineer opening on MyChennaiCity and would like to apply.",
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
        name: "Airtel · ADECO",
        websiteUrl: "https://www.airtel.in",
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed name:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "Airtel · ADECO",
        slug: EMPLOYER_SLUG,
        websiteUrl: "https://www.airtel.in",
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
**Airtel** (via **ADECO**) is hiring field engineers across **Chennai and all Tamil Nadu**.

## Open roles
- **Installation Engineer**
- **Assistance Engineer (Wireman)**

## Location
**Chennai** and **all-over Tamil Nadu** — confirm your posting with HR.

## Eligibility
- **Freshers welcome**
- **Driving licence is mandatory**
- Candidates looking for a **long-term career**

## Qualification
10th / 12th / ITI / Diploma / Engineering / any degree

## Role highlights
- **Full-time** employment
- Stable, structured work environment
- **Paid training from Day 1**
- **Immediate joining**
- Career growth opportunities

## How to apply
Contact **Dheena (HR)** on WhatsApp: **[${PHONE_DISPLAY}](${WA_APPLY})**

Mention that you saw the opening on MyChennaiCity jobs.

**Safety note:** Do **not** pay any upfront “registration” or “security” fee to third parties — verify that you are dealing with the real hiring contact.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Installation & Assistance Engineer (Wireman) — Airtel · ADECO (Chennai & TN)",
    body,
    locationLabel: "Chennai & all Tamil Nadu",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: WA_APPLY,
    salaryDisclosed: false,
    openingsCount: 2,
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
