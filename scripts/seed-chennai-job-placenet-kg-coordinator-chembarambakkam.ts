/**
 * PlaceNet Consultants — two client-school roles from Maria (+91 90435 50979), 13 Oct 2026.
 * Both roles are at Chembarambakkam, Poonamallee, Chennai 600123. School unnamed.
 * Cab from Mogappair, Iyyappanthangal, and Poonamallee.
 * 1) KG coordinator / Montessori teacher. Pay is a maximum of ₹35,000 only — salary left undisclosed.
 * 2) PGT Computer Science. Salary band ₹35,000–₹40,000 / month. B.Ed. required.
 * The PGT row was first published as t-nagar; this seed moves that slug to Chembarambakkam.
 *
 * Dev:  `npm run db:seed:chennai-job:placenet-kg-chembarambakkam`
 * Live: `npm run db:seed:chennai-job:placenet-kg-chembarambakkam:live`
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

const EMPLOYER_SLUG = "placenet-consultants-chennai";
const JOB_SLUG = "kg-coordinator-montessori-teacher-chembarambakkam-placenet";
const PGT_SLUG = "pgt-computer-science-chembarambakkam-placenet";
const PGT_SLUG_OLD = "pgt-computer-science-t-nagar-placenet";
const APPLY_EMAIL = "mariamerlinhr@gmail.com";

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
        name: "PlaceNet Consultants Pvt. Ltd.",
        websiteUrl: "https://placenet.in/",
        verified: false,
        updatedAt: new Date(),
      })
      .where(eq(employers.id, employerId));
    console.log("[seed-job] Employer exists, refreshed:", EMPLOYER_SLUG);
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "PlaceNet Consultants Pvt. Ltd.",
        slug: EMPLOYER_SLUG,
        websiteUrl: "https://placenet.in/",
        verified: false,
      })
      .returning({ id: employers.id });
    employerId = ins.id;
    console.log("[seed-job] Inserted employer:", EMPLOYER_SLUG);
  }

  const [existingJob] = await db
    .select({ id: jobPostings.id })
    .from(jobPostings)
    .where(
      and(eq(jobPostings.cityId, city.id), eq(jobPostings.slug, JOB_SLUG)),
    )
    .limit(1);

  const now = new Date();
  const validThrough = new Date(now);
  validThrough.setDate(validThrough.getDate() + 60);

  const body = `
**PlaceNet Consultants Pvt. Ltd.** (Virugambakkam) is hiring a **KG coordinator / experienced Montessori-trained teacher** for a **client school** in **Chembarambakkam, Poonamallee, Chennai 600123**. The school name was not shared.

This page is compiled from the recruiter’s note on **13 October 2026**. It is a community listing, not the school’s own careers page. Confirm the campus and pay before you accept.

Also open at the same campus: [PGT — Computer Science](/chennai-jobs/${PGT_SLUG}).

## Role at a glance

- **Position:** KG coordinator / experienced Montessori-trained teacher
- **Experience:** 5–15 years
- **Qualification:** Bachelor’s degree in early childhood education, education, or a related field
- **Pay (as stated):** maximum **₹35,000** per month, fixed. No minimum was given. The recruiter said this maximum is not negotiable, and not to send candidates expecting more than ₹35,000
- **Worksite:** Chembarambakkam, Poonamallee, Chennai 600123 (street and school name not given)
- **Cab:** from **Mogappair**, **Iyyappanthangal**, and **Poonamallee** pickup points

## Key responsibilities

- Prepare age-appropriate lesson plans aligned with the curriculum
- Create a positive and inclusive classroom environment
- Use play-based and interactive teaching methods
- Monitor students’ progress and provide feedback
- Encourage creativity, problem-solving, and teamwork
- Maintain good classroom behaviour and discipline
- Coordinate with teachers, staff, and parents
- Ensure students’ safety and well-being

## Requirements

- 5–15 years of experience in kindergarten / early childhood education
- Montessori training or a relevant early childhood qualification is preferred
- Strong communication and interpersonal skills
- Patience and the ability to handle young learners
- Knowledge of modern teaching methods and digital tools

## Recruiter

- **Consultancy:** PlaceNet Consultants Pvt. Ltd.
- **Contact:** Maria
- **Email:** [${APPLY_EMAIL}](mailto:${APPLY_EMAIL})
- **Phone / WhatsApp:** [90435 50979](tel:+919043550979)
- **Office address given:** 6th Cross Street, Chinmaya Nagar Stage 1, Virugambakkam, Chennai 600092

Public directories also list PlaceNet at **43/3, Kaliamman Koil Street, Sai Nagar, Virugambakkam 600092**. The registered office on company records is **F1, Sai Maheshwari Apartments, 86, 6th Cross Street, Sai Nagar, Virugambakkam 600092**.

## How to apply

Email **Maria** at [${APPLY_EMAIL}](mailto:${APPLY_EMAIL}?subject=KG%20coordinator%20%2F%20Montessori%20teacher%20%E2%80%94%20Chembarambakkam) or WhatsApp **90435 50979**. Mention that you saw the opening on MyChennaiCity jobs, and share your Montessori training, years of experience, and current location.

**Safety note:** Do **not** pay any upfront “registration” or “training” fee to get this interview. The hiring school was not named — ask Maria which campus you will work at, and confirm pay in writing before you accept.
`.trim();

  const values = {
    employerId,
    cityId: city.id,
    slug: JOB_SLUG,
    title:
      "KG coordinator / Montessori teacher — Chembarambakkam · PlaceNet Consultants",
    body,
    locationLabel: "Chembarambakkam, Poonamallee, Chennai 600123",
    status: "open" as const,
    employmentType: null,
    validThrough,
    applicationUrl: `mailto:${APPLY_EMAIL}`,
    salaryDisclosed: false,
    openingsCount: 1,
    remotePolicy: "onsite" as const,
    updatedAt: now,
  };

  if (existingJob) {
    await db
      .update(jobPostings)
      .set(values)
      .where(eq(jobPostings.id, existingJob.id));
    console.log("[seed-job] Refreshed open job:", JOB_SLUG);
  } else {
    await db.insert(jobPostings).values({
      ...values,
      publishedAt: now,
      createdAt: now,
    });
    console.log("[seed-job] Inserted open job:", JOB_SLUG);
  }

  console.log("[seed-job] Done. Detail:", `/chennai-jobs/${JOB_SLUG}`);

  const [pgtAtNewSlug] = await db
    .select({ id: jobPostings.id })
    .from(jobPostings)
    .where(and(eq(jobPostings.cityId, city.id), eq(jobPostings.slug, PGT_SLUG)))
    .limit(1);

  let existingPgt = pgtAtNewSlug;
  if (!existingPgt) {
    const [pgtAtOldSlug] = await db
      .select({ id: jobPostings.id })
      .from(jobPostings)
      .where(
        and(eq(jobPostings.cityId, city.id), eq(jobPostings.slug, PGT_SLUG_OLD)),
      )
      .limit(1);
    existingPgt = pgtAtOldSlug;
  }

  const pgtBody = `
**PlaceNet Consultants Pvt. Ltd.** (Virugambakkam) is hiring a **PGT — Computer Science** for a **client school** in **Chembarambakkam, Poonamallee, Chennai 600123**. The school name was not shared.

This page is compiled from the recruiter’s note on **13 October 2026**. It is a community listing, not the school’s own careers page. Confirm the campus and pay before you accept.

Also open at the same campus: [KG coordinator / Montessori teacher](/chennai-jobs/${JOB_SLUG}).

## Role at a glance

- **Position:** PGT — Computer Science
- **Classes:** Senior secondary, Grades 11 and 12, CBSE curriculum
- **Experience:** 3–5 years in senior secondary classes
- **Qualification:** M.Sc. or M.Tech in Computer Science / IT, or MCA. **B.Ed. is required**
- **Pay (as stated):** **₹35,000 – ₹40,000** per month
- **Worksite:** Chembarambakkam, Poonamallee, Chennai 600123 (street and school name not given)
- **Cab:** from **Mogappair**, **Iyyappanthangal**, and **Poonamallee** pickup points

## Key responsibilities

- Teach Computer Science for Grades 11 and 12 as per the CBSE curriculum
- Prepare lesson plans and conduct practical sessions
- Teach programming languages including Python, Java, C++, HTML, and SQL
- Conduct assignments, tests, and practical assessments
- Organise coding activities, workshops, and competitions
- Stay updated with the latest technology and teaching methodologies
- Coordinate with other faculty members

## Technical skills

Python, Java, C++, data structures, networking, databases, and AI concepts.

**Preferred:** experience in CBSE, ICSE, or IB schools. Knowledge of AI, ML, or cloud technologies is an added advantage.

## Recruiter

- **Consultancy:** PlaceNet Consultants Pvt. Ltd.
- **Contact:** Maria
- **Email:** [${APPLY_EMAIL}](mailto:${APPLY_EMAIL})
- **Phone / WhatsApp:** [90435 50979](tel:+919043550979)
- **Office address given:** 6th Cross Street, Chinmaya Nagar Stage 1, Virugambakkam, Chennai 600092

## How to apply

Email **Maria** at [${APPLY_EMAIL}](mailto:${APPLY_EMAIL}?subject=PGT%20Computer%20Science%20%E2%80%94%20Chembarambakkam) or WhatsApp **90435 50979**. Mention that you saw the opening on MyChennaiCity jobs, and share your degree, B.Ed., senior-secondary years, and the languages you teach.

**Safety note:** Do **not** pay any upfront “registration” or “training” fee to get this interview. The hiring school was not named — ask Maria to confirm the Chembarambakkam campus, and confirm the pay band in writing before you accept.
`.trim();

  const pgtValues = {
    employerId,
    cityId: city.id,
    slug: PGT_SLUG,
    title:
      "PGT Computer Science — Chembarambakkam · PlaceNet Consultants",
    body: pgtBody,
    locationLabel: "Chembarambakkam, Poonamallee, Chennai 600123",
    status: "open" as const,
    employmentType: null,
    validThrough,
    applicationUrl: `mailto:${APPLY_EMAIL}`,
    salaryMin: 35_000,
    salaryMax: 40_000,
    salaryDisclosed: true,
    openingsCount: 1,
    remotePolicy: "onsite" as const,
    updatedAt: now,
  };

  if (existingPgt) {
    await db
      .update(jobPostings)
      .set(pgtValues)
      .where(eq(jobPostings.id, existingPgt.id));
    console.log("[seed-job] Refreshed open job:", PGT_SLUG);
  } else {
    await db.insert(jobPostings).values({
      ...pgtValues,
      publishedAt: now,
      createdAt: now,
    });
    console.log("[seed-job] Inserted open job:", PGT_SLUG);
  }

  console.log("[seed-job] Done. Detail:", `/chennai-jobs/${PGT_SLUG}`);
  await finishListingSeedLive({ jobSlug: JOB_SLUG, label: "seed-job" });
  await finishListingSeedLive({ jobSlug: PGT_SLUG, label: "seed-job" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
