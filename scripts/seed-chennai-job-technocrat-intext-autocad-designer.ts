/**
 * AutoCAD & CorelDRAW Designer — Technocrat Intext Solutions, Porur.
 *
 * Dev:  `npm run db:seed:chennai-job:technocrat-intext-autocad-designer`
 * Live: `npm run db:seed:chennai-job:technocrat-intext-autocad-designer:live` — uses `.env.production.local`
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

const EMPLOYER_SLUG = "technocrat-intext-solutions-porur";
const JOB_SLUG = "autocad-coreldraw-designer-technocrat-intext-porur";

const APPLY_EMAIL = "mailto:technocratsinfo@gmail.com?subject=Application%20%E2%80%94%20AutoCAD%20%26%20CorelDRAW%20Designer";
const WHATSAPP = "8939517601";

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
        name: "Technocrat Intext Solutions · Porur",
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed name:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "Technocrat Intext Solutions · Porur",
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
**Technocrat Intext Solutions** is hiring an **AutoCAD & CorelDRAW Designer** at **Porur, Chennai**.

## Requirements

- Proficiency in **AutoCAD** and **CorelDRAW**
- Ability to understand customer requirements and prepare designs accordingly, while learning and working under the guidance of the existing design team
- Quick learner with an interest in understanding industrial products, materials, and design requirements
- **Freshers** as well as candidates with **1–2+ years** of relevant experience can apply
- Good communication and coordination skills

## Location

**Porur, Chennai** — onsite.

## How to apply

Send your resume to **[technocratsinfo@gmail.com](mailto:technocratsinfo@gmail.com)** or WhatsApp **${WHATSAPP}**.

Company site: [techintextindia.com](https://www.techintextindia.com)

Mention that you saw the opening on MyChennaiCity jobs.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "AutoCAD & CorelDRAW Designer — Technocrat Intext Solutions · Porur",
    body,
    locationLabel: "Porur, Chennai",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: APPLY_EMAIL,
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
