/**
 * Project Manager — Hello Employment, Ambattur.
 * Source note (23 Oct 2026): M/F; any degree or diploma; freshers and
 * experienced; planning and team management; age below 30; WhatsApp resume
 * to 94451 39999. Salary, street, job type, and vacancy count were not given.
 *
 * Dev:  `npm run db:seed:chennai-job:hello-employment-project-manager`
 * Live: `npm run db:seed:chennai-job:hello-employment-project-manager:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq, ilike, inArray, or } from "drizzle-orm";
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

const EMPLOYER_SLUG = "hello-employment";
const EMPLOYER_NAME = "Hello Employment";
const EN_SLUG = "project-manager-hello-employment-ambattur-chennai";
/** ASCII `-tamil` twin. A Tamil-script slug gets `<title>Job not found</title>` on the current live lookup. */
const TA_SLUG = "project-manager-hello-employment-ambattur-chennai-tamil";
const RETIRED_TA_SLUGS = [
  encodeURIComponent(
    "ப்ராஜெக்ட்-மேனேஜர்-ஹலோ-எம்ப்ளாயிமென்ட்-அம்பத்தூர்-சென்னை",
  ),
  "ப்ராஜெக்ட்-மேனேஜர்-ஹலோ-எம்ப்ளாயிமென்ட்-அம்பத்தூர்-சென்னை",
];
const PHONE_DISPLAY = "94451 39999";

function waApply(text: string) {
  return `https://wa.me/919445139999?text=${encodeURIComponent(text)}`;
}

const enBody = `
**Hello Employment** is inviting candidates for **Project Manager** in **Ambattur, Chennai**. The notice is marked **M/F**. Any degree or diploma is enough. Freshers and experienced people can apply. The work is coordinating teams, managing tasks, tracking progress, and taking projects through to completion. Share your resume on WhatsApp **${PHONE_DISPLAY}**.

Salary, a street address, a job type, and a vacancy count were not given.

## Role at a glance

- **Position:** Project Manager
- **Who can apply:** Men and women (the notice says M/F)
- **Education:** Any degree or diploma
- **Experience:** Freshers and experienced candidates
- **Skills:** Planning and team management
- **Age:** Below 30 years (as printed on the notice)
- **Location:** Ambattur, Chennai
- **Salary:** Not stated
- **Employer:** Hello Employment

## What the role covers

- Coordinate teams
- Manage tasks
- Track progress
- Drive projects through to completion

## How to apply

WhatsApp your resume to **${PHONE_DISPLAY}**. Say you are applying for the Project Manager role in Ambattur with Hello Employment, and that you saw it on MyChennaiCity.

Tamil listing: [தமிழில் படிக்க](/chennai-jobs/${TA_SLUG}).

This page is compiled from the hiring note. It is not a Hello Employment careers page.

## Common questions

### Who can apply for the Project Manager job in Ambattur?

Men and women. Any degree or diploma. Freshers and people with experience. The notice asks for planning and team management skills, and age below 30 years.

### What is the salary?

The notice does not state a salary, so this listing does not publish a pay band.

### Who is hiring, and where?

Hello Employment, in Ambattur, Chennai. A door number was not given.

### How do I apply?

WhatsApp your resume to ${PHONE_DISPLAY}. Mention the Project Manager opening in Ambattur.
`.trim();

