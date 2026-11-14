/**
 * Pre-opening team for a café in Chennai.
 * Poster (14 Nov 2026): Management (Restaurant Manager, Community Manager),
 * Service (F & B Executive, Captain, Waiter/Waitress, Hostess), Barista
 * (Barista, Asst. Barista). Perks: competitive salary, health and safety,
 * meals provided, paid leaves and holidays, growth and learning, a
 * supportive and fun work culture, perks as per industry standards.
 * Contact the HR Manager on +91 95142 45396. Café name, street, hours,
 * job type, vacancy count, and a rupee figure are not printed.
 * The phone icon is a call, not WhatsApp. English only.
 *
 * Flyer: `public/images/listings/cafe-chennai-pre-opening-team-hiring-2026.jpg`
 *
 * Dev:  `npm run db:seed:chennai-job:cafe-chennai-pre-opening`
 * Live: `npm run db:seed:chennai-job:cafe-chennai-pre-opening:live`
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

const EMPLOYER_SLUG = "cafe-chennai-pre-opening-note";
const EMPLOYER_NAME = "Hiring note, café in Chennai";
const JOB_SLUG = "pre-opening-team-cafe-chennai";
const FLYER =
  "https://raw.githubusercontent.com/itsmehari/mychennaicity/main/public/images/listings/cafe-chennai-pre-opening-team-hiring-2026.jpg";
const PHONE_DISPLAY = "+91 95142 45396";
const PHONE_DIGITS = "919514245396";
const TEL = `tel:+${PHONE_DIGITS}`;

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
        ilike(jobPostings.body, "%9514245396%"),
        ilike(jobPostings.body, "%95142 45396%"),
        ilike(jobPostings.applicationUrl, "%919514245396%"),
      ),
    );

  const other = matches.filter((row) => row.slug !== JOB_SLUG);
  if (other.length > 0) {
    console.log("[seed-job] Same phone already on another listing. Skipping.");
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
  // 30 days from 14 Nov 2026. Last moment of 14 Dec 2026 IST.
  const validThrough = new Date("2026-12-14T23:59:59+05:30");
  const stillOpen = validThrough.getTime() > now.getTime();

  const body = `
A hiring poster is looking for a **pre-opening team for a café in Chennai**. The poster does not name the café or a street.

![Hiring poster — pre-opening team for a café in Chennai](${FLYER})

The poster says: “We’re hiring.” “Be a part of something special.” “Good food, great people.” “Great coffee builds great teams.” “If you love coffee, people and good vibes, this is for you.” “Good food, great career.”

## Roles

The poster lists these titles together. Pay, place, and vacancies are not split by title.

**Management**

- Restaurant Manager
- Community Manager

**Service**

- F & B Executive
- Captain
- Waiter/Waitress
- Hostess

**Barista**

- Barista
- Asst. Barista

- **Place:** a café in Chennai
- **Contact:** HR Manager, [${PHONE_DISPLAY}](${TEL})

The poster does not say full-time, part-time, contract, hours, or how many seats are open for each title.

## Perks the poster lists

- Competitive salary
- Health and safety
- Meals provided
- Paid leaves and holidays
- Growth and learning opportunities
- A supportive and fun work culture
- Perks as per industry standards

The poster prints no rupee figure for the salary or the perks.

## How to apply

The poster says: interested candidates should contact the HR Manager.

Call **[${PHONE_DISPLAY}](${TEL})**.

Say you are applying for the pre-opening café team in Chennai, and that you saw the poster on MyChennaiCity.

This page is compiled from the hiring poster. Confirm the café name, the street, the role, and the pay before you join.

## Common questions

### Which café is hiring?

The poster says a café in Chennai. The café name and the street are not printed.

### Which roles are open?

Restaurant Manager, Community Manager, F & B Executive, Captain, Waiter/Waitress, Hostess, Barista, and Asst. Barista. The poster does not say how many seats are open.

### What is the pay?

The poster says competitive salary, and perks as per industry standards. No rupee figure is printed.

### What else is offered?

Health and safety, meals provided, paid leaves and holidays, growth and learning opportunities, and a supportive and fun work culture.

### How do I apply?

Call the HR Manager on ${PHONE_DISPLAY}.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Pre-opening team — café in Chennai",
    body,
    locationLabel: "Chennai (street not stated)",
    status: (stillOpen ? "open" : "closed") as "open" | "closed",
    employmentType: null,
    validThrough,
    applicationUrl: TEL,
    salaryDisclosed: false,
    salaryMin: null,
    salaryMax: null,
    openingsCount: 1,
    remotePolicy: "unspecified" as const,
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
