/**
 * Idempotent open job(s) for Chennai — staging / demos / Rich Results QA.
 *
 * Dev:  `npm run db:seed:chennai-jobs`
 * Live: `npm run db:seed:chennai-jobs:live` — uses `.env.production.local`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
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

type SeedJobRow = {
  employer: {
    name: string;
    slug: string;
    websiteUrl?: string;
    verified?: boolean;
  };
  slug: string;
  title: string;
  body: string;
  locationLabel: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryDisclosed: boolean;
  applicationUrl?: string;
  employmentType: string;
  /** Days from seed run when `validThroughEnd` is not set. */
  validThroughDays?: number;
  /** ISO datetime — overrides `validThroughDays` when set (e.g. employer deadline). */
  validThroughEnd?: string;
};

const seeds: SeedJobRow[] = [
  {
    employer: {
      name: "mychennaicity.in Demo Studio",
      slug: "mychennaicity-demo-studio",
      websiteUrl: "https://mychennaicity.in",
      verified: true,
    },
    slug: "content-editor-tamil-english-chennai-demo",
    title: "Content editor — Tamil & English (Chennai desk)",
    body: `## Role
Editorial pilot for **Tamil and English** Chennai local coverage — desk production, headline clarity, and partner coordination.

## You
- Strong written Tamil and English; newsroom or digital desk experience.
- Comfort with civic, mobility, and economy beats in Chennai.

## Apply
Use the official application link on this listing (employer careers or form). **Do not** pay any third-party “registration” fee.`,
    locationLabel: "Chennai",
    salaryDisclosed: false,
    applicationUrl: "https://mychennaicity.in/contact",
    employmentType: "FULL_TIME",
    validThroughDays: 90,
  },
  {
    employer: {
      name: "Confidential employer — Chennai",
      slug: "confidential-employer-chennai-accounts-2026",
      verified: false,
    },
    slug: "accounts-executive-gst-tds-zoho-chennai",
    title:
      "Accounts executive — GST/TDS filing (3–4 years; Zoho Books an advantage)",
    body: `## Role
**Accounts / finance** hire for **GST and TDS** compliance and filing — **3–4 years** relevant experience.

## Requirements
- Hands-on experience with **GST** and **TDS** filing and related reconciliations.
- Working knowledge of **Zoho Books** (or similar) is an **advantage**.

## Compensation
**CTC** approximately **₹4.80–5.50 lakh per annum**, with other benefits **as per market norms** (confirm exact structure with the employer).

## Joining
**Immediate joiners** preferred.

## How to apply
Contact **S. Manoharan** on **WhatsApp** via the button on this page, or call **+91 63803 51319**.

**Safety note:** Do **not** pay any upfront “registration” or “security” fee to third parties — verify that you are dealing with the real hiring contact.`,
    locationLabel: "Chennai",
    salaryMin: 480_000,
    salaryMax: 550_000,
    salaryDisclosed: true,
    applicationUrl: "https://wa.me/916380351319",
    employmentType: "FULL_TIME",
    validThroughDays: 75,
  },
  {
    employer: {
      name: "Direct hire — Chennai OMR",
      slug: "direct-hire-chennai-omr",
      verified: false,
    },
    slug: "personal-assistant-part-time-flexible-omr-chennai",
    title: "Personal assistant (part-time / flexible)",
    body: `## Summary
**Part-time personal assistant** for **Chennai (OMR corridor)** — personal and **administrative** support with **flexible** tasks. Adapted from the employer’s public listing (see source link below).

## Role
We are looking for an **open-minded, adaptable** personal assistant who can handle a variety of **personal and administrative** tasks with **flexibility**. The role needs a **practical** approach and willingness to support across **different** needs.

## Quick facts
- **Type:** Part-time (office segment)
- **Compensation:** **₹4,000 per month** (as stated on the source listing — confirm with the employer)
- **Hours:** About **4 hours per day**; **timing** to be agreed with the employer
- **Apply by:** **2 June 2026**

## Requirements
- **Open-minded** and **flexible**; comfortable adjusting to different types of personal and work tasks
- **Good communication** in **Tamil** and **English**
- **Basic computer** skills
- **Self-managed** and **responsible**

## How to apply
Apply **only via WhatsApp** using the green button on this page. **No** separate phone number or email is published here.

## Source listing
Original post on partner site MyOMR.in: [Personal Assistant (Part-Time / Flexible) — job #24](https://myomr.in/omr-local-job-listings/job/24/personal-assistant-part-time-flexible)

**Safety:** Do **not** pay any fee to apply. If anything looks off, stop and recheck you are messaging the **same** employer contact as on the original listing.`,
    locationLabel: "Chennai (OMR Road)",
    salaryDisclosed: false,
    applicationUrl: `https://wa.me/917200101497?text=${encodeURIComponent(
      'Hi, I found the "Personal Assistant (Part-Time / Flexible)" role for Direct hire — Chennai OMR on mychennaicity.in and I\'d like to apply. Could you share more details?',
    )}`,
    employmentType: "PART_TIME",
    validThroughEnd: "2026-06-02T18:29:59.000Z",
  },
];

async function ensureEmployer(row: SeedJobRow["employer"]): Promise<string> {
  const [existing] = await db
    .select({ id: employers.id })
    .from(employers)
    .where(eq(employers.slug, row.slug))
    .limit(1);

  const verified = row.verified ?? false;

  if (existing) {
    await db
      .update(employers)
      .set({
        name: row.name,
        websiteUrl: row.websiteUrl ?? null,
        verified,
        updatedAt: new Date(),
      })
      .where(eq(employers.id, existing.id));
    console.log("[seed-jobs] Employer exists, updated:", row.slug);
    return existing.id;
  }

  const [ins] = await db
    .insert(employers)
    .values({
      name: row.name,
      slug: row.slug,
      websiteUrl: row.websiteUrl,
      verified,
    })
    .returning({ id: employers.id });
  console.log("[seed-jobs] Inserted employer:", row.slug);
  return ins.id;
}

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

  const now = new Date();

  for (const s of seeds) {
    const employerId = await ensureEmployer(s.employer);
    const validThrough = s.validThroughEnd
      ? new Date(s.validThroughEnd)
      : (() => {
          const d = new Date(now);
          d.setDate(d.getDate() + (s.validThroughDays ?? 90));
          return d;
        })();

    const [existingJob] = await db
      .select({ id: jobPostings.id })
      .from(jobPostings)
      .where(
        and(eq(jobPostings.cityId, city.id), eq(jobPostings.slug, s.slug)),
      )
      .limit(1);

    const baseValues = {
      employerId,
      cityId: city.id,
      slug: s.slug,
      title: s.title,
      body: s.body,
      locationLabel: s.locationLabel,
      salaryMin: s.salaryMin ?? null,
      salaryMax: s.salaryMax ?? null,
      salaryDisclosed: s.salaryDisclosed,
      status: "open" as const,
      employmentType: s.employmentType,
      validThrough,
      publishedAt: now,
      applicationUrl: s.applicationUrl ?? null,
      updatedAt: now,
    };

    if (existingJob) {
      await db
        .update(jobPostings)
        .set(baseValues)
        .where(eq(jobPostings.id, existingJob.id));
      console.log("[seed-jobs] Refreshed open job:", s.slug);
    } else {
      await db.insert(jobPostings).values({
        ...baseValues,
      });
      console.log("[seed-jobs] Inserted open job:", s.slug);
    }
  }

  console.log("[seed-jobs] Done. Hub:", "/chennai-jobs");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