const taBody = `
**ஹலோ எம்ப்ளாயிமென்ட்** **அம்பத்தூர், சென்னையில்** **ப்ராஜெக்ட் மேனேஜர்** பதவிக்கு ஆண் மற்றும் பெண் விண்ணப்பதாரர்களை அழைக்கிறது. எந்த பட்டமோ டிப்ளமோ போதும். புதியவர்களும் அனுபவம் உள்ளவர்களும் விண்ணப்பிக்கலாம். வேலை: குழுக்களை ஒருங்கிணைப்பது, பணிகளை நிர்வகிப்பது, முன்னேற்றத்தைக் கண்காணிப்பது, திட்டங்களை முடித்து வைப்பது. ரெஸ்யூமேவை WhatsApp-ல் **${PHONE_DISPLAY}** என்ற எண்ணுக்கு அனுப்புங்கள்.

சம்பளம், தெரு முகவரி, வேலை வகை, காலியிட எண்ணிக்கை ஆகியவை தரப்படவில்லை.

## Role at a glance

- **பதவி:** ப்ராஜெக்ட் மேனேஜர்
- **யார் விண்ணப்பிக்கலாம்:** ஆண் மற்றும் பெண் (அறிவிப்பில் M/F)
- **படிப்பு:** எந்த பட்டம் அல்லது டிப்ளமோ
- **அனுபவம்:** புதியவர்கள் மற்றும் அனுபவம் உள்ளவர்கள்
- **திறமை:** திட்டமிடல் மற்றும் குழு மேலாண்மை
- **வயது:** 30 வயதுக்குள் (அறிவிப்பில் உள்ளபடி)
- **இடம்:** அம்பத்தூர், சென்னை
- **சம்பளம்:** சொல்லப்படவில்லை
- **நிறுவனம்:** ஹலோ எம்ப்ளாயிமென்ட்

## What the role covers

- குழுக்களை ஒருங்கிணைத்தல்
- பணிகளை நிர்வகித்தல்
- முன்னேற்றத்தைக் கண்காணித்தல்
- திட்டங்களை நிறைவு செய்தல்

## How to apply

**${PHONE_DISPLAY}** என்ற எண்ணுக்கு WhatsApp-ல் ரெஸ்யூமே அனுப்புங்கள். அம்பத்தூர் ஹலோ எம்ப்ளாயிமென்ட் ப்ராஜெக்ட் மேனேஜர் வேலைக்கு விண்ணப்பிப்பதாகவும், MyChennaiCity-யில் பார்த்ததாகவும் சொல்லுங்கள்.

English listing: [Read in English](/chennai-jobs/${EN_SLUG}).

இந்தப் பக்கம் ஆட்சேர்ப்புக் குறிப்பிலிருந்து தொகுக்கப்பட்டது. இது ஹலோ எம்ப்ளாயிமென்ட் நிறுவனப் பக்கம் அல்ல.

## பொதுவான கேள்விகள்

### அம்பத்தூர் ப்ராஜெக்ட் மேனேஜர் வேலைக்கு யார் விண்ணப்பிக்கலாம்?

ஆண் மற்றும் பெண். எந்த பட்டம் அல்லது டிப்ளமோ. புதியவர்களும் அனுபவம் உள்ளவர்களும். திட்டமிடல் மற்றும் குழு மேலாண்மை திறமை வேண்டும். வயது 30க்குள் இருக்க வேண்டும் என்று அறிவிப்பு சொல்கிறது.

### சம்பளம் எவ்வளவு?

அறிவிப்பில் சம்பளம் இல்லை. அதனால் இந்தப் பட்டியலில் சம்பள வரம்பு இல்லை.

### யார் தேடுகிறார்கள்? வேலை எங்கே?

ஹலோ எம்ப்ளாயிமென்ட். அம்பத்தூர், சென்னை. கதவு எண் தரப்படவில்லை.

### எப்படி விண்ணப்பிப்பது?

${PHONE_DISPLAY} என்ற எண்ணுக்கு WhatsApp-ல் ரெஸ்யூமே அனுப்புங்கள். அம்பத்தூர் ப்ராஜெக்ட் மேனேஜர் வேலை என்று சொல்லுங்கள்.
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
    employmentType: null,
    validThrough: input.validThrough,
    applicationUrl: input.applicationUrl,
    salaryDisclosed: false,
    salaryMin: null,
    salaryMax: null,
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
  const matches = await db
    .select({
      slug: jobPostings.slug,
      title: jobPostings.title,
      status: jobPostings.status,
    })
    .from(jobPostings)
    .where(
      or(
        ilike(jobPostings.body, "%9445139999%"),
        ilike(jobPostings.body, "%94451 39999%"),
        ilike(jobPostings.applicationUrl, "%919445139999%"),
      ),
    );

  const other = matches.filter(
    (row) =>
      row.slug !== EN_SLUG &&
      row.slug !== TA_SLUG &&
      !RETIRED_TA_SLUGS.includes(row.slug),
  );
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

  const now = new Date();
  const validThrough = new Date(now);
  validThrough.setDate(validThrough.getDate() + 90);

  await upsertJob({
    cityId: city.id,
    employerId,
    slug: EN_SLUG,
    title: "Project Manager, Ambattur",
    body: enBody,
    locationLabel: "Ambattur, Chennai",
    applicationUrl: waApply(
      "Hello, I am applying for the Project Manager role in Ambattur with Hello Employment. I saw the opening on MyChennaiCity. Resume attached.",
    ),
    now,
    validThrough,
  });

  const retired = await db
    .update(jobPostings)
    .set({ status: "closed", updatedAt: now })
    .where(
      and(
        eq(jobPostings.cityId, city.id),
        inArray(jobPostings.slug, RETIRED_TA_SLUGS),
      ),
    )
    .returning({ slug: jobPostings.slug });
  if (retired.length > 0) {
    console.log(
      "[seed-job] Closed Tamil-script slug:",
      retired.map((row) => row.slug).join(", "),
    );
  }

  await upsertJob({
    cityId: city.id,
    employerId,
    slug: TA_SLUG,
    title: "ப்ராஜெக்ட் மேனேஜர், அம்பத்தூர்",
    body: taBody,
    locationLabel: "அம்பத்தூர், சென்னை",
    applicationUrl: waApply(
      "வணக்கம், அம்பத்தூர் ஹலோ எம்ப்ளாயிமென்ட் ப்ராஜெக்ட் மேனேஜர் வேலைக்கு விண்ணப்பிக்கிறேன். MyChennaiCity-யில் பார்த்தேன். ரெஸ்யூமே இணைத்துள்ளேன்.",
    ),
    now,
    validThrough,
  });

  const stored = await db
    .select({ slug: jobPostings.slug })
    .from(jobPostings)
    .where(inArray(jobPostings.slug, [EN_SLUG, TA_SLUG]));
  console.log(
    "[seed-job] Stored slugs:",
    stored.map((row) => row.slug).join(", "),
  );
  console.log("[seed-job] EN:", `/chennai-jobs/${EN_SLUG}`);
  console.log("[seed-job] TA:", `/chennai-jobs/${TA_SLUG}`);
  await finishListingSeedLive({ jobSlug: EN_SLUG, label: "seed-job" });
  await finishListingSeedLive({ jobSlug: TA_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
