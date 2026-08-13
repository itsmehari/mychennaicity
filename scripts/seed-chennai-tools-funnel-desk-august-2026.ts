/**
 * Tools funnel desk — three short articles linking EB / rent / Metro into compulsive hubs.
 *
 * Dev:  `npm run db:seed:chennai-tools-funnel-desk-august-2026`
 * Live: `npm run db:seed:chennai-tools-funnel-desk-august-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

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

const AC_BILL = "/guides/chennai-ac-bill-predictor";
const EB_SHOCK =
  "/chennai-local-news/tamil-nadu-high-electricity-bills-july-august-2026-tnpdcl-reinspection";
const BILL_CALC =
  "/chennai-local-news/tamil-nadu-electricity-bill-calculation-2026-june-tnpdcl";
const AFFORD = "/guides/chennai-afford-area-calculator";
const SALARY = "/guides/chennai-salary-guide-2026";
const TODAY = "/chennai-today";
const EVENTS = "/chennai-local-events";
const GOLD = "/chennai-gold-rate";
const PETROL_EV = "/guides/chennai-petrol-vs-ev-cost";

type SeedArticle = {
  slug: string;
  title: string;
  summary: string;
  dek: string;
  category: string;
  publishedAt: Date;
  featured: boolean;
  heroImageUrl: string;
  sourceUrl: string;
  sourceName: string;
  reportBody: string;
  analysisBody: string;
  faq: { question: string; answer: string }[];
};

const PACK: SeedArticle[] = [
  {
    slug: "chennai-summer-ac-bill-stress-test-august-2026",
    title:
      "Chennai Summer AC Bills: Run a Stress Test Before the Next Cycle Hits",
    summary:
      "Heat drives longer AC hours — and Tamil Nadu slab cliffs amplify the rupee shock. Use our AC bill predictor with your habits, then cross-check the statewide EB desk.",
    dek: "Consumer desk — habit math + links to the AC predictor and TNPDCL bill explainers.",
    category: "Consumer",
    publishedAt: new Date("2026-08-14T09:00:00.000+05:30"),
    featured: true,
    heroImageUrl:
      "https://imagesvs.oneindia.com/ta/img/2024/03/electr-down-1710300389.jpg",
    sourceUrl: "https://mychennaicity.in/guides/chennai-ac-bill-predictor",
    sourceName: "mychennaicity.in cost desk (illustrative planning tool)",
    reportBody: `## Key takeaways

- Chennai summers stretch **AC hours**; Tamil Nadu **domestic slabs** can turn a moderate unit rise into a sharp bill jump.
- Before you argue with the section office, run a **habit stress test**: how many ACs, tonnage, hours, and days.
- Our **[AC bill predictor](${AC_BILL})** gives a directional units/rupee band — not a TNPDCL invoice.
- Pair it with the **[July–August EB bill shock desk](${EB_SHOCK})** and the **[2026 bill calculation guide](${BILL_CALC})**.

## Disclaimer

This article is **civic journalism** for Chennai households. Figures from the predictor are **illustrative planning numbers**, not official TNPDCL / TANGEDCO assessments. Verify meter units, your printed bill, and the official tariff calculator before you pay or dispute.

## Why habits beat rumour

WhatsApp forwards love “new tariff charts.” Most summer shocks are a mix of **real heat load**, **slab cliffs**, and occasional **meter/billing errors**. Start with your own hours and tonnage, then check the meter delta.

## What to do this week

1. Open the **[AC bill predictor](${AC_BILL})** and enter your setup.
2. Photograph the meter and compare billed units.
3. Read the **[EB shock desk](${EB_SHOCK})** if your July-cycle bill already jumped.
4. Bookmark Minnagam / your circle office before the next bi-monthly cycle.

## Fine print — AI-assisted authoring

This report was prepared with **AI-assisted news authoring** and human editorial review.
AI tools can err — cross-check TNPDCL materials and your physical meter before acting.
`.trim(),
    analysisBody: `## How this fits the city tools desk

The AC predictor sits in our cost cluster next to **[petrol vs EV](${PETROL_EV})** and the **[afford-this-area calculator](${AFFORD})**. Use tools for personal math; use news desks for what the utility and government actually said.
`.trim(),
    faq: [
      {
        question: "Is the AC bill predictor my official bill?",
        answer:
          "No. It estimates directional units and a rough rupee band from habits. Use TNPDCL’s calculator and your meter for the real assessment.",
      },
      {
        question: "Why do summer bills jump without a tariff hike?",
        answer:
          "Longer AC hours raise units; slab tariffs can amplify rupees. Separate meter faults still happen — check both.",
      },
    ],
  },
  {
    slug: "chennai-rent-vs-ctc-adyar-omr-august-2026",
    title:
      "Can You Afford Adyar — or Should You Look at Velachery and OMR? A CTC Reality Check",
    summary:
      "Directional 2026 rent bands meet take-home math. Use the afford-this-area calculator before you WhatsApp a broker — then sanity-check offers on the salary guide.",
    dek: "Housing desk — rent share of take-home for Adyar, Besant Nagar, Velachery, OMR and more.",
    category: "Consumer",
    publishedAt: new Date("2026-08-14T10:00:00.000+05:30"),
    featured: true,
    heroImageUrl: "/images/explore-chennai-madras-high-court.jpg",
    sourceUrl: "https://mychennaicity.in/guides/chennai-afford-area-calculator",
    sourceName: "mychennaicity.in housing cost desk (illustrative 2026 bands)",
    reportBody: `## Key takeaways

- Chennai rent talks stall when people compare **CTC** to **Adyar mid rents** without converting to take-home.
- Our **[afford-this-area calculator](${AFFORD})** maps take-home (or rough CTC→take-home) against directional 2BHK-ish mids for Adyar, Besant Nagar, Velachery, OMR, Anna Nagar, Porur and Tambaram.
- Cross-check role pay on the **[salary guide 2026](${SALARY})** and browse **[Chennai jobs](/chennai-jobs)** before you stretch.

## Disclaimer

This article is **civic / consumer journalism**. Rent bands are **illustrative 2026 planning figures**, not listings or promises. Building age, parking, and society rules swing offers. Not financial advice.

## A simple rule of thumb

Many households aim to keep rent near or under ~**30%** of take-home, then budget commute and school fees. The calculator labels stretch / ok / comfortable so you can share a clear verdict in the family WhatsApp.

## Related tools

- **[Afford this area](${AFFORD})**
- **[Salary guide 2026](${SALARY})**
- **[Moved to Chennai checklist](/guides/moved-to-chennai-checklist)**
- **[Adyar–Thiruvanmiyur area hub](/areas/adyar-thiruvanmiyur)**

## Fine print — AI-assisted authoring

Drafted with **AI-assisted authoring** and human review. AI can miss local nuance — verify rents with brokers, owners, and your payslip.
`.trim(),
    analysisBody: `## Why this desk exists

Housing FOMO is expensive. Pair personal math with corridor notes instead of arguing from a single “Adyar average” screenshot.
`.trim(),
    faq: [
      {
        question: "Should I use CTC or take-home?",
        answer:
          "Prefer monthly take-home. If you only know CTC, the calculator applies a rough conversion you can edit.",
      },
      {
        question: "Are the rent numbers listings?",
        answer:
          "No — directional mid bands for planning conversations. Actual asks vary widely.",
      },
    ],
  },
  {
    slug: "chennai-today-60-seconds-metro-morning-desk-august-2026",
    title:
      "Start the Day with Chennai Today in 60 Seconds — Metro, News, and What’s On",
    summary:
      "A morning WhatsApp card: weather cue, Metro note, one news headline, one upcoming event. Open Chennai today, copy, and forward — then dig into events or gold if you need more.",
    dek: "Mobility & city desk — habit loop for the commute WhatsApp group.",
    category: "Mobility",
    publishedAt: new Date("2026-08-14T11:00:00.000+05:30"),
    featured: false,
    heroImageUrl:
      "/images/articles/chennai-metro-nilgiri-tbm-moolakadai-breakthrough-2026.jpg",
    sourceUrl: "https://mychennaicity.in/chennai-today",
    sourceName: "mychennaicity.in daily desk",
    reportBody: `## Key takeaways

- **[Chennai today in 60 seconds](${TODAY})** packs weather, a Metro note, one news cue, and one upcoming event into a single shareable card.
- Phase 2 works keep reshaping road diversions near station boxes — leave buffer time; the today card reminds you without a dashboard dump.
- Dig deeper on **[local events](${EVENTS})**, **[gold rate](${GOLD})**, or **[petrol vs EV](${PETROL_EV})** after you forward the morning note.

## Disclaimer

This article explains our daily desk product. Weather and listings refresh when the page loads; we do **not** invent live GCC feeder or flood alerts. For emergencies, use official channels.

## How to use it

1. Open **[Chennai today](${TODAY})** each morning.
2. Tap **Copy for WhatsApp**.
3. If the news cue matters, open the linked article; if the event fits, open the listing.

## Fine print — AI-assisted authoring

Prepared with **AI-assisted authoring** and human review. Cross-check CMRL / IMD / organisers for time-critical decisions.
`.trim(),
    analysisBody: `## Habit loops beat doomscrolling

City groups drown in forwards. A 60-second card with a live link back to mychennaicity.in beats another unverified screenshot.
`.trim(),
    faq: [
      {
        question: "Is Chennai today a live alert service?",
        answer:
          "No. It is an editorial morning card with weather, Metro context, and links to published news and events.",
      },
      {
        question: "Can I forward it on WhatsApp?",
        answer:
          "Yes — use Copy for WhatsApp on the page so friends open the latest card.",
      },
    ],
  },
];

async function upsertArticle(
  cityId: string,
  article: SeedArticle,
  now: Date,
) {
  const body = `${article.reportBody}\n\n---\n\n${article.analysisBody}`;
  const [existing] = await db
    .select({ id: articles.id })
    .from(articles)
    .where(and(eq(articles.cityId, cityId), eq(articles.slug, article.slug)))
    .limit(1);

  const values = {
    cityId,
    slug: article.slug,
    title: article.title,
    summary: article.summary,
    dek: article.dek,
    body,
    reportBody: article.reportBody,
    analysisBody: article.analysisBody,
    category: article.category,
    status: "published" as const,
    publishedAt: article.publishedAt,
    featured: article.featured,
    heroImageUrl: article.heroImageUrl,
    sourceUrl: article.sourceUrl,
    sourceName: article.sourceName,
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: article.faq,
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-tools-funnel] Refreshed:", article.slug);
  } else {
    await db.insert(articles).values({ ...values, createdAt: now });
    console.log("[seed-tools-funnel] Inserted:", article.slug);
  }

  console.log(
    "[seed-tools-funnel] URL:",
    `https://mychennaicity.in/chennai-local-news/${article.slug}`,
  );

  if (live) {
    await revalidateNewsAfterSeed({
      slug: article.slug,
      label: "seed-tools-funnel",
    });
  }
}

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

  const now = new Date();
  for (const article of PACK) {
    await upsertArticle(city.id, article, now);
  }
  console.log("[seed-tools-funnel] Done.", PACK.length, "articles");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
