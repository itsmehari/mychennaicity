/**
 * Bajaj Life Insurance — Insurance Advisor, work from home.
 * Note (12 Nov 2026): freshers and experienced; communication and
 * interpersonal skills; self-motivated and willing to learn. Onboarding,
 * training, Insurance Advisor examination assistance, certification
 * guidance, and career development support. Applicants share name,
 * location, and contact number. Contact 866 706 0737 (phone / WhatsApp).
 * Monthly income opportunity ₹30,000–₹50,000, depending on compensation
 * structure, eligibility, and performance — not a stated salary band.
 * Appointment subject to training, examination, and regulatory requirements.
 * Hours, job type, street, city, and vacancy count are not printed.
 * English only.
 *
 * Dev:  `npm run db:seed:chennai-job:bajaj-life-insurance-advisor`
 * Live: `npm run db:seed:chennai-job:bajaj-life-insurance-advisor:live`
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

const EMPLOYER_SLUG = "bajaj-life-insurance";
const EMPLOYER_NAME = "Bajaj Life Insurance";
const JOB_SLUG = "insurance-advisor-bajaj-life-insurance-work-from-home";
const PHONE_DISPLAY = "866 706 0737";
const PHONE_DIGITS = "918667060737";
const TEL = `tel:+${PHONE_DIGITS}`;
const WA_APPLY = `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(
  "Hi, I saw the Bajaj Life Insurance Advisor role on MyChennaiCity. Name: Location: Contact number:",
)}`;

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
        ilike(jobPostings.body, "%8667060737%"),
        ilike(jobPostings.body, "%866 706 0737%"),
        ilike(jobPostings.applicationUrl, "%918667060737%"),
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
  // 30 days from 12 Nov 2026. Last moment of 12 Dec 2026 IST.
  const validThrough = new Date("2026-12-12T23:59:59+05:30");
  const stillOpen = validThrough.getTime() > now.getTime();

  const body = `
A hiring note from **Bajaj Life Insurance** is looking for **Insurance Advisors**. The note calls it a **work-from-home** opportunity. It does not name a city, a street, hours, or how many seats are open.

## Role

- **Position:** Insurance Advisor
- **Employer (as written):** Bajaj Life Insurance
- **Work mode:** Work from home
- **Contact:** [${PHONE_DISPLAY}](${TEL}) · [WhatsApp](${WA_APPLY})

The note does not say full-time, part-time, or contract.

## What they provide

- Work-from-home opportunity
- Complete onboarding support
- Professional training and guidance
- Insurance Advisor examination assistance
- Guidance through the certification process
- Ongoing career development support

Training and the required Insurance Advisor examination process will be arranged and supported.

## Who can apply

- Freshers and experienced candidates
- Individuals interested in insurance and financial services
- Good communication and interpersonal skills
- Self-motivated individuals willing to learn

## Income

The note prints a **monthly income opportunity of ₹30,000 – ₹50,000**.

Income depends on the applicable compensation structure, eligibility, and performance. That line is an opportunity range, not a fixed salary on this listing.

Appointment is subject to required training, examination, and regulatory requirements.

## How to apply

Share your **name**, **location**, and **contact number** on WhatsApp or by phone: **[${PHONE_DISPLAY}](${TEL})**.

Say you saw the Insurance Advisor opening on MyChennaiCity.

This page is compiled from the hiring note. Confirm you are dealing with Bajaj Life Insurance, and confirm the training, examination, and pay structure, before you pay any fee or share documents.

## Common questions

### Where is the job?

The note says work from home. It does not name a city or a street. Applicants are asked to share their location.

### Who can apply?

Freshers and experienced candidates. The note asks for an interest in insurance and financial services, good communication and interpersonal skills, and people who are self-motivated and willing to learn.

### What is the pay?

The note prints a monthly income opportunity of ₹30,000 – ₹50,000. It also says income depends on the compensation structure, eligibility, and performance. Appointment depends on training, examination, and regulatory requirements.

### How do I apply?

WhatsApp or call ${PHONE_DISPLAY}. Send your name, location, and contact number.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Insurance Advisor — Bajaj Life Insurance (work from home)",
    body,
    locationLabel: "Work from home",
    status: (stillOpen ? "open" : "closed") as "open" | "closed",
    employmentType: null,
    validThrough,
    applicationUrl: WA_APPLY,
    salaryDisclosed: false,
    salaryMin: null,
    salaryMax: null,
    openingsCount: 1,
    remotePolicy: "remote" as const,
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
