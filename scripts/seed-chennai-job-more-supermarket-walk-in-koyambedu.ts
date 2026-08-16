/**
 * More supermarket — Store Manager / Duty Manager walk-in (Koyambedu, 24 Aug 2026).
 *
 * Flyer: `public/images/listings/more-supermarket-walk-in-koyambedu-aug-2026.png`
 *
 * Dev:  `npm run db:seed:chennai-job:more-supermarket-walk-in-koyambedu`
 * Live: `npm run db:seed:chennai-job:more-supermarket-walk-in-koyambedu:live` — uses `.env.production.local`
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

const EMPLOYER_SLUG = "more-retail";
const JOB_SLUG =
  "more-supermarket-store-duty-manager-walk-in-koyambedu-aug-2026";

const WEBSITE = "https://moreretail.in/";
const CAREERS = "https://more.in/careers";
const PHONE_1 = "91108 67199";
const PHONE_2 = "95918 91671";
const WA_APPLY = `https://wa.me/919110867199?text=${encodeURIComponent(
  "Hi, I saw the More supermarket Store Manager / Duty Manager walk-in (Koyambedu, 24 Aug 2026) on MyChennaiCity and would like to attend. Please share the next step.",
)}`;

const FLYER_IMAGE =
  "/images/listings/more-supermarket-walk-in-koyambedu-aug-2026.png";

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
        name: "More Your Supermarket",
        websiteUrl: WEBSITE,
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "More Your Supermarket",
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
  const validThrough = new Date("2026-08-24T17:00:00+05:30");

  const body = `
![More supermarket walk-in interview flyer — Store Manager and Duty Manager, Hotel Royal Plaza Koyambedu, 24 August 2026](${FLYER_IMAGE})

**More** (*More Your Supermarket* / More Retail) is holding a **walk-in interview** in Koyambedu for **Store Manager** and **Duty Manager** roles. Hiring is for stores in **Chennai, Pondicherry (Puducherry), Vellore, Thiruvannamalai**, and other locations across Tamil Nadu.

This is a community listing from the employer’s walk-in flyer — confirm time, venue, and documents with the hiring contacts before you travel. Official careers page: [more.in/careers](${CAREERS}).

## Walk-in details

- **Date:** Monday, **24 August 2026**
- **Time:** **10:00 AM to 5:00 PM**
- **Venue:** Hotel Royal Plaza Koyambedu
- **Landmark:** Opposite the flower market, near the Omni Bus Stand
- **Address:** E Road, Thiruvalluvar Street, Omni Bus Terminus, Virugambakkam, Koyambedu, Chennai 600107

## Open positions

- **Store Manager**
- **Duty Manager**

## Posting locations

Roles may be based in **Chennai**, **Pondicherry (Puducherry)**, **Vellore**, **Thiruvannamalai**, and other More stores across Tamil Nadu. Confirm your posting with the hiring team at the walk-in.

## What the flyer highlights

- Grow with the brand
- Career opportunities in supermarket retail
- Learn and develop on the job
- Attractive benefits (confirm the package at interview — salary is not printed on the flyer)

## How to apply

Walk in on **24 August 2026** between **10:00 AM and 5:00 PM**, or call / WhatsApp first:

- **${PHONE_1}** — [WhatsApp](${WA_APPLY}) or [call](tel:+919110867199)
- **${PHONE_2}** — [call](tel:+919591891671)

Mention that you saw the opening on MyChennaiCity jobs.

**Safety note:** Do **not** pay any upfront “registration” or “security” fee to third parties — verify that you are dealing with the real More hiring contact.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Store Manager / Duty Manager — More supermarket walk-in (Koyambedu · 24 Aug 2026)",
    body,
    locationLabel:
      "Walk-in at Koyambedu · hiring for Chennai, Pondicherry, Vellore, Thiruvannamalai & TN",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: WA_APPLY,
    salaryDisclosed: false,
    openingsCount: 2,
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
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
