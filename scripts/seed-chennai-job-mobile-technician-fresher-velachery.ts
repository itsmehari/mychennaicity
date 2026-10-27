/**
 * Mobile Technician (fresher / trainee) — Velachery shop; work also listed for Taramani and Guindy.
 * Source: hiring note supplied 30 Sep 2026. Shop name and street address were not given.
 * Salary is “based on skills & experience” — do not invent a figure.
 *
 * Dev:  `npm run db:seed:chennai-job:mobile-technician-velachery`
 * Live: `npm run db:seed:chennai-job:mobile-technician-velachery:live`
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

const EMPLOYER_SLUG = "mobile-repair-shop-velachery-chennai";
const JOB_SLUG = "mobile-technician-fresher-velachery-taramani-guindy-chennai";
const PHONE_DISPLAY = "86105 95291";
const WA_APPLY = `https://wa.me/918610595291?text=${encodeURIComponent(
  "Hello, I am applying for the Mobile Technician (fresher) role. I saw the opening on MyChennaiCity.",
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
        name: "Mobile repair shop · Velachery, Chennai",
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "Mobile repair shop · Velachery, Chennai",
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
A mobile repair shop in **Velachery, Chennai** is hiring a **Mobile Technician**. Freshers and trainees are welcome. The note also lists **Taramani** and **Guindy** as work locations. The shop’s trading name and street address were not supplied.

## Role at a glance

- **Position:** Mobile Technician
- **Experience:** Fresher / trainee
- **Job type:** Full time, onsite
- **Salary:** Based on skills and experience (no fixed figure was stated)
- **Shop:** Velachery, Chennai

## Requirements

- Basic knowledge of mobile phones
- Interest in mobile repairing
- Willingness to learn
- Freshers can apply

## How to apply

Call or WhatsApp **${PHONE_DISPLAY}**. Mention that you saw the opening on MyChennaiCity jobs.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Mobile Technician (Fresher / Trainee) · Velachery, Taramani & Guindy, Chennai",
    body,
    locationLabel: "Velachery, Taramani, Guindy — Chennai",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    applicationUrl: WA_APPLY,
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
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
