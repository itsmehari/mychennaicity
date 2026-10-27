/**
 * Amazon picker & packer — Porur and Mugalivakkam. English + Tamil.
 * Source note (21 Oct 2026): HR Diya, WhatsApp 90438 55191. Immediate joining.
 * Shifts as printed. Salary ₹16,000–₹20,000. Part-time also available.
 * Third-party hiring contact, not Amazon's official careers page.
 *
 * Dev:  `npm run db:seed:chennai-job:amazon-picker-packer-porur`
 * Live: `npm run db:seed:chennai-job:amazon-picker-packer-porur:live`
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

const EMPLOYER_SLUG = "hr-diya-chennai";
const EMPLOYER_NAME = "HR Diya";
const EN_SLUG = "amazon-picker-packer-porur-mugalivakkam";
const TA_SLUG = `${EN_SLUG}-tamil`;
const PHONE_DISPLAY = "+91 90438 55191";

function waApply(text: string) {
  return `https://wa.me/919043855191?text=${encodeURIComponent(text)}`;
}

const enBody = `
**Immediate joining** for **Amazon picker and packer** work in **Porur** and **Mugalivakkam**, Chennai. HR contact **Diya**. Salary **₹16,000–₹20,000** a month. **Part-time is also available.** WhatsApp **${PHONE_DISPLAY}**.

This notice came from HR Diya. It is a third-party hiring contact, not Amazon’s official careers page. Confirm the exact site, shift, and pay with Diya before you travel.

## Role at a glance

- **Role:** Picker and packer
- **Locations:** Porur and Mugalivakkam, Chennai
- **Who can apply:** Male and female
- **Age:** 18 to 35 years
- **Qualification:** 10th standard up to any degree
- **Joining:** Immediate joiners
- **Salary:** ₹16,000–₹20,000 per month
- **Part-time:** Also available — ask which shift and whether the rate differs
- **Hiring contact:** HR Diya

## Shifts

- 6:00 AM – 3:00 PM
- 7:00 AM – 4:00 PM
- 9:00 AM – 6:00 PM
- 3:00 PM – 10:00 PM
- 10:00 PM – 6:00 AM

## How to apply

WhatsApp **HR Diya** at **${PHONE_DISPLAY}**. Say you are interested in the Amazon picker and packer opening in Porur or Mugalivakkam, and that you saw it on MyChennaiCity.

Tamil listing: [தமிழில் படிக்க](/chennai-jobs/${TA_SLUG}).

## Common questions

### Who can apply for the Amazon picker and packer jobs in Porur and Mugalivakkam?

Male and female candidates aged 18 to 35, with qualification from 10th standard up to any degree. Immediate joiners are needed.

### What is the salary?

₹16,000 to ₹20,000 a month, as printed on the notice. Confirm the figure for your shift with HR Diya. Part-time is also available.

### How do I apply?

WhatsApp ${PHONE_DISPLAY}. Do not pay any registration or security fee. Confirm the worksite before you join.
`.trim();

const taBody = `
**போரூர்** மற்றும் **முகலிவாக்கம்**, சென்னையில் **அமேசான் பிக்கர் மற்றும் பேக்கர்** வேலை. **உடனே சேரக்கூடியவர்கள்** தேவை. சம்பளம் மாதம் **₹16,000–₹20,000**. **பகுதி நேரமும் உண்டு.** WhatsApp **${PHONE_DISPLAY}** — **HR தியா**.

இந்த அறிவிப்பு HR தியாவிடமிருந்து வந்தது. இது அமேசான் அதிகாரப்பூர்வ வேலைவாய்ப்பு பக்கம் அல்ல. பயணப்படும் முன் இடம், ஷிப்ட், சம்பளம் ஆகியவற்றை உறுதிப்படுத்துங்கள்.

## பணி சுருக்கம்

- **பதவி:** பிக்கர் மற்றும் பேக்கர்
- **இடம்:** போரூர் மற்றும் முகலிவாக்கம், சென்னை
- **யார் விண்ணப்பிக்கலாம்:** ஆண் மற்றும் பெண்
- **வயது:** 18 முதல் 35 வரை
- **தகுதி:** 10ஆம் வகுப்பு முதல் எந்தப் பட்டமும்
- **சேர்க்கை:** உடனே சேரக்கூடியவர்கள்
- **சம்பளம்:** மாதம் ₹16,000–₹20,000
- **பகுதி நேரம்:** உண்டு — ஷிப்ட்டும் சம்பளமும் வேறுபடுமா என்று கேளுங்கள்
- **தொடர்பு:** HR தியா

## ஷிப்டுகள்

- காலை 6:00 – பிற்பகல் 3:00
- காலை 7:00 – மாலை 4:00
- காலை 9:00 – மாலை 6:00
- பிற்பகல் 3:00 – இரவு 10:00
- இரவு 10:00 – காலை 6:00

## எப்படி விண்ணப்பிப்பது

**${PHONE_DISPLAY}** என்ற எண்ணுக்கு **HR தியா**விற்கு WhatsApp செய்யுங்கள். போரூர் அல்லது முகலிவாக்கம் அமேசான் பிக்கர் / பேக்கர் வேலைக்கு விண்ணப்பிப்பதாகவும், MyChennaiCity-யில் பார்த்ததாகவும் சொல்லுங்கள்.

English listing: [Read in English](/chennai-jobs/${EN_SLUG}).

## பொதுவான கேள்விகள்

### போரூர் மற்றும் முகலிவாக்கம் அமேசான் பிக்கர் பேக்கர் வேலைக்கு யார் விண்ணப்பிக்கலாம்?

18 முதல் 35 வயது வரை ஆண் மற்றும் பெண். தகுதி 10ஆம் வகுப்பு முதல் எந்தப் பட்டமும். உடனே சேரக்கூடியவர்கள் தேவை.

### சம்பளம் எவ்வளவு?

அறிவிப்பில் மாதம் ₹16,000 முதல் ₹20,000 வரை. உங்கள் ஷிப்ட்டுக்கான தொகையை HR தியாவிடம் உறுதிப்படுத்துங்கள். பகுதி நேரமும் உண்டு.

### எப்படி விண்ணப்பிப்பது?

${PHONE_DISPLAY} என்ற எண்ணுக்கு WhatsApp செய்யுங்கள். பதிவுக் கட்டணம் எதுவும் செலுத்த வேண்டாம். சேரும் முன் பணி இடத்தை உறுதிப்படுத்துங்கள்.
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
    salaryMin: 16_000,
    salaryMax: 20_000,
    openingsCount: 1,
    remotePolicy: "onsite" as const,
    updatedAt: input.now,
  };

  if (existingJob) {
    await db
      .update(jobPostings)
      .set(values)
      .where(eq(jobPostings.id, existingJob.id));
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

  if (existingEmp) {
    employerId = existingEmp.id;
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
  validThrough.setDate(validThrough.getDate() + 45);

  await upsertJob({
    cityId: city.id,
    employerId,
    slug: EN_SLUG,
    title:
      "Amazon Picker and Packer · Immediate joining · Porur & Mugalivakkam",
    body: enBody,
    locationLabel: "Porur and Mugalivakkam, Chennai",
    applicationUrl: waApply(
      "Hi Diya, I saw the Amazon picker and packer opening for Porur / Mugalivakkam on MyChennaiCity and I want to apply.",
    ),
    now,
    validThrough,
  });

  await upsertJob({
    cityId: city.id,
    employerId,
    slug: TA_SLUG,
    title:
      "அமேசான் பிக்கர் மற்றும் பேக்கர் · உடனே சேரலாம் · போரூர் மற்றும் முகலிவாக்கம்",
    body: taBody,
    locationLabel: "போரூர் மற்றும் முகலிவாக்கம், சென்னை",
    applicationUrl: waApply(
      "வணக்கம் தியா, போரூர் / முகலிவாக்கம் அமேசான் பிக்கர் பேக்கர் வேலையை MyChennaiCity-யில் பார்த்தேன். விண்ணப்பிக்கிறேன்.",
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
