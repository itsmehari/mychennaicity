/**
 * Tamil Nadu IAS follow-up — G. Prakash ↔ S. Malarvizhi swap (Archives / Revenue).
 * G.O. (Rt.) No. 2892, Public (Special-A), dated 07.08.2026.
 *
 * Dev:  `npm run db:seed:tn-ias-prakash-malarvizhi-august-2026`
 * Live: `npm run db:seed:tn-ias-prakash-malarvizhi-august-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const HERO_IMAGE_URL = "/images/articles/tamil-nadu-cabinet-portfolios-hero.jpg";

const OFFICIAL_GO_SCAN =
  "/documents/tn-ias-prakash-malarvizhi-go-rt-2892-07-08-2026.png";
const SOURCE_URL = `https://mychennaicity.in${OFFICIAL_GO_SCAN}`;

const MAY_RESHUFFLE_PATH =
  "/chennai-local-news/tamil-nadu-ias-reshuffle-collectors-may-2026";
const JULY_RESHUFFLE_PATH =
  "/chennai-local-news/yet-another-tamil-nadu-ias-reshuffle-july-2026";
const CABINET_PATH =
  "/chennai-local-news/tamil-nadu-cabinet-portfolios-may-2026";
const GO_PORTAL_PATH =
  "/chennai-local-news/tamil-nadu-government-order-portal-outdated-missing-gos-transparency-july-2026";

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

export const SLUG =
  "tamil-nadu-ias-prakash-malarvizhi-archives-revenue-swap-august-2026";

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

  /** Chennai, 8 August 2026 — day after G.O. (IST). */
  const publishedAt = new Date("2026-08-08T18:30:00.000+05:30");
  const now = new Date();

  const reportBody = `## Key takeaways

- Tamil Nadu has ordered a **targeted two-officer IAS swap** under **G.O. (Rt.) No. 2892**, Public (Special-A) Department, dated **07 August 2026** — a follow-up to our **[May collector reshuffle](${MAY_RESHUFFLE_PATH})** and **[July senior leadership desk](${JULY_RESHUFFLE_PATH})**.
- **Thiru G. Prakash, IAS**, moves from **Principal Secretary / Additional Commissioner of Revenue Administration** to **Principal Secretary / Commissioner, Tamil Nadu Archives and Historical Research**.
- **Tmt. S. Malarvizhi, IAS**, moves from **Commissioner, Tamil Nadu Archives and Historical Research** to **Additional Commissioner of Revenue Administration**, Commissionerate of Revenue Administration and Disaster Management.
- The government **created two temporary cadre posts for one year** to enable the exchange, with pay/status equivalence under the IAS (Pay) Rules, 2016.
- **Official scan:** [G.O. (Rt.) No. 2892 — 07.08.2026 (image)](${SOURCE_URL}).

## Disclaimer

This article is **civic journalism** for public-interest information. It summarises a **Tamil Nadu Government Order** (Public Special-A) available to us at the time of writing. It is **not** an official Secretariat communication, cadre circular, or joining-report notice.

Postings, joining dates and temporary-post extensions can change after publication. Verify any career, RTI or administrative action against the **original G.O.** and subsequent orders before relying on this desk note.

## Fact box

| Item | Detail |
|------|--------|
| **Order** | G.O. (Rt.) No. **2892** |
| **Department** | Public (Special-A) |
| **Date** | **07.08.2026** (Aadi 22, Thiruvalluvar Aandu 2057) |
| **Legal basis** | Rule 4(2), IAS (Cadre) Rules, 1954; Rule 12(1), IAS (Pay) Rules, 2016 |
| **Officers** | Thiru **G. Prakash**, IAS · Tmt. **S. Malarvizhi**, IAS |
| **Nature** | Direct post swap + temporary cadre posts (one year) |
| **Earlier MCC desks** | [May 2026 collectors](${MAY_RESHUFFLE_PATH}) · [July 2026 secretaries](${JULY_RESHUFFLE_PATH}) |

## What was ordered

**Chennai, 8 August 2026** — After the broad **[May 2026](${MAY_RESHUFFLE_PATH})** and **[July 2026](${JULY_RESHUFFLE_PATH})** IAS moves, the state has notified a **narrower follow-up**: a straight exchange between Archives leadership and the Revenue Administration / Disaster Management commissionerate.

Under paragraph 3 of the order, the Governor’s notification transfers and posts the two officers as follows:

| Officer | From | To |
|---------|------|-----|
| **Thiru G. Prakash, IAS** | Principal Secretary / Additional Commissioner of Revenue Administration, Commissionerate of Revenue Administration and Disaster Management | **Principal Secretary / Commissioner, Tamil Nadu Archives and Historical Research** *(vice Tmt. S. Malarvizhi, IAS)* |
| **Tmt. S. Malarvizhi, IAS** | Commissioner, Tamil Nadu Archives and Historical Research | **Additional Commissioner of Revenue Administration**, Commissionerate of Revenue Administration and Disaster Management *(vice Thiru G. Prakash, IAS)* |

In plain terms: Prakash takes charge of the Archives and Historical Research commissionerate; Malarvizhi takes the Additional Commissioner chair he vacates in Revenue Administration and Disaster Management.

## Temporary posts created (one year)

To support the postings, the government sanctioned **two temporary IAS cadre posts** for **one year** from the date of appointment, or until need ceases:

| Temporary post | Scale | Status / pay equivalence |
|----------------|-------|--------------------------|
| **Principal Secretary / Commissioner, Tamil Nadu Archives and Historical Research** | Higher Administrative Grade of IAS | Declared equivalent in status and responsibilities to the cadre post of **Principal Secretary** |
| **Additional Commissioner of Revenue Administration**, Commissionerate of Revenue Administration and Disaster Management | Super Time Scale of IAS | Declared equivalent in status and responsibilities to the cadre post of **Registrar of Cooperative Societies** |

This matches a pattern we already documented in the **[May 2026 collectors G.O.](${MAY_RESHUFFLE_PATH})**: time-bound temporary posts plus Rule 12(1) pay equivalence so officers can occupy specialised chairs without waiting for permanent cadre restructuring.

## How this fits the 2026 IAS timeline

| Wave | Date | Focus | MCC desk |
|------|------|-------|----------|
| **May reshuffle** | 29 May 2026 | ~40 officers; **14 collectors**; temporary directorates | [Collectors G.O.](${MAY_RESHUFFLE_PATH}) |
| **July reshuffle** | 15 July 2026 | Secretaries & institutional heads (power, IT, environment, industries…) | [July senior desk](${JULY_RESHUFFLE_PATH}) |
| **August update** | 07 August 2026 | **Two-officer swap** — Archives ↔ Revenue Administration | *This article* |

Unlike May and July, this order is **not** a mass reshuffle. It is a **surgical posting** that still matters for Chennai readers who track disaster-management coordination and state archival / historical-research administration — both housed in the capital’s governance stack under the **[cabinet portfolio map](${CABINET_PATH})**.

## Sources

- **Primary:** Tamil Nadu G.O. (Rt.) No. 2892, Public (Special-A), dated 07.08.2026 — [official scan on mychennaicity.in](${SOURCE_URL})
- **Earlier MCC desks:** [May 2026 IAS collectors reshuffle](${MAY_RESHUFFLE_PATH}); [July 2026 senior IAS reshuffle](${JULY_RESHUFFLE_PATH})
- **Context:** [Tamil Nadu G.O. portal transparency desk](${GO_PORTAL_PATH})`.trim();

  const analysisBody = `## Analysis

Targeted swaps after large cadre waves are common: once major collectors and secretaries are settled, residual grade/post mismatches are cleaned up with **temporary posts** and **vice** postings. Creating Higher Administrative Grade and Super Time Scale chairs for Archives and Additional Commissioner (Revenue) lets both officers move without leaving a vacuum.

That reading is **interpretation**, not an official rationale — the G.O. states creation, equivalence and transfer, not the political or administrative motive.

## Why Chennai readers should care

1. **Revenue Administration & Disaster Management** — The Additional Commissioner post sits inside the commissionerate that coordinates state revenue field machinery and disaster-management work that Chennai feels during northeast-monsoon and cyclone seasons.
2. **Archives & Historical Research** — The Commissioner’s chair stewards Tamil Nadu’s archival institutions and historical-research mandate — a quieter but permanent part of Secretariat-linked civic infrastructure.
3. **Continuity of the 2026 bureaucracy reset** — Field collectors (May) and departmental secretaries (July) have already moved; this August note shows the **cadre fine-tuning** that follows.
4. **How to read G.O.s** — Temporary posts + pay equivalence are the same toolkit explained in our **[May collectors order](${MAY_RESHUFFLE_PATH})** and discussed in the **[G.O. portal transparency](${GO_PORTAL_PATH})** desk.

## What happens next

- Officers are expected to **join** the notified posts as per Secretariat procedure.
- Watch whether the **one-year temporary posts** are extended or regularised.
- Further Special-A orders may adjust related charge arrangements; treat this desk as a **snapshot of G.O. 2892**, not a live cadre roll.

## Related reading on mychennaicity.in

- **[Yet another IAS reshuffle — July 2026](${JULY_RESHUFFLE_PATH})** — senior departmental leadership after the May collector wave.
- **[Tamil Nadu transfers 40 IAS officers — May 2026](${MAY_RESHUFFLE_PATH})** — collectors, temporary posts, full transfer tables.
- **[Tamil Nadu cabinet portfolios (May 2026)](${CABINET_PATH})** — ministerial map above these IAS chairs.
- **[G.O. portal transparency desk](${GO_PORTAL_PATH})** — how citizens find (and miss) government orders online.
- **[Politics topic](/chennai-local-news/topic/politics)** — Tamil Nadu executive and bureaucracy updates.

## Fine print — AI-assisted authoring

This report was prepared with **AI-assisted news authoring** and human editorial review.
AI tools can sometimes make mistakes — misread numbers, miss nuance, or invent detail.
Please cross-check important facts with the original G.O. or the Public (Special-A) Department before acting on them.`.trim();

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
      "Tamil Nadu IAS update: G. Prakash and S. Malarvizhi swap Archives and Revenue posts",
    summary:
      "G.O. (Rt.) No. 2892 (07 Aug 2026) transfers G. Prakash to Tamil Nadu Archives and Historical Research and S. Malarvizhi to Additional Commissioner of Revenue Administration — a two-officer follow-up after the May and July 2026 reshuffles.",
    dek: "Public Special-A follow-up — temporary cadre posts for one year; Archives ↔ Revenue Administration / Disaster Management swap.",
    body,
    reportBody,
    analysisBody,
    category: "Politics",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: SOURCE_URL,
    sourceName:
      "Tamil Nadu G.O. (Rt.) No. 2892, Public (Special-A), 07.08.2026",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "checklist",
      title: "What to note from G.O. 2892",
      items: [
        {
          id: "prakash-archives",
          label: "G. Prakash → Principal Secretary / Commissioner, TN Archives & Historical Research",
        },
        {
          id: "malarvizhi-revenue",
          label: "S. Malarvizhi → Additional Commissioner of Revenue Administration (CRA & DM)",
        },
        {
          id: "temp-posts",
          label: "Two temporary posts created for one year (HAG + Super Time Scale)",
        },
        {
          id: "timeline",
          label: "Place this after May collectors G.O. and July senior reshuffle desks",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-tn-ias-aug] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-tn-ias-aug] Inserted article:", SLUG);
  }

  console.log(
    "[seed-tn-ias-aug] Public URL:",
    `https://mychennaicity.in/chennai-local-news/${SLUG}`,
  );
  console.log("[seed-tn-ias-aug] Official G.O. scan:", OFFICIAL_GO_SCAN);
  console.log("[seed-tn-ias-aug] Hero image:", HERO_IMAGE_URL);

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-tn-ias-aug",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
