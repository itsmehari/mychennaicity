/**
 * Business development executives — health tech, and digital news.
 * Source note (27 Oct 2026): two domains on one resume desk.
 * 1) Salary + incentives. Health tech company (AI software for doctors,
 *    hospitals, clinics, and patients). No rupee figure.
 * 2) Flat 30% commission. Digital news media company (news bulletin and
 *    local opinions).
 * Resume: sv@cytozon.com. WhatsApp string printed as 635157567 (nine digits).
 * Company legal names, city, street, job type, and seat count unstated.
 * cytozon.com describes Cytozon Technologies at Singanallur, Coimbatore.
 * The note does not place these seats at that office.
 *
 * Dev:  `npm run db:seed:chennai-job:cytozon-bde`
 * Live: `npm run db:seed:chennai-job:cytozon-bde:live`
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

const EMPLOYER_SLUG = "cytozon";
const EMPLOYER_NAME = "Cytozon";
const EMPLOYER_SITE = "https://cytozon.com";
const JOB_SLUG =
  "business-development-executive-health-tech-digital-news-cytozon";
const EMAIL = "sv@cytozon.com";
/** Printed as nine digits. Do not add a digit or a country code. */
const PHONE_PRINTED = "635157567";
const APPLY_MAIL = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Business development executive resume",
)}`;

const body = `
A hiring note asks for **business development executives** in two domains. It does not name either company, a city, a street, or how many seats are open. Send a resume to **[${EMAIL}](mailto:${EMAIL})**.

The mailbox is on **cytozon.com**. That site describes **Cytozon Technologies**, a software firm, and lists **#179, Kothari Nagar, Singanallur, Coimbatore 641005**, with **admin@cytozon.com**. The hiring note does not say these seats are at that office.

## The two openings

### 1. Health tech

- **Role:** Business development executive
- **Company as printed:** Health tech company
- **Product as printed:** Health tech AI software for doctors, hospitals, clinics, and patients
- **Pay as printed:** Salary + incentives. No rupee figure was given.

### 2. Digital news

- **Role:** Business development executive
- **Company as printed:** Digital news media company
- **Work as printed:** News bulletin and local opinions
- **Pay as printed:** Flat 30% commission. No salary figure was given.

The note does not say whether either seat is full-time, part-time, or contract.

## How to apply

Email your resume to **[${EMAIL}](mailto:${EMAIL})**. Say which domain you are applying for, and that you saw the note on MyChennaiCity.

The note also says to WhatsApp a resume to **${PHONE_PRINTED}**. That string is **nine digits**. An Indian mobile number is ten digits. This page prints it as written and does not open a call or WhatsApp button for it. Ask for the full number before you message.

This page is compiled from the hiring note. It is not a Cytozon careers page. Confirm the company name, the city, and the pay before you travel or share documents.

## Common questions

### Who is hiring?

The note describes a health tech company and a digital news media company. It does not print their legal names. Resumes go to ${EMAIL}. The public site for that domain is Cytozon Technologies, and the address on that site is Singanallur, Coimbatore. The note does not say the jobs are at that address.

### What is the pay?

The health tech line says salary plus incentives, with no amount. The news line says a flat 30% commission. This listing does not publish a salary band.

### Where is the job?

The note does not name a city or a street.

### How do I apply?

Email ${EMAIL}. The printed WhatsApp string is ${PHONE_PRINTED}, which is nine digits, so this page does not turn it into a WhatsApp link.
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
        ilike(jobPostings.body, `%${EMAIL}%`),
        ilike(jobPostings.body, `%${PHONE_PRINTED}%`),
        eq(jobPostings.slug, JOB_SLUG),
      ),
    );

  const other = matches.filter((row) => row.slug !== JOB_SLUG);
  if (other.length > 0) {
    console.log("[seed-job] Same email or phone already on another listing. Skipping.");
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
        websiteUrl: EMPLOYER_SITE,
        verified: false,
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
        websiteUrl: EMPLOYER_SITE,
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
    title:
      "Business development executive — health tech and digital news · Cytozon",
    body,
    locationLabel: "City not stated in the note",
    status: "open" as const,
    employmentType: null,
    validThrough,
    applicationUrl: APPLY_MAIL,
    salaryDisclosed: false,
    salaryMin: null,
    salaryMax: null,
    openingsCount: 1,
    remotePolicy: "unstated",
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
