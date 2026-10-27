/**
 * S2BDS Staffing — MEP BIM Manager.
 * Social post names Chennai; the flyer prints Sivakasi, Kumbakonam, Rajapalayam.
 *
 * Flyer: `public/images/listings/s2bds-mep-bim-manager-2026.png`
 * Apply short link https://ln.run/Y40A8 resolves to the Google Form below.
 *
 * Dev:  `npm run db:seed:chennai-job:s2bds-mep-bim-manager`
 * Live: `npm run db:seed:chennai-job:s2bds-mep-bim-manager:live`
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

const EMPLOYER_SLUG = "s2bds-staffing";
const JOB_SLUG = "mep-bim-manager-s2bds-chennai";
const FLYER = "/images/listings/s2bds-mep-bim-manager-2026.png";
const EMAIL = "hr@s2aec.com";
const FORM = "https://forms.gle/9JAtG3ka3Lr5YLFBA";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Resume — MEP BIM Manager, S2BDS",
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
        ilike(jobPostings.body, "%hr@s2aec.com%"),
        ilike(jobPostings.body, "%9700073425%"),
        ilike(jobPostings.title, "%S2BDS%"),
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
      .set({ name: "S2BDS Staffing", updatedAt: new Date() })
      .where(eq(employers.id, employerId));
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "S2BDS Staffing",
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
**S2BDS Staffing** is hiring an **MEP BIM Manager** for a client it does not name. The logo on the flyer reads **S2BDS Saanvi Sri BIM & Design Studio**. S2BDS describes itself as a specialist in contract and permanent BIM staffing. This notice does not say whether this seat is contract or permanent.

![S2BDS flyer — urgent hiring, MEP BIM Manager, 7+ years](${FLYER})

## Role
- **Experience:** 7+ years
- **Immediate joiners** preferred
- **South Indian candidates** preferred, as printed on the notice
- Salary is not stated

## Locations
The social post lists **Chennai, Sivakasi, Kumbakonam, or Rajapalayam**. The flyer prints **Sivakasi, Kumbakonam, and Rajapalayam** and does not print Chennai.

## How to apply
- Form: **[Apply on the S2BDS form](${FORM})**. The flyer’s short link [ln.run/Y40A8](https://ln.run/Y40A8) redirects to that form.
- Email **[${EMAIL}](${MAILTO})**
- Call or WhatsApp **+91 97000 73425**

Mention that you saw the opening on MyChennaiCity jobs.

This page is compiled from the hiring post and the flyer. It is not an S2BDS careers page.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "MEP BIM Manager — S2BDS Staffing",
    body,
    locationLabel: "Chennai, Sivakasi, Kumbakonam, or Rajapalayam",
    status: "open" as const,
    validThrough,
    applicationUrl: FORM,
    salaryDisclosed: false,
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
