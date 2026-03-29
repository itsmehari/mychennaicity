/**
 * Idempotent sample open job(s) for Chennai — staging / demos / Rich Results QA.
 *
 * Dev:  `npm run db:seed:chennai-jobs`
 * Live: `npm run db:seed:chennai-jobs:live` — uses `.env.production.local`
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

const EMPLOYER_SLUG = "mychennaicity-demo-studio";
const JOB_SLUG = "content-editor-tamil-english-chennai-demo";

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
      .set({ verified: true, updatedAt: new Date() })
      .where(eq(employers.id, employerId));
    console.log("[seed-jobs] Employer exists, marked verified:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "mychennaicity.in Demo Studio",
        slug: EMPLOYER_SLUG,
        websiteUrl: "https://mychennaicity.in",
        verified: true,
      })
      .returning({ id: employers.id });
    employerId = ins.id;
    console.log("[seed-jobs] Inserted employer:", EMPLOYER_SLUG);
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

  const body = `## Role
Editorial pilot for **Tamil and English** Chennai local coverage — desk production, headline clarity, and partner coordination.

## You
- Strong written Tamil and English; newsroom or digital desk experience.
- Comfort with civic, mobility, and economy beats in Chennai.

## Apply
Use the official application link on this listing (employer careers or form). **Do not** pay any third-party “registration” fee.`;

  if (existingJob) {
    await db
      .update(jobPostings)
      .set({
        title: "Content editor — Tamil & English (Chennai desk)",
        body,
        locationLabel: "Chennai",
        status: "open",
        employmentType: "FULL_TIME",
        validThrough,
        publishedAt: now,
        applicationUrl: "https://mychennaicity.in/contact",
        salaryDisclosed: false,
        updatedAt: now,
      })
      .where(eq(jobPostings.id, existingJob.id));
    console.log("[seed-jobs] Refreshed open job:", JOB_SLUG);
  } else {
    await db.insert(jobPostings).values({
      employerId,
      cityId: city.id,
      slug: JOB_SLUG,
      title: "Content editor — Tamil & English (Chennai desk)",
      body,
      locationLabel: "Chennai",
      status: "open",
      employmentType: "FULL_TIME",
      validThrough,
      publishedAt: now,
      applicationUrl: "https://mychennaicity.in/contact",
      salaryDisclosed: false,
    });
    console.log("[seed-jobs] Inserted open job:", JOB_SLUG);
  }

  console.log("[seed-jobs] Done. Hub:", "/chennai-jobs");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
