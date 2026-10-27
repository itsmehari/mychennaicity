/**
 * BALBHAS — service desk engineer (fresher), TVH Agnitio IT Park, Perungudi.
 *
 * Dev:  `npm run db:seed:chennai-job:balbhas-service-desk`
 * Live: `npm run db:seed:chennai-job:balbhas-service-desk:live`
 *
 * Short link https://forms.gle/XvgeS58vgeT2JaX6A resolves to FORM below.
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

const EMPLOYER_SLUG = "balbhas";
const JOB_SLUG = "service-desk-engineer-fresher-balbhas-perungudi";
const FORM_SHORT = "https://forms.gle/XvgeS58vgeT2JaX6A";
const FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSed71qFcR8ARXCLvO1FemivaDees5Os6eGxNOmnHUxyIT9yXw/viewform?usp=send_form";

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
        ilike(jobPostings.title, "%BALBHAS%"),
        and(
          ilike(jobPostings.body, "%BALBHAS%"),
          ilike(jobPostings.body, "%Service desk%"),
        ),
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
    console.error("City slug 'chennai' not found.");
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
      .set({ name: "BALBHAS", updatedAt: new Date() })
      .where(eq(employers.id, employerId));
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "BALBHAS",
        slug: EMPLOYER_SLUG,
        verified: false,
      })
      .returning({ id: employers.id });
    employerId = ins.id;
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
**BALBHAS** is hiring a **service desk engineer** at **TVH Agnitio IT Park, Perungudi, Chennai**.

## Role
- **Freshers** (0–1 year)
- **Shift:** rotational shifts
- **Interview:** 3 rounds, virtual

## Pay
The notice prints **₹12,000 CTC** and **₹10,000 take-home**. It does not name a pay period.

## Who can apply
- Bachelor's degree in Computer Science, IT, or a related field
- Basic knowledge of Windows OS, MS Office / Microsoft 365, Active Directory, and networking
- Good communication and troubleshooting skills
- Willing to work rotational shifts

## Duties
- Provide basic IT support for desktops, laptops, printers, and network issues
- Troubleshoot Windows and Microsoft Office issues
- Log and track service requests and resolve user queries
- Support IT installations and configurations

## How to apply
Register on the **[BALBHAS form](${FORM})**. The notice prints the short link [${FORM_SHORT.replace("https://", "")}](${FORM_SHORT}).

The notice does not print a phone number or an email.

This page is compiled from the hiring note. It is not a BALBHAS careers page.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Service desk engineer (fresher) — BALBHAS, Perungudi",
    body,
    locationLabel: "TVH Agnitio IT Park, Perungudi, Chennai",
    status: "open" as const,
    employmentType: null,
    validThrough,
    applicationUrl: FORM,
    salaryDisclosed: false,
    salaryMin: null,
    salaryMax: null,
    openingsCount: 1,
    remotePolicy: "onsite" as const,
    updatedAt: now,
  };

  if (existingJob) {
    await db.update(jobPostings).set(values).where(eq(jobPostings.id, existingJob.id));
    console.log("[seed-job] Refreshed:", JOB_SLUG);
  } else {
    await db.insert(jobPostings).values({ ...values, publishedAt: now, createdAt: now });
    console.log("[seed-job] Inserted:", JOB_SLUG);
  }

  console.log("[seed-job] Done. Detail:", `/chennai-jobs/${JOB_SLUG}`);
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
