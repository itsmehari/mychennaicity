/**
 * HR recruiter — Sembakkam. English + Tamil-script URL.
 * Source note (16 Oct 2026): VV Placement Services; female candidates can apply;
 * immediate joiner; salary up to ₹15,000 (ceiling, not a band); freshers can apply;
 * 91767 97745. Street was not supplied. Not “women only”.
 *
 * Dev:  `npm run db:seed:chennai-job:hr-recruiter-sembakkam`
 * Live: `npm run db:seed:chennai-job:hr-recruiter-sembakkam:live`
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
const EMPLOYER_NAME = "VV Placement Services";
const EN_SLUG = "hr-recruiter-10-vacancies-sembakkam-chennai";
const PREVIOUS_EN_SLUGS = [
  "hr-recruiter-sembakkam-chennai",
  "hr-recruiter-5-vacancies-sembakkam-chennai",
];
const TA_SLUG_VISIBLE = "எச்ஆர்-ரெக்ரூட்டர்-10-காலியிடம்-செம்பாக்கம்-சென்னை";
const PREVIOUS_TA_SLUGS = [
  "மனிதவள-ஆட்சேர்ப்பாளர்-செம்பாக்கம்-சென்னை",
  "எச்ஆர்-ரெக்ரூட்டர்-செம்பாக்கம்-சென்னை",
  "எச்ஆர்-ரெக்ரூட்டர்-5-காலியிடம்-செம்பாக்கம்-சென்னை",
  encodeURIComponent("மனிதவள-ஆட்சேர்ப்பாளர்-செம்பாக்கம்-சென்னை"),
  encodeURIComponent("எச்ஆர்-ரெக்ரூட்டர்-செம்பாக்கம்-சென்னை"),
  encodeURIComponent("எச்ஆர்-ரெக்ரூட்டர்-5-காலியிடம்-செம்பாக்கம்-சென்னை"),
];
/** Live route receives this percent-encoded; the address bar still shows Tamil. */
const TA_SLUG = encodeURIComponent(TA_SLUG_VISIBLE);
const PHONE_DISPLAY = "91767 97745";

function waApply(text: string) {
  return `https://wa.me/919176797745?text=${encodeURIComponent(text)}`;
}

const enBody = `
**10 HR recruiter vacancies** in **Sembakkam, Chennai** — **VV Placement Services**. Female candidates and freshers can apply. Immediate joiners needed. Pay **up to ₹15,000** a month. Call or WhatsApp **${PHONE_DISPLAY}**.

VV Placement Services is hiring **10 HR recruiters** in Sembakkam. The note says female candidates can apply. It does not say the role is only for women. Freshers can apply. Immediate joiners are needed. A street address was not supplied.

## Role at a glance

- **Position:** HR recruiter
- **Who can apply:** Female candidates can apply; freshers can apply
- **Vacancies:** 10
- **Joining:** Immediate joiners needed
- **Location:** Sembakkam, Chennai
- **Salary:** Up to ₹15,000 a month (ceiling only; no minimum was stated)
- **Employer:** VV Placement Services

## How to apply

Call or WhatsApp **${PHONE_DISPLAY}**. Say you are applying for the HR recruiter opening in Sembakkam with VV Placement Services, and that you saw it on MyChennaiCity.

Tamil listing: [தமிழில் படிக்க](/chennai-jobs/${TA_SLUG}).

## Common questions

### Who can apply for the HR recruiter job in Sembakkam?

Female candidates can apply. Freshers can apply. An immediate joiner is needed. The note does not say men are barred.

### What is the salary?

Up to ₹15,000 a month. That is a ceiling. A starting figure was not given, so this is not a ₹15,000–₹15,000 band.

### Who is hiring, and where?

VV Placement Services, in Sembakkam, Chennai. A door number was not given.

### How do I apply?

Call or WhatsApp ${PHONE_DISPLAY}. Mention the HR recruiter role in Sembakkam.
`.trim();

