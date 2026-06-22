/**
 * BG Naidu — Branch Manager, Supervisor & CRE (Trichy, Kumbakonam, Madurai).
 *
 * Dev:  `npm run db:seed:chennai-job:bg-naidu-sweets`
 * Live: `npm run db:seed:chennai-job:bg-naidu-sweets:live` — uses `.env.production.local`
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

const EMPLOYER_SLUG = "bg-naidu-sweets";
const JOB_SLUG = "branch-manager-supervisor-cre-bg-naidu-trichy-madurai";

const EMAIL_APPLY =
  "mailto:hr@bgnaidusweets.com?subject=Application%20%E2%80%94%20BG%20Naidu";
const PHONE_1 = "70944 97928";
const PHONE_2 = "70944 97941";

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
        name: "BG Naidu",
        websiteUrl: "https://bgnaidusweets.com",
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed name:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "BG Naidu",
        slug: EMPLOYER_SLUG,
        websiteUrl: "https://bgnaidusweets.com",
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
**BG Naidu** (*Traditional by Generations*, est. 1908) is hiring for **multiple store roles** across **Trichy, Kumbakonam & Madurai**.

## Open positions

| Role | Locations | Who can apply |
| --- | --- | --- |
| **Branch Manager** | Trichy, Kumbakonam & Madurai | Food industry candidates preferred |
| **Supervisor** | Trichy & Madurai | Food industry & retail industry candidates preferred |
| **Customer Relation Executive (CRE)** | Trichy & Kumbakonam | Open to suitable candidates |

## Benefits

- Annual bonus
- Incentives
- PF & ESI

## How to apply

Send your updated resume to **[hr@bgnaidusweets.com](mailto:hr@bgnaidusweets.com)** with the **position applied for** in the email subject line.

You can also call **${PHONE_1}** or **${PHONE_2}** for enquiries.

## Documents to bring for interview

1. Updated resume or biodata
2. Passport-size photo — 2 copies
3. Aadhaar xerox

Mention that you saw the opening on MyChennaiCity jobs.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Branch Manager, Supervisor & CRE — BG Naidu · Trichy, Kumbakonam & Madurai",
    body,
    locationLabel: "Trichy, Kumbakonam & Madurai, Tamil Nadu",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: EMAIL_APPLY,
    salaryDisclosed: false,
    openingsCount: 3,
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
