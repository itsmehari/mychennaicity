/**
 * Tamil Nadu EB bill shock — July–August 2026 TNPDCL 3.7-lakh reinspection desk.
 *
 * Dev:  `npm run db:seed:tn-electricity-bill-shock-july-august-2026`
 * Live: `npm run db:seed:tn-electricity-bill-shock-july-august-2026:live`
 *
 * Sources (press / utility reporting as of 10 Aug 2026): TNIE, DT Next, ToI, The Hindu;
 * official consumer channel Minnagam 94987 94987; TNPDCL calculator on tnebnet.org.
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const HERO_IMAGE_URL =
  "https://imagesvs.oneindia.com/ta/img/2024/03/electr-down-1710300389.jpg";

const TNPDCL_CALCULATOR_URL = "https://www.tnebnet.org/awp/tariffMaster";
const TNPDCL_PAYMENT_URL = "https://www.tnebnet.org/";
const MINNAGAM_HELPLINE = "94987 94987";

const BILL_GUIDE_PATH =
  "/chennai-local-news/tamil-nadu-electricity-bill-calculation-2026-june-tnpdcl";
const SOLAR_PATH =
  "/chennai-local-news/chennai-rooftop-solar-subsidy-pm-surya-ghar-2026";
const OZONE_PATH =
  "/chennai-local-news/ozone-greens-perumbakkam-power-crisis-generator-electricity-issue";

/** Partner site — MyOMR.in (OMR corridor desks). */
const MYOMR_BILL_SHOCK =
  "https://myomr.in/local-news/tamil-nadu-high-electricity-bills-july-august-2026-tnpdcl-omr";
const MYOMR_BILL_CALC =
  "https://myomr.in/local-news/tneb-bill-calculation-2026-tamil-nadu-electricity-slabs";
const MYOMR_EB_HUB = "https://myomr.in/discover-myomr/eb-bill-hub.php";
const MYOMR_SOLAR =
  "https://myomr.in/local-news/omr-rooftop-solar-chennai-subsidy-domestic-industrial-installation";
const MYOMR_OZONE =
  "https://myomr.in/local-news/ozone-greens-electricity-issue-residents-generator-power";
const MYOMR_TNEB_OFFICES =
  "https://myomr.in/discover-myomr/tneb-offices-omr-chennai.php";

const SOURCE_TNIE_REINSPECT =
  "https://www.newindianexpress.com/states/tamil-nadu/2026/Jul/30/tneb-orders-re-inspection-of-37l-power-connections-after-high-bill-complaints";
const SOURCE_TNIE_FAULTS =
  "https://www.newindianexpress.com/states/tamil-nadu/2026/Jul/20/faulty-meters-billing-errors-caused-spike-in-power-bills-tnpdcl";
const SOURCE_TNIE_NO_HIKE =
  "https://www.newindianexpress.com/states/tamil-nadu/2026/Jun/26/no-power-tariff-hike-this-year-electricity-minister-c-t-r-nirmalkumar";
const SOURCE_DTNEXT_PRELIM =
  "https://www.dtnext.in/news/tamilnadu/15323-connections-checked-only-100-had-issues-tnpdcl";
const SOURCE_TOI =
  "https://timesofindia.indiatimes.com/city/chennai/high-power-bills-tnpdcl-chairman-asks-field-officials-to-inspect-3-70-lakh-households-in-tamil-nadu-and-carry-out-corrections/articleshow/132715074.cms";
