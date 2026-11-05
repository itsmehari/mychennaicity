/**
 * GET Trainee — Plastic Injection Moulding — Spinks Softech Pvt. Ltd.,
 * SIPCOT Sriperumbudur.
 * Source note (5 Nov 2026): 0 to 1 years; Diploma / B.E. / B.Tech —
 * Mechanical / Production / Automobile; salary printed as “Best in Industry”
 * (no rupee figure); resume on WhatsApp 78248 08440.
 * Address: G-40, SIPCOT Industrial Park, Vallam Vadakal Village,
 * Sriperumbudur, Kanchipuram — 631 604.
 * A LinkedIn short location link was printed and is not republished.
 * Hashtags also name electronics engineering, tool development, and
 * 2023–2026 batches. Those tags are not a second qualification line.
 * Hours, job type, and vacancy count were not given. English only.
 *
 * Dev:  `npm run db:seed:chennai-job:spinks-softech-get-trainee`
 * Live: `npm run db:seed:chennai-job:spinks-softech-get-trainee:live`
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

const EMPLOYER_SLUG = "spinks-softech";
const EMPLOYER_NAME = "Spinks Softech Pvt. Ltd.";
const JOB_SLUG =
  "get-trainee-plastic-injection-moulding-spinks-softech-sriperumbudur";
const PHONE_DISPLAY = "78248 08440";
const TEL = "tel:+917824808440";
const WA_APPLY = `https://wa.me/917824808440?text=${encodeURIComponent(
  "Hi, I saw the GET Trainee — Plastic Injection Moulding opening at Spinks Softech, Sriperumbudur on MyChennaiCity and would like to send my resume.",
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
        ilike(jobPostings.body, "%7824808440%"),
        ilike(jobPostings.body, "%78248 08440%"),
        ilike(jobPostings.applicationUrl, "%917824808440%"),
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
  // 30 days from 5 Nov 2026. Last moment of 5 Dec 2026 IST.
  const validThrough = new Date("2026-12-05T23:59:59+05:30");
  const stillOpen = validThrough.getTime() > now.getTime();

  const body = `
**Spinks Softech Pvt. Ltd.** is hiring a **GET Trainee — Plastic Injection Moulding** at its plant in **SIPCOT Industrial Park, Sriperumbudur**.

## Role

- **Position:** GET Trainee — Plastic Injection Moulding
- **Employer:** Spinks Softech Pvt. Ltd.
- **Experience:** 0 to 1 years
- **Qualification:** Diploma / B.E. / B.Tech — Mechanical, Production, or Automobile
- **Pay:** Best in industry, as printed (no rupee figure)
- **Workplace:** G-40, SIPCOT Industrial Park, Vallam Vadakal Village, Sriperumbudur, Kanchipuram — 631 604
- **Resume:** WhatsApp [+91 ${PHONE_DISPLAY}](${TEL})

The note does not name hours, a shift, full-time or contract, or how many seats are open. The role is printed as GET Trainee. The post also tags the 2023, 2024, 2025, and 2026 batches, and the hashtags include electronics engineering and tool development. Those tags are not a second qualification line.

## Pay

**Best in industry**, as printed. No monthly or annual figure was given.

## How to apply

Send your resume on WhatsApp to **[+91 ${PHONE_DISPLAY}](${TEL})**.

Say you are applying for the GET Trainee — Plastic Injection Moulding role at Spinks Softech, Sriperumbudur, and that you saw it on MyChennaiCity.

This page is compiled from the hiring note. Confirm the plant, the stream they will accept, and the pay before you join.

## Common questions

### Where is the job?

Spinks Softech Pvt. Ltd., G-40, SIPCOT Industrial Park, Vallam Vadakal Village, Sriperumbudur, Kanchipuram — 631 604.

### Who can apply?

Diploma, B.E., or B.Tech in Mechanical, Production, or Automobile, with 0 to 1 years of experience. The post tags 2023, 2024, 2025, and 2026 batches. Electronics engineering appears only as a hashtag, not in the qualification line.

### What is the pay?

The note says best in industry. It does not print a rupee amount.

### How do I apply?

WhatsApp your resume to +91 ${PHONE_DISPLAY}.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "GET Trainee — Plastic Injection Moulding (Spinks Softech · Sriperumbudur)",
    body,
    locationLabel: "SIPCOT, Sriperumbudur, Chennai",
    status: (stillOpen ? "open" : "closed") as "open" | "closed",
    employmentType: null,
    validThrough,
    applicationUrl: WA_APPLY,
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
