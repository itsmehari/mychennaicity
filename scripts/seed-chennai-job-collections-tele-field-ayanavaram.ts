/**
 * Tele and field collections — reputed agency, Ayanavaram (20 Nov 2026 note).
 * Two titles: 10 tele callers and 10 field executives. Qualification 10+.
 * Languages: Tamil. Pay printed as variable plus attractive incentives — no
 * rupee figure. Contact Priya, WhatsApp or call 6305808619. Immediate
 * opportunities. No registered company name, street, hours, or job type.
 * Each title has its own vacancy count and work mode, so each title is its
 * own listing. English only. Not featured: Ayanavaram has no area-hub page.
 *
 * Dev:  `npm run db:seed:chennai-job:collections-ayanavaram`
 * Live: `npm run db:seed:chennai-job:collections-ayanavaram:live`
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

const EMPLOYER_SLUG = "reputed-agency-ayanavaram";
const EMPLOYER_NAME = "Reputed agency";
const PHONE_DISPLAY = "63058 08619";
const PHONE_RAW = "6305808619";
const PHONE_DIGITS = "916305808619";
const TEL = `tel:+${PHONE_DIGITS}`;
const CONTACT = "Priya";

type RoleSeed = {
  slug: string;
  title: string;
  designation: string;
  openingsCount: number;
  workModeLine: string;
  remotePolicy: "field" | "unspecified";
};

const ROLES: RoleSeed[] = [
  {
    slug: "tele-caller-collections-ayanavaram-chennai",
    title: "Tele Caller (Collections) — Ayanavaram, Chennai",
    designation: "Tele Caller (Collections)",
    openingsCount: 10,
    workModeLine:
      "Tele calling, as the title reads. The note does not say office, field, or work from home.",
    remotePolicy: "unspecified",
  },
  {
    slug: "field-executive-collections-ayanavaram-chennai",
    title: "Field Executive (Collections) — Ayanavaram, Chennai",
    designation: "Field Executive (Collections)",
    openingsCount: 10,
    workModeLine: "Field, as the title reads.",
    remotePolicy: "field",
  },
];

function waApply(designation: string) {
  return `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(
    `Hi ${CONTACT}, I saw the ${designation} role in Ayanavaram on MyChennaiCity jobs. I would like to send my resume.`,
  )}`;
}

function roleBody(role: RoleSeed): string {
  const sister = ROLES.find((other) => other.slug !== role.slug);
  const apply = waApply(role.designation);

  return `
A hiring note for a **reputed agency** in **Ayanavaram, Chennai** asks for **${role.designation}**. **${role.openingsCount}** vacancies. This page is only that title.

The note does not print a registered company name. The contact name on the note is **${CONTACT}**.

The same note also lists **[${sister?.designation}](/chennai-jobs/${sister?.slug})** (${sister?.openingsCount} vacancies). Together that is **20** seats: 10 tele callers and 10 field executives.

Pay is printed as **variable, plus attractive incentives**. No rupee figure. Street, hours, and job type (full-time / part-time / contract) are not printed. The note says **immediate opportunities** are available.

## Role at a glance

- **Designation:** ${role.designation}
- **Employer on the note:** Reputed agency (no registered name printed)
- **Contact:** ${CONTACT}
- **Openings:** ${role.openingsCount}
- **Qualification:** 10+
- **Languages:** Tamil
- **Location:** Ayanavaram, Chennai (no street)
- **Work:** ${role.workModeLine}

## How to apply

Send your resume on WhatsApp or call **${CONTACT}** at **[${PHONE_DISPLAY}](${apply})**.

Call the same number: **[${PHONE_DISPLAY}](${TEL})**.

Use the **WhatsApp** button on this page. Say you are applying for ${role.designation} in Ayanavaram, and that you saw it on MyChennaiCity.

Do not pay registration fees to third parties. The note does not name a registered company, so confirm who you are speaking with before you share documents.

This page is compiled from the hiring note. It is not the employer’s own careers page. Confirm pay, place, and joining before you share documents.

## Other opening on this note

- [${sister?.designation}](/chennai-jobs/${sister?.slug})

## Common questions

### Where is the job?

Ayanavaram, Chennai. The note does not print a street or a door number. Work for this title: ${role.workModeLine}

### How many seats?

**${role.openingsCount}** for this title. The note’s total across tele callers and field executives is **20**.

### What is the pay?

The note says variable, plus attractive incentives. It does not print a rupee figure.

### Who can apply?

Qualification **10+**. Language required: **Tamil**. The note does not print age, gender, or years of experience.

### How do I apply?

WhatsApp or call ${CONTACT} on ${PHONE_DISPLAY} (${PHONE_RAW}). The note says immediate opportunities are available.
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
        ilike(jobPostings.body, `%${PHONE_RAW}%`),
        ilike(jobPostings.body, `%${PHONE_DISPLAY}%`),
        ilike(jobPostings.applicationUrl, `%${PHONE_DIGITS}%`),
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
  // 30 days from 20 Nov 2026. Last moment of 20 Dec 2026 IST.
  const validThrough = new Date("2026-12-20T23:59:59+05:30");
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
      locationLabel: "Ayanavaram, Chennai",
      status: (stillOpen ? "open" : "closed") as "open" | "closed",
      employmentType: null,
      validThrough,
      applicationUrl: waApply(role.designation),
      salaryDisclosed: false,
      salaryMin: null as number | null,
      salaryMax: null as number | null,
      salaryUnit: null as string | null,
      schemaEligible: true,
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
      label: "seed-collections-ayanavaram",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
