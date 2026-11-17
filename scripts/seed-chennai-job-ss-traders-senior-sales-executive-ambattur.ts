/**
 * SS Traders — Senior Sales Executive · Ambattur, Chennai.
 * Flyer: `public/images/listings/ss-traders-senior-sales-executive-ambattur-2026.jpg`
 *
 * Dev:  `npm run db:seed:chennai-job:ss-traders-senior-sales-executive-ambattur`
 * Live: `npm run db:seed:chennai-job:ss-traders-senior-sales-executive-ambattur:live`
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

const EMPLOYER_SLUG = "ss-traders-ambattur";
const JOB_SLUG = "senior-sales-executive-ss-traders-ambattur";

const FLYER = "/images/listings/ss-traders-senior-sales-executive-ambattur-2026.jpg";
const PHONE_DISPLAY = "63811 30639";
const EMAIL = "vasanthradhakrishnan@sststeel.com";
const WA_APPLY = `https://wa.me/916381130639?text=${encodeURIComponent(
  "Hi, I saw the Senior Sales Executive role at SS Traders on MyChennaiCity jobs. I would like to apply and am sharing my resume.",
)}`;
const EMAIL_APPLY = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Application — Senior Sales Executive · SS Traders · Ambattur",
)}`;

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
        name: "SS Traders",
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "SS Traders",
        slug: EMPLOYER_SLUG,
        verified: false,
      })
      .returning({ id: employers.id });
    employerId = ins.id;
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
  validThrough.setDate(validThrough.getDate() + 30);

  const body = `
![Hiring flyer — Senior Sales Executive, SS Traders, Ambattur](${FLYER})

**SS Traders** (raw material supply chain fulfilment) is hiring a **Senior Sales Executive** for **Ambattur, Chennai**. Experienced candidates and freshers are welcome, with different criteria on the flyer.

## Experienced candidates

| | |
| --- | --- |
| **Age** | 30–45 years |
| **Experience** | Steel / industrial product sales preferred |
| **Skills** | Customer handling and communication |
| **Salary** | Negotiable |

## Freshers

| | |
| --- | --- |
| **Age preference** | 20–30 years |
| **Salary** | ₹20,000–₹33,000 per month (based on suitability) |

## What they expect

- Sales-focused attitude
- Customer relationship management
- Payment collection follow-up
- Business development skills

## Location

**Ambattur, Chennai** — confirm office address and field travel with the contact.

## How to apply

Send your resume via **WhatsApp** or **email**:

- **WhatsApp:** **${PHONE_DISPLAY}**
- **Email:** [${EMAIL}](mailto:${EMAIL})

Mention that you saw the opening on MyChennaiCity jobs. Do not pay registration fees to third parties — verify you are dealing with SS Traders.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Senior Sales Executive · SS Traders · Ambattur",
    body,
    locationLabel: "Ambattur, Chennai",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: WA_APPLY,
    salaryDisclosed: false,
    salaryMin: null as number | null,
    salaryMax: null as number | null,
    openingsCount: 1,
    remotePolicy: "field" as const,
    updatedAt: now,
  };

  if (existingJob) {
    await db
      .update(jobPostings)
      .set(values)
      .where(eq(jobPostings.id, existingJob.id));
    console.log("[seed-job] Refreshed:", JOB_SLUG);
  } else {
    await db.insert(jobPostings).values({ ...values, createdAt: now });
    console.log("[seed-job] Inserted:", JOB_SLUG);
  }

  console.log("[seed-job] Done:", `/chennai-jobs/${JOB_SLUG}`);
  console.log("[seed-job] Email:", EMAIL_APPLY);
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});