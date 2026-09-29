/**
 * Chennai reservoirs ahead of the 2026 Northeast Monsoon.
 *
 * Dev:  `npm run db:seed:chennai-reservoirs-northeast-monsoon-2026`
 * Live: `npm run db:seed:chennai-reservoirs-northeast-monsoon-2026:live`
 *
 * Primary table: CMWSSB lake storage as on 29 September 2026.
 * https://www.cmwssb.tn.gov.in/lake-level
 *
 * Graphic: 28 September desk reading (4,603 mcft, 39%). Hero is the top
 * crop; the full graphic is embedded in the report.
 *
 * Do not name other news outlets. Do not treat desalination nameplate
 * capacity as that day's production. Do not fold Veeranam into the
 * five-reservoir Chennai total.
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const SLUG = "chennai-reservoirs-northeast-monsoon-39-percent-2026";
const HERO = "/images/articles/chennai-reservoirs-northeast-monsoon-2026-hero.jpg";
const GRAPHIC =
  "/images/articles/chennai-reservoirs-northeast-monsoon-2026-graphic.jpg";
const CMWSSB = "https://www.cmwssb.tn.gov.in/lake-level";
const METRO_WATER = "/civic-tools/metro-water-schedule";

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

  /** 29 Sep 2026, 10:00 p.m. IST */
  const publishedAt = new Date("2026-09-29T16:30:00.000Z");
  const now = new Date();

  const reportBody = `## Disclaimer

This is a MyChennaiCity civic report on Chennai’s drinking-water reservoirs. Storage figures are taken from the Chennai Metropolitan Water Supply and Sewerage Board lake-level table dated 29 September 2026, and from this desk’s 28 September graphic of the same five lakes. It is not an official Metro Water notice. Lake levels change daily. Check the board’s table before you treat any number here as today’s storage.

## Summary

**Chennai, 29 September 2026** — The city is entering the Northeast Monsoon with its five principal drinking-water reservoirs at **4,569 million cubic feet**, or **38.9%** of their **11,757 mcft** combined capacity.

On the same date in 2025, the CMWSSB table records **7,853 mcft** in those five lakes, about **66.8%** full. That is a year-on-year gap of **3,284 mcft** — roughly **42%** less water than last year’s same-day storage.

A desk graphic dated 28 September put the same five lakes at **4,603 mcft**, or **39.15%**. The 29 September board reading is **34 mcft** lower. The monsoon, not this September snapshot, will decide whether summer 2027 is comfortable or a return to groundwater stress, tanker queues and supply restrictions.

![Chennai reservoir graphic for 28 September 2026: five lakes at 4,603 mcft, 39 percent of 11,757 mcft](${GRAPHIC})

*The graphic is the 28 September position. The table below is the CMWSSB reading for 29 September.*

## Reservoir position on 29 September

[CMWSSB lake storage as on 29 September 2026](${CMWSSB}). Rainfall at every lake that day is listed as **0.00 mm**.

| Reservoir | Capacity (mcft) | Storage (mcft) | Fill | Same date 2025 (mcft) |
| --- | ---: | ---: | ---: | ---: |
| Poondi | 3,231 | 981 | 30.4% | 2,518 |
| Cholavaram | 1,081 | 136 | 12.6% | 181 |
| Red Hills / Puzhal | 3,300 | 1,856 | 56.2% | 2,928 |
| Kannankottai–Thervoy Kandigai | 500 | 264 | 52.8% | 438 |
| Chembarambakkam | 3,645 | 1,332 | 36.5% | 1,788 |
| **Five-reservoir total** | **11,757** | **4,569** | **38.9%** | **7,853** |
| Veeranam (separate) | 1,465 | 449.6 | 30.7% | 1,246 |

The board’s own grand total, which includes Veeranam, is **5,018.6 mcft** of **13,222 mcft** (**38.0%**), against **9,099 mcft** on the same date last year.

On 29 September the table also shows water leaving the lakes with little coming in. Poondi is listed at **80 cusecs** inflow and **294 cusecs** outflow. Red Hills is nearly balanced (**210** in, **204** out). Chembarambakkam shows **209 cusecs** outflow and no inflow figure. Cholavaram and Kannankottai–Thervoy Kandigai likewise show outflow and a blank inflow cell.

## What the 28 September graphic showed

The graphic released with this report used the previous day’s position:

| Reservoir | Capacity (mcft) | Storage (mcft) | Fill |
| --- | ---: | ---: | ---: |
| Chembarambakkam | 3,645 | 1,348 | 37.0% |
| Red Hills / Puzhal | 3,300 | 1,853 | 56.2% |
| Poondi | 3,231 | 999 | 30.9% |
| Cholavaram | 1,081 | 138 | 12.8% |
| Kannankottai–Thervoy Kandigai | 500 | 265 | 53.0% |
| **Five-reservoir total** | **11,757** | **4,603** | **39.15%** |

Those 28 September figures are not last year’s storage. Last year’s comparison is the CMWSSB “same date” column: **7,853 mcft** on 29 September 2025, against **4,569 mcft** now.

## At a glance

- Five Chennai reservoirs on 29 September 2026: **4,569 / 11,757 mcft (38.9%)**
- Same date in 2025: **7,853 mcft (66.8%)**
- Gap: **3,284 mcft**
- 28 September graphic: **4,603 mcft (39.15%)**
- Empty space in the five lakes: about **7,188 mcft**
- Veeranam: **449.6 / 1,465 mcft (30.7%)**, against **1,246 mcft** a year earlier
- Rainfall listed at the lakes on 29 September: **0.00 mm**

## Veeranam is a separate number

Veeranam matters to Chennai, and it should not be added into the five-lake total as if it were another Poondi.

The lake sits on the Cauvery system. What it can send towards the city depends on storage upstream, irrigation demand and releases, not only on rain over Chennai, Tiruvallur and Kancheepuram. On 29 September it held **449.6 mcft**, about **31%**, with **330 cusecs** inflow and **73 cusecs** outflow. A year earlier the same table shows **1,246 mcft**.

Treat Veeranam as a supplementary source. It is not a guaranteed backup if the Northeast Monsoon is weak.`;

  const analysisBody = `## Should Chennai be worried?

Not in the sense of an immediate drinking-water emergency. Storage is still thousands of million cubic feet above the near-empty lakes of the 2019 shortage.

The starting position is weak enough to watch closely. September storage does not, by itself, predict a crisis. A strong October–December monsoon over the Poondi, Red Hills and Chembarambakkam catchments can add several thousand mcft within weeks. A short or poorly placed monsoon leaves January with a thinner reserve than the city had last year.

## The three seasons Chennai is now betting on

### A strong Northeast Monsoon

If rain is spread across the catchments, the lakes have room to take it. On 29 September the unused space is about **2.31 TMC** at Chembarambakkam, **2.25 TMC** at Poondi and **1.44 TMC** at Red Hills. Across the five lakes, about **7.2 TMC** is empty. One TMC here means 1,000 mcft.

That room matters. A good monsoon can lift the percentage quickly, and managers can store water before they have to release it for flood control.

### A near-normal monsoon

A “normal” season total does not fill every lake. Rain has to fall on the right catchments, and enough of it has to reach the reservoirs after soil, tanks and upstream use take their share.

Chennai’s supply is more mixed than it was in 2019: the local lakes, Veeranam, Krishna water through the Telugu Ganga system, desalination at Minjur and Nemmeli, well fields, borewells, tankers, and treated water for some non-drinking uses. Desalination is a drought-resistant base. The lake table does not say how many million litres those plants produced on 29 September, so a nameplate capacity should not be read as today’s output.

A middling monsoon can still leave 2027 manageable. It leaves less room to coast from January. Groundwater pumping, tanker demand and reservoir releases would need tighter watching.

### A weak Northeast Monsoon

This is the case that turns 2027 into the real concern. If October–December recharge stays well short, the city can enter the new year with a thin surface reserve. The strain usually shows in sequence, not overnight:

- **January–February:** the lakes fall faster.
- **March:** borewells and peripheral neighbourhoods carry more of the load.
- **April–May:** apartments, unconnected streets and low-pressure pockets compete harder for tankers.
- **May–June:** yields drop and private tanker prices rise.
- **June–July:** the city leans harder on desalination, whatever Krishna and Veeranam water is available, well fields and controlled lake releases.

That sequence is familiar from earlier dry years.

## Why 2026 is not 2025

The useful comparison is the same date, not the absolute 39% on its own. Last year the five lakes held **7,853 mcft** on 29 September. This year they hold **4,569**. Chennai also does not sit on a hydrological island: a dry year makes Veeranam transfers, Krishna releases and farm demand harder to reconcile.

## Floods and scarcity can share a year

A cloudburst over central Chennai is not the same as sustained rain on the Poondi or Chembarambakkam catchments. Intense rain can flood streets and still run to the sea. Reservoir recharge depends on where the rain falls, how long it lasts, whether the catchment is already wet, what upstream tanks hold back, and what operators release.

City rainfall alone is a poor scoreboard for next summer’s water.

## What to watch before December

Five readings matter more than one percentage:

1. **Weekly combined storage** in the five lakes. The slope matters more than a single day.
2. **Inflow after each rain spell.** The 29 September table is the dry-day baseline: outflow ahead of inflow.
3. **Catchment rain**, kept separate from rain over the city.
4. **Groundwater**, ward by ward, before and after the monsoon.
5. **Source-wise Metro Water production** — lakes, desalination, Veeranam, Krishna water and wells — published as a daily figure, not only as lake storage.

**31 December 2026** is the first date that can say whether the monsoon did the job. If the lakes are still weak then, conservation should start then, not in April. **28 February 2027** is the second check: whether the drawdown is faster than expected.

Supply-day patterns for neighbourhoods are on the [Metro Water schedule desk](${METRO_WATER}). That page does not replace the lake table.

## What can be done before a shortage

The response to 39% is early management.

- Rainwater-harvesting systems that are clogged, disconnected or unmaintained will not help once the rain has passed.
- Tanks that overflow while a downstream reservoir is still low are a missed transfer.
- Wetlands, floodplains and recharge zones are part of the drinking-water system.
- Water already treated and then lost to leaks is cheaper to save than a new raw-water source.
- Industry, construction and landscaping can take treated wastewater instead of drinking water.

## What residents should take from the number

There is no basis, on 29 September, to declare a 2027 water crisis. There is also no basis to assume the monsoon will erase a **3,284 mcft** deficit on its own.

Chennai is entering its main recharge season with substantially less stored water than on the same date in 2025. That is an early warning. In a city that has seen both severe floods and near-empty reservoirs within a few years, this is when the numbers are worth following.

## Sources

- [CMWSSB — Lake storage as on 29 September 2026](${CMWSSB})
- MyChennaiCity reservoir graphic, 28 September 2026 position (image above)

## Fine print

This report was prepared with AI-assisted drafting and human editorial review. AI tools can err. Cross-check every storage figure with the [CMWSSB lake-level table](${CMWSSB}) before you act on it. The photograph in the graphic illustrates a reservoir intake. It is not a live camera frame from 29 September.`;

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
      "Chennai enters the Northeast Monsoon with reservoirs at just 39%: what the numbers mean for 2027 water security",
    summary:
      "On 29 September 2026, CMWSSB put Chennai’s five main reservoirs at 4,569 mcft — 38.9% of capacity — against 7,853 mcft on the same date in 2025.",
    dek: "The Northeast Monsoon, not this September snapshot, will decide how the city enters summer 2027.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO,
    sourceUrl: CMWSSB,
    sourceName: "CMWSSB lake storage, 29 September 2026",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "Are Chennai’s reservoirs at 39% an emergency?",
          answer:
            "No. On 29 September 2026 the five main lakes held 4,569 mcft, about 38.9% of 11,757 mcft. That is far above the near-empty levels of 2019. It is also 3,284 mcft below the same date in 2025, so the Northeast Monsoon has less of a cushion.",
        },
        {
          question: "Why does the graphic say 4,603 mcft and the article say 4,569?",
          answer:
            "The graphic is the 28 September position (4,603 mcft, 39.15%). The CMWSSB lake table dated 29 September 2026 shows 4,569 mcft. Rainfall at the lakes that day was 0.00 mm.",
        },
        {
          question: "Does heavy rain in the city fill Poondi and Chembarambakkam?",
          answer:
            "Not by itself. Those lakes depend on rain and runoff in their catchments. A short, intense storm over central Chennai can flood streets and still miss the reservoirs.",
        },
        {
          question: "Which dates matter more than 29 September?",
          answer:
            "31 December 2026, after most of the Northeast Monsoon, and 28 February 2027, when winter drawdown is visible. If storage is still weak at the end of December, conservation should start then.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-chennai-reservoirs] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-chennai-reservoirs] Inserted article:", SLUG);
  }

  console.log(
    "[seed-chennai-reservoirs] Public URL:",
    `https://mychennaicity.in/chennai-local-news/${SLUG}`,
  );

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-chennai-reservoirs",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
