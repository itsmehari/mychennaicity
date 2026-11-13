/**
 * South Style Casting Studio — male models, 20–30.
 * Note (13 Nov 2026): fashion and commercial photoshoots. Categories:
 * men's innerwear, t-shirts and casual wear, veshti and dhoti, ethnic wear,
 * fashion accessories. South Indian look, camera presence, freshers welcome.
 * Local talent highlighted. Places: Ponneri, Minjur, Thiruvallur, and Chennai.
 * Pay is per photoshoot and discussed per assignment — no rupee figure.
 * Applicants share recent photographs, age, height, and location.
 * Only candidates above 18. Contact 86676 36581.
 * Hours, job type, street, and vacancy count are not printed.
 * English only.
 *
 * Photos: `public/images/listings/south-style-casting-studio-male-models-2026.jpg`
 * Banner: `public/images/listings/south-style-casting-studio-male-models-banner-2026.png`
 *
 * Dev:  `npm run db:seed:chennai-job:south-style-casting-studio`
 * Live: `npm run db:seed:chennai-job:south-style-casting-studio:live`
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

const EMPLOYER_SLUG = "south-style-casting-studio";
const EMPLOYER_NAME = "South Style Casting Studio";
const JOB_SLUG =
  "male-models-south-style-casting-studio-ponneri-minjur-thiruvallur-chennai";
const PHOTO = "/images/listings/south-style-casting-studio-male-models-2026.jpg";
const BANNER =
  "/images/listings/south-style-casting-studio-male-models-banner-2026.png";
const PHONE_DISPLAY = "86676 36581";
const PHONE_DIGITS = "918667636581";
const TEL = `tel:+${PHONE_DIGITS}`;
const WA_APPLY = `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(
  "Hi, I saw the South Style Casting Studio male model call on MyChennaiCity. Age: Height: Location:",
)}`;

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
        ilike(jobPostings.body, "%8667636581%"),
        ilike(jobPostings.body, "%86676 36581%"),
        ilike(jobPostings.applicationUrl, "%918667636581%"),
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
  // 30 days from 13 Nov 2026. Last moment of 13 Dec 2026 IST.
  const validThrough = new Date("2026-12-13T23:59:59+05:30");
  const stillOpen = validThrough.getTime() > now.getTime();

  const body = `
**South Style Casting Studio** is looking for **male models aged 20–30** for upcoming **fashion and commercial photoshoots**.

**Local talent most welcome.**

![South Style Casting Studio — fashion studio with a model in a shirt and veshti](${PHOTO})

![South Style Casting Studio banner — male models, ages 20 to 30, Ponneri, Minjur, Thiruvallur, and Chennai](${BANNER})

The studio photograph is an illustration for this listing. It is not a photo of a selected model. The banner is the listing card. Neither image is a dress code for every shoot.

## Product categories

- Men's innerwear and underwear
- T-shirts and casual wear
- Traditional veshti and dhoti
- Ethnic wear
- Fashion accessories

## Requirements

- Male models, **aged 20–30 years**
- **South Indian look**
- Attractive personality and good physique
- Good camera presence
- Confidence in posing
- **Freshers are welcome**
- **Only candidates above 18 years can apply**

## Place

Ponneri, Minjur, Thiruvallur, and Chennai. The note does not print a street or a studio door number.

## Pay

Payment is **per photoshoot**. The amount is discussed based on the assignment. The note does not print a rupee figure.

## How to apply

Share your **recent photographs**, **age**, **height**, and **location** on WhatsApp or by phone: **[${PHONE_DISPLAY}](${TEL})** · [WhatsApp](${WA_APPLY}).

Say you saw the South Style Casting Studio call on MyChennaiCity.

This page is compiled from the hiring note. Confirm the studio, the product category, and the fee for that shoot before you pay any fee or share documents beyond the photographs they asked for.

## Common questions

### Where is the shoot?

The note names Ponneri, Minjur, Thiruvallur, and Chennai. It does not print a street.

### Who can apply?

Male models aged 20–30, with a South Indian look. Freshers are welcome. Only candidates above 18 years can apply. Local talent is welcome.

### What is the pay?

Per photoshoot. The note says payment will be discussed based on the assignment. It does not print a salary.

### How do I apply?

WhatsApp or call ${PHONE_DISPLAY}. Send recent photographs, age, height, and location.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "Male models — South Style Casting Studio (Ponneri, Minjur, Thiruvallur, Chennai)",
    body,
    locationLabel: "Ponneri, Minjur, Thiruvallur, and Chennai",
    status: (stillOpen ? "open" : "closed") as "open" | "closed",
    employmentType: null,
    validThrough,
    applicationUrl: WA_APPLY,
    salaryDisclosed: false,
    salaryMin: null,
    salaryMax: null,
    openingsCount: 1,
    remotePolicy: "field" as const,
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
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
