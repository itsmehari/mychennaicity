/**
 * Classified ad: open contractor — Auxsyon Innovative Education Project (TN & Puducherry).
 *
 * Dev:  `npm run db:seed:auxsyon-open-contractor-education-project`
 * Live: `npm run db:seed:auxsyon-open-contractor-education-project:live` — uses `.env.production.local` only
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { cities, classifiedListings } from "../src/db/schema/tables";
import { finishListingSeedLive } from "./lib/seed-event-shared";

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
      : "DATABASE_URL missing — add to .env.local or secrets/database.local.env",
  );
  process.exit(1);
}

const db = drizzle(neon(url), { schema });

const SLUG = "auxsyon-open-contractor-education-project-tamil-nadu";

const POSTER_NAME = "Auxsyon Tech Pvt. Ltd.";
const POSTER_URL = "https://www.auxsyon.com/Auxsyonedu.php";
const PHONE = "9043021807";
const PHONE_DISPLAY = "90430 21807";
const PHONE_TEL = "tel:+919043021807";
const APPLY_URL = "https://lnkd.in/gKg2mz9w";
const EMAIL_RAMYA = "ramya@auxsyon.com";
const EMAIL_SIVARANI = "sivarani@auxsyon.com";

async function main() {
  const [city] = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, "chennai"))
    .limit(1);

  if (!city) {
    console.error("City slug 'chennai' not found. Run db:seed or create city first.");
    process.exit(1);
  }

  const now = new Date();
  const expiresAt = new Date(now);
  expiresAt.setDate(expiresAt.getDate() + 90);

  const body = `## Open contractor opportunity — Innovative Education Project

**${POSTER_NAME}** is inviting **contractors**, **institutions**, **agencies**, and **educational partners** to collaborate on an ongoing **Innovative Education Project** across **Tamil Nadu** and **Puducherry**.

Contractor openings are available **district-wise**. Limited slots; commercial collaboration for project execution only.

### Project objectives
- **Student identification and selection**
- **Educational outreach and awareness**
- **School and institution collaboration**
- **Project implementation support**

### Who should apply
Organizations and professionals with strong educational networks and hands-on project execution experience.

### Apply
**[Apply online (LinkedIn)](${APPLY_URL})**

### Contact
- **Phone:** [${PHONE_DISPLAY}](${PHONE_TEL})
- **Email:** [${EMAIL_RAMYA}](mailto:${EMAIL_RAMYA}) · [${EMAIL_SIVARANI}](mailto:${EMAIL_SIVARANI})
- **Project page:** [auxsyon.com](${POSTER_URL})

*Commercial purpose only. Confirm scope, district coverage, and terms directly with Auxsyon before you commit.*`.trim();

  const values = {
    cityId: city.id,
    slug: SLUG,
    title:
      "Open contractor: Auxsyon education project — Tamil Nadu & Puducherry",
    body,
    category: "partnership",
    posterName: POSTER_NAME,
    posterUrl: POSTER_URL,
    locationLabel: "Tamil Nadu & Puducherry (district-wise)",
    contactPhone: PHONE,
    areaHubSlug: null,
    status: "open" as const,
    publishedAt: now,
    expiresAt,
    updatedAt: now,
  };

  const [existing] = await db
    .select({ id: classifiedListings.id })
    .from(classifiedListings)
    .where(
      and(eq(classifiedListings.cityId, city.id), eq(classifiedListings.slug, SLUG)),
    )
    .limit(1);

  if (existing) {
    await db
      .update(classifiedListings)
      .set(values)
      .where(eq(classifiedListings.id, existing.id));
    console.log("[seed-classified] Refreshed listing:", SLUG);
  } else {
    await db.insert(classifiedListings).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-classified] Inserted listing:", SLUG);
  }

  console.log("[seed-classified] Public URL:", `/chennai-classifieds/${SLUG}`);

  await finishListingSeedLive({
    classifiedSlug: SLUG,
    label: "seed-auxsyon-open-contractor-education-project",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
