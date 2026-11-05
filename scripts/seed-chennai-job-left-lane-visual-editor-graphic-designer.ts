/**
 * Visual Editor and Graphic Designer — Left Lane, Kodambakkam.
 * Poster (5 Nov 2026): both roles; minimum 2 years; tool marks for
 * Premiere Pro, DaVinci Resolve, Photoshop, and After Effects.
 * Apply: careers@blackmirrormedia.in and +91 98887 62228.
 * The caption places the roles in Kodambakkam, Chennai. The poster logo
 * reads Left Lane. The mailbox domain is not printed as a second company name.
 * Pay, hours, job type, degree, street, and vacancy count are not printed.
 * English only.
 *
 * Flyer: `public/images/listings/left-lane-visual-editor-graphic-designer-kodambakkam-2026.png`
 *
 * Dev:  `npm run db:seed:chennai-job:left-lane-visual-editor-graphic-designer`
 * Live: `npm run db:seed:chennai-job:left-lane-visual-editor-graphic-designer:live`
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

const EMPLOYER_SLUG = "left-lane";
const EMPLOYER_NAME = "Left Lane";
const JOB_SLUG = "visual-editor-graphic-designer-left-lane-kodambakkam";
const FLYER =
  "/images/listings/left-lane-visual-editor-graphic-designer-kodambakkam-2026.png";
const EMAIL = "careers@blackmirrormedia.in";
const PHONE_DISPLAY = "+91 98887 62228";
const TEL = "tel:+919888762228";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Application — Visual Editor / Graphic Designer, Left Lane, Kodambakkam",
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
        ilike(jobPostings.body, "%9888762228%"),
        ilike(jobPostings.body, "%98887 62228%"),
        ilike(jobPostings.body, "%careers@blackmirrormedia.in%"),
        ilike(jobPostings.applicationUrl, "%919888762228%"),
        ilike(jobPostings.applicationUrl, "%careers@blackmirrormedia.in%"),
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
**Left Lane** is hiring a **Visual Editor** and a **Graphic Designer** in **Kodambakkam, Chennai**. Both roles ask for a **minimum of 2 years** of experience. The poster logo reads Left Lane. The apply mailbox is **${EMAIL}**.

![Left Lane poster — Visual Editor and Graphic Designer, Kodambakkam](${FLYER})

## Roles

- **Positions:** Visual Editor; Graphic Designer
- **Experience:** Minimum 2 years
- **Place:** Kodambakkam, Chennai (no street)
- **Tools on the poster:** Premiere Pro, DaVinci Resolve, Photoshop, After Effects
- **Email:** [${EMAIL}](mailto:${EMAIL})
- **Phone:** [${PHONE_DISPLAY}](${TEL})

The poster does not name pay, hours, full-time or contract, a degree, or how many seats are open. The photograph of a hand on a tablet is not a gender rule.

## What they ask for

- Minimum 2 years of experience, printed once under both role titles
- The poster shows the Premiere Pro, DaVinci Resolve, Photoshop, and After Effects marks

## Pay

Pay is **not stated** on the poster.

## How to apply

Email your resume to **[${EMAIL}](${MAILTO})**, or call **[${PHONE_DISPLAY}](${TEL})**.

Say which role you are applying for — Visual Editor or Graphic Designer — at Left Lane in Kodambakkam, and that you saw it on MyChennaiCity.

This page is compiled from the hiring poster and the post caption. Confirm the workplace, the tool list, and the pay before you join.

## Common questions

### Where is the job?

Kodambakkam, Chennai. The post does not print a street or a door number.

### Who can apply?

A visual editor or a graphic designer with a minimum of 2 years of experience. The poster shows Premiere Pro, DaVinci Resolve, Photoshop, and After Effects.

### What is the pay?

The poster does not print a salary.

### How do I apply?

Email ${EMAIL} or call ${PHONE_DISPLAY}.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Visual Editor and Graphic Designer — Left Lane, Kodambakkam",
    body,
    locationLabel: "Kodambakkam, Chennai",
    status: (stillOpen ? "open" : "closed") as "open" | "closed",
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
