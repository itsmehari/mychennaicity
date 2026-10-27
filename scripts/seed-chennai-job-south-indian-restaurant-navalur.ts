/**
 * South Indian Restaurant (Navalur) — five separate SEO job postings.
 *
 * Flyer: `public/images/listings/south-indian-restaurant-hiring-navalur-2026.png`
 *
 * Dev:  `npm run db:seed:chennai-job:south-indian-restaurant-navalur`
 * Live: `npm run db:seed:chennai-job:south-indian-restaurant-navalur:live`
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

const EMPLOYER_SLUG = "south-indian-restaurant-navalur";
const EMPLOYER_NAME = "South Indian Restaurant";
const LOCATION = "Navalur, Chennai (OMR)";
const PHONE_1 = "81245 37432";
const PHONE_2 = "87549 73833";
const TEL_1 = "tel:+918124537432";
const TEL_2 = "tel:+918754973833";
const FLYER_IMAGE =
  "/images/listings/south-indian-restaurant-hiring-navalur-2026.png";

type RoleSeed = {
  slug: string;
  title: string;
  roleLabel: string;
  salaryLine: string;
  salaryMin: number;
  salaryMax: number;
  duties: string[];
  mustHave: string[];
};

function waApply(roleLabel: string): string {
  return `https://wa.me/918124537432?text=${encodeURIComponent(
    `Hi, I saw the ${roleLabel} opening at South Indian Restaurant (Navalur) on MyChennaiCity and would like to apply. Please share the next step.`,
  )}`;
}

const ROLES: RoleSeed[] = [
  {
    slug: "restaurant-manager-south-indian-restaurant-navalur-chennai",
    title:
      "Restaurant Manager — South Indian Restaurant · Navalur, Chennai",
    roleLabel: "Restaurant Manager",
    salaryLine: "₹25,000 – ₹35,000 per month (as printed on the hiring flyer)",
    salaryMin: 25_000,
    salaryMax: 35_000,
    duties: [
      "Manage day-to-day restaurant operations at the Navalur outlet",
      "Lead the floor and kitchen teams and keep service standards high",
      "Ensure a positive guest experience for dine-in and takeaway",
      "Drive sales, control costs, and report daily performance",
    ],
    mustHave: [
      "Prior restaurant or F&B management experience preferred",
      "Energetic, passionate, and dedicated — ready for onsite shifts in Navalur",
    ],
  },
  {
    slug: "south-indian-chef-navalur-chennai",
    title: "South Indian Chef — Navalur restaurant jobs · Chennai",
    roleLabel: "South Indian Chef",
    salaryLine: "₹25,000 – ₹30,000 per month (as printed on the hiring flyer)",
    salaryMin: 25_000,
    salaryMax: 30_000,
    duties: [
      "Cook authentic South Indian cuisine (idli, dosa, vada, filter coffee, and daily specials)",
      "Run kitchen production and support kitchen management",
      "Maintain hygiene, mise en place, and consistent taste standards",
      "Guide kitchen assistants and keep service timing on track",
    ],
    mustHave: [
      "Hands-on experience in authentic South Indian cooking",
      "Kitchen management exposure preferred",
    ],
  },
  {
    slug: "shift-in-charge-south-indian-restaurant-navalur-chennai",
    title:
      "Shift In-Charge — South Indian Restaurant · Navalur, Chennai",
    roleLabel: "Shift In-Charge",
    salaryLine:
      "₹20,000+ per month based on experience (as printed on the hiring flyer)",
    salaryMin: 20_000,
    salaryMax: 20_000,
    duties: [
      "Handle daily shift operations from open to close",
      "Coordinate the floor and kitchen team during the shift",
      "Ensure service quality and guest recovery when needed",
      "Complete daily reporting for the Restaurant Manager",
    ],
    mustHave: [
      "Restaurant shift leadership or captain / supervisor experience preferred",
      "Comfortable with onsite Navalur shifts and team coordination",
    ],
  },
  {
    slug: "kitchen-assistant-south-indian-restaurant-navalur-chennai",
    title:
      "Kitchen Assistant — South Indian Restaurant · Navalur, Chennai",
    roleLabel: "Kitchen Assistant",
    salaryLine:
      "₹16,000 – ₹20,000 per month based on experience (as printed on the hiring flyer)",
    salaryMin: 16_000,
    salaryMax: 20_000,
    duties: [
      "Assist with food preparation for South Indian breakfast and meals",
      "Support the head chef / South Indian Chef during rush hours",
      "Maintain strict kitchen hygiene and cleaning routines",
      "Help with plating, packing, and stock readiness",
    ],
    mustHave: [
      "Willingness to learn authentic South Indian kitchen workflows",
      "Prior kitchen or pantry support experience is a plus",
    ],
  },
  {
    slug: "team-member-south-indian-restaurant-navalur-chennai",
    title:
      "Restaurant Team Member — South Indian Restaurant · Navalur, Chennai",
    roleLabel: "Team Member",
    salaryLine: "₹15,000 – ₹18,000 per month (as printed on the hiring flyer)",
    salaryMin: 15_000,
    salaryMax: 18_000,
    duties: [
      "Serve guests and support dining-floor operations",
      "Help with cleaning, setup, and closing duties",
      "Provide general kitchen support when needed",
      "Take on other assigned duties as the shift requires",
    ],
    mustHave: [
      "Energetic and guest-friendly attitude",
      "Ready for onsite work in Navalur, Chennai (OMR)",
    ],
  },
];

function buildBody(role: RoleSeed): string {
  const apply = waApply(role.roleLabel);
  return `
![South Indian Restaurant hiring flyer — We Are Hiring, Navalur Chennai](${FLYER_IMAGE})

**${EMPLOYER_NAME}** (*Authentic Taste, True Experience*) is hiring a **${role.roleLabel}** for its **South Indian restaurant in Navalur, Chennai** on the OMR corridor.

This is a dedicated job listing for the **${role.roleLabel}** role — not a combined multi-role post — so candidates searching for **${role.roleLabel.toLowerCase()} jobs in Chennai**, **Navalur restaurant vacancies**, and **South Indian restaurant careers** can find the right opening.

## Role overview

${role.duties.map((d) => `- ${d}`).join("\n")}

## Who should apply

${role.mustHave.map((d) => `- ${d}`).join("\n")}

## Salary

**${role.salaryLine}**. Confirm the final package, incentives, and joining date with the hiring contact.

## Benefits (from the flyer)

- Food & accommodation provided
- Growth opportunities
- Friendly & supportive team environment
- Attractive salary & incentives

## Location

**${LOCATION}** — onsite restaurant role. Ideal for candidates living near Navalur, Sholinganallur, Siruseri, Kelambakkam, or other OMR localities.

## How to apply

Interested? Contact us today — call or WhatsApp and name the **${role.roleLabel}** role:

- **${PHONE_1}** — [WhatsApp](${apply}) or [call](${TEL_1})
- **${PHONE_2}** — [call](${TEL_2})

Be a part of our journey. Grow with us. Mention that you saw the opening on MyChennaiCity jobs.

**Safety note:** Do **not** pay any upfront “registration” or “security” fee to third parties — verify that you are dealing with the real hiring contact on the numbers above.
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
    locationLabel: LOCATION,
    status: "open" as const,
    employmentType: "FULL_TIME",
    validThrough,
    publishedAt: now,
    applicationUrl: waApply(role.roleLabel),
    salaryDisclosed: true,
    salaryMin: role.salaryMin,
    salaryMax: role.salaryMax,
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
  const validThrough = new Date(now);
  validThrough.setDate(validThrough.getDate() + 90);

  const slugs: string[] = [];
  for (const role of ROLES) {
    slugs.push(await upsertJob(city.id, employerId, role, now, validThrough));
  }

  for (const slug of slugs) {
    console.log("[seed-job] Detail:", `/chennai-jobs/${slug}`);
  }

  // Revalidate hub + each detail path for faster Google / sitemap pickup.
  for (const slug of slugs) {
    await finishListingSeedLive({ jobSlug: slug, label: "seed-job" });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
