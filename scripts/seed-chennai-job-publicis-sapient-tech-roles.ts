/**
 * Full Stack, Java, Python, React, .NET, Android, Data & DevOps — Publicis Sapient (MNC).
 *
 * Dev:  `npm run db:seed:chennai-job:publicis-sapient-tech-roles`
 * Live: `npm run db:seed:chennai-job:publicis-sapient-tech-roles:live` — uses `.env.production.local`
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

const EMPLOYER_SLUG = "publicis-sapient";
const JOB_SLUG =
  "full-stack-java-python-react-dotnet-data-devops-publicis-sapient-mnc";

const WA_DISPLAY = "9108735190";
const WA_APPLY = `https://wa.me/919108735190?text=${encodeURIComponent(
  "Hi, I saw the Publicis Sapient tech roles opening on MyChennaiCity and would like to apply. Please share the next steps.",
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
        name: "Publicis Sapient",
        websiteUrl: "https://www.publicissapient.com/",
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed name:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "Publicis Sapient",
        slug: EMPLOYER_SLUG,
        websiteUrl: "https://www.publicissapient.com/",
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
**Publicis Sapient** — a global digital transformation MNC — has **multiple technology openings** across South India. Company site: [publicissapient.com](https://www.publicissapient.com/).

## Who can apply

- **Batch:** 2022 – 2026 pass-outs
- **Most preferred:** **2025** and **2026** graduates
- **Experienced:** **2 – 5 years** in relevant tech stacks (expect up to **~50% hike** on current CTC; confirm with recruiter)

## Open roles

- Full Stack Developer
- Java Developer
- Python Developer
- React Developer
- .NET Developer
- Android Developer
- Data Engineer
- Data Scientist
- ML Engineer
- Big Data Engineer
- AWS / Azure / DevOps Engineer
- Kubernetes Engineer
- QA Automation Engineer
- Test Engineer

## Compensation (fresher band)

- **Freshers:** **₹5 – 7 lakh** per annum (CTC; role and location dependent)

## Locations

Hyderabad · Bengaluru · Pune · **Chennai**

## What we look for

- Strong **verbal and written communication**
- Relevant project or internship work for freshers; hands-on delivery for experienced hires

## Selection process

- Typical turnaround: **~10 days** from shortlist to offer (may vary by role and location)

## How to apply

WhatsApp **[${WA_DISPLAY}](${WA_APPLY})** with your **name**, **role preference**, **batch year** (or years of experience), **current location**, and **resume**.

Mention that you saw the opening on **MyChennaiCity jobs**.

**Safety note:** Do **not** pay any upfront “registration”, “security deposit”, or “processing” fee. Verify you are speaking with the official hiring contact before sharing personal documents.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Full Stack, Java, Python, React, .NET, Data & DevOps — Publicis Sapient (MNC)",
    body,
    locationLabel: "Hyderabad, Bengaluru, Pune & Chennai",
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: WA_APPLY,
    salaryDisclosed: true,
    salaryMin: 500_000,
    salaryMax: 700_000,
    openingsCount: 14,
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
