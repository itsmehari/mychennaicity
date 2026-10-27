/**
 * Desktop support engineer — Commerzone, Pallikaranai.
 * Flyer does not name an employer. The pasted line includes “ami india”.
 *
 * Flyer: `public/images/listings/desktop-support-engineer-commerzone-pallikaranai-2026.png`
 *
 * Dev:  `npm run db:seed:chennai-job:desktop-support-pallikaranai`
 * Live: `npm run db:seed:chennai-job:desktop-support-pallikaranai:live`
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

const EMPLOYER_SLUG = "ami-india";
const JOB_SLUG = "desktop-support-engineer-commerzone-pallikaranai";
const FLYER =
  "/images/listings/desktop-support-engineer-commerzone-pallikaranai-2026.png";

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
        ilike(jobPostings.title, "%Desktop Support Engineer%Pallikaranai%"),
        and(
          ilike(jobPostings.body, "%Commerzone%"),
          ilike(jobPostings.body, "%24,800%"),
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
      .set({ name: "AMI India", updatedAt: new Date() })
      .where(eq(employers.id, employerId));
  } else {
    const [ins] = await db
      .insert(employers)
      .values({ name: "AMI India", slug: EMPLOYER_SLUG, verified: false })
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
**Desktop support engineer** at **Commerzone, Pallikaranai, Chennai**. The flyer does not print a company name. The pasted listing line reads **“Commerzone Pallikaranai ami india”**.

![Desktop support engineer flyer — Commerzone Pallikaranai, ₹24,800–₹30,000 per month](${FLYER})

## Pay
**₹24,800–₹30,000 per month.**

## Who can apply
- **Fresher only**
- **Tamil-speaking** candidates only
- The candidate **must be in Chennai**, Tamil Nadu

## Work
The note says **full-time** and **in person**. The flyer also prints one line that ticks every type: contractual / temporary, freelance, part-time, internship, volunteer, permanent, fresher, and full-time. It does not say which of those applies. The work-location box says **in person**, and the benefits list includes **work from home**.

## Duties on the flyer
- Address user tickets on hardware, software, and networking
- Walk customers through installing applications and computer peripherals
- Ask targeted questions to diagnose problems
- Guide users with simple, step-by-step instructions
- Conduct remote troubleshooting
- Test alternative pathways until an issue is resolved
- Customize desktop applications to meet user needs
- Record technical issues and solutions in logs
- Direct unresolved issues to the next level of support
- Follow up with clients to confirm their systems work
- Report customer feedback and possible product requests
- Help create technical documentation and manuals

## Benefits printed on the flyer
Cell phone reimbursement, commuter assistance, flexible schedule, food provided, health insurance, internet reimbursement, leave encashment, life insurance, paid sick time, paid time off, provident fund, and work from home.

## How to apply
This notice does not print a phone number, an email, or an apply link.

This page is compiled from the hiring note and the flyer.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Desktop support engineer — Commerzone, Pallikaranai",
    body,
    locationLabel: "Commerzone, Pallikaranai, Chennai",
    status: "open" as const,
    validThrough,
    applicationUrl: null,
    salaryDisclosed: true,
    salaryMin: 24800,
    salaryMax: 30000,
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
