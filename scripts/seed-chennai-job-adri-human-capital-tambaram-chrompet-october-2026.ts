/**
 * Adri Human Capital — accountant, cashier, and EV sales telecaller roles,
 * Tambaram / Chrompet, Chennai.
 * Poster (23 Oct 2026): Junior Accountant 0–2 years, Senior Accountant 3–6 years,
 * Cashier 1–2 years, Telecallers – EV Sales 0–2 years. Resume by email or
 * WhatsApp. Salary, street, client, and vacancy count unstated. English only.
 *
 * Flyer: `public/images/listings/adri-human-capital-hiring-tambaram-chrompet-october-2026.png`
 *
 * Dev:  `npm run db:seed:chennai-job:adri-human-capital-tambaram`
 * Live: `npm run db:seed:chennai-job:adri-human-capital-tambaram:live`
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

const EMPLOYER_SLUG = "adri-human-capital";
const EMPLOYER_NAME = "Adri Human Capital";
const JOB_SLUG =
  "adri-human-capital-accountant-cashier-telecaller-tambaram-chrompet";
const FLYER =
  "/images/listings/adri-human-capital-hiring-tambaram-chrompet-october-2026.png";
const EMAIL = "adrihumancapital@gmail.com";
const PHONE_DISPLAY = "+91 79043 53832";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Application — Adri Human Capital, Tambaram / Chrompet",
)}`;

function waApply(text: string) {
  return `https://wa.me/917904353832?text=${encodeURIComponent(text)}`;
}

const WA = waApply(
  "Hello, I am sharing my updated resume for the Adri Human Capital openings in Tambaram / Chrompet. I saw the notice on MyChennaiCity.",
);

const body = `
**Adri Human Capital** is hiring a junior accountant, a senior accountant, a cashier, and EV sales telecallers in **Tambaram / Chrompet, Chennai**.

![Adri Human Capital hiring poster — accountant, cashier, and EV sales telecaller roles in Tambaram and Chrompet](${FLYER})

## Roles on the poster

| Role | Experience |
| --- | --- |
| Junior Accountant | 0–2 years |
| Senior Accountant | 3–6 years |
| Cashier | 1–2 years |
| Telecallers – EV Sales | 0–2 years |

The poster asks candidates with relevant experience and good communication skills to apply. It does not name a client company, and it does not print a qualification, a shift, a pay figure, or a vacancy count.

## Location

Tambaram / Chrompet, Chennai. A door number or office address is not on the poster.

## How to apply

1. Email an updated resume to **[${EMAIL}](${MAILTO})**.
2. Or WhatsApp **[${PHONE_DISPLAY}](${WA})**.

Say which role you are applying for, and that you saw the notice on MyChennaiCity.

This page is compiled from the Adri Human Capital poster. It is not an Adri Human Capital careers page.

## Common questions

### Which jobs is Adri Human Capital hiring for in Tambaram and Chrompet?

Junior Accountant (0–2 years), Senior Accountant (3–6 years), Cashier (1–2 years), and Telecallers for EV sales (0–2 years). The poster also asks for relevant experience and good communication skills.

### What is the salary?

The poster does not state a salary, so this listing does not publish a pay band.

### How do I apply?

Email an updated resume to ${EMAIL}, or WhatsApp ${PHONE_DISPLAY}. The poster does not give a street address.
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
        ilike(jobPostings.body, "%7904353832%"),
        ilike(jobPostings.body, "%79043 53832%"),
        ilike(jobPostings.applicationUrl, "%917904353832%"),
        ilike(jobPostings.body, "%adrihumancapital@gmail.com%"),
        ilike(jobPostings.applicationUrl, "%adrihumancapital@gmail.com%"),
      ),
    );

  const other = matches.filter((row) => row.slug !== JOB_SLUG);
  if (other.length > 0) {
    console.log("[seed-job] Same phone or email already on another listing. Skipping.");
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

  const [existingEmp] = await db
    .select({ id: employers.id })
    .from(employers)
    .where(eq(employers.slug, EMPLOYER_SLUG))
    .limit(1);

  let employerId: string;
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
  const status =
    validThrough.getTime() > now.getTime()
      ? ("open" as const)
      : ("closed" as const);

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Accountant, cashier & EV telecaller · Tambaram / Chrompet",
    body,
    locationLabel: "Tambaram / Chrompet, Chennai",
    status,
    employmentType: null,
    validThrough,
    applicationUrl: MAILTO,
    salaryDisclosed: false,
    salaryMin: null,
    salaryMax: null,
    openingsCount: 1,
    remotePolicy: "onsite" as const,
    updatedAt: now,
  };

  if (existingJob) {
    await db.update(jobPostings).set(values).where(eq(jobPostings.id, existingJob.id));
    console.log("[seed-job] Refreshed job:", JOB_SLUG, status);
  } else {
    await db.insert(jobPostings).values({
      ...values,
      publishedAt: now,
      createdAt: now,
    });
    console.log("[seed-job] Inserted job:", JOB_SLUG, status);
  }

  console.log("[seed-job] EN:", `/chennai-jobs/${JOB_SLUG}`);
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
