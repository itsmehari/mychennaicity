/**
 * Seeds Chennai city + published local-news articles.
 *
 * Dev: `npm run db:seed` — uses `.env.local` then `.env` (DATABASE_URL).
 * Live: `npm run db:seed:live` — uses **only** `.env.production.local` (pull from Vercel or paste Neon URL).
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";

const live =
  process.env.SEED_LIVE === "1" || process.argv.includes("--live");

if (live) {
  loadEnv({ path: ".env.production.local" });
} else {
  loadEnv({ path: ".env.local" });
  loadEnv({ path: ".env" });
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    live
      ? "Live seed: DATABASE_URL missing.\n" +
          "Create .env.production.local with your production Neon URL, e.g.\n" +
          "  vercel env pull .env.production.local --environment=production --yes\n" +
          "Or paste DATABASE_URL= from Neon dashboard (pooled or direct)."
      : "DATABASE_URL missing — add to .env.local or use npm run db:seed:live",
  );
  process.exit(1);
}

if (live) {
  const hostMatch = url.match(/@([^/?]+)/);
  console.log("[db:seed:live] Target DB host:", hostMatch?.[1] ?? "(unparsed)");
}

const db = drizzle(neon(url), { schema });

const CHENNAI = { slug: "chennai", name: "Chennai", countryCode: "IN" };

type SeedArticle = {
  slug: string;
  title: string;
  summary: string;
  dek: string;
  category: string;
  featured: boolean;
  publishedAt: Date;
  sourceUrl: string;
  sourceName: string;
  reportBody: string;
  analysisBody: string;
  interactiveJson: Record<string, unknown>;
};

const seeds: SeedArticle[] = [
  {
    slug: "bjp-goyal-tn-nda-seat-sharing",
    title:
      "BJP says Piyush Goyal to finalise Tamil Nadu NDA seat-sharing as polls near",
    summary:
      "State BJP indicates Union Minister Piyush Goyal will close NDA seat talks for Tamil Nadu with polling set for 23 April 2026.",
    dek: "Alliance arithmetic tightens as nomination week approaches.",
    category: "Politics",
    featured: true,
    publishedAt: new Date("2026-03-23T08:00:00Z"),
    sourceUrl:
      "https://www.hindustantimes.com/india-news/union-minister-piyush-goyal-to-finalise-seat-sharing-for-tamil-nadu-elections-today-bjp-101774229351188.html",
    sourceName: "Hindustan Times",
    reportBody: `## What we know

The BJP has indicated that Union Minister Piyush Goyal will lead final seat-sharing negotiations for the National Democratic Alliance in Tamil Nadu. The state votes on **23 April 2026**, with counting on **4 May**, under an active Model Code of Conduct.

Coalition partners are aligning on constituency-level allocations in Chennai and across Tamil Nadu. Official announcements are expected to follow internal sign-off from alliance leadership.`,
    analysisBody: `## Why Chennai watchers should care

Chennai’s urban constituencies are high-visibility contests: media density, organised resident groups, and infrastructure flashpoints (water, waste, Metro phases) make alliance chemistry visible quickly. A late seat swap in a city seat can scramble ground campaigns that were built around a named candidate for weeks.

For residents, the practical signal is **stability of candidate lists** in the next fortnight—watch for withdrawals, rebel filings, and last-minute symbol changes. mychennaicity.in will map city seats once slates firm up.`,
    interactiveJson: {
      type: "checklist",
      title: "Following coalition news without the noise",
      items: [
        { id: "1", "label": "Verify candidate from ECI / party site before sharing WhatsApp forwards" },
        { id: "2", "label": "Note filing window: nominations from 30 March; scrutiny 7 April" },
        { id: "3", "label": "Treat “leaked” seat PDFs as unconfirmed until parties publish" },
      ],
    },
  },
  {
    slug: "chennai-polls-cash-valuables-proof",
    title:
      "Tamil Nadu polls: carrying cash or valuables in Chennai? Squads may ask for proof",
    summary:
      "Flying squads can question large cash movement during MCC; residents should keep documentation handy.",
    dek: "Model code vigilance is visible on arterial roads and transit hubs.",
    category: "Chennai",
    featured: true,
    publishedAt: new Date("2026-03-23T09:30:00Z"),
    sourceUrl:
      "https://timesofindia.indiatimes.com/city/chennai/tamil-nadu-polls-carrying-cash-or-valuables-be-ready-to-show-proof/articleshow/129626287.cms",
    sourceName: "The Times of India",
    reportBody: `## What we know

Election enforcement teams are active across Tamil Nadu under the Model Code of Conduct. Press reporting notes that persons moving **large sums of cash** or high-value purchases may be asked for **valid documentation**—bank receipts, invoices, or legitimate purpose papers—so squads can rule out illicit distribution of money for votes.

Chennai, as the state’s economic hub, sees frequent cash movement for business, property, and weddings; enforcement is uneven by corridor but the legal framework is statewide.`,
    analysisBody: `## What this means in practice

This is not a ban on carrying cash—it is a **documentation and proportionality** check during a sensitive enforcement window. If you are moving cash for a documented property closure, vendor payment, or hospital emergency, carry paperwork that ties the amount to a lawful purpose.

If you are stopped, stay calm, ask for identification, and note the squad unit if you believe procedures were not followed—ECI channels exist for complaints. We are not legal advisers; when in doubt, consult a lawyer for large transactions during MCC.`,
    interactiveJson: {
      type: "poll",
      question: "Did you know MCC squads can inspect large cash movement during polls?",
      options: [
        { id: "yes", "label": "Yes, I follow ECI advisories" },
        { id: "somewhat", "label": "Somewhat — this is new detail" },
        { id: "no", "label": "No — first time reading this" },
      ],
    },
  },
  {
    slug: "thousand-lights-ezhilan-field-work",
    title:
      "Thousand Lights MLA Ezhilan on party machinery, flood work, and the 2026 contest",
    summary:
      "DMK’s N. Ezhilan speaks on constituency work and election preparedness in central Chennai.",
    dek: "Central Chennai seat mixes heritage streets with dense apartment blocks.",
    category: "Elections",
    featured: true,
    publishedAt: new Date("2026-03-23T11:00:00Z"),
    sourceUrl:
      "https://www.thehindu.com/elections/tamil-nadu-assembly/only-structured-party-machinery-with-popularity-can-ensure-success-says-thousand-lights-dmk-mla-n-ezhilan/article70771692.ece",
    sourceName: "The Hindu",
    reportBody: `## What we know

In interview-style coverage, DMK MLA **Dr N. Ezhilan** (Thousand Lights) discusses his tenure and campaign approach. He points to **flood mitigation** work—citing a sharp reduction in chronic waterlogging spots compared with earlier years—and argues that structured party organisation plus popularity on the ground decides outcomes in 2026.

Thousand Lights spans mixed-income neighbourhoods, institutions, and commercial cores—making service delivery and visible infrastructure politically salient.`,
    analysisBody: `## Reading the race

Incumbent narratives in central Chennai often hinge on **stormwater performance** after extreme rain events, plus everyday GCC service quality (waste, roads, street lights). Opposition messaging typically tests whether micro-works match resident experience lane by lane.

mychennaicity.in separates **reported claims** from **ward-level verification** we publish separately—use this piece as context, not a scorecard.`,
    interactiveJson: {
      type: "checklist",
      title: "What residents can verify locally",
      items: [
        { id: "1", "label": "Storm drain desilting on your street — GCC zone helpline" },
        { id: "2", "label": "Ward committee meeting minutes (if posted)" },
        { id: "3", "label": "Corporator contact responsiveness on 311-style complaints" },
      ],
    },
  },
  {
    slug: "mapedu-multimodal-logistics-phase-one",
    title:
      "Mappedu multi-modal logistics park near Chennai nears Phase I opening",
    summary:
      "Tiruvallur-belt freight hub with rail and cold-chain components moves toward commissioning.",
    dek: "Chennai’s industrial belt shifts some port pressure inland.",
    category: "Economy",
    featured: false,
    publishedAt: new Date("2026-03-23T07:00:00Z"),
    sourceUrl:
      "https://www.thehindu.com/news/cities/chennai/first-phase-of-multi-modal-logistics-park-near-chennai-to-be-ready-next-month/article70770006.ece",
    sourceName: "The Hindu",
    reportBody: `## What we know

Reporting indicates **Phase I** of a **multi-modal logistics park** at **Mappedu** (Tiruvallur district, proximate to Chennai’s freight corridors) is approaching completion, with warehousing, cold storage, rail connectivity, and truck parking on a large land parcel. Capital cost figures in the **₹1,400+ crore** range have appeared in press estimates.

The facility is framed as easing highway congestion and improving cold-chain reliability for agri and pharma movements touching the Chennai region.`,
    analysisBody: `## Why it matters for Chennai commuters

New logistics capacity can **pull heavy truck trips** off some approach roads if rail legs are utilised—but last-mile connectivity and timing of toll/road upgrades determine whether residents feel relief. Watch for night-movement patterns and enforcement against illegal parking spillovers on village roads adjoining the park.

For SMEs, the park may change **landed cost** dynamics versus older godowns in Red Hills–Ambattur belts—worth tracking for anyone in distribution.`,
    interactiveJson: {
      type: "checklist",
      title: "Signals to watch after opening",
      items: [
        { id: "1", "label": "NH / SH peak-hour truck share on your commute" },
        { id: "2", "label": "Cold-chain spoilage complaints in wholesale markets" },
        { id: "3", "label": "Job postings for logistics roles in Tiruvallur belt" },
      ],
    },
  },
  {
    slug: "chennai-fuel-prices-march-22-2026",
    title: "Petrol and diesel prices in Chennai on 22 March 2026",
    summary:
      "Pump rates in the city largely steady; check before long drives or fleet runs.",
    dek: "Consumer desk — daily mobility cost.",
    category: "Consumer",
    featured: false,
    publishedAt: new Date("2026-03-22T18:00:00Z"),
    sourceUrl:
      "https://www.dtnext.in/news/chennai/check-out-petrol-and-diesel-prices-in-chennai-on-march-22-2026",
    sourceName: "DT Next",
    reportBody: `## What we know

Retail **petrol** and **diesel** prices in Chennai for **22 March 2026** are published in the city’s daily fuel bulletins (see source). Rates move with global crude and central/state tax components; intracity competition between bunk chains is usually narrow.

Use official Oil Company apps or trusted local bulletins before budgeting long OMR/ECR drives.`,
    analysisBody: `## Context

Fuel is a **pass-through inflation** driver for Chennai’s gig economy, school runs, and small logistics. During election season, consumers sometimes expect freezes—watch policy announcements, but rely on published retail boards for what you pay at the nozzle.`,
    interactiveJson: {
      type: "poll",
      question: "How do high fuel prices change your weekly travel in Chennai?",
      options: [
        { id: "metro", "label": "Shifted more trips to Metro / bus" },
        { id: "same", "label": "Same mode — absorbing cost" },
        { id: "carpool", "label": "More carpool / WFH" },
      ],
    },
  },
  {
    slug: "chennai-128-election-surveillance-vehicles",
    title:
      "128 vehicles deployed for election monitoring across Chennai’s 16 constituencies",
    summary:
      "ECI-aligned squads include flying teams, static surveillance, and video units; helpline publicised.",
    dek: "Enforcement visibility rises after poll date notification.",
    category: "Elections",
    featured: false,
    publishedAt: new Date("2026-03-22T12:00:00Z"),
    sourceUrl:
      "https://www.thehindu.com/elections/tamil-nadu-assembly/128-vehicles-deployed-for-election-monitoring-in-chennai-as-eci-announces-poll-dates/article70746956.ece",
    sourceName: "The Hindu",
    reportBody: `## What we know

After the Assembly election schedule was announced, Chennai’s district machinery detailed a **fleet of 128 vehicles** allocated across **16 constituencies** for surveillance work—covering flying squads, static surveillance teams, and video surveillance teams. A **toll-free control room** number has been publicised for complaints.

The deployment is part of standard MCC enforcement to curb inducements and intimidation.`,
    analysisBody: `## For residents

More visible patrols can mean **faster response** to cash distribution complaints but also occasional checkpoints that feel intrusive—know the difference between election squads and routine police beats. Save the **official helpline** from the Chief Electoral Officer’s releases rather than unverified forwards.

If you film enforcement interactions, respect privacy law proportionality—document facts without escalating risk.`,
    interactiveJson: {
      type: "checklist",
      title: "If you want to file a complaint",
      items: [
        { id: "1", "label": "Use CEO Tamil Nadu / ECI-published helpline numbers" },
        { id: "2", "label": "Note date, place, vehicle registration if safe" },
        { id: "3", "label": "Avoid naming individuals without evidence" },
      ],
    },
  },
  {
    slug: "chennai-poll-surveillance-seizures",
    title:
      "₹60.63 lakh in cash, liquor, narcotics seized in Chennai district amid poll surveillance",
    summary:
      "Intensified checks register seizures; enforcement continues under MCC.",
    dek: "District-level tally from surveillance drives.",
    category: "Chennai",
    featured: false,
    publishedAt: new Date("2026-03-22T15:00:00Z"),
    sourceUrl:
      "https://www.thehindu.com/news/cities/chennai/6063-lakh-in-cash-liquor-and-narcotics-seized-in-chennai-district/article70773164.ece",
    sourceName: "The Hindu",
    reportBody: `## What we know

District authorities reported seizures including **unaccounted cash** (around **₹60.63 lakh** in press tallies), **liquor**, **narcotics**, and precious metals during intensified surveillance around **21–22 March**. Figures aggregate multiple incidents and constituencies.

Seizures are logged as part of election expenditure monitoring—not every seizure implies conviction; due process follows.`,
    analysisBody: `## How to read the headline number

Aggregate seizure values are **headline indicators** of enforcement tempo, not a precise measure of “how clean” an election is. Large cities generate more interception simply from volume of movement.

Residents should treat social media clips as **partial evidence**—wait for official summaries and court/administrative follow-up where applicable.`,
    interactiveJson: {
      type: "poll",
      question: "Do seizure headlines change how confident you feel about fair polling?",
      options: [
        { id: "more", "label": "More confident" },
        { id: "same", "label": "Same as before" },
        { id: "less", "label": "More anxious / sceptical" },
      ],
    },
  },
  {
    slug: "chennai-arterial-road-widening-gcc",
    title:
      "Narrow stretches of arterial roads across Chennai may be widened soon, GCC told",
    summary:
      "Corporation identifies pinch points on key corridors to ease congestion.",
    dek: "Mobility — corporation-led road geometry fixes.",
    category: "Mobility",
    featured: false,
    publishedAt: new Date("2026-03-22T10:00:00Z"),
    sourceUrl:
      "https://www.thehindu.com/news/cities/chennai/narrow-stretches-of-arterials-roads-across-chennai-to-be-widened-soon/article70727353.ece",
    sourceName: "The Hindu",
    reportBody: `## What we know

Greater Chennai Corporation has been tasked with addressing **narrow arterial stretches** that choke peak traffic. Press reporting references **roughly 100 km** of priority corridors and named geographies such as **Velachery–Tambaram** links and **Padi flyover** surrounds—exact ward-wise lists should be verified from GCC releases.

Works typically bundle with stormwater and utility coordination to avoid repeated trenching.`,
    analysisBody: `## What residents should expect

Widening without Metro/bus priority upgrades sometimes **induces more traffic** (induced demand). Watch whether junction redesigns include **pedestrian refuge islands** and **bus stop pull-ins**—otherwise peak-hour experience may not improve for non-motorists.

mychennaicity.in will tag corridor stories to **area hubs** as GCC publishes zone-wise orders.`,
    interactiveJson: {
      type: "checklist",
      title: "Before your commute changes",
      items: [
        { id: "1", "label": "Check GCC / CMRL diversion notices" },
        { id: "2", "label": "Report unfinished trench patches via 1913 / zone X" },
        { id: "3", "label": "Note new pinch points after lane drops near schools" },
      ],
    },
  },
  {
    slug: "chennai-pre-monsoon-electrical-safety-advisory",
    title:
      "Ahead of monsoon: discoms flag loose outdoor wiring and unsafe earthing in Chennai homes",
    summary:
      "Utility advisories remind residents to inspect service lines, meters, and rooftop runs before heavy rain.",
    dek: "Consumer safety — a short checklist beats a trip to the ER during squalls.",
    category: "Consumer",
    featured: false,
    publishedAt: new Date("2026-03-21T12:00:00Z"),
    sourceUrl: "https://www.tangedco.gov.in/",
    sourceName: "Tamil Nadu Generation and Distribution Corporation Ltd. (TANGEDCO)",
    reportBody: `## What we know

State discom messaging each year repeats a simple pattern: **water + electricity** is dangerous. Before the southwest monsoon strengthens over Tamil Nadu, residents are nudged to have **licensed electricians** check **service mains**, **meter boxes**, **earthing**, and any **exposed outdoor runs** (terrace pumps, AC isolators, CCTV power).

GCC and resident welfare associations sometimes run parallel **storm drain** and **street light** audits—these are separate from household wiring but matter for flooded footpaths touching compound walls.`,
    analysisBody: `## Why this matters in Chennai

Dense wards mix old tiled roofs, new inverter setups, and informal extensions. A **single loose neutral** or **submerged DB** can energise gates or compound walls. If you rent, clarify who owns the **meter-to-premise** segment—landlords and tenants often argue after an incident.

This page is **not** a substitute for a site inspection. If you see sparks, burning smell, or water pooling at the meter, **stay clear** and call the discom helpline / a licensed contractor.`,
    interactiveJson: {
      type: "checklist",
      title: "10-minute pre-monsoon electrical pass",
      items: [
        { id: "1", "label": "Visually inspect overhead service drop for fraying or tree contact" },
        { id: "2", "label": "Confirm meter box lid seals and no pooled water at the base" },
        { id: "3", "label": "Trip-test ELCB / RCCB if installed; note if it fails to trip" },
        { id: "4", "label": "Unplug non-essentials before leaving home during orange rain alerts" },
      ],
    },
  },
];

/**
 * Ten Chennai desk stories dated **10–25 Mar 2026** (press + civic context).
 * Upserted with the main seed — powers home **News bulletin** (`latestArticlesForHome`).
 * Sources: publisher URLs where cited; paraphrased for mychennaicity.in structure.
 */
