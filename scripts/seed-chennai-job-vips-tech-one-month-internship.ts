/**
 * VIPS.Tech / Socio Cloud — one-month student internship (Red Hills / online).
 * Source: WhatsApp from +91 861 029 3565 (13 Oct 2026) plus the contact block
 * the editor supplied for publication. Website checked: https://vipstech.in/
 *
 * Address and email on the site terms page do not match the WhatsApp /
 * homepage block. Both are printed. No stipend, fee, start date, or
 * registration URL was confirmed.
 *
 * Dev:  `npm run db:seed:chennai-job:vips-tech-internship`
 * Live: `npm run db:seed:chennai-job:vips-tech-internship:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
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

const EMPLOYER_SLUG = "vips-tech-chennai";
const EMPLOYER_NAME = "VIPS.Tech";
const JOB_SLUG = "vips-tech-one-month-internship-chennai-2026";
const WEBSITE = "https://vipstech.in/";
const APPLY_EMAIL = "info@vipstech.in";
const MAILTO = `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(
  "VIPS.Tech one-month internship — student enquiry",
)}`;

const BODY = `
**VIPS.Tech** says it is taking engineering and arts and science students for a **one-month internship**, online or at Red Hills, under the name **Socio Cloud**.

## Domains they named

- Artificial intelligence and machine learning
- Full stack development
- Cyber security and ethical hacking
- Data science and analytics
- UI/UX and graphic design
- Internet of Things (IoT)
- Cloud computing
- Game development

They say the month includes project work, guidance from people in the trade, and a **certificate if you finish**. They have **not** stated a stipend, a fee, or a start date.

## Where they say they sit

The representative gave this address:

**80 Feet Road, Edapalayam, Red Hills, Nallur, Chennai, Tamil Nadu 600067**

The terms page on [vipstech.in](${WEBSITE}) prints a different address: **43, Netaji Nagar, Tondiarpet, Chennai 600081**. Ask which door you would use before you travel.

## How to apply

There is **no registration link** on this listing. Write to them and ask for the schedule, whether any fee is charged, and which address is current.

- Email **[${APPLY_EMAIL}](${MAILTO})**
- The terms page also prints **info@vips.tech** — confirm which inbox they read
- Phone **+91 99621 06567** or **+91 73053 37964**
- Website **[${WEBSITE}](${WEBSITE})**

Mention that you saw the opening on MyChennaiCity jobs.

**Safety note:** Do **not** pay a registration or training fee until the fee, the certificate, and the address are confirmed in writing. This listing does not print a stipend.

This page is compiled from the programme representative and the public site. It is not an official careers page.
`.trim();

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
        name: EMPLOYER_NAME,
        websiteUrl: WEBSITE,
        verified: false,
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed:", EMPLOYER_SLUG);
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
    .where(
      and(eq(jobPostings.cityId, city.id), eq(jobPostings.slug, JOB_SLUG)),
    )
    .limit(1);

  const now = new Date();
  const validThrough = istToUtcDate(2026, 12, 31, 23, 59);

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "VIPS.Tech one-month internship — Red Hills and online",
    body: BODY,
    locationLabel: "Red Hills, Chennai",
    status: "open" as const,
    employmentType: "INTERN",
    validThrough,
    publishedAt: existingJob ? undefined : now,
    applicationUrl: MAILTO,
    salaryDisclosed: false,
    salaryMin: null,
    salaryMax: null,
    openingsCount: 1,
    remotePolicy: "hybrid" as const,
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
      publishedAt: now,
      createdAt: now,
    });
    console.log("[seed-job] Inserted open job:", JOB_SLUG);
  }

  console.log("[seed-job] Detail:", `/chennai-jobs/${JOB_SLUG}`);
  await finishListingSeedLive({
    jobSlug: JOB_SLUG,
    label: "seed-job-vips-tech-internship",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
