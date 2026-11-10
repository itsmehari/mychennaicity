/**
 * Zavin HR Solutions — healthcare and aesthetics clinic, Adyar and Neelankarai.
 * Note (8 Nov 2026): seven titles, 11 seats in total. Zavin is hiring on
 * behalf of a clinic the note does not name. Each title has its own pay,
 * place, and vacancy count, so each title is its own listing. Shared inbox
 * vinoth@zavinhr.com and contact 7338914813. English only.
 *
 * The social-media title prints two alternative packages. Those stay in the
 * body. JobPosting salary stays undisclosed for that title so the two
 * packages are not flattened into one band.
 *
 * Dev:  `npm run db:seed:chennai-job:zavin-hr-clinic`
 * Live: `npm run db:seed:chennai-job:zavin-hr-clinic:live`
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

const EMPLOYER_SLUG = "zavin-hr-solutions";
const EMPLOYER_NAME = "Zavin HR Solutions";
const EMAIL = "vinoth@zavinhr.com";
const PHONE_DISPLAY = "7338914813";
const PHONE_TEL = "tel:+917338914813";
const WEBSITE = "https://www.zavinhr.com";

type RoleSeed = {
  slug: string;
  title: string;
  designation: string;
  locationLabel: string;
  placeLine: string;
  openingsCount: number;
  experience: string;
  payLine: string;
  salaryDisclosed: boolean;
  salaryMin: number | null;
  salaryMax: number | null;
  genderLine?: string;
  qualification?: string;
  skills?: string;
};

const ROLES: RoleSeed[] = [
  {
    slug: "front-desk-executive-zavin-hr-neelankarai",
    title: "Front Desk Executive — Zavin HR Solutions, Neelankarai (ECR)",
    designation: "Front Desk Executive",
    locationLabel: "Neelankarai (ECR), Chennai",
    placeLine: "Neelankarai (ECR)",
    openingsCount: 2,
    experience: "1–2 years",
    payLine: "₹40,000 per month",
    salaryDisclosed: true,
    salaryMin: 40000,
    salaryMax: 40000,
    genderLine: "Male / Female",
  },
  {
    slug: "branch-manager-centre-head-zavin-hr-neelankarai",
    title: "Branch Manager / Centre Head — Zavin HR Solutions, Neelankarai (ECR)",
    designation: "Branch Manager / Centre Head",
    locationLabel: "Neelankarai (ECR), Chennai",
    placeLine: "Neelankarai (ECR)",
    openingsCount: 1,
    experience: "1–2 years",
    payLine: "₹40,000–₹45,000 per month",
    salaryDisclosed: true,
    salaryMin: 40000,
    salaryMax: 45000,
    qualification: "Science / MBA / Hospitality background preferred",
  },
  {
    slug: "physician-assistant-zavin-hr-adyar-neelankarai",
    title: "Physician Assistant — Zavin HR Solutions, Adyar / Neelankarai",
    designation: "Physician Assistant",
    locationLabel: "Adyar / Neelankarai, Chennai",
    placeLine: "Adyar / Neelankarai",
    openingsCount: 3,
    experience: "1–2 years",
    payLine: "₹35,000 per month",
    salaryDisclosed: true,
    salaryMin: 35000,
    salaryMax: 35000,
    genderLine: "Female",
    qualification:
      "B.Sc. Nursing / Allied Health Sciences / Science-related degree",
  },
  {
    slug: "executive-assistant-admin-accounting-zavin-hr-adyar-neelankarai",
    title:
      "Executive Assistant — Administration & Accounting, Zavin HR Solutions, Adyar / Neelankarai",
    designation: "Executive Assistant – Administration & Accounting",
    locationLabel: "Adyar / Neelankarai, Chennai",
    placeLine: "Adyar / Neelankarai",
    openingsCount: 1,
    experience: "1–2 years",
    payLine: "₹30,000–₹35,000 per month",
    salaryDisclosed: true,
    salaryMin: 30000,
    salaryMax: 35000,
    qualification: "B.Com / BCA / B.Sc. Computer Science or related qualification",
    skills:
      "Advanced Excel, Google Sheets, accounting and administrative coordination",
  },
  {
    slug: "social-media-manager-zavin-hr-adyar-neelankarai",
    title: "In-House Social Media Manager — Zavin HR Solutions, Adyar & Neelankarai",
    designation: "In-House Social Media Manager",
    locationLabel: "Adyar & Neelankarai, Chennai",
    placeLine: "Adyar & Neelankarai",
    openingsCount: 1,
    experience: "1–2 years",
    payLine:
      "₹45,000–₹55,000 per month for the full-scope role (shooting, editing, designing and posting), or ₹30,000–₹35,000 per month for strategy, designing and posting",
    salaryDisclosed: false,
    salaryMin: null,
    salaryMax: null,
    skills:
      "Canva, Instagram, Facebook, YouTube, LinkedIn, video editing, AI tools and digital marketing",
  },
  {
    slug: "pharmacist-zavin-hr-adyar",
    title: "Pharmacist — Zavin HR Solutions, Adyar",
    designation: "Pharmacist",
    locationLabel: "Adyar, Chennai",
    placeLine: "Adyar",
    openingsCount: 1,
    experience: "1–2 years",
    payLine: "₹28,000–₹30,000 per month",
    salaryDisclosed: true,
    salaryMin: 28000,
    salaryMax: 30000,
    qualification: "B.Pharm with valid pharmacy registration / certification",
  },
  {
    slug: "patient-care-coordinator-zavin-hr-neelankarai",
    title: "Patient Care Coordinator — Zavin HR Solutions, Neelankarai (ECR)",
    designation: "Patient Care Coordinator",
    locationLabel: "Neelankarai (ECR), Chennai",
    placeLine: "Neelankarai (ECR)",
    openingsCount: 2,
    experience: "1–2 years",
    payLine: "₹30,000–₹35,000 per month",
    salaryDisclosed: true,
    salaryMin: 30000,
    salaryMax: 35000,
    qualification: "Science / Psychology / Hospitality background preferred",
  },
];

function mailtoFor(designation: string) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(
    `Application — ${designation}, Zavin HR Solutions, Chennai`,
  )}`;
}

function roleBody(role: RoleSeed): string {
  const sisters = ROLES.filter((other) => other.slug !== role.slug)
    .map((other) => `- [${other.designation}](/chennai-jobs/${other.slug})`)
    .join("\n");

  const extra = [
    role.genderLine ? `- **Gender:** ${role.genderLine}` : "",
    role.qualification ? `- **Qualification:** ${role.qualification}` : "",
    role.skills ? `- **Skills:** ${role.skills}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const payNote = role.salaryDisclosed
    ? ""
    : "\n\nThe note prints two alternative packages for this title. They are not one sliding band, so the salary figure on the card stays undisclosed. Read both packages below.\n";

  return `
**${EMPLOYER_NAME}** is hiring a **${role.designation}** for a healthcare and aesthetics clinic in **${role.placeLine}, Chennai**. The note does not name the clinic. It says Zavin HR Solutions is hiring on the clinic’s behalf. **${role.openingsCount}** ${role.openingsCount === 1 ? "vacancy" : "vacancies"}. Experience **${role.experience}**. Pay **${role.payLine}**.

The same note lists **11** openings across clinical, administration, pharmacy, patient care, and digital marketing work at **Adyar** and **Neelankarai (ECR)**. This page is only the ${role.designation} seat.

## Role at a glance

- **Designation:** ${role.designation}
- **Place:** ${role.placeLine}, Chennai (no street)
- **Openings:** ${role.openingsCount}
- **Experience:** ${role.experience}
- **Pay:** ${role.payLine}
${extra}

The note does not name hours as full-time, part-time, or contract, and it does not give a door number.
${payNote}
## Shared terms on this note

These lines apply across the openings in the same note. The note does not map a shift window to a title.

- **Working days:** Wednesday to Monday (6 days a week)
- **Sunday:** Mandatory working day
- **Weekly off:** Tuesday
- **Shift timings:** 10:00 AM–7:00 PM / 11:00 AM–8:00 PM or 10:00 AM–8:00 PM, depending on the role
- **Notice period:** 3 months as per company policy
- **Joining:** Immediate joining preferred

## How to apply

Email your updated resume to **[${EMAIL}](${mailtoFor(role.designation)})**.

Contact **[${PHONE_DISPLAY}](${PHONE_TEL})**. Website: [www.zavinhr.com](${WEBSITE}).

Use the **Email your resume** button on this page. Say you are applying for ${role.designation} through ${EMPLOYER_NAME}, and that you saw it on MyChennaiCity.

## Other openings in this note

${sisters}

## Common questions

### Where is the job?

${role.placeLine}, Chennai. The note does not print a street or a door number. The clinic name is not printed.

### How many seats?

**${role.openingsCount}** for this title. The note’s total across all titles is **11**.

### What is the pay?

${role.payLine}.

### Who is hiring?

${EMPLOYER_NAME}, on behalf of a healthcare and aesthetics clinic the note does not name.

### How do I apply?

Email ${EMAIL}. You can also call ${PHONE_DISPLAY}.
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
        ilike(jobPostings.body, `%${EMAIL}%`),
        ilike(jobPostings.applicationUrl, `%${EMAIL}%`),
        ilike(jobPostings.body, `%${PHONE_DISPLAY}%`),
      ),
    );

  const ours = new Set(ROLES.map((role) => role.slug));
  const other = matches.filter((row) => !ours.has(row.slug));
  if (other.length > 0) {
    console.log(
      "[seed-job] Same email or phone already on another listing. Skipping.",
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
  // 30 days from 8 Nov 2026. Last moment of 8 Dec 2026 IST.
  const validThrough = new Date("2026-12-08T23:59:59+05:30");
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
      locationLabel: role.locationLabel,
      status: (stillOpen ? "open" : "closed") as "open" | "closed",
      employmentType: null,
      validThrough,
      applicationUrl: mailtoFor(role.designation),
      salaryDisclosed: role.salaryDisclosed,
      salaryMin: role.salaryMin,
      salaryMax: role.salaryMax,
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
