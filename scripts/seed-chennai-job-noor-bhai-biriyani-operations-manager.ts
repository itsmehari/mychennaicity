/**
 * Noor Bhai Biriyani — Experienced Operations Manager (Kattupakkam & Mogappair).
 *
 * Storefront: `public/images/listings/noor-bhai-biriyani-storefront.png`
 *
 * Dev:  `npm run db:seed:chennai-job:noor-bhai-biriyani-operations-manager`
 * Live: `npm run db:seed:chennai-job:noor-bhai-biriyani-operations-manager:live` — uses `.env.production.local`
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

const EMPLOYER_SLUG = "noor-bhai-biriyani";
const JOB_SLUG = "operations-manager-noor-bhai-biriyani-kattupakkam-mogappair";

const PHONE_DISPLAY = "86101 03740";
const PHONE_APPLY = "tel:+918610103740";
const STOREFRONT_IMAGE = "/images/listings/noor-bhai-biriyani-storefront.png";

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
        name: "Noor Bhai Biriyani",
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed name:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "Noor Bhai Biriyani",
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
![Noor Bhai Biriyani storefront — branches at Kattupakkam and Mogappair](${STOREFRONT_IMAGE})

**Noor Bhai Biriyani** (*since 1974*) is looking for an **experienced Operations Manager** to run day-to-day restaurant operations across our **Chennai branches** — **Kattupakkam** and **Mogappair**.

You will act as **head of operations**: hands-on leadership on the floor, back-office controls, and team discipline — not a desk-only role.

## What you will handle

- **PetPooja** — billing, KOT flow, menu updates, reports, and outlet-wise reconciliation
- **Excel** — daily sales, purchase vs consumption, staff attendance, and stock sheets
- **Staff** — shift planning, training, discipline, and resolving service issues on the spot
- **Stock control** — ordering, GRN checks, wastage tracking, and kitchen–store coordination
- **Operations** — SOP adherence, hygiene checks, customer complaints, and branch coordination

## Who should apply

- Prior **restaurant / QSR / biryani outlet** operations experience (manager or senior supervisor level)
- Comfortable working **on-site** at branch hours, including weekends when needed
- Strong ownership mindset — you can run the outlet when the owner is not on the floor

## Branches

**Kattupakkam** · **Mogappair** (Chennai)

## How to apply

Call **${PHONE_DISPLAY}** for role details, interview timing, and which branch you would be mapped to.

Mention that you saw the opening on MyChennaiCity jobs.

**Safety note:** Do **not** pay any upfront “registration” or “security” fee to third parties — verify that you are speaking with the real hiring contact.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Experienced Operations Manager — Noor Bhai Biriyani · Kattupakkam & Mogappair",
    body,
    locationLabel: "Kattupakkam & Mogappair, Chennai",
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
