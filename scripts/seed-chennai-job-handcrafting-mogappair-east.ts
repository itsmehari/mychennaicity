/**
 * Female staff — part-time handcrafting work, Mogappair East.
 *
 * Dev:  `npm run db:seed:chennai-job:handcrafting-mogappair-east`
 * Live: `npm run db:seed:chennai-job:handcrafting-mogappair-east:live` — uses `.env.production.local`
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

const EMPLOYER_SLUG = "handcrafting-mogappair-east";
const JOB_SLUG = "female-staff-part-time-handcrafting-mogappair-east";

const FB_CONTACT =
  "https://www.facebook.com/groups/499835900084636/user/100008347236212/";
const FB_POST =
  "https://www.facebook.com/groups/499835900084636/?multi_permalinks=27175629448745252";

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
        name: "Handcrafting work · Mogappair East",
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "Handcrafting work · Mogappair East",
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
    .where(
      and(eq(jobPostings.cityId, city.id), eq(jobPostings.slug, JOB_SLUG)),
    )
    .limit(1);

  const now = new Date();
  const validThrough = new Date(now);
  validThrough.setDate(validThrough.getDate() + 90);

  const body = `
Hiring **female staff** for **part-time handcrafting work** at **Mogappair East, Chennai**.

## Role at a glance

- **Open to:** Female candidates only
- **Employment:** Part-time, onsite
- **Start date:** 1 July 2026

## Working hours

**Monday to Friday · 9:30 AM – 2:30 PM**

## Skills & background

- Some **arts and crafts** skills required; **painting experience** is a plus
- **No prior clay experience** needed — full in-house training provided
- Ideal for **housewives** with good art/craft skills, **fine arts students**, or **design graduates**
- Must be a **quick learner** and **trustworthy**

## Location

**Mogappair East, Chennai** — onsite.

## How to apply

Message the employer on Facebook for further details: [contact on Facebook](${FB_CONTACT}).

Original post: [Facebook group listing](${FB_POST}).

Mention that you saw the opening on MyChennaiCity jobs.

**Safety note:** Do **not** pay any upfront “registration” or “security” fee to third parties — verify that you are dealing with the real hiring contact.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Female staff — part-time handcrafting · Mogappair East",
    body,
    locationLabel: "Mogappair East, Chennai",
    status: "open" as const,
    employmentType: "PART_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: FB_CONTACT,
    salaryDisclosed: false,
    openingsCount: 1,
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
