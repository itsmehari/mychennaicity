/**
 * Cluster Builders — Avadi site and office vacancies (Oct 2026 notice).
 *
 * Dev:  `npm run db:seed:chennai-job:cluster-builders-avadi`
 * Live: `npm run db:seed:chennai-job:cluster-builders-avadi:live`
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

const EMPLOYER_SLUG = "cluster-builders";
const JOB_SLUG = "cluster-builders-avadi-site-office-vacancies";
const EMAIL = "clusterbuilders2010@gmail.com";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Resume — Cluster Builders, Avadi",
)}`;

const ROLES: { role: string; count: number }[] = [
  { role: "Office boy", count: 3 },
  { role: "Electrician cum plumber", count: 5 },
  { role: "Site supervisor", count: 4 },
  { role: "Designer", count: 6 },
  { role: "Draughtsman", count: 3 },
  { role: "Housekeeping", count: 4 },
  { role: "Masthri", count: 6 },
  { role: "Mason", count: 4 },
  { role: "Helper", count: 10 },
  { role: "Carpenter", count: 4 },
  { role: "Tile mason", count: 5 },
  { role: "Bricks chamber loading person", count: 10 },
  { role: "12-wheel lorry driver", count: 2 },
  { role: "Welder", count: 3 },
  { role: "House maid", count: 2 },
];

const OPENINGS = ROLES.reduce((n, r) => n + r.count, 0);

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
        ilike(jobPostings.body, "%clusterbuilders2010@gmail.com%"),
        ilike(jobPostings.body, "%8122706913%"),
        ilike(jobPostings.body, "%81227 06913%"),
        ilike(jobPostings.title, "%Cluster Builders%"),
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
      .set({ name: "Cluster Builders", updatedAt: new Date() })
      .where(eq(employers.id, employerId));
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "Cluster Builders",
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

  const roleLines = ROLES.map((r) => `- **${r.role}** — ${r.count}`).join("\n");

  const body = `
**Cluster Builders** is hiring for site and office roles in **Avadi, Chennai**. ${OPENINGS} openings across the trades below. Salary is not stated on the notice.

## Openings
${roleLines}

## How to apply
Send your resume to **[${EMAIL}](${MAILTO})**.

WhatsApp **81227 06913** or **78069 61793**.

Name the role you are applying for. Mention that you saw the opening on MyChennaiCity jobs.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Site and office vacancies — Cluster Builders, Avadi",
    body,
    locationLabel: "Avadi, Chennai",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: MAILTO,
    salaryDisclosed: false,
    openingsCount: OPENINGS,
    remotePolicy: "onsite" as const,
    updatedAt: now,
  };

  if (existingJob) {
    await db.update(jobPostings).set(values).where(eq(jobPostings.id, existingJob.id));
    console.log("[seed-job] Refreshed open job:", JOB_SLUG);
  } else {
    await db.insert(jobPostings).values({ ...values, createdAt: now });
    console.log("[seed-job] Inserted open job:", JOB_SLUG);
  }

  console.log("[seed-job] Done. Detail:", `/chennai-jobs/${JOB_SLUG}`);
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
