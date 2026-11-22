/**
 * Paytm — Sr. Group leader / Group leader / Sr. Fse / Fse (variable salary caps).
 *
 * Flyer: `public/images/listings/paytm-group-leader-fse-roles-chennai-november-2026.png`
 * Contact: Rajesh (Team Leader) 8098020794 — phone icon → call apply.
 * Caps stay in the body only (VARIABLE SALARY + capping limit).
 *
 * Dev:  `npm run db:seed:chennai-job:paytm-group-leader-fse`
 * Live: `npm run db:seed:chennai-job:paytm-group-leader-fse:live`
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

const EMPLOYER_SLUG = "paytm";
const EMPLOYER_NAME = "Paytm";
const WEBSITE = "https://paytm.com/";
const JOB_SLUG = "group-leader-fse-roles-paytm-chennai-november-2026";
const PHONE = "8098020794";
const PHONE_DISPLAY = "80980 20794";
const CALL_APPLY = `tel:+91${PHONE}`;
const FLYER_IMAGE =
  "/images/listings/paytm-group-leader-fse-roles-chennai-november-2026.png";

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
        ilike(jobPostings.body, "%Paytm%Sr. Group leader%"),
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
  const validThrough = new Date(now);
  validThrough.setDate(validThrough.getDate() + 90);

  const body = `
![Paytm hiring flyer — Sr. Group leader, Group leader, Sr. Fse, Fse · variable salary capping limits](${FLYER_IMAGE})

**Paytm** (*India’s Leading Payments Company*, as printed) is hiring for team and field sales leadership roles. The flyer headline is **VARIABLE SALARY**. Each title shows a **capping limit salary** — that is a printed cap, not a guaranteed fixed package. Confirm the real structure with the hiring contact before you join.

This is a community listing from the employer’s flyer. Locality, hours, vacancy counts, and job type are **not** printed. Confirm place and role fit with **Rajesh (Team Leader)** before you travel.

## Open roles (as printed)

| Role | Capping limit salary (as printed) |
| --- | --- |
| **Sr. Group leader** | ₹55,000 |
| **Group leader** | ₹50,000 |
| **Sr. Fse** | ₹45,000 |
| **Fse** | ₹40,000 |

Titles are quoted exactly as on the flyer (**Fse** / **Sr. Fse**).

## What the flyer highlights

- Be a leader — make an impact
- Grow your career
- Lead and inspire your team
- Achieve more together
- Take the lead — build the team — create success

## How to apply

Call **Rajesh (Team Leader)**:

- **[${PHONE_DISPLAY}](${CALL_APPLY})**

Mention that you saw the opening on **MyChennaiCity jobs**, and which title you are applying for.

**Safety note:** Do **not** pay any upfront “registration” or “security” fee to third parties — verify that you are dealing with the real Paytm hiring contact on this flyer. Variable / capping figures are not a fixed offer until confirmed in writing.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Sr. Group leader / Group leader / Sr. Fse / Fse — Paytm (variable salary)",
    body,
    locationLabel: "Chennai (locality not printed on flyer)",
    status: "open" as const,
    employmentType: null as string | null,
    validThrough,
    applicationUrl: CALL_APPLY,
    salaryDisclosed: false,
    salaryMin: null as number | null,
    salaryMax: null as number | null,
    salaryUnit: null as string | null,
    schemaEligible: false,
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
    label: "seed-chennai-job-paytm-group-leader-fse-roles",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
