/**
 * GIOS — Sales Engineer (Inside Sales), solar · Madhavaram.
 *
 * Flyer: `public/images/listings/gios-sales-engineer-inside-sales-madhavaram.png`
 *
 * Dev:  `npm run db:seed:chennai-job:gios-sales-engineer-inside-sales-madhavaram`
 * Live: `npm run db:seed:chennai-job:gios-sales-engineer-inside-sales-madhavaram:live`
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

const EMPLOYER_SLUG = "gios-solar-madhavaram";
const JOB_SLUG = "sales-engineer-inside-sales-gios-solar-madhavaram";

const FLYER = "/images/listings/gios-sales-engineer-inside-sales-madhavaram.png";
const HR_NAME = "Bhuvanesh (HR)";
const PHONE_DISPLAY = "88709 05988";
const EMAIL = "BHUVANESH@GIOS.IN";
const EMAIL_APPLY = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Application — Sales Engineer (Inside Sales) · Madhavaram",
)}`;
const WA_APPLY = `https://wa.me/918870905988?text=${encodeURIComponent(
  "Hi Bhuvanesh, I saw the Sales Engineer (Inside Sales) role at GIOS on MyChennaiCity jobs. I would like to apply.",
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
        name: "GIOS · Solar",
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "GIOS · Solar",
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
![Hiring flyer — Sales Engineer (Inside Sales), solar, Madhavaram](${FLYER})

**Hiring: Sales Engineer (Inside Sales)** — **solar industry**, **Madhavaram, Chennai**. The flyer contact is **${HR_NAME}** at **GIOS** (email domain gios.in).

## Experience

**Freshers** or up to **3 years** in:

- Solar product sales
- Tele sales — lead generation / cold calling

## Role details

| | |
| --- | --- |
| **Type** | Permanent, full-time |
| **Industry** | Solar |
| **Gender** | Male / Female (as on flyer) |
| **CTC** | Up to **₹4.8 LPA** (confirm break-up with HR) |

## Languages

- **Mandatory:** English & Tamil
- **Additional:** Telugu, Hindi, or Malayalam — **according to the region you handle** (as on flyer)

## Benefits (as on flyer)

**Accommodation** and **cab** available — confirm eligibility and terms with HR.

## Location

**Madhavaram, Chennai** — inside sales / office-based role (not field sales on the flyer).

## How to apply

- **Phone / WhatsApp:** **${PHONE_DISPLAY}** — **${HR_NAME}**
- **Email:** [${EMAIL}](mailto:${EMAIL})

Send your updated resume. Mention that you saw the opening on MyChennaiCity jobs.

**Safety note:** Do **not** pay registration or security fees to third parties — verify you are dealing with the real hiring contact.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Sales Engineer (Inside Sales) · GIOS Solar · Madhavaram",
    body,
    locationLabel: "Madhavaram, Chennai",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: WA_APPLY,
    salaryDisclosed: true,
    salaryMin: null as number | null,
    salaryMax: 480_000,
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
  console.log("[seed-job] Email apply:", EMAIL_APPLY);
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
