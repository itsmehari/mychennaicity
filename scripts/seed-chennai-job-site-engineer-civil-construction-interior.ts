/**
 * Site Engineer — Civil (construction & interior projects, Chennai).
 * Source note (30 Oct 2026): Diploma or B.E. Civil; 4–5 years minimum;
 * construction and interior project experience; mail harimeetme@gmail.com;
 * company name and street unstated; salary unstated; English only.
 * Same note on https://mynanganallur.in/jobs/site-engineer-civil-construction-interior-chennai
 *
 * Dev:  `npm run db:seed:chennai-job:site-engineer-civil-construction-interior`
 * Live: `npm run db:seed:chennai-job:site-engineer-civil-construction-interior:live`
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

const EMPLOYER_SLUG = "chennai-construction-interior-employer";
const EMPLOYER_NAME = "Construction & interior employer, Chennai";
const JOB_SLUG = "site-engineer-civil-construction-interior-chennai";
const EMAIL = "harimeetme@gmail.com";
const SISTER =
  "https://mynanganallur.in/jobs/site-engineer-civil-construction-interior-chennai";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Application — Site Engineer (Civil), Chennai",
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
        ilike(jobPostings.body, `%${EMAIL}%`),
        ilike(jobPostings.applicationUrl, `%${EMAIL}%`),
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
An employer in **Chennai** is hiring an experienced **Site Engineer — Civil** for **construction and interior projects**. The note does not name the company or a site street. The same listing is on [MyNanganallur](${SISTER}).

## Role

**Site Engineer — Civil**

## Experience

**4–5 years** minimum experience, as printed. The note also says **4–5+ years**.

## Industry

**Construction and interior projects**

## Qualification

- **Diploma** or **B.E.** in Civil Engineering

## Skills named in the note

- Experience in construction and interior projects
- Good knowledge of site execution, supervision, measurements, and quality control
- Ability to coordinate with contractors, workers, and project teams
- Strong communication and site-management skills

## Location

**Chennai**. No area or site address was printed.

## Pay

Salary is **not stated** in the note.

## Preference

**Immediate joiners** and candidates with **relevant site experience** will be preferred.

## How to apply

Email your **updated CV** with your **contact details** to **[${EMAIL}](mailto:${EMAIL})**.

Use the **Email your CV** button on this page, or mail **[${EMAIL}](${MAILTO})**. Say you are applying for the Site Engineer — Civil role in Chennai, and that you saw it on MyChennaiCity.

This page is compiled from the hiring note. It is not the employer’s own careers page. Confirm the company name, site, pay, and reporting location before you join.`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Site Engineer — Civil (construction & interior), Chennai",
    body,
    locationLabel: "Chennai",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    applicationUrl: MAILTO,
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
