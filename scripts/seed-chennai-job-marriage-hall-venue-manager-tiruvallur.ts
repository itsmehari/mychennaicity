/**
 * Marriage Hall & Rooftop Venue Manager — Tiruvallur.
 *
 * Dev:  `npm run db:seed:chennai-job:marriage-hall-venue-manager-tiruvallur`
 * Live: `npm run db:seed:chennai-job:marriage-hall-venue-manager-tiruvallur:live` — uses `.env.production.local`
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

const EMPLOYER_SLUG = "chennai-marriage-hall-tiruvallur";
const JOB_SLUG = "marriage-hall-rooftop-venue-manager-tiruvallur";

const PHONE_DISPLAY = "75500 549400";
const PHONE_APPLY = "tel:+9175500549400";

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
        name: "Marriage Hall & Rooftop Venue · Tiruvallur",
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "Marriage Hall & Rooftop Venue · Tiruvallur",
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
We are seeking an experienced, proactive, and responsible **Marriage Hall & Rooftop Venue Manager** to oversee the complete operations of our event venue in **Tiruvallur, Tamil Nadu**.

The ideal candidate will take full ownership of bookings, event execution, venue maintenance, vendor coordination, and customer satisfaction.

## Key responsibilities

- Manage customer enquiries, venue visits, bookings, and contracts
- Plan, coordinate, and supervise **weddings**, **receptions**, **corporate events**, and **private functions**
- Coordinate with decorators, caterers, photographers, florists, and other vendors
- Ensure seamless execution of every event from booking through completion
- Oversee venue maintenance, cleanliness, repairs, and periodic painting
- Maintain inventory and ensure proper care of all venue assets and equipment
- Supervise staff and ensure smooth day-to-day operations
- Be available **on-site during events**, including evenings or weekends, whenever required
- Deliver exceptional customer service and resolve operational issues promptly

## Candidate profile

- Strong **communication**, **organizational**, and **leadership** skills
- Ability to independently manage the complete operations of the venue
- Basic computer knowledge is preferred but not essential
- Previous experience in marriage halls, hotels, hospitality, event management, or facility management is an added advantage
- Honest, reliable, self-motivated, and customer-focused

## Compensation & benefits

- Attractive salary package based on experience
- **Performance-based incentive** for every successfully completed event
- **Accommodation available** within the premises, if required
- Excellent opportunity for long-term career growth

## Location

**Tiruvallur, Tamil Nadu**

## How to apply

Call **${PHONE_DISPLAY}** directly to discuss the role and next steps.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Marriage Hall & Rooftop Venue Manager — Tiruvallur",
    body,
    locationLabel: "Tiruvallur, Tamil Nadu",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: PHONE_APPLY,
    salaryDisclosed: false,
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
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
