/**
 * Mentory Solutions (Mentry trainer network) — two urgent Chennai trainer roles
 * from the September 2026 hiring flyer. Separate JobPosting slugs per role.
 *
 * Flyer: `public/images/listings/mentory-solutions-trainer-requirement-chennai-september-2026.jpg`
 *
 * Dev:  `npm run db:seed:chennai-job:mentory-solutions-trainers`
 * Live: `npm run db:seed:chennai-job:mentory-solutions-trainers:live`
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

const EMPLOYER_SLUG = "mentory-solutions-chennai";
const EMPLOYER_NAME = "Mentory Solutions";
const PHONE_1 = "93459 99620";
const PHONE_2 = "93615 33079";
const TEL_1 = "tel:+919345999620";
const TEL_2 = "tel:+919361533079";
const FLYER_IMAGE =
  "/images/listings/mentory-solutions-trainer-requirement-chennai-september-2026.jpg";
const MENTRY_PUBLIC_ADS =
  "https://bebee.com/in/companies/mentry/jobs";

type RoleSeed = {
  slug: string;
  title: string;
  roleLabel: string;
  locationLabel: string;
  openingsCount: number;
  startDate: string;
  classHours: string;
  duration: string;
  extraMustHave: string[];
  extraDuties: string[];
  relatedSlug: string;
  relatedLabel: string;
};

function waApply(roleLabel: string): string {
  return `https://wa.me/919345999620?text=${encodeURIComponent(
    `Hi, I saw the ${roleLabel} opening (Mentory Solutions / Chennai trainer network) on MyChennaiCity. Sharing my profile, current location, and availability.`,
  )}`;
}

const ROLES: RoleSeed[] = [
  {
    slug: "java-full-stack-trainer-mentory-broadway-chennai",
    title:
      "Java Full Stack Trainer — Mentory Solutions · Broadway, Chennai",
    roleLabel: "Java Full Stack Trainer",
    locationLabel: "Broadway, Chennai (George Town / North Chennai)",
    openingsCount: 1,
    startDate: "Tuesday, 15 September 2026",
    classHours: "3–4 hours per day",
    duration: "3–4 months",
    extraMustHave: [
      "The flyer asks for **1 female trainer** for this Broadway Java batch (as printed)",
      "Comfort teaching Java full-stack software / developer topics to students (core Java plus typical web stack)",
    ],
    extraDuties: [
      "Deliver classroom Java full-stack software developer training at the Broadway, Chennai site",
      "Shape beginner-to-job-ready sessions (the flyer tagline is “Shape Future Developers”)",
    ],
    relatedSlug: "c-programming-trainer-mentory-mahabalipuram-chennai",
    relatedLabel: "C Programming Trainer · Mahabalipuram",
  },
  {
    slug: "c-programming-trainer-mentory-mahabalipuram-chennai",
    title:
      "C Programming Trainer — Mentory Solutions · Mahabalipuram, Chennai",
    roleLabel: "C Programming Trainer",
    locationLabel: "Mahabalipuram (Mamallapuram), Chennai / ECR",
    openingsCount: 3,
    startDate: "Wednesday, 16 September 2026",
    classHours: "3–4 hours per day",
    duration: "3 months",
    extraMustHave: [
      "Comfort teaching C programming fundamentals to software students (syntax, logic, and basic development practice)",
      "Ready to travel to / stay near **Mahabalipuram (Mamallapuram)** for the batch",
    ],
    extraDuties: [
      "Deliver classroom C programming training at the Mahabalipuram site (three trainer seats on the flyer)",
      "Build strong foundations in programming logic for the assigned student batch",
    ],
    relatedSlug: "java-full-stack-trainer-mentory-broadway-chennai",
    relatedLabel: "Java Full Stack Trainer · Broadway",
  },
];

function buildBody(role: RoleSeed): string {
  const apply = waApply(role.roleLabel);
  return `
**${EMPLOYER_NAME}** (trainer network & professional training services, as printed) is hiring a **${role.roleLabel}** for an onsite classroom batch in Chennai. Public job boards list the same WhatsApp desk as **Mentry**, a freelance technical-trainer network that staffs colleges, universities, institutes, and corporate programmes.

This is a dedicated listing for the **${role.roleLabel}** role — not a combined multi-role post.

![Mentory Solutions urgent trainer requirement flyer — Java Full Stack at Broadway and C Programming at Mahabalipuram, Chennai, September 2026](${FLYER_IMAGE})

## Role at a glance

- **Start:** ${role.startDate} (as printed)
- **Class duration:** ${role.classHours}
- **Assignment length:** ${role.duration}
- **Openings:** ${role.openingsCount}
- **Work mode:** Onsite classroom (not remote)
- **Who can apply:** Freshers are welcome; **local Chennai candidates are preferred**

## What you will do

${role.extraDuties.map((d) => `- ${d}`).join("\n")}
- Run daily sessions in the printed 3–4 hour window and keep the batch on the assignment calendar
- Share an updated profile / résumé, current location, and availability when you apply

## Who should apply

${role.extraMustHave.map((d) => `- ${d}`).join("\n")}
- Freshers can also apply (printed on this flyer — unlike some older Mentry network ads that asked for 2–4 years)
- Local Chennai / nearby candidates preferred

## Pay

This flyer does **not** print a salary. Separate public trainer-network ads from the same WhatsApp number ([Mentry listings on BeBee](${MENTRY_PUBLIC_ADS})) have quoted about **₹1,000–₹2,500 per day** for freelance technical trainers in Chennai, depending on technology, duration, and experience. Treat that as a **network range from other ads**, not a guarantee for this Broadway / Mahabalipuram batch. Confirm pay on WhatsApp before you travel.

## Location

**${role.locationLabel}**. Confirm the exact campus / hall with the recruiter — the flyer names the locality only.

Sister opening from the same flyer: [${role.relatedLabel}](/chennai-jobs/${role.relatedSlug}).

## How to apply

WhatsApp or call and name the **${role.roleLabel}** role. Send your **updated profile / résumé, current location, and availability**:

- **${PHONE_1}** — [WhatsApp](${apply}) or [call](${TEL_1})
- **${PHONE_2}** — [call](${TEL_2}) (same number appears on public Mentry trainer ads)

Mention that you saw the opening on MyChennaiCity jobs.

**Safety note:** Do **not** pay any upfront “registration” or “security” fee to third parties — verify that you are dealing with the hiring contact on the numbers above.

This listing is compiled from the hiring flyer plus public Mentry trainer-network ads that share WhatsApp **${PHONE_2}**. It is not an official company careers page. Confirm start date, hall, batch size, and pay before you go.
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
    locationLabel: role.locationLabel,
    status: "open" as const,
    employmentType: "CONTRACTOR",
    validThrough,
    publishedAt: now,
    applicationUrl: waApply(role.roleLabel),
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
    console.log("[seed-job] Refreshed open job:", role.slug);
  } else {
    await db.insert(jobPostings).values({
      ...values,
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
        websiteUrl: null,
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
        verified: false,
      })
      .returning({ id: employers.id });
    employerId = ins.id;
    console.log("[seed-job] Inserted employer:", EMPLOYER_SLUG);
  }

  const now = new Date();
  const validThrough = istToUtcDate(2026, 10, 17, 23, 59);

  const slugs: string[] = [];
  for (const role of ROLES) {
    slugs.push(await upsertJob(city.id, employerId, role, now, validThrough));
  }

  for (const slug of slugs) {
    console.log("[seed-job] Detail:", `/chennai-jobs/${slug}`);
  }

  for (const slug of slugs) {
    await finishListingSeedLive({ jobSlug: slug, label: "seed-job-mentory-trainers" });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
