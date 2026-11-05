/**
 * HECS — Senior EIA Expert (3 seats) and Proposal Engineer (2 seats), Chennai.
 * Posters (5 Nov 2026): two designations, each with a hiring graphic and a
 * spec table. Campaign caption lists both roles. Employer name is the poster
 * logo, HECS. The mailbox domain is not turned into a second company name.
 * Pay is “aligned with experience and capabilities” with no rupee figure.
 * Hours, job type, and street are unstated. English only.
 *
 * Flyers:
 * - `public/images/listings/hecs-senior-eia-expert-chennai-hiring-2026.png`
 * - `public/images/listings/hecs-senior-eia-expert-chennai-spec-2026.png`
 * - `public/images/listings/hecs-proposal-engineer-chennai-hiring-2026.png`
 * - `public/images/listings/hecs-proposal-engineer-chennai-spec-2026.png`
 *
 * Dev:  `npm run db:seed:chennai-job:hecs-eia-proposal`
 * Live: `npm run db:seed:chennai-job:hecs-eia-proposal:live`
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

const EMPLOYER_SLUG = "hecs";
const EMPLOYER_NAME = "HECS";
const HR = "hr@hecs.in";
const HR_PROJECTS = "hr.projects@hecs.in";
const EIA_SLUG = "senior-eia-expert-hecs-chennai";
const PROPOSAL_SLUG = "proposal-engineer-hecs-chennai";
const EIA_HIRING =
  "/images/listings/hecs-senior-eia-expert-chennai-hiring-2026.png";
const EIA_SPEC =
  "/images/listings/hecs-senior-eia-expert-chennai-spec-2026.png";
const PROPOSAL_HIRING =
  "/images/listings/hecs-proposal-engineer-chennai-hiring-2026.png";
const PROPOSAL_SPEC =
  "/images/listings/hecs-proposal-engineer-chennai-spec-2026.png";
const EIA_MAILTO = `mailto:${HR}?subject=${encodeURIComponent(
  "Application — Senior EIA Expert, HECS, Chennai",
)}`;
const PROPOSAL_MAILTO = `mailto:${HR},${HR_PROJECTS}?subject=${encodeURIComponent(
  "Application — Proposal Engineer, HECS, Chennai",
)}`;

type RoleSeed = {
  slug: string;
  title: string;
  openingsCount: number;
  applicationUrl: string;
  body: string;
};

const ROLES: RoleSeed[] = [
  {
    slug: EIA_SLUG,
    title: "Senior EIA Expert — HECS, Chennai",
    openingsCount: 3,
    applicationUrl: EIA_MAILTO,
    body: `
**HECS** is hiring a **Senior EIA Expert** in **Chennai**. The spec table prints **3** openings. The campaign caption places this role with a Proposal Engineer seat in environmental and wastewater management work. The poster logo reads HECS.

![HECS hiring poster — Senior EIA Expert, Chennai](${EIA_HIRING})

![HECS spec table — Senior EIA Expert, Chennai](${EIA_SPEC})

This is a dedicated listing for the Senior EIA Expert role. Sister opening from the same campaign: [Proposal Engineer — HECS, Chennai](/chennai-jobs/${PROPOSAL_SLUG}).

## Role at a glance

- **Designation:** Senior EIA Expert
- **Place:** Chennai (no street)
- **Openings:** 3
- **Experience:** 7–10 years in conducting EIA studies, obtained EC from SEIAA / MoEF&CC
- **Preferable:** EIA coordinator for 3 sectors and FAE for minimum 3 areas, as printed, as per NABET Scheme
- **Email on this poster:** [${HR}](mailto:${HR})

The posters do not name hours, full-time or contract, or a street. The meeting-room photograph is not a gender rule.

## Education

As printed:

- Masters Degree in Science / Engineering (M.Sc. Environmental Sciences / M. E Environmental Engineering), **or**
- Bachelor Degree in Civil / Chemical / Environmental Engineering

## What the job description lists

1. Proven experience in formal report writing
2. Excellent communication skills
3. Ability to manage multiple projects and work effectively within a team
4. Prepare detailed EIA reports, ensuring compliance with relevant environmental regulations and guidelines
5. Updated on current environmental legislation and best practices
6. Interact and coordinate with clients on technical aspects
7. Responsible for planning and preparation of Prefeasibility Reports, EIA Reports, Site Visits for checking environmental compliance
8. Coordination with lab team for arranging baseline monitoring for EIA studies
9. Responsible for all the EIAs / ECs for the sector as EIA coordinator
10. Attending SEAC / MoEF&CC meetings as applicable and obtaining Environmental Clearance

## Pay

The spec table says compensation will be aligned with the candidate’s experience and capabilities. No rupee figure is printed, so salary stays undisclosed here.

## How to apply

Email your resume to **[${HR}](${EIA_MAILTO})**.

The Senior EIA Expert posters print that mailbox. The campaign caption also lists **[${HR_PROJECTS}](mailto:${HR_PROJECTS})**.

Use the **Email your resume** button on this page. Say you are applying for Senior EIA Expert at HECS in Chennai, and that you saw it on MyChennaiCity.

This page is compiled from the hiring posters and the campaign caption. Confirm the workplace, NABET sectors, and the pay before you join.

## Common questions

### Where is the job?

Chennai. The posters do not print a street or a door number.

### How many seats?

**3**, as printed on the spec table.

### Who can apply?

The table asks for a masters in science / engineering (M.Sc. Environmental Sciences / M. E Environmental Engineering) or a bachelor in civil, chemical, or environmental engineering, plus 7–10 years conducting EIA studies with EC obtained from SEIAA / MoEF&CC. EIA coordinator for 3 sectors and FAE for minimum 3 areas, as per NABET Scheme, is printed as preferable.

### What is the pay?

The posters do not print a salary figure.

### How do I apply?

Email ${HR}. The campaign caption also lists ${HR_PROJECTS}.
`.trim(),
  },
  {
    slug: PROPOSAL_SLUG,
    title: "Proposal Engineer — HECS, Chennai",
    openingsCount: 2,
    applicationUrl: PROPOSAL_MAILTO,
    body: `
**HECS** is hiring a **Proposal Engineer** in **Chennai**. The spec table prints **2** openings. The campaign caption places this role with a Senior EIA Expert seat in environmental and wastewater management work. The poster logo reads HECS.

![HECS hiring poster — Proposal Engineer, Chennai](${PROPOSAL_HIRING})

![HECS spec table — Proposal Engineer, Chennai](${PROPOSAL_SPEC})

This is a dedicated listing for the Proposal Engineer role. Sister opening from the same campaign: [Senior EIA Expert — HECS, Chennai](/chennai-jobs/${EIA_SLUG}).

## Role at a glance

- **Designation:** Proposal Engineer
- **Place:** Chennai (no street)
- **Openings:** 2
- **Education:** Graduate / PG
- **Experience:** 2–5 years
- **Industry type:** Water Treatment / Waste Management
- **Mandatory on the job description:** relevance experience related to STP and ETP
- **Email:** [${HR}](mailto:${HR}) and [${HR_PROJECTS}](mailto:${HR_PROJECTS})

The posters do not name hours, full-time or contract, or a street. The meeting-room photograph is not a gender rule.

## What the job description lists

Experienced Proposal Engineer responsible for preparing commercial proposals, coordinating with cross-functional teams, obtaining vendor quotations on time, and submitting competitive bids in response to client Requests for Proposals (RFPs). Skilled in cost estimation, technical documentation, and commercial pricing strategies to secure projects successfully.

Should have the mandatory relevance experience related to STP and ETP:

1. Tender and RFP management
2. Vendor coordination and quotations
3. Cost estimation and pricing (commercial documents)
4. Bid submission and documentation
5. Project handover and post-bid support

## Key skills on the spec table

Tendering and bidding, techno-commercial proposal preparation, RFP / RFQ analysis, cost estimation and budgeting, vendor management, pricing and commercial documentation, BOQ preparation, compliance matrix preparation, contract review, risk assessment, negotiation skills, advanced MS Excel, ERP / SAP knowledge.

## Pay

The Proposal Engineer posters do not print a salary. No rupee figure is printed, so salary stays undisclosed here.

## How to apply

Email your resume to **[${HR}](mailto:${HR})** or **[${HR_PROJECTS}](mailto:${HR_PROJECTS})**.

Use the **Email your resume** button on this page. It opens both mailboxes. Say you are applying for Proposal Engineer at HECS in Chennai, and that you saw it on MyChennaiCity.

This page is compiled from the hiring posters and the campaign caption. Confirm the workplace, STP / ETP relevance, and the pay before you join.

## Common questions

### Where is the job?

Chennai. The posters do not print a street or a door number.

### How many seats?

**2**, as printed on the spec table.

### Who can apply?

Graduate / PG with 2–5 years, water treatment / waste management industry type, and mandatory relevance experience related to STP and ETP, as printed.

### What is the pay?

The Proposal Engineer posters do not print a salary figure.

### How do I apply?

Email ${HR} or ${HR_PROJECTS}.
`.trim(),
  },
];

async function main() {
  const ours = new Set(ROLES.map((role) => role.slug));
  const matches = await db
    .select({
      slug: jobPostings.slug,
      title: jobPostings.title,
      status: jobPostings.status,
    })
    .from(jobPostings)
    .where(
      or(
        ilike(jobPostings.body, `%${HR}%`),
        ilike(jobPostings.body, `%${HR_PROJECTS}%`),
        ilike(jobPostings.applicationUrl, `%${HR}%`),
        ilike(jobPostings.applicationUrl, `%${HR_PROJECTS}%`),
      ),
    );

  const other = matches.filter((row) => !ours.has(row.slug));
  if (other.length > 0) {
    console.log(
      "[seed-job] Same email already on another listing. Skipping.",
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
  // 30 days from 5 Nov 2026. Last moment of 5 Dec 2026 IST.
  const validThrough = new Date("2026-12-05T23:59:59+05:30");
  const stillOpen = validThrough.getTime() > now.getTime();

  for (const role of ROLES) {
    const [existingJob] = await db
      .select({ id: jobPostings.id })
      .from(jobPostings)
      .where(and(eq(jobPostings.cityId, city.id), eq(jobPostings.slug, role.slug)))
      .limit(1);

    const values = {
      employerId,
      cityId: city.id,
      slug: role.slug,
      title: role.title,
      body: role.body,
      locationLabel: "Chennai",
      status: (stillOpen ? "open" : "closed") as "open" | "closed",
      employmentType: null,
      validThrough,
      applicationUrl: role.applicationUrl,
      salaryDisclosed: false,
      salaryMin: null,
      salaryMax: null,
      openingsCount: role.openingsCount,
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
