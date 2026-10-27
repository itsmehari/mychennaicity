/**
 * Revyv — Salesperson for schools in Chennai (part-time + full-time).
 * Source: hiring flyer (Student Wellness & Preventive Behavioral Health).
 * Flyer prints PT ₹13,000 / FT ₹20,000 monthly; no phone, email, or apply URL.
 * Separate JobPosting slugs so each salary maps cleanly to schema.org pay.
 *
 * Flyer: `public/images/listings/revyv-salesperson-schools-chennai-hiring-2026.jpg`
 *
 * Dev:  `npm run db:seed:chennai-job:revyv-salesperson-schools`
 * Live: `npm run db:seed:chennai-job:revyv-salesperson-schools:live`
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

const EMPLOYER_SLUG = "revyv-chennai";
const EMPLOYER_NAME = "Revyv";
const APPLY_URL = "https://mychennaicity.in/contact#jobs";
const FLYER_IMAGE =
  "/images/listings/revyv-salesperson-schools-chennai-hiring-2026.jpg";

type RoleSeed = {
  slug: string;
  title: string;
  employmentType: "PART_TIME" | "FULL_TIME";
  salaryMonthly: number;
  relatedSlug: string;
  relatedLabel: string;
};

const ROLES: RoleSeed[] = [
  {
    slug: "salesperson-revyv-schools-chennai-part-time",
    title: "Salesperson (part-time) — Revyv · schools across Chennai",
    employmentType: "PART_TIME",
    salaryMonthly: 13_000,
    relatedSlug: "salesperson-revyv-schools-chennai-full-time",
    relatedLabel: "Salesperson (full-time) · Revyv Chennai",
  },
  {
    slug: "salesperson-revyv-schools-chennai-full-time",
    title: "Salesperson (full-time) — Revyv · schools across Chennai",
    employmentType: "FULL_TIME",
    salaryMonthly: 20_000,
    relatedSlug: "salesperson-revyv-schools-chennai-part-time",
    relatedLabel: "Salesperson (part-time) · Revyv Chennai",
  },
];

function buildBody(role: RoleSeed): string {
  const engagement =
    role.employmentType === "PART_TIME" ? "part-time" : "full-time";
  const otherEngagement =
    role.employmentType === "PART_TIME" ? "full-time" : "part-time";
  const otherPay =
    role.employmentType === "PART_TIME" ? "₹20,000" : "₹13,000";

  return `
![Revyv hiring flyer — Salesperson Needed for schools in Chennai](${FLYER_IMAGE})

**Revyv** (Student Wellness & Preventive Behavioral Health) is hiring a **salesperson** to take their school offering across **Chennai**. The flyer tagline is “Healthier Minds, Brighter Futures.”

This page is compiled from the hiring flyer above. It is a community listing, not Revyv’s official careers page. Confirm hours, territory, and who you will report to before you accept.

## Role at a glance

- **Position:** Salesperson — schools in Chennai
- **Engagement on this listing:** **${engagement}**
- **Monthly salary (as printed):** **₹${role.salaryMonthly.toLocaleString("en-IN")}**
- **Location:** Chennai (field visits to schools; no street address on the flyer)
- **Also on the flyer:** a **${otherEngagement}** option at **${otherPay}** / month — see [${role.relatedLabel}](/chennai-jobs/${role.relatedSlug})

## Key responsibilities (from the flyer)

- Take Revyv to **schools in Chennai**
- Visit **4–5 schools a day** (as planned)
- Present and explain the product to the **right decision-makers**
- Handle **follow-ups** and complete the process
- **Report daily** on visits and progress

## Who they say they want

Enthusiastic, goal-driven people who love working with people. The flyer highlights a good opportunity, a supportive team, and making a real impact — it does not print experience years, education, or language requirements.

## How to apply

The flyer says **Apply Now!** but does **not** print a phone, WhatsApp, email, or careers URL. Use our [jobs contact form](${APPLY_URL}) and mention **Revyv salesperson — Chennai (${engagement})** so we can help connect you if a hiring contact reaches us. If you already have Revyv’s apply link from the original poster, use that directly.

Mention that you saw the opening on MyChennaiCity jobs.

**Safety note:** Do **not** pay any upfront “registration” or “training” fee to get this interview. Confirm the employer and pay terms in writing before you accept.
`.trim();
}

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
        verified: false,
      })
      .returning({ id: employers.id });
    employerId = ins.id;
    console.log("[seed-job] Inserted employer:", EMPLOYER_SLUG);
  }

  const now = new Date();
  const validThrough = new Date(now);
  validThrough.setDate(validThrough.getDate() + 90);

  for (const role of ROLES) {
    const [existingJob] = await db
      .select({ id: jobPostings.id })
      .from(jobPostings)
      .where(
        and(eq(jobPostings.cityId, city.id), eq(jobPostings.slug, role.slug)),
      )
      .limit(1);

    const values = {
      employerId,
      cityId: city.id,
      slug: role.slug,
      title: role.title,
      body: buildBody(role),
      locationLabel: "Chennai · schools field visits",
      status: "open" as const,
      employmentType: role.employmentType,
      validThrough,
      applicationUrl: APPLY_URL,
      salaryDisclosed: true,
      salaryMin: role.salaryMonthly,
      salaryMax: role.salaryMonthly,
      openingsCount: 1,
      remotePolicy: "onsite" as const,
      updatedAt: now,
    };

    if (existingJob) {
      await db
        .update(jobPostings)
        .set(values)
        .where(eq(jobPostings.id, existingJob.id));
      console.log("[seed-job] Refreshed open job:", role.slug);
    } else {
      await db.insert(jobPostings).values({
        ...values,
        publishedAt: now,
        createdAt: now,
      });
      console.log("[seed-job] Inserted open job:", role.slug);
    }

    console.log("[seed-job] Detail:", `/chennai-jobs/${role.slug}`);
  }

  await finishListingSeedLive({
    jobSlug: ROLES[0].slug,
    label: "seed-job-revyv-salesperson-schools",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
