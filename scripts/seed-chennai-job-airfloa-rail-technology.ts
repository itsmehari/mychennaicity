/**
 * Airfloa Rail Technology Limited — eight roles, one flyer (Nov 2026).
 * Each title is its own listing. No rupee figure. Apply by email.
 * Registered office from https://www.airflow.co.in/contact-us/
 *
 * Flyer: `public/images/listings/airfloa-rail-technology-hiring-chennai-november-2026.jpg`
 *
 * Dev:  `npm run db:seed:chennai-job:airfloa-rail-technology`
 * Live: `npm run db:seed:chennai-job:airfloa-rail-technology:live`
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

const EMPLOYER_SLUG = "airfloa-rail-technology";
const EMPLOYER_NAME = "Airfloa Rail Technology Limited";
const WEBSITE = "https://www.airflow.co.in/";
const CONTACT_PAGE = "https://www.airflow.co.in/contact-us/";
const FLYER =
  "/images/listings/airfloa-rail-technology-hiring-chennai-november-2026.jpg";
const EMAIL = "hrcorporate@airfloa.co.in";
const PHONE = "9384960543";
const PHONE_DISPLAY = "93849 60543";
const TEL = `tel:+91${PHONE}`;
const LOCATION_LABEL =
  "9, Chelliamman Koil Street, Keelkattalai 600117, Chennai";
const MAPS =
  "https://www.google.com/maps/search/?api=1&query=Airfloa+Rail+Technology+Limited+9+Chelliamman+Koil+Street+Keelkattalai+Chennai+600117";
/** 30 days from the 27 Nov 2026 flyer post, through 11:59 PM IST. */
const VALID_THROUGH = new Date("2026-12-27T23:59:59+05:30");

type RoleSeed = {
  slug: string;
  title: string;
  designation: string;
  experienceLine: string;
};

const ROLES: RoleSeed[] = [
  {
    slug: "procurement-manager-airfloa-rail-technology-chennai-november-2026",
    title: "Procurement Manager — Airfloa Rail Technology (Keelkattalai, Chennai)",
    designation: "Procurement Manager",
    experienceLine: "10+ years",
  },
  {
    slug: "design-engineer-airfloa-rail-technology-chennai-november-2026",
    title: "Design Engineer — Airfloa Rail Technology (Keelkattalai, Chennai)",
    designation: "Design Engineer",
    experienceLine: "3–5 years",
  },
  {
    slug: "costing-engineer-airfloa-rail-technology-chennai-november-2026",
    title: "Costing Engineer — Airfloa Rail Technology (Keelkattalai, Chennai)",
    designation: "Costing Engineer",
    experienceLine: "3–5 years",
  },
  {
    slug: "senior-executive-hr-airfloa-rail-technology-chennai-november-2026",
    title:
      "Senior Executive — HR — Airfloa Rail Technology (Keelkattalai, Chennai)",
    designation: "Senior Executive — HR",
    experienceLine: "5–7 years",
  },
  {
    slug: "safety-engineer-airfloa-rail-technology-chennai-november-2026",
    title: "Safety Engineer — Airfloa Rail Technology (Keelkattalai, Chennai)",
    designation: "Safety Engineer",
    experienceLine: "5–7 years",
  },
  {
    slug: "machine-maintenance-engineer-airfloa-rail-technology-chennai-november-2026",
    title:
      "Machine Maintenance Engineer — Airfloa Rail Technology (Keelkattalai, Chennai)",
    designation: "Machine Maintenance Engineer",
    experienceLine: "5–7 years",
  },
  {
    slug: "accounts-payable-executive-airfloa-rail-technology-chennai-november-2026",
    title:
      "Accounts Payable Executive — Airfloa Rail Technology (Keelkattalai, Chennai)",
    designation: "Accounts Payable Executive",
    experienceLine: "2–3 years",
  },
  {
    slug: "project-coordinator-airfloa-rail-technology-chennai-november-2026",
    title:
      "Project Coordinator — Airfloa Rail Technology (Keelkattalai, Chennai)",
    designation: "Project Coordinator",
    experienceLine: "1–2 years",
  },
];

function mailApply(designation: string) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(
    `Application — ${designation} — Airfloa Rail Technology (Chennai)`,
  )}`;
}

function roleBody(role: RoleSeed): string {
  const sisters = ROLES.filter((other) => other.slug !== role.slug)
    .map((other) => `- [${other.designation}](/chennai-jobs/${other.slug})`)
    .join("\n");
  const apply = mailApply(role.designation);

  return `
