/**
 * AC technician and helper — Madipakkam. English + Tamil.
 * Source note (16 Oct 2026): VV Placement Services; salary ₹15,000–₹30,000;
 * room and food; 91767 97745. Street address was not supplied.
 *
 * Dev:  `npm run db:seed:chennai-job:ac-technician-madipakkam`
 * Live: `npm run db:seed:chennai-job:ac-technician-madipakkam:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq, inArray } from "drizzle-orm";
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

const EMPLOYER_SLUG = "vv-placement-services";
const LEGACY_EMPLOYER_SLUG = "ac-service-madipakkam-chennai";
const EMPLOYER_NAME = "VV Placement Services";
const EN_SLUG = "ac-technician-helper-50-vacancies-madipakkam-chennai";
const PREVIOUS_EN_SLUGS = ["ac-technician-helper-madipakkam-chennai"];
const TA_SLUG_VISIBLE =
  "ஏசி-டெக்னீஷன்-ஹெல்பர்-50-காலியிடம்-மடிப்பாக்கம்-சென்னை";
const TA_SLUG = encodeURIComponent(TA_SLUG_VISIBLE);
const PREVIOUS_TA_SLUGS = ["ac-technician-helper-madipakkam-chennai-tamil"];
const PHONE_DISPLAY = "91767 97745";

function waApply(text: string) {
  return `https://wa.me/919176797745?text=${encodeURIComponent(text)}`;
}

const enBody = `
**50 vacancies** for **AC technician** and **helper** in **Madipakkam, Chennai** — **VV Placement Services**. Salary **₹15,000–₹30,000** a month, with **room and food**. Call or WhatsApp **${PHONE_DISPLAY}**.

The street address was not supplied. Both roles are full time and onsite.

## Role at a glance

- **Positions:** AC technician; helper
- **Job type:** Full time, onsite
- **Location:** Madipakkam, Chennai
- **Salary:** ₹15,000–₹30,000 per month
- **Benefits:** Room and food
- **Employer:** VV Placement Services
- **Vacancies:** 50 in total (AC technician and helper; the note does not split the 50)

## How to apply

Call or WhatsApp **${PHONE_DISPLAY}**. Say you are applying for the AC technician or helper opening in Madipakkam, and that you saw it on MyChennaiCity.

Tamil listing: [தமிழில் படிக்க](/chennai-jobs/${TA_SLUG}).

## Common questions

### What is the salary for the AC technician and helper jobs in Madipakkam?

The stated pay is ₹15,000 to ₹30,000 a month. The note does not say which role sits at which end of that band.

### Is accommodation included?

Yes. Room and food are included.

### How do I apply?

Call or WhatsApp ${PHONE_DISPLAY}. Mention MyChennaiCity and whether you are applying as an AC technician or a helper.

### Who is hiring?

VV Placement Services. Call or WhatsApp ${PHONE_DISPLAY}.

### Where is the job?

Madipakkam, Chennai. A door number was not given in the hiring note.
`.trim();

const taBody = `
**VV Placement Services** மடிப்பாக்கம், சென்னையில் **ஏசி டெக்னீஷன்** மற்றும் **ஹெல்பர்** வேலைக்கு **50 காலியிடங்கள்** உள்ளன. மாத சம்பளம் **₹15,000–₹30,000**. **அறையும் உணவும்** உண்டு. அழைக்க அல்லது WhatsApp செய்ய **${PHONE_DISPLAY}**.

தெரு முகவரி தரப்படவில்லை. இரண்டு வேலைகளும் முழு நேரம்; இடத்திலேயே வேலை.

## Role at a glance

- **பதவி:** ஏசி டெக்னீஷன்; ஹெல்பர்
- **வகை:** முழு நேரம், இடத்திலேயே
- **இடம்:** மடிப்பாக்கம், சென்னை
- **சம்பளம்:** மாதம் ₹15,000–₹30,000
- **சலுகை:** அறை மற்றும் உணவு
- **நிறுவனம்:** VV Placement Services
- **காலியிடங்கள்:** மொத்தம் 50 (ஏசி டெக்னீஷன் மற்றும் ஹெல்பர்; 50-ஐ எப்படிப் பிரிப்பது என்று குறிப்பில் இல்லை)

## How to apply

**${PHONE_DISPLAY}** என்ற எண்ணுக்கு அழைக்கவும் அல்லது WhatsApp செய்யவும். மடிப்பாக்கம் ஏசி டெக்னீஷன் அல்லது ஹெல்பர் வேலைக்கு விண்ணப்பிப்பதாகவும், MyChennaiCity-யில் பார்த்ததாகவும் சொல்லுங்கள்.

English listing: [Read in English](/chennai-jobs/${EN_SLUG}).

## பொதுவான கேள்விகள்

### மடிப்பாக்கம் ஏசி டெக்னீஷன் மற்றும் ஹெல்பர் சம்பளம் என்ன?

சொல்லப்பட்ட சம்பளம் மாதம் ₹15,000 முதல் ₹30,000 வரை. எந்த பதவிக்கு எந்த தொகை என்று குறிப்பில் இல்லை.

### தங்குமிடம் உண்டா?

உண்டு. அறையும் உணவும் சேர்த்தே தருகிறார்கள்.

### எப்படி விண்ணப்பிப்பது?

${PHONE_DISPLAY} என்ற எண்ணுக்கு அழைக்கவும் அல்லது WhatsApp செய்யவும். ஏசி டெக்னீஷனா, ஹெல்பரா என்பதையும் MyChennaiCity-யில் பார்த்ததையும் சொல்லுங்கள்.

### யார் தேடுகிறார்கள்?

VV Placement Services. அழைக்க அல்லது WhatsApp செய்ய ${PHONE_DISPLAY}.

### வேலை எங்கே?

மடிப்பாக்கம், சென்னை. கதவு எண் குறிப்பில் இல்லை.
`.trim();

async function upsertJob(input: {
  cityId: string;
  employerId: string;
  slug: string;
  title: string;
  body: string;
  locationLabel: string;
  applicationUrl: string;
  now: Date;
  validThrough: Date;
}) {
  const [existingJob] = await db
    .select({ id: jobPostings.id })
    .from(jobPostings)
    .where(
      and(eq(jobPostings.cityId, input.cityId), eq(jobPostings.slug, input.slug)),
    )
    .limit(1);

  const previous =
    input.slug === EN_SLUG
      ? PREVIOUS_EN_SLUGS
      : input.slug === TA_SLUG
        ? PREVIOUS_TA_SLUGS
        : [];
  const [aliasJob] = existingJob || previous.length === 0
    ? []
    : await db
        .select({ id: jobPostings.id })
        .from(jobPostings)
        .where(
          and(eq(jobPostings.cityId, input.cityId), inArray(jobPostings.slug, previous)),
        )
        .limit(1);
  const row = existingJob ?? aliasJob;

  const values = {
    employerId: input.employerId,
    cityId: input.cityId,
    slug: input.slug,
    title: input.title,
    body: input.body,
    locationLabel: input.locationLabel,
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough: input.validThrough,
    applicationUrl: input.applicationUrl,
    salaryDisclosed: true,
    salaryMin: 15000,
    salaryMax: 30000,
    openingsCount: 50,
    remotePolicy: "onsite" as const,
    updatedAt: input.now,
  };

  if (row) {
    await db.update(jobPostings).set(values).where(eq(jobPostings.id, row.id));
    console.log("[seed-job] Refreshed open job:", input.slug);
  } else {
    await db.insert(jobPostings).values({
      ...values,
      publishedAt: input.now,
      createdAt: input.now,
    });
    console.log("[seed-job] Inserted open job:", input.slug);
  }
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

  let employerId: string;
  const [existingEmp] = await db
    .select({ id: employers.id })
    .from(employers)
    .where(eq(employers.slug, EMPLOYER_SLUG))
    .limit(1);

  const [legacyEmp] = existingEmp
    ? []
    : await db
        .select({ id: employers.id })
        .from(employers)
        .where(eq(employers.slug, LEGACY_EMPLOYER_SLUG))
        .limit(1);

  const employerRow = existingEmp ?? legacyEmp;

  if (employerRow) {
    employerId = employerRow.id;
    await db
      .update(employers)
      .set({
        name: EMPLOYER_NAME,
        slug: EMPLOYER_SLUG,
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
        verified: false,
      })
      .returning({ id: employers.id });
    employerId = ins.id;
    console.log("[seed-job] Inserted employer:", EMPLOYER_SLUG);
  }

  const now = new Date();
  const validThrough = new Date(now);
  validThrough.setDate(validThrough.getDate() + 90);

  await upsertJob({
    cityId: city.id,
    employerId,
    slug: EN_SLUG,
    title: "AC Technician and Helper · 50 vacancies · Madipakkam, Chennai",
    body: enBody,
    locationLabel: "Madipakkam, Chennai",
    applicationUrl: waApply(
      "Hello, I am applying for the AC technician or helper role in Madipakkam. I saw the opening on MyChennaiCity.",
    ),
    now,
    validThrough,
  });

  await upsertJob({
    cityId: city.id,
    employerId,
    slug: TA_SLUG,
    title: "ஏசி டெக்னீஷன் மற்றும் ஹெல்பர் · 50 காலியிடம் · மடிப்பாக்கம், சென்னை",
    body: taBody,
    locationLabel: "மடிப்பாக்கம், சென்னை",
    applicationUrl: waApply(
      "வணக்கம், மடிப்பாக்கம் ஏசி டெக்னீஷன் அல்லது ஹெல்பர் வேலைக்கு விண்ணப்பிக்கிறேன். MyChennaiCity-யில் பார்த்தேன்.",
    ),
    now,
    validThrough,
  });

  console.log("[seed-job] Done.");
  console.log("[seed-job] EN:", `/chennai-jobs/${EN_SLUG}`);
  console.log("[seed-job] TA:", `/chennai-jobs/${TA_SLUG}`);
  await finishListingSeedLive({ jobSlug: EN_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