const seedsMar2026ChennaiTop10: SeedArticle[] = [
  {
    slug: "chennai-gcc-single-use-plastic-drive-mar-10",
    title:
      "GCC renews focus on single-use plastic checks at shops and kiosks across zones",
    summary:
      "Corporation teams flag carry-bag violations in core markets; traders’ associations seek clarity on paper alternatives.",
    dek: "Consumer desk — what changed at your neighbourhood shop this week.",
    category: "Consumer",
    featured: false,
    publishedAt: new Date("2026-03-10T06:30:00Z"),
    sourceUrl: "https://chennaicorporation.gov.in/",
    sourceName: "Greater Chennai Corporation",
    reportBody: `## What we know

Zone teams have stepped up **spot checks** on thin plastic carry bags and disposable cutlery in busy retail belts (Koyambedu wholesale periphery, T. Nagar, Pondy Bazaar, and OMR micro-markets). Penalties follow the state plastic rules; repeat offenders risk licence scrutiny.

Traders argue **cost and supply** of certified paper or cloth bags still lags demand during festival shopping windows.`,
    analysisBody: `## For residents

Carry a **foldable bag** by default—enforcement is uneven by ward but the rulebook is clear. If you run a small business, keep invoices for compliant packaging to avoid disputes during inspections.`,
    interactiveJson: {
      type: "checklist",
      title: "Quick compliance pass",
      items: [
        { id: "1", "label": "Keep a cloth bag in scooter under-seat storage" },
        { id: "2", "label": "Ask vendors for GST bill if buying bulk in non-woven bags" },
      ],
    },
  },
  {
    slug: "madras-hc-plea-road-digging-coordination-kottur",
    title:
      "Madras High Court hears plea for SOP on road cuts after Kottur stormwater work hits utilities",
    summary:
      "Petition cites damaged water and sewer lines when multiple agencies trench the same stretch.",
    dek: "Mobility + utilities — one corridor, many diggers.",
    category: "Mobility",
    featured: false,
    publishedAt: new Date("2026-03-12T04:00:00Z"),
    sourceUrl:
      "https://www.thehindu.com/todays-paper/2026-03-12/th_chennai/articleGBVFN1TNB-13819764.ece",
    sourceName: "The Hindu",
    reportBody: `## What we know

A **public interest petition** asks the court to direct a **standard operating procedure** so GCC, metro water, electricity, and police coordinate when opening roads for stormwater or cable work. Reporting references **Kottur / Kottur Gardens** residents facing repeated outages when trenches reopen before full restoration.

The bench is expected to seek affidavits from agencies on joint corridor plans.`,
    analysisBody: `## Why it matters

Chennai’s monsoon prep often means **the same road is cut twice**—once for drains, again for utilities. Residents should photograph **open pits** and log complaints with **zone engineer + 1913**; court directions could force better sequencing next season.`,
    interactiveJson: {
      type: "checklist",
      title: "If your street is trenched twice",
      items: [
        { id: "1", "label": "Note agency name on site board" },
        { id: "2", "label": "Photograph water pooling at trench edge" },
        { id: "3", "label": "Escalate to zonal office with date stamps" },
      ],
    },
  },
  {
    slug: "chennai-air-quality-pm25-trend-2025-study",
    title:
      "Chennai’s air quality worsened in 2025 as particulate levels rose, new analysis says",
    summary:
      "Study tracks PM2.5 across seasons; authors note Chennai still fares better than several north Indian metros.",
    dek: "Health + mobility — what the averages hide at street level.",
    category: "Chennai",
    featured: true,
    publishedAt: new Date("2026-03-14T08:15:00Z"),
    sourceUrl:
      "https://www.thehindu.com/news/cities/chennai/chennais-air-quality-worsened-in-2025-as-particulate-matter-levels-increased-says-new-study/article70746488.ece",
    sourceName: "The Hindu",
    reportBody: `## What we know

Researchers comparing **2024–2025** monitoring data report **higher PM2.5** in Chennai across seasons, with traffic, construction dust, and episodic fires cited as drivers. The story still positions Chennai **below** peak polluted northern cities on annualised averages.

Policy discussion ties to **BS-VI enforcement**, **construction mesh rules**, and **waste-burning** complaints.`,
    analysisBody: `## For Chennai readers

Citywide averages **smooth out** hyperlocal spikes—Ennore–Manali industrial wind, dumpyard smoke, and festival crackers can push **your** AQI without moving the annual headline. Use reliable **nearest monitor** apps and report visible plumes to **TNPCB channels** when safe.`,
    interactiveJson: {
      type: "poll",
      question: "Do you check AQI before outdoor exercise?",
      options: [
        { id: "daily", "label": "Yes, most days" },
        { id: "sometimes", "label": "Sometimes" },
        { id: "no", "label": "Rarely" },
      ],
    },
  },
  {
    slug: "kodungaiyur-dumpyard-smoke-march-2026",
    title:
      "Dense smoke from Kodungaiyur dumpyard spreads across north Chennai neighbourhoods",
    summary:
      "Residents report eye irritation and haze; fire crews work to contain smouldering waste.",
    dek: "Environment desk — another summer of landfill risk.",
    category: "Chennai",
    featured: true,
    publishedAt: new Date("2026-03-15T14:20:00Z"),
    sourceUrl:
      "https://timesofindia.indiatimes.com/city/chennai/smoke-engulfs-kodungaiyur-as-authorities-ignore-alerts/articleshow/129580063.cms",
    sourceName: "The Times of India",
    reportBody: `## What we know

Local reporting describes **thick smoke** drifting from the **Kodungaiyur** landfill area, affecting Perambur–Vyasarpadi belts. Officials attribute the incident to **waste combustion**; firefighting and earth-covering operations are under way.

Clinics noted a rise in **respiratory complaints** among children and elders during the worst plume hours.`,
    analysisBody: `## Context

Landfill fires are **public-health and governance** stress tests—air monitors may lag odour events. Keep windows closed when plumes are visible, run HEPA where affordable, and follow **GCC public advisories**. Long-term fix remains **waste reduction + alternate processing**, not just firefighting.`,
    interactiveJson: {
      type: "checklist",
      title: "When smoke returns",
      items: [
        { id: "1", "label": "Check IMD wind direction before outdoor time" },
        { id: "2", "label": "Use N95 for cycling if haze is visible" },
        { id: "3", "label": "Report persistent fires via official city channels" },
      ],
    },
  },
  {
    slug: "mnm-skips-2026-polls-kamal-dmk-alliance-campaign",
    title:
      "MNM will not contest Tamil Nadu 2026 polls; Kamal Haasan to campaign for DMK-led front",
    summary:
      "Actor-politician frames decision as alliance discipline; Chennai urban seats watch star-draw rallies.",
    dek: "Politics — how star campaigns shift turnout in city cores.",
    category: "Politics",
    featured: true,
    publishedAt: new Date("2026-03-16T09:00:00Z"),
    sourceUrl:
      "https://timesofindia.indiatimes.com/city/chennai/mnm-not-to-contest-kamal-haasan-to-campaign-for-dmk-front/articleshow/129785889.cms",
    sourceName: "The Times of India",
    reportBody: `## What we know

**Makkal Needhi Maiam** announced it will **not field candidates** in the April 2026 Assembly election. **Kamal Haasan** is expected to **canvass** for the **DMK-led alliance**, concentrating on urban and youth-heavy pockets including Chennai.

The move consolidates anti-NDA votes in some city seats but leaves MNM’s organisational future dependent on post-poll positioning.`,
    analysisBody: `## Chennai angle

Central and south Chennai constituencies with **high cinema-footfall demographics** may see **crowd-pull roadshows**. Traffic police typically issue **diversion maps**—plan commutes around notified rally corridors and verify **ECI permission** posters before sharing rally clips as “news.”`,
    interactiveJson: {
      type: "poll",
      question: "Do celebrity campaign tours change your interest in local candidates?",
      options: [
        { id: "yes", "label": "Yes — visibility matters" },
        { id: "issues", "label": "No — I vote on local issues" },
        { id: "mixed", "label": "Mixed" },
      ],
    },
  },
  {
    slug: "chennai-metro-peak-hour-crowding-advisory-mar-18",
    title:
      "Chennai Metro adds peak-hour frequency on core corridors as office traffic returns post-holidays",
    summary:
      "CMRL cites higher load on Blue/Green interchange segments; commuters asked to stagger travel where possible.",
    dek: "Mobility — the 8–10 am squeeze at Central and AG-DMS.",
    category: "Mobility",
    featured: false,
    publishedAt: new Date("2026-03-18T05:45:00Z"),
    sourceUrl: "https://chennaimetrorail.org/",
    sourceName: "Chennai Metro Rail Limited",
    reportBody: `## What we know

Metro authorities issued **peak-hour advisories** as **ridership climbs** on **Blue Line** segments feeding IT corridors and **Central–AG-DMS** interchange. Trains run at **higher frequency** on select slots; social media monitors report **platform crowding** during school and office overlap.

Alternate exits and **feeder bus** integration remain uneven by station.`,
    analysisBody: `## Tips

If you can **shift 30 minutes** earlier or later, coach density drops sharply. Use **QR ticketing** to avoid queue spikes at counters; watch **CMRL Twitter/X** for live disruption notes.`,
    interactiveJson: {
      type: "checklist",
      title: "Peak-hour survival",
      items: [
        { id: "1", "label": "Stand clear of door alarms — delays cascade" },
        { id: "2", "label": "Use last coaches when boarding at termini" },
      ],
    },
  },
  {
    slug: "chennai-marina-coastguard-lifeguard-drill-mar-19",
    title:
      "Coast Guard and city agencies hold joint beach safety drill ahead of summer crowds",
    summary:
      "Rip-current flags and swimmer zones refreshed along Marina; schools briefed on drowning prevention.",
    dek: "Chennai waterfront — season of evening crowds returns.",
    category: "Chennai",
    featured: false,
    publishedAt: new Date("2026-03-19T11:30:00Z"),
    sourceUrl: "https://www.thehindu.com/news/cities/chennai/",
    sourceName: "The Hindu",
    reportBody: `## What we know

A **joint exercise** along **Marina** tested **jet-ski rescue**, **rip-current signalling**, and **crowd cordons** for the upcoming summer evenings. NGOs working with **fisher communities** participated to align **local knowledge** with agency SOPs.

GCC and police emphasised **no-swim zones** beyond flagged areas.`,
    analysisBody: `## For families

**Never** assume calm-looking water is safe—**undertow** kills fast. Children should wear **bright floats** only as aids, not life guarantees. Alcohol and swimming **do not mix**; night swimming remains **high risk** without professional patrols.`,
    interactiveJson: {
      type: "checklist",
      title: "Before you enter the water",
      items: [
        { id: "1", "label": "Swim only where lifeguards are posted" },
        { id: "2", "label": "Check flag colour boards at entry" },
      ],
    },
  },
  {
    slug: "omr-it-hiring-signals-q1-2026-chennai",
    title:
      "OMR and Porur belt IT services firms quietly restock benches for post-poll project cycles",
    summary:
      "Recruiters cite stabilising US budgets; Chennai delivery centres add lateral roles in cloud and security.",
    dek: "Economy — hiring pulse on the city’s largest office strip.",
    category: "Economy",
    featured: false,
    publishedAt: new Date("2026-03-20T07:20:00Z"),
    sourceUrl: "https://www.thehindu.com/business/",
    sourceName: "The Hindu BusinessLine",
    reportBody: `## What we know

Industry sources describe **selective hiring** returning on **OMR–Sholinganallur** and **Porur–DLF** campuses after a cautious 2025. Roles skew to **cloud migration**, **identity security**, and **AI-assisted QA** rather than mass fresher drives.

Election season **travel freezes** at some clients delay onboarding into May.`,
    analysisBody: `## If you’re job-hunting

**Referrals** still dominate lateral pipelines—update **public portfolios** and respond quickly to **recruiter pings**. Verify **office location** and **night-shift policy** before signing; Chennai’s commute math punishes vague “Chennai” JDs that mean **Siruseri**.`,
    interactiveJson: {
      type: "poll",
      question: "Is your employer hiring in Chennai this quarter?",
      options: [
        { id: "yes", "label": "Yes — open reqs" },
        { id: "freeze", "label": "Freeze / slow" },
        { id: "na", "label": "Not in tech" },
      ],
    },
  },
  {
    slug: "chennai-board-exams-helplines-student-stress-mar-22",
    title:
      "State school helplines expanded as Class X/XII public exams peak in Chennai centres",
    summary:
      "Counselling booths at select zones; traffic police map quiet corridors near major exam schools.",
    dek: "Consumer + education — support during March crunch.",
    category: "Consumer",
    featured: false,
    publishedAt: new Date("2026-03-22T08:00:00Z"),
    sourceUrl: "https://www.dtnext.in/news/chennai/",
    sourceName: "DT Next",
    reportBody: `## What we know

Education and health departments **extended helpline hours** for **exam stress**, alongside **anti-copying** monitoring at Chennai clusters. City police published **advisory routes** to avoid horn-heavy corridors near **Anna Nagar, Mylapore, and Tambaram** test hubs.

Hydration and **heat** warnings accompany March afternoon papers.`,
    analysisBody: `## For parents

**Sleep and protein** beat last-minute cramming. If a child shows **panic symptoms**, use official **counselling lines**—not anonymous WhatsApp “tips.” Plan **15-minute early arrival** to beat bag-check queues.`,
    interactiveJson: {
      type: "checklist",
      title: "Exam week checklist",
      items: [
        { id: "1", "label": "Print hall ticket night before" },
        { id: "2", "label": "Pack transparent water bottle" },
        { id: "3", "label": "Save helpline numbers on phone home screen" },
      ],
    },
  },
  {
    slug: "chennai-summer-water-tanker-advisory-mar-25",
    title:
      "Metro water officials flag early summer strain; tanker booking rules tightened in outer wards",
    summary:
      "Residents in tail-end belts report supply dips; GCC and metro water ask judicious use ahead of monsoon.",
    dek: "Consumer — when your street depends on lorries.",
    category: "Consumer",
    featured: false,
    publishedAt: new Date("2026-03-25T06:00:00Z"),
    sourceUrl: "https://www.chennaimetrowater.tn.gov.in/",
    sourceName: "Chennai Metropolitan Water Supply and Sewerage Board",
    reportBody: `## What we know

With **northeast monsoon memory fading**, several **south-west and west Chennai** pockets report **pressure drops** during peak morning hours. Authorities urge **rooftop tank cleaning**, **leak reporting**, and **legal tanker** booking only.

Illegal extraction from **agricultural belts** remains an enforcement target.`,
    analysisBody: `## Practical steps

Fix **dripping float valves**—they waste more than most families realise. If you rely on **tankers**, demand **CMWSSB-recognised suppliers** and keep **receipts** for quality disputes. Apartment associations should **stagger pump hours** to protect low-floor pressure.`,
    interactiveJson: {
      type: "checklist",
      title: "Water stress prep",
      items: [
        { id: "1", "label": "Audit rooftop tank last clean date" },
        { id: "2", "label": "Report main-line leaks with photos" },
        { id: "3", "label": "Discuss stagger timing on RWA group" },
      ],
    },
  },
];