const SOURCE_HINDU =
  "https://www.thehindu.com/news/cities/chennai/tnpdcl-cmd-directs-officials-to-re-inspect-370-lakh-electricity-bills-in-chennai/article71290632.ece";

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
  "tamil-nadu-high-electricity-bills-july-august-2026-tnpdcl-reinspection";

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

  /** Chennai, 10 August 2026 — after Aug 7 inspection deadline. */
  const publishedAt = new Date("2026-08-10T12:30:00.000+05:30");
  const now = new Date();

  const reportBody = `## Key takeaways

- There is **no electricity tariff hike for 2026** — Electricity Minister **C. T. R. Nirmalkumar** said the government would not implement the roughly **3.57%** annual CPI-linked revision.
- Yet July-cycle **EB bills** still shocked many Tamil Nadu households. TNPDCL identified about **3.70 lakh domestic connections** with sharp consumption jumps versus the **May** cycle and ordered a statewide physical reinspection.
- Officials cite **prolonged summer heat** and longer AC/cooler use — but Tamil Nadu’s **slab tariff** can turn a moderate unit increase into a much larger rupee jump (see our [domestic bill calculator desk](${BILL_GUIDE_PATH})).
- Before the mass drive, an internal TNPDCL note (reported by *The New Indian Express*) already flagged **defective meters, wrong readings, billing anomalies** and weak field verification.
- By **1 August**, TNPDCL said it had checked **15,323** connections and found discrepancies in **100** (~**0.65%**). That is only a slice of the 3.70 lakh target — a full public final scorecard after the **7 August** deadline was still awaited as of **10 August 2026**.
- Consumers with doubts: compare **meter units**, photograph the meter, use the [TNPDCL calculator](${TNPDCL_CALCULATOR_URL}), and call **Minnagam ${MINNAGAM_HELPLINE}**.

## Disclaimer

This article is **civic journalism** for public-interest information on Tamil Nadu electricity billing. It synthesises **press reporting** of TNPDCL circulars, ministerial statements and consumer cases available at the time of writing. It is **not** an official TNPDCL, TANGEDCO, TNERC or Electricity Department communication, and it is not legal, accounting or meter-engineering advice.

Figures (3.70 lakh services, inspection counts, discrepancy rates, individual bill amounts) can be revised as the utility releases updates. Verify your own bill against the **physical meter**, the printed assessment and the official [TNPDCL tariff calculator](${TNPDCL_CALCULATOR_URL}) before paying under protest or filing a formal dispute.

## At a glance

| Item | Detail |
|------|--------|
| **Core question** | Why did many July-cycle EB bills jump when the government ruled out a 2026 tariff hike? |
| **Utility** | **TNPDCL** (Tamil Nadu Power Distribution Corporation Ltd.) — consumers still say “TNEB / EB bill” |
| **Flagged services** | About **3.70 lakh** domestic connections with high variation vs May cycle |
| **Inspection deadline** | **7 August 2026** (CMD circular) |
| **Early sample (1 Aug)** | **15,323** inspected → **100** with meter/bill discrepancies (~**0.65%**) |
| **Helpline** | Minnagam consumer service centre — **${MINNAGAM_HELPLINE}** |
| **Pay / calculator** | [tnebnet.org](${TNPDCL_PAYMENT_URL}) · [Bill calculator](${TNPDCL_CALCULATOR_URL}) |
| **Related MCC desk** | [How Tamil Nadu domestic bills are calculated (2026)](${BILL_GUIDE_PATH}) |

## Timeline — from “no hike” to the July–August bill shock

| Date | What happened |
|------|----------------|
| **25–26 June 2026** | Electricity Minister **C. T. R. Nirmalkumar** announces **no tariff hike this year**, declining the ~**3.57%** CPI-linked revision under the multi-year tariff mechanism. |
| **~20 July 2026** | *The New Indian Express* reports an internal TNPDCL finance-side communication acknowledging **faulty meters, incorrect readings and billing anomalies**, plus weak field verification — and warning of accountability. |
| **Late July 2026** | CMD **V. Arun Roy** orders statewide physical verification of ~**3.70 lakh** domestic services with sharp May→July variation; corrections wherever errors are found; target completion **7 August**. |
| **1 August 2026** | TNPDCL says **15,323** connections inspected so far; discrepancies in **100** (~**0.65%**); those bills to be revised under rules. |
| **7 August 2026** | Stated deadline for completing the special reinspection drive. |
| **10 August 2026** | *This desk* — comprehensive public final report covering all ~3.70 lakh flagged services not yet seen in sources we reviewed. |

## No tariff hike — so why are bills higher?

**Chennai, 10 August 2026** — Electricity bills arriving in the latest domestic cycle triggered statewide concern. Consumers in Chennai and several districts reported amounts well above what they usually pay — even though the Tamil Nadu government had said only weeks earlier that **there would be no electricity tariff increase in 2026**.

Speaking after the power-sector white paper, Minister **C. T. R. Nirmalkumar** said the formula could have allowed a roughly **3.57%** revision this year, but the government chose **not** to implement it.

That statement answers one question — **slab rates were not hiked**. It does **not** freeze a household’s **units consumed**, nor does it guarantee every meter reading and assessment is error-free.

The emerging evidence points to **more than one driver**, not a single statewide “hidden hike.”

## What TNPDCL ordered: 3.70 lakh reinspections

Following mounting complaints, TNPDCL analysed May vs July domestic bills and flagged connections with **significant variation**.

Around **3.70 lakh domestic electricity connections** entered a special verification list. CMD **V. Arun Roy** directed officers across distribution regions to **physically verify** meters and assessments and to correct billing errors on the spot where detected.

Press reports of the circular also describe **inspection quotas by cadre** (exact numbers vary slightly by outlet), including work for chief / superintending / executive engineers and heavier loads for assessment and revenue-intelligence staff. The scale itself shows how widespread the unusual pattern appeared in TNPDCL’s own data.

### How the 3.70 lakh stack broke down (TNPDCL figures as reported)

| Consumption band (latest cycle) | Approx. connections |
|---------------------------------|---------------------|
| **More than 1,000 units** | ~**15,000** |
| **500–1,000 units** | ~**1 lakh** |
| **101–500 units** | Remaining flagged services |

Some reporting also noted that services with roughly **threefold** jumps versus May were prioritised — underscoring that the list is a **variation screen**, not a finding that every bill is wrong.

## What households say they received

Individual complaints reported from several districts explain why the issue went viral.

In **Tiruchirappalli** district alone, more than **5,600** domestic connections were reportedly selected for verification.

Some consumers told *The Times of India* their latest bills were **two or even three times** previous amounts. Examples reported in the press (individual cases — **not** statewide averages):

- A **Karumandapam** household: about **₹11,000–₹13,000** this summer vs roughly **₹7,000–₹8,000** the previous summer.
- A **Pudukkottai** consumer: normally ~**₹1,000–₹2,000**, latest bill ~**₹6,000**.
- Another household: from **₹168** in the previous cycle to **₹2,161**.

In Chennai, *The Hindu* quoted a **Saidapet** resident whose July bi-monthly use was said to exceed **650 units** against a usual ~**450**. North and south distribution circles were already inspecting large batches of flagged bills while the statewide drive ran.

These stories illustrate **complaint magnitude**. They do not prove every high bill is a meter error — or that every high bill is “only summer.”

## Explanation 1 — Prolonged heat and longer appliance hours

TNPDCL officials have attributed much of the spike to a prolonged **hot and humid** spell. Longer run-times for:

- air-conditioners and coolers,
- refrigerators,
- fans,
- water pumps,
- other household loads,

can push bi-monthly consumption far above a mild-weather cycle.

That explanation likely covers **part** of the story — especially for homes that crossed into higher **slab** territory. It does not close the controversy by itself.

## Explanation 2 — Why a moderate unit rise can explode the rupee total

Electricity bills do **not** rise in a straight line with units.

Tamil Nadu domestic supply uses a **slab / telescopic** structure. As consumption climbs — especially past the widely discussed **500-unit bi-monthly cliff** — the **effective cost of additional units** can jump sharply, and free-unit treatment can change.

Practical consequence: a household that used “only somewhat more” electricity in a brutal summer can still see a bill that **looks** like a tariff hike.

**Rule of thumb for readers:** compare **meter units (kWh)** and the official calculator output — not only the payable rupee line.

Full slab walkthrough: **[Tamil Nadu electricity bill calculation 2026](${BILL_GUIDE_PATH})** · official tool: **[TNPDCL calculator](${TNPDCL_CALCULATOR_URL})**.

## Explanation 3 — Faulty meters and billing process gaps TNPDCL already flagged

Before the 3.70-lakh order, *The New Indian Express* (20 July) reported an internal TNPDCL communication acknowledging shortcomings in billing and field verification — including:

- defective meters,
- incorrect meter readings,
- billing anomalies,
- inadequate field verification,
- ineffective inspections.

The note reportedly warned that errors which basic checks should have caught had gone unchecked, and pressed for clearer accountability. Separate reporting also linked sustained billing pain to **assessor / field manpower strain** in parts of the network — a structural issue distinct from any single summer.

This matters: unusually high bills **cannot** be attributed to summer consumption in every case. Some will be genuine load. Some will be assessment or meter problems. The special drive exists to separate the two.

## Early inspection scorecard — and why it is not the final answer

By **1 August**, TNPDCL said officials had inspected **15,323** connections in the special drive.

Of these, discrepancies involving meter readings or bills were found in **100** connections — about **0.65%** of that early sample. The utility said those bills would be revised under applicable rules.

**What that supports:** TNPDCL’s claim that a large share of high bills may reflect **real consumption**, at least among connections already visited.

**What it does not settle:** 15,323 is only a **small fraction** of ~**3.70 lakh** flagged services. A statewide conclusion cannot rest on the opening sample alone — especially after a hard deadline of **7 August** and while consumers still wait for a published final tally.

## The bigger ask: publish the final 3.70-lakh report

As of **10 August 2026**, a comprehensive public final report covering the entire flagged universe had not yet emerged from sources reviewed by *MyChennaiCity.in*.

Consumers deserve clear numbers on:

1. How many of the **3.70 lakh** connections were actually inspected?
2. How many **meter-reading errors** were found?
3. How many meters were **defective** or replaced?
4. How many bills were **revised**, and by how much in aggregate?
5. Which **districts / circles** recorded the most discrepancies?
6. What share of “shock bills” ultimately matched **genuine** consumption?

Publishing those figures would separate perception from evidence and rebuild confidence in the billing system.

## Two debates that should not be mixed

Tamil Nadu is running two related — but distinct — electricity-cost conversations:

| Debate | Who feels it | What it is about |
|--------|--------------|------------------|
| **Household bill shock** | Domestic LT consumers | Unexpected July-cycle amounts; meter accuracy; slab math vs “hidden hike” rumours |
| **Industrial / MSME cost structure** | Factories, small units | Fixed charges, demand charges, overall power cost — including Budget-season asks for relief |

The government has maintained **no tariff hike for 2026**. MSME associations (including voices from Coimbatore) have separately pressed on **fixed and demand charges**. Treating both as one “new tariff increase” confuses the public and weakens accountability on each track.

## Chennai consumer desk — what to check before you panic

If your latest bill looks wrong, work this sequence:

1. **Units first** — present reading minus previous reading vs billed kWh.
2. **Same season last year** — summer-to-summer comparison beats winter-to-summer.
3. **500-unit cliff** — did you cross into telescopic slabs? Run the [official calculator](${TNPDCL_CALCULATOR_URL}).
4. **Meter events** — replacement, assessment, stuck dial, or estimated reading notes on the bill.
5. **Appliance reality** — new AC, WFH hours, geyser, pump, guests, renovation tools.
6. **Photo evidence** — clear photo of the meter display + PDF bill before you visit the section office.
7. **Complaint channel** — local electricity office or **Minnagam ${MINNAGAM_HELPLINE}**.

Apartment residents: common-area lifts/pumps are often on a **separate** meter billed via the association — see our [bill calculation guide](${BILL_GUIDE_PATH}). For longer-term bill pressure, also read our [PM Surya Ghar rooftop solar desk](${SOLAR_PATH}).

## Also on MyOMR.in (OMR corridor)

For Old Mahabalipuram Road readers — Perungudi, Thoraipakkam, Sholinganallur, Navalur, Kelambakkam and nearby belts — the same July–August shock lands hardest on **high-AC apartments** and shops:

- **[July–August EB bill shock — OMR desk (MyOMR)](${MYOMR_BILL_SHOCK})** — corridor-first take with links back to this statewide report.
- **[TNEB bill calculation 2026 — slabs & OMR examples](${MYOMR_BILL_CALC})** — 500-unit cliff, household / shop scenarios, rough estimator.
- **[EB Bill Hub](${MYOMR_EB_HUB})** — calculator jumps, unit pages, AC tips, solar compare.
- **[TNEB offices near OMR](${MYOMR_TNEB_OFFICES})** — Sholinganallur, Perungudi, Thoraipakkam, Kelambakkam contacts.
- **[OMR rooftop solar subsidy guide](${MYOMR_SOLAR})** — PM Surya Ghar angle for high bi-monthly users.
- **[Ozone Greens electricity issue (Perumbakkam)](${MYOMR_OZONE})** — apartment power / connection stress story.

## Sources

- *The New Indian Express* — [no tariff hike (26 June 2026)](${SOURCE_TNIE_NO_HIKE}); [faulty meters / billing lapses (20 July)](${SOURCE_TNIE_FAULTS}); [3.7L reinspection order (30 July)](${SOURCE_TNIE_REINSPECT})
- *DT Next* — [15,323 inspected / 100 discrepancies (1 Aug)](${SOURCE_DTNEXT_PRELIM})
- *The Times of India* — [CMD inspection drive / consumer cases](${SOURCE_TOI})
- *The Hindu* — [Chennai reinspection / Saidapet consumer note](${SOURCE_HINDU})
- TNPDCL consumer tools — [tnebnet.org](${TNPDCL_PAYMENT_URL}); [tariff calculator](${TNPDCL_CALCULATOR_URL}); Minnagam **${MINNAGAM_HELPLINE}**
- MCC related — [domestic bill calculation 2026](${BILL_GUIDE_PATH}); [rooftop solar subsidy](${SOLAR_PATH}); [Ozone Greens Perumbakkam power crisis](${OZONE_PATH})
- MyOMR partner desks — [July–August EB shock (OMR)](${MYOMR_BILL_SHOCK}); [TNEB slabs guide](${MYOMR_BILL_CALC}); [EB Bill Hub](${MYOMR_EB_HUB})`.trim();

  const analysisBody = `## Analysis

The July–August controversy sits at the intersection of **weather, tariff design and utility process**.

A government that freezes the **tariff schedule** can still face bill rage if (a) summer load spikes, (b) slab cliffs amplify rupee totals, and (c) meters or assessments fail in even a small share of cases. TNPDCL’s own July internal note — as reported — shows the utility recognised process gaps **before** the mass reinspection became a public story. Ordering **3.70 lakh** physical checks is therefore both a consumer-protection move and an admission that desk-level trust had frayed.

The early **0.65%** discrepancy rate is politically and operationally useful to the utility — but methodologically incomplete until the full flagged universe is reported with district-wise error types. Transparency after the **7 August** deadline matters as much as the inspections themselves.

## Why Chennai readers should care

1. **Bi-monthly summer bills** often bundle the hottest weeks of AC and pump use — Chennai apartments feel this acutely.
2. **Slab cliffs** mean “a few hundred extra units” can look like a scam on WhatsApp even when the meter is honest.
3. **Circle-level inspection capacity** and assessor shortages affect how fast corrections reach your section office.
4. **Trust** — if final numbers never appear, rumour fills the gap; if they do appear, both genuine high users and wrongly billed consumers get a clearer path.

## What happens next

- Watch for a **statewide final scorecard** from TNPDCL after the special drive.
- Track whether revised bills and meter replacements are **logged publicly** by circle.
- Keep using the **official calculator** and Minnagam for individual disputes — do not rely on forwarded “new tariff charts.”
- Longer term: manpower, smart metering and cleaner assessment workflows matter as much as any one summer.

## Related reading on mychennaicity.in

- **[Tamil Nadu electricity bill calculation 2026](${BILL_GUIDE_PATH})** — slabs, free units, 500-unit cliff, OMR scenarios.
- **[Chennai rooftop solar — PM Surya Ghar](${SOLAR_PATH})** — subsidy path when summer bills stay high year after year.
- **[Ozone Greens Perumbakkam power crisis](${OZONE_PATH})** — apartment-level electricity stress story.
- **[Consumer topic](/chennai-local-news/topic/consumer)** — more household utility desks.

## Related on MyOMR.in

- **[July–August EB bill shock — OMR desk](${MYOMR_BILL_SHOCK})**
- **[TNEB bill calculation 2026](${MYOMR_BILL_CALC})** · **[EB Bill Hub](${MYOMR_EB_HUB})**
- **[OMR rooftop solar](${MYOMR_SOLAR})** · **[Ozone Greens electricity](${MYOMR_OZONE})**

## Fine print — AI-assisted authoring

This report was prepared with **AI-assisted news authoring** and human editorial review.
AI tools can sometimes make mistakes — misread numbers, miss nuance, or invent detail.
Please cross-check important facts with TNPDCL / Minnagam, your physical meter and the official tariff calculator before acting on them.`.trim();

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
      "No Tariff Hike, Yet EB Bills Surge Across Tamil Nadu: What Is Behind the July–August Shock?",
    summary:
      "TNPDCL ordered reinspection of 3.70 lakh domestic connections after July-cycle bill complaints. No 2026 tariff hike was announced — but heat, slab cliffs, and acknowledged meter/billing errors all play a role. Early checks found issues in ~0.65% of 15,323 connections; the full final report is still the key missing piece.",
    dek: "Consumer desk — 3.70 lakh May→July variation screen, summer load vs meter faults, and what Chennai households should verify before they pay.",
    body,
    reportBody,
    analysisBody,
    category: "Consumer",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: SOURCE_TNIE_REINSPECT,
    sourceName:
      "TNPDCL reinspection drive / press reporting (TNIE, DT Next, ToI, The Hindu) — July–August 2026",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "Did Tamil Nadu hike electricity tariffs in 2026?",
          answer:
            "No. Electricity Minister C. T. R. Nirmalkumar said the government would not implement the roughly 3.57% CPI-linked annual revision. Higher bills in the July cycle are a separate issue from a tariff schedule change.",
        },
        {
          question: "Why did TNPDCL pick 3.70 lakh connections for reinspection?",
          answer:
            "The utility compared May and July domestic billing cycles and flagged services with sharp consumption variation. Officials were told to physically verify meters and assessments and correct errors by 7 August 2026.",
        },
        {
          question: "Does a higher EB bill always mean a faulty meter?",
          answer:
            "No. Prolonged heat and longer AC use can raise genuine units. Tamil Nadu slab billing can also amplify the rupee total. But TNPDCL had already acknowledged cases of defective meters, wrong readings and billing anomalies — so each bill needs unit-level checking.",
        },
        {
          question: "What did the early inspection sample show?",
          answer:
            "As of 1 August 2026, TNPDCL said 15,323 connections had been inspected and discrepancies were found in 100 (~0.65%). That is only a fraction of the ~3.70 lakh flagged services, so it is not a final statewide result.",
        },
        {
          question: "What should I do if my bill looks abnormally high?",
          answer: `Compare billed units with the meter delta, photograph the meter, run the official TNPDCL calculator, then approach your local electricity office or Minnagam at ${MINNAGAM_HELPLINE}.`,
        },
        {
          question: "Where is the official Tamil Nadu electricity bill calculator?",
          answer: `Use TNPDCL’s tariff check at ${TNPDCL_CALCULATOR_URL} — select Domestic, Bi-monthly (unless your bill says otherwise), and enter consumed units from your bill.`,
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-tn-eb-bill-shock] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-tn-eb-bill-shock] Inserted article:", SLUG);
  }

  console.log(
    "[seed-tn-eb-bill-shock] Public URL:",
    `https://mychennaicity.in/chennai-local-news/${SLUG}`,
  );
  console.log("[seed-tn-eb-bill-shock] Hero image:", HERO_IMAGE_URL);

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-tn-eb-bill-shock",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
