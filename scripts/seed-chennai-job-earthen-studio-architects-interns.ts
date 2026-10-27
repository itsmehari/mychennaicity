/**
 * Earthen Studio — architects and interns (natural / earthen building).
 * Source: studio note supplied for the listing + hiring flyer.
 *
 * Flyer: `public/images/listings/earthen-studio-hiring-architects-interns-2026.png`
 *
 * Dev:  `npm run db:seed:chennai-job:earthen-studio-architects`
 * Live: `npm run db:seed:chennai-job:earthen-studio-architects:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
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

const EMPLOYER_SLUG = "earthen-studio-chennai";
const EMPLOYER_NAME = "Earthen Studio";
const JOB_SLUG = "earthen-studio-architects-interns-chennai";
const APPLY_EMAIL = "earthenstudio01@gmail.com";
const FLYER_IMAGE =
  "/images/listings/earthen-studio-hiring-architects-interns-2026.png";
const MAILTO = `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(
  "Earthen Studio — portfolio and note on natural building",
)}`;

const BODY = `
**Earthen Studio** is hiring **architects and interns** who want to learn natural building — earth, lime, stone, brick, timber, and traditional techniques.

![Earthen Studio hiring flyer — project architect and a collaboration call, earthenstudio01@gmail.com](${FLYER_IMAGE})

## From the studio

We are looking for people who have conviction. People who want to understand natural buildings — not just draw them. People who question, observe, think sensibly, and are willing to get their hands dirty.

At Earthen Studio, we work with earth, lime, stone, brick, timber and traditional building techniques. Learning here goes beyond a degree or a software skill.

If you want to learn how a wall breathes, how lime behaves, how materials respond to climate, how a building ages, and why traditional techniques work — you will learn by observing, doing, failing, correcting and doing it again.

We are looking for:

- Architects who can think beyond conventional construction
- Interns who are genuinely curious and willing to learn
- People with energy, initiative and spirit
- Sensible thinkers who can understand context before proposing solutions
- Those willing to spend time with materials, craftsmen and sites
- People who want to develop craftsmanship, not just a portfolio

**Rest comes next.** Not because the studio believes in exhaustion — but because meaningful learning requires involvement, curiosity and commitment.

If your ambition is to merely complete your degree and get a job, this may not be the place. If you want to learn the techniques, work alongside craftsmen, understand natural materials and eventually become a master craftsman in your own right, you can begin that journey here.

A degree can teach you architecture. Practice teaches you how to build.

*Building with Earth. Designing for Generations.*

## What the flyer prints

- **Project architect** interested in earthen construction and sustainable alternative practices
- **0–2 years** experience, in vernacular practice — the flyer adds a short Tamil line before the word “Interest” (read it on the photo; it is small against the brick)
- **A call for collaboration** for architects interested in **photography** and **UI/UX** — again with a short Tamil qualifier on the photo
- Apply email on the flyer: **${APPLY_EMAIL}**

The flyer does **not** print a salary, a stipend, a phone number, a seat count, or a street address.

## Location

**Chennai.** Earthen Studio is a Chennai practice. This note and flyer do not name a studio door or a site. Confirm where you would sit and which sites you would visit before you travel.

## How to apply

Send your **portfolio** and a **short note** about why you want to learn natural building.

- Email **[${APPLY_EMAIL}](${MAILTO})**

Mention that you saw the opening on MyChennaiCity jobs.

**Safety note:** Do **not** pay any upfront “registration” or “training” fee. This listing does not print a salary — ask the studio before you treat any number from an older advert as this opening’s pay.

This page is compiled from the studio’s hiring note and the flyer above. It is not an official careers page.
`.trim();

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
        websiteUrl: "https://earthenstudioarch.com/",
        verified: false,
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: EMPLOYER_NAME,
        slug: EMPLOYER_SLUG,
        websiteUrl: "https://earthenstudioarch.com/",
        verified: false,
      })
      .returning({ id: employers.id });
    employerId = ins.id;
    console.log("[seed-job] Inserted employer:", EMPLOYER_SLUG);
  }

  const [existingJob] = await db
    .select({ id: jobPostings.id })
    .from(jobPostings)
    .where(
      and(eq(jobPostings.cityId, city.id), eq(jobPostings.slug, JOB_SLUG)),
    )
    .limit(1);

  const now = new Date();
  const validThrough = istToUtcDate(2026, 12, 31, 23, 59);

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title: "Architects and interns — Earthen Studio, Chennai",
    body: BODY,
    locationLabel: "Chennai",
    status: "open" as const,
    employmentType: null,
    validThrough,
    publishedAt: existingJob ? undefined : now,
    applicationUrl: MAILTO,
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
    console.log("[seed-job] Refreshed open job:", JOB_SLUG);
  } else {
    await db.insert(jobPostings).values({
      ...values,
      publishedAt: now,
      createdAt: now,
    });
    console.log("[seed-job] Inserted open job:", JOB_SLUG);
  }

  console.log("[seed-job] Detail:", `/chennai-jobs/${JOB_SLUG}`);
  await finishListingSeedLive({
    jobSlug: JOB_SLUG,
    label: "seed-job-earthen-studio",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
