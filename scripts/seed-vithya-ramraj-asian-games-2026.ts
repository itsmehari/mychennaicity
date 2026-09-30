/**
 * Vithya Ramraj — three medals and a national record at the 2026 Asian Games.
 *
 * Dev:  npm run db:seed:vithya-ramraj-asian-games-2026
 * Live: npm run db:seed:vithya-ramraj-asian-games-2026:live
 *
 * Times below follow published Asian Games results desks (28–30 Sep 2026).
 * The India medal table is the 11:40 a.m. IST tracker reading on 30 Sep, not a final tally.
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const HERO_IMAGE_URL =
  "/images/articles/vithya-ramraj-asian-games-2026-hero.jpg";

const HURDLES_RESULTS =
  "https://sportstar.thehindu.com/asian-games/vithya-ramraj-asian-games-bronze-400m-hurdles-national-record-pt-usha-news/article71519361.ece";
const MIXED_RELAY =
  "https://sportstar.thehindu.com/asian-games/india-mixed-400m-relay-silver-medal-asian-games-result-report/article71504347.ece";
const WOMENS_RELAY =
  "https://sportstar.thehindu.com/asian-games/asian-games-2026-india-wins-gold-womens-4x400m-relay-timing-44-year-streak/article71523872.ece";
const MEDAL_TRACKER =
  "https://sportstar.thehindu.com/asian-games/india-medal-tally-live-asian-games-2026-day-12-september-30-gold-silver-bronze/article71526545.ece";

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
const SLUG = "vithya-ramraj-asian-games-2026-three-medals-national-record";

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

  const publishedAt = new Date("2026-09-30T07:15:00.000Z");
  const now = new Date();

  const reportBody = `## Key takeaways

- Tamil Nadu’s **Vithya Ramraj** finished the athletics programme at the **20th Asian Games** in Aichi-Nagoya with **silver, bronze and gold**.
- In the women’s **400m hurdles** on **28 September** she clocked **54.75 seconds**, breaking the Indian national record of **55.42** that **P.T. Usha** set at the **1984 Los Angeles Olympics**.
- A day later she anchored India to **gold** in the women’s **4x400m relay** in **3:29.69** — India’s only athletics gold of this edition.
- Her first medal of the Games was **silver** in the mixed 4x400m relay on **24 September** (**3:14.46**).
- India’s athletics campaign closed with **24 medals** (1 gold, 9 silver, 14 bronze). The overall Asian Games table was still moving on 30 September.

## Disclaimer

This article is **civic journalism** for public-interest information. It summarises published Asian Games results and medal-table updates available on **30 September 2026**. It is **not** an official Asian Games, Athletics Federation of India or Sports Authority of India communication.

Times, medal colours and table positions can be revised after publication. The India medal count below is an **interim reading** from a tracker updated at **11:40 a.m. IST** on 30 September. The Games continue until **4 October 2026**. Verify current standings with the [Aichi-Nagoya 2026 organisers](https://www.aichi-nagoya2026.org/) before treating any total as final.

## Summary

**Chennai, 30 September 2026** — Tamil Nadu athlete Vithya Ramraj has come out of the Asian Games athletics programme with a medal of every colour, and with the Indian women’s 400m hurdles record that had stood in P.T. Usha’s name since 1984.

Within six days at Nagoya City Mizuho Park Athletic Stadium she took silver in the mixed 4x400m relay, bronze in the women’s 400m hurdles, and gold in the women’s 4x400m relay. The hurdles clock — **54.75 seconds** — is the line that changes the Indian record book.

## Aichi-Nagoya 2026

The 20th Asian Games are being held in Aichi Prefecture and Nagoya, Japan, from **19 September to 4 October 2026**. Track and field was scheduled at the **Nagoya City Mizuho Park Athletic Stadium** from **24 to 29 September**.

Vithya, 28, had already equalled Usha’s **55.42** at the previous Asian Games in Hangzhou, held in 2023, and won bronze there. Nagoya is where she went under that mark.

## Medal 1 — silver in the mixed 4x400m relay

On **24 September**, India finished second in the mixed 4x400m relay in **3:14.46**.

The quartet was **Manu T.S.**, **M.R. Poovamma**, **Vishal T.K.** and **Vithya Ramraj**. Published lane orders put Manu on the opening leg, Poovamma on the second, Vishal on the third and Vithya on the anchor. After a slow start that left India well back, Vishal’s leg brought the team into the medal fight. Vithya then passed Vietnam in the closing straight.

**Bahrain** won in a Games record **3:12.87**, with Salwa Eid Naser on the anchor. **Vietnam** took bronze in **3:14.54**, eight-hundredths behind India. India had also finished second in this event at Hangzhou.

## Medal 2 — bronze, and a 42-year-old record

The women’s 400m hurdles final was on **28 September**.

Vithya crossed in **54.75**, third, and took **0.67 seconds** off the national record she had shared with Usha. Usha’s **55.42** was set in the 400m hurdles at the Los Angeles Olympics in 1984, where she finished fourth. Vithya had matched that time at Hangzhou. She had not gone below it until Nagoya.

The podium was tight:

| Place | Athlete | Time | Note |
| --- | --- | --- | --- |
| Gold | Mariam Kareem (UAE) | **54.31** | Asian Games record |
| Silver | Adelina Zems (Kazakhstan) | **54.58** | Personal best |
| Bronze | **Vithya Ramraj (India)** | **54.75** | Indian national record |
| 4 | Kong Yingying (China) | 55.78 | |
| 5 | Anu Raghavan (India) | **55.88** | Personal best |

Anu Raghavan’s fifth place was itself a personal best. For Vithya, the bronze is the fastest 400m hurdles race run by an Indian woman.

After the race she said she felt a **54.5** or **54.4** was still in her. Her coach, **Nehpal Singh Rathore**, has described the longer target as the **low-54** range associated with reaching a World Championships final — a different conversation from matching a 1984 national mark.

Union sports minister Mansukh Mandaviya posted the hurdles finish the same day.

https://x.com/mansukhmandviya/status/2104533321585967223

## Medal 3 — gold in the women’s 4x400m relay

On **29 September** Vithya was back on the same track for the women’s 4x400m relay.

India’s quartet:

- **Kiran Pahal** (first leg)
- **M.R. Poovamma** (second)
- **Prachi Choudhary** (third)
- **Vithya Ramraj** (anchor)

They clocked **3:29.69**. Bahrain, again with Salwa Eid Naser, took silver in **3:30.21**. China was third in **3:31.02**.

Kiran handed over in third. Poovamma moved India into the lead. Prachi held it. Vithya kept Bahrain behind on the last lap.

This was **India’s only athletics gold** at Aichi-Nagoya. India last won the women’s 4x400m at the Asian Games in **Jakarta in 2018**, then finished second in Hangzhou. P.T. Usha was part of India’s gold-medal quartet in the same event at **Seoul in 1986**. A day after Vithya replaced Usha’s individual record, she helped add another gold to an event Usha had already marked.

The Athletics Federation of India posted the quartet’s barefoot celebration on the Nagoya track.

https://x.com/afiindia/status/2104917539935695295

## Three races, three colours

| Event | Date | Performance | Medal |
| --- | --- | --- | --- |
| Mixed 4x400m relay | 24 Sep | India **3:14.46** | Silver |
| Women’s 400m hurdles | 28 Sep | **54.75** — national record | Bronze |
| Women’s 4x400m relay | 29 Sep | India **3:29.69** | Gold |

The three medals asked for different things: a mixed relay fightback, an individual hurdles final, and an anchor leg the next day. Hangzhou had already given her a hurdles bronze and relay medals. Nagoya showed she could do it again across a full championship week.

India Today posted Vithya with the gold, silver and bronze together on 30 September.

https://x.com/IndiaToday/status/2105110988169351226

## Tamil Nadu

Vithya is a Tamil Nadu athlete. Breaking the longest-standing record in Indian women’s hurdles puts her in a very small group in the state’s sporting history. Her twin sister, **Nithya Ramraj**, is also an athlete.

The wider Indian women’s 400m group is deeper than it was when Usha set the hurdles mark. Prachi Choudhary’s individual 400m bronze at these Games, and Anu Raghavan’s personal best in the same hurdles final, sit in that picture. Vithya’s week is the sharpest single line in it.

## India’s athletics medals

India’s athletics programme at Aichi-Nagoya closed with **24 medals**: **1 gold, 9 silver and 14 bronze**. Vithya’s relay gold was the only gold in that set.

**Gulveer Singh** also won three medals: silver in the **10,000m**, silver in the **1,500m** and bronze in the **5,000m**.

## India on the medal table — interim, 30 September

The Asian Games were still on when this report was filed. Shooting, archery, boxing and other sports had not finished.

A published medal tracker **updated at 11:40 a.m. IST on 30 September** listed India **eighth**, with **9 gold, 21 silver and 27 bronze**. The table on that update adds up to **57** medals. The same page’s opening sentence said **56**. Treat both as a same-morning snapshot, not a final count.

On that reading, China led, followed by host Japan and South Korea. Golds added on 30 September, after athletics had closed, included the women’s compound archery team (**Chikitha Taniparthi**, **Prithika Pradeep**, **Jyothi Surekha Vennam**), a compound mixed-team gold for Taniparthi and **Sahil Jadhav**, and a trap mixed-team gold for **Kynan Chenai** and **Neeru Dhanda**. **Priya Ghanghas** took bronze in the women’s 60kg boxing.

Events continue through **4 October**. Any total in this article should be read as interim.

## What the week adds up to

The silver showed what Vithya can do on a relay anchor when the team is behind. The bronze made her the fastest Indian woman over 400m hurdles. The gold put her on the leg that held India’s one athletics title of these Games. The **54.75** ended a 42-year wait.

For Tamil Nadu, that is one of the state’s defining sporting weeks of the Games. For Indian athletics, **55.42** is no longer the target. **54.75** is.

## Fact box

| Item | Detail |
| --- | --- |
| Athlete | Vithya Ramraj, Tamil Nadu, 28 |
| Games | 20th Asian Games, Aichi-Nagoya, 19 Sep–4 Oct 2026 |
| Track venue | Nagoya City Mizuho Park Athletic Stadium (athletics 24–29 Sep) |
| Mixed 4x400m | Silver, 3:14.46, 24 Sep (anchor) |
| 400m hurdles | Bronze, 54.75 NR, 28 Sep |
| Previous national record | 55.42, P.T. Usha, Los Angeles 1984 |
| Women’s 4x400m | Gold, 3:29.69, 29 Sep (anchor) |
| India athletics | 24 medals: 1 gold, 9 silver, 14 bronze |
| India overall | Interim only — tracker at 11:40 a.m. IST, 30 Sep |
| Category | Sports |
| Photograph | Celebration on the track in India’s vest; image supplied with this report |

## Sources

- Women’s 400m hurdles final order and times, including Mariam Kareem 54.31 and Anu Raghavan 55.88: [results report, 28 Sep 2026](${HURDLES_RESULTS})
- National-record context, Hangzhou equal, and the low-54 target described by coach Nehpal Singh Rathore: same results cycle, 28 Sep 2026
- Mixed 4x400m: India 3:14.46, Bahrain 3:12.87, Vietnam 3:14.54; leg order Manu, Poovamma, Vishal, Vithya: [results report, 24 Sep 2026](${MIXED_RELAY})
- Women’s 4x400m: India 3:29.69, Bahrain 3:30.21, China 3:31.02: [results report, 29 Sep 2026](${WOMENS_RELAY})
- India athletics haul of 24 (1-9-14) and Gulveer Singh’s three medals: athletics wrap, 29 Sep 2026
- Interim medal table (11:40 a.m. IST, 30 Sep 2026): [day-12 tracker](${MEDAL_TRACKER})

## Fine print — AI-assisted authoring

This report was prepared with **AI-assisted news authoring** and human editorial review.
AI tools can misread a live medal table or compress a quote. The photograph shows Vithya Ramraj celebrating on the track in India’s colours; it was supplied with this report and is not an official Asian Games handout.
Cross-check times and the medal table with the organisers before treating them as final. The Games close on 4 October 2026.`;

  const analysisBody = `## Why this matters in Tamil Nadu

Chennai readers know P.T. Usha’s 1984 race as one of Indian sport’s near-misses: fourth in Los Angeles, **55.42**, and then four decades in which nobody went faster. Vithya matching that time in Hangzhou made the record feel reachable. Going to **54.75** in Nagoya makes it hers.

The relay gold matters for a second reason. India had a pile of athletics silvers and bronzes at these Games and one gold. That gold was the women’s 4x400m, and Vithya ran the last lap. A Tamil Nadu athlete is in the middle of both the individual record and the only athletics title.

## What to watch next

1. Whether **54.75** is ratified as the national record in the usual Athletics Federation of India process. The time is what the Games clock showed; ratification is a separate step.
2. The low-54 target her coach has already set, if the aim is a World Championships final rather than another Asian medal.
3. The Asian Games medal table through **4 October**. The 30 September morning figures in this report will be out of date before the closing ceremony.

## Conclusion

Vithya Ramraj’s Nagoya week is easy to file as “three medals.” The sharper fact is the clock. Indian women’s 400m hurdles now starts from **54.75**, not from a mark set when Vithya had not yet been born. The gold the next day says she could come back and finish the job for the relay as well.`;

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
      "Tamil Nadu’s Vithya Ramraj breaks P.T. Usha’s record and wins three Asian Games medals",
    summary:
      "Vithya Ramraj clocked 54.75 in the 400m hurdles at Aichi-Nagoya, breaking P.T. Usha’s 1984 national record, and left the athletics programme with silver, bronze and gold.",
    dek: "Silver in the mixed 4x400m, a national-record bronze in the hurdles, then the anchor leg on India’s only athletics gold.",
    body,
    reportBody,
    analysisBody,
    category: "Sports",
    areaHubSlug: null as string | null,
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: HURDLES_RESULTS,
    sourceName:
      "Asian Games 2026 athletics results (hurdles, mixed and women’s 4x400m); medal tracker 11:40 a.m. IST, 30 Sep 2026",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "What national record did Vithya Ramraj break?",
          answer:
            "She ran 54.75 seconds in the women’s 400m hurdles at the Asian Games on 28 September 2026. That replaced the Indian record of 55.42 seconds set by P.T. Usha at the 1984 Los Angeles Olympics. Vithya had equalled 55.42 at the Hangzhou Asian Games.",
        },
        {
          question: "Which three medals did she win in Nagoya?",
          answer:
            "Silver in the mixed 4x400m relay on 24 September (India 3:14.46), bronze in the 400m hurdles on 28 September (54.75), and gold in the women’s 4x400m relay on 29 September (India 3:29.69). She anchored both relays.",
        },
        {
          question: "Who else was on the women’s 4x400m gold team?",
          answer:
            "Kiran Pahal, M.R. Poovamma, Prachi Choudhary and Vithya Ramraj. Bahrain was second in 3:30.21 and China third in 3:31.02. It was India’s only athletics gold at these Games.",
        },
        {
          question: "Is India’s Asian Games medal total final?",
          answer:
            "No. A tracker updated at 11:40 a.m. IST on 30 September 2026 listed India eighth with 9 gold, 21 silver and 27 bronze. The Games continue until 4 October, so that table will change.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-vithya-ramraj] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-vithya-ramraj] Inserted article:", SLUG);
  }

  console.log(
    "[seed-vithya-ramraj] Public URL:",
    `https://mychennaicity.in/chennai-local-news/${SLUG}`,
  );

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-vithya-ramraj",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
