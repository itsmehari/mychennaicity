/**
 * Madambakkam Lake — wetland demarcation vs CMDA layout approvals.
 *
 * Dev:  `npm run db:seed:madambakkam-lake-wetland-development-2026`
 * Live: `npm run db:seed:madambakkam-lake-wetland-development-2026:live`
 *
 * Hero: public/images/articles/madambakkam-lake-wetland-development-dispute-2026-hero.jpg
 * (bund wall / construction abutting the lake — not live until this file is deployed.)
 *
 * Do not name rival news outlets. Attribute facts to tribunal records, Wetland
 * Authority / Collector directions, CMDA approvals and the Wetlands Rules /
 * MoEFCC guidelines. Do not invent a final survey boundary or allege a
 * criminal finding. Private patta and environmental restriction can coexist.
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const SLUG = "madambakkam-lake-wetland-development-cmda-approvals-2026";
const HERO =
  "/images/articles/madambakkam-lake-wetland-development-dispute-2026-hero.jpg";
const WETLANDS_RULES =
  "https://moef.gov.in/wp-content/uploads/2019/09/Wetlands-Conservation-and-Management-Rules-2017.pdf";
const FLOOD_STREET = "/civic-tools/flood-street-score";

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

  /** 30 Sep 2026, morning IST */
  const publishedAt = new Date("2026-09-30T08:55:00.000Z");
  const now = new Date();

  const reportBody = `## Disclaimer

This is a MyChennaiCity **civic journalism** report on planning approvals beside Madambakkam Lake near Tambaram. It summarises publicly discussed tribunal records, Wetland Authority and Collector-level directions, CMDA layout conditions and the Wetlands (Conservation and Management) Rules, 2017. It is **not** an official notice from CMDA, the Tamil Nadu State Wetland Authority, the Water Resources Department, Tambaram Corporation or the National Green Tribunal. Boundaries, high-flood levels and ownership claims remain under official process. Verify primary documents before you buy, build, litigate or protest.

## Summary

**Chennai, 30 September 2026** — Residents and environmental groups have renewed objections to real-estate development along **Madambakkam Lake** near Tambaram, arguing that construction is moving ahead while the lake’s wetland boundary, hydrology and legal protection remain under official scrutiny.

The dispute also raises a sharper planning question: how were layout approvals processed by the **Chennai Metropolitan Development Authority (CMDA)** when multiple environmental proceedings relating to the lake were already underway?

A dispute over residential layout development abutting the lake has brought CMDA, the Tamil Nadu State Wetland Authority and the Water Resources Department under renewed scrutiny. Residents and campaigners allege that land adjoining the lake is being developed with insufficient protection for the waterbody and its floodplain.

The issue is more complicated than a simple “50-metre buffer violation.” Official records point to an unresolved conflict between planning approvals already granted, landowners’ claims over **patta** land, ISRO wetland mapping and an ongoing government exercise to physically demarcate the wetland.

The central question is therefore not merely whether somebody has built too close to a lake. It is:

**Should a major residential development have been allowed to proceed before the wetland boundary and its environmentally sensitive zone were conclusively established?**

## What is happening at Madambakkam?

The disputed properties are reported to include lands in and around **Survey Nos. 768, 769/1** and portions of **Survey No. 723** adjoining Madambakkam Lake.

Tribunal and planning records show that landowners proposed residential layouts on these properties and that CMDA granted layout approvals in **December 2024**. The approved plans reportedly incorporated only a **3-metre** no-development buffer on the southern side adjoining the lake, based on conditions communicated by the Water Resources Department. A peripheral storm-water drain was also prescribed.

Residents and environmental groups contend that such a narrow setback is inadequate given the ecological character of the lake, its flood-storage function and its identification in wetland mapping exercises.

Residents have sought intervention from CMDA, the Water Resources Department, Tambaram Corporation, the Tamil Nadu State Wetland Authority and the National Green Tribunal.

## Why Madambakkam Lake’s wetland status matters

Madambakkam Lake has been identified in ISRO’s National Wetland Inventory and Assessment datasets, according to the Tamil Nadu State Wetland Authority.

In **June 2025**, the Wetland Authority said petitions concerning development near the lake required the authorities to verify its actual extent. It directed officials to carry out ground truthing, survey and shapefile-based demarcation.

A Chengalpattu District Collector report subsequently recorded that the State Wetland Authority had issued directions on **28 May 2025** for ground verification, survey and demarcation. A subcommittee was constituted by the District Forest Officer, but the process remained pending when the report was filed.

That unresolved demarcation is crucial.

Satellite identification tells authorities that a wetland exists. Ground truthing establishes precisely where the wetland extends on the ground, how its hydrology operates and which parcels overlap or interact with it.

## The Supreme Court has already addressed this national problem

The issue is not unique to Madambakkam.

On **11 December 2024**, the Supreme Court noted that ISRO’s 2021 wetland atlas identified approximately **2,31,195** wetlands larger than **2.25 hectares** across India.

The Court observed that states had largely failed to complete the required ground-truthing and boundary-demarcation exercise and directed State and Union Territory Wetland Authorities to complete it for wetlands identified in the Space Applications Centre atlas. Later orders reiterated the requirement and pressed states to accelerate the exercise.

This gives the Madambakkam controversy a wider significance: urban development appears to be advancing in parts of India faster than environmental authorities are completing the basic exercise of identifying and legally securing wetlands.

## Is there really a mandatory 50-metre buffer?

This point requires precision because several social-media explanations oversimplify the law.

The [Wetlands (Conservation and Management) Rules, 2017](${WETLANDS_RULES}) do contain a 50-metre provision. Rule 4 prohibits permanent construction, except boat jetties, within **50 metres from the mean high flood level** observed during the preceding ten years. The Ministry of Environment’s official implementation guidelines reproduce this requirement.

But describing this simply as a universal “50-metre buffer outside every lake boundary” is inaccurate.

The reference point is the **mean high flood level**, not necessarily the current FMB / revenue boundary or visible shoreline.

That distinction is particularly important in urban lakes where historical water spread, flood levels and present cadastral boundaries may differ significantly.

## There is another legal complication

Under the literal structure of the 2017 Rules, their principal application is to Ramsar wetlands and wetlands formally notified under the Rules.

However, the Supreme Court had previously directed protection of the wetlands identified in the earlier National Wetland Inventory, and the Union Environment Ministry subsequently clarified that these wetlands should receive Rule 4 protection irrespective of whether individual notification had been completed. Tribunal proceedings continue to rely on that interpretation.

This is why the argument that “Madambakkam has not yet been formally notified, therefore wetland restrictions do not matter” is not legally straightforward.

## Why CMDA’s role deserves examination

The issue is not necessarily that CMDA knowingly violated wetland law.

The more important governance question is whether the planning approval process had sufficient environmental information before approval was issued.

Official tribunal records indicate that CMDA-approved layouts incorporated only a **3-metre** buffer adjoining the lake based on WRD requirements.

At the same time, subsequent proceedings show that authorities were still attempting to establish:

- the actual wetland boundary;
- historical land classification;
- the extent shown in ISRO wetland datasets;
- drainage and flood characteristics;
- and the relationship between private survey fields and the lake.

If those matters were unresolved, approving permanent development immediately beside the disputed ecological boundary creates an obvious planning risk.

The correct question for CMDA therefore is not: “Did you know the Wetland Rules existed?”

It is: **What environmental verification was completed before planning permission was granted?**

CMDA would ideally place the following information in the public domain:

1. Approved layout plans and planning-permission conditions.
2. WRD NOC and the basis for prescribing the 3-metre setback.
3. FMB and authenticated lake-boundary maps used during scrutiny.
4. Whether ISRO NWIA layers were examined.
5. Whether Tamil Nadu State Wetland Authority clearance or consultation was obtained.
6. The high-flood-level data used for the site.
7. Whether cumulative flood risk was assessed.
8. Whether development was approved before or after authorities became aware of the ongoing wetland dispute.

## The landowners’ position must also be recorded

The controversy has another side.

Landowners have asserted before authorities that the disputed properties are privately owned **patta** lands, with title documents tracing ownership back several decades.

An affidavit referred to in tribunal proceedings states that approximately **14.48 acres** across Survey Nos. 768, 769/1 and parts of 723 are privately owned.

The owners have also argued that Madambakkam Lake did not appear in a particular MoEFCC list they examined and have questioned whether the concerned private survey fields legally form part of the wetland.

This is precisely why a scientific, cadastral and legally authenticated demarcation is necessary.

Private title and environmental regulation are not mutually exclusive. A parcel can be privately owned while still being subject to restrictions arising from drainage, floodplain, wetland or environmental laws.

## A troubling sequence

The chronology raises the strongest questions.

- **2024:** Residential-layout applications were processed, and CMDA approvals were reportedly issued on **23 December 2024**.
- **11 December 2024:** The Supreme Court directed states to complete ground truthing and demarcation of wetlands identified in the SAC / ISRO atlas.
- **2025:** Tamil Nadu State Wetland Authority specifically directed ground truthing and demarcation of Madambakkam Lake.
- **2025–26:** NGT proceedings continued over sewage, wetland status, historical classification and protection of the lake.
- **2026:** Residents say development activity is continuing while these fundamental questions remain unresolved.

The administrative sequence therefore deserves examination.`;

  const analysisBody = `## Why this matters beyond Madambakkam

Wetlands surrounding Chennai are not simply vacant lands containing water.

They function as components of a larger hydrological network. They can:

- store monsoon runoff;
- reduce peak flood flows;
- recharge groundwater;
- support biodiversity;
- receive and convey drainage;
- connect neighbouring tanks and channels;
- and provide flood-storage space during extreme rainfall.

The MoEFCC’s own implementation guidelines require authorities to look beyond the visible wetland boundary and identify a “zone of influence” based on hydrology, drainage and surrounding land uses.

For a wetland with a defined drainage network, the guidelines say its directly draining basin may form the relevant zone of influence.

That approach is fundamentally different from treating the lake as a blue polygon on a cadastral map and permitting construction immediately outside that line.

Chennai’s flood risk is not only about one lake edge. Neighbourhood-level patterns are also tracked on our [flood street-score desk](${FLOOD_STREET}).

## The Madambakkam question is ultimately a planning question

Chennai’s peripheral areas are urbanising rapidly.

Tambaram, Selaiyur, Madambakkam, Vengaivasal, Sithalapakkam, Perumbakkam and adjoining areas contain numerous historical tanks, channels and low-lying drainage corridors while simultaneously experiencing intensive residential development.

The planning system therefore needs to answer a basic question before approving construction:

**Where will the water go?**

Determining that after layouts are approved, plots are sold and houses are built is too late.

For Madambakkam, the immediate requirement is consequently not speculation over whether every square metre is legally wetland.

It is transparency.

The government should publish one authoritative GIS map showing:

the surveyed lake boundary + ten-year high-flood level + ISRO wetland polygon + WRD boundary + FMB survey fields + inlet/outlet channels + zone of influence + CMDA-approved layout.

Once these layers are placed together, much of the present dispute can be objectively examined.

Until such demarcation is completed, allowing irreversible construction on land whose hydrological relationship with the lake remains disputed creates unnecessary environmental, legal and financial risk for residents, government agencies, developers and future homebuyers alike.

## Editorial note

The assertion circulating online that the Wetlands Rules simply impose a universal 50-metre buffer from every lake boundary should not be repeated without qualification.

The Rules prohibit specified permanent construction within 50 metres of the **mean high flood level**, while wetland applicability, notification, ISRO inventory protection and site-specific zones of influence involve additional legal considerations.

The stronger public-interest argument in the Madambakkam case is therefore not based on an oversimplified buffer claim.

It is based on a far more serious question:

**Why was permanent urban development permitted beside an environmentally disputed lake before its wetland boundary, high-flood level and zone of influence were conclusively mapped and placed in the public domain?**

## Fine print — AI-assisted authoring

This report was prepared with **AI-assisted news authoring** and human editorial review. AI tools can err on dates, survey numbers, buffer distances and the status of pending demarcation or tribunal orders. Cross-check CMDA layout conditions, Water Resources Department NOCs, Tamil Nadu State Wetland Authority directions and National Green Tribunal filings before you rely on any fact here. The hero photograph shows construction activity beside Madambakkam Lake; it illustrates the dispute and is not an official survey exhibit.`;

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
      "Madambakkam Lake row raises larger question: How was real-estate development cleared before wetland status was settled?",
    summary:
      "Residents say construction is advancing beside Madambakkam Lake while wetland demarcation remains pending — and ask what environmental checks CMDA completed before December 2024 layout approvals.",
    dek: "A 3-metre WRD setback met planning conditions on paper. The larger issue is whether permanent layouts should wait for wetland boundary, high-flood level and zone-of-influence mapping.",
    body,
    reportBody,
    analysisBody,
    category: "Environment",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO,
    sourceUrl: WETLANDS_RULES,
    sourceName: "Wetlands (Conservation and Management) Rules, 2017",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "Is there a universal 50-metre buffer around every lake?",
          answer:
            "Not in the oversimplified sense often shared online. The Wetlands Rules, 2017 prohibit specified permanent construction within 50 metres of the mean high flood level of the preceding ten years — not automatically from every revenue shoreline or FMB line. Applicability also depends on wetland inventory protection, notification status and site-specific zones of influence.",
        },
        {
          question: "What buffer did CMDA reportedly approve at Madambakkam?",
          answer:
            "Tribunal and planning records indicate December 2024 layout approvals incorporated a 3-metre no-development buffer adjoining the lake, based on Water Resources Department conditions, plus a peripheral storm-water drain. Residents argue that is inadequate while wetland demarcation remains unfinished.",
        },
        {
          question: "Does private patta land escape wetland restrictions?",
          answer:
            "No. Landowners have asserted private title over roughly 14.48 acres across Survey Nos. 768, 769/1 and parts of 723. Private ownership and environmental regulation can coexist: a parcel can be patta land and still face drainage, floodplain or wetland restrictions.",
        },
        {
          question: "What should the government publish?",
          answer:
            "One authoritative GIS map stacking the surveyed lake boundary, ten-year high-flood level, ISRO wetland polygon, WRD boundary, FMB survey fields, inlet/outlet channels, zone of influence and the CMDA-approved layout — so the dispute can be examined objectively.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-madambakkam-lake] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-madambakkam-lake] Inserted article:", SLUG);
  }

  console.log(
    "[seed-madambakkam-lake] Public URL:",
    `https://mychennaicity.in/chennai-local-news/${SLUG}`,
  );

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-madambakkam-lake",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
