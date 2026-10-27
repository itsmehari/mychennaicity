/**
 * MIS Executive — DeLiveDe Private Limited, Thousand Lights.
 * Note (26 Oct 2026): B.Com only; ₹18,000 CTC per month; take-home may
 * vary; 5th floor, Murugesan Naicker Complex, No. 84, Greams Road,
 * B-Block, Thousand Lights 600006. Job type, years, vacancy count, and
 * a phone were not given. English only.
 *
 * Short link https://forms.gle/6o5VtJpqsJUWLBkc8 resolves to FORM below.
 *
 * Dev:  `npm run db:seed:chennai-job:delivede-mis-executive`
 * Live: `npm run db:seed:chennai-job:delivede-mis-executive:live`
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

const EMPLOYER_SLUG = "delivede-private-limited";
const EMPLOYER_NAME = "DeLiveDe Private Limited";
const EMPLOYER_SITE = "https://delivede.com/";
const JOB_SLUG = "mis-executive-delivede-thousand-lights";
const FORM_SHORT = "https://forms.gle/6o5VtJpqsJUWLBkc8";
const FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSfpu7spQacCbAMrKVh_lKQaow9w4CVMfwnNRwzTmbA2buAUag/viewform?usp=send_form";

const body = `
**DeLiveDe Private Limited** is hiring an **MIS Executive** at its office in **Thousand Lights, Chennai**. The role is data and reporting work in **MS Excel**: collect figures from internal teams, check them, and turn them into daily, weekly, and monthly reports for management.

The printed pay is **₹18,000 CTC per month**. The note says take-home can be lower once deductions and company policy are applied. It does not print a second in-hand figure. It also does not say whether the seat is full-time, part-time, or contract, and it does not give a vacancy count or a minimum number of years.

## Role at a glance

- **Position:** MIS Executive
- **Employer:** DeLiveDe Private Limited
- **Qualification:** B.Com only
- **Salary:** ₹18,000 CTC per month (take-home may be lower)
- **Office:** 5th Floor, Murugesan Naicker Complex, No. 84, Greams Road, B-Block, Thousand Lights, Chennai 600006
- **Company site:** [delivede.com](${EMPLOYER_SITE})

## What the role covers

- Prepare and keep daily, weekly, and monthly MIS reports in MS Excel
- Collect, consolidate, clean, and check data that comes from internal teams
- Keep databases and records accurate and consistent
- Use formulas, sorting, filtering, and basic Excel tools to organise and read the data
- Build summaries, trackers, and simple dashboards for day-to-day monitoring
- Spot mismatches, follow up with the team that owns the data, and help close the reporting gap
- Send reports on the agreed dates and keep the paperwork
- Treat company information as confidential

## Who can apply

**B.Com is mandatory.** The notice says candidates with any other qualification are not eligible.

The skills they name are working knowledge of MS Excel (formulas, sorting, filtering, and data handling), comfort with numbers, and care about accuracy. They also ask for communication, coordination, and time management, the ability to work alone and with a team, and a willingness to learn the reporting process and the business systems.

The notice does not state a minimum number of years.

## How to apply

Eligible candidates fill the **[DeLiveDe registration form](${FORM})**. The notice prints the short link [${FORM_SHORT.replace("https://", "")}](${FORM_SHORT}).

The notice does not print a phone number or an email for this opening.

This page is compiled from the hiring note. It is not a DeLiveDe careers page.

## Common questions

### Who can apply for the MIS Executive job in Thousand Lights?

Only B.Com graduates. The notice says other qualifications are not eligible. It asks for basic MS Excel, numerical and analytical work, and attention to detail. It does not state a minimum number of years.

### What is the salary?

₹18,000 CTC per month. The note says actual take-home may vary because of deductions and company policy. It does not print a separate in-hand amount.

### Where is the office?

5th Floor, Murugesan Naicker Complex, No. 84, Greams Road, B-Block, Thousand Lights, Chennai, Tamil Nadu 600006. The company site named in the note is delivede.com.

### How do I apply?

Fill the registration form. The short link on the notice is ${FORM_SHORT}. No phone or email is printed for this opening.
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
        ilike(jobPostings.title, "%DeLiveDe%"),
        ilike(jobPostings.body, "%delivede.com%"),
        ilike(jobPostings.body, "%6o5VtJpqsJUWLBkc8%"),
        ilike(jobPostings.applicationUrl, "%6o5VtJpqsJUWLBkc8%"),
        ilike(jobPostings.applicationUrl, "%1FAIpQLSfpu7spQacCbAMrKVh%"),
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
      .set({
        name: EMPLOYER_NAME,
        websiteUrl: EMPLOYER_SITE,
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer refreshed:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: EMPLOYER_NAME,
        slug: EMPLOYER_SLUG,
        websiteUrl: EMPLOYER_SITE,
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

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "MIS Executive — DeLiveDe, Thousand Lights",
    body,
    locationLabel: "Thousand Lights, Chennai",
    status: "open" as const,
    employmentType: null,
    validThrough,
    applicationUrl: FORM,
    salaryDisclosed: true,
    salaryMin: 18000,
    salaryMax: 18000,
    openingsCount: 1,
    remotePolicy: "onsite" as const,
    updatedAt: now,
  };

  if (existingJob) {
    await db.update(jobPostings).set(values).where(eq(jobPostings.id, existingJob.id));
    console.log("[seed-job] Refreshed:", JOB_SLUG);
  } else {
    await db.insert(jobPostings).values({
      ...values,
      publishedAt: now,
      createdAt: now,
    });
    console.log("[seed-job] Inserted:", JOB_SLUG);
  }

  console.log("[seed-job] Done. Detail:", `/chennai-jobs/${JOB_SLUG}`);
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
