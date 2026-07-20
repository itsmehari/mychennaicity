/**
 * Skyroot Vikram-1 — first private Indian orbital launch (18 July 2026) — full analysis.
 *
 * Dev:  `npm run db:seed:skyroot-vikram-1-orbital-launch-analysis-july-2026`
 * Live: `npm run db:seed:skyroot-vikram-1-orbital-launch-analysis-july-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

/**
 * ISRO press photo — Vikram-1 on the First Launch Pad at SDSC SHAR.
 * Prefer absolute ISRO URL until the self-hosted copy is deployed with the next release;
 * local mirror kept at public/images/articles/skyroot-vikram-1-launch-pad-sdsc-shar-july-2026.webp.
 */
const HERO_IMAGE_URL =
  "https://www.isro.gov.in/media_isro/image/index/Latest/015A4833.jpg.webp";

const ISRO_RELEASE =
  "https://www.isro.gov.in/First_private_orbital_launch_lifts_from_Sriharikota.html";
const IN_SPACE = "https://www.inspace.gov.in/";
const SKYROOT = "https://skyroot.in/";

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

const SLUG = "skyroot-vikram-1-private-orbital-launch-analysis-july-2026";

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

  const publishedAt = new Date("2026-07-20T07:30:00.000Z");
  const now = new Date();

  const reportBody = `## Key takeaways

- On **18 July 2026** at **12:05:30 pm**, Skyroot Aerospace’s **Vikram-1** lifted off from ISRO’s Satish Dhawan Space Centre, Sriharikota — the first orbital launch by a private Indian company from Indian soil, on the first attempt.
- ISRO confirmed that **SCOPE** and **Grahaa** satellites were injected into low-Earth orbit; other payloads remained on the upper stage for planned in-orbit experiments.
- Vikram-1 is a **four-stage** small-satellite launcher: **three solid stages** plus a **liquid orbital-adjustment stage**, marketed for up to about **350 kg to LEO** and **260 kg to SSO**.
- The vehicle is **privately developed** but **institutionally enabled**: Skyroot owned architecture, composites, avionics and commercial programme; ISRO and IN-SPACe supplied facilities, testing, pad access, safety supervision and clearances no startup could economically duplicate alone.
- A first orbital success proves the technical chain. It does **not** yet prove monthly production cadence, mature unit economics or multi-flight reliability.

## Disclaimer

This article is **independent public-interest analysis** for mychennaicity.in readers. It is **not** an official ISRO, IN-SPACe or Skyroot Aerospace statement, not investment advice, and not a technical flight-safety document.

Facts about the launch outcome, payloads and government support are drawn primarily from ISRO’s public release of 18 July 2026 and contemporaneous reporting. Vehicle marketing numbers (payload class, composite claims, manufacturing cadence) reflect company and industry statements and may change.

**Cost and pricing figures** for programme development, per-launch cash cost and commercial ticket prices are **editorial reconstructions and scenarios**, not disclosed Skyroot audited accounts. Where a company figure has not been published, this article says so. Do not treat estimates as confirmed spending or as a recommendation to buy or sell securities.

Propellant formulations, detailed drawings, facility-use contracts and any patent licences are largely confidential; this piece does not invent them.

## Summary

**Sriharikota / India, 18–20 July 2026** — Skyroot Aerospace did not succeed by recreating every part of India’s public space infrastructure on its own. It succeeded through a carefully divided model:

- **Skyroot** owned the launch-vehicle architecture, systems engineering, composites, avionics, software, stage-separation technology and commercial programme.
- **ISRO** supplied infrastructure that no startup could economically duplicate at speed: propellant-processing facilities, static-test stands, liquid-engine testing, launch-pad access, trajectory support, safety supervision and technical reviews.
- **Private industrial partners** supplied specialised materials and components — notably solid propellant from Solar Industries, according to post-launch industry reporting.
- **Investors** absorbed nearly eight years of development risk before orbital-launch revenue became possible.
- Skyroot selected a **technically conservative** first orbital vehicle: three solid stages plus a relatively small liquid orbital stage, rather than attempting a large turbopump-fed cryogenic rocket immediately.

The central conclusion is simple:

**Vikram-1 is privately developed, but institutionally enabled.** It is not an independently built ecosystem operating outside ISRO.

Tamil Nadu readers have a direct institutional link: ISRO states that the **Raman-I** liquid upper-stage engine was tested at the **Liquid Propulsion Systems Centre (LPSC)** test facility — part of the same national propulsion chain that has long run through Tamil Nadu’s Mahendragiri complex.

## What exactly did Vikram-1 achieve?

Vikram-1 is a four-stage expendable small-satellite launcher.

| Parameter | Publicly stated capability |
| --- | --- |
| Vehicle height | Approximately 22 metres |
| Stages | Four |
| Lower propulsion | Three solid-propellant stages |
| Upper propulsion | Liquid orbital-adjustment stage |
| Maximum LEO payload | Up to about 350 kg |
| Maximum SSO payload | Up to about 260 kg |
| Maiden mission orbit | Approximately 450 km LEO |
| Structure | Predominantly all-carbon composite (company description) |
| Commercial model | Dedicated and rideshare missions |
| Launch result | Successful orbital insertion on first attempt |

Skyroot markets Vikram-1 for rapid, precise and customisable small-satellite deployment. Company materials cite capacities on the order of **350 kg to LEO** and **260 kg to sun-synchronous orbit**, with dedicated-launch and custom-orbit options.

This was more than a rocket test. The mission validated an entire chain: vehicle manufacturing, propellant casting, structural integrity, stage ignition and separation, avionics and flight software, guidance and control, ground processing, payload integration, range safety, orbital injection, and government–private launch authorisation.

Reaching orbit is fundamentally different from merely crossing the recognised boundary of space. A suborbital rocket can rise and fall. An orbital rocket must accelerate horizontally to roughly orbital velocity while controlling structural loads, staging, attitude and insertion accuracy.

## How Skyroot pulled it off

### Lowest-complexity credible orbital architecture

The most important early decision was using **three solid stages** followed by **one liquid stage**.

Solid propulsion offers few moving propulsion components, no turbopumps, simpler last-minute propellant loading, long storage life, high liftoff thrust and relatively straightforward launch preparation once the manufacturing process stabilises.

The disadvantage is that a solid motor generally cannot be shut down, deeply throttled or restarted. Its thrust profile is largely fixed once ignited.

Skyroot therefore reserved the finer orbital work for the liquid upper stage:

- **Solid stages** produce most of the energy required to climb through the atmosphere and gain velocity.
- **Liquid stage and small thrusters** refine attitude, orbital insertion and payload deployment.

That choice was less ambitious than developing a new semi-cryogenic or cryogenic launch vehicle immediately — and far more likely to succeed within startup-level capital and time constraints.

### Carbon composites and the mass problem

Solid rockets can become structurally heavy if conventional steel motor cases are used. Every kilogram of casing reduces the payload that can be carried to orbit.

Skyroot’s answer was an extensively carbon-composite vehicle, including large composite motor casings and interstage structures. The company describes Vikram-1 as an all-carbon-composite launch vehicle.

The first-stage **Kalam-1200** motor was particularly significant in public programme reporting: roughly **11 metres** long, about **1.7 metres** in diameter, a monolithic composite motor casing, and around **30 tonnes** of solid propellant. ISRO imagery and captions from the campaign identify static testing of the Kalam-1200 motor at SDSC SHAR.

Composite construction provides lower inert mass, high strength-to-weight ratio, corrosion resistance and fewer joints — but manufacturing consistency is hard. Cases must survive pressure, vibration, bending, temperature gradients and acoustic loads without fibre delamination or microscopic defects. This is likely one of Skyroot’s most strategically valuable technology areas.

### Additive manufacturing where it mattered most

Government post-launch description highlighted a **100% 3D-printed liquid engine** in the orbital-adjustment module. That does **not** mean the entire rocket was 3D printed. Large solid stages, composite cases, avionics, tanks, nozzles, actuators and structures use other processes.

Additive manufacturing was applied selectively where lower part count, consolidated fluid channels and rapid design iteration offered a direct advantage for a small liquid engine.

### Low-shock stage separation

Stage separation is one of the highest-risk moments in flight. Skyroot developed an in-house ultra-low-shock pneumatic separation system. Public qualification reporting described stages separating by about **1.2 metres** in roughly **0.2 seconds** while maintaining narrow clearances.

Pneumatic separation can reduce shock relative to some traditional pyrotechnic devices — valuable for sensitive small satellites, optical payloads, compact avionics and rideshare manifests.

### Incremental qualification before committing to flight

Skyroot followed a stepwise path: component propulsion tests, motor static firings, composite structure testing, the **Vikram-S** suborbital demonstrator (**18 November 2022**), mission-computer testing, nozzle and TVC work, interstage and separation qualification, full-stage static firing, launch-site integration, then the maiden orbital mission.

Vikram-S was not merely a publicity flight. It provided operational experience in launch-site processing, aerodynamics, telemetry, flight software, composite structures, regulatory coordination, range safety and real launch operations. Industry reporting before the orbital mission suggested that a large share of relevant systems had some prior validation through Vikram-S and subsequent ground testing.

## Technology stack in Vikram-1

### Propulsion

Three solid-propellant lower stages feed a liquid orbital-adjustment upper stage. Publicly disclosed elements include:

- Composite solid-motor cases and cast solid propellant (exact grain chemistry undisclosed)
- Ablative or composite nozzles and flex-nozzle thrust-vector control
- **Raman-I** liquid upper-stage engine — tested at **ISRO LPSC** facilities, per ISRO
- Smaller **Raman** thrusters (public test reports cite **50-newton** units for pitch and yaw in the orbital-adjustment module)

Exact propellant formulations, burn-rate modifiers, insulation recipes and nozzle materials are among the most tightly protected elements of any solid-rocket programme and are not reconstructed here.

### Avionics and guidance

An independent avionics stack is required for flight computer, inertial navigation, guidance algorithms, power distribution, telemetry, stage-event sequencing, fault detection, TVC commands and payload deployment.

India’s Copyright Office records a Skyroot computer-software registration titled **SOLPROP** (November 2023), earlier identified in application materials as ballistic-performance-evaluation software — evidence the company built internal solid-propulsion analysis tools rather than depending entirely on third-party packages.

### Structure and manufacturing

Structures include carbon-composite motor cases, composite interstages, fairing, load-transfer rings, avionics bays and separation interfaces. Skyroot has described Kalam-1200 casing production through a proprietary filament-winding process. Process control — fibre angle, resin content, cure, void limits, dome geometry — can be more commercially valuable than the rocket’s visible silhouette.

Skyroot’s **Infinity Campus** in Hyderabad is publicly described as a large integrated design-and-build campus with a stated manufacturing capacity of about **one orbital rocket per month**. That figure is factory capacity, not guaranteed launch cadence. Pad availability, range scheduling, regulation, payloads, weather, insurance and mission analysis all constrain actual flight rate.

## What technology came from the government?

Wording must stay precise. Skyroot did not simply “borrow ISRO’s rocket.” Public evidence shows Skyroot development plus ISRO infrastructure access, technical assistance, IN-SPACe regulatory coordination and joint launch-campaign execution.

ISRO’s 18 July 2026 release confirms, among other points:

| Government contribution | Confirmed status |
| --- | --- |
| Solid-motor casting facilities at Sriharikota | Confirmed |
| Static testing of first-stage motor | Confirmed |
| Validation of second-stage motor | Confirmed |
| Raman-I liquid-engine test at LPSC | Confirmed |
| Material handling and stage transportation | Confirmed |
| Vehicle preparation support | Confirmed |
| Trajectory analysis | Confirmed |
| Integration on ISRO’s First Launch Pad | Confirmed |
| Round-the-clock safety supervision | Confirmed |
| Technical consultancy (via IN-SPACe mechanism) | Confirmed |
| Mission-readiness reviews and launch clearances | Confirmed |

ISRO further states that the first-stage solid motor was cast and tested at SDSC facilities, and that IN-SPACe established the mechanism for non-governmental entities to access ISRO facilities and obtain consultancy, reviews and clearances.

### What has not been publicly proven

There is **no** public evidence establishing that Skyroot purchased the PSLV design, licensed the SSLV architecture, copied a complete ISRO solid-motor design, received a full ISRO engine blueprint, acquired PSLV guidance software, used an ISRO-owned flight computer as the vehicle brain, or purchased a complete government-developed rocket stage for Vikram-1.

The official description consistently identifies Vikram-1 as developed by Skyroot, while separately listing facilities and support from ISRO and IN-SPACe.

**Defensible conclusion:** government support was extensive at the infrastructure, testing, launch-operation and review levels. A transfer of the core Vikram-1 vehicle design has **not** been demonstrated publicly.

## Copyright, patents and intellectual property

“Copyrighted technology” is not the correct umbrella term. Different assets are protected differently: software by copyright; inventions by patent; propellant recipes and process know-how often by trade secret; names and logos by trademark; facility use by contract.

Publicly visible Skyroot-owned or claimed IP includes SOLPROP software, proprietary filament-winding and composite casing methods, pneumatic separation know-how, mission systems, vehicle architecture, Raman-family propulsion development and qualification data.

What remains confidential includes facility-use charges, any cost waivers, ownership of improvements developed during assisted testing, depth of design consultancy beyond reviews, commercial CAD/CFD/FEA licences, and specific foreign-origin avionics vendors. No responsible analysis should fabricate those answers.

## Private supply chain: Solar Industries and others

Post-launch reporting, including statements attributed to Solar Industries, indicates the company manufactured solid propellant used in Vikram-1, supported earlier static trials, supplied related propulsion materials and a heat-mounted safety actuator, and was an early Skyroot investor.

That relationship is strategically intelligent. Solid-propellant production requires explosives licences, controlled chemical infrastructure, mixing and casting, safety systems, NDT and batch traceability. Skyroot could retain design authority while using a qualified industrial producer instead of recreating the entire energetics industry in-house.

A launch vehicle also normally sources carbon fibre, resins, sensors, processors, batteries, valves, actuators, telemetry hardware and additive-manufacturing powders from specialised vendors. Public information is insufficient to name most of those suppliers.

## Known financing position

Skyroot was founded in **2018**. In **May 2026**, contemporaneous reporting said it raised another **US$60 million** led by GIC and Sherpalo Ventures, with BlackRock participation — bringing total capital raised to about **US$160 million** and a reported valuation near **US$1.1 billion**, with proceeds aimed at Vikram-1 cadence, manufacturing and Vikram-2.

Secondary filing-based reports have also described a **₹100 crore** non-convertible debenture raise in March 2026 and an FY25 loss near **₹99.7 crore**. Provisional reporting of roughly **₹100.6 crore** FY26 operating revenue from space-systems work — before commercial orbital-launch operations — suggests the company began monetising components or systems capability ahead of launch-service cash flows. Those secondary figures should be read as reported, not as a substitute for a full audited annual report published by the company.`.trim();

  const analysisBody = `## Estimated Vikram-1 development budget

Skyroot has **not** disclosed the development cost of Vikram-1. Contemporary reporting explicitly noted that the figure was not released.

The following is a **reconstructed editorial estimate**, not a company figure.

| Cost category | Estimated range |
| --- | --- |
| Engineering team, programme management and specialist labour | ₹180–280 crore |
| Solid-motor development, composite tooling and test articles | ₹120–190 crore |
| Raman propulsion, avionics, guidance and separation systems | ₹70–120 crore |
| Vikram-S demonstrator and associated development | ₹30–60 crore |
| Ground qualification and destructive test hardware | ₹45–80 crore |
| Allocated manufacturing facilities and capital equipment | ₹60–120 crore |
| Launch campaign, transportation, range and integration | ₹25–50 crore |
| Regulatory, quality, insurance and mission assurance | ₹15–30 crore |
| Corporate overhead, delays, rework and contingency | ₹60–100 crore |
| **Estimated total** | **₹605–1,030 crore** |

A reasonable central estimate is **₹700–850 crore** to take the Vikram technology family from early development through Vikram-S and the first successful Vikram-1 orbital flight.

That does **not** mean ₹700–850 crore was spent solely on the physical rocket that flew on 18 July. Programme cost includes hardware destroyed in static tests, prototypes, software, multi-year salaries, tooling, qualification campaigns, Vikram-S, inventory and manufacturing capability reusable for later vehicles.

Skyroot’s roughly **US$160 million** of total capital raised is consistent with a development programme in this range while still leaving capital for working capital, Infinity Campus, later Vikram-1 missions and Vikram-2.

## Estimated cost of one Vikram-1 launch

The maiden flight would have been significantly more expensive than a mature production flight because of non-recurring engineering, extra inspections, first-of-type integration and higher review overhead.

**Mature recurring cash-cost model (editorial estimate):**

| Per-launch component | Estimated cost |
| --- | --- |
| Three solid stages, propellant, cases and nozzles | ₹15–24 crore |
| Liquid upper stage and attitude-control propulsion | ₹3–6 crore |
| Avionics, power, telemetry and flight computer | ₹3–5 crore |
| Fairing, interstages and separation systems | ₹2–4 crore |
| Assembly, testing and quality assurance | ₹4–7 crore |
| Transport, range and launch campaign | ₹4–8 crore |
| Payload integration and mission operations | ₹2–4 crore |
| Failure reserve, warranty and contingency | ₹3–7 crore |
| **Estimated recurring cash cost** | **₹36–65 crore** |

At stable production, reasonable analytical targets would be:

- Cash production and launch cost: **₹35–50 crore**
- Fully burdened cost including depreciation and ongoing R&D: **₹45–70 crore**
- Probable commercial price required for a dedicated mission: **₹55–85 crore**

No public Vikram-1 price list has been disclosed. These price bands are scenarios for readers, not quotes.

## Why customers might pay more than a SpaceX rideshare

SpaceX currently lists rideshare pricing beginning at about **US$350,000 for 50 kg**, with additional mass often cited near **US$7,000 per kilogram**. At that rate, a 350 kg booking would nominally cost about **US$2.45 million**, before mission-specific services and constraints.

Vikram-1 is unlikely to win against Falcon 9 purely on cost per kilogram.

Its commercial justification is different:

| Mass-market rideshare | Vikram-1 dedicated launch |
| --- | --- |
| Customer follows aggregator’s schedule | Customer can influence launch schedule |
| Predetermined primary orbit | Greater orbital customisation |
| Possible need for an orbital-transfer vehicle | Direct deployment may be possible |
| Larger manifest dependency | Smaller number of co-passengers |
| Schedule changes may affect all payloads | Mission can be tailored to one customer |
| Lower nominal cost/kg | Higher mission control and responsiveness |

Skyroot is selling schedule control, orbit control, faster integration, sovereign Indian launch access, dedicated-mission confidentiality and reduced dependency on foreign launch providers — not kilograms alone.

## Break-even analysis

Economics depend primarily on production rate and selling price.

Assume annual fixed expenditure of roughly **₹250–350 crore** after scale-up (engineering, campus, quality, sales, administration, continuing R&D, Vikram-2 development and depreciation).

Illustrative scenarios if fixed cost is about **₹300 crore**:

| Scenario | Average launch price | Recurring cost | Contribution per launch | Flights to cover ₹300 crore fixed |
| --- | --- | --- | --- | --- |
| Price-pressure case | ₹55 crore | ₹43 crore | ₹12 crore | ~25 |
| Base case | ₹70 crore | ₹42 crore | ₹28 crore | ~11 |
| Premium dedicated case | ₹85 crore | ₹40 crore | ₹45 crore | ~7 |

Stated manufacturing capacity of one rocket per month would theoretically permit around **12** vehicles annually. Under the base model, **10–12** launches per year could move Vikram-1 operations toward standalone operating viability. Under lower pricing or lower cadence, the company would still need space-systems revenue, government or strategic missions, higher-margin dedicated launches, investor capital, Vikram-2 upside or component sales.

**The first successful flight proves technology. It does not yet prove commercial economics.**

## What the first launch does and does not prove

### It proves

- The complete vehicle can reach orbit
- Stage sequencing, guidance and major composite structures performed adequately
- Propulsion batches performed within usable limits
- Stage separation and upper-stage operations achieved orbital conditions
- Skyroot can execute a launch campaign with ISRO and IN-SPACe
- The company’s systems-engineering organisation is credible

### It does not yet prove

- Ten or twelve launches per year
- Consistent manufacturing between batches
- Commercial gross margins or competitive mature pricing
- Rapid turnaround or high reliability over multiple missions
- Launch-pad independence
- Large international customer backlog
- Insurance acceptability at mature rates
- Long-term supply-chain resilience

One success unlocks customer negotiations. Insurers and institutional satellite operators will still look for a sequence of successful flights. **Three to five consecutive orbital missions** would materially strengthen commercial confidence.

## Major vulnerabilities

**Dependence on ISRO infrastructure.** Sriharikota’s pad, range, safety systems, tracking, propellant facilities, test stands and technical workforce dramatically lower startup capital requirements — and can create scheduling dependence if the government manifest is busy.

**Small-launch market pressure.** Dedicated small launchers compete with Falcon 9 rideshare, other international small launchers, ISRO’s SSLV, future Indian private launchers, orbital-transfer vehicles and constellation operators who prefer bulk deployments.

**Solid-propellant constraints.** Solids are robust but generally cannot restart, offer limited throttle control, demand precise manufacturing and can be difficult to inspect internally once cast.

**Capital intensity.** Inventory, destructive testing, low early flight rates, customer delays, insurance and occasional failure can erase a year of contribution margin.

**Transition to Vikram-2.** A larger cryogenic-capable vehicle opens a bigger market but adds thermal management, feed-system complexity, restart challenges and longer qualification — with the organisational risk of diluting focus while Vikram-1 is still entering production.

## Final IP and government-support verdict

### Skyroot can legitimately claim

Privately developed launch-vehicle programme; private system architecture and integration; proprietary composite manufacturing; proprietary separation technology; internal propulsion-analysis software; private avionics and mission systems; commercial programme ownership; private capital bearing development risk.

### ISRO and the government can legitimately claim

Essential infrastructure enablement; propellant-processing and motor-test support; liquid-engine test access; launch-pad and range access; vehicle integration and logistics support; trajectory assistance; safety management; technical reviews; regulatory and launch clearance; and a policy environment that made the programme possible.

### No evidence supports the allegation that

Skyroot merely rebadged an ISRO rocket; Vikram-1 is a privately painted PSLV or SSLV; the company received an entire government rocket design; or that its key private technologies are only copied public-sector technologies.

The accurate description is:

**Skyroot developed the launch vehicle by combining its own engineering and private capital with India’s accumulated public infrastructure, institutional expertise and industrial supply chain.**

That is not a weakness in the model. It is how successful commercial-space ecosystems normally develop. NASA infrastructure, military ranges and government contracts were instrumental in the rise of American launch companies. Skyroot is an Indian version of the public-infrastructure / private-innovation model.

## Overall judgement

| Lens | Assessment |
| --- | --- |
| Engineering execution | Strong — disciplined, sufficiently conservative architecture matched to available capital |
| Technology ownership | Substantive but not fully transparent — clear private composites, software, separation and systems evidence; propulsion/consultancy boundaries remain confidential |
| Government contribution | Essential — without ISRO facilities, pad, safety and reviews, cost and schedule would have been far worse |
| Financial execution | Capital intensive but credible — ₹700–850 crore central programme estimate fits funding history |
| Per-launch economics | Not yet demonstrated — ₹35–50 crore mature cash cost and ₹55–85 crore selling price could work near 8–12 launches/year |
| Commercial position | Premium responsiveness, not lowest price per kilogram |
| Strategic significance | Very high — hardest technical threshold crossed; next threshold is industrial: repeat production, predictable scheduling, multiple successes and positive unit economics |

## Fact box — Vikram-1 at a glance

- **Operator / developer:** Skyroot Aerospace (Hyderabad)
- **Launch site:** Satish Dhawan Space Centre, Sriharikota (ISRO First Launch Pad)
- **Liftoff:** 18 July 2026, 12:05:30 pm IST
- **Mission result:** Orbital insertion on first attempt; SCOPE and Grahaa injected to LEO (ISRO)
- **Architecture:** 4 stages — 3 solid + liquid orbital-adjustment stage
- **Prior flight:** Vikram-S suborbital demonstrator, 18 November 2022
- **Regulators / partners:** IN-SPACe authorisation pathway; ISRO facility and range support

## Sources

- [ISRO: First private orbital launch lifts off from Sriharikota (18 July 2026)](${ISRO_RELEASE})
- [IN-SPACe](${IN_SPACE})
- [Skyroot Aerospace](${SKYROOT})
- Contemporaneous coverage in The Hindu, Business Standard, Economic Times, SpaceNews and other outlets on Mission Aagaman payloads, financing rounds and industrial partners

## Editorial note and disclaimers

**Estimates are labelled.** Development-budget ranges, per-launch cash costs, selling-price bands and break-even scenarios are analytical reconstructions for civic readers. They are **not** Skyroot financial disclosures and should not be used as investment advice.

**Primary over secondary.** Prefer ISRO’s release for launch outcome, payloads remaining on the upper stage, and the list of facilities and support. Prefer company primary materials for marketing payload class and manufacturing claims when they differ from secondary summaries.

**Hero image.** The accompanying photograph is an ISRO media image of Vikram-1 on the launch pad at SDSC SHAR, used as representational coverage of the publicly reported mission. Credit: ISRO.

**Right of correction.** If Skyroot, ISRO, IN-SPACe or Solar Industries issue a formal clarification on costs, ownership of process improvements, propellant supply scope or payload status, mychennaicity.in will update this article in good faith after verification.`.trim();

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
      "Vikram-1 full analysis: how Skyroot reached orbit with ISRO’s infrastructure — and what the economics still have to prove",
    summary:
      "Skyroot’s Vikram-1 reached LEO on 18 July 2026 — India’s first private orbital launch from Sriharikota. Privately developed, institutionally enabled: composites, solids-plus-liquid architecture, ISRO facilities, and estimated programme economics through first success.",
    dek: "Vikram-1 is privately developed, but institutionally enabled. One orbital success proves the vehicle chain — not yet monthly cadence or mature launch margins.",
    body,
    reportBody,
    analysisBody,
    category: "Economy",
    areaHubSlug: null as string | null,
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: ISRO_RELEASE,
    sourceName:
      "ISRO public release, 18 July 2026; IN-SPACe; Skyroot Aerospace; contemporaneous press reporting",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "Did Skyroot’s Vikram-1 actually reach orbit?",
          answer:
            "Yes. ISRO’s 18 July 2026 release states that Vikram-1 lifted off from Satish Dhawan Space Centre at 12:05:30 pm and that SCOPE and Grahaa were injected into low-Earth orbit, with other payloads remaining on the upper stage for in-orbit experiments. It was the first private Indian orbital launch from Indian soil, on the first attempt.",
        },
        {
          question: "Is Vikram-1 just a private copy of PSLV or SSLV?",
          answer:
            "There is no public evidence that Skyroot purchased or rebadged a complete ISRO vehicle design. Official wording identifies Vikram-1 as developed by Skyroot while listing extensive ISRO facility access, testing, pad integration, safety supervision and IN-SPACe clearances. The accurate model is private vehicle development enabled by public infrastructure.",
        },
        {
          question: "What did ISRO actually provide?",
          answer:
            "ISRO confirmed solid-motor casting and static-test access at Sriharikota, validation of first- and second-stage motors, Raman-I liquid-engine testing at LPSC facilities, material handling and transport, trajectory analysis, First Launch Pad integration, 24×7 safety supervision, and — with IN-SPACe — technical consultancy, mission-readiness reviews and launch clearances.",
        },
        {
          question: "Why use three solid stages plus one liquid stage?",
          answer:
            "Solids deliver high thrust with fewer moving parts and simpler operations for a first commercial vehicle. The liquid upper stage then handles finer orbital insertion, attitude work and payload deployment. That architecture is more conservative — and more startup-feasible — than jumping straight to a large cryogenic turbopump vehicle.",
        },
        {
          question: "How much did Vikram-1 cost to develop?",
          answer:
            "Skyroot has not disclosed a programme figure. This article’s central editorial estimate is about ₹700–850 crore through Vikram-S and first orbital success (wider band ₹605–1,030 crore), covering multi-year labour, test articles, tooling, facilities allocation and the launch campaign — not only the flight vehicle. Treat those numbers as analysis, not audited company accounts.",
        },
        {
          question: "Can Vikram-1 undercut SpaceX rideshare on price per kilogram?",
          answer:
            "Unlikely as a pure cost/kg play. The commercial case is schedule control, custom orbits, sovereign Indian access and dedicated-mission confidentiality. Analytical mature ticket bands in this piece are roughly ₹55–85 crore for a dedicated mission, assuming cash launch costs near ₹35–50 crore at stable production.",
        },
        {
          question: "What still has to be proven after one success?",
          answer:
            "Repeat production quality, multi-flight reliability, insurance terms at mature rates, pad scheduling independence, customer backlog and positive unit economics at roughly 8–12 flights a year. Three to five consecutive orbital missions would materially strengthen commercial confidence.",
        },
        {
          question: "Is this investment advice?",
          answer:
            "No. Financing figures from secondary reporting and all cost/price scenarios are for public-interest understanding of India’s private launch economics. Consult primary filings and licensed advisers before any investment decision.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-vikram-1] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-vikram-1] Inserted article:", SLUG);
  }

  console.log("[seed-vikram-1] Public URL:", `/chennai-local-news/${SLUG}`);
  console.log("[seed-vikram-1] Hero image:", HERO_IMAGE_URL);

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-vikram-1",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
