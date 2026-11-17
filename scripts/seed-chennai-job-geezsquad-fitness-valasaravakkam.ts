/**
 * Geezsquad Fitness Centre — cooking master + assistant, housekeeping (1+1 each).
 * 80 Feet Road, Valasaravakkam. Contact Narasimhan 7904151836.
 *
 * Dev:  `npm run db:seed:chennai-job:geezsquad-fitness-valasaravakkam`
 * Live: `npm run db:seed:chennai-job:geezsquad-fitness-valasaravakkam:live`
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

const EMPLOYER_SLUG = "geezsquad-fitness-centre-valasaravakkam";
const EMPLOYER_NAME = "Geezsquad Fitness Centre";
const JOB_SLUG =
  "geezsquad-fitness-cooking-housekeeping-80-feet-road-valasaravakkam-2026";
const PHONE = "7904151836";
const PHONE_DISPLAY = "79041 51836";
const CONTACT_NAME = "Narasimhan";
const PHONE_APPLY = `tel:+91${PHONE}`;
const WA_APPLY = `https://wa.me/91${PHONE}?text=${encodeURIComponent(
  "Hi, I saw the cooking / housekeeping openings at Geezsquad Fitness Centre, Valasaravakkam, on MyChennaiCity and would like more details.",
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
        ilike(jobPostings.body, `%${PHONE_DISPLAY.replace(/\s/g, "")}%`),
        ilike(jobPostings.body, `%79041 51836%`),
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
**Geezsquad Fitness Centre** on **80 Feet Road, Valasaravakkam**, Chennai is hiring for **kitchen and housekeeping** — **one cooking master plus one cooking assistant**, and **one housekeeping lead plus one housekeeping helper** (as stated in the hiring note).

## Kitchen team (2 seats)

| Role | Pay (as stated) | Shift windows named |
| --- | --- | --- |
| **Cooking master** | Up to **₹25,000** | **6:00 AM to 4:00 PM**; **6:00 PM to 9:00 PM** |
| **Cooking assistant / helper** | Up to **₹20,000** | **6:00 AM to 4:00 PM**; **6:00 PM to 9:00 PM** |

The note lists **both** morning and evening windows for the kitchen. It does not say whether each person covers one window, both windows, or a split day. Confirm roster, weekly off, and whether meals are on-site with **${CONTACT_NAME}** before you join.

## Housekeeping (2 seats)

| Role | Pay (as stated) | Shift windows named |
| --- | --- | --- |
| **Housekeeping** (1 + 1) | Up to **₹20,000** each | **6:00 AM to 3:00 PM**; **12:00 PM to 9:00 PM** |

The note does not separate pay between the two housekeeping seats. It does not name male/female preference, experience, or language. Confirm duties (gym floor, washrooms, kitchen support) on the call.

## Location

**Geezsquad Fitness Centre**, **80 Feet Road, Valasaravakkam**, Chennai. Confirm the exact building and reporting time before your first day.

## Pay — confirm before you join

All figures are **“up to”** monthly pay as printed in the note. MyChennaiCity does not verify salary or benefits. Ask for **take-home pay**, **PF/ESI**, food, and accommodation on the call.

## How to apply

Call or WhatsApp **${CONTACT_NAME}** at **+91 ${PHONE_DISPLAY}**:

- Call: [+91 ${PHONE_DISPLAY}](${PHONE_APPLY})
- WhatsApp: [Message ${CONTACT_NAME}](${WA_APPLY})

Mention that you saw the opening on **MyChennaiCity jobs**, and which role you want (cooking master, cooking assistant, or housekeeping).

This page is compiled from the hiring note. It is not the fitness centre’s own careers page.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Cooking master, assistant & housekeeping — Geezsquad Fitness Centre, Valasaravakkam",
    body,
    locationLabel: "80 Feet Road, Valasaravakkam, Chennai",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    applicationUrl: WA_APPLY,
    salaryDisclosed: true,
    salaryMin: 20_000,
    salaryMax: 25_000,
    openingsCount: 4,
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

  console.log(
    "[seed-job] Done. Detail:",
    `https://mychennaicity.in/chennai-jobs/${JOB_SLUG}`,
  );
  await finishListingSeedLive({
    jobSlug: JOB_SLUG,
    label: "seed-geezsquad-fitness-valasaravakkam",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});