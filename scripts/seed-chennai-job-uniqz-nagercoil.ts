/**
 * Uniqz Technologies — two Nagercoil roles from the hiring poster
 * (Process Associate · email marketing operations, and
 * Associate Support Analyst · customer & internal support).
 *
 * Poster: `public/images/listings/uniqz-technologies-hiring-nagercoil-2026.jpg`
 * Workplace is Nagercoil. The poster does not name a salary, street, shift, or seat count.
 *
 * Dev:  `npm run db:seed:chennai-job:uniqz-nagercoil`
 * Live: `npm run db:seed:chennai-job:uniqz-nagercoil:live`
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

const EMPLOYER_SLUG = "uniqz-technologies";
const EMPLOYER_NAME = "Uniqz Technologies";
const EMPLOYER_SITE = "https://www.uniqztech.com";
const PHONE_DISPLAY = "88072 40557";
const EMAIL = "careers@uniqztech.com";
const FLYER_IMAGE =
  "/images/listings/uniqz-technologies-hiring-nagercoil-2026.jpg";

type RoleSeed = {
  slug: string;
  title: string;
  roleLabel: string;
  functionLine: string;
  who: string[];
  relatedSlug: string;
  relatedLabel: string;
};

function waApply(roleLabel: string): string {
  return `https://wa.me/918807240557?text=${encodeURIComponent(
    `Hello, I am applying for the ${roleLabel} role at Uniqz Technologies, Nagercoil. I am sending my updated resume. I saw the opening on MyChennaiCity.`,
  )}`;
}

const ROLES: RoleSeed[] = [
  {
    slug: "process-associate-email-marketing-uniqz-nagercoil",
    title:
      "Process Associate — Email Marketing Operations · Uniqz Technologies · Nagercoil",
    roleLabel: "Process Associate — Email Marketing Operations",
    functionLine: "Email marketing operations",
    who: [
      "**Freshers and experienced** candidates (as printed)",
      "**Training provided**",
      "**Immediate joiners preferred**",
    ],
    relatedSlug: "associate-support-analyst-uniqz-nagercoil",
    relatedLabel:
      "Associate Support Analyst · customer and internal support",
  },
  {
    slug: "associate-support-analyst-uniqz-nagercoil",
    title:
      "Associate Support Analyst — Customer & Internal Support · Uniqz Technologies · Nagercoil",
    roleLabel: "Associate Support Analyst — Customer & Internal Support",
    functionLine: "Customer and internal support",
    who: [
      "**Any degree**",
      "**Freshers welcome**",
      "**Training provided**",
      "**Growth opportunity** (as printed — no band or timeline was stated)",
    ],
    relatedSlug: "process-associate-email-marketing-uniqz-nagercoil",
    relatedLabel: "Process Associate · email marketing operations",
  },
];

function buildBody(role: RoleSeed): string {
  const apply = waApply(role.roleLabel);
  return `
**${EMPLOYER_NAME}** is hiring for **${role.roleLabel}** in **Nagercoil**. The poster asks candidates to send an updated resume.

This page is one role from that poster — a community listing, not the company’s official careers page. The poster does not name a street address, salary, shift, or how many seats are open. Confirm those before you travel — the workplace printed on the poster is **Nagercoil**, not a Chennai office.

![Uniqz Technologies hiring poster — Process Associate for email marketing operations and Associate Support Analyst in Nagercoil](${FLYER_IMAGE})

## Role at a glance

- **Position:** ${role.roleLabel}
- **Work named on the poster:** ${role.functionLine}
- **Employer:** ${EMPLOYER_NAME}
- **Workplace:** Nagercoil
- **Poster line:** Learn, grow, build together

## Who should apply

${role.who.map((line) => `- ${line}`).join("\n")}

The poster does not state full-time or part-time, working hours, or a pay figure.

Sister opening from the same poster: [${role.relatedLabel}](/chennai-jobs/${role.relatedSlug}).

## How to apply

**Send your updated resume.**

- WhatsApp **${PHONE_DISPLAY}** — [Apply via WhatsApp](${apply})
- Email [${EMAIL}](mailto:${EMAIL}?subject=${encodeURIComponent(role.roleLabel)})
- Website [${EMPLOYER_SITE.replace("https://", "")}](${EMPLOYER_SITE})

Mention that you saw the opening on MyChennaiCity jobs.

**Safety note:** Do **not** pay any upfront “registration” or “training” fee to get this interview. Training is listed as provided on the poster. Confirm the role, workplace, and pay with ${EMPLOYER_NAME} before you share documents or travel to Nagercoil.
`.trim();
}

async function upsertJob(
  cityId: string,
  employerId: string,
  role: RoleSeed,
  now: Date,
  validThrough: Date,
): Promise<string> {
  const [existingJob] = await db
    .select({ id: jobPostings.id })
    .from(jobPostings)
    .where(and(eq(jobPostings.cityId, cityId), eq(jobPostings.slug, role.slug)))
    .limit(1);

  const values = {
    employerId,
    cityId,
    slug: role.slug,
    title: role.title,
    body: buildBody(role),
    locationLabel: "Nagercoil",
    status: "open" as const,
    employmentType: null,
    validThrough,
    applicationUrl: waApply(role.roleLabel),
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
    console.log("[seed-job] Refreshed open job:", role.slug);
  } else {
    await db.insert(jobPostings).values({
      ...values,
      publishedAt: now,
      createdAt: now,
    });
    console.log("[seed-job] Inserted open job:", role.slug);
  }

  return role.slug;
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
        websiteUrl: EMPLOYER_SITE,
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
        websiteUrl: EMPLOYER_SITE,
        verified: false,
      })
      .returning({ id: employers.id });
    employerId = ins.id;
    console.log("[seed-job] Inserted employer:", EMPLOYER_SLUG);
  }

  const now = new Date();
  const validThrough = new Date(now);
  validThrough.setDate(validThrough.getDate() + 90);

  const slugs: string[] = [];
  for (const role of ROLES) {
    slugs.push(await upsertJob(city.id, employerId, role, now, validThrough));
  }

  for (const slug of slugs) {
    console.log("[seed-job] Detail:", `/chennai-jobs/${slug}`);
    await finishListingSeedLive({
      jobSlug: slug,
      label: "seed-job-uniqz-nagercoil",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
