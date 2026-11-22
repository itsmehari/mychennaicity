/**
 * Eshcol Global Services — Trainee Technicians (on contract), Thiruvallur hydraulics plant.
 *
 * Flyer: `public/images/listings/eshcol-trainee-technicians-thiruvallur-november-2026.png`
 * Apply: https://www.eshcolglobal.com/jobs/trainee-technicians/ or resume@eshcolglobal.com
 * (Not WhatsApp — employer request.)
 *
 * Dev:  `npm run db:seed:chennai-job:eshcol-trainee-technicians-thiruvallur`
 * Live: `npm run db:seed:chennai-job:eshcol-trainee-technicians-thiruvallur:live`
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

const EMPLOYER_SLUG = "eshcol-global-services";
const EMPLOYER_NAME = "Eshcol Global Services (P) Ltd";
const WEBSITE = "https://www.eshcolglobal.com/";
const APPLY_URL =
  "https://www.eshcolglobal.com/jobs/trainee-technicians/";
const EMAIL = "resume@eshcolglobal.com";
const EMAIL_APPLY = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Application — Trainee Technician (MyChennaiCity)",
)}`;
const JOB_SLUG =
  "trainee-technicians-eshcol-global-thiruvallur-hydraulics-november-2026";
const FLYER_IMAGE =
  "/images/listings/eshcol-trainee-technicians-thiruvallur-november-2026.png";

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
        ilike(jobPostings.body, "%resume@eshcolglobal.com%"),
        ilike(jobPostings.body, "%Trainee Technicians%Eshcol%"),
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
![Eshcol Global Services hiring flyer — Trainee Technicians on contract, Thiruvallur hydraulics plant](${FLYER_IMAGE})

**Eshcol Global Services (P) Ltd** is hiring **fresh engineering graduates as Trainee Technicians (on contract)** for a **global hydraulics plant in Thiruvallur**, near Chennai. You will be on **Eshcol’s payroll** and work at the **client’s plant** in **Assembly & Testing**, **Quality**, or **Warehouse**.

Most first shop-floor jobs ask for six days a week. This one asks for **five** — **Saturday and Sunday off, every week**.

This is a community listing from the employer’s hiring note and flyer. Confirm the plant address, contract terms, and package with Eshcol before you relocate.

## Role at a glance

| | |
| --- | --- |
| **Role** | Trainee Technician (on contract) |
| **Employer** | Eshcol Global Services (P) Ltd |
| **Workplace** | Client’s global hydraulics plant, Thiruvallur (near Chennai) |
| **Departments** | Assembly & Testing · Quality · Warehouse |
| **Schedule** | Monday–Friday, **8:30 AM – 6:00 PM** (5 days only) |
| **Pay (as printed)** | **₹21,500 / month** gross (~₹19,700 after PF); annual CTC **₹3 LPA+** |
| **Job type** | Contract · onsite |

Experienced candidates: pay is based on experience (confirm with Eshcol).

## Benefits (as printed)

- Learning and skill development on precision hydraulic systems
- Double wages for overtime
- Free breakfast and lunch
- Free transport from city pick-up points
- Provident Fund and bonus
- Medical insurance ₹1 lakh
- Leave benefits
- Free uniform

## Who can apply

- **B.E. / B.Tech:** freshers or 1 to 3 years
- **Diploma:** 3 to 5 years
- Related experience is a plus

**Branches:** Mechanical, EEE, Electrical, Mechatronics, Electromechanical, ECE, EIE, Electrical & Computer, Production / Manufacturing, Industrial.

Open to candidates from **any district in Tamil Nadu** who are willing to **relocate to Chennai or Thiruvallur**.

## How to apply

Apply on the company page or email your CV. **Do not apply on WhatsApp** — Eshcol reads every CV that comes through the page and the inbox.

1. **Apply online:** [eshcolglobal.com/jobs/trainee-technicians](${APPLY_URL})
2. **Email:** **[${EMAIL}](${EMAIL_APPLY})**

Mention that you saw the opening on **MyChennaiCity jobs**.

*Posted by Benjamin Basker, Director, Eshcol Global | SHRM-SCP.*

**Safety note:** Do **not** pay any upfront “registration” or “security” fee to third parties — verify that you are dealing with the real Eshcol Global hiring desk (${EMAIL}).
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Trainee Technicians (on contract) — Eshcol Global, Thiruvallur hydraulics plant",
    body,
    locationLabel:
      "Thiruvallur (client hydraulics plant) · relocate from any TN district",
    status: "open" as const,
    employmentType: "CONTRACTOR",
    validThrough,
    applicationUrl: APPLY_URL,
    salaryDisclosed: true,
    salaryMin: 21_500,
    salaryMax: 21_500,
    salaryUnit: "MONTH",
    openingsCount: 1,
    remotePolicy: "onsite" as const,
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
    label: "seed-chennai-job-eshcol-trainee-technicians-thiruvallur",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
