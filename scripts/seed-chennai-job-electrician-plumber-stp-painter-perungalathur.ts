/**
 * Electrician, plumber, STP operator, and painter — Perungalathur.
 * Note (26 Oct 2026): freshers; 8th to 12th, ITI, DEEE, DME; 23K gross;
 * company, street, job type, and vacancy count unstated; 98411 26069.
 * English only.
 *
 * Dev:  `npm run db:seed:chennai-job:perungalathur-trades`
 * Live: `npm run db:seed:chennai-job:perungalathur-trades:live`
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

const EMPLOYER_SLUG = "perungalathur-trades-hiring";
const EMPLOYER_NAME = "Trades hiring, Perungalathur";
const JOB_SLUG = "electrician-plumber-stp-painter-perungalathur";
const PHONE_DISPLAY = "98411 26069";
const WA_APPLY = `https://wa.me/919841126069?text=${encodeURIComponent(
  "Hello, I am applying for the fresher electrician, plumber, STP operator, or painter opening in Perungalathur. I saw it on MyChennaiCity.",
)}`;

const body = `
A hiring note for **Perungalathur** is looking for **freshers** as an **electrician**, **plumber**, **sewage treatment plant (STP) operator**, or **painter**. The company name, a street, and a vacancy count were not given. Call or WhatsApp **${PHONE_DISPLAY}**.

The pay line is **23K gross** (₹23,000 gross). The note does not say whether that is per month, and it does not print a take-home figure.

## Role at a glance

- **Positions:** Electrician, plumber, STP operator, painter
- **Who can apply:** Freshers
- **Qualification:** 8th to 12th, ITI, DEEE, or DME
- **Pay:** ₹23,000 gross, as printed (pay period not stated)
- **Location:** Perungalathur, Chennai (no door number was printed)
- **Contact:** ${PHONE_DISPLAY}

The note does not say whether these are full-time seats.

## Who can apply

Freshers. The note accepts any of these qualifications:

- Schooling from 8th to 12th
- ITI
- DEEE (diploma in electrical and electronics)
- DME (diploma in mechanical engineering)

It does not say which qualification maps to which trade, and it does not state a minimum number of years beyond fresher.

## How to apply

Call or WhatsApp **${PHONE_DISPLAY}**. Say which of the four trades you are applying for, and that you saw the Perungalathur opening on MyChennaiCity.

This page is compiled from the hiring note. The company name was not on the note.

## Common questions

### Which jobs are open in Perungalathur?

Electrician, plumber, STP operator, and painter. The note says fresher candidates. It does not give a company name, a street, or how many seats are open.

### Who is eligible?

Freshers with schooling from 8th to 12th, or ITI, or DEEE, or DME.

### What is the salary?

The note prints 23K gross. It does not say per month, and it does not give a take-home amount, so this listing does not publish a pay band.

### How do I apply?

Call or WhatsApp ${PHONE_DISPLAY}. Name the trade you want.
`.trim();

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
        ilike(jobPostings.body, "%9841126069%"),
        ilike(jobPostings.body, "%98411 26069%"),
        ilike(jobPostings.applicationUrl, "%919841126069%"),
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
  const validThrough = new Date(now);
  validThrough.setDate(validThrough.getDate() + 90);

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Electrician, plumber, STP operator and painter — Perungalathur",
    body,
    locationLabel: "Perungalathur, Chennai",
    status: "open" as const,
    employmentType: null,
    validThrough,
    applicationUrl: WA_APPLY,
    salaryDisclosed: false,
    salaryMin: null,
    salaryMax: null,
    openingsCount: 1,
    remotePolicy: "onsite" as const,
    updatedAt: now,
  };

  if (existingJob) {
    await db.update(jobPostings).set(values).where(eq(jobPostings.id, existingJob.id));
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
