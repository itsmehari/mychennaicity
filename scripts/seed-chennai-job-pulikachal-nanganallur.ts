/**
 * Pulikachal — finance, accounts, billing, store & sales hiring (Nanganallur).
 *
 * Dev:  `npm run db:seed:chennai-job:pulikachal-nanganallur`
 * Live: `npm run db:seed:chennai-job:pulikachal-nanganallur:live` — uses `.env.production.local`
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

const EMPLOYER_SLUG = "pulikachal";
const JOB_SLUG = "finance-accounts-sales-roles-pulikachal-nanganallur";

const WEBSITE = "https://pulikachal.com";
const EMAIL_APPLY =
  "mailto:contactus@pulikachal.com?subject=Application%20%E2%80%94%20Pulikachal%20(Nanganallur)";
const PHONE_DISPLAY = "98849 43165";
const PHONE_APPLY = "tel:+919884943165";

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
        name: "Pulikachal",
        websiteUrl: WEBSITE,
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed name:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "Pulikachal",
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
**Pulikachal** (*Experience the flavours of home*) sells authentic South Indian traditional foods — pickles, podis, sweets, savouries, and related staples — online and through retail. The team is **growing rapidly** and hiring at **Nanganallur, Chennai**.

## Open positions

### Finance & accounts

| Role | Openings |
| --- | ---: |
| Senior Accountant | 1 |
| Junior Accountant | 1 |
| Procurement & inventory management | 1 |

### Billing & store operations

- **2 positions** — billing and day-to-day store operations

### Sales & marketing

- **Sales & Marketing Lead** — 1 position

**Total:** 7 openings across finance, store ops, and sales.

## Eligibility

Candidates **below 45 years** of age (as stated in the employer notice).

## How to apply

Email your updated resume to **[contactus@pulikachal.com](mailto:contactus@pulikachal.com)**. Mention the **role you are applying for** in the subject line.

You can also call **${PHONE_DISPLAY}** for enquiries (number from [pulikachal.com](https://pulikachal.com)).

Mention that you saw the opening on MyChennaiCity jobs.

This page is compiled from the employer’s hiring notice. It is not Pulikachal’s official careers portal. Verify role details when you apply.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Finance, accounts, billing & sales — Pulikachal · Nanganallur, Chennai",
    body,
    locationLabel: "Nanganallur, Chennai",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: EMAIL_APPLY,
    salaryDisclosed: false,
    openingsCount: 7,
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
  console.log(
    "[seed-job] Optional phone apply URL (not stored as primary):",
    PHONE_APPLY,
  );
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});