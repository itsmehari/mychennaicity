/**
 * Namma Veedu Vasanta Bhavan — F&B service & kitchen hiring (multiple outlets).
 *
 * Flyer: `public/images/listings/vasanta-bhavan-hiring-flyer-2026.png`
 *
 * Dev:  `npm run db:seed:chennai-job:vasanta-bhavan-restaurant-roles`
 * Live: `npm run db:seed:chennai-job:vasanta-bhavan-restaurant-roles:live` — uses `.env.production.local`
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

const EMPLOYER_SLUG = "namma-veedu-vasanta-bhavan";
const JOB_SLUG =
  "fnb-service-kitchen-roles-vasanta-bhavan-chennai-outlets";

const WEBSITE = "https://www.vasantabhavan.in";
const PHONE_1 = "78711 31121";
const PHONE_2 = "72999 07067";
const PHONE_3 = "78258 80483";
const PHONE_APPLY = "tel:+917871131121";

const FLYER_IMAGE = "/images/listings/vasanta-bhavan-hiring-flyer-2026.png";

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
        name: "Namma Veedu Vasanta Bhavan",
        websiteUrl: WEBSITE,
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed name:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "Namma Veedu Vasanta Bhavan",
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
  const validThrough = new Date(now);
  validThrough.setDate(validThrough.getDate() + 90);

  const body = `
![Namma Veedu Vasanta Bhavan hiring flyer](${FLYER_IMAGE})

**Namma Veedu Vasanta Bhavan** (*vegetarian family restaurant since 1974*) is hiring across **F&B service** and **kitchen production** roles at outlets in Chennai and nearby.

Brands under the group include **VB World** (global veg cuisine), **Namma Veedu Vasanta Bhavan**, and **Cones & Brew** (artisanal coffee bakehouse).

## F&B service

- Restaurant Manager
- Assistant Manager
- Shift Manager
- Captain
- Cashier
- Waiter / Waitress
- Driver
- Security Guard / Supervisor

## F&B production (kitchen)

- Sous Chef
- CDP (Chef de Partie)
- DCDP (Demi Chef de Partie)
- Kitchen Assistant (Pantry, Stall, Parcel)
- Commis I / II / III — specializations: Continental, South Indian, North Indian, Chinese, Bakery

## Benefits

**Food & accommodation available** (confirm details with HR when you apply).

## Work locations

Roles may be based at outlets including: Egmore, Tambaram, Mylapore, Egmore 2, 100ft Road, Chrompet, Maduravoyal, ECR, Phoenix Mall, NH-Vikravandi, Medavakkam, Forum Mall, Anna Nagar, T. Nagar, Aero Hub Airport, OMR–Sholinganallur, Kancheepuram, DLF Ramapuram, Velachery, Hosur, and Saigramam.

## Interview venue

**Vasanta Bhavan Hotels India Pvt Ltd**  
#34, South Phase Developed Plots, Industrial Estate, Guindy, Chennai 600 032.

## How to apply

Call **${PHONE_1}**, **${PHONE_2}**, or **${PHONE_3}** today for interview details and role fit.

Visit [vasantabhavan.in](${WEBSITE}) to learn more about the brand. Mention that you saw the opening on MyChennaiCity jobs.

**Safety note:** Do **not** pay any upfront “registration” or “security” fee to third parties — verify that you are dealing with the real hiring contact.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "F&B service & kitchen roles — Namma Veedu Vasanta Bhavan · Chennai outlets",
    body,
    locationLabel:
      "Multiple Chennai outlets · interview at Guindy (Guindy Industrial Estate)",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: PHONE_APPLY,
    salaryDisclosed: false,
    openingsCount: 13,
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
