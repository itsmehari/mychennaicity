/**
 * Shop staff — snacks, beverages and ice creams, Velachery.
 * Source note (24 Oct 2026): staff wanted; 2 positions; shift 1 is 9 AM–6 PM;
 * shift 2 is 2 PM–11 PM; salary based on experience; shop name and street
 * unstated; contact +91 98404 72645. English only.
 *
 * Dev:  `npm run db:seed:chennai-job:velachery-snacks-shop-staff`
 * Live: `npm run db:seed:chennai-job:velachery-snacks-shop-staff:live`
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

const EMPLOYER_SLUG = "velachery-snacks-beverages-icecream-shop";
const EMPLOYER_NAME = "Snack, beverage and ice cream shop, Velachery";
const JOB_SLUG = "shop-staff-snacks-beverages-icecreams-velachery";
const PHONE_DISPLAY = "98404 72645";
const WA_APPLY = `https://wa.me/919840472645?text=${encodeURIComponent(
  "Hi, I saw the shop staff opening in Velachery (snacks, beverages and ice creams) on MyChennaiCity and would like to apply.",
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
        ilike(jobPostings.body, "%9840472645%"),
        ilike(jobPostings.body, "%98404 72645%"),
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
A shop in **Velachery** is hiring **staff** to prepare and serve snacks, beverages, and ice creams. The note says **2 positions** are open. The shop’s name and street were not given. Pay is **based on experience**. Call or WhatsApp **+91 ${PHONE_DISPLAY}**.

## Role at a glance

- **Positions:** 2
- **Place:** Velachery, Chennai (no door number was printed)
- **Shift 1:** 9 AM to 6 PM
- **Shift 2:** 2 PM to 11 PM
- **Salary:** Based on experience (no figure was stated)
- **Shop name:** Not stated in the note

The note does not say whether these are full-time seats, or which days are weekly offs.

## Work

- Prepare and serve snacks, beverages, and ice creams
- Handle customers
- Maintain cleanliness
- Manage stock and basic shop operations
- Assist in all day-to-day activities
- Cleaning and closing the shop

## Who they want

- Hardworking
- Responsible
- Customer friendly
- Showing hospitality
- Team player

## How to apply

Call or WhatsApp **+91 ${PHONE_DISPLAY}**. Say you are applying for the Velachery shop staff opening, and that you saw it on MyChennaiCity.

This page is compiled from the hiring note. It is not the shop’s own careers page.

## Common questions

### Where is the shop?

Velachery. The note does not give the shop name or a street.

### What are the shift timings?

Shift 1 is 9 AM to 6 PM. Shift 2 is 2 PM to 11 PM. Two positions are listed.

### What is the salary?

Based on experience. No amount was stated, so this listing does not publish a pay band.

### How do I apply?

Call or WhatsApp +91 ${PHONE_DISPLAY}.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Shop staff — snacks, beverages and ice creams, Velachery, Chennai",
    body,
    locationLabel: "Velachery, Chennai",
    status: "open" as const,
    employmentType: null,
    validThrough,
    applicationUrl: WA_APPLY,
    salaryDisclosed: false,
    salaryMin: null,
    salaryMax: null,
    openingsCount: 2,
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
