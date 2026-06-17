/**
 * Electrical & Instrumentation Engineer — AP Management Consultants, Cuddalore.
 *
 * Dev:  `npm run db:seed:chennai-job:apmc-electrical-instrumentation-engineer`
 * Live: `npm run db:seed:chennai-job:apmc-electrical-instrumentation-engineer:live` — uses `.env.production.local`
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

const EMPLOYER_SLUG = "ap-management-consultants-cuddalore";
const JOB_SLUG =
  "electrical-instrumentation-engineer-ap-management-consultants-cuddalore";

const EMAIL_APPLY = "mailto:hrcorner@apmcindia.in";
const PHONE_DISPLAY = "9585499788";
const PHONE_APPLY = "tel:+919585499788";

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
        name: "AP Management Consultants Pvt. Ltd. · Cuddalore",
        websiteUrl: "https://apmcindia.in",
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed name:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "AP Management Consultants Pvt. Ltd. · Cuddalore",
        slug: EMPLOYER_SLUG,
        websiteUrl: "https://apmcindia.in",
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
**AP Management Consultants Pvt. Ltd.** (*Amazing Pioneers*) is hiring an **Electrical & Instrumentation Engineer** at **Cuddalore**.

## Role at a glance
- **Experience:** 3–5 years (BE) · 5–8 years (Diploma)
- **Industries preferred:** FMCG, fertilizer, power plant, paint, sugar, paper
- **Remuneration:** As per market standards (confirm with HR)
- **Reports to:** Senior Manager & HOD — Maintenance
- **Immediate joiners** preferred

## Qualification
- **BE:** EEE / E&I / I&C — **3–5 years** experience
- **Diploma:** EEE / I&C — **5–8 years** experience

## Key responsibilities
1. Monitor and maintain uninterrupted operation of all electrical and instrumentation systems during assigned shifts.
2. Attend failures immediately, perform root cause analysis, and restore equipment with minimum downtime.
3. Supervise motors, transformers, MCCs, VFDs, PLCs, DCS, control valves, UPS systems, and field instruments.
4. Conduct routine inspections and execute preventive maintenance activities as per approved schedules.
5. Ensure process parameters remain within operating limits through calibration, tuning, and verification of instruments and control systems.
6. Enforce electrical safety procedures including LOTO, permit-to-work systems, isolation practices, and statutory requirements.
7. Work closely with production, utility, and maintenance teams to plan shutdowns, startups, and emergency interventions.
8. Prepare shift reports covering breakdowns, maintenance activities, pending jobs, equipment status, and handover notes.
9. Monitor critical E&I spares availability and coordinate with stores and planning teams to maintain readiness.
10. Participate in RCA, reliability improvement initiatives, energy optimization, safety audits, HAZOP actions, and continuous improvement programs.

## How to apply
Send your resume to **[hrcorner@apmcindia.in](${EMAIL_APPLY})** or call **${PHONE_DISPLAY}**.

Mention that you saw the opening on MyChennaiCity jobs.

**Safety note:** Do **not** pay any upfront “registration” or “security” fee to third parties — verify that you are dealing with the real hiring contact.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Electrical & Instrumentation Engineer — AP Management Consultants · Cuddalore",
    body,
    locationLabel: "Cuddalore",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: EMAIL_APPLY,
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
  console.log("[seed-job] Apply phone:", PHONE_APPLY);
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