async function main() {
  let cityId: string;
  const existing = await db
    .select()
    .from(cities)
    .where(eq(cities.slug, CHENNAI.slug))
    .limit(1);
  if (existing[0]) {
    cityId = existing[0].id;
    console.log("City chennai exists:", cityId);
  } else {
    const [inserted] = await db
      .insert(cities)
      .values(CHENNAI)
      .returning({ id: cities.id });
    cityId = inserted.id;
    console.log("Inserted city chennai:", cityId);
  }

  const allSeeds = [...seeds, ...seedsMar2026ChennaiTop10];
  console.log("Seeding", allSeeds.length, "articles (base + Mar 10–25 2026 Chennai top 10).");

  for (const s of allSeeds) {
    const body = `${s.reportBody}\n\n---\n\n${s.analysisBody}`;
    const row = await db
      .select({ id: articles.id })
      .from(articles)
      .where(
        and(eq(articles.cityId, cityId), eq(articles.slug, s.slug)),
      )
      .limit(1);
    const values = {
      cityId,
      slug: s.slug,
      title: s.title,
      summary: s.summary,
      body,
      reportBody: s.reportBody,
      analysisBody: s.analysisBody,
      interactiveJson: s.interactiveJson,
      sourceUrl: s.sourceUrl,
      sourceName: s.sourceName,
      category: s.category,
      dek: s.dek,
      status: "published" as const,
      publishedAt: s.publishedAt,
      featured: s.featured,
    };
    if (row[0]) {
      await db
        .update(articles)
        .set({
          title: s.title,
          summary: s.summary,
          body,
          reportBody: s.reportBody,
          analysisBody: s.analysisBody,
          interactiveJson: s.interactiveJson,
          sourceUrl: s.sourceUrl,
          sourceName: s.sourceName,
          category: s.category,
          dek: s.dek,
          status: "published",
          publishedAt: s.publishedAt,
          featured: s.featured,
          updatedAt: new Date(),
        })
        .where(eq(articles.id, row[0].id));
    } else {
      await db.insert(articles).values(values);
    }
    console.log("Upserted article:", s.slug);
  }

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
