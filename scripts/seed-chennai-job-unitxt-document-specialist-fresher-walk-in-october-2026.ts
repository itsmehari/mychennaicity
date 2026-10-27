/**
 * UniTxt — Document Specialist (freshers) · F2F walk-in drive 3 Oct 2026 · Chennai.
 * Source: hiring note supplied 30 Sep 2026 (emails rashmi@unitxt.net, lokamatha.u@unitxt.net).
 * No salary, venue street address, or shift timings were stated — do not invent them.
 *
 * Dev:  `npm run db:seed:chennai-job:unitxt-document-specialist`
 * Live: `npm run db:seed:chennai-job:unitxt-document-specialist:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import { finishListingSeedLive, istToUtcDate } from "./lib/seed-event-shared";
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

const EMPLOYER_SLUG = "unitxt-pro-chennai";
const EMPLOYER_NAME = "UniTxt";
const EMPLOYER_SITE = "https://unitxt.net";
const JOB_SLUG =
  "unitxt-document-specialist-fresher-f2f-walk-in-chennai-october-2026";
const EMAIL_PRIMARY = "rashmi@unitxt.net";
const EMAIL_SECONDARY = "lokamatha.u@unitxt.net";
const MAILTO = `mailto:${EMAIL_PRIMARY},${EMAIL_SECONDARY}?subject=${encodeURIComponent(
  "Document Specialist — F2F walk-in (MyChennaiCity)",
)}&body=${encodeURIComponent(
  "Hi,\n\nI am interested in the Document Specialist fresher role and the F2F walk-in drive on 3 October 2026. Please find my profile attached.\n\nI saw the opening on MyChennaiCity.\n",
)}`;

const BODY = `
**UniTxt** is running a **face-to-face (F2F) walk-in drive** in **Chennai** for **freshers** for the **Document Specialist** role.

This page is compiled from the employer’s hiring note. Confirm drive venue, reporting time, and documents with the contacts below before you travel. Company site: [${EMPLOYER_SITE.replace("https://", "")}](${EMPLOYER_SITE}).

## Role at a glance

- **Position:** Document Specialist
- **Location:** Chennai
- **Who they want:** Freshers
- **Employment:** Contract role — duration **up to May 2027**
- **Expected onboarding:** November 2026
- **Drive:** F2F walk-in — **3 October 2026**

Salary, exact office address, and walk-in reporting time were **not** stated in the note — ask UniTxt when you email your profile.

## How to apply for the F2F drive

Share your **profile / resume** by email (both addresses):

- **[${EMAIL_PRIMARY}](mailto:${EMAIL_PRIMARY})**
- **[${EMAIL_SECONDARY}](mailto:${EMAIL_SECONDARY})**

Or use the apply button on this page to open a pre-filled message to both.

Mention that you saw the opening on MyChennaiCity jobs.

**Safety note:** Do **not** pay any upfront “registration” or “training” fee for a standard job interview. This listing does not print a salary — confirm pay and contract terms with UniTxt before you accept.

This is a community listing, not UniTxt’s official careers page.
`.trim();

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
        name: EMPLOYER_NAME,
        websiteUrl: EMPLOYER_SITE,
        verified: false,
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: EMPLOYER_NAME,
        slug: EMPLOYER_SLUG,
        websiteUrl: EMPLOYER_SITE,
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
  // Keep the listing open through the walk-in day (3 Oct 2026 IST).
  const validThrough = istToUtcDate(2026, 10, 3, 23, 59);

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Document Specialist (Fresher) — UniTxt F2F walk-in · Chennai · 3 Oct 2026",
    body: BODY,
    locationLabel: "Chennai · F2F walk-in 3 Oct 2026",
    status: "open" as const,
    employmentType: "CONTRACTOR",
    validThrough,
    applicationUrl: MAILTO,
    salaryDisclosed: false,
    salaryMin: null,
    salaryMax: null,
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
      publishedAt: now,
      createdAt: now,
    });
    console.log("[seed-job] Inserted open job:", JOB_SLUG);
  }

  console.log("[seed-job] Done. Detail:", `/chennai-jobs/${JOB_SLUG}`);
  await finishListingSeedLive({
    jobSlug: JOB_SLUG,
    label: "seed-job-unitxt-document-specialist",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
