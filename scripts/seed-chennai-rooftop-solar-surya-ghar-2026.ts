/**
 * Chennai rooftop solar — PM Surya Ghar subsidy and adoption (June 2026).
 *
 * Dev:  `npm run db:seed:chennai-rooftop-solar-surya-ghar-2026`
 * Live: `npm run db:seed:chennai-rooftop-solar-surya-ghar-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const HERO_IMAGE_URL =
  "https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/ExtraLarge/05-kw-solar-rooftop-system-in-20260224214736459.webp";

const PM_SURYA_GHAR_URL = "https://www.pmsuryaghar.gov.in/";
const TN_USRP_URL = "https://www.tnebltd.gov.in/usrp/";
const TOI_40_LAKH_URL =
  "https://timesofindia.indiatimes.com/business/india-business/over-40l-households-now-benefit-from-rooftop-solar-systems-under-surya-ghar-yojana/articleshow/131396288.cms";
const DT_NEXT_CHENNAI_URL =
  "https://www.dtnext.in/news/chennai/rooftop-solar-scheme-powers-over-5000-homes-in-chennai-says-union-min-855388";
const DT_NEXT_TNERC_BATTERY_URL =
  "https://www.dtnext.in/news/tamilnadu/first-solar-plus-battery-storage-projects-in-karur-tiruvarur-soon-849925";
const TOI_SWELECT_URL =
  "https://timesofindia.indiatimes.com/city/chennai/swelect-energy-eyes-battery-storage-to-drive-next-growth-phase/articleshow/127015942.cms";

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

const SLUG = "chennai-rooftop-solar-subsidy-pm-surya-ghar-2026";

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

  const publishedAt = new Date("2026-06-01T04:30:00.000Z");
  const now = new Date();

  const reportBody = `## Key takeaways

- Chennai is moving from **“green energy someday”** to **rooftop solar as a bill-reduction decision** — driven by summer cooling loads, **PM Surya Ghar** subsidy support, and faster local execution.
- Under **[PM Surya Ghar: Muft Bijli Yojana](${PM_SURYA_GHAR_URL})**, eligible households can receive central subsidy support for rooftop PV — the national scheme page describes subsidy covering **up to 40% of system cost** for qualifying domestic installations.
- Tamil Nadu consumers apply through **[TANGEDCO’s Unified Solar Rooftop Portal (USRP)](${TN_USRP_URL})** for subsidy-linked domestic rooftop solar, non-subsidy applications, and **net-meter** coordination.
- Market explainers widely cite **up to ₹78,000** central assistance for eligible residential systems — commonly broken down as **₹30,000/kW for the first 2 kW** and **₹18,000/kW for the third kW**, capped at **₹78,000 for 3 kW and above**.
- National reporting (May 2026) places rooftop solar under Surya Ghar at **mass-adoption scale** — more than **40 lakh households** had benefited nationwide as of late May 2026, per [Times of India coverage](${TOI_40_LAKH_URL}).
- In Chennai district, a **December 2025** report cited **6,394 applications** under the rooftop solar scheme as of **30 November 2025**, with installations having benefited **7,357 households** — [DT Next](${DT_NEXT_CHENNAI_URL}).

## Chennai’s rooftop solar moment

**Chennai, 1 June 2026** — On a typical summer afternoon, flat rooftops across the city still absorb heat long after the sun moves west. A growing share of those roofs now hold something else: **tilted solar arrays**, metal racking bolted into weathered concrete, and conduit runs heading toward inverters and net meters.

Rooftop solar is no longer discussed here mainly as a distant climate pledge. For homeowners, apartment associations, commercial buildings, and factories, it is becoming a **practical financial choice** — especially as electricity consumption rises with **AC load**, tariff slabs bite harder, and installers market **subsidy-adjusted pricing** alongside long-term savings math.

The policy trigger most households hear first is **[PM Surya Ghar: Muft Bijli Yojana](${PM_SURYA_GHAR_URL})** — the Centre’s flagship residential rooftop programme launched in **February 2024**, implemented through a national digital portal and state DISCOM coordination. The scheme’s public messaging centres on helping households generate their own power, cut monthly **EB bills**, and — where generation and consumption align — move toward **very low or zero electricity charges** for eligible usage bands.

## How the ₹78,000 subsidy is usually explained

Chennai-facing guides and Tamil Nadu explainers converge on the same central financial assistance (CFA) framing for **domestic grid-connected rooftop** systems under PM Surya Ghar:

| System size band | Typical CFA framing cited in market guides |
|------------------|---------------------------------------------|
| First **2 kW** | **₹30,000 per kW** |
| **3rd kW** | **₹18,000 per kW** |
| **3 kW and above** | **Cap at ₹78,000** total central subsidy |

**Important:** Subsidy is not automatic cash at quote time — beneficiaries generally complete **portal registration**, **feasibility approval**, **empanelled-vendor installation**, **inspection/commissioning**, and **DBT to bank** after verification. Always confirm eligibility, roof suitability, and DISCOM steps on the official portals before signing a contract.

**Scheme helpline (national portal):** **15555** — for portal and process queries.

## Tamil Nadu application route

For Tamil Nadu consumers, the state entry point is **[TANGEDCO’s Unified Solar Rooftop Portal (USRP)](${TN_USRP_URL})**. The portal states it supports:

- **Solar Rooftop PV with subsidy** under PM Surya Ghar for **domestic** consumers
- **Non-subsidy** applications for other consumer categories
- **Net-meter installation** to measure exported energy

Chennai residents with an active **TANGEDCO consumer number** typically align national portal registration (consumer details, vendor selection, subsidy track) with **USRP / DISCOM** feasibility, commissioning, and metering steps. Treat any installer promise of “instant subsidy” sceptically unless it maps to the published portal workflow.

## National scale — from awareness to volume

Recent national reporting underscores how quickly residential rooftop solar has scaled under Surya Ghar. Coverage in late **May 2026** cited **more than 40 lakh households** having benefited from rooftop solar systems under the scheme — a marker that residential solar is shifting from pilot enthusiasm to **repeatable, high-volume adoption**.

That volume matters for Chennai because it changes the **market conversation**:

- More neighbours have visible installations on terraces and apartment podiums
- More vendors compete on **bill savings**, not only “go green” slogans
- More consumers ask about **net metering**, **warranty**, and **post-install service** upfront

## Chennai district numbers (late 2025 baseline)

Local reporting gives Chennai-specific traction before the 2026 summer push:

| Indicator | Reported figure | Source period |
|-----------|-----------------|---------------|
| Applications under rooftop solar scheme | **6,394** | As of **30 Nov 2025** |
| Households benefited by installations | **7,357** | Chennai district |

These figures come from **[DT Next reporting in December 2025](${DT_NEXT_CHENNAI_URL})** on Chennai district uptake. They do not replace live portal statistics — but they show the city was already past pure awareness stage a season ago.

## How solar marketing in Chennai changed

Older campaigns leaned on **environment** and **“green energy”** language. The higher-converting pitch in 2026 is blunt:

- **Lower EB bills**
- **Subsidy-adjusted system cost**
- **Free or assisted site survey**
- **Net-metering support**
- **Generation and payback over 20–25 years**

National brands and local EPC firms use similar frames. **Tata Power Solar** promotes end-to-end rooftop EPC across residential, commercial, industrial, institutional, hospital, hotel, and educational segments in Chennai. **SolarSquare**’s Chennai-facing pages emphasise savings calculators, subsidy-adjusted pricing, and long-horizon return estimates. **RP Solar**, **Apollo Power Systems**, and **Century Solar** position as Chennai-based installers serving homes, high-rises, commercial spaces, and industrial roofs.

This competition is useful for consumers — **if** quotes are compared on **kW sizing**, **module and inverter brands**, **warranty**, **penalty clauses**, and **who owns TANGEDCO paperwork**, not only headline ₹/kW rates.

## Industrial and grid context — why rooftops are not the whole story

Tamil Nadu’s renewable push extends beyond terraces. **TNERC** has cleared **solar-plus-battery storage** projects in **Karur** and **Thiruvarur** (15 MW solar + 45 MWh BESS each) to support **evening peak** demand — see [DT Next reporting](${DT_NEXT_TNERC_BATTERY_URL}) — a reminder that grid planners are pairing daytime solar with storage, not only adding panels.

Workforce and manufacturing matter too: **Tata Power** and the **Tamil Nadu government** have announced **solar skill centres** to expand a renewable-ready workforce — relevant as installation quality and O&M capacity must keep pace with demand.

Chennai-listed **[SWELECT Energy Systems](${TOI_SWELECT_URL})** has publicly discussed expanding beyond modules into **battery energy storage** (NUMERGY portfolio) and integrated offerings for **residential rooftop**, **hybrid**, and **industrial** users — signalling that local energy firms expect customers to ask for **solar + storage + service**, not panels alone.

## Who benefits on the roof

| Consumer type | Typical load / goal |
|---------------|---------------------|
| **Independent house** | Cut household EB bill; use CFA; size for AC and future load |
| **Apartment association** | Common-area lighting, pumps, lifts — shared savings and governance |
| **Commercial / office** | Operating cost reduction, predictable daytime generation |
| **Factory / warehouse** | Large roof area, demand charge management, ESG reporting |

For many Chennai homes, the simplest message holds: **the roof is no longer idle square footage** — it is a **bill-reduction asset** if execution is sound.

## Fact box — official entry points

| Item | Detail |
|------|--------|
| National scheme | [PM Surya Ghar — pmsuryaghar.gov.in](${PM_SURYA_GHAR_URL}) |
| Tamil Nadu USRP | [tnebltd.gov.in/usrp](${TN_USRP_URL}) |
| DISCOM | TANGEDCO (Chennai and TN) |
| Toll-free (portal) | **15555** |
| CFA cap (widely cited) | **Up to ₹78,000** for eligible 3 kW+ domestic systems |

## What can still go wrong

Subsidy awareness converts to long-term confidence only when execution keeps up. Watch for:

- **Undersized or oversized** systems relative to real consumption
- **Shading** from water tanks, lift rooms, or neighbouring towers
- **Unclear net-meter timeline** and who chases DISCOM status
- **Non-empanelled vendors** risking subsidy eligibility
- **Weak O&M** after commissioning — dust, inverter faults, and monitoring gaps eat savings

The next phase of Chennai’s solar story is less about whether panels work in Tamil Nadu sun — they do — and more about **reliable delivery** across domestic and industrial rooftops alike.

## Sources and further reading

| Topic | Link |
|-------|------|
| PM Surya Ghar (official) | [pmsuryaghar.gov.in](${PM_SURYA_GHAR_URL}) |
| TANGEDCO USRP portal | [tnebltd.gov.in/usrp](${TN_USRP_URL}) |
| 40 lakh+ households (national) | [Times of India — 29 May 2026](${TOI_40_LAKH_URL}) |
| Chennai applications & installs | [DT Next — 4 Dec 2025](${DT_NEXT_CHENNAI_URL}) |
| Chennai subsidy explainer | [Glyde Infra Solutions](https://glydeinfra.com/chennai-rooftop-solar-subsidy/) |
| Tamil Nadu ₹78,000 guide | [Tristar Energy](https://www.tristarenergy.com/blog/tamil-nadu-solar-subsidy-guide) |
| Chennai pricing & savings | [SolarSquare Chennai](https://www.solarsquare.in/rooftop-solar/chennai) |
| Tata Power Solar Chennai | [Tata Power Solar — rooftop Chennai](https://www.tatapowersolar.com/rooftop-solar-chennai) |
| TNERC solar-plus-battery (Karur, Thiruvarur) | [DT Next — solar + BESS projects](${DT_NEXT_TNERC_BATTERY_URL}) |
| SWELECT storage expansion | [Times of India — SWELECT BESS](${TOI_SWELECT_URL}) |`.trim();

  const analysisBody = `## What this means if you live in Chennai

If your terrace stays empty while your **EB bill climbs every summer**, you are already in the target audience for PM Surya Ghar — whether or not you care about carbon labels. The scheme’s practical promise is **owned generation at home**: less energy bought at retail tariff, and — when sizing and metering are right — a path toward **much lower monthly bills**.

Start with **honest load math**, not the installer’s first slide:

1. Pull **12 months of TANGEDCO bills** (units, slab changes, fixed charges).
2. Note **daytime use** (when the sun actually offsets your load).
3. Check **roof area, tilt, and shade** at 9 am, noon, and 4 pm.
4. Decide whether you need **battery backup** (power cuts) or **grid-tied net metering** (bill offset) — they are different budgets.

Then work **only** through documented channels: **[pmsuryaghar.gov.in](${PM_SURYA_GHAR_URL})** plus **[TANGEDCO USRP](${TN_USRP_URL})**. Save every application ID, feasibility letter, and commissioning note.

## Subsidy vs savings — keep both numbers in view

**₹78,000** is the headline that gets shared on WhatsApp. Your real decision is:

- **Net upfront cost** after CFA (and any financing)
- **Monthly units offset** at your actual tariff
- **Payback years** if generation matches promises
- **Warranty** on modules (often 25-year performance talk) vs **inverter replacement** (shorter life)

A ₹78,000 CFA on a poorly sized 1 kW system is still a bad deal. A well-sized 3 kW system without subsidy paperwork completed is worse — you may pay full price and miss DBT.

## Apartment associations — politics on the roof

For **flats**, rooftop solar is not only technical. Associations must agree on:

- **Common-area vs individual flat** metering models
- **Roof rights** and structural load certificates
- **How savings are split** (maintenance fund vs individual benefit)
- **Vendor access** for cleaning and inverter rooms

Chennai associations that move early often start with **common loads** — corridor lighting, STP, pumps — where payback is easier to explain to all members.

## Industrial rooftops — same sun, different spreadsheet

Factories and warehouses care about **demand charges**, **shift timing**, and **roof area at scale**. State and national policy tailwinds help, but industrial buyers should stress **generation profiles**, **maintenance contracts**, and **grid-connection compliance** as much as ₹/W quotes.

## Execution checklist — before you pay the advance

Use this as a local buyer’s guardrail (not legal advice):

- [ ] Vendor appears on **national portal / empanelled lists** relevant to your track
- [ ] Written **kW (DC vs AC)**, module make, inverter make, and warranty years
- [ ] **Structure drawing** for wind load on your roof type
- [ ] Clear **TANGEDCO / USRP milestone owners** (you vs vendor)
- [ ] **Net-meter timeline** in writing
- [ ] **Subsidy DBT steps** spelled out — no “trust us” verbal-only claims
- [ ] **Annual maintenance** cost after any “free service” window ends

## Chennai installers readers often compare

This desk does not endorse vendors. Consumers routinely shortlist **Chennai-based EPC and energy firms** when requesting quotes — compare like-for-like system specs, not ad copy:

- **[AGSunWin Energy Solutions](https://agsunwinenergysolutions.com/)** — residential, commercial, and industrial solar EPC across Chennai and Tamil Nadu
- **RP Solar** — Chennai-based solar EPC for homes, industries, commercial spaces, and institutions
- **Century Solar Projects** — Chennai contractor positioning for home and business installations
- **SWELECT Energy Systems** — listed Chennai renewable-energy company with rooftop, hybrid, and industrial lines
- **Glyde Infra Solutions** — Chennai installer focus on residential rooftop and subsidy guidance explainers

Get **three written quotes**, verify portal eligibility, and talk to a neighbour who already commissioned — their **DISCOM wait time** is often more honest than a sales deck.

## Soundbite

Chennai has the **climate**, the **roof space**, the **consumer urgency**, and the **policy stack**. What converts subsidy headlines into decade-long confidence is **execution** — correct sizing, safe install, TANGEDCO coordination, and service after the handover photo.

## Related reading on mychennaicity.in

- **[Chennai topic](/chennai-local-news/topic/chennai)** — civic, utility, and city desk updates.
- **[Consumer topic](/chennai-local-news/topic/consumer)** — bills, apps, and household costs.
- **[Chennai local news](/chennai-local-news)** — latest city stories.`.trim();

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
      "Chennai homes can save up to ₹78,000 on rooftop solar — the bigger story is energy independence",
    summary:
      "PM Surya Ghar and TANGEDCO’s USRP portal are pushing Chennai from green-energy awareness to bill-focused rooftop adoption. National scale has crossed 40 lakh households; local guides cite up to ₹78,000 CFA for eligible 3 kW systems.",
    dek: "Chennai desk — subsidy route, TN application portal, market shift, and what homeowners should verify before signing.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: PM_SURYA_GHAR_URL,
    sourceName:
      "PM Surya Ghar: Muft Bijli Yojana — Ministry of New and Renewable Energy national portal",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "checklist",
      title: "Before you sign a rooftop solar quote in Chennai",
      items: [
        {
          id: "bills",
          label: "Collect 12 months of TANGEDCO bills and note peak summer units",
        },
        {
          id: "portals",
          label: "Register on pmsuryaghar.gov.in and track USRP / TANGEDCO steps",
        },
        {
          id: "vendor",
          label: "Confirm vendor empanelment and who owns feasibility paperwork",
        },
        {
          id: "size",
          label: "Match kW to real load — ignore one-size-fits-all packages",
        },
        {
          id: "net-meter",
          label: "Get net-meter timeline and inspection milestones in writing",
        },
        {
          id: "subsidy-dbt",
          label: "Understand CFA / DBT steps — no advance based on verbal subsidy promises",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-chennai-rooftop-solar] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-chennai-rooftop-solar] Inserted article:", SLUG);
  }

  console.log(
    "[seed-chennai-rooftop-solar] Public URL:",
    `/chennai-local-news/${SLUG}`,
  );
  console.log("[seed-chennai-rooftop-solar] Hero image:", HERO_IMAGE_URL);

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-chennai-rooftop-solar",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
