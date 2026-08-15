/**
 * 5th Tamil Nadu International Kite Festival — dedicated news desk (15 Aug 2026).
 *
 * Dev:  `npm run db:seed:tn-international-kite-festival-august-2026`
 * Live: `npm run db:seed:tn-international-kite-festival-august-2026:live`
 *
 * X/Twitter (after live):
 * Giant kites over Mamallapuram this weekend: 5th Tamil Nadu International Kite Festival, TTDC Ocean View, today and tomorrow, 2 pm–sunset. Free entry. Do not pack a hobby kite.
 * https://mychennaicity.in/chennai-local-news/tamil-nadu-international-kite-festival-mamallapuram-august-2026
 * #Chennai #Mamallapuram #ECR #KiteFestival #TNIKF #mychennaicity
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";
import {
  ECR_WEEKEND_PLAN_PATH,
  KITE_FESTIVAL_EVENT_SLUG,
  KITE_FESTIVAL_NEWS_SLUG,
  SURFING_EVENT_SLUG,
  TTDC_ECR_NEWS_PATH,
} from "../src/content/tourism";

const HERO_IMAGE_URL =
  "/images/articles/tamil-nadu-international-kite-festival-mamallapuram-august-2026.png";
const ARTICLE_URL = `https://mychennaicity.in/chennai-local-news/${KITE_FESTIVAL_NEWS_SLUG}`;
const KITE_EVENT_PATH = `/chennai-local-events/${KITE_FESTIVAL_EVENT_SLUG}`;
const SURF_EVENT_PATH = `/chennai-local-events/${SURFING_EVENT_SLUG}`;

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

export const SLUG = KITE_FESTIVAL_NEWS_SLUG;

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

  /** Saturday 15 August 2026, late morning IST — day two of three. */
  const publishedAt = new Date("2026-08-15T11:50:00.000+05:30");
  const now = new Date();

  const reportBody = `## Key takeaways

- The **5th Tamil Nadu International Kite Festival (TNIKF)** is on **now** at **TTDC Ocean View**, Mamallapuram ECR — **Friday 14 to Sunday 16 August 2026**.
- **Today (Saturday) and tomorrow (Sunday)** are the remaining flying days. Official FAQ: professional kites **2:00 pm until sunset**, weather permitting; **LED kites** after sunset toward **7:00 pm**.
- **Entry is free.** This is a **professional show**. The official site is explicit: **do not bring or fly personal kites** on the festival ground.
- DT Next and the official site put **30+ flyers** from **Thailand, Singapore, Malaysia, Indonesia, Vietnam and India** in the sky, with **200+ giant / inflatable show kites**. 2026 theme: **Save Marine Life**.
- **Sunday 16 August** is listed with a **Red Bull F1 static display**. Rain cancels flying.

## Disclaimer

This article is **civic / travel journalism** for Chennai readers. It unpacks the official **TNIKF** site, a Department of Tourism / Global Media Box festival, and named newspaper previews.

It is **not** official Tourism Department copy, a ticket, or a weather guarantee. Kite hours move with wind and rain. Third-party listings have placed this festival on the wrong beach or stretched the dates — verify **[tnikf.com](https://tnikf.com/)** before you drive the length of ECR.

## Fact box

| Item | Detail |
| --- | --- |
| **Festival** | 5th Tamil Nadu International Kite Festival |
| **When** | 14–16 August 2026 (today and tomorrow still on) |
| **Hours** | 2:00 pm–sunset; LED kites after sunset toward 7:00 pm |
| **Where** | TTDC Ocean View, Devaneri / ECR, Mamallapuram |
| **Entry** | Free beach event |
| **Organisers** | Department of Tourism, Tamil Nadu, with Global Media Box |
| **Theme** | Save Marine Life |
| **Sunday extra** | Red Bull F1 static display (16 August) |
| **Enquiries** | 95000 90850 (listed on the official site) |
| **MCC listing** | [Event page](${KITE_EVENT_PATH}) |

## What’s in the sky this weekend

**Chennai, 15 August 2026** — Independence weekend on ECR is a colour story as much as a traffic story. From **TTDC Ocean View**, the official site describes a family carnival around a **professional international kite show**: giant kites, inflatable show kites, beach food, shopping, and a kids photo corner.

DT Next’s preview — the same facts that circulated on the Unseen Chennai-style poster — put **more than 30 professional flyers** and **over 200 giant kites** over Mamallapuram, with Tamil Nadu’s professional team **Skyuters** flying award-winning designs. Tourism Minister **S. Rajesh Kumar** was scheduled to inaugurate on **14 August**.

The **Save Marine Life** theme is the visual brief: the official site talks of dolphins, sharks, octopuses and other sea-creature kites filling the coastal sky. That is the photograph families will take. It is also why a hobby diamond kite in the same airspace is a safety problem, not a cute extra.

### Tamil icons as kites — not a public fly-in

**The Hindu** (9 August) reported that TNIKF is using giant kites to carry Tamil Nadu’s cultural icons. After Jallikattu-bull and Thanjavur-doll designs, this year’s new kite is **Poikkal Kuthirai** (dummy horse). Curator **Benedict Savio** (Global Media Box) told the paper a kite takes about **two months** to make; next year’s plan named a **Nilgiri tahr** kite.

Treat DT Next’s line on “Poikkal Kuthirai and Thanjavur dancing dolls” as **show kites / cultural display**, unless you see a separate folk-dance stage on the ground. Do not assume a full dummy-horse performance just because the kite exists.

Tamil Nadu Director of Tourism **V.P. Jeyaseelan** told The Hindu the long-term aim is flyers from **30+ countries**, **1,000+ kites**, and an international aerobatic championship. That is **ambition**, not this weekend’s headcount. This weekend is still **30+ flyers** and **200+ giant kites**.

The Hindu also said the festival has grown from about **5,000** visitors to **more than 40,000**, which is why entry is **free** this year — a crowd magnet on a corridor that already jams after lunch.

## Practical: going from Chennai today or tomorrow

- **Leave south of Thiruvanmiyur before lunch** if kites are the point. 2:00 pm flying plus ECR southbound is a predictable pinch at Neelankarai, Uthandi and the Mamallapuram approach.
- **Free entry is not free parking.** Ocean View will fill. Have a walk-in plan from a side road rather than circling the gate.
- **Do not pack a hobby kite.** Official FAQ: public flying inside the ground can interfere with professional lines.
- **Weather vetoes the show.** No flying in rain or bad wind. LED night kites are **sunset to about 7:00 pm**, only if the sky cooperates.
- **Sunday extra:** Red Bull F1 static display — a parked spectacle, not a race. Confirm it is still listed if you are going only for that.
- **Same town, different ticket:** the **WSL Shore Temple Classic** is also in Mamallapuram through **16 August**. UNESCO Shore Temple is a short hop. They share a coastline, not a wristband. [Surf listing](${SURF_EVENT_PATH}) · [ECR weekend loop](${ECR_WEEKEND_PLAN_PATH}).

Some listings still say **Thiruvidanthai Beach** or stretch the dates to **17 August**. The official venue is **TTDC Ocean View, Mamallapuram ECR**, **14–16 August**. Use the official map link on [tnikf.com](https://tnikf.com/).

## Sources

- [TNIKF official site](https://tnikf.com/) — dates, TTDC Ocean View, free entry, 2 pm–sunset, no public kite-flying, Save Marine Life, Red Bull F1 on 16 Aug, enquiry number
- [DT Next preview](https://www.dtnext.in/news/tamilnadu/tamil-nadu-international-kite-festival-to-take-flight-in-mamallapuram-this-weekend-check-details-here) (12 Aug 2026) — 30+ flyers, 200+ giant kites, Skyuters, LED after sunset
- [The Hindu — Poikkal Kuthirai kite](https://www.thehindu.com/news/national/tamil-nadu/poikkal-kuthirai-to-join-tamil-nadus-cultural-icons-in-the-skies/article71314488.ece) (9 Aug 2026) — cultural-icon kites, visitor growth, free-entry rationale, Tourism Director quotes
- Festival poster circulated this week (Unseen Chennai-style artwork; facts match DT Next) — self-hosted on this page
- [MCC event listing](${KITE_EVENT_PATH}) · [TTDC ECR weekend news](${TTDC_ECR_NEWS_PATH})`.trim();

  const analysisBody = `## Analysis

A free professional kite show on ECR during Independence weekend is not a niche hobby meet. It is Tamil Nadu Tourism using **spectacle** the way other states use a hill-station season: stack a photographable sky, a UNESCO town, and a world-circuit surf event on the one road Chennai already drives for leisure.

That is also why the poster can oversell the afternoon. **2:00 pm until sunset** is a short window. Parking will be worse than the kite line. If the wind dies or a squall comes through, the entire reason you sat in ECR traffic disappears. Treat this as a **weather-dependent beach carnival**, not a booked show with a curtain time.

The cultural-icon kites are the smarter long game. A Poikkal Kuthirai kite is easier to export to another country’s festival than a full folk troupe. The Hindu quotes make that strategy explicit. For a Chennai family this Saturday, it still just means: look up, don’t fly your own, and leave a buffer for Shore Temple before dusk.

## Why Chennai readers should care

1. **This is a south-city traffic story** — Thiruvanmiyur to Mamallapuram will take the festival load this afternoon and Sunday.
2. **Free does not mean empty** — 40,000-scale footfall (The Hindu’s growth claim) on a beach field with one main approach road.
3. **Wrong-venue listings exist** — pin **TTDC Ocean View**, not a random ECR beach name from an older roundup.
4. **Last flying day is tomorrow** — 16 August, with the F1 static display listed as the extra.

## What to do if you go

- Open the **[event listing](${KITE_EVENT_PATH})** for calendar / maps, then the **[ECR weekend plan](${ECR_WEEKEND_PLAN_PATH})** if you want Shore Temple or TTDC lunch on the same drive.
- Carry water, a hat, and a modest cover-up if you will walk to the Shore Temple precinct.
- Recheck **[tnikf.com](https://tnikf.com/)** if the sky looks like rain before you commit the full ECR.

## Related reading on mychennaicity.in

- **[Tamil Nadu International Kite Festival — event](${KITE_EVENT_PATH})**
- **[This weekend ECR plan](${ECR_WEEKEND_PLAN_PATH})** — temple, DakshinaChitra, boats, ₹99 biryani, kites, UNESCO, surf
- **[TTDC ECR weekend news desk](${TTDC_ECR_NEWS_PATH})**
- **[Shore Temple Classic surfing](${SURF_EVENT_PATH})**
- **[Chennai local events — this weekend](/chennai-local-events#events-weekend)**
- **[Festivals calendar](/guides/chennai-festivals-calendar)**

## Fine print — AI-assisted authoring

This report was prepared with **AI-assisted news authoring** and human editorial review.
AI tools can sometimes make mistakes — mix kite themes with live performances, copy a wrong beach name from a third-party listing, or miss a same-day weather cancellation.
Please cross-check hours, venue, and flying status with [TNIKF](https://tnikf.com/) before you travel.`.trim();

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
      "Tamil Nadu International Kite Festival: giant kites over Mamallapuram through Sunday",
    summary:
      "The 5th TNIKF is on at TTDC Ocean View, Mamallapuram ECR — 14–16 August 2026. Free entry, 2 pm until sunset, 30+ professional flyers and 200+ giant kites. Do not fly personal kites. Last day Sunday, with a Red Bull F1 static display listed.",
    dek: "Day two of three on ECR: professional show kites, a Save Marine Life sky, and a weather veto. Practical notes for Chennai drivers.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: "https://tnikf.com/",
    sourceName: "TNIKF official site; DT Next; The Hindu",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "When and where is the kite festival?",
          answer:
            "14–16 August 2026 at TTDC Ocean View, Mamallapuram ECR. Remaining days: Saturday 15 and Sunday 16. Official hours: 2:00 pm until sunset; LED kites after sunset toward 7:00 pm, weather permitting.",
        },
        {
          question: "Is entry free? Can I fly my own kite?",
          answer:
            "Entry is free. You cannot fly a personal kite on the festival ground — it is a professional international show. Official FAQ is explicit on this.",
        },
        {
          question: "What will I actually see?",
          answer:
            "30+ professional flyers from Thailand, Singapore, Malaysia, Indonesia, Vietnam and India; 200+ giant and inflatable show kites; Save Marine Life theme; Tamil cultural-icon kites including Poikkal Kuthirai this year. Sunday 16 August lists a Red Bull F1 static display.",
        },
        {
          question: "Where is the Chennai drive plan?",
          answer: `Event: https://mychennaicity.in${KITE_EVENT_PATH}. Full ECR loop: https://mychennaicity.in${ECR_WEEKEND_PLAN_PATH}.`,
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-tnikf-news] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-tnikf-news] Inserted article:", SLUG);
  }

  console.log("[seed-tnikf-news] Public URL:", ARTICLE_URL);
  console.log("[seed-tnikf-news] Hero image:", HERO_IMAGE_URL);

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-tnikf-news",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
