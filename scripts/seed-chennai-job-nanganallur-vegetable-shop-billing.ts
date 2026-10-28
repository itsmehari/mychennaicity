/**
 * Billing staff — vegetable shop, Nanganallur.
 * Source note (27 Oct 2026): male or female; full-time and part-time;
 * timings around 7:30 AM–1:30 PM and 4:30 PM–9:30 PM; salary around
 * 15k to 25k (no pay period printed); age below 40; shop name and street
 * unstated; WhatsApp 9789943459. English only.
 * Same note on https://mynanganallur.in/jobs/nanganallur-vegetable-shop-sales-billing
 * Slug matches the row already open in production (do not insert a second phone match).
 *
 * Dev:  `npm run db:seed:chennai-job:nanganallur-vegetable-billing`
 * Live: `npm run db:seed:chennai-job:nanganallur-vegetable-billing:live`
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

const EMPLOYER_SLUG = "nanganallur-vegetable-shop";
const EMPLOYER_NAME = "Vegetable shop, Nanganallur";
const JOB_SLUG = "nanganallur-vegetable-shop-sales-billing";
const PHONE_DISPLAY = "97899 43459";
const SISTER =
  "https://mynanganallur.in/jobs/nanganallur-vegetable-shop-sales-billing";
const WA_APPLY = `https://wa.me/919789943459?text=${encodeURIComponent(
  "Hi, I saw the billing staff opening at the vegetable shop in Nanganallur on MyChennaiCity and would like to apply.",
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
        ilike(jobPostings.body, "%9789943459%"),
        ilike(jobPostings.body, "%97899 43459%"),
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
A **vegetable shop in Nanganallur** is hiring **billing staff**. The note says **male or female** applicants can apply, and that **full-time and part-time** seats are both open. The shop’s name and street were not given. WhatsApp **+91 ${PHONE_DISPLAY}**.

The same note is on [MyNanganallur](${SISTER}).

## Role at a glance

- **Role:** Billing staff
- **Place:** Nanganallur, Chennai (no shop name or door number was printed)
- **Who can apply:** Male or female
- **Engagement:** Full-time and part-time
- **Timings named:** around 7:30 AM to 1:30 PM, and around 4:30 PM to 9:30 PM
- **Salary named:** around ₹15,000 to ₹25,000
- **Age named:** below 40

The note does not say which window is full-time, which is part-time, or which days are weekly offs. It does not print a vacancy count.

## Pay

The note says salary will be around **₹15,000 to ₹25,000**. It does not print “per month”. This listing shows that band as monthly, which is how a shop figure in this range is read here. Confirm the pay period, and whether full-time and part-time pay differ, before you join.

## Who they want

- Male or female
- Age below 40, as printed in the note

## How to apply

WhatsApp **+91 ${PHONE_DISPLAY}**. Say you are applying for billing at the Nanganallur vegetable shop, and that you saw it on MyChennaiCity.

This page is compiled from the hiring note. It is not the shop’s own careers page.

## Common questions

### Where is the shop?

Nanganallur. The note does not give the shop name or a street.

### What are the timings?

Around 7:30 AM to 1:30 PM, and around 4:30 PM to 9:30 PM. Full-time and part-time are both listed.

### What is the salary?

Around ₹15,000 to ₹25,000. The note does not say per month. Confirm the figure when you apply.

### How do I apply?

WhatsApp +91 ${PHONE_DISPLAY}.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Billing staff — vegetable shop, Nanganallur, Chennai",
    body,
    locationLabel: "Nanganallur, Chennai",
    status: "open" as const,
    employmentType: null,
    validThrough,
    applicationUrl: WA_APPLY,
    salaryDisclosed: true,
    salaryMin: 15_000,
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
