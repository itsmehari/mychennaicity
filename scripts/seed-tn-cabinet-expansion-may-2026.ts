/**
 * Tamil Nadu cabinet expansion — 35 ministers (Lok Bhavan PR 40, 21 May 2026).
 *
 * Dev:  `npm run db:seed:tn-cabinet-expansion-may-2026`
 * Live: `npm run db:seed:tn-cabinet-expansion-may-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const HERO_IMAGE_URL =
  "/images/articles/tamil-nadu-cabinet-portfolios-hero.jpg";

const GOVERNMENT_HUB = "/guides/tn-council-of-ministers";
const PR40_PDF =
  "/documents/tn-council-of-ministers-may-2026/lok-bhavan-press-release-no-40-21-05-2026.pdf";
const SOURCE_URL = `https://mychennaicity.in${PR40_PDF}`;
const MAY16_ARTICLE = "/chennai-local-news/tamil-nadu-cabinet-portfolios-may-2026";

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

const SLUG = "tamil-nadu-cabinet-expansion-35-ministers-may-2026";

async function main() {
  const [city] = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, "chennai"))
    .limit(1);

  if (!city) {
    console.error("City slug 'chennai' not found.");
    process.exit(1);
  }

  const publishedAt = new Date("2026-05-21T12:00:00.000+05:30");
  const now = new Date();

  const reportBody = `## What was announced

Chennai, **21 May 2026** — Chief Minister **C. Joseph Vijay** expanded the Tamil Nadu Council of Ministers to **35** and reshuffled several portfolios, according to **Lok Bhavan Press Release No. 40 dated 21.05.2026**. Twenty-three ministers were newly inducted; the Governor approved the Chief Minister's recommendations.

**Living roster on this site:** [Tamil Nadu Council of Ministers desk](${GOVERNMENT_HUB}) — searchable table of all 35 ministers.

**Official source:** [Download Lok Bhavan Press Release No. 40 (PDF)](${SOURCE_URL})

**Earlier event:** [First portfolio allocation, 16 May (PR 38)](${MAY16_ARTICLE}) — about a dozen ministers before this expansion.

## Notable reshuffles

- **Finance** moved from **K.A. Sengottaiyan** to **Dr N. Marie Wilson** (Finance, Planning & Development).
- **K.A. Sengottaiyan** is now **Revenue and Disaster Management** minister.
- **Dr Kumar R** heads a new dedicated **Artificial Intelligence, IT and Digital Services** ministry.
- Chief Minister **retained** Home, Police, Municipal Administration and Urban Water Supply; **Women Welfare** moved to **Tmt Jagadeshwari K**.

## Full roster

See the [government desk](${GOVERNMENT_HUB}) for the complete list with portfolios, Chennai relevance notes, and department lookup.`.trim();

  const analysisBody = `## What this means in Chennai

A **35-minister cabinet** spreads sector accountability across named ministers while keeping **urban water, municipal administration, Home and Police** with the Chief Minister.

**Chennai desks to bookmark on mychennaicity.in:**

- [Chennai — who handles what](${GOVERNMENT_HUB}/chennai) — GCC, CMDA, TANGEDCO, MTC, TNPCB
- [Department lookup](${GOVERNMENT_HUB}/departments) — search any portfolio keyword
- [IAS leadership shelf](${GOVERNMENT_HUB}/ias-leadership) — cadre reshuffle reporting

**Editorial read:** The May 21 expansion is the authoritative roster for the Vijay government's first phase. Track execution through minister actions in our [Politics topic desk](/chennai-local-news/topic/politics).`.trim();

  const body = `${reportBody}\n\n---\n\n${analysisBody}`;

  const [existing] = await db
    .select({ id: articles.id })
    .from(articles)
    .where(and(eq(articles.cityId, city.id), eq(articles.slug, SLUG)))
    .limit(1);

  const values = {
    cityId: city.id,
    slug: SLUG,
    title:
      "Tamil Nadu cabinet expands to 35 ministers — Finance, AI ministry and portfolio reshuffle",
    summary:
      "Lok Bhavan Press Release No. 40 — 23 new ministers sworn in; Marie Wilson gets Finance; Sengottaiyan moves to Revenue; dedicated AI portfolio for Dr Kumar R.",
    dek: "State desk — full roster on the Council of Ministers guide.",
    body,
    reportBody,
    analysisBody,
    category: "Politics",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: SOURCE_URL,
    sourceName: "Lok Bhavan, Tamil Nadu — Press Release No. 40 (21.05.2026, PDF)",
    interactiveJson: {
      type: "checklist",
      title: "Five portfolios to watch after expansion",
      items: [
        { id: "finance", label: "Finance — Dr N. Marie Wilson (budget room)" },
        { id: "ai", label: "AI / IT — Dr Kumar R (e-governance)" },
        { id: "revenue", label: "Revenue & disaster — K.A. Sengottaiyan" },
        { id: "urban", label: "CMDA / housing — B. Rajkumar" },
        { id: "cm-urban", label: "CM — municipal admin & urban water" },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-tn-cabinet-expansion] Refreshed:", SLUG);
  } else {
    await db.insert(articles).values({ ...values, createdAt: now });
    console.log("[seed-tn-cabinet-expansion] Inserted:", SLUG);
  }

  console.log("[seed-tn-cabinet-expansion] URL:", `/chennai-local-news/${SLUG}`);
  console.log("[seed-tn-cabinet-expansion] Hub:", GOVERNMENT_HUB);

  if (live) {
    await revalidateNewsAfterSeed({ slug: SLUG, label: "seed-tn-cabinet-expansion" });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
