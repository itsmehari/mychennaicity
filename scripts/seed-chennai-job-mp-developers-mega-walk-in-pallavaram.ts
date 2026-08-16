/**
 * MP Developers — mega walk-in (Pallavaram interview · Guindy work).
 *
 * Flyer: `public/images/listings/mp-developers-mega-walk-in-pallavaram-aug-2026.png`
 *
 * Dev:  `npm run db:seed:chennai-job:mp-developers-mega-walk-in-pallavaram`
 * Live: `npm run db:seed:chennai-job:mp-developers-mega-walk-in-pallavaram:live` — uses `.env.production.local`
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

const EMPLOYER_SLUG = "mp-developers";
const JOB_SLUG = "mp-developers-mega-walk-in-pallavaram-guindy";

const WEBSITE = "https://mpdevelopers.com/";
const CAREERS = "https://mpdevelopers.com/careers/";
const EMAIL = "careers@mpdevelopers.com";
const PHONE_DISPLAY = "78457 58753";
const EMAIL_APPLY = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Application — MP Developers mega walk-in (MyChennaiCity)",
)}`;
const WA_APPLY = `https://wa.me/917845758753?text=${encodeURIComponent(
  "Hi, I saw the MP Developers mega walk-in (Pallavaram / Guindy) on MyChennaiCity and would like to apply. Please find my resume.",
)}`;

const FLYER_IMAGE =
  "/images/listings/mp-developers-mega-walk-in-pallavaram-aug-2026.png";

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
        name: "MP Developers",
        websiteUrl: WEBSITE,
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "MP Developers",
        slug: EMPLOYER_SLUG,
        websiteUrl: WEBSITE,
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
![MP Developers mega walk-in drive flyer — Pallavaram interview, Guindy work location](${FLYER_IMAGE})

**MP Developers** (*Trust Forever*) is running a **mega walk-in drive** for experienced residential-project professionals. **Interview in Pallavaram**; **work location Guindy**.

This is a community listing from the employer’s flyer — confirm the Pallavaram interview address, documents, and role fit before you travel. Official careers page: [mpdevelopers.com/careers](${CAREERS}).

## Walk-in details

- **Days:** Monday to Saturday
- **Time:** **10:30 AM to 4:30 PM**
- **Interview location:** Pallavaram
- **Work location:** Guindy

## Open positions (5)

| Role | Openings | Experience |
| --- | --- | --- |
| Land Acquisition Manager | 2 | 3–10 years |
| ME Structural Engineer | 1 | 3–10 years |
| 3D Modular | 1 | 3–10 years |
| Call Audit | 1 | 10–15 years |

## Who they want

Candidates from **reputed developers**, with proven expertise in **residential projects**.

## How to apply

Walk in Monday–Saturday, **10:30 AM–4:30 PM**, at the **Pallavaram** interview, or send your resume first:

- Email: **[${EMAIL}](${EMAIL_APPLY})**
- Phone / WhatsApp: **${PHONE_DISPLAY}** — [WhatsApp](${WA_APPLY}) or [call](tel:+917845758753)

Mention that you saw the opening on MyChennaiCity jobs.

**Safety note:** Do **not** pay any upfront “registration” or “security” fee to third parties — verify that you are dealing with the real MP Developers hiring contact (${EMAIL}).
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Land Acquisition, Structural Engineer, 3D Modular & Call Audit — MP Developers walk-in (Pallavaram)",
    body,
    locationLabel: "Walk-in at Pallavaram · work at Guindy",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: EMAIL_APPLY,
    salaryDisclosed: false,
    openingsCount: 5,
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
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
