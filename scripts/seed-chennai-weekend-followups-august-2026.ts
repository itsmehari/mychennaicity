/**
 * Weekend follow-ups 15 Aug 2026: I-Day wrap, TNPDCL scorecard still missing, auto-fare revision pending.
 *
 * Dev:  `npm run db:seed:chennai-weekend-followups-august-2026`
 * Live: `npm run db:seed:chennai-weekend-followups-august-2026:live`
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
  console.error("DATABASE_URL missing");
  process.exit(1);
}

const db = drizzle(neon(url), { schema });

const DISCLAIMER = `## Disclaimer

This article is civic journalism for Greater Chennai readers. It synthesises named press reports available at the time of writing. It is **not** official government or utility copy. Verify primary sources before acting.`;

const FINE_PRINT = `## Fine print — AI-assisted authoring

Drafted with AI assistance and human editorial review. AI can err. Cross-check dates, road closures, and utility figures with official notices.`;

type Story = {
  slug: string;
  title: string;
  dek: string;
  summary: string;
  category: string;
  publishedAt: Date;
  reportBody: string;
  analysisBody: string;
};

const STORIES: Story[] = [
  {
    slug: "chennai-independence-day-2026-vijay-flag-hoist-fort-st-george",
    title:
      "Independence Day 2026: CM Vijay Hoists the Flag at Fort St. George Under Five-Tier Security",
    dek: "First I-Day hoist for C. Joseph Vijay at the fort; Kamarajar Salai closures from 6 a.m.",
    summary:
      "On 15 August 2026 Tamil Nadu Chief Minister C. Joseph Vijay hoisted the national flag at Fort St. George. Police ran a five-tier cover; traffic rules around the fort ran from 6 a.m. until the function ended.",
    category: "Civic",
    publishedAt: new Date("2026-08-15T12:00:00.000+05:30"),
    reportBody: `## Key takeaways

- **15 August 2026:** Chief Minister **C. Joseph Vijay** hoisted the national flag at **Fort St. George** — his first Independence Day hoist as CM (News18, 15 Aug).
- Greater Chennai City Police ran a **five-tier** security cover at the fort and surrounding roads, directed by Commissioner **A. Amalraj** (*The Hindu* / DT Next, 13 Aug briefings).
- Traffic restrictions on **Kamarajar Salai** (Labour Statue to RBI subway on Rajaji Salai) and Flag Staff Road ran **from 6 a.m.** until the function ended (Greater Chennai Traffic Police / India Today).
- Extra checks were listed for **airport, railway stations, Metro, beaches and places of worship**. Airport high-security notes from earlier in the week still applied through **20 August** on our prior desk — we have not seen a public rollback as of this wrap.

${DISCLAIMER}

## What happened this morning

**Chennai, 15 August 2026** — Tamil Nadu marked the **80th** Independence Day with the Chief Minister hoisting the flag at Fort St. George and delivering the address. News18 reported the presence of family members and ministers at the fort ceremony.

This wrap does **not** invent crowd-size figures, award lists, or speech highlights we have not sourced. For the full text of the address, use the state government’s published transcript when it appears.

## Roads

The Traffic Police plan published ahead of the day:

- Kamarajar Salai from the Labour Statue toward the RBI subway on Rajaji Salai, plus Flag Staff Road, closed to ordinary traffic from **6 a.m.**
- Pass-holders and press had designated lots (PWD parking / Island Grounds overflow in the India Today briefing).
- Vehicles without passes were to turn at the Labour Statue toward Wallajah Salai / Anna Salai.

By afternoon, treat those closures as **over unless police extend them**. Do not assume Beach Road is still shut at 4 p.m. without a fresh notice.

## Related

- [Weekend watch desk (I-Day / tax / rain)](/chennai-local-news/chennai-weekend-watch-independence-day-tax-rain-monday-august-2026)
- [I-Day security preview](/chennai-local-news/chennai-independence-day-2026-security-airport-red-zone)

${FINE_PRINT}
`,
    analysisBody: `## Why it matters for Chennai movement

The hoist itself is a state ceremony. The **reader** impact is roads, airport queues, and Beach Road access on a Saturday. Our Monday watch desk will record what actually stayed closed — we are not filling that in on Saturday afternoon.

## Sources

- News18, 15 Aug 2026, CM Vijay first flag-hoist at Chennai Fort
- *The Hindu*, 13 Aug 2026, security intensified ahead of I-Day
- DT Next, 13 Aug 2026, five-tier cover
- India Today, 13 Aug 2026, Fort St. George traffic diversions
`,
  },
  {
    slug: "tnpdcl-370-lakh-reinspection-still-no-final-scorecard-august-2026",
    title:
      "TNPDCL’s 3.70-Lakh Bill Recheck: 15 August and Still No Public Final Scorecard",
    dek: "The 7 August deadline passed. The last official slice remains 15,323 inspected / 100 discrepancies on 1 August.",
    summary:
      "Eight days after TNPDCL’s stated 7 August deadline to re-inspect about 3.70 lakh high-variation domestic bills, we still have not seen a public final scorecard covering the full list. The last utility update we can cite is 1 August: 15,323 inspected, 100 discrepancies.",
    category: "Civic",
    publishedAt: new Date("2026-08-15T13:00:00.000+05:30"),
    reportBody: `## Key takeaways

- TNPDCL ordered a statewide physical recheck of about **3.70 lakh** domestic connections with sharp May→July variation, with a stated completion date of **7 August 2026**.
- On **1 August**, TNPDCL said **15,323** connections had been inspected and **100** (~**0.65%**) had meter/bill discrepancies (DT Next).
- As of **15 August 2026**, sources we reviewed still do **not** include a public final report covering all 3.70 lakh flagged services. We are **not** inventing a completion percentage.
- Helpline: Minnagam **94987 94987**. Calculator: [tnebnet.org tariff master](https://www.tnebnet.org/awp/tariffMaster).

${DISCLAIMER}

## What we asked this desk to do

On 10 August we published the [July–August bill-shock explainer](/chennai-local-news/tamil-nadu-high-electricity-bills-july-august-2026-tnpdcl-reinspection) and said we would return when the utility published a **final** scorecard after 7 August.

**Return visit, 15 August:** we searched the same press circuit (DT Next, ToI, *The Hindu*, TNIE). The 1 August preliminary (15,323 / 100) is still the last numbered utility update we can attribute. Absence of a final table is itself the news — not a finding that “only 0.65% of 3.70 lakh were wrong.” That 0.65% applied to the **opening sample**.

## What readers should do anyway

- Photograph the meter and match units to the bill.
- Use the TNPDCL calculator; call Minnagam if the assessment looks impossible vs last cycle.
- A feeder outage is a different desk: [power / feeder](/civic-tools/power-feeder-desk). AC habit math: [AC bill predictor](/guides/chennai-ac-bill-predictor).

## Sources

- DT Next, 1 Aug 2026, 15,323 connections checked, 100 issues
- ToI / *The Hindu*, late July–1 Aug 2026, 3.70 lakh reinspection order and 7 Aug deadline
- Our 10 Aug desk (linked above)

${FINE_PRINT}
`,
    analysisBody: `## Why we will not “close” the story with a guess

A 7 August deadline without a published statewide result leaves three honest possibilities: the work finished and was not briefed; the work slipped; or a table exists internally. Civic journalism waits for a citable figure. If TNPDCL publishes the full scorecard, we will update this slug or file a follow-up — we will not back-fill today’s page with a rumour.
`,
  },
  {
    slug: "tamil-nadu-auto-fare-revision-still-pending-august-2026",
    title:
      "Tamil Nadu Auto Fares: July Meeting Happened, August Gazette Did Not",
    dek: "2013 meter is still the last official structure. Unions and passengers did not agree on 9 July; a report went to Home.",
    summary:
      "Auto unions and passenger groups met the Transport Minister on 9 July 2026 and failed to agree a new minimum fare. The State Transport Authority sent a report to the Home Department. As of 15 August we have not seen a notified new meter. Use our fare-card tool to compare official 2013 vs proposed numbers.",
    category: "Civic",
    publishedAt: new Date("2026-08-15T13:30:00.000+05:30"),
    reportBody: `## Key takeaways

- Last gazetted TN auto meter: **25 August 2013** — **₹25** for **1.8 km**, then **₹12/km** (TNIE).
- **9 July 2026** tripartite in Chennai: unions asked about **₹60 / 1.5 km**; consumer groups about **₹50 / ~2 km** (TNIE / DT Next).
- Early August press: State Transport Authority forwarded a revision report to the **Home Department**; a decision was “expected shortly.” We have **not** seen a new GO as of **15 August 2026**.
- Planning tool: [Chennai auto fare reality cards](/guides/chennai-auto-fare).

${DISCLAIMER}

## Street vs meter

Chennai riders already pay negotiated or app prices far above 2013. That does not make those quotes a government tariff. Until a gazette appears, the legal meter remains 2013; the **political** argument is the July proposals.

## Related

- [Auto fare cards](/guides/chennai-auto-fare)
- [Petrol vs EV calculator](/guides/chennai-petrol-vs-ev-cost)

## Sources

- *The New Indian Express*, 10 Jul 2026, unions and consumers fail to strike a fare deal
- DT Next, autos to ply by meter; union proposals
- IANS / New Kerala, early Aug 2026, STA report to Home Department

${FINE_PRINT}
`,
    analysisBody: `## How to use the numbers

If a driver quotes ₹180 for 5 km at 11:30 p.m., open the fare cards: official 2013, passenger proposal, union proposal. The gap is the negotiation — not a hidden official night tariff until the government notifies one.
`,
  },
];

async function main() {
  const [city] = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, "chennai"))
    .limit(1);
  if (!city) {
    console.error("chennai city missing");
    process.exit(1);
  }

  const now = new Date();
  for (const story of STORIES) {
    const [existing] = await db
      .select({ id: articles.id })
      .from(articles)
      .where(and(eq(articles.cityId, city.id), eq(articles.slug, story.slug)))
      .limit(1);

    const body = `${story.reportBody}\n\n---\n\n${story.analysisBody}`;
    const values = {
      title: story.title,
      dek: story.dek,
      summary: story.summary,
      category: story.category,
      body,
      reportBody: story.reportBody,
      analysisBody: story.analysisBody,
      status: "published" as const,
      publishedAt: story.publishedAt,
      featured: false,
      authorByline: "mychennaicity.in editorial",
      updatedAt: now,
    };

    if (existing) {
      await db.update(articles).set(values).where(eq(articles.id, existing.id));
      console.log(`updated ${story.slug}`);
    } else {
      await db.insert(articles).values({
        cityId: city.id,
        slug: story.slug,
        ...values,
        createdAt: now,
      });
      console.log(`inserted ${story.slug}`);
    }
  }

  await revalidateNewsAfterSeed();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
