/**
 * Talent Acquisition Lead — GDT Solution, RS Puram, Coimbatore.
 *
 * Dev:  `npm run db:seed:chennai-job:gdt-talent-acquisition-lead`
 * Live: `npm run db:seed:chennai-job:gdt-talent-acquisition-lead:live` — uses `.env.production.local`
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

const EMPLOYER_SLUG = "gdt-solution-coimbatore";
const JOB_SLUG = "talent-acquisition-lead-gdt-solution-coimbatore";

const PHONE_APPLY = "tel:+918925807428";
const EMAIL_APPLY = "mailto:muthu.rajalakshmi@gdtsolution.com";

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
        name: "GDT Solution · Coimbatore",
        websiteUrl: "https://gdtsolution.com",
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed name:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "GDT Solution · Coimbatore",
        slug: EMPLOYER_SLUG,
        websiteUrl: "https://gdtsolution.com",
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
**GDT Solution** is hiring a **Talent Acquisition Lead** at **RS Puram, Coimbatore**.

## Role at a glance
- **Title:** Talent Acquisition Lead
- **Experience:** 7 to 10 years
- **Location:** RS Puram, Coimbatore
- **Preference:** Male candidates preferred

## Qualifications
- **5 years** of experience in full-cycle recruitment, with at least **4 years** in a team leadership or supervisory role within the recruitment industry
- Proven track record of successfully leading and managing a recruitment team to achieve hiring goals
- In-depth understanding of various recruitment methodologies, sourcing techniques, and candidate assessment tools
- Proficiency in Applicant Tracking Systems (ATS) and other recruitment software (e.g., CRM, LinkedIn Recruiter)
- Excellent communication, interpersonal, and negotiation skills
- Demonstrated ability to build strong relationships and influence stakeholders at all levels

## How to apply
Interested candidates may contact **Ms. Muthu Rajalakshmi (HR)**:
- **Phone:** [8925807428](tel:+918925807428)
- **Email:** [muthu.rajalakshmi@gdtsolution.com](mailto:muthu.rajalakshmi@gdtsolution.com)

Mention that you saw the opening on MyChennaiCity jobs.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Talent Acquisition Lead — GDT Solution · RS Puram, Coimbatore",
    body,
    locationLabel: "RS Puram, Coimbatore",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: PHONE_APPLY,
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
  console.log("[seed-job] Apply email:", EMAIL_APPLY);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
