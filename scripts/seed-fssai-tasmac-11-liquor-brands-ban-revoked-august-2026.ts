/**
 * FSSAI ban + quick revoke on 11 Enrica liquor brands sold via TASMAC (Aug 2026).
 *
 * Dev:  `npm run db:seed:fssai-tasmac-11-liquor-brands-ban-revoked-august-2026`
 * Live: `npm run db:seed:fssai-tasmac-11-liquor-brands-ban-revoked-august-2026:live`
 *
 * Sources (press as of 16 Aug 2026): The Hindu, TNIE, DT Next, Times of India.
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

export const SLUG =
  "fssai-tasmac-11-liquor-brands-ban-revoked-enrica-august-2026";

const HERO =
  "/images/articles/fssai-tasmac-11-liquor-brands-ban-revoked-august-2026-hero.png";

const SOURCE_HINDU =
  "https://www.thehindu.com/news/national/tamil-nadu/fssai-makes-u-turn-revokes-order-against-enrica-products/article71350141.ece";
const SOURCE_TNIE_REVOKE =
  "https://www.newindianexpress.com/states/tamil-nadu/2026/Aug/16/tamil-nadu-fssai-flips-revokes-ban-on-11-liquor-brands";
const SOURCE_TNIE_HALT =
  "https://www.newindianexpress.com/states/tamil-nadu/2026/Aug/15/tasmac-halts-sale-transfer-of-11-liquor-brands-after-fssai-flags-artificial-flavouring";
const SOURCE_DTNEXT =
  "https://www.dtnext.in/news/tamilnadu/days-after-ban-fssai-lifts-prohibition-on-11-liquor-brands";
const SOURCE_TOI =
  "https://timesofindia.indiatimes.com/city/chennai/fssai-makes-u-turn-revokes-prohibition-order-against-11-liquor-varieties-in-tamil-nadu/articleshow/133262077.cms";

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

const ARTICLE_URL = `https://mychennaicity.in/chennai-local-news/${SLUG}`;

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

  /** Chennai, 16 August 2026 — evening desk after Sunday press wave (IST). */
  const publishedAt = new Date("2026-08-16T21:30:00.000+05:30");
  const now = new Date();

  const reportBody = `## Key takeaways

- **FSSAI** (Southern Regional Office) issued a **prohibition order on 11 August 2026** against **11 liquor varieties** from **Enrica Enterprises Pvt. Ltd.** (Poonamallee / Tiruvallur), citing **nature-identical and artificial flavouring substances**.
- **TASMAC** then told depots and retail outlets to **stop transfer and sale** of those brands (directive reported **13 August**), including sales to **FL2 / FL3** licence holders.
- On **14 August**, FSSAI **revoked** the prohibition (press cites **Section 36(3)(b)** of the Food Safety and Standards Act, 2006). Prohibition and Excise Commissioner **R. Gajalakshmi** asked TASMAC to **withdraw the stop-sale**.
- Company reportedly **appealed** and assured compliance; FSSAI issued an **improvement notice** with about **30 days** to comply, per officials quoted in *The Hindu* / *Times of India*.
- Excise Minister **K. Vignesh** said the **ban and the revoke both came from FSSAI** (central), and that the state is exploring **broader quality checks** for brands procured by TASMAC.

## Disclaimer

This article is **civic journalism** for Chennai / Tamil Nadu readers. It synthesises **press reporting** of FSSAI, Prohibition & Excise, and TASMAC communications available at the time of writing. It is **not** an official FSSAI, TASMAC, Excise Department, or manufacturer notice.

Brand lists, stock figures, and the status of shop-level sales can change as depots receive fresh instructions. **Do not treat this desk as permission to buy, sell, or stock any brand.** Verify with the latest TASMAC / Excise circular and FSSAI order before acting.

## Summary

**Chennai / Tiruvallur — August 2026:** Within days, Tamil Nadu’s liquor retail network moved from a **hard stop** on eleven Enrica-linked brands to a **lifted prohibition** — after FSSAI first flagged flavouring issues at a licensed unit in **Poonamallee**, then revoked its own order following an appeal.

The episode has drawn political criticism of the speed of the U-turn. The state Excise Minister has pushed back: quality checks for large liquor manufacturers, he said, sit with **FSSAI**, not the state food-safety machinery when turnover crosses the central threshold.

![Editorial illustration — sealed files on a desk, regulatory atmosphere](${HERO})

*Editorial illustration — regulatory paper trail, not a product ad. Photo: MyChennaiCity desk.*

## Timeline (as reported)

| Date | What happened |
| --- | --- |
| **11 Aug 2026** | FSSAI Southern Regional Office issues **prohibition** on 11 products after inspection at Enrica’s licensed premises (Poonamallee, Tiruvallur). |
| **12 Aug** | Prohibition & Excise Commissioner conveys findings to **TASMAC**. |
| **13 Aug** | TASMAC directs SRMs / DMs / depot managers to **stop depot-to-shop transfer and retail sale** until further orders. |
| **14 Aug** | FSSAI **revokes** the prohibition; Commissioner **Gajalakshmi** writes to TASMAC MD to withdraw the ban. Improvement notice / ~30-day compliance window reported. |
| **15–16 Aug** | Press coverage of the U-turn; Minister **Vignesh** says state had no role in ban or revoke; talks of wider quality checks. Shop-floor communication lagged in places because **Independence Day** closures. |

## The 11 brands named in press reports

Spellings vary slightly across outlets. Consolidated list from *The Hindu*, *TNIE*, and *DT Next*:

1. VSOP Exshaw Gold Brandy  
2. Louis Vernant XO Blended Premium Brandy  
3. McDowell’s / McDowells VSOP Brandy  
4. No.1 McDowell’s / McDowells Fine Brandy  
5. Men’s Club / Mensclub Deluxe Brandy  
6. Honey Bee Fine Brandy  
7. Enrica VSOP Select Brandy  
8. Enrica Platinum Reserve XO Brandy  
9. Enrica Premium French Brandy  
10. Veeran Special Brandy  
11. Enrica Old Indie Classic Dark Rum  

*TNIE* earlier reported roughly **20,000 cases** (48 bottles each) of the affected stock across about **4,045** outlets and **43** depots — treat that as a **source-attributed estimate**, not an official inventory audit published here.

## Why the ban, and why the revoke?

**Ban rationale (11 Aug):** FSSAI cited the presence of **nature-identical and artificial flavouring substances** in the products inspected.

**Revoke (14 Aug):** Press reports state FSSAI withdrew the prohibition under **Section 36(3)(b)** of the Food Safety and Standards Act, 2006. *DT Next* noted the revocation letter did **not** spell out a detailed public reasoning. Multiple outlets report the manufacturer **appealed** and **assured compliance**, after which an **improvement notice** replaced the hard ban, with officials saying further action is possible if the firm fails to comply within the notice period.

Officials quoted in *The Hindu* / *ToI* also indicated that **existing stock** of the varieties was treated as **consumable / sellable** once the prohibition was lifted — again, subject to whatever TASMAC finally circulates to district managers.

## What the state says

Prohibition and Excise Minister **K. Vignesh** told *The New Indian Express* that:

- He learned of the ban only on **Friday afternoon (14 Aug)** and of the revoke by **Saturday morning (15 Aug)**.
- For manufacturers above a **₹50 crore** turnover threshold, **FSSAI** — not the state food-safety department — is the quality authority.
- The department will **consult experts** on options to check quality across the many brands TASMAC procures, “possibly involving FSSAI.”

## What shoppers and licence holders should do

1. **Ask the outlet** which circular is in force today — stop-sale notices and withdraw-ban letters can lag between head office, depot, and RV shop.  
2. **Do not rely on WhatsApp forwards** for “banned forever” or “cleared forever” lists.  
3. **FL2 / FL3** holders should wait for written TASMAC / Excise confirmation before moving or displaying the named SKUs.  
4. Treat flavouring / labelling compliance as a **live regulatory issue** for the manufacturer (improvement notice), not as a closed consumer-safety verdict from this desk.

## Related reading on MyChennaiCity

- [Chennai local news](https://mychennaicity.in/chennai-local-news) — civic and statewide desk  
- [Chennai today](https://mychennaicity.in/chennai-today) — day strip and tools  

## Sources

- [The Hindu — FSSAI U-turn / Enrica products (16 Aug 2026)](${SOURCE_HINDU})  
- [TNIE — FSSAI flips, revokes ban on 11 liquor brands (16 Aug 2026)](${SOURCE_TNIE_REVOKE})  
- [TNIE — TASMAC halts sale after FSSAI flavouring flag (15 Aug 2026)](${SOURCE_TNIE_HALT})  
- [DT Next — FSSAI lifts prohibition (15 Aug 2026)](${SOURCE_DTNEXT})  
- [Times of India — FSSAI U-turn on 11 liquor varieties (Chennai)](${SOURCE_TOI})`.trim();

  const analysisBody = `## Analysis — three days, two orders, one trust test

The public story is not only “which brandy is on the shelf.” It is how fast a **central food-safety prohibition** can land in **TASMAC’s depot network** — and how fast it can reverse when a manufacturer appeals with a compliance promise.

For consumers, the practical lesson is narrower: **circulars beat rumours**. For the state, the political pressure is wider: if FSSAI alone can halt and restart large manufacturers, Excise’s talk of **system-wide quality checks** will be judged by whether those checks become routine, transparent, and published — not only reactive.

MyChennaiCity will update this desk if FSSAI or TASMAC publish a fuller public note on the improvement-notice outcome.

## Fine print — AI-assisted authoring

This report was prepared with **AI-assisted news authoring** and human editorial review.
AI tools can err — mis-date circulars, misspell brand names, or overstate stock figures.
Please cross-check primary FSSAI / Excise / TASMAC communications and the linked press sources before you act on this article.`.trim();

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
      "FSSAI bans then revokes stop-sale on 11 Enrica liquor brands in Tamil Nadu; TASMAC told to resume",
    summary:
      "FSSAI prohibited 11 Enrica Enterprises liquor varieties on 11 Aug 2026 over artificial / nature-identical flavouring, TASMAC halted sales, then FSSAI revoked the order on 14 Aug with an improvement notice. Timeline, brand list, and Excise Minister’s response.",
    dek: "Three days, two FSSAI orders — what TASMAC shops and licence holders need to know.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    areaHubSlug: null as string | null,
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO,
    sourceUrl: SOURCE_HINDU,
    sourceName:
      "Press synthesis — The Hindu, TNIE, DT Next, Times of India (Aug 2026)",
    authorByline: "MyChennaiCity Editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "Are the 11 liquor brands still banned in Tamil Nadu?",
          answer:
            "Press reports say FSSAI revoked the 11 August prohibition on 14 August 2026 and the Prohibition and Excise Commissioner asked TASMAC to withdraw the stop-sale. Shop-level sale depends on TASMAC’s latest depot circular — confirm at the outlet rather than from social forwards.",
        },
        {
          question: "Why did FSSAI ban the brands in the first place?",
          answer:
            "The Southern Regional Office cited nature-identical and artificial flavouring substances found after inspection at Enrica Enterprises’ licensed premises in Poonamallee, Tiruvallur district.",
        },
        {
          question: "Why was the ban revoked so quickly?",
          answer:
            "Multiple outlets report the manufacturer appealed and assured compliance. FSSAI then revoked the prohibition (Section 36(3)(b) cited in some reports) and issued an improvement notice with roughly 30 days to comply.",
        },
        {
          question: "Which company makes the 11 brands?",
          answer:
            "Enrica Enterprises Private Limited, with the inspected licensed unit reported at Poonamallee in Tiruvallur district. The brands include several Enrica labels plus other brandy and rum SKUs named in the FSSAI / TASMAC communications covered by the press.",
        },
        {
          question: "Did the Tamil Nadu government impose or lift the ban?",
          answer:
            "Excise Minister K. Vignesh said both the ban and the revocation were FSSAI actions. The state Prohibition and Excise department and TASMAC implemented, then withdrew, stop-sale directions based on those central communications.",
        },
        {
          question: "What should FL2 / FL3 licence holders do?",
          answer:
            "Follow the latest written TASMAC / Excise instruction before transferring or selling the named SKUs. Do not rely on incomplete WhatsApp lists while depot circulars catch up.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-fssai-tasmac-11-liquor] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({ ...values, createdAt: now });
    console.log("[seed-fssai-tasmac-11-liquor] Inserted article:", SLUG);
  }

  console.log(
    "[seed-fssai-tasmac-11-liquor] Public URL:",
    `/chennai-local-news/${SLUG}`,
  );
  console.log("[seed-fssai-tasmac-11-liquor] Live URL:", ARTICLE_URL);

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
    });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

/*
 * Optional X/Twitter copy (after live):
 *
 * FSSAI banned 11 Enrica liquor brands in TN over flavouring flags — then revoked the order within days.
 * TASMAC stop-sale → withdraw. Timeline + brand list:
 * https://mychennaicity.in/chennai-local-news/fssai-tasmac-11-liquor-brands-ban-revoked-enrica-august-2026
 * #Chennai #TamilNadu #TASMAC #FSSAI
 */
