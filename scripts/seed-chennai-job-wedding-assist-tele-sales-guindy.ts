/**
 * Wedding Assist — Tele Sales Executive (Guindy walk-in).
 *
 * Full-time on-roll; Mon–Sat 9:30 AM–6:30 PM; Guindy office.
 * HR Rahman 9626490724. No rupee figure — salary undisclosed.
 *
 * Dev:  `npm run db:seed:chennai-job:wedding-assist-tele-sales-guindy`
 * Live: `npm run db:seed:chennai-job:wedding-assist-tele-sales-guindy:live`
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

const EMPLOYER_SLUG = "wedding-assist";
const EMPLOYER_NAME = "Wedding Assist";
const JOB_SLUG =
  "tele-sales-executive-wedding-assist-guindy-walk-in-november-2026";
const PHONE = "9626490724";
const PHONE_DISPLAY = "96264 90724";
const CALL_APPLY = `tel:+91${PHONE}`;
const MAPS_URL = "https://maps.app.goo.gl/VEu2vLDe4VoRHwQ28?g_st=aw";

const WA_BODY = `https://wa.me/91${PHONE}?text=${encodeURIComponent(
  "Hi Rahman, I saw the Tele Sales Executive — Wedding Assist walk-in (Guindy) on MyChennaiCity jobs and would like to apply. Please share the next step.",
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
        ilike(jobPostings.body, `%${PHONE}%`),
        ilike(jobPostings.body, "%Wedding Assist%Tele Sales%"),
        eq(jobPostings.slug, JOB_SLUG),
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
      .set({
        name: EMPLOYER_NAME,
        updatedAt: new Date(),
      })
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

  const body = `
**${EMPLOYER_NAME}** is hiring a **Tele Sales Executive** for wedding customer outreach — outbound and inbound calls, lead qualification, and coordinating **Wedding Gift Box** meetings with field relationship managers. **Full-time, on-roll** role at the **Guindy** office.

This listing is compiled from the employer’s walk-in note. Confirm pay, exact walk-in hours, and documents with **HR Rahman** before you travel.

## Role at a glance

| | |
| --- | --- |
| **Role** | Tele Sales Executive — Wedding Assist |
| **Employer** | ${EMPLOYER_NAME} |
| **Experience** | 1–8 years in telesales or inside sales |
| **Languages** | Tamil and English preferred |
| **Employment** | Full-time, on-roll |
| **Working days** | Monday to Saturday |
| **Shift** | 9:30 AM – 6:30 PM |
| **Workplace** | Guindy, Chennai (onsite) |

No rupee salary band is printed on the note.

## What you will do

- Make outbound calls to assigned wedding leads and handle inbound calls per the defined script.
- Understand wedding requirements and explain **Wedding Assist** services.
- Qualify leads on wedding date, location, budget, guest count, and requirements.
- Schedule customer meetings for **Wedding Gift Box Delivery** through field RMs.
- Coordinate with Field RMs and Service RMs for lead progression.

## What they look for

- Strong verbal communication and objection handling.
- Good follow-up discipline; target-oriented and self-motivated.
- **1–8 years** in telesales or inside sales.

## Walk-in interview

**#94, RR Tower 3, 7th Floor**, Water Works Road, SIDCO Industrial Estate, **Guindy**, Chennai – 600032.

- [Open in Google Maps](${MAPS_URL})

Call **HR Rahman** before you walk in if you want to confirm timing and what to carry.

## How to apply

- Call **[${PHONE_DISPLAY}](${CALL_APPLY})**
- WhatsApp (optional): [message HR Rahman](${WA_BODY})

Mention that you saw the opening on **MyChennaiCity jobs**.

**Safety note:** Do not pay registration or “security” fees to third parties — verify you are dealing with ${EMPLOYER_NAME} hiring.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Tele Sales Executive — Wedding Assist (Guindy walk-in · Mon–Sat 9:30 AM–6:30 PM)",
    body,
    locationLabel: "Guindy, Chennai — RR Tower 3, SIDCO Industrial Estate",
    status:
      validThrough.getTime() > now.getTime()
        ? ("open" as const)
        : ("closed" as const),
    employmentType: "FULL_TIME",
    validThrough,
    applicationUrl: CALL_APPLY,
    salaryDisclosed: false,
    schemaEligible: false,
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

  console.log("[seed-job] Done:", `/chennai-jobs/${JOB_SLUG}`);
  await finishListingSeedLive({
    jobSlug: JOB_SLUG,
    label: "seed-chennai-job-wedding-assist-tele-sales-guindy",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});