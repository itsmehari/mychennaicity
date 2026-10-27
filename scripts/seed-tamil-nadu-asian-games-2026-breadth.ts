/**
 * Tamil Nadu at Asian Games 2026 — breadth feature (not medal-only).
 *
 * Dev:  `npm run db:seed:tamil-nadu-asian-games-2026-breadth`
 * Live: `npm run db:seed:tamil-nadu-asian-games-2026-breadth:live`
 *
 * Hero: public/images/articles/tamil-nadu-asian-games-2026-team-india-cricket-gold-hero.png
 * (India women’s cricket gold podium, Aichi-Nagoya 2026 — includes TN’s G. Kamalini.)
 *
 * Companion piece: seed-vithya-ramraj-asian-games-2026.ts
 * Contingent figures and results are interim through ~30 Sep 2026; Games end 4 Oct.
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const SLUG = "tamil-nadu-asian-games-2026-athletes-breadth-aichi-nagoya";
const HERO =
  "/images/articles/tamil-nadu-asian-games-2026-team-india-cricket-gold-hero.png";

const DAILY_THANTHI_CONTINGENT =
  "https://www.dailythanthi.com/sports/othersports/asian-games-36-athletes-from-tamil-nadu-in-the-indian-squad";
const SPORTSTAR_ATHLETICS_SQUAD =
  "https://sportstar.thehindu.com/asian-games/news/asian-games-2026-india-athletics-squad-full-list-athletes-events/article71455455.ece";
const VITHYA_LOCAL =
  "/chennai-local-news/vithya-ramraj-asian-games-2026-three-medals-national-record";
const BARANICA =
  "https://sportstar.thehindu.com/asian-games/baranica-elangovan-pole-vault-bronze-medal-asian-games-2026-first-indian-record-asiad/article71508572.ece";
const VISHAL_RELAY =
  "https://timesofindia.indiatimes.com/sports/asian-games-2026/vishal-tk-holds-off-thailand-as-india-race-to-mens-4x400m-relay-bronze-at-asian-games/articleshow/134565986.cms";
const ELAVENIL =
  "https://sportstar.thehindu.com/asian-games/news/elavenil-valarivan-india-wins-silver-medal-asian-games-2026-shooting-women-10m-air-rifle-final-results/article71487221.ece";
const JOSHNA_VELAVAN =
  "https://www.olympics.com/en/news/asian-games-2026-squash-joshna-chinappa-velavan-senthilkumar-bronze";
const ABHAY =
  "https://sportstar.thehindu.com/asian-games/asian-games-2026-abhay-singh-silver-eain-yow-gold-mens-singles-squash-final/article71515550.ece";
const KAMALINI_REWARD =
  "https://sportstar.thehindu.com/asian-games/tamil-nadu-chief-minister-vijay-75-cash-reward-for-g-kamalini-asian-games-gold-aichi-nagoya-2026/article71496891.ece";
const DAVID_SOLOMON =
  "https://sportstar.thehindu.com/asian-games/news/david-solomon-added-india-asian-games-2026-squad-long-jump/article71473965.ece";
const ORGANISERS = "https://www.aichi-nagoya2026.org/";

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

  /** 30 Sep 2026, afternoon IST */
  const publishedAt = new Date("2026-09-30T09:50:00.000Z");
  const now = new Date();

  const reportBody = `## Disclaimer

This is a MyChennaiCity **civic sports journalism** feature on Tamil Nadu’s representation at the **20th Asian Games** in Aichi-Nagoya. It summarises published contingent lists, results desks and state-government reward announcements available on **30 September 2026**. It is **not** an official Asian Games, Indian Olympic Association, Athletics Federation of India, Sports Authority of India or Tamil Nadu Sports Development Authority communication.

Medal colours, rankings and the India table can still move — the Games run until **4 October 2026**. Hometown districts named below follow published reports; some athletes train away from their birthplace. Verify standings with the [Aichi-Nagoya 2026 organisers](${ORGANISERS}) before treating any total as final.

## Key takeaways

- Tamil Nadu’s Asian Games story is **breadth**, not one athlete or one sport.
- India’s original contingent included **36** athletes from Tamil Nadu (**22** men, **14** women); later reporting put the state figure at **37** after long jumper **David Patturaj Solomon** was added.
- Athletics alone put a deep Tamil Nadu group on India’s track-and-field squad — sprints, middle distance, hurdles, relays, jumps, pole vault and throws.
- Medal makers include **Vithya Ramraj**, **T.K. Vishal**, **Baranica Elangovan**, **Elavenil Valarivan**, **Abhay Singh**, **Joshna Chinappa**, **Velavan Senthilkumar**, **Hariharan Amsakarunan** and cricketer **G. Kamalini**.
- Reaching the Asian Games still matters for athletes who do not finish on the podium. A medal-only frame erases how state sporting systems actually work.

## Summary

**Chennai, 30 September 2026** — Tamil Nadu’s Asian Games story cannot be reduced to one athlete, one city or even one sport. The state’s contingent represents an unusually broad sporting ecosystem stretching across districts, generations and disciplines.

From track and field to squash, shooting, badminton, fencing and cricket, Tamil Nadu has emerged as one of India’s most broadly represented sporting states at Aichi-Nagoya 2026. Some athletes have won medals. Some have rewritten Indian records. Others simply reached the continental stage — and that still counts.

The real story is **breadth**.

## What are the Aichi-Nagoya Asian Games?

The **20th Asian Games** are being held across **Aichi Prefecture** and **Nagoya**, Japan, from **19 September to 4 October 2026**.

India entered with a **500-plus** athlete contingent across dozens of sports after Hangzhou’s record medal haul three years earlier. Athletics ran at the **Nagoya City Mizuho Park Athletic Stadium**; cricket, squash, shooting and fencing used venues across the Games cluster.

This feature is not a live medal ticker. It is a state-level reading of who Tamil Nadu sent, who medalled, and what that pattern says about the state’s sporting base while the Games are still open.

## Nearly three dozen athletes: the Tamil Nadu contingent

### Tamil Nadu → Team India

| | |
| --- | --- |
| **Athletes from Tamil Nadu (initial published list)** | **36** |
| Men | **22** |
| Women | **14** |
| Later reported state figure | **37** (after David Solomon’s late athletics addition) |
| Footprint | Multiple sports — athletics, squash, shooting, badminton, fencing, cricket and more |
| Reading | One of India’s stronger state representations at these Games |

Daily Thanthi reported **36** Tamil Nadu athletes in India’s squad when the contingent was announced — **22** men and **14** women. Times of India later listed Tamil Nadu at **37** in a state-wise breakdown after late additions, including Tamil Nadu long jumper **David Patturaj Solomon**.

Those numbers already change the editorial premise. Tamil Nadu did not send a handful of stars. It sent a **contingent**.

## Tamil Nadu’s medal makers

### Vithya Ramraj — Coimbatore; gold, silver, bronze and a national record

Vithya remains a headline performer: **silver** in the mixed **4×400m**, a **national-record bronze** in the women’s **400m hurdles** (**54.75** seconds — the first Indian woman under 55, breaking **P.T. Usha**’s **55.42** from the **1984** Olympics), and **gold** as the anchor of India’s women’s **4×400m**.

Full medal-by-medal write-up: [Tamil Nadu’s Vithya Ramraj breaks P.T. Usha’s record and wins three Asian Games medals](${VITHYA_LOCAL}).

She is one branch of a wider Tamil Nadu story — not the whole tree.

Union sports minister Mansukh Mandaviya posted her hurdles bronze the same day.

https://x.com/mansukhmandviya/status/2104533321585967223

The Athletics Federation of India posted India’s women’s 4×400m gold celebration — Vithya on the anchor.

https://x.com/afiindia/status/2104917539935695295

### T.K. Vishal — Tamil Nadu’s other major relay story

Vishal deserves equal weight in the athletics narrative.

He helped India win **silver** in the mixed **4×400m** alongside Vithya, then played a decisive role in the men’s **4×400m bronze**. On the **anchor** leg he held off Thailand to keep India on the podium as the quartet clocked **3:01.61**.

The athletics story is therefore not “Vithya won three medals.” It is:

**Tamil Nadu athletes were central to India’s 400m relay programme.**

### Baranica Elangovan — Mayiladuthurai; India’s first Asian Games pole-vault medal

Baranica cleared **4.15 metres** for a **shared bronze** in the women’s pole vault — the **first Asian Games pole-vault medal** by an Indian athlete, male or female.

That result expands the geography of the story beyond Coimbatore and Chennai, and it expands the event map beyond the 400m corridor.

### Elavenil Valarivan — shooting silvers

Elavenil contributed strongly on the ranges: **silver** in the women’s **10m air rifle** individual final (**252.4**, behind Japan’s Games-record **253.0**) and **silver** earlier the same day in the women’s **10m air rifle team** event with Sonam Maskar and Vidarsa Vinod.

Tamil Nadu’s medal influence therefore reaches one of India’s strongest Olympic sporting disciplines.

### Abhay Singh — squash silver

Abhay reached the men’s singles final and took **silver**, losing to Malaysia’s Ng Eain Yow. The Tamil Nadu government announced a **₹50 lakh** award for the performance.

### Joshna Chinappa — Chennai’s squash institution

Joshna and **Velavan Senthilkumar** won mixed doubles **bronze**. Joshna’s Asian Games career now spans **seven** editions and **six** medals — extraordinary longevity.

She gives the feature a different register from Vithya:

- Vithya is an athlete hitting a new peak.
- Joshna is two decades of sustained elite performance.

### Velavan Senthilkumar — the next squash generation

Velavan should not appear only as Joshna’s partner. He represents the next generation of Tamil Nadu squash. Their shared podium is almost symbolic: one generation handing the baton to another.

### Hariharan Amsakarunan — badminton bronze

Hariharan was part of India’s men’s badminton **team bronze**. The state announced a **₹30 lakh** incentive. That places badminton inside Tamil Nadu’s Asian Games footprint alongside squash.

### G. Kamalini — cricket gold

Young Tamil Nadu cricketer **G. Kamalini** (Madurai) was part of India’s women’s cricket squad that won **gold** — India’s first gold of these Games — with a dominant final win over Sri Lanka. The state announced a **₹75 lakh** award.

The hero photograph with this report shows India’s women’s cricket team on the Aichi-Nagoya podium, medals in their teeth — the collective image of a gold that Tamil Nadu shares through Kamalini.

@PMOIndia congratulated the Women in Blue after the gold — India’s first of these Games.

https://x.com/PMOIndia/status/2102314505049079943

### Tamil Nadu’s generations

| Generation | Athletes | Role in the story |
| --- | --- | --- |
| Veteran | Joshna Chinappa | Longevity across seven Asiads |
| Established internationals | Elavenil Valarivan, C.A. Bhavani Devi, Abhay Singh | Olympic / world-circuit depth |
| Emerging elite | Vithya Ramraj, T.K. Vishal, Baranica Elangovan | Peak performances in Nagoya |
| Next generation | G. Kamalini and younger squad members | Continuity beyond this Games |

## Beyond the podium

Medal-only coverage distorts how sporting ecosystems work.

Even reaching the Asian Games means an athlete is among India’s highest performers in that discipline. Tamil Nadu’s athletics representation alone has included names such as:

| Athlete | Event focus |
| --- | --- |
| T.K. Vishal | 400m / 4×400m |
| Rajesh Ramesh | 400m / 4×400m |
| Abinaya Rajarajan | 4×100m |
| Gowthami Jayaraman | 800m |
| Santhosh Tamilarasan | 400m hurdles |
| Vithya Ramraj | 400m hurdles / relays |
| Nandhini K. | 100m hurdles |
| Praveen Chithravel | Triple jump |
| I. Asha Ilango (Asha Elango) | Triple jump |
| Aadarsh Ram | High jump |
| Baranica Elangovan | Pole vault |
| Krishna Jayasankar | Shot put |
| David Patturaj Solomon | Long jump (late addition) |

**C.A. Bhavani Devi** belongs here too. India’s first Olympic fencer was selected for the Asian Games fencing team. Representation is the point of this feature — not a manufactured medal-only narrative.

That is why the title says **Tamil Nadu at the Asian Games**, not only **Tamil Nadu’s medal winners**.

## A map of Tamil Nadu’s sporting talent

A full clickable map should only ship after every hometown is verified against primary bios — training base is not birthplace. Until then, a careful shelf:

| Place (as reported) | Athletes | Sport |
| --- | --- | --- |
| Chennai | Joshna Chinappa, Abhay Singh, C.A. Bhavani Devi (and the city’s academy / SDAT ecosystem) | Squash, fencing |
| Coimbatore | Vithya Ramraj | Athletics |
| Mayiladuthurai | Baranica Elangovan | Pole vault |
| Madurai | G. Kamalini | Cricket |
| Jolarpettai | T.K. Vishal | Athletics |
| Other districts / institutions | Remaining contingent members | Multiple |

Visually the story already expands:

**Chennai** ←→ **Mayiladuthurai** ←→ **Coimbatore** ←→ **Madurai** ←→ other districts.

## Why athletics matters so much

Tamil Nadu’s presence inside India’s athletics squad is not a one-event spike. Look at the event spread represented by Tamil Nadu athletes:

- 400m and relays
- 800m
- 100m hurdles and 400m hurdles
- High jump, triple jump, long jump
- Pole vault
- Shot put

That does not look like one coaching group accidentally producing two runners. It suggests **systemic breadth** — depth across track *and* field.

## Chennai’s special role

Because this is MyChennaiCity.in, Chennai still gets a section — without hijacking the statewide narrative.

Why does Chennai keep producing or developing elite athletes?

- Squash infrastructure and long-running academies
- Fencing pathways that produced India’s first Olympic fencer
- Shooting facilities and high-performance access
- SDAT systems and Nehru Stadium–area athletics culture
- Colleges, universities and institutional teams (including Railways pathways for athletes such as Solomon)
- Sports science / physiotherapy access relative to many districts
- Hosting experience for national and international meets

The more honest conclusion is not “Chennai did this alone.” It is:

**Tamil Nadu’s strength may lie in district-level talent production combined with Chennai’s higher-level sporting infrastructure.**

That proposition is worth investigating beyond these Games.

## Is government investment translating into results?

This section is a question set, not propaganda.

Tamil Nadu has publicly tied cash incentives to Asian Games performances in this cycle — including **₹75 lakh** for Kamalini’s cricket gold, **₹50 lakh** awards for athletes such as Vithya, Vishal and Abhay, and **₹30 lakh** for Hariharan’s badminton bronze. Pre-Games assistance and Elite Sportsperson schemes have also been reported around the contingent.

Public-interest questions that remain open:

1. What was spent on **preparation** versus **post-medal rewards**?
2. Who received support **before** competition?
3. How much reaches **grassroots coaching** and district sports hostels?
4. Are coaches and sports scientists available **outside Chennai** at scale?
5. How does Tamil Nadu compare with Haryana, Punjab, Odisha, Karnataka and Kerala on pathway depth, not only cash cheques?

Cash rewards celebrate success. They do not, by themselves, prove a complete athlete pathway.

## The uncomfortable questions

An article celebrating success should still ask:

- Does Tamil Nadu have enough Olympic-standard facilities outside a few hubs?
- Are rural athletes getting equal access to trials, recovery and competition calendars?
- Why are certain sports still concentrated in Chennai?
- What happens to athletes **after** Asian Games success — education, jobs, long-term coaching?
- Are school systems producing athletes systematically, or are pathways still personality-driven?
- How many promising juniors disappear between age-group medals and senior Teams India?

Pride without those questions becomes brochure copy.

## The story is breadth

Tamil Nadu’s Aichi-Nagoya performance is significant not because one athlete won three medals. It is significant because athletes from the state are appearing across **track, field, shooting, squash, badminton, fencing, cricket** and other disciplines at the highest continental level.

Some have rewritten Indian records. Some have won historic firsts. Some are veterans still delivering. Some are teenagers collecting gold with Team India. Many more are simply representing India — and that is how sporting states are built.

**The real story of Tamil Nadu at the 2026 Asian Games is breadth.**

## Sources

- Tamil Nadu contingent size (36 / 22 men / 14 women): [Daily Thanthi contingent report](${DAILY_THANTHI_CONTINGENT}); later state figure of 37 in Times of India state breakdown; David Solomon addition: [Sportstar](${DAVID_SOLOMON})
- Athletics squad names and events: [Sportstar athletics squad list](${SPORTSTAR_ATHLETICS_SQUAD})
- Vithya Ramraj medals and 54.75 NR: [MyChennaiCity companion report](${VITHYA_LOCAL})
- Vishal / men’s 4×400m bronze: [Times of India](${VISHAL_RELAY})
- Baranica pole vault bronze: [Sportstar](${BARANICA})
- Elavenil shooting silvers: [Sportstar](${ELAVENIL})
- Joshna–Velavan mixed doubles bronze: [Olympics.com](${JOSHNA_VELAVAN})
- Abhay squash silver: [Sportstar](${ABHAY})
- Kamalini cricket gold + state reward: [Sportstar](${KAMALINI_REWARD})
- State cash incentives for Abhay, Hariharan and others: published CM / Sportstar / DT Next reward reports, late September 2026

## Fine print — AI-assisted authoring

This feature was prepared with **AI-assisted news authoring** and human editorial review.
AI tools can misread a live medal table, compress a multi-sport contingent or confuse training base with hometown.
The hero photograph shows India’s women’s cricket team celebrating gold on the Aichi-Nagoya podium; it was supplied with this report and is not an official Games handout. Cross-check results with the organisers before treating them as final.`;

  const analysisBody = `## Why this matters in Chennai and Tamil Nadu

Chennai readers will naturally claim Joshna, Abhay, Bhavani and parts of the athletics pipeline. The sharper reading is statewide: Coimbatore, Mayiladuthurai, Madurai, Jolarpettai and other districts are on the same map.

For a city desk, the useful question is not “Did Chennai win?” It is “Which parts of the pipeline live here — academies, SDAT, sports science, competition hosting — and which parts still depend on district talent making it to the city?”

## What to watch next

1. Final medal table through **4 October 2026**.
2. Whether post-Games cash awards are paired with published pathway spending (hostels, coaches, district science support).
3. Whether Tamil Nadu’s athletics event spread holds at the next Asian Championships and Olympic trials — breadth that appears once can still be a spike.
4. Squash succession: Joshna’s longevity versus Velavan and Abhay’s next cycle toward Los Angeles 2028 pathways.

## Conclusion

If Hangzhou taught India to expect medals, Nagoya is teaching Tamil Nadu readers to expect **range**. Track and field depth, squash continuity, shooting medals, fencing representation, badminton team bronze and a cricket gold with a Madurai teenager in the squad — that is a state sporting story, not a single highlight reel.`;

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
      "From Track to Fencing: How Tamil Nadu Is Making Its Mark at the 2026 Asian Games",
    summary:
      "Nearly three dozen Tamil Nadu athletes entered India’s Aichi-Nagoya campaign across athletics, squash, shooting, badminton, fencing and cricket. The story is breadth — medals, records and representation beyond the podium.",
    dek: "From Vithya and Vishal’s relays to Baranica’s historic pole vault, Elavenil’s shooting silvers, Chennai squash, Hariharan’s badminton bronze and Kamalini’s cricket gold — Tamil Nadu’s Asian Games footprint is unusually wide.",
    body,
    reportBody,
    analysisBody,
    category: "Sports",
    areaHubSlug: null as string | null,
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO,
    sourceUrl: DAILY_THANTHI_CONTINGENT,
    sourceName:
      "Asian Games 2026 Tamil Nadu contingent + multi-sport results desks (athletics, squash, shooting, cricket); interim through 30 Sep 2026",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "How many Tamil Nadu athletes were in India’s Asian Games squad?",
          answer:
            "Daily Thanthi reported 36 athletes from Tamil Nadu in the original contingent — 22 men and 14 women. Later reporting put Tamil Nadu at 37 after late additions such as long jumper David Patturaj Solomon.",
        },
        {
          question: "Which Tamil Nadu athletes have medalled at Aichi-Nagoya?",
          answer:
            "Among the standouts: Vithya Ramraj (mixed relay silver, 400m hurdles national-record bronze, women’s 4×400m gold), T.K. Vishal (mixed relay silver, men’s 4×400m bronze), Baranica Elangovan (pole vault bronze), Elavenil Valarivan (two shooting silvers), Abhay Singh (squash silver), Joshna Chinappa and Velavan Senthilkumar (squash mixed doubles bronze), Hariharan Amsakarunan (badminton men’s team bronze), and G. Kamalini (women’s cricket gold). The Games continue until 4 October 2026.",
        },
        {
          question: "Why does this article cover athletes who did not medal?",
          answer:
            "Reaching the Asian Games already places an athlete among India’s top performers in that event. A medal-only frame erases finalists, squad members and the wider state pipeline that produced the contingent.",
        },
        {
          question: "Is this only a Chennai story?",
          answer:
            "No. Chennai remains central for squash, fencing and high-performance infrastructure, but Coimbatore, Mayiladuthurai, Madurai, Jolarpettai and other districts are part of the same map. The feature’s premise is statewide breadth.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-tn-asian-games-breadth] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-tn-asian-games-breadth] Inserted article:", SLUG);
  }

  console.log(
    "[seed-tn-asian-games-breadth] Public URL:",
    `https://mychennaicity.in/chennai-local-news/${SLUG}`,
  );

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-tn-asian-games-breadth",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
