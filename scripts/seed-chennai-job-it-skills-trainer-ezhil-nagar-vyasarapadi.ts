/**
 * IT Skills Trainer — college-based, Chennai.
 * Source note (23 Oct 2026): offline college training, 40 hours;
 * weekdays 5 PM–7 PM, weekends 6 hours; freshers and experienced;
 * Ezhil Nagar 3 days and Vyasarapadi 3 days; Chennai locals only;
 * bus or train pass may be reimbursed or provided; food and stay not provided.
 * Company, college names, salary, and vacancy count were not given.
 *
 * Dev:  `npm run db:seed:chennai-job:it-skills-trainer-ezhil-nagar`
 * Live: `npm run db:seed:chennai-job:it-skills-trainer-ezhil-nagar:live`
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

const EMPLOYER_SLUG = "chennai-college-it-skills-training";
const EMPLOYER_NAME = "College IT skills training, Chennai";
const JOB_SLUG = "it-skills-trainer-ezhil-nagar-vyasarapadi-chennai";
const PHONE_1 = "63811 80069";
const PHONE_2 = "93459 99260";
const TEL_1 = "tel:+916381180069";
const TEL_2 = "tel:+919345999260";
const WA_1 = `https://wa.me/916381180069?text=${encodeURIComponent(
  "Hello, I am applying for the IT Skills Trainer role (college training, Ezhil Nagar and Vyasarapadi). I saw it on MyChennaiCity. I will share my resume, current location, and availability.",
)}`;
const WA_2 = `https://wa.me/919345999260?text=${encodeURIComponent(
  "Hello, I am applying for the IT Skills Trainer role (college training, Ezhil Nagar and Vyasarapadi). I saw it on MyChennaiCity. I will share my resume, current location, and availability.",
)}`;

const body = `
A client is hiring an **IT Skills Trainer** for **offline, college-based training** in Chennai. The notice does not name the company or the colleges. Sites named so far are **Ezhil Nagar** (3 days) and **Vyasarapadi** (3 days). The client sets the schedule and which site you are sent to.

The programme is **40 hours**. Freshers and experienced trainers can apply. **Only Chennai local candidates** can apply, and the trainer must be free for the **whole programme**.

Salary, a company name, college names, and a vacancy count were not given.

## Role at a glance

- **Position:** IT Skills Trainer
- **Mode:** Offline, college-based (not online)
- **Total duration:** 40 hours
- **Weekdays:** Monday to Friday, 5 PM–7 PM
- **Weekends:** 6 hours (days and clock times were not printed)
- **Experience:** Freshers and experienced trainers
- **Who can apply:** Chennai local candidates only
- **Availability:** Must be available throughout the entire training programme
- **Salary:** Not stated

## Where the batches run

- **Ezhil Nagar** — 3 days
- **Vyasarapadi** — 3 days
- Training schedule and location allocation are as planned by the client

A door number and the college names were not given. Confirm the campus before you travel.

## Training modules

**Module 1 — Python programming**

- OOP concepts
- Data structures and algorithms (DSA)
- File handling and exception handling
- Mini project

**Module 2 — Artificial intelligence**

- AI fundamentals
- Prompt engineering
- AI tools
- AI project

**Module 3 — Website design and development**

- HTML, CSS, and JavaScript
- Website development project

**Module 4 — Microsoft Office applications**

- MS Word
- MS Excel
- MS PowerPoint
- Outlook and Microsoft Teams

**Module 5 — AI-powered productivity tools**

- AI-powered email writing
- Data cleaning and organisation
- Generating Word and PowerPoint content

## Who should apply

- Strong knowledge of the relevant training topics
- Freshers with good technical knowledge and an interest in a trainer role
- Experienced trainers
- Good communication and presentation skills
- Chennai local candidates only
- Available for the entire 40-hour programme

## Travel, food, and stay

- A **bus pass or train pass** may be reimbursed, or a pass may be provided
- **Food will not be provided**
- **Accommodation will not be provided**

## How to apply

Share your **updated resume, current location, and availability**. Say you are applying for the IT Skills Trainer college programme, and that you saw it on MyChennaiCity.

- **${PHONE_1}** — [WhatsApp](${WA_1}) or [call](${TEL_1})
- **${PHONE_2}** — [WhatsApp](${WA_2}) or [call](${TEL_2})

Do not pay a registration fee. Confirm the campus, the dates, and the pay before you travel.

This page is compiled from the hiring note. It is not an employer careers page.

## Common questions

### Who can apply for the IT Skills Trainer role?

Freshers with good technical knowledge, and experienced trainers. You need communication and presentation skills, and knowledge of the modules you will teach. Only Chennai local candidates can apply, and you must be free for the whole 40-hour programme.

### What is the salary?

The notice does not state a salary, so this listing does not publish a pay band.

### Where is the training, and what are the hours?

Offline, at colleges. The note names Ezhil Nagar for 3 days and Vyasarapadi for 3 days. The client allocates the rest of the schedule. Weekdays are Monday to Friday, 5 PM to 7 PM. Weekends are 6 hours. The total programme is 40 hours. College names and a start date were not given.

### Is food, stay, or travel covered?

Food and accommodation are not provided. A bus pass or a train pass may be reimbursed, or a pass may be provided.

### How do I apply?

Send your updated resume, current location, and availability to ${PHONE_1} or ${PHONE_2}.
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
        ilike(jobPostings.body, "%6381180069%"),
        ilike(jobPostings.body, "%63811 80069%"),
        ilike(jobPostings.body, "%9345999260%"),
        ilike(jobPostings.body, "%93459 99260%"),
        ilike(jobPostings.applicationUrl, "%916381180069%"),
        ilike(jobPostings.applicationUrl, "%919345999260%"),
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

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "IT Skills Trainer — Ezhil Nagar and Vyasarapadi",
    body,
    locationLabel: "Ezhil Nagar and Vyasarapadi, Chennai",
    status: "open" as const,
    employmentType: null,
    validThrough,
    applicationUrl: WA_1,
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
    label: "seed-it-skills-trainer-ezhil-nagar",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
