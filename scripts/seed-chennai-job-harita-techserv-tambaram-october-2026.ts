/**
 * Harita Techserv — physical interview for mechanical and electrical roles,
 * Igarashi Motors India Limited, MEPZ-SEZ Tambaram.
 * Poster (23 Oct 2026): Saturday 24 October 2026, 11:00 AM–4:00 PM.
 * Male candidates only, as printed. Passing year 2024–2026. Experience 0–5 years,
 * with a separate Tool Room line of 8–10 years. No salary. No calls —
 * WhatsApp message only. QR opens the Igarashi Motors (Harita Techserv)
 * Google application form. English only. Vacancy count unstated.
 *
 * Flyer: `public/images/listings/harita-techserv-physical-interview-tambaram-october-2026.jpg`
 *
 * Dev:  `npm run db:seed:chennai-job:harita-techserv-tambaram`
 * Live: `npm run db:seed:chennai-job:harita-techserv-tambaram:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq, ilike, or } from "drizzle-orm";
import { finishListingSeedLive, istToUtcDate } from "./lib/seed-event-shared";
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

const EMPLOYER_SLUG = "harita-techserv";
const EMPLOYER_NAME = "Harita Techserv";
const JOB_SLUG =
  "harita-techserv-mechanical-electrical-walk-in-tambaram-october-2026";
const FLYER =
  "/images/listings/harita-techserv-physical-interview-tambaram-october-2026.jpg";
const PHONE_DISPLAY = "96295 34066";
const APPLY_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLScySxlFxSwtkjYc1vsvrub9wfnoHFUk9byg7QUoYSmbEATzyQ/viewform";

function waApply(text: string) {
  return `https://wa.me/919629534066?text=${encodeURIComponent(text)}`;
}

const WA = waApply(
  "Hello Idhaya / Ancy, I am writing about the Harita Techserv physical interview on Saturday 24 October 2026 at Igarashi Motors, MEPZ Tambaram. I saw the opening on MyChennaiCity.",
);

const body = `
**Harita Techserv** is holding a **direct physical interview** on **Saturday, 24 October 2026**, **11:00 AM to 4:00 PM**, at **Igarashi Motors India Limited**, MEPZ-SEZ, Tambaram. The poster is for **mechanical and electrical** shop-floor roles. The poster says **male candidates only**.

The flyer QR opens the [Igarashi Motors (Harita Techserv) application form](${APPLY_FORM}). The same poster asks eligible candidates to attend in person with the documents listed below. Contact on the poster is **Idhaya** and **Ancy**, WhatsApp **${PHONE_DISPLAY}**. The poster says **no calls** — WhatsApp message only.

![Harita Techserv physical interview poster — mechanical and electrical roles, Igarashi Motors, MEPZ Tambaram, 24 October 2026](${FLYER})

## Interview

- **Date:** Saturday, **24 October 2026**
- **Time:** **11:00 AM – 4:00 PM**
- **Type:** Direct physical interview
- **Venue:** Igarashi Motors India Limited (Harita Techserv)
- **Address:** Plot No. B-12 to B-15, Phase II, MEPZ-SEZ, Tambaram, Chennai 600045

## Who the poster asks for

- **Experience:** 0–5 years
- **Eligible candidates:** Male candidates only
- **Passing year:** 2024–2026
- **Eligibility:** No active arrears

**Educational qualifications, as printed:**

1. B.E. (Mechanical / Electrical)
2. Diploma
3. ITI (any trade)
4. Diploma in Mechanical Engineering — Tool Room (**8–10 years** of experience)

The 0–5 year line and the Tool Room 8–10 year line are both on the poster. The Tool Room qualification carries its own experience band.

The poster does not print a salary or a vacancy count.

## Job roles on the poster

- Mechanical / Electrical Maintenance
- Electrician
- Fitter
- Turner
- Machine Operator
- Tool Room
- Quality Assurance / Quality Control (QA/QC)
- Welder
- Research & Development (R&D)
- Machinist

## Documents and instructions

1. Interview call letter
2. Updated resume
3. ID proof
4. Educational certificates — original and photocopies
5. Latest payslip, if applicable
6. Dress code: formal attire with shoes

The poster asks interested and eligible candidates to attend with these documents. The poster does not say how the interview call letter is issued. Fill the application form, and message Idhaya or Ancy on WhatsApp if you need that letter before you travel.

## How to apply

1. Fill the [Igarashi Motors (Harita Techserv) application form](${APPLY_FORM}) (the QR on the flyer). The form asks for name, email, contact number, highest qualification, year of passing, years of experience, arrears, current location, and whether you are available for the Saturday interview. Its welcome line says the details are for initial screening and that only shortlisted candidates will be contacted for the next stage.
2. Or WhatsApp **[${PHONE_DISPLAY}](${WA})** — **Idhaya** and **Ancy**. The poster says no calls.

Say you saw the opening on MyChennaiCity.

This page is compiled from the Harita Techserv poster and the form behind its QR. The listing is a community page, separate from an Igarashi Motors careers page.

## Common questions

### Who can attend the Harita Techserv interview in Tambaram?

The poster says male candidates only, passing year 2024–2026, no active arrears, and 0–5 years of experience. Qualifications listed are B.E. (Mechanical / Electrical), Diploma, ITI (any trade), and a Diploma in Mechanical Engineering — Tool Room line that asks for 8–10 years.

### When and where is the interview?

Saturday, 24 October 2026, 11:00 AM to 4:00 PM, at Igarashi Motors India Limited (Harita Techserv), Plot No. B-12 to B-15, Phase II, MEPZ-SEZ, Tambaram, Chennai 600045. The poster calls the session a direct physical interview.

### How do I apply, and can I call?

Use the application form linked from the flyer QR, or WhatsApp ${PHONE_DISPLAY} (Idhaya and Ancy). The poster says no calls — message only. Bring an updated resume, ID proof, original certificates and photocopies, a payslip if you have one, and an interview call letter. Dress code on the poster is formal attire with shoes.
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
        ilike(jobPostings.body, "%9629534066%"),
        ilike(jobPostings.body, "%96295 34066%"),
        ilike(jobPostings.applicationUrl, "%919629534066%"),
        ilike(jobPostings.body, "%1FAIpQLScySxlFxSwtkjYc1vsvrub9wfnoHFUk9byg7QUoYSmbEATzyQ%"),
      ),
    );

  const other = matches.filter((row) => row.slug !== JOB_SLUG);
  if (other.length > 0) {
    console.log("[seed-job] Same phone or form already on another listing. Skipping.");
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
  const validThrough = istToUtcDate(2026, 10, 24, 16, 0);
  const status =
    validThrough.getTime() > now.getTime()
      ? ("open" as const)
      : ("closed" as const);

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Mechanical & electrical roles — Harita Techserv walk-in, Tambaram (24 Oct 2026)",
    body,
    locationLabel: "MEPZ-SEZ, Tambaram, Chennai",
    status,
    employmentType: null,
    validThrough,
    applicationUrl: APPLY_FORM,
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
