/**
 * Job seeker: Watchman / Caretaker with family accommodation — Chennai.
 *
 * Dev:  `npm run db:seed:chennai-job-seeker:watchman-family-accommodation`
 * Live: `npm run db:seed:chennai-job-seeker:watchman-family-accommodation:live`
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

const POST_SLUG = "watchman-caretaker-family-accommodation-chennai";

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

  const body = `
**Urgently looking for a Watchman / Caretaker job in Chennai** with **family accommodation** (staying facility). He will be staying with his **wife and one child**.

## What he can do

- **Watchman / security** duties
- **Building cleaning and maintenance**
- **Apartment premises** care — responsible day-to-day upkeep
- **Honest, hardworking**, and reliable

## What he needs

- **Family stay** on or near the premises (wife + one child)
- **Individual apartment or residential building** with accommodation preferred
- **Ready to join immediately**

## For employers & references

If you have a vacancy or can help with a reference, please reach out via the **Contact → Jobs** form on this site and mention this listing (**watchman with family accommodation**). We will connect you with the family.

---

## Editorial note

This is a **reader-submitted availability post** published for visibility only. **mychennaicity.in does not verify** identity, past employment, or accommodation needs. Meet safely, check references, and agree pay and duties in writing before hiring.

If this listing is outdated or was posted without authorisation, use the site **Contact** page so we can review it.
`.trim();

  const values = {
    cityId: city.id,
    slug: POST_SLUG,
    title: "Watchman / caretaker with family — needs stay, Chennai",
    body,
    seekerLabel: "Watchman · family of 3",
    locationLabel: "Chennai (any area with accommodation)",
    roleSought: "Watchman / Caretaker",
    needsAccommodation: true,
    availability: "Immediate",
    contactPhone: null as string | null,
    contactWhatsApp: null as string | null,
    contactEmail: null as string | null,
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
    label: "seed-job-seeker-watchman",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
