/**
 * Job seeker: Female computer operator — Velachery, Guindy & South Chennai.
 *
 * Dev:  `npm run db:seed:chennai-job-seeker:female-computer-operator-velachery`
 * Live: `npm run db:seed:chennai-job-seeker:female-computer-operator-velachery:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import { finishListingSeedLive } from "./lib/seed-event-shared";
import * as schema from "../src/db/schema";
import { cities, jobSeekerPosts } from "../src/db/schema/tables";

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

const POST_SLUG = "female-computer-operator-velachery-guindy-south-chennai";

const CONTACT_EMAIL = "thesweetday09@gmail.com";

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

  const [existing] = await db
    .select({ id: jobSeekerPosts.id })
    .from(jobSeekerPosts)
    .where(
      and(eq(jobSeekerPosts.cityId, city.id), eq(jobSeekerPosts.slug, POST_SLUG)),
    )
    .limit(1);

  const now = new Date();

  const body = `**Experienced female computer operator** looking for **back-office / data entry** roles in **Velachery, Guindy, and South Chennai**. **Ready to join immediately.**

## Skills

- **MS Office**
- **Typing**
- **Data Entry**
- **Back office** support

## Preferred areas

**Velachery · Guindy · South Chennai**

## Availability

**Experienced** — can **join immediately**. Open to full-time back-office and computer operator roles.

## Contact

Email **[${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL})** with role details, location, and shift timings. Mention that you saw the listing on MyChennaiCity.

---

## Editorial note

This is a **reader-submitted availability post** published for visibility only. **mychennaicity.in does not verify** identity, past employment, or skills. Meet safely, check references, and agree pay and duties in writing before hiring.

If this listing is outdated or was posted without authorisation, use the site **Contact** page so we can review it.`.trim();

  const values = {
    cityId: city.id,
    slug: POST_SLUG,
    title: "Female computer operator — Velachery, Guindy & South Chennai",
    body,
    seekerLabel: "Computer operator · female",
    locationLabel: "Velachery, Guindy & South Chennai",
    roleSought: "Computer Operator",
    needsAccommodation: false,
    availability: "Immediate",
    contactPhone: null as string | null,
    contactWhatsApp: null as string | null,
    contactEmail: CONTACT_EMAIL,
    status: "open" as const,
    publishedAt: now,
    updatedAt: now,
  };

  if (existing) {
    await db
      .update(jobSeekerPosts)
      .set(values)
      .where(eq(jobSeekerPosts.id, existing.id));
    console.log("[seed-job-seeker] Refreshed post:", POST_SLUG);
  } else {
    await db.insert(jobSeekerPosts).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-job-seeker] Inserted post:", POST_SLUG);
  }

  console.log(
    "[seed-job-seeker] Done. Detail:",
    `/chennai-jobs/looking-for-work/${POST_SLUG}`,
  );
  await finishListingSeedLive({
    jobSeekerSlug: POST_SLUG,
    label: "seed-job-seeker-female-computer-operator",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