![Airfloa Rail Technology Limited — We're hiring, railway and manufacturing roles, Chennai](${FLYER})

**${EMPLOYER_NAME}** is hiring a **${role.designation}** in **Chennai**. The flyer prints **${role.experienceLine}** for this role. Pay is not printed.

This page is only the **${role.designation}** opening. The same flyer lists seven other titles, each on its own page.

## Role at a glance

| | |
| --- | --- |
| **Designation** | ${role.designation} |
| **Employer** | ${EMPLOYER_NAME} |
| **Experience** | ${role.experienceLine} |
| **Industry** | Railway rolling stock and manufacturing |
| **Registered office** | 9, Chelliamman Koil Street, Keelkattalai, Chennai 600117, Tamil Nadu |
| **Workplace** | Not named on the flyer. The company site says it has 7 units in and around Chennai. |
| **Pay** | Not stated |
| **Open through** | 27 December 2026, 11:59 PM IST |

- **Benefits:** Work in India’s railway and manufacturing sector, on projects for Indian Railways, with the growth and learning lines printed on the flyer. A rupee band is not printed.

## What the flyer says

- Be part of India’s growing railway and manufacturing sector.
- Contribute to the development of Indian Railways.
- Exciting career growth and learning opportunities.
- Work on impactful projects shaping India’s mobility future.
- Tagline on the poster: Enriching Mobility.
- Closing line: Build your career. Drive innovation. Shape the future of mobility.

## Company (from the public website)

${EMPLOYER_NAME} (formerly Airflow Equipments) publishes its office at **[9, Chelliamman Koil Street, Keelkattalai, Chennai 600117](${MAPS})**. The [contact page](${CONTACT_PAGE}) also lists **044 2247 4784**, **044 2247 4783**, and **enquiry@airflow.co.in**. Those are the office lines. The hiring flyer uses a different email and mobile.

The [company site](${WEBSITE}) describes an IRIS-certified manufacturer of railway rolling stock, covering design, analysis, development, fabrication, machining, and assembly. It says the company is ISO 9001:2015, EN 15085-2, and IRIS (BMS) certified, and names Indian Railways, ICF, BMRCL, Bombardier, BEML, and BHEL among its customers. It also says there are **7 units in and around Chennai**. This listing does not assign the role to a particular unit.

## How to apply

Email **[${EMAIL}](${apply})** with an updated resume and the role name: **${role.designation}**.

You can also call **[${PHONE_DISPLAY}](${TEL})**. The flyer shows a phone icon, so this is a call, not a WhatsApp apply button.

Mention that you saw the opening on **MyChennaiCity jobs**.

**Safety note:** Do not pay a registration fee to a third party. Confirm you are writing to ${EMPLOYER_NAME}.

This page is compiled from the hiring flyer and the company’s public website. It is not the employer’s own careers page. Confirm pay, the unit, and joining with HR before you share documents.

## Other openings on this flyer

${sisters}

## Common questions

### What experience does the ${role.designation} role at Airfloa ask for?

The flyer prints **${role.experienceLine}** for **${role.designation}**. It does not print a degree, a shift, or a vacancy count.

### Where is Airfloa Rail Technology?

The registered office on [airflow.co.in](${CONTACT_PAGE}) is **9, Chelliamman Koil Street, Keelkattalai, Chennai 600117, Tamil Nadu**. The site says the company has 7 units in and around Chennai. The flyer does not say which unit this role sits in.

### What is the salary for ${role.designation}?

The flyer does not print a rupee figure. Confirm pay with HR.

### How do I apply for ${role.designation} at Airfloa?

Email ${EMAIL} with an updated resume and the role name. You can also call ${PHONE_DISPLAY}. The office enquiry mailbox on the website is enquiry@airflow.co.in; the flyer asks candidates to use ${EMAIL}.
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
        ilike(jobPostings.body, `%${PHONE}%`),
        ilike(jobPostings.body, `%${EMAIL}%`),
        ilike(jobPostings.body, "%Airfloa Rail Technology%"),
      ),
    );

  const ours = new Set(ROLES.map((role) => role.slug));
  const other = matches.filter((row) => !ours.has(row.slug));
  if (other.length > 0) {
    console.log("[seed-job] Duplicate already live. Skipping.");
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
      .set({
        name: EMPLOYER_NAME,
        websiteUrl: WEBSITE,
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
        websiteUrl: WEBSITE,
        verified: false,
      })
      .returning({ id: employers.id });
    employerId = ins.id;
    console.log("[seed-job] Inserted employer:", EMPLOYER_SLUG);
  }

  const now = new Date();
  const stillOpen = VALID_THROUGH.getTime() > now.getTime();

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
      locationLabel: LOCATION_LABEL,
      status: (stillOpen ? "open" : "closed") as "open" | "closed",
      employmentType: null,
      validThrough: VALID_THROUGH,
      applicationUrl: mailApply(role.designation),
      salaryDisclosed: false,
      salaryMin: null,
      salaryMax: null,
      schemaEligible: true,
      remotePolicy: "unspecified",
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

    console.log(
      "[seed-job] Detail:",
      `https://mychennaicity.in/chennai-jobs/${role.slug}`,
    );
    await finishListingSeedLive({
      jobSlug: role.slug,
      label: "seed-airfloa-rail-technology",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
