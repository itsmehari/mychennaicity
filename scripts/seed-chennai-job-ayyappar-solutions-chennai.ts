/**
 * Ayyappar Solutions Pvt Ltd — three titles on one Chennai hiring poster.
 * Poster (17 Nov 2026): Telecalling Executive (work from home; female only;
 * 100 seats; any graduate; 18–30; freshers and experienced; Tamil & English),
 * Field Sales Executive (male only; 100 seats; any graduate; 18–35; freshers
 * and experienced; Tamil & English), HR Executive (male and female; 5 seats;
 * any graduate; 18–35; 1–2 years in HR required; Tamil & English).
 * Location: Chennai candidates preferred. Contact / WhatsApp 7418356713.
 * Contact timing Monday to Saturday, 9:30 AM to 6:30 PM only.
 * Footer: freshers are welcome; immediate joining. No rupee figure, street,
 * or job type printed. Each title has its own seats, gender line, and work
 * mode, so each title is its own listing. English only.
 *
 * Flyer: `public/images/listings/ayyappar-solutions-urgent-hiring-chennai-2026.jpg`
 *
 * Dev:  `npm run db:seed:chennai-job:ayyappar-solutions-chennai`
 * Live: `npm run db:seed:chennai-job:ayyappar-solutions-chennai:live`
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

const EMPLOYER_SLUG = "ayyappar-solutions-pvt-ltd";
const EMPLOYER_NAME = "Ayyappar Solutions Pvt Ltd";
const FLYER =
  "https://raw.githubusercontent.com/itsmehari/mychennaicity/main/public/images/listings/ayyappar-solutions-urgent-hiring-chennai-2026.jpg";
const PHONE_DISPLAY = "74183 56713";
const PHONE_DIGITS = "917418356713";
const TEL = `tel:+${PHONE_DIGITS}`;

type RoleSeed = {
  slug: string;
  title: string;
  designation: string;
  openingsCount: number;
  genderLine: string;
  ageLine: string;
  experience: string;
  workModeLine: string;
  remotePolicy: "remote" | "field" | "unspecified";
  extraGlance?: string;
};

const ROLES: RoleSeed[] = [
  {
    slug: "telecalling-executive-work-from-home-ayyappar-solutions-chennai",
    title:
      "Telecalling Executive (Work From Home) — Ayyappar Solutions, Chennai",
    designation: "Telecalling Executive (Work From Home)",
    openingsCount: 100,
    genderLine: "Female candidates only",
    ageLine: "18–30 years",
    experience: "Freshers and experienced candidates can apply",
    workModeLine: "Work from home",
    remotePolicy: "remote",
    extraGlance: "- **Work mode:** Work from home opportunity",
  },
  {
    slug: "field-sales-executive-ayyappar-solutions-chennai",
    title: "Field Sales Executive — Ayyappar Solutions, Chennai",
    designation: "Field Sales Executive",
    openingsCount: 100,
    genderLine: "Male candidates only",
    ageLine: "18–35 years",
    experience: "Freshers and experienced candidates can apply",
    workModeLine: "Field sales (as the title reads; no street printed)",
    remotePolicy: "field",
  },
  {
    slug: "hr-executive-ayyappar-solutions-chennai",
    title: "HR Executive — Ayyappar Solutions, Chennai",
    designation: "HR Executive",
    openingsCount: 5,
    genderLine: "Male and female candidates",
    ageLine: "18–35 years",
    experience: "1–2 years in HR department required",
    workModeLine: "Not printed (not marked office, field, or work from home)",
    remotePolicy: "unspecified",
  },
];

function waApply(designation: string) {
  return `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(
    `Hi, I saw the ${designation} role at Ayyappar Solutions Pvt Ltd on MyChennaiCity jobs. I would like to apply.`,
  )}`;
}

function roleBody(role: RoleSeed): string {
  const sisters = ROLES.filter((other) => other.slug !== role.slug)
    .map((other) => `- [${other.designation}](/chennai-jobs/${other.slug})`)
    .join("\n");
  const apply = waApply(role.designation);

  return `
![Hiring flyer — Ayyappar Solutions Pvt Ltd, Chennai](${FLYER})

**${EMPLOYER_NAME}** is hiring for **${role.designation}** in **Chennai**. **${role.openingsCount}** vacancies on the flyer. This page is only that title.

The same flyer lists **205** openings across telecalling, field sales, and HR. Pay, street, and job type (full-time / part-time / contract) are not printed.

## Role at a glance

- **Designation:** ${role.designation}
- **Employer:** ${EMPLOYER_NAME}
- **Openings:** ${role.openingsCount}
- **Open to:** ${role.genderLine}
- **Qualification:** Any graduate
- **Age:** ${role.ageLine}
- **Experience:** ${role.experience}
- **Languages:** Tamil and English
${role.extraGlance ?? ""}
- **Location:** Chennai candidates preferred (no street)

The flyer does not name hours as full-time, part-time, or contract. Contact timing on the flyer is **Monday to Saturday, 9:30 AM to 6:30 PM only** — that is when to call or WhatsApp, not a printed shift.

The footer says **freshers are welcome** and **apply now for immediate joining**. For this title, experience is printed as: ${role.experience}.

## How to apply

WhatsApp or call **[${PHONE_DISPLAY}](${apply})**.

Use the **WhatsApp** button on this page. Say you are applying for ${role.designation} at ${EMPLOYER_NAME}, and that you saw it on MyChennaiCity.

Do not pay registration fees to third parties — verify you are dealing with ${EMPLOYER_NAME}.

This page is compiled from the hiring flyer. It is not the employer’s own careers page. Confirm pay, place, and joining before you share documents.

## Other openings on this flyer

${sisters}

## Common questions

### Where is the job?

Chennai candidates preferred. The flyer does not print a street or a door number. Work mode for this title: ${role.workModeLine}.

### How many seats?

**${role.openingsCount}** for this title. The flyer’s total across all three titles is **205**.

### What is the pay?

The flyer does not print a rupee figure.

### Who can apply?

**${role.genderLine}.** Any graduate. Age **${role.ageLine}**. Experience: ${role.experience}. Tamil and English.

### How do I apply?

WhatsApp or call ${PHONE_DISPLAY}, Monday to Saturday, 9:30 AM to 6:30 PM only.
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
        ilike(jobPostings.body, "%7418356713%"),
        ilike(jobPostings.body, "%74183 56713%"),
        ilike(jobPostings.applicationUrl, "%917418356713%"),
      ),
    );

  const ours = new Set(ROLES.map((role) => role.slug));
  const other = matches.filter((row) => !ours.has(row.slug));
  if (other.length > 0) {
    console.log(
      "[seed-job] Same phone already on another listing. Skipping.",
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
  // 30 days from 17 Nov 2026. Last moment of 17 Dec 2026 IST.
  const validThrough = new Date("2026-12-17T23:59:59+05:30");
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
      locationLabel: "Chennai",
      status: (stillOpen ? "open" : "closed") as "open" | "closed",
      employmentType: null,
      validThrough,
      applicationUrl: waApply(role.designation),
      salaryDisclosed: false,
      salaryMin: null as number | null,
      salaryMax: null as number | null,
      openingsCount: role.openingsCount,
      remotePolicy: role.remotePolicy,
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
      label: "seed-ayyappar-solutions-chennai",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
