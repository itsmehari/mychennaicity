/**
 * Field Recruiter — Eureka Forbes Ltd., Anna Nagar, Adyar, and Pammal.
 * Poster (26 Oct 2026): Field Recruiter. Hires water purifier technician,
 * CRO, and inventory coordinator. 1-5 years. Tamil and English. Bike
 * mandatory. Chennai local knowledge. Salary as per market standard.
 * Male candidate preferred. Biswajit 8093640292 / 7776921140.
 * biswajit.panigrahy@eurekaforbes.com
 * laxmikant.todekar.cn@eurekaforbes.com (printed with .cn).
 * Note adds: experience in field / technician / blue collar hiring;
 * bike and license; CRO in-house; fuel and incentive; immediate joining.
 * No rupee figure, street, vacancy count, or employment type.
 * English only.
 *
 * Flyer: `public/images/listings/eureka-forbes-field-recruiter-chennai-october-2026.jpg`
 *
 * Dev:  `npm run db:seed:chennai-job:eureka-forbes-field-recruiter`
 * Live: `npm run db:seed:chennai-job:eureka-forbes-field-recruiter:live`
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

const EMPLOYER_SLUG = "eureka-forbes";
const EMPLOYER_NAME = "Eureka Forbes Ltd.";
const EMPLOYER_SITE = "https://www.eurekaforbes.com/";
const CAREERS = "https://www.eurekaforbes.com/work-with-us";
const JOB_SLUG = "field-recruiter-eureka-forbes-anna-nagar-adyar-pammal";
const FLYER =
  "/images/listings/eureka-forbes-field-recruiter-chennai-october-2026.jpg";
const PHONE_1 = "8093640292";
const PHONE_2 = "7776921140";
const EMAIL_1 = "biswajit.panigrahy@eurekaforbes.com";
const EMAIL_2 = "laxmikant.todekar.cn@eurekaforbes.com";

function waApply(phone: string) {
  const text =
    "Hello Biswajit, I am writing about the Eureka Forbes field recruiter opening in Anna Nagar, Adyar, and Pammal. I saw the opening on MyChennaiCity.";
  return `https://wa.me/91${phone}?text=${encodeURIComponent(text)}`;
}

const WA_1 = waApply(PHONE_1);
const WA_2 = waApply(PHONE_2);

const body = `
**Eureka Forbes Ltd.** is hiring a **Field Recruiter** for the service team in **Anna Nagar, Adyar, and Pammal, Chennai**. The recruiter’s job is to hire for three service seats: a water purifier technician, a customer relationship officer, and an inventory coordinator. The poster says **male candidate preferred**. The note sent with the poster says **male preferred**.

The note asks for **immediate joining**. The poster does not print a joining date. A street address, a vacancy count, and a full-time or part-time label are not on the poster or the note.

![Eureka Forbes field recruiter poster, Anna Nagar, Adyar, and Pammal, Chennai](${FLYER})

## Role at a glance

- **Position:** Field Recruiter
- **Employer:** Eureka Forbes Ltd.
- **Areas:** Anna Nagar, Adyar, and Pammal, Chennai
- **Preference on the poster:** Male candidate preferred (the note says male preferred)
- **Languages:** Tamil and English — must
- **Bike:** Bike mandatory on the poster. The note says must have bike and license.
- **Experience:** 1-5 years on the poster. The note says 1-5 years in field, technician, or blue collar hiring.
- **Pay:** As per market standard on the poster. The note adds fuel and incentive. No rupee figure is printed.
- **Joining:** Immediate joining, on the note only
- **Company site:** [eurekaforbes.com](${EMPLOYER_SITE})

## Seats this recruiter will fill

The opening on the poster is the field recruiter seat. These are the roles that person is asked to hire:

1. **Water purifier technician**
2. **Customer relationship officer (CRO).** The note adds that the CRO seat is in-house. The poster prints CRO only.
3. **Inventory coordinator**

The poster and the note do not give a headcount for the recruiter seat or for any of the three seats above.

## What they ask for

- **Experience:** 1-5 years of experience on the poster. The note narrows that to field, technician, or blue collar hiring.
- **Languages:** Tamil and English, marked as a must on the poster and on the note.
- **Travel:** Bike mandatory on the poster. The note prints “Must have Bike & License.”
- **City:** Chennai local knowledge on the poster. The note says good knowledge of the Chennai local market.

The line under the company name on the poster is “Trusted for health and hygiene since 1982.”

## Pay

The poster prints **salary as per market standard**. The note prints **as per market standard, plus fuel and incentive**. Neither source prints a rupee amount, so this listing leaves the salary undisclosed.

## How to apply

Contact **Biswajit** for the interview. The poster prints two mobile numbers and two email addresses.

- Call **[${PHONE_1}](tel:+91${PHONE_1})** or [WhatsApp ${PHONE_1}](${WA_1})
- Call **[${PHONE_2}](tel:+91${PHONE_2})** or [WhatsApp ${PHONE_2}](${WA_2})
- Email **[${EMAIL_1}](mailto:${EMAIL_1})**
- Email **[${EMAIL_2}](mailto:${EMAIL_2})** — the poster prints \`.cn\` in that address

The note asks readers to refer the opening to friends. Say you saw the opening on MyChennaiCity.

Eureka Forbes also publishes a public careers page, [Work with us](${CAREERS}). This listing is compiled from the poster and the note, separate from that careers page.

## Common questions

### Who can apply for the Eureka Forbes field recruiter job in Chennai?

The poster asks for 1-5 years of experience, Tamil and English, a bike, and Chennai local knowledge. The note adds field, technician, or blue collar hiring experience, and a license along with the bike. The poster says male candidate preferred. The note says male preferred. A vacancy count is not printed.

### Where is the work?

Anna Nagar, Adyar, and Pammal, Chennai. The poster and the note do not print a street or a door number.

### What does the field recruiter hire for?

Water purifier technician, customer relationship officer (the note says the CRO seat is in-house), and inventory coordinator. The advertised seat is the field recruiter.

### What is the salary?

As per market standard on the poster. The note adds fuel and incentive. No rupee amount is printed.

### How do I apply?

Call or WhatsApp Biswajit on ${PHONE_1} or ${PHONE_2}, or email ${EMAIL_1} and ${EMAIL_2}. The note says immediate joining.
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
        ilike(jobPostings.body, `%${PHONE_1}%`),
        ilike(jobPostings.body, `%${PHONE_2}%`),
        ilike(jobPostings.body, `%${EMAIL_1}%`),
        ilike(jobPostings.body, `%${EMAIL_2}%`),
        ilike(jobPostings.applicationUrl, `%${PHONE_1}%`),
        ilike(jobPostings.title, "%Eureka Forbes%"),
      ),
    );

  const other = matches.filter((row) => row.slug !== JOB_SLUG);
  if (other.length > 0) {
    console.log("[seed-job] Same phone, email, or employer title already on another listing. Skipping.");
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
    title: "Field Recruiter — Eureka Forbes, Anna Nagar, Adyar, Pammal",
    body,
    locationLabel: "Anna Nagar, Adyar, Pammal, Chennai",
    status: "open" as const,
    employmentType: null,
    validThrough,
    applicationUrl: WA_1,
    salaryDisclosed: false,
    salaryMin: null,
    salaryMax: null,
    openingsCount: 1,
    remotePolicy: "field" as const,
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
