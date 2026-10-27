/**
 * Area Sales Manager — South (Textile Machinery), Coimbatore.
 * Source note (23 Oct 2026): full-time field role; reports to Regional
 * Manager – South; territory Coimbatore–Palladam–Somanur–Erode–Karur–Salem;
 * bachelor's; 3–6 years industrial equipment / capital goods / machinery sales;
 * Tamil and English; compensation “industry standard”, no figure.
 * Profiles to murugesh@vsupportsolutions.in and 82200 14457.
 * The notice does not name the machinery company or a vacancy count.
 * V Support Solutions (vsupportsolutions.in) is the hiring mailbox.
 *
 * Dev:  `npm run db:seed:chennai-job:v-support-area-sales-manager`
 * Live: `npm run db:seed:chennai-job:v-support-area-sales-manager:live`
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

const EMPLOYER_SLUG = "v-support-solutions";
const EMPLOYER_NAME = "V Support Solutions";
const EMPLOYER_SITE = "https://vsupportsolutions.in/";
const JOB_SLUG = "area-sales-manager-south-textile-machinery-coimbatore";
const PHONE_DISPLAY = "82200 14457";
const EMAIL = "murugesh@vsupportsolutions.in";
const WA = `https://wa.me/918220014457?text=${encodeURIComponent(
  "Hello, I am applying for the Area Sales Manager — South (Textile Machinery) role in Coimbatore. I saw the opening on MyChennaiCity and I am sending my profile.",
)}`;

const body = `
**V Support Solutions** is collecting profiles for **Area Sales Manager — South (Textile Machinery)**. The base named in the notice is **Coimbatore**, with regular field travel across the **Coimbatore–Palladam–Somanur–Erode–Karur–Salem** belt. This is not a Chennai office.

The notice describes the workplace as a full-stack industrial equipment and services company that supplies machinery, spare parts, maintenance, and repair to small and mid-sized textile and weaving units. It does **not** print that company’s name. Send profiles to **${EMAIL}** or **${PHONE_DISPLAY}**. Confirm who the employer is, and where you will sit, before you travel or accept.

Pay is described only as industry-standard compensation, commensurate with experience. No figure and no vacancy count were given.

## Role at a glance

- **Position:** Area Sales Manager — South (Textile Machinery)
- **Engagement:** Full-time
- **Reports to:** Regional Manager – South
- **Base:** Coimbatore, Tamil Nadu
- **Territory:** Coimbatore, Palladam, Somanur, Erode, Karur, and Salem, with daily field travel
- **Experience asked:** 3–6 years in industrial equipment, capital goods, or machinery sales
- **Education:** Bachelor’s degree; engineering, textile technology, or a related technical field is an advantage, not a requirement
- **Languages:** Tamil and English; Hindi is an advantage
- **Pay:** Not stated (industry standard, commensurate with experience)
- **Hiring contact:** ${EMPLOYER_NAME}

## What the role covers

- Visit weaving and textile manufacturing units in the territory and keep those relationships
- Present and demonstrate machinery, including live working demonstrations
- Run the sales pipeline from lead and qualification through quotation, negotiation, and close, in a CRM or lead tracker
- Talk customers through machine exchange and upgrade, including older equipment offered as part of an upgrade
- Work with local technicians, fitters, and service providers
- Share customer requirements, pricing feedback, and competitive activity with the reporting manager
- Coordinate order processing, delivery timelines, and after-sales support with internal teams
- Represent the organisation at industry and trade forums when asked

The notice calls this a field-first role: daily travel, hands-on customer work, and building a territory with periodic remote supervision.

## Who they say they want

- Bachelor’s degree
- 3–6 years in industrial equipment, capital goods, or machinery sales
- Textile or weaving machinery experience is preferred
- Familiarity with the Tamil Nadu textile belt (Coimbatore, Tirupur, Erode, Karur, Salem, and nearby clusters) is a strong plus
- Working knowledge of weaving machinery (for example rapier and air-jet looms) is preferred; the notice says product training will be provided
- Comfortable with extensive daily travel; own two-wheeler or four-wheeler and a valid driving licence are preferred
- Tamil and English; working knowledge of Hindi is an advantage
- Basic comfort with CRM tools, WhatsApp Business, and reporting on a phone
- Able to work independently

## What the notice says they offer

- A new sales territory to build from an early stage
- Day-to-day autonomy, with a path to a larger regional role if the territory grows
- Structured onboarding and product training, and support from the reporting manager
- Work in an industrial equipment and services business aimed at MSME manufacturers

No salary figure, incentive plan, or street address is printed.

## How to apply

Send your profile. Say you are applying for Area Sales Manager — South (Textile Machinery), Coimbatore, and that you saw it on MyChennaiCity.

- Email [${EMAIL}](mailto:${EMAIL}?subject=${encodeURIComponent("Area Sales Manager — South (Textile Machinery), Coimbatore")})
- **${PHONE_DISPLAY}** — [WhatsApp](${WA}) or [call](tel:+918220014457)
- Company site [vsupportsolutions.in](${EMPLOYER_SITE})

Do not pay a registration or training fee. The notice says product training is provided. Confirm the employer, the territory, and the pay before you share documents or travel to Coimbatore.

This page is compiled from the hiring note. It is not the employer’s careers page.

## Common questions

### Where is this Area Sales Manager role based?

Coimbatore, with regular travel across Coimbatore, Palladam, Somanur, Erode, Karur, and Salem. The notice does not print a street. It is not a Chennai posting.

### Who is the employer?

Profiles go to V Support Solutions (${EMAIL}, ${PHONE_DISPLAY}). The notice describes an industrial equipment company serving textile and weaving units and does not print that company’s name. Ask who you will be employed by before you accept.

### What is the salary?

The notice says industry-standard pay, commensurate with experience. It does not give a figure, so this listing does not publish a salary band.

### What experience do they want?

A bachelor’s degree and 3–6 years in industrial equipment, capital goods, or machinery sales. Textile or weaving machinery, and familiarity with the Coimbatore–Tirupur–Erode–Karur–Salem clusters, are preferred. Tamil and English are required.

### How do I apply?

Email your profile to ${EMAIL}, or message ${PHONE_DISPLAY} on WhatsApp.
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
        ilike(jobPostings.body, "%8220014457%"),
        ilike(jobPostings.body, "%82200 14457%"),
        ilike(jobPostings.body, "%murugesh@vsupportsolutions.in%"),
        ilike(jobPostings.applicationUrl, "%918220014457%"),
      ),
    );

  const other = matches.filter((row) => row.slug !== JOB_SLUG);
  if (other.length > 0) {
    console.log("[seed-job] Same phone or email already on another listing. Skipping.");
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
        verified: false,
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
    title:
      "Area Sales Manager — South (Textile Machinery) · Coimbatore",
    body,
    locationLabel: "Coimbatore, Tamil Nadu",
    status: "open" as const,
    employmentType: "FULL_TIME" as const,
    validThrough,
    applicationUrl: WA,
    salaryDisclosed: false,
    salaryMin: null,
    salaryMax: null,
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

  console.log("[seed-job] Done. Detail:", `/chennai-jobs/${JOB_SLUG}`);
  await finishListingSeedLive({
    jobSlug: JOB_SLUG,
    label: "seed-v-support-area-sales-manager",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
