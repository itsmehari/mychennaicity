/**
 * Assetowns Property Solutions — six Padur OMR roles (MyOMR jobs 87–92, 18 Nov 2026).
 * Source: https://myomr.in/omr-local-job-listings?q=assetowns
 *
 * Flyer: `public/images/listings/assetowns-property-solutions-hiring-padur-omr-2026.jpg`
 *
 * Dev:  `npm run db:seed:chennai-job:assetowns-padur-omr`
 * Live: `npm run db:seed:chennai-job:assetowns-padur-omr:live`
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

const EMPLOYER_SLUG = "assetowns-property-solutions-padur-omr";
const EMPLOYER_NAME = "Assetowns Property Solutions";
const FLYER = "/images/listings/assetowns-property-solutions-hiring-padur-omr-2026.jpg";
const PHONE_DISPLAY = "+91 76390 01400";
const PHONE_DIGITS = "917639001400";
const TEL = `tel:+${PHONE_DIGITS}`;
const MYOMR_HUB = "https://myomr.in/omr-local-job-listings?q=assetowns";

type RoleSeed = {
  slug: string;
  title: string;
  shortTitle: string;
  myomrUrl: string;
  category: string;
  genderLine: string;
  remotePolicy: "onsite" | "field";
  about: string;
  requirements: string[];
  benefits: string[];
  waSubject: string;
};

const ROLES: RoleSeed[] = [
  {
    slug: "senior-telecaller-female-assetowns-padur-omr",
    title: "Senior Telecaller (Female) — Assetowns Property Solutions, Padur OMR",
    shortTitle: "Senior Telecaller (Female)",
    myomrUrl:
      "https://myomr.in/omr-local-job-listings/job/87/senior-telecaller-female-padur",
    category: "Sales & Marketing",
    genderLine: "Female candidate (as per employer hiring notice)",
    remotePolicy: "onsite",
    about: `Handle inbound and outbound calls for property leads at Assetowns Smart-Asset, Padur along OMR. Qualify prospects, schedule site visits, and coordinate with the sales team in a growth-focused real-estate office.

**Workplace:** Padur, Old Mahabalipuram Road (OMR), Chennai — workable for candidates from Kelambakkam, Siruseri, Navalur, and the Thoraipakkam corridor.`,
    requirements: [
      "Telecalling or inside-sales experience preferred; real-estate calls are a plus",
      "Clear Tamil and English communication",
      "Comfortable with targets, follow-ups, and CRM-style tracking",
    ],
    benefits: [
      "Professional training and mentoring",
      "Performance-based incentives",
      "Stable employer on OMR with multiple open roles",
    ],
    waSubject: "Senior Telecaller",
  },
  {
    slug: "business-development-executive-male-assetowns-padur-omr",
    title:
      "Business Development Executive (Male) — Assetowns Property Solutions, Padur OMR",
    shortTitle: "Business Development Executive (Male)",
    myomrUrl:
      "https://myomr.in/omr-local-job-listings/job/88/business-development-executive-male-padur",
    category: "Sales & Marketing",
    genderLine: "Male candidate (employer poster)",
    remotePolicy: "field",
    about: `Drive new business for property and smart-asset solutions at Assetowns Property Solutions. Build local relationships, follow leads from telecalling, and represent the brand across the OMR corridor from Padur.`,
    requirements: [
      "Business development or sales experience; property sector preferred",
      "Two-wheeler and willingness for local travel on OMR",
      "Target-driven with good client rapport",
    ],
    benefits: [
      "Incentives on performance",
      "Training on product and local market",
      "Padur OMR office base",
    ],
    waSubject: "BDE / Business Development Executive",
  },
  {
    slug: "hr-manager-assetowns-padur-omr",
    title: "HR Manager — Assetowns Property Solutions, Padur OMR",
    shortTitle: "HR Manager",
    myomrUrl: "https://myomr.in/omr-local-job-listings/job/89/hr-manager-padur",
    category: "Other",
    genderLine: "Open to any gender (employer poster)",
    remotePolicy: "onsite",
    about: `Own day-to-day HR for a growing property solutions team: recruitment, onboarding, attendance, and coordination with sales leadership at Padur, OMR.`,
    requirements: [
      "HR generalist experience (recruitment + employee records)",
      "Organised documentation; MS Office",
      "Works well with sales and operations teams",
    ],
    benefits: [
      "Growth-oriented company hiring multiple roles",
      "Central HR role as team expands on OMR",
    ],
    waSubject: "HR Manager",
  },
  {
    slug: "sales-executive-male-assetowns-padur-omr",
    title: "Sales Executive (Male) — Assetowns Property Solutions, Padur OMR",
    shortTitle: "Sales Executive (Male)",
    myomrUrl:
      "https://myomr.in/omr-local-job-listings/job/90/sales-executive-male-padur",
    category: "Sales & Marketing",
    genderLine: "Male candidate (employer notice)",
    remotePolicy: "onsite",
    about: `Meet clients, present property solutions, and close sales for Assetowns at Padur on Old Mahabalipuram Road. Coordinate with telecallers and CRM for a smooth buyer journey.`,
    requirements: [
      "Sales experience; real estate or property background helpful",
      "Client-facing confidence and honesty in deals",
      "Based in or willing to work from Padur OMR",
    ],
    benefits: [
      "Performance incentives",
      "Training and sales support",
      "Multiple vacancies — room to grow",
    ],
    waSubject: "Sales Executive",
  },
  {
    slug: "customer-relationship-executive-female-assetowns-padur-omr",
    title:
      "Customer Relationship Executive (Female) — Assetowns Property Solutions, Padur OMR",
    shortTitle: "Customer Relationship Executive (Female)",
    myomrUrl:
      "https://myomr.in/omr-local-job-listings/job/91/customer-relationship-executive-female-padur",
    category: "Customer Service",
    genderLine: "Female candidate (employer poster)",
    remotePolicy: "onsite",
    about: `Be the first point of contact for customer queries after lead conversion — updates, documentation, and polite follow-up for Assetowns clients in Padur, OMR.`,
    requirements: [
      "Customer support or client coordination experience",
      "Clear phone and in-person communication in Tamil / English",
      "Organised with follow-up reminders",
    ],
    benefits: [
      "Training on CRM and client handling",
      "Incentives where applicable",
      "Office role at Padur OMR",
    ],
    waSubject: "Customer Relationship Executive",
  },
  {
    slug: "customer-relationship-manager-assetowns-padur-omr",
    title:
      "Customer Relationship Manager — Assetowns Property Solutions, Padur OMR",
    shortTitle: "Customer Relationship Manager",
    myomrUrl:
      "https://myomr.in/omr-local-job-listings/job/92/customer-relationship-manager-padur",
    category: "Customer Service",
    genderLine: "Open to any gender (employer poster)",
    remotePolicy: "onsite",
    about: `Manage customer relationships end-to-end for property solutions: retention, issue resolution, and coordination with sales at Assetowns, Padur along OMR.`,
    requirements: [
      "CRM or account-management experience preferred",
      "Leads junior CRM staff as team grows",
      "Reporting and escalation to management",
    ],
    benefits: [
      "Leadership path in a hiring wave",
      "Performance-based rewards",
      "Padur OMR location",
    ],
    waSubject: "Customer Relationship Manager",
  },
];

function waApply(role: string) {
  return `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(
    `Hi, I saw the ${role} opening at Assetowns Property Solutions (Padur OMR) on MyChennaiCity jobs. Please find my CV attached.`,
  )}`;
}

function roleBody(role: RoleSeed): string {
  const sisters = ROLES.filter((other) => other.slug !== role.slug)
    .map(
      (other) =>
        `- [${other.shortTitle}](/chennai-jobs/${other.slug}) · [MyOMR](${other.myomrUrl})`,
    )
    .join("\n");
  const apply = waApply(role.shortTitle);

  return `
![Assetowns Property Solutions — We are hiring, Padur OMR](${FLYER})

**Assetowns Property Solutions** (smart-asset / property solutions on OMR) is hiring for **${role.shortTitle}** at **Padur, Old Mahabalipuram Road (OMR), Chennai**.

- **Type:** Full-time
- **Segment:** Office jobs
- **Category:** ${role.category}
- **Salary:** Competitive — discuss with HR (no rupee band on the employer notice)
- **Who may apply:** ${role.genderLine}
- **Apply before:** 17 January 2027

This listing is compiled from the employer notice on [MyOMR](${role.myomrUrl}) and the hiring flyer. Confirm pay, shifts, and the exact office address before you travel.

## About the role

${role.about}

## Requirements

${role.requirements.map((line) => `- ${line}`).join("\n")}

## Benefits

${role.benefits.map((line) => `- ${line}`).join("\n")}

## Other open roles at Assetowns (Padur OMR)

${sisters}

See all six roles on [MyOMR](${MYOMR_HUB}).

## How to apply

WhatsApp your CV to **[${PHONE_DISPLAY}](${apply})** with the role name: **${role.waSubject}**.

You can also call **[${PHONE_DISPLAY}](${TEL})**.

Say you saw the opening on MyChennaiCity jobs.

**Safety note:** Do **not** pay any fee to apply. Applications go directly to the employer.

## Common questions

### Where is the office?

Padur, Old Mahabalipuram Road (OMR), Chennai 603103, Tamil Nadu — as listed on MyOMR for Assetowns Property Solutions.

### What is the pay?

The employer lists **competitive** pay and discusses it with HR. This page does not publish a salary band.

### How do I apply?

WhatsApp **${PHONE_DISPLAY}** with your CV and role line **${role.waSubject}**.
`.trim();
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
  const validThrough = new Date("2027-01-17T23:59:59+05:30");
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
      locationLabel: "Padur, OMR, Chennai",
      status: (stillOpen ? "open" : "closed") as "open" | "closed",
      employmentType: "FULL_TIME",
      validThrough,
      applicationUrl: waApply(role.shortTitle),
      salaryDisclosed: false,
      salaryMin: null as number | null,
      salaryMax: null as number | null,
      openingsCount: 1,
      remotePolicy: role.remotePolicy,
      publishedAt: now,
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
        createdAt: now,
      });
      console.log("[seed-job] Inserted:", role.slug);
    }

    console.log(
      "[seed-job] Detail:",
      `https://mychennaicity.in/chennai-jobs/${role.slug}`,
    );
    await finishListingSeedLive({
      jobSlug: role.slug,
      label: "seed-assetowns-padur-omr",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});