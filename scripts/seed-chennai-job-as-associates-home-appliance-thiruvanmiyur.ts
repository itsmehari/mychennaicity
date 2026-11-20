/**
 * A.S. ASSOCIATES — Home appliance services · Service technician, Thiruvanmiyur.
 * Source note (Nov 2026): free training, accommodation optional, ₹25k–₹40k + incentives;
 * bike required; 10th / 12th / ITI; contacts 9551067901 & 8939813067.
 * Posted by Senthamarai Kannan.
 *
 * Dev:  `npm run db:seed:chennai-job:as-associates-home-appliance-thiruvanmiyur`
 * Live: `npm run db:seed:chennai-job:as-associates-home-appliance-thiruvanmiyur:live`
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

const EMPLOYER_SLUG = "as-associates-home-appliance-thiruvanmiyur";
const EMPLOYER_NAME = "A.S. ASSOCIATES — Home appliance services";
const JOB_SLUG =
  "home-appliance-service-technician-as-associates-thiruvanmiyur-november-2026";
const PHONE_PRIMARY = "9551067901";
const PHONE_SECONDARY = "8939813067";
const PHONE_DISPLAY = "95510 67901";
const PHONE_DISPLAY_ALT = "89398 13067";
const WA_APPLY = `https://wa.me/91${PHONE_PRIMARY}?text=${encodeURIComponent(
  "Hi, I saw the Home Appliance Service Technician role at A.S. ASSOCIATES, Thiruvanmiyur, on MyChennaiCity jobs. I would like to apply.",
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
        ilike(jobPostings.body, `%${PHONE_PRIMARY}%`),
        ilike(jobPostings.body, `%${PHONE_SECONDARY}%`),
        ilike(jobPostings.body, "%A.S. ASSOCIATES%"),
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
  const validThrough = new Date(now);
  validThrough.setDate(validThrough.getDate() + 90);

  const body = `
**A.S. ASSOCIATES** (home appliance services) needs a **service technician** at **Thiruvanmiyur, Chennai**. Fresher-friendly: **free training** for home appliances; **experience not required**. Pay **₹25,000–₹40,000** plus **incentives** (as stated). **Bike required.** Free accommodation if you need it.

*Listing source: note shared by Senthamarai Kannan.*

## Role at a glance

| | |
| --- | --- |
| **Role** | Home appliance service technician |
| **Employer** | A.S. ASSOCIATES — home appliance services |
| **Experience** | Not required (free training provided) |
| **Qualification** | 10th, 12th, or ITI |
| **Pay** | ₹25,000–₹40,000 per month plus incentives |
| **Benefits** | Free training; free accommodation if needed |
| **Other** | Own bike required |
| **Job type** | Full time, onsite |

## Office address (as printed)

**84/50 Sakthi Nagar, Srinivasapuram, Thiruvanmiyur, CH-41**

## How to apply

Call or WhatsApp **${PHONE_DISPLAY}** or **${PHONE_DISPLAY_ALT}**. Use **[${PHONE_DISPLAY}](${WA_APPLY})** for WhatsApp with a prefilled message.

Mention that you saw the opening on **MyChennaiCity jobs**. Confirm shift timing, incentive structure, and accommodation before you join. Do not pay registration fees to third parties — verify you are dealing with A.S. ASSOCIATES.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Home appliance service technician · A.S. ASSOCIATES, Thiruvanmiyur",
    body,
    locationLabel: "Thiruvanmiyur, Chennai",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    applicationUrl: WA_APPLY,
    salaryDisclosed: true,
    salaryMin: 25_000,
    salaryMax: 40_000,
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

  console.log("[seed-job] Done:", `/chennai-jobs/${JOB_SLUG}`);
  await finishListingSeedLive({
    jobSlug: JOB_SLUG,
    label: "seed-chennai-job-as-associates-home-appliance-thiruvanmiyur",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});