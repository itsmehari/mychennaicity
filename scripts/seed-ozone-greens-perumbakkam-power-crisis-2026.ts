/**
 * Ozone Greens Perumbakkam power crisis — generator dependence, resident protest (June 2026).
 *
 * Dev:  `npm run db:seed:ozone-greens-perumbakkam-power-crisis-2026`
 * Live: `npm run db:seed:ozone-greens-perumbakkam-power-crisis-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const HERO_IMAGE_URL = "/images/articles/ozone-greens-perumbakkam-hero.jpg";

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

const SLUG = "ozone-greens-perumbakkam-power-crisis-generator-electricity-issue";

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

  const publishedAt = new Date("2026-06-20T06:00:00.000Z");
  const now = new Date();

  const reportBody = `Residents of Ozone Greens in Perumbakkam have again raised serious concerns over electricity supply at the residential project, after reported disruptions in generator-based power supply caused hardship for families living in the high-rise apartment complex.

According to a report published by **Polimer News on 20 June 2026**, residents surrounded the Ozone office in Anna Nagar after alleging that generator power had been switched off during parts of the day and night over the past week. The residents claimed that the disruption affected daily life inside the apartment complex, including lift access in multi-storey towers.

The issue is not new. The power-supply dispute around the Perumbakkam project has been reported earlier and has also appeared before legal and regulatory forums. The central grievance raised by residents is that, despite buying flats years ago, they have not received a permanent electricity-board connection and have instead been dependent on generator-based power.

*Image caption: Ozone Greens residential towers in Perumbakkam, Chennai. Image used for representational and project-identification purpose from property listing source.*

## Key Points

- Residents allege prolonged dependence on generator-based electricity.
- Latest protest followed reported generator shutdowns affecting daily life and lift access.
- Earlier reporting in 2023 had linked the issue to pending electricity infrastructure and substation-related requirements.
- A writ petition connected to the electricity issue was dismissed by the Madras High Court in 2024 on procedural grounds.
- TNRERA listings show Ozone Greens-related proceedings continuing in 2025 and 2026.
- Separate legal and agency proceedings involving Ozone-linked entities in Bengaluru and Chennai should not be merged with the Ozone Greens electricity issue as one proven case.

## The Immediate Issue: Generator Power and Lift Access

The latest report states that residents complained of hardship caused by generator shutdowns. In high-rise buildings, reliable power is not merely a convenience. It directly affects lift movement, water pumping, common-area lighting, emergency movement, and the ability of elderly residents, children, and patients to move safely.

Residents reportedly told the media that, without lift access, it was difficult to move patients up and down the building. The protest at the company office was therefore not only about electricity bills or infrastructure delay, but also about basic habitability and safety inside a large residential community.

The report also stated that residents questioned company officials, including Chennai CEO Prakasam Jagan. These claims are based on the media report and resident accounts. The company's detailed response to the latest protest should be added when available.

> **Why power matters in high-rise apartments:** Power in high-rises supports lifts, water pumps, emergency lights, fire-safety systems, common areas, and elderly and patient mobility.

## Background: A Long-Running Electricity Connection Dispute

The electricity issue at the Perumbakkam project had already been reported in November 2023. That report said that more than 700 residents of a gated community at Jalladianpet in Perumbakkam had been struggling for years because the builder had not provided land to TANGEDCO for a 110 kV substation. As a result, residents were reportedly dependent on diesel generators instead of a regular electricity connection.

The same report quoted the company's Chennai CEO as saying that land had been identified for the substation, that the electricity board had been informed, and that the company would proceed with a gift deed after confirmation from the electricity board. The company side also reportedly stated that it was spending around ₹1 crore per month on diesel generator power.

This is an important part of the story because it shows that the dispute has multiple sides. Residents have alleged prolonged hardship due to the absence of permanent power. The company, in earlier reporting, pointed to steps related to substation land and generator expenditure. TANGEDCO-related infrastructure and procedural requirements also appear to be part of the wider dispute.

### How the issue developed

| Year | Milestone |
| --- | --- |
| 2023 | Media report highlights generator dependence and TANGEDCO substation issue |
| 2024 | Electricity-related writ petition dismissed by Madras High Court on procedural grounds |
| 2025 | Ozone Greens-related matter appears in TNRERA final-order listings |
| 2026 | TNRERA listings continue; latest resident protest reported |

*Project layout and high-rise development context at Ozone Greens, Perumbakkam. Image source: property listing.*

## Court Record: Madras High Court Dismissed a Writ Petition in 2024

The matter also reached the Madras High Court. In June 2024, a writ petition filed by Greens Apartment Owners against TANGEDCO and others was dismissed.

The available court-order summary records that the petitioner association had not itself made an application for permanent electricity connection. It also records that the concerned respondent had not filed an application in the proper format for grant of electricity connection to residents of Ozone Greens Apartment, Perumbakkam.

This court development should be read carefully. The dismissal does not by itself prove that residents had no grievance. It indicates that the writ petition did not succeed on the basis of the procedural position before the court. The practical question of how residents can receive a permanent electricity solution appears to have remained unresolved.

> **What the court record means:** The dismissal of a petition does not automatically settle all factual grievances. It means the court did not grant relief in that proceeding based on the material and procedural position before it.

## Regulatory Proceedings: Ozone Greens Appears in TNRERA Listings

The Tamil Nadu Real Estate Regulatory Authority's public listings show proceedings involving Ozone Greens at Jalladianpettai Village, Perumbakkam-Jalladianpettai Joint Road, Sholinganallur Taluk, Kancheepuram District.

TNRERA's 2026 final-order listing includes a matter involving Selene Estate Limited and the project "Ozone Greens" dated 4 March 2026. TNRERA's 2025 listings also show proceedings involving Ozone Projects Pvt Ltd, Selene Estate Ltd, Tuscan Consultants & Developers Pvt Ltd, Axis Finance Ltd, and the project "Ozone Greens."

These listings confirm that disputes connected with the project have appeared before the real estate regulator. The specific content of each order should be independently reviewed before drawing conclusions about liability, compensation, or directions passed in individual cases.

### Public record

| Year | Forum | What public record shows |
| --- | --- | --- |
| 2024 | Madras High Court | Electricity-related writ petition dismissed on procedural grounds |
| 2025 | TNRERA | Ozone Greens-related matter listed |
| 2026 | TNRERA | Ozone Greens-related final-order listing continues |
| 2026 | Media report | Latest resident protest reported |

## Residents' Grievance: Homebuyer Rights Versus Basic Infrastructure Delivery

For residents, the central question is simple: can a large residential project be considered fully liveable if permanent electricity infrastructure is still unresolved years after possession?

Homebuyers typically purchase apartments on the assumption that essential services such as electricity, water, sewage, access roads, lifts, fire safety systems and common amenities will be available in a stable and legally compliant manner. In this case, residents allege that they have been forced to depend on diesel generators for years.

If true, such a situation creates multiple concerns:

1. Higher recurring costs for power generation.
2. Risk of outage if diesel supply or generator maintenance is disrupted.
3. Lift-access problems in high-rise towers.
4. Pollution and noise from prolonged generator use.
5. Uncertainty over who bears the cost of temporary power.
6. Reduced quality of life for families who already paid for homes.
7. Safety concerns for elderly residents, patients, children and persons with disabilities.

These issues go beyond a routine apartment maintenance dispute. They involve the basic infrastructure obligations attached to large-scale residential development.

*Reliable power is essential for lifts, water pumps and emergency access in high-rise apartments.*

## Wider Scrutiny Involving Ozone-Linked Real Estate Entities

The latest Chennai protest has also revived public attention on other legal and regulatory proceedings involving Ozone-linked real estate entities. However, these matters must be reported separately and carefully.

The Bengaluru Ozone Urbana case is not the same as the Ozone Greens Perumbakkam electricity issue. It involves a different project and legal proceedings in Karnataka. Still, it is relevant background because official agencies and courts have examined allegations involving Ozone-linked entities in other real estate projects.

In October 2025, the Enforcement Directorate issued an official press release stating that it had provisionally attached immovable properties worth ₹423.38 crore in connection with its investigation against Ozone Urbana Infra Developers Pvt Ltd and others. The ED said its investigation was based on multiple FIRs registered in Bengaluru and a CBI FIR registered on the direction of the Supreme Court.

According to the ED press release, the allegation was that the company defaulted in completing construction on time, failed to hand over possession to customers, and allegedly diverted funds. The ED stated that the alleged amount involved in defrauding homebuyers was ₹927.22 crore. These are allegations made by the investigating agency and must be treated as allegations unless and until proved in court.

> **Separate background: Bengaluru Ozone Urbana case** — This is a separate case and should not be read as proof of wrongdoing in the Ozone Greens electricity issue.

## Separate Chennai Metrozone Matter

A separate report in April 2026 stated that the CBI had registered a case against Ozone Projects Pvt Ltd, the developer of the Metrozone project in Koyambedu, Chennai, along with its directors and unidentified officials of Axis Bank Ltd and Axis Finance Ltd. The report said the case involved allegations connected to subvention-scheme financing and homebuyer loans.

This Metrozone case is separate from the Ozone Greens power issue. It should not be presented as proof of wrongdoing in the Perumbakkam matter. It may only be cited as part of the broader public record of legal scrutiny involving Ozone-linked projects.

## What Needs to Happen Next

The immediate need is for a clear, official, time-bound statement from the relevant parties.

Residents need clarity on:

1. Whether a permanent electricity-board connection has been approved.
2. What infrastructure is pending for that connection.
3. Whether land for substation or electricity infrastructure has been handed over.
4. Who is responsible for the pending compliance.
5. Whether TANGEDCO has received a valid and complete application.
6. How long generator-based power will continue.
7. Who will bear the cost of generator power until permanent supply is secured.
8. What safety arrangements exist for lifts, water pumping and emergency access during power disruption.

The builder and project-related entities should also be given an opportunity to place their position on record. TANGEDCO's position is equally important because electricity connection for a project of this scale involves technical, land, safety and regulatory procedures.

## Why This Issue Matters for Chennai Homebuyers

The Ozone Greens case highlights a larger problem in urban housing: buyers often focus on location, price, carpet area, amenities and possession date, but essential infrastructure compliance may remain unclear until after families move in.

For future buyers, this case is a reminder to verify the following before purchase or registration:

1. Permanent electricity connection status.
2. Water and sewage connection status.
3. Fire safety approvals.
4. Completion certificate or occupancy certificate status.
5. RERA registration and complaint history.
6. Pending litigation or regulatory proceedings.
7. Association handover status.
8. Common-area maintenance cost structure.
9. Builder dues to utilities or authorities.
10. Written confirmation of infrastructure obligations.

A home is not complete merely because the flat is physically built. It must also be supported by lawful and reliable civic infrastructure.

## Conclusion

The Ozone Greens power issue has now become more than a temporary outage complaint. Based on resident allegations, earlier media reports, court-record summaries and TNRERA listings, it appears to be a long-running infrastructure and homebuyer grievance requiring urgent clarification from the builder, TANGEDCO and the relevant regulatory authorities.

At the same time, the matter must be reported responsibly. The latest protest, the 2023 generator-dependence report, the 2024 court order, the TNRERA proceedings, the Bengaluru ED case and the Chennai Metrozone CBI report are separate records. They should not be collapsed into one allegation.

For the residents, the demand is direct: a permanent, safe and legally compliant electricity solution.

For regulators, the question is larger: how can large residential projects remain occupied for years if essential infrastructure is still unresolved?`.trim();

  const analysisBody = `## Editorial note

This report is based on available media reports, court-record summaries, regulator listings and official agency statements. Allegations mentioned in this article are attributed to the relevant source and should not be read as findings of guilt unless established by a competent court or authority. The company and all named parties are entitled to present their version.

## Right of reply

This article will be updated if Ozone Group, the project entities, TANGEDCO or other concerned authorities provide an official response.

## Related reading on mychennaicity.in

- [Chennai local news](/chennai-local-news) — latest city and civic stories.
- [Tamil Nadu electricity bill guide](/chennai-local-news/tamil-nadu-electricity-bill-calculation-2026-june-tnpdcl) — how domestic EB billing works in Chennai.
- [OMR corridor area guide](/areas/omr-perungudi-sholinganallur) — Perungudi, Sholinganallur and nearby neighbourhoods.`.trim();

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
      "Ozone Greens Power Crisis in Perumbakkam: Residents Demand Permanent Electricity Solution",
    summary:
      "Residents of Ozone Greens in Perumbakkam allege years of generator-based electricity supply and demand a permanent TANGEDCO power solution. A legally cautious report based on media, court, TNRERA and official records.",
    dek: "Chennai real estate · civic infrastructure — Perumbakkam apartment dispute, TNRERA records and resident protest.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    areaHubSlug: "omr-perungudi-sholinganallur",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: null as string | null,
    sourceName:
      "Polimer News report (20 June 2026); earlier media, court-record summaries, TNRERA listings and official agency statements",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "What is the Ozone Greens Perumbakkam power issue?",
          answer:
            "Residents allege that the apartment complex has depended on generator-based electricity for years instead of a permanent electricity-board connection. Media reports and public records show that the issue has been reported earlier and has appeared before legal and regulatory forums.",
        },
        {
          question: "Why are residents protesting?",
          answer:
            "Residents reportedly protested after generator-based power supply was disrupted, affecting lift access and daily life in high-rise towers.",
        },
        {
          question: "Has the matter gone to court?",
          answer:
            "Yes. A writ petition connected to the electricity issue was dismissed by the Madras High Court in 2024 on procedural grounds related to the electricity-connection application.",
        },
        {
          question:
            "Is the Bengaluru Ozone Urbana case the same as the Chennai Ozone Greens issue?",
          answer:
            "No. The Bengaluru Ozone Urbana case is separate. It can be mentioned only as wider background involving Ozone-linked entities, not as proof of wrongdoing in the Ozone Greens electricity issue.",
        },
        {
          question: "What should apartment buyers verify before purchase?",
          answer:
            "Buyers should verify permanent electricity connection, water and sewage connection, fire safety approvals, completion or occupancy certificate, RERA status, pending litigation, association handover and utility dues.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-ozone-greens] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-ozone-greens] Inserted article:", SLUG);
  }

  console.log("[seed-ozone-greens] Public URL:", `/chennai-local-news/${SLUG}`);
  console.log("[seed-ozone-greens] Hero image:", HERO_IMAGE_URL);

  if (live) {
    await revalidateNewsAfterSeed({ slug: SLUG, label: "seed-ozone-greens" });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
