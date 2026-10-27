/**
 * Fruits and vegetables warehouse — Vanagaram. Male loading and picker roles.
 * The note says ₹21,000 CTC after 15 days; the flyer prints ₹17,000 in-hand.
 *
 * Flyer: `public/images/listings/vanagaram-fruits-vegetables-warehouse-2026.png`
 *
 * Dev:  `npm run db:seed:chennai-job:vanagaram-warehouse`
 * Live: `npm run db:seed:chennai-job:vanagaram-warehouse:live`
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

const EMPLOYER_SLUG = "vanagaram-fruits-vegetables-warehouse";
const JOB_SLUG = "warehouse-loading-picker-vanagaram-chennai";
const FLYER = "/images/listings/vanagaram-fruits-vegetables-warehouse-2026.png";
const WHATSAPP = "https://wa.me/917305531993";

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
        ilike(jobPostings.body, "%7305531993%"),
        ilike(jobPostings.body, "%73055 31993%"),
        ilike(jobPostings.title, "%Vanagaram%warehouse%"),
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
    console.error("City slug 'chennai' not found.");
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
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "Fruits and Vegetables Warehouse, Vanagaram",
        slug: EMPLOYER_SLUG,
        verified: false,
      })
      .returning({ id: employers.id });
    employerId = ins.id;
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
A **fruits and vegetables warehouse** in **Vanagaram, Chennai** is hiring. The notice does not print a company name. HR contact is **Logeshwari**.

![Vanagaram fruits and vegetables warehouse flyer — loading, unloading, picker and packer](${FLYER})

## Roles
- **Loading and unloading**
- **Picker and packer**

**Male candidates only.** The note says **freshers can apply**. The flyer does not say fresher. Candidates willing to work **three shifts** are preferred.

## Pay
**First 15 days:** ₹900 per day. The flyer says this is a daily wage, paid weekly.

**After 15 days:** the note says **₹21,000 CTC per month** and **₹17,000 in-hand**. The flyer prints **₹17,000 in-hand per month** and does not print the ₹21,000 CTC figure.

**Incentives** up to ₹3,000–₹5,000. The flyer puts an asterisk on that line and does not explain it.

**Free food** and **free accommodation**.

This page does not publish one salary band, because the notice mixes a daily wage and a later monthly figure.

## How to apply
Call or WhatsApp **Logeshwari** on **[73055 31993](${WHATSAPP})**.

No street address and no email are printed.

This page is compiled from the hiring note and the flyer.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Warehouse loading and picker — Vanagaram, Chennai",
    body,
    locationLabel: "Vanagaram, Chennai",
    status: "open" as const,
    validThrough,
    applicationUrl: WHATSAPP,
    salaryDisclosed: false,
    openingsCount: 1,
    remotePolicy: "onsite" as const,
    updatedAt: now,
  };

  if (existingJob) {
    await db.update(jobPostings).set(values).where(eq(jobPostings.id, existingJob.id));
    console.log("[seed-job] Refreshed:", JOB_SLUG);
  } else {
    await db.insert(jobPostings).values({ ...values, publishedAt: now, createdAt: now });
    console.log("[seed-job] Inserted:", JOB_SLUG);
  }

  console.log("[seed-job] Done. Detail:", `/chennai-jobs/${JOB_SLUG}`);
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
