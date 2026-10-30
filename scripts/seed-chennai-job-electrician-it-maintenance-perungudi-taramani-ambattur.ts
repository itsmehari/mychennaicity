/**
 * Electrician — IT company maintenance.
 * Source note (28 Oct 2026): Perungudi, Taramani, Ambattur; full-time,
 * permanent; 8 hours, shift basis / rotational shifts; age 18–32;
 * 10th / ITI / Diploma; electrical / electrician preferred; freshers
 * and experienced; take-home ₹17,000–₹25,000+ per month; ESI, PF,
 * bonus, OT; company name, street, and vacancy count unstated;
 * contact 9551139825. English only.
 *
 * Dev:  `npm run db:seed:chennai-job:electrician-it-maintenance`
 * Live: `npm run db:seed:chennai-job:electrician-it-maintenance:live`
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

const EMPLOYER_SLUG = "it-company-maintenance-chennai";
const EMPLOYER_NAME = "IT company maintenance, Chennai";
const JOB_SLUG = "electrician-it-maintenance-perungudi-taramani-ambattur";
const PHONE_DISPLAY = "95511 39825";
const WA_APPLY = `https://wa.me/919551139825?text=${encodeURIComponent(
  "Hi, I saw the electrician — IT company maintenance opening (Perungudi, Taramani, Ambattur) on MyChennaiCity and would like to apply.",
)}`;

const body = `
A hiring note is looking for an **electrician** for **IT company maintenance** in **Perungudi**, **Taramani**, and **Ambattur**, Chennai. The company name, a street, and a vacancy count were not given. Call or WhatsApp **[${PHONE_DISPLAY}](tel:+919551139825)**.

## Role at a glance

- **Role:** Electrician — IT company maintenance
- **Place:** Perungudi, Taramani, Ambattur, Chennai (no door number was printed)
- **Employment:** Full-time, permanent
- **Hours:** 8 hours, shift basis. The note also asks for willingness to work in rotational shifts.
- **Pay named:** take-home ₹17,000 – ₹25,000+ per month
- **Benefits:** ESI, PF, bonus, overtime (OT), and full-time employment, as printed

The note does not say which of the three areas a candidate would be posted to, and it does not print shift start or end times.

## Job as printed

- Electrical maintenance of IT office / building facilities
- Attend electrical complaints and breakdowns
- Basic troubleshooting of electrical equipment and systems
- Preventive and routine maintenance
- Ensure electrical safety and proper functioning of equipment
- Support the maintenance team in day-to-day facility operations

## Who they want

- Age 18–32 years
- Education: 10th / ITI / Diploma
- Trade: electrical / electrician preferred
- Freshers and experienced candidates can apply
- Basic knowledge of electrical maintenance and troubleshooting
- Willingness to work in rotational shifts

## Pay

The note says **take-home salary ₹17,000 – ₹25,000+ per month**. This listing shows ₹17,000 to ₹25,000 as the monthly band. The printed plus sign is quoted here; it does not name a higher figure. Confirm take-home, overtime, and which of the three locations you would work at before you join.

## How to apply

Call or WhatsApp **[${PHONE_DISPLAY}](tel:+919551139825)**. Say you are applying for the electrician — IT company maintenance opening, and that you saw it on MyChennaiCity.

This page is compiled from the hiring note. It is not the company’s own careers page. The company name was not on the note.

## Common questions

### Where is the job?

Perungudi, Taramani, and Ambattur, Chennai. The note does not give a company name or a street, and it does not say which of the three areas you would be posted to.

### What are the hours?

8 hours, on a shift basis, with rotational shifts. Start and end times were not printed.

### What is the salary?

Take-home ₹17,000 to ₹25,000+ per month, as printed, plus ESI, PF, bonus, and overtime.

### Who can apply?

Age 18–32, with 10th, ITI, or Diploma. Electrical / electrician trade is preferred. Freshers and experienced candidates can apply.

### How do I apply?

Call or WhatsApp +91 ${PHONE_DISPLAY}.
`.trim();

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
        ilike(jobPostings.body, "%9551139825%"),
        ilike(jobPostings.body, "%95511 39825%"),
        ilike(jobPostings.applicationUrl, "%919551139825%"),
      ),
    );

  const other = matches.filter((row) => row.slug !== JOB_SLUG);
  if (other.length > 0) {
    console.log("[seed-job] Same phone already on another listing. Skipping.");
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

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Electrician — IT company maintenance, Perungudi, Taramani, Ambattur",
    body,
    locationLabel: "Perungudi, Taramani, Ambattur, Chennai",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
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
