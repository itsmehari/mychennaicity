/**
 * Madras Cafe — Biryani Specialist, restaurant in Thanjavur.
 * Poster (11 Nov 2026): Head Biryani Chef (Master) ₹25,000/month and
 * Assistant Cook / Prep Helper ₹15,000/month. Each title has its own pay,
 * so each title is its own listing. Shared poster, email, and WhatsApp.
 * The poster logo reads Madras Cafe. The gmail address is not a second
 * company name. Hours, job type, street, and vacancy count are not printed.
 * English only.
 *
 * Flyer: `public/images/listings/madras-cafe-biryani-thanjavur-hiring-2026.png`
 *
 * Dev:  `npm run db:seed:chennai-job:madras-cafe-thanjavur`
 * Live: `npm run db:seed:chennai-job:madras-cafe-thanjavur:live`
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

const EMPLOYER_SLUG = "madras-cafe";
const EMPLOYER_NAME = "Madras Cafe";
const EMAIL = "amloofoundation@gmail.com";
const PHONE_DISPLAY = "8126188375";
const FLYER =
  "/images/listings/madras-cafe-biryani-thanjavur-hiring-2026.png";

type RoleSeed = {
  slug: string;
  title: string;
  designation: string;
  payLine: string;
  salaryMonthly: number;
  duties: string[];
  who: string[];
  relatedSlug: string;
  relatedLabel: string;
};

const ROLES: RoleSeed[] = [
  {
    slug: "head-biryani-chef-madras-cafe-thanjavur",
    title: "Head Biryani Chef (Master) — Madras Cafe, Thanjavur",
    designation: "Head Biryani Chef (Master)",
    payLine: "₹25,000 per month",
    salaryMonthly: 25_000,
    duties: [
      "Lead kitchen operations",
      "Manage spice blends",
      "Ensure a perfect, consistent biryani taste",
    ],
    who: [
      "Proven experience as a Biryani Master in a low-volume commercial kitchen",
    ],
    relatedSlug: "assistant-cook-prep-helper-madras-cafe-thanjavur",
    relatedLabel: "Assistant Cook / Prep Helper",
  },
  {
    slug: "assistant-cook-prep-helper-madras-cafe-thanjavur",
    title: "Assistant Cook / Prep Helper — Madras Cafe, Thanjavur",
    designation: "Assistant Cook / Prep Helper",
    payLine: "₹15,000 per month",
    salaryMonthly: 15_000,
    duties: [
      "Assist the Head Chef with ingredient preparation (cutting and marination)",
      "Side dishes",
      "Kitchen cleanliness",
    ],
    who: [
      "Prior experience as a kitchen helper",
      "Quick learner",
      "Hard working",
    ],
    relatedSlug: "head-biryani-chef-madras-cafe-thanjavur",
    relatedLabel: "Head Biryani Chef (Master)",
  },
];

const OUR_SLUGS = new Set(ROLES.map((role) => role.slug));

function mailtoFor(designation: string): string {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(
    `Application — ${designation}, Madras Cafe, Thanjavur`,
  )}`;
}

function waFor(designation: string): string {
  const text = encodeURIComponent(
    `Hello, I am applying for ${designation} at Madras Cafe, Thanjavur. I saw the opening on MyChennaiCity.`,
  );
  return `https://wa.me/918126188375?text=${text}`;
}

function roleBody(role: RoleSeed): string {
  const dutyLines = role.duties.map((line) => `- ${line}`).join("\n");
  const whoLines = role.who.map((line) => `- ${line}`).join("\n");
  return `
**Madras Cafe** (Biryani Specialist) is hiring for **${role.designation}** at its restaurant in **Thanjavur, Tamil Nadu**. Pay on the poster is **${role.payLine}**.

![Madras Cafe hiring poster — ${role.designation}, Thanjavur](${FLYER})

## Role at a glance

- **Position:** ${role.designation}
- **Place:** Thanjavur, Tamil Nadu (no street)
- **Pay:** ${role.payLine}
- **Kitchen line on the poster:** Fresh, authentic, hygienic kitchen
- **Also on the poster:** [${role.relatedLabel}](/chennai-jobs/${role.relatedSlug})

The poster does not name hours, full-time or part-time, or how many seats are open.

## What the role covers

${dutyLines}

## Who they say they want

${whoLines}

## How to apply

Email your details to **[${EMAIL}](${mailtoFor(role.designation)})**, or WhatsApp **[${PHONE_DISPLAY}](${waFor(role.designation)})**.

Say you are applying for **${role.designation}** at Madras Cafe, Thanjavur, and that you saw it on MyChennaiCity.

This page is compiled from the hiring poster. It is not a company careers page. Confirm the workplace, hours, and pay before you join.

**Safety note:** Do **not** pay any upfront “registration” or “security” fee to get this job. Confirm you are writing to the contacts printed on the poster.

## Common questions

### Where is the job?

Thanjavur, Tamil Nadu, at Madras Cafe. The poster does not print a street or a door number.

### What is the pay?

${role.payLine}, as printed.

### How do I apply?

Email ${EMAIL} or WhatsApp ${PHONE_DISPLAY}.
`.trim();
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
        ilike(jobPostings.body, "%8126188375%"),
        ilike(jobPostings.body, "%amloofoundation@gmail.com%"),
        ilike(jobPostings.applicationUrl, "%918126188375%"),
        ilike(jobPostings.applicationUrl, "%amloofoundation@gmail.com%"),
      ),
    );

  const other = matches.filter((row) => !OUR_SLUGS.has(row.slug));
  if (other.length > 0) {
    console.log(
      "[seed-job] Same phone or email already on another listing. Skipping.",
    );
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

  const now = new Date();
  // 30 days from 11 Nov 2026. Last moment of 11 Dec 2026 IST.
  const validThrough = new Date("2026-12-11T23:59:59+05:30");
  const stillOpen = validThrough.getTime() > now.getTime();

  for (const role of ROLES) {
    const [existingJob] = await db
      .select({ id: jobPostings.id })
      .from(jobPostings)
      .where(
        and(eq(jobPostings.cityId, city.id), eq(jobPostings.slug, role.slug)),
      )
      .limit(1);

    const values = {
      employerId,
      cityId: city.id,
      slug: role.slug,
      title: role.title,
      body: roleBody(role),
      locationLabel: "Thanjavur, Tamil Nadu",
      status: (stillOpen ? "open" : "closed") as "open" | "closed",
      employmentType: null,
      validThrough,
      applicationUrl: mailtoFor(role.designation),
      salaryDisclosed: true,
      salaryMin: role.salaryMonthly,
      salaryMax: role.salaryMonthly,
      openingsCount: 1,
      remotePolicy: "onsite" as const,
      updatedAt: now,
    };

    if (existingJob) {
      await db
        .update(jobPostings)
        .set(values)
        .where(eq(jobPostings.id, existingJob.id));
      console.log("[seed-job] Refreshed:", role.slug);
    } else {
      await db.insert(jobPostings).values({
        ...values,
        publishedAt: now,
        createdAt: now,
      });
      console.log("[seed-job] Inserted:", role.slug);
    }

    console.log("[seed-job] Detail:", `/chennai-jobs/${role.slug}`);
    await finishListingSeedLive({ jobSlug: role.slug, label: "seed-job" });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
