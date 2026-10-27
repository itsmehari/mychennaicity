/**
 * Ayusya Health Care — part-time office assistant, Chennai.
 * Flyer from JobBaskets. Apply URL in the note was truncated.
 *
 * Flyer: `public/images/listings/ayusya-health-care-office-assistant-chennai-2026.png`
 *
 * Dev:  `npm run db:seed:chennai-job:ayusya-office-assistant`
 * Live: `npm run db:seed:chennai-job:ayusya-office-assistant:live`
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

const EMPLOYER_SLUG = "ayusya-health-care";
const JOB_SLUG = "ayusya-health-care-office-assistant-chennai";
const FLYER_IMAGE =
  "/images/listings/ayusya-health-care-office-assistant-chennai-2026.png";
const APPLY_URL = "https://www.jobbaskets.com";

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
        ilike(jobPostings.title, "%Ayusya Health Care%Office Assistant%"),
        ilike(jobPostings.body, "%c6c3fe4a-0dcf-4c72-9131%"),
        and(
          ilike(jobPostings.body, "%Ayusya Health Care%"),
          ilike(jobPostings.body, "%Office Assistant%"),
        ),
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
      .set({ name: "Ayusya Health Care", updatedAt: new Date() })
      .where(eq(employers.id, employerId));
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "Ayusya Health Care",
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
**Ayusya Health Care** is hiring an **office assistant** in **Chennai**. The notice comes through **JobBaskets** (“Our client is hiring”).

![JobBaskets poster — Ayusya Health Care office assistant, Chennai, part-time, 2–4 years](${FLYER_IMAGE})

## Role
- **Position:** Office assistant
- **Location:** Chennai, onsite
- **Type:** Part-time
- **Experience:** 2–4 years
- **Skills:** Data entry, MS Office, communication, record management, time management

## Pay
The note lists **₹8,000–₹12,000** and does not say per hour or per month. The poster prints **₹8,000–₹12,000 /hour**. Confirm the pay period with JobBaskets before you rely on either line. This page does not publish one salary band.

## How to apply
Apply on **[JobBaskets](${APPLY_URL})**. The poster’s QR code opens the JobBaskets Android app. The shared job link was cut off after \`c6c3fe4a-0dcf-4c72-9131\`, so this page does not guess the rest of that address.

No phone or email is printed on this notice.

Mention that you saw the opening on MyChennaiCity jobs.

This page is compiled from the hiring note and the JobBaskets poster. It is not an Ayusya careers page.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Office assistant (part-time) — Ayusya Health Care, Chennai",
    body,
    locationLabel: "Chennai",
    status: "open" as const,
    employmentType: "PART_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: APPLY_URL,
    salaryDisclosed: false,
    openingsCount: 1,
    remotePolicy: "onsite" as const,
    updatedAt: now,
  };

  if (existingJob) {
    await db.update(jobPostings).set(values).where(eq(jobPostings.id, existingJob.id));
    console.log("[seed-job] Refreshed open job:", JOB_SLUG);
  } else {
    await db.insert(jobPostings).values({ ...values, createdAt: now });
    console.log("[seed-job] Inserted open job:", JOB_SLUG);
  }

  console.log("[seed-job] Done. Detail:", `/chennai-jobs/${JOB_SLUG}`);
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
