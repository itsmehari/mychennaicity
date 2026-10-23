/**
 * AR Caller (fresher) — NYX, Triplicane night shift.
 * Poster supplied 23 Oct 2026: work from office, 6 pm–3 am, walk-in
 * 21–30 October (year not printed), Prince Kushal Towers, Anna Salai,
 * Triplicane 600002. Take-home ₹18,000 with no pay period. Cab deduction
 * ₹1,500. English only.
 *
 * Flyer: `public/images/listings/nyx-ar-caller-fresher-triplicane-october-2026.png`
 *
 * Dev:  `npm run db:seed:chennai-job:nyx-ar-caller`
 * Live: `npm run db:seed:chennai-job:nyx-ar-caller:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq, ilike, or } from "drizzle-orm";
import { finishListingSeedLive, istToUtcDate } from "./lib/seed-event-shared";
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

const EMPLOYER_SLUG = "nyx-healthcare-rcm";
const EMPLOYER_NAME = "NYX";
const JOB_SLUG = "ar-caller-fresher-nyx-triplicane-walk-in-october-2026";
const FLYER = "/images/listings/nyx-ar-caller-fresher-triplicane-october-2026.png";
const AKSHAYA_DISPLAY = "90423 17629";
const JAYALAKSHMI_DISPLAY = "88079 14280";
const AKSHAYA_WA = "https://wa.me/919042317629";
const JAYALAKSHMI_WA = "https://wa.me/918807914280";

function waApply(text: string) {
  return `${AKSHAYA_WA}?text=${encodeURIComponent(text)}`;
}

const body = `
**NYX** is hiring an **AR Caller (fresher)** for a **night shift** at its office in **Triplicane**. The poster says the role is **work from office** and a way to build a career in **healthcare RCM**. Walk-in interviews are **21–30 October**, reporting at **6 pm**. The poster does not print a year. This listing treats that window as **October 2026**, because the poster was shared on 23 October 2026, inside those dates.

Take-home pay printed on the poster is **₹18,000**. It does not say “per month”. A two-way cab within about **25 km** is offered, with **₹1,500 deducted from take-home**. A **fuel allowance** is named for candidates who use their own transport. No allowance amount is printed. A vacancy count is not printed.

![NYX poster — AR Caller fresher, night-shift walk-in, Triplicane, Chennai](${FLYER})

## Role at a glance

- **Position:** AR Caller — fresher
- **Employer on the poster:** NYX
- **Location:** 4th floor, Prince Kushal Towers, Anna Salai, Triplicane, Chennai 600002
- **Work mode:** Work from office
- **Shift:** Night shift, 6 pm–3 am
- **Who can apply:** 2020–2026 pass-outs. Graduation is mandatory. Maximum age **26 years**. Only **Chennai** candidates.
- **Joining:** Immediate joiners
- **Take-home:** ₹18,000, as printed (pay period not stated)
- **Benefits:** Two-way cab within about 25 km, with ₹1,500 deducted from take-home; fuel allowance for own transport (amount not printed)
- **Walk-in:** Direct walk-in, 21–30 October, timing 6 pm

## What the role covers

1. **Assigned accounts** — review assigned accounts and outstanding claims.
2. **Insurance calls** — call insurance companies to obtain claim status.
3. **Non-payment or denial** — identify the reason for non-payment or denial.
4. **Next action** — take the necessary action based on the insurance response.
5. **Call record** — document the call details and reference number.
6. **Follow-up** — follow up on pending claims and escalate unresolved issues.

## What they ask for

- Strong communication skills
- Looking for immediate joiners
- Passed out in 2020–2026
- Graduation mandatory
- Maximum age 26 years
- Only Chennai candidates are eligible

## Walk-in

- **Dates:** 21–30 October (year not printed on the poster; listed here as October 2026)
- **Type:** Direct walk-in
- **Timing:** 6 pm
- **Office:** 4th floor, Prince Kushal Towers, Anna Salai, Triplicane, Chennai 600002

## How to apply

Call or WhatsApp **Akshaya** on **[${AKSHAYA_DISPLAY}](${AKSHAYA_WA})** or **Jayalakshmi** on **[${JAYALAKSHMI_DISPLAY}](${JAYALAKSHMI_WA})**. Say you are asking about the AR Caller fresher night-shift walk-in in Triplicane, and that you saw it on MyChennaiCity.

Carry proof of graduation and a photo ID. Confirm the walk-in is still open before you travel. The printed window ends on 30 October.

Do not pay an upfront registration or training fee. The ₹1,500 figure on the poster is a cab deduction from take-home, not a fee to attend the interview. Confirm pay, shift, and cab terms with NYX before you accept.

This page is compiled from the NYX hiring poster. It is not an NYX careers page.

## Common questions

### Who can attend the NYX AR Caller walk-in in Triplicane?

Graduates who passed out between 2020 and 2026, aged 26 or under, with strong communication skills, who can join immediately, and who are Chennai candidates. The poster says only Chennai candidates are eligible.

### What is the shift, pay, and office?

Night shift, 6 pm to 3 am, work from office on the 4th floor of Prince Kushal Towers, Anna Salai, Triplicane, Chennai 600002. The poster prints ₹18,000 take-home and does not name a pay period. A two-way cab within about 25 km comes with a ₹1,500 deduction from that take-home. A fuel allowance is named for own transport, with no amount printed.

### When is the walk-in?

Direct walk-in from 21 to 30 October, timing 6 pm. The poster does not print the year. This listing uses October 2026.

### How do I contact them?

Akshaya on ${AKSHAYA_DISPLAY} or Jayalakshmi on ${JAYALAKSHMI_DISPLAY}. The poster lists both numbers under “For more details”.
`.trim();

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
        ilike(jobPostings.body, "%9042317629%"),
        ilike(jobPostings.body, "%90423 17629%"),
        ilike(jobPostings.body, "%8807914280%"),
        ilike(jobPostings.body, "%88079 14280%"),
        ilike(jobPostings.applicationUrl, "%919042317629%"),
        ilike(jobPostings.applicationUrl, "%918807914280%"),
      ),
    );

  const other = matches.filter((row) => row.slug !== JOB_SLUG);
  if (other.length > 0) {
    console.log("[seed-job] Same phone already on another listing. Skipping.");
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

  const [existingEmp] = await db
    .select({ id: employers.id })
    .from(employers)
    .where(eq(employers.slug, EMPLOYER_SLUG))
    .limit(1);

  let employerId: string;
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
  const validThrough = istToUtcDate(2026, 10, 30, 23, 59);
  const stillOpen = validThrough.getTime() > now.getTime();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "AR Caller (Fresher) — NYX walk-in, Triplicane",
    body,
    locationLabel: "Triplicane, Chennai",
    status: stillOpen ? ("open" as const) : ("closed" as const),
    employmentType: null,
    validThrough,
    applicationUrl: waApply(
      "Hello, I am asking about the AR Caller fresher night-shift walk-in in Triplicane with NYX. I saw the opening on MyChennaiCity.",
    ),
    salaryDisclosed: false,
    salaryMin: null,
    salaryMax: null,
    openingsCount: 1,
    remotePolicy: "onsite" as const,
    updatedAt: now,
  };

  if (existingJob) {
    await db.update(jobPostings).set(values).where(eq(jobPostings.id, existingJob.id));
    console.log("[seed-job] Refreshed job:", JOB_SLUG, values.status);
  } else {
    await db.insert(jobPostings).values({
      ...values,
      publishedAt: now,
      createdAt: now,
    });
    console.log("[seed-job] Inserted job:", JOB_SLUG, values.status);
  }

  console.log("[seed-job] EN:", `/chennai-jobs/${JOB_SLUG}`);
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
