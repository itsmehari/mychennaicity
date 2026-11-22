/**
 * Lenskart — Sales Associate walk-in drive (Chennai · 24 / 26 / 27 Nov 2026).
 *
 * Flyer: `public/images/listings/lenskart-sales-associate-walk-in-chennai-november-2026.png`
 * Thoraipakkam (24), Anna Nagar (26), Porur (27); 11 AM–5 PM; ₹2.5–4 LPA + incentive;
 * 400+ openings; HR Pavithra 9342515522.
 *
 * Dev:  `npm run db:seed:chennai-job:lenskart-sales-associate-walk-in`
 * Live: `npm run db:seed:chennai-job:lenskart-sales-associate-walk-in:live`
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

const EMPLOYER_SLUG = "lenskart";
const EMPLOYER_NAME = "Lenskart";
const WEBSITE = "https://www.lenskart.com/";
const JOB_SLUG =
  "sales-associate-lenskart-walk-in-chennai-november-2026";
const PHONE = "9342515522";
const PHONE_DISPLAY = "93425 15522";
const FLYER_IMAGE =
  "/images/listings/lenskart-sales-associate-walk-in-chennai-november-2026.png";

/** Flyer shows a phone icon — apply is call, not WhatsApp (SOP L). */
const CALL_APPLY = `tel:+91${PHONE}`;
const WA_BODY = `https://wa.me/91${PHONE}?text=${encodeURIComponent(
  "Hi Pavithra, I saw the Lenskart Sales Associate walk-in drive (Chennai, 24–27 Nov 2026) on MyChennaiCity and would like to register. Please share the next step.",
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
        ilike(jobPostings.body, "%Lenskart%Sales Associate%walk-in%"),
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
        websiteUrl: WEBSITE,
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
    .where(and(eq(jobPostings.cityId, city.id), eq(jobPostings.slug, JOB_SLUG)))
    .limit(1);

  const now = new Date();
  /** Last walk-in day ends 5:00 PM IST. */
  const validThrough = new Date("2026-11-27T17:00:00+05:30");

  const body = `
![Lenskart walk-in drive flyer — Sales Associate, Chennai, 24 / 26 / 27 November 2026](${FLYER_IMAGE})

**Lenskart** is running a **walk-in drive for Sales Associate** roles in Chennai. Freshers and experienced candidates are both welcome. The flyer marks **400+** open positions and pay of **₹2.5 LPA–₹4 LPA + incentive**.

This is a community listing from the employer’s walk-in flyer — confirm the venue for your day, documents, and package with **HR Pavithra** before you travel. The flyer also shows a **Register now** QR code; scan that poster or call the desk if you want to register ahead.

## Walk-in schedule (11:00 AM – 5:00 PM)

| Date | Venue |
| --- | --- |
| **Mon 24 Nov 2026** | Plot No 6, 200 ft Radial Road Toll Plaza, Sri Sai Nagar, **Thoraipakkam**, Tamil Nadu 600097 |
| **Wed 26 Nov 2026** | Shop No AB152, Flat No 41B Ave, opposite Srivari Sweets, Shanthi Colony, **Anna Nagar**, Chennai 600040 |
| **Thu 27 Nov 2026** | 23, Trunk Road, Jaya Nagar, **Porur**, Chennai 600116 |

## Role at a glance

| | |
| --- | --- |
| **Role** | Sales Associate |
| **Employer** | Lenskart |
| **Experience** | Freshers and experienced welcome |
| **Openings** | 400+ (as printed) |
| **Pay** | ₹2.5 LPA – ₹4 LPA + incentive |
| **Job type** | Full time, onsite (retail) |

## How to apply

Walk in on one of the three dates between **11:00 AM and 5:00 PM**, or call **HR Pavithra** first:

- Call **[${PHONE_DISPLAY}](${CALL_APPLY})**
- WhatsApp (optional): [message Pavithra](${WA_BODY})

Mention that you saw the opening on **MyChennaiCity jobs**.

**Safety note:** Do **not** pay any upfront “registration” or “security” fee to third parties — verify that you are dealing with the real Lenskart hiring contact.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Sales Associate — Lenskart walk-in (Thoraipakkam · Anna Nagar · Porur · 24–27 Nov 2026)",
    body,
    locationLabel:
      "Walk-in Thoraipakkam (24 Nov) · Anna Nagar (26 Nov) · Porur (27 Nov)",
    status:
      validThrough.getTime() > now.getTime()
        ? ("open" as const)
        : ("closed" as const),
    employmentType: "FULL_TIME",
    validThrough,
    applicationUrl: CALL_APPLY,
    salaryDisclosed: true,
    salaryMin: 250_000,
    salaryMax: 400_000,
    salaryUnit: "YEAR",
    openingsCount: 400,
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
    label: "seed-chennai-job-lenskart-sales-associate-walk-in",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
