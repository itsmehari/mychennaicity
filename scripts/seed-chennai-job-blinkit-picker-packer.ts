/**
 * Blinkit — Picker & Packer / Auditing & Inventory (Chennai).
 *
 * Dev:  `npm run db:seed:chennai-job:blinkit-picker-packer`
 * Live: `npm run db:seed:chennai-job:blinkit-picker-packer:live` — uses `.env.production.local`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
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

const EMPLOYER_SLUG = "blinkit-chennai";
const JOB_SLUG =
  "blinkit-hiring-picker-packer-auditing-inventory-chennai";

const PHONE_DISPLAY = "+91 75503 36153";
const WA_APPLY = `https://wa.me/917550336153?text=${encodeURIComponent(
  "Hi Vinoth, I saw the Blinkit Picker & Packer / Auditing & Inventory opening on MyChennaiCity and would like to apply.",
)}`;
const WEBSITE = "https://blinkit.com";

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
        name: "Blinkit",
        websiteUrl: WEBSITE,
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "Blinkit",
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
  const validThrough = new Date("2026-08-12T18:29:59+05:30");

  const body = `
**Blinkit** — India's last-minute quick commerce app — is hiring for **warehouse and store operations** across Chennai.

## Open positions

- **Picker & Packer**
- **Auditing & Inventory**

Be part of one of India's fastest-growing quick commerce teams. Work in a safe, inclusive environment with growth opportunities, health benefits, and recognition & rewards.

## Shifts

Morning, afternoon, evening, and night shifts available — choose what suits you.

## Requirements

- Education: **10th standard or higher (10+)**
- Age: **18 to 37 years**
- Gender: Open to male and female candidates
- Willing to work in warehouse / dark-store picking, packing, or inventory audit roles
- Able to work in assigned shift (morning, afternoon, evening, or night)

## Benefits

- Fixed monthly salary of **₹19,000**
- Growth opportunities within Blinkit
- Health benefits
- Safe and inclusive workplace
- Recognition and rewards for performance

## How to apply

Call or WhatsApp **Vinoth** at **${PHONE_DISPLAY}**, or use the **Apply via WhatsApp** button on this listing. Mention that you saw the opening on MyChennaiCity jobs.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Blinkit Hiring — Picker & Packer / Auditing & Inventory (Chennai)",
    body,
    locationLabel: "Chennai (all areas — including OMR corridor)",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: WA_APPLY,
    salaryDisclosed: true,
    salaryMin: 19_000,
    salaryMax: 19_000,
    openingsCount: 2,
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
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
