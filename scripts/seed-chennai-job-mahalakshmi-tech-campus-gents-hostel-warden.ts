/**
 * Mahalakshmi Tech Campus, Chromepet — Gents Hostel Warden.
 *
 * Dev:  `npm run db:seed:chennai-job:mahalakshmi-tech-campus-gents-hostel-warden`
 * Live: `npm run db:seed:chennai-job:mahalakshmi-tech-campus-gents-hostel-warden:live` — uses `.env.production.local`
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

const EMPLOYER_SLUG = "mahalakshmi-tech-campus-chromepet";
const JOB_SLUG = "gents-hostel-warden-mahalakshmi-tech-campus-chromepet";

const PHONE_DISPLAY = "95514 79988";
const PHONE_APPLY = "tel:+919551479988";
const WA_APPLY = `https://wa.me/919551479988?text=${encodeURIComponent(
  "Hello, I saw the Gents Hostel Warden requirement at Mahalakshmi Tech Campus, Chromepet on MyChennaiCity jobs. I would like to know more.",
)}`;

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
        name: "Mahalakshmi Tech Campus · Chromepet",
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "Mahalakshmi Tech Campus · Chromepet",
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
**Mahalakshmi Tech Campus**, **Chromepet, Chennai**, invites applications for **Gents Hostel Warden**.

## Role

- **Position:** Gents Hostel Warden
- **Campus:** Mahalakshmi Tech Campus, Chromepet, Chennai
- **Who should reach out:** Interested and eligible candidates with relevant hostel / residential / student-care experience (confirm expectations on call)

## How to apply

Call or WhatsApp **${PHONE_DISPLAY}** to enquire and share your details.

If you know someone suitable, please forward this opening to them.

Mention that you saw the requirement on MyChennaiCity jobs.

**Safety note:** Do **not** pay any upfront registration or security fee — verify that you are speaking with the campus hiring contact before you share documents.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Gents Hostel Warden — Mahalakshmi Tech Campus · Chromepet",
    body,
    locationLabel: "Chromepet, Chennai",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: WA_APPLY,
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
  console.log("[seed-job] Call apply:", PHONE_APPLY);
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
