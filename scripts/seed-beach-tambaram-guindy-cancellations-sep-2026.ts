/**
 * Beach–Tambaram late-night EMU cancellations, Guindy block, Sep–Oct 2026.
 *
 * Dev:  `npm run db:seed:beach-tambaram-guindy-cancellations-sep-2026`
 * Live: `npm run db:seed:beach-tambaram-guindy-cancellations-sep-2026:live`
 *
 * The public page is a special article. The photo is embedded as Base64 in
 * `src/content/news/southern-railway-tambaram-fast-emu.base64.ts`.
 * `heroImageUrl` stays a site path so Open Graph has a fetchable image.
 *
 * Do not name other news outlets in the copy. The list is the Chennai Division notice.
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";
import {
  BEACH_TAMBARAM_CANCELLATIONS_DEK,
  BEACH_TAMBARAM_CANCELLATIONS_H1,
  BEACH_TAMBARAM_CANCELLATIONS_SLUG,
  BEACH_TAMBARAM_CANCELLATIONS_SUMMARY,
  FAQ_ITEMS,
} from "../src/content/special-articles/beach-tambaram-guindy-cancellations-2026";

const HERO = "/images/articles/southern-railway-tambaram-fast-emu-078354.jpg";
const SR = "https://sr.indianrailways.gov.in/";

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

  /** 27 Sep 2026, morning IST */
  const publishedAt = new Date("2026-09-27T04:50:00.000Z");
  const now = new Date();

  const reportBody = `## Disclaimer

This is a MyChennaiCity commute desk report drawn from the Southern Railway Chennai Division cancellation list for maintenance at Guindy. It is not an official railway circular. Trains can be restored, held or retimed after publication. Confirm at the station before you travel.

## Summary

**Chennai, 27 September 2026** — Late-night passengers on the Beach–Tambaram line have selected EMU cancellations while Southern Railway carries out an engineering block at Guindy railway station. The block is 12:15 a.m. to 2:45 a.m. from 27 September through 4 October 2026. The cancellations are not the same train every night.

## Which trains are cancelled?

- **11:59 p.m. Chennai Beach → Tambaram** — cancelled 26 September through 3 October.
- **8:45 p.m. Tambaram → Chennai Beach** — cancelled on 26, 28, 29 and 30 September and on 1, 2 and 3 October. Not in the list for 27 September.
- **11:40 p.m. Tambaram → Chennai Beach** — cancelled on 27 September only.

On Sunday 27 September the cancelled trains in this list are the 11:40 p.m. from Tambaram and the 11:59 p.m. from Beach.

## At a glance

- Maintenance location: Guindy railway station
- Engineering block: 12:15 a.m.–2:45 a.m.
- Block dates: 27 September–4 October 2026
- Corridor: Chennai Beach–Tambaram
- Most affected train: 11:59 p.m. Beach–Tambaram

## Fine print

This report was prepared with AI-assisted drafting and human editorial review. AI tools can err. Cross-check the train, the date and the station announcement with Southern Railway before you act. The photograph shows suburban unit 078354 with a Tambaram Fast board. It illustrates the corridor. It is not a picture of one cancelled working, and the station name is not printed in the frame.`;

  const analysisBody = `## Before you leave

Match the Chennai Division list to the date you are travelling. The three named trains do not share one set of nights. If you change to Metro, an MTC bus or a road vehicle, leave extra time. The published Guindy window ends at 2:45 a.m. on 4 October. That clock is not a notice that every local is back.

Southern Railway: ${SR}`;

  const body = `${reportBody}\n\n---\n\n${analysisBody}`;

  const [existing] = await db
    .select({ id: articles.id })
    .from(articles)
    .where(
      and(eq(articles.cityId, city.id), eq(articles.slug, BEACH_TAMBARAM_CANCELLATIONS_SLUG)),
    )
    .limit(1);

  const values = {
    cityId: city.id,
    slug: BEACH_TAMBARAM_CANCELLATIONS_SLUG,
    title: BEACH_TAMBARAM_CANCELLATIONS_H1,
    summary: BEACH_TAMBARAM_CANCELLATIONS_SUMMARY,
    dek: BEACH_TAMBARAM_CANCELLATIONS_DEK,
    body,
    reportBody,
    analysisBody,
    category: "Mobility",
    areaHubSlug: "saidapet-guindy-alandur",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO,
    sourceUrl: SR,
    sourceName: "Southern Railway, Chennai Division",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: FAQ_ITEMS.map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-beach-tambaram] Refreshed article:", BEACH_TAMBARAM_CANCELLATIONS_SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-beach-tambaram] Inserted article:", BEACH_TAMBARAM_CANCELLATIONS_SLUG);
  }

  console.log(
    "[seed-beach-tambaram] Public URL:",
    `https://mychennaicity.in/chennai-local-news/${BEACH_TAMBARAM_CANCELLATIONS_SLUG}`,
  );

  if (live) {
    await revalidateNewsAfterSeed({
      slug: BEACH_TAMBARAM_CANCELLATIONS_SLUG,
      label: "seed-beach-tambaram",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
