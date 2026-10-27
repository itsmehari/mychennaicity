/**
 * Follow-up to the 29 September reservoir report.
 *
 * Dev:  `npm run db:seed:chennai-reservoirs-october-17-2026`
 * Live: `npm run db:seed:chennai-reservoirs-october-17-2026:live`
 *
 * Primary table: CMWSSB lake storage as on 16 October 2026
 * (the page still carried that date when this was written on 17 October).
 * https://www.cmwssb.tn.gov.in/lake-level
 * October archive: https://cmwssb.tn.gov.in/previous-lake-level
 *
 * Graphic: CMWSSB social chart dated 17-10-2026. Its bar values are a
 * later snapshot. Do not average them with the 16 October table.
 *
 * Do not name other news outlets. Do not fold Veeranam into the
 * five-reservoir Chennai total. Do not treat a cusec-to-mcft check
 * as a board figure.
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const SLUG = "chennai-reservoirs-34-percent-october-17-2026";
const PREVIOUS = "/chennai-local-news/chennai-reservoirs-northeast-monsoon-39-percent-2026";
const GRAPHIC = "/images/articles/chennai-reservoirs-17-october-2026-graphic.png";
const CMWSSB = "https://www.cmwssb.tn.gov.in/lake-level";
const CMWSSB_ARCHIVE = "https://cmwssb.tn.gov.in/previous-lake-level";
const IMD_ONSET =
  "https://mausam.imd.gov.in/Forecast/marquee_data/Press%20Release%2015-10-2026.pdf";
const IMD_OUTLOOK =
  "https://mausam.imd.gov.in/Forecast/mcmarq/mcmarq_data/Outlook%20for%20the%20NE%20Monsoon%20over%20SPI_1Oct%2026_ENGLISH.pdf";
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

  /** 17 Oct 2026, 7:30 p.m. IST */
  const publishedAt = new Date("2026-10-17T14:00:00.000Z");
  const now = new Date();

  const reportBody = `## Disclaimer

This is a MyChennaiCity civic report on Chennai’s drinking-water reservoirs. It follows the [29 September reservoir report](${PREVIOUS}). Storage figures are taken from the Chennai Metropolitan Water Supply and Sewerage Board lake-level table dated 16 October 2026, from the board’s October archive, and from the board’s own chart dated 17 October 2026. It is not an official Metro Water notice. Lake levels change daily. Check the board’s table before you treat any number here as today’s storage.

## Summary

**Chennai, 17 October 2026** — The Northeast Monsoon has begun, and the city’s five principal drinking-water reservoirs are **lower** than they were on 29 September.

On the CMWSSB table dated **16 October**, those five lakes held **3,949 million cubic feet**, or **33.6%** of their **11,757 mcft** combined capacity. On 29 September the same five held **4,569 mcft (38.9%)**. That is a drop of **620 mcft** in 17 days.

On the same date in 2025 the table records **9,055 mcft** in those five lakes, about **77%** full. The year-on-year gap is **5,106 mcft**.

Almost all of the October fall is in one lake. **Poondi** held **379 mcft** on 16 October, **11.7%** of its 3,231 mcft capacity, against **3,081 mcft** a year earlier. On 29 September it held **981 mcft**.

![CMWSSB chart dated 17 October 2026: capacity and storage for Chembarambakkam, Puzhal, Poondi, Veeranam, Cholavaram and Kannankottai–Thervoy Kandigai](${GRAPHIC})

*The chart is the board’s 17 October graphic. The table below is the CMWSSB website reading dated 16 October, which also carries inflow, outflow, rainfall and last year’s storage.*

## Reservoir position on 16 October

[CMWSSB lake storage as on 16 October 2026](${CMWSSB}).

| Reservoir | Capacity (mcft) | Storage (mcft) | Fill | Inflow (cusecs) | Outflow (cusecs) | Rain (mm) | Same date 2025 (mcft) |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Poondi | 3,231 | 379 | 11.7% | 150 | 529 | 64 | 3,081 |
| Cholavaram | 1,081 | 120 | 11.1% | — | 8 | 6 | 195 |
| Red Hills / Puzhal | 3,300 | 1,886 | 57.2% | 315 | 201 | 26 | 2,980 |
| Kannankottai–Thervoy Kandigai | 500 | 232 | 46.4% | 20 | 18 | 27 | 424 |
| Chembarambakkam | 3,645 | 1,332 | 36.5% | 356 | 188 | 8 | 2,375 |
| **Five-reservoir total** | **11,757** | **3,949** | **33.6%** |  |  |  | **9,055** |
| Veeranam (separate) | 1,465 | 539.8 | 36.8% | 340 | 125 | 3 | 1,002.65 |

The board’s own grand total, which includes Veeranam, is **4,488.8 mcft** of **13,222 mcft** (**33.95%**), against **10,057.65 mcft** on the same date last year.

Poondi’s water level that day was **126.31 ft**, against a full-tank level of **140 ft**. Percent storage is not the same as percent of depth. The lake is about 14 feet below full tank and only about 12% full by volume.

## What changed since 29 September

| Reservoir | 29 Sep (mcft) | 16 Oct (mcft) | Change |
| --- | ---: | ---: | ---: |
| Poondi | 981 | 379 | −602 |
| Cholavaram | 136 | 120 | −16 |
| Red Hills / Puzhal | 1,856 | 1,886 | +30 |
| Kannankottai–Thervoy Kandigai | 264 | 232 | −32 |
| Chembarambakkam | 1,332 | 1,332 | 0 |
| **Five-reservoir total** | **4,569** | **3,949** | **−620** |
| Veeranam (separate) | 449.6 | 539.8 | +90.2 |

From 1 October to 16 October, Poondi fell from **946 mcft** to **379 mcft**. The other four Chennai lakes together moved from **3,555 mcft** to **3,570 mcft**. The combined decline is Poondi’s decline.

## The 17 October chart is a later snapshot

The graphic dated **17 October 2026** does not match the 16 October website row. It should not be averaged with it.

| Reservoir | Capacity (mcft) | Storage on the 17 Oct chart (mcft) |
| --- | ---: | ---: |
| Chembarambakkam | 3,645 | 1,351 |
| Red Hills / Puzhal | 3,300 | 1,926 |
| Poondi | 3,231 | 358 |
| Cholavaram | 1,081 | 122 |
| Kannankottai–Thervoy Kandigai | 500 | 232 |
| **Five-reservoir total** | **11,757** | **3,989 (33.9%)** |
| Veeranam (separate) | 1,465 | 550 |

Against the 16 October table, that chart is **40 mcft** higher for the five lakes. Poondi is lower still (**358**, against **379**). Puzhal is higher (**1,926**, against **1,886**) and Chembarambakkam is higher (**1,351**, against **1,332**). The chart does not print inflow, outflow, rainfall or last year’s storage.

## October slope

The [October archive](${CMWSSB_ARCHIVE}) lists 1 October and then 3–16 October. The 2 October row is not on that page.

| Date | Poondi (mcft) | Five-lake total (mcft) |
| --- | ---: | ---: |
| 29 September | 981 | 4,569 |
| 1 October | 946 | 4,501 |
| 8 October | 727 | 4,228 |
| 15 October | 412 | 3,959 |
| 16 October (table) | 379 | 3,949 |
| 17 October (chart only) | 358 | 3,989 |

The 16 October table is the low point in the verified series. The 17 October chart is the first combined uptick, and it is still a chart reading, not the website table.

## At a glance

- Five Chennai reservoirs on 16 October 2026: **3,949 / 11,757 mcft (33.6%)**
- Same date in 2025: **9,055 mcft (77.0%)**
- Gap: **5,106 mcft**
- Change since 29 September: **−620 mcft**
- Poondi: **379 / 3,231 mcft (11.7%)**, against **3,081 mcft** a year earlier
- 17 October chart, five lakes: **3,989 mcft (33.9%)**
- Empty space in the five lakes on 16 October: about **7,808 mcft**
- Veeranam: **539.8 / 1,465 mcft (36.8%)**, against **1,002.65 mcft** a year earlier, and up from **449.6 mcft** on 29 September

## Rain at Poondi did not stop the drawdown

On 16 October the Poondi row shows **64 mm** of rain, **150 cusecs** inflow and **529 cusecs** outflow. Storage still fell, from **412 mcft** on 15 October to **379 mcft**.

A desk check, not a board figure: 379 cusecs of net outflow for a day is about **33 mcft**. That matches the day’s fall. The rain had not yet become stored water.

The same check lines up with the lakes that gained. Chembarambakkam’s net inflow was about **168 cusecs** (356 in, 188 out), and storage rose **13 mcft** from 15 to 16 October. Puzhal’s net inflow was about **114 cusecs**, and storage rose **10 mcft**.

Cholavaram still has no inflow figure, only **8 cusecs** of outflow.

## Veeranam is still a separate number

Veeranam sits on the Cauvery system. On 16 October it held **539.8 mcft**, about **37%**, with **340 cusecs** inflow and **125 cusecs** outflow. A year earlier the same table shows **1,002.65 mcft**. It is up by about **90 mcft** since 29 September. It is still not another Poondi, and it should not be added into the five-lake total.`;

  const analysisBody = `## The monsoon has started. The cushion has not.

On **15 October 2026** the India Meteorological Department said the southwest monsoon had withdrawn from the entire country and that Northeast Monsoon rain had commenced the same day over Tamil Nadu, Puducherry and Karaikal, among other parts of the south peninsula. IMD’s press note the same day said a wet spell, with isolated heavy rain, was likely over many parts of south peninsular India through **21 October**, and isolated heavy rain was likely over Tamil Nadu during **17–21 October**.

That is the window this desk flagged on 29 September: rain on the right catchments, sustained long enough to beat outflow. Two days in, the five-lake total is still about **620 mcft** below the September baseline.

The [1 October seasonal outlook](${IMD_OUTLOOK}) said many areas of south Tamil Nadu, and some areas of north Tamil Nadu, were likely to see normal to above-normal rain in October, and that most of the remaining south peninsula was likely to be below normal that month. A normal city total can still miss Poondi.

## Why Poondi is the number to watch

Puzhal is a little over half full. Chembarambakkam is where it was on 29 September, and the 17 October chart has it slightly higher. Cholavaram and Kannankottai–Thervoy Kandigai are small beside Poondi’s empty space.

Poondi’s unused room on 16 October was about **2,852 mcft**. Chembarambakkam still had about **2,313 mcft** of room. Across the five lakes, about **7.8 TMC** was empty. One TMC here means 1,000 mcft.

Until Poondi’s inflow stays ahead of its outflow for more than a day, a higher combined percentage can be Puzhal and Chembarambakkam inching up while the largest empty lake keeps falling. The 17 October chart is that pattern: the five-lake total is **40 mcft** above the 16 October table, and Poondi’s bar is lower.

## What the next week can and cannot do

Isolated heavy rain through 21 October can change a daily row. It cannot, by itself, close a **5,106 mcft** gap with last year. The September report’s three cases still stand:

- **A strong spell on the catchments** can use the empty room. Poondi in particular has space.
- **A near-normal season** can still leave January thinner than 2026, because the city started this monsoon about **5,100 mcft** behind the same October date last year, not the **3,284 mcft** gap of 29 September.
- **A weak spell** leaves the drawdown already visible in the October archive as the baseline for 2027.

City flooding and reservoir recharge remain different events. Rain over central Chennai is not rain on the Poondi catchment.

## What to read on the next table

1. **Poondi inflow against outflow.** On 16 October outflow was more than three times inflow.
2. **Whether the five-lake total holds above 3,949 mcft** once the website table, not only the social chart, moves to 17 October and after.
3. **Chembarambakkam and Puzhal** as the lakes that were already receiving more than they released.
4. **Veeranam on its own row**, including whether the rise from 449.6 mcft continues.
5. **31 December 2026**, still the first date that can say whether the monsoon did the job. If the lakes are still weak then, conservation should start then.

Supply-day patterns for neighbourhoods are on the [Metro Water schedule desk](${METRO_WATER}). That page does not replace the lake table.

## What residents should take from 34%

There is no basis, on 17 October, to declare a 2027 water crisis. There is also no basis to treat the first monsoon showers as a recovery.

Chennai has begun its main recharge season with less water than it held three weeks ago, and with about **5,100 mcft** less than on this date in 2025. Poondi at **12%** is the figure that has to turn. The rest of October will show whether it does.

## Sources

- [CMWSSB — Lake storage as on 16 October 2026](${CMWSSB})
- [CMWSSB — Daily lake level from 1 October 2026](${CMWSSB_ARCHIVE})
- CMWSSB reservoir chart dated 17 October 2026 (image above)
- [IMD press release, 15 October 2026 — Northeast Monsoon onset](${IMD_ONSET})
- [IMD forecast outlook for the 2026 Northeast Monsoon, issued 1 October 2026](${IMD_OUTLOOK})
- [MyChennaiCity, 29 September 2026 — reservoirs at 39%](${PREVIOUS})

## Fine print

This report was prepared with AI-assisted drafting and human editorial review. AI tools can err. Cross-check every storage figure with the [CMWSSB lake-level table](${CMWSSB}) before you act on it. The 17 October chart and the 16 October table are different snapshots. The cusec-to-volume check in this report is a desk calculation, not a Metro Water figure.`;

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
      "The monsoon has started, and Chennai’s five reservoirs are lower than in September",
    summary:
      "On 16 October 2026, CMWSSB put the five main lakes at 3,949 mcft — 33.6% of capacity — against 9,055 mcft on the same date in 2025. Poondi held 379 mcft.",
    dek: "Rain has reached the lakes. Poondi is still being drawn down faster than it is filling.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: GRAPHIC,
    sourceUrl: CMWSSB,
    sourceName: "CMWSSB lake storage, 16 October 2026",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "Are Chennai’s reservoirs lower than in September?",
          answer:
            "Yes, on the CMWSSB table dated 16 October 2026. The five main lakes held 3,949 mcft, about 33.6% of 11,757 mcft, against 4,569 mcft (38.9%) on 29 September. The drop is 620 mcft, and almost all of it is at Poondi.",
        },
        {
          question: "Why does the chart not match the table?",
          answer:
            "The chart is dated 17 October 2026 and shows 3,989 mcft in the five lakes. The website table fetched for this report is dated 16 October and shows 3,949 mcft, with inflow, outflow, rainfall and last year’s storage. They are a day apart. Do not average them.",
        },
        {
          question: "Did the Northeast Monsoon begin?",
          answer:
            "IMD said on 15 October 2026 that Northeast Monsoon rainfall had commenced over Tamil Nadu, Puducherry and Karaikal, and that isolated heavy rain was likely over Tamil Nadu from 17 to 21 October. On 16 October, Poondi still recorded more outflow than inflow.",
        },
        {
          question: "How far behind last year is the city?",
          answer:
            "On 16 October 2025 the five lakes held 9,055 mcft. On 16 October 2026 they held 3,949 mcft. The gap is 5,106 mcft. Poondi alone was 3,081 mcft last year and 379 mcft this year.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-chennai-reservoirs-oct17] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-chennai-reservoirs-oct17] Inserted article:", SLUG);
  }

  console.log(
    "[seed-chennai-reservoirs-oct17] Public URL:",
    `https://mychennaicity.in/chennai-local-news/${SLUG}`,
  );

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-chennai-reservoirs-oct17",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
