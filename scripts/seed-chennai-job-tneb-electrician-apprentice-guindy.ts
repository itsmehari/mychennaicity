/**
 * TNEB electrician apprentice — Guindy, Chennai.
 * Source note (5 Nov 2026): any qualification; experience in electrical
 * work / electrician field; take-home ₹18,000–₹25,000 per month; ESI, PF,
 * insurance, weekly off; permanent employment; contact 95511 39825.
 * Company name, street, hours, and vacancy count were not given.
 * English only.
 *
 * The same mobile is already on a different role:
 * /chennai-jobs/electrician-it-maintenance-perungudi-taramani-ambattur
 *
 * Dev:  `npm run db:seed:chennai-job:tneb-electrician-apprentice-guindy`
 * Live: `npm run db:seed:chennai-job:tneb-electrician-apprentice-guindy:live`
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

const EMPLOYER_SLUG = "tneb-electrician-apprentice-guindy-note";
const EMPLOYER_NAME = "Hiring note, Guindy";
const JOB_SLUG = "tneb-electrician-apprentice-guindy";
const SISTER_SLUG = "electrician-it-maintenance-perungudi-taramani-ambattur";
const PHONE_DISPLAY = "95511 39825";
const TEL = "tel:+919551139825";
const WA_APPLY = `https://wa.me/919551139825?text=${encodeURIComponent(
  "Hi, I saw the TNEB electrician apprentice opening in Guindy on MyChennaiCity and would like to apply.",
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
        ilike(jobPostings.body, "%9551139825%"),
        ilike(jobPostings.body, "%95511 39825%"),
        ilike(jobPostings.applicationUrl, "%919551139825%"),
      ),
    );

  const other = matches.filter(
    (row) => row.slug !== JOB_SLUG && row.slug !== SISTER_SLUG,
  );
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
  // 30 days from 5 Nov 2026. Last moment of 5 Dec 2026 IST.
  const validThrough = new Date("2026-12-05T23:59:59+05:30");
  const stillOpen = validThrough.getTime() > now.getTime();

  const body = `
A hiring note is looking for a **TNEB electrician apprentice** in **Guindy, Chennai**. The note does not name a company, a TNEB office, or a street. This is not an official TNEB or TANGEDCO careers notice. The same mobile is also on a separate listing: [electrician — IT company maintenance, Perungudi, Taramani, and Ambattur](/chennai-jobs/${SISTER_SLUG}).

## Role

- **Position:** TNEB electrician apprentice
- **Place:** Guindy, Chennai (no door number or street)
- **Education:** Any qualification
- **Experience:** Experience in electrical work / electrician field
- **Employment:** Permanent employment, as printed
- **Pay:** Take-home ₹18,000 – ₹25,000 per month
- **Benefits:** ESI, PF, insurance, and a weekly off
- **Contact:** [+91 ${PHONE_DISPLAY}](${TEL})

The note does not name hours, a shift clock, age, or how many seats are open. It does not say full-time, part-time, or contract. It says permanent employment and apprentice in the same note.

## Pay

**Take-home ₹18,000 – ₹25,000 per month**, as printed.

## How to apply

Call or WhatsApp **[+91 ${PHONE_DISPLAY}](${TEL})**.

Say you are applying for the TNEB electrician apprentice role in Guindy, and that you saw it on MyChennaiCity.

This page is compiled from the hiring note. Confirm the workplace, whether the seat is an apprenticeship or a permanent job, the weekly off, and the take-home pay before you join.

## Common questions

### Where is the job?

Guindy, Chennai. No company name, TNEB office, or street was given.

### Who can apply?

Any qualification, with experience in electrical work or the electrician field.

### What is the pay, and is it permanent?

Take-home ₹18,000 to ₹25,000 per month. The note says permanent employment, and the role title says apprentice. ESI, PF, insurance, and a weekly off are listed. Confirm both the title and the employment line with the contact before you join.

### How do I apply?

Call or WhatsApp +91 ${PHONE_DISPLAY}.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "TNEB electrician apprentice — Guindy, Chennai",
    body,
    locationLabel: "Guindy, Chennai",
    status: (stillOpen ? "open" : "closed") as "open" | "closed",
    employmentType: null,
    validThrough,
    applicationUrl: WA_APPLY,
    salaryDisclosed: true,
    salaryMin: 18_000,
    salaryMax: 25_000,
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

  console.log("[seed-job] Done. Detail:", `/chennai-jobs/${JOB_SLUG}`);
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