const taBody = `
**செம்பாக்கம், சென்னையில்** எச்ஆர் ரெக்ரூட்டர் **10 காலியிடங்கள்** — **VV Placement Services**. பெண் விண்ணப்பதாரர்கள் விண்ணப்பிக்கலாம். புதியவர்களும் விண்ணப்பிக்கலாம். உடனே சேரக்கூடியவர்கள் தேவை. சம்பளம் மாதம் **அதிகபட்சம் ₹15,000**. அழைக்க அல்லது WhatsApp செய்ய **${PHONE_DISPLAY}**.

VV Placement Services செம்பாக்கத்தில் 10 எச்ஆர் ரெக்ரூட்டர்களைத் தேடுகிறது. குறிப்பு பெண் விண்ணப்பதாரர்கள் விண்ணப்பிக்கலாம் என்று சொல்கிறது. இது பெண்களுக்கு மட்டும் என்று சொல்லவில்லை. பணி அனுபவம் இல்லாத புதியவர்களும் விண்ணப்பிக்கலாம். உடனடியாகப் பணியில் சேரக்கூடியவர்கள் தேவை. தெரு முகவரி தரப்படவில்லை.

## Role at a glance

- **பதவி:** எச்ஆர் ரெக்ரூட்டர்
- **காலியிடங்கள்:** 10
- **யார் விண்ணப்பிக்கலாம்:** பெண் விண்ணப்பதாரர்கள்; புதியவர்கள்
- **சேர்க்கை:** உடனே சேரக்கூடியவர்கள் தேவை
- **இடம்:** செம்பாக்கம், சென்னை
- **சம்பளம்:** மாதம் அதிகபட்சம் ₹15,000 (உச்ச வரம்பு; குறைந்தபட்சம் இல்லை)
- **நிறுவனம்:** VV Placement Services

## How to apply

**${PHONE_DISPLAY}** என்ற எண்ணுக்கு அழைக்கவும் அல்லது WhatsApp செய்யவும். செம்பாக்கம் VV Placement Services மனிதவள ஆட்சேர்ப்பாளர் வேலைக்கு விண்ணப்பிப்பதாகவும், MyChennaiCity-யில் பார்த்ததாகவும் சொல்லுங்கள்.

English listing: [Read in English](/chennai-jobs/${EN_SLUG}).

## பொதுவான கேள்விகள்

### செம்பாக்கம் மனிதவள ஆட்சேர்ப்பாளர் வேலைக்கு யார் விண்ணப்பிக்கலாம்?

பெண் விண்ணப்பதாரர்கள் விண்ணப்பிக்கலாம். புதியவர்களும் விண்ணப்பிக்கலாம். உடனடியாகப் பணியில் சேரக்கூடியவர் தேவை. ஆண்கள் விண்ணப்பிக்கக் கூடாது என்று குறிப்பில் இல்லை.

### சம்பளம் எவ்வளவு?

மாதம் அதிகபட்சம் ₹15,000. இது உச்ச வரம்பு. தொடக்க சம்பளம் சொல்லப்படவில்லை.

### யார் தேடுகிறார்கள்? வேலை எங்கே?

VV Placement Services. செம்பாக்கம், சென்னை. கதவு எண் தரப்படவில்லை.

### எப்படி விண்ணப்பிப்பது?

${PHONE_DISPLAY} என்ற எண்ணுக்கு அழைக்கவும் அல்லது WhatsApp செய்யவும். செம்பாக்கம் மனிதவள ஆட்சேர்ப்பாளர் வேலை என்று சொல்லுங்கள்.
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
      and(
        eq(jobPostings.cityId, input.cityId),
        eq(jobPostings.slug, input.slug),
      ),
    )
    .limit(1);

  const [aliasJob] = existingJob
    ? []
    : await db
        .select({ id: jobPostings.id })
        .from(jobPostings)
        .where(
          and(
            eq(jobPostings.cityId, input.cityId),
            inArray(jobPostings.slug, [
              ...(input.slug === EN_SLUG ? PREVIOUS_EN_SLUGS : []),
              ...(input.slug === TA_SLUG
                ? [TA_SLUG_VISIBLE, ...PREVIOUS_TA_SLUGS]
                : []),
            ]),
          ),
        )
        .limit(1);

  const row =
    existingJob ??
    (input.slug === EN_SLUG || input.slug === TA_SLUG ? aliasJob : undefined);

  const values = {
    employerId: input.employerId,
    cityId: input.cityId,
    slug: input.slug,
    title: input.title,
    body: input.body,
    locationLabel: input.locationLabel,
    status: "open" as const,
    employmentType: null,
    validThrough: input.validThrough,
    applicationUrl: input.applicationUrl,
    salaryDisclosed: false,
    salaryMin: null,
    salaryMax: null,
    openingsCount: 10,
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

  const now = new Date();
  const validThrough = new Date(now);
  validThrough.setDate(validThrough.getDate() + 90);

  await upsertJob({
    cityId: city.id,
    employerId,
    slug: EN_SLUG,
    title: "HR Recruiter · 10 vacancies · Sembakkam, Chennai",
    body: enBody,
    locationLabel: "Sembakkam, Chennai",
    applicationUrl: waApply(
      "Hello, I am applying for the HR recruiter role in Sembakkam with VV Placement Services. I saw the opening on MyChennaiCity.",
    ),
    now,
    validThrough,
  });

  await upsertJob({
    cityId: city.id,
    employerId,
    slug: TA_SLUG,
    title: "எச்ஆர் ரெக்ரூட்டர் · 10 காலியிடம் · செம்பாக்கம், சென்னை",
    body: taBody,
    locationLabel: "செம்பாக்கம், சென்னை",
    applicationUrl: waApply(
      "வணக்கம், செம்பாக்கம் VV Placement Services மனிதவள ஆட்சேர்ப்பாளர் வேலைக்கு விண்ணப்பிக்கிறேன். MyChennaiCity-யில் பார்த்தேன்.",
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
