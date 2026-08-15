/**
 * TTDC / Tamil Nadu Tourism — This Weekend ECR Plan (Independence weekend 2026).
 *
 * Dev:  `npm run db:seed:ttdc-ecr-weekend-plan-august-2026`
 * Live: `npm run db:seed:ttdc-ecr-weekend-plan-august-2026:live`
 *
 * X/Twitter (after live):
 * Tamil Nadu Tourism’s this-weekend ECR loop is live on the coast: temple → DakshinaChitra → Muttukkadu boats → ₹99 TTDC biryani → kite festival → Shore Temple → WSL surf.
 * https://mychennaicity.in/chennai-local-news/ttdc-this-weekend-ecr-plan-august-2026
 * #Chennai #ECR #Mamallapuram #TTDC #KiteFestival #mychennaicity
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
  SURFING_EVENT_SLUG,
  TTDC_ECR_NEWS_SLUG,
} from "../src/content/tourism";

const HERO_IMAGE_URL =
  "/images/articles/ttdc-this-weekend-ecr-plan-august-2026.png";
const TOURISM_PAGE = `https://mychennaicity.in${ECR_WEEKEND_PLAN_PATH}`;
const ARTICLE_URL = `https://mychennaicity.in/chennai-local-news/${TTDC_ECR_NEWS_SLUG}`;
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

export const SLUG = TTDC_ECR_NEWS_SLUG;

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

  /** Saturday 15 August 2026, late morning IST — mid-festival weekend. */
  const publishedAt = new Date("2026-08-15T11:15:00.000+05:30");
  const now = new Date();

  const reportBody = `## Key takeaways

- **Tamil Nadu Tourism / TTDC** has circulated a poster titled **This Weekend ECR Plan** — a Chennai loop along **East Coast Road** tagged **Spiritual · Culture · Food · Adventure**.
- The loop runs **Chennai → Marundeeswarar Temple → DakshinaChitra → Muttukkadu boating → TTDC lunch → kite festival → Mamallapuram UNESCO monuments → surfing championship → back to Chennai**.
- The kite stop is the **5th Tamil Nadu International Kite Festival**, **14–16 August 2026**, at **TTDC Ocean View**, Mamallapuram ECR — **free entry**, professional kites typically **2:00 pm until sunset**.
- The surf stop matches the **World Surf League Shore Temple Classic QS 2,000 & Pro Junior**, **12–16 August 2026**, at Mahabalipuram.
- Lunch on the poster is **TTDC 99 rupees chicken biryani** — a July 2026 TTDC hotel promotion. Confirm the kitchen on ECR before you queue.
- **Driveable unpack:** [This weekend ECR plan](${ECR_WEEKEND_PLAN_PATH}) on our tourism desk.

## Disclaimer

This article is **civic / travel journalism** for Chennai readers. It unpacks a **Tamil Nadu Tourism Development Corporation (TTDC)** and **Department of Tourism** weekend poster plus named festival and sporting calendars.

It is **not** an official TTDC itinerary, ticket, or hotel voucher. Boat slots, ASI monument hours, kite-flying weather, WSL heat calls, and the ₹99 biryani outlet can change the same day. Verify with [TNIKF](https://tnikf.com/), [TTDC](https://www.ttdconline.com/), [WSL](https://www.worldsurfleague.com/events/2026/qs/547/shore-temple-classic-qs-2000-pro-junior/main), and on-ground counters before you travel.

## Fact box

| Item | Detail |
| --- | --- |
| **Poster** | Tamil Nadu Tourism — “This Weekend ECR Plan” |
| **Corridor** | East Coast Road, Chennai → Mamallapuram and back |
| **Pillars** | Spiritual · Culture · Food · Adventure |
| **Kite festival** | 14–16 Aug 2026, TTDC Ocean View, ECR |
| **Surf championship** | WSL Shore Temple Classic, 12–16 Aug 2026 |
| **Lunch callout** | TTDC ₹99 chicken biryani (confirm outlet) |
| **UNESCO stop** | Mamallapuram Group of Monuments (Shore Temple) |
| **MCC tourism page** | [Stop-by-stop ECR plan](${ECR_WEEKEND_PLAN_PATH}) |

## What the poster actually shows

**Chennai, 15 August 2026** — On Independence Day weekend, Tamil Nadu Tourism is selling a simple idea: you do not need a hill-station booking to have a state-branded Saturday. The **ECR plan** is a **circular day** that starts in the city (the poster uses a red heritage-building icon) and threads eight beats south along the coast.

The sequence on the dashed path:

1. **Chennai** — start / finish.
2. **Marundeeswarar Temple**, Thiruvanmiyur — the spiritual stop; a living seaside Shiva temple on the ECR approach.
3. **DakshinaChitra**, Muttukadu — living-heritage campus of South Indian houses and crafts.
4. **Muttukkadu boating** — TTDC backwaters; the poster’s photo is water-sport energy, not only a calm ferry.
5. **Lunch (TTDC special)** — plate of chicken biryani with raita and gravy, plus a hard callout: **TTDC 99 rupees chicken biryani**.
6. **Kite Festival, Mamallapuram** — giant colour kites over a crowded beach field.
7. **Mamallapuram Group of Monuments (UNESCO)** — Shore Temple.
8. **Surfing championship, Mamallapuram** — a rider on a breaking wave.

A footer line on the artwork reads **Free beaches. Better days.** That is campaign copy, not a legal guarantee of empty sand.

## This weekend’s two headline events

### Kite festival (14–16 August)

The **5th Tamil Nadu International Kite Festival (TNIKF)** is at **TTDC Ocean View**, Mamallapuram ECR, organised with **Global Media Box** and the **Department of Tourism**. The official site lists **free beach-event entry**, professional flyers from **Thailand, Singapore, Malaysia, Indonesia, Vietnam and India**, giant and inflatable show kites, and a **Save Marine Life** theme.

**Hours (official FAQ, weather permitting):** kites from **2:00 pm until sunset**; LED kites after sunset toward **7:00 pm**. **Visitors may not fly personal kites** on the festival ground — it is a professional show. **16 August** is listed with a **Red Bull F1 static display**. DT Next reported more than **30** professional flyers and **200+** giant kites, with Tourism Minister **S. Rajesh Kumar** scheduled to inaugurate on **14 August**.

**MCC listing:** [Tamil Nadu International Kite Festival](${KITE_EVENT_PATH}).

### Surfing championship (12–16 August)

The poster’s last adventure stop lines up with the **WSL Shore Temple Classic QS 2,000 & Pro Junior** at Mahabalipuram — the League’s return to India and the country’s **first WSL Pro Junior**. Sportstar reported a field of about **120** surfers from around **12** countries. Heats move with swell; standby mornings are normal. Last scheduled competition day: **16 August 2026**.

**MCC listing:** [Shore Temple Classic surfing](${SURF_EVENT_PATH}).

## The ₹99 biryani — what we can (and cannot) say

In **July 2026**, TTDC announced a **₹99 chicken biryani** at selected hotels: roughly **450–500 g**, with **onion raita** and **brinjal gravy**, often on **weekends**, as an affordable tourist meal while restaurant prices rose. Early rollout names included hill and inland properties (Ooty, Kodaikanal, Coimbatore, Hosur and others) — **not** a published guarantee that every ECR kitchen is on the scheme this Saturday.

The **poster itself** is the coastal marketing of that plate. Treat it as: **ask at Hotel Tamil Nadu / TTDC Ocean View / the nearest TTDC restaurant**. Vegetarian travellers should use the regular menu; this callout is chicken biryani only.

## Sources

- Tamil Nadu Tourism / TTDC poster, “This Weekend ECR Plan” (reproduced on [the tourism page](${ECR_WEEKEND_PLAN_PATH}))
- [TNIKF official site](https://tnikf.com/) — 14–16 Aug 2026, TTDC Ocean View, free entry, 2 pm–sunset
- [DT Next kite-festival preview](https://www.dtnext.in/news/tamilnadu/tamil-nadu-international-kite-festival-to-take-flight-in-mamallapuram-this-weekend-check-details-here)
- [WSL Shore Temple Classic](https://www.worldsurfleague.com/events/2026/qs/547/shore-temple-classic-qs-2000-pro-junior/main)
- [Sportstar — WSL returns to India](https://sportstar.thehindu.com/other-sports/wsl-world-surfing-league-returns-to-india-shore-temple-classic-qs-2000-pro-junior-tamil-nadu/article71294081.ece)
- [TTDC ₹99 biryani rollout](https://en.channeliam.com/2026/07/13/ttdc-rs99-chicken-biryani-offer-tamil-nadu-tourism/)
- [TTDC booking portal](https://www.ttdconline.com/)`.trim();

  const analysisBody = `## Analysis

Tamil Nadu Tourism is doing something structurally smart this weekend: it is **stacking** a free spectacle (kites), a world-circuit sport (WSL), a UNESCO town, and a **price-shock lunch** on the one corridor Chennai already drives for leisure. You do not need a new airport or a hill-station hotel night. You need ECR, a full tank, and the humility to drop two stops if the kite field is the point.

That is also why the poster can mislead if you read it as a **timed package**. DakshinaChitra wants 90 minutes. ASI monuments close toward dusk. Kites start at **2:00 pm**. Surf heats may already be on standby at dawn. One family cannot “complete” every photograph on the artwork without rushing the temple and skipping the Rathas. The honest use of the poster is as a **menu**, not a checklist.

The ₹99 biryani is the political-economy beat hiding in a food photo. TTDC is a state corporation competing with private beach restaurants on the same road. A three-figure chicken plate is a **crowd magnet** and a **message about inflation**. It only works if the named kitchen actually has stock when you arrive — which is why this desk refuses to pretend Ocean View is confirmed on the original 21-outlet list.

## Why Chennai readers should care

1. **This is a south-city traffic story** — Thiruvanmiyur, Neelankarai, Uthandi, Muttukadu and the Mamallapuram pinch will take the festival load this afternoon and Sunday.
2. **Free entry is not free parking** — TTDC Ocean View will fill; start south of Thiruvanmiyur before lunch if kites are the goal.
3. **Two calendars overlap** — kites (tourism + private organiser) and WSL (sport). They share a town, not a ticket.
4. **UNESCO + beach event** — Shore Temple is still a living monument precinct; the kite field is a carnival. Keep the two codes of behaviour straight.

## What to do if you go today or tomorrow

- Open the **[stop-by-stop ECR plan](${ECR_WEEKEND_PLAN_PATH})** and pick four stops, not eight.
- Carry water, a hat, and a modest cover-up for temple and Shore Temple.
- Do **not** pack a hobby kite for the festival ground.
- Recheck **WSL** in the morning and **TNIKF** if the sky looks like rain — kites do not fly in a storm.

## Related reading on mychennaicity.in

- **[This weekend ECR plan](${ECR_WEEKEND_PLAN_PATH})** — full stop cards, Saturday pacing, FAQ.
- **[Kite festival event](${KITE_EVENT_PATH})** · **[Surf championship event](${SURF_EVENT_PATH})**
- **[Chennai local events — this weekend](/chennai-local-events#events-weekend)**
- **[Temple quiet-hour guide](/guides/chennai-temple-quiet-hours)** · **[Festivals calendar](/guides/chennai-festivals-calendar)** · **[Biryani bracket](/guides/chennai-biryani-bracket)**

## Fine print — AI-assisted authoring

This report was prepared with **AI-assisted news authoring** and human editorial review.
AI tools can sometimes make mistakes — misread hours, miss a weather cancellation, or over-state a food offer.
Please cross-check kite hours, monument tickets, boat counters, and the ₹99 biryani with TTDC, TNIKF, ASI, and WSL before you travel.`.trim();

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
      "TTDC this-weekend ECR plan: kites, Shore Temple, and ₹99 biryani from Chennai",
    summary:
      "Tamil Nadu Tourism’s East Coast Road loop for 14–16 August 2026 — Marundeeswarar, DakshinaChitra, Muttukkadu boats, TTDC ₹99 chicken biryani, the Mamallapuram kite festival, UNESCO monuments, and the WSL Shore Temple Classic.",
    dek: "Independence weekend on ECR — a state tourism poster unpacked into a driveable Chennai loop, with kite and surf dates you can verify.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: "https://tnikf.com/",
    sourceName: "Tamil Nadu Tourism / TTDC poster; TNIKF; WSL Shore Temple Classic",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "Is this a bookable TTDC tour?",
          answer:
            "No. It is a suggested Chennai–ECR loop on a Tamil Nadu Tourism poster. Each stop has its own ticket, boat counter, or free beach entry.",
        },
        {
          question: "When and where is the kite festival?",
          answer:
            "14–16 August 2026 at TTDC Ocean View, Mamallapuram ECR. Free entry; professional kites typically 2:00 pm until sunset. Do not fly personal kites on the ground.",
        },
        {
          question: "Is the ₹99 biryani confirmed on ECR?",
          answer:
            "TTDC launched a ₹99 chicken biryani at selected hotels in July 2026. The poster advertises it as the lunch stop. Ask at the specific TTDC restaurant — coastal kitchens may differ from the first 21 outlets.",
        },
        {
          question: "Where is the full stop-by-stop plan?",
          answer: `https://mychennaicity.in${ECR_WEEKEND_PLAN_PATH}`,
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-ttdc-ecr] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-ttdc-ecr] Inserted article:", SLUG);
  }

  console.log("[seed-ttdc-ecr] Public URL:", ARTICLE_URL);
  console.log("[seed-ttdc-ecr] Tourism page:", TOURISM_PAGE);
  console.log("[seed-ttdc-ecr] Hero image:", HERO_IMAGE_URL);

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-ttdc-ecr",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
