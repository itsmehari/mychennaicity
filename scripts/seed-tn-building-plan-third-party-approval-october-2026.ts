/**
 * Tamil Nadu building-plan orders, October 2026.
 * G.O. Ms. No. 179 (7 Oct), G.O. Ms. No. 180 (8 Oct; local-body powers
 * live 27 Oct per DIPR PR 950), G.O. Ms. No. 194 (26 Oct).
 * The 5,000 sq ft self-certification line is an Assembly announcement
 * of 28 Aug 2026, not a figure this desk found in the October gazette.
 *
 * Dev:  `npm run db:seed:tn-building-plan-third-party-october-2026`
 * Live: `npm run db:seed:tn-building-plan-third-party-october-2026:live`
 *
 * Photos are illustrations supplied for this report. They are not a
 * named site and not an approved plan. Live body points at GitHub
 * because a Vercel image 404 would hide them.
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const SLUG = "tamil-nadu-building-plan-third-party-approval-october-2026";
const GH =
  "https://raw.githubusercontent.com/itsmehari/mychennaicity/main/public/images/articles";
const HERO = `${GH}/tamil-nadu-third-party-building-approval-2026-frame.png`;
const STAIR = `${GH}/tamil-nadu-third-party-building-approval-2026-stair.png`;

const GAZETTE =
  "https://stationeryprinting.tn.gov.in/extraordinary/2026/441_Ex_III_1a_2026.pdf";
const GO194 =
  "https://cms.tn.gov.in/cms_migrated/document/GO/hud_e_194_2026.pdf";
const PR950 =
  "https://cms.tn.gov.in/cms_migrated/document/press_release/pr301026_e_950.pdf";
const DTCP = "https://tcp.tn.gov.in/gos";
const NIE =
  "https://www.newindianexpress.com/states/tamil-nadu/2026/Oct/09/private-certifiers-can-now-okay-building-plans-order-issued";
const HINDU_ASSEMBLY =
  "https://www.thehindu.com/news/national/tamil-nadu/tamil-nadu-assembly-self-certification-limit-for-residential-building-approvals-raised-to-5000-sq-ft-housing-minister/article71399846.ece";
const HINDU_HEIGHT =
  "https://www.thehindu.com/news/national/tamil-nadu/state-government-relaxes-norms-for-height-restriction-on-non-high-rise-buildings/article71628586.ece";
const TOI =
  "https://timesofindia.indiatimes.com/city/chennai/local-bodies-get-expanded-powers-to-approve-building-plans/articleshow/135135820.cms";

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
    console.error("City slug 'chennai' not found.");
    process.exit(1);
  }

  const [existing] = await db
    .select({ id: articles.id })
    .from(articles)
    .where(and(eq(articles.cityId, city.id), eq(articles.slug, SLUG)))
    .limit(1);

  /** 14 Nov 2026, 2:30 p.m. IST */
  const publishedAt = new Date("2026-11-14T09:00:00.000Z");
  const now = new Date();

  const reportBody = `## Disclaimer

This is a MyChennaiCity explainer of three Housing and Urban Development orders and one Assembly announcement. The limits below are taken from the [9 October 2026 gazette](${GAZETTE}) for G.O. Ms. No. 179, the [town planning press note of 30 October](${PR950}) for the local-body powers, and [G.O. Ms. No. 194](${GO194}). It is not a planning permission, a setback calculator, or a Greater Chennai Corporation or CMDA circular. Read the order that matches your plot before you pay a fee or start work.

## Summary

**Chennai, 14 November 2026** — A registered architect, or a Grade-I registered engineer on the Tamil Nadu Single Window Portal for Planning Permission, can now certify a limited class of building plans. After the prescribed fee is paid, the rule says the approved plan and the proceedings, with a QR code, are generated online for download.

That route is [G.O. Ms. No. 179](${GAZETTE}), Housing and Urban Development [UD4(1)], dated **7 October 2026** and published in the gazette on **9 October**. It amends the Tamil Nadu Combined Development and Building Rules, 2019.

It is one of three different changes. A second order lets corporations, municipalities, and panchayats approve somewhat larger plans themselves. A third order raises the height at which a building becomes a high-rise, from **18.30 metres to 19.50 metres**. Those two changes do not widen the third-party size cap.

![A concrete building frame under construction, with bricks and steel in the foreground](${HERO})

*A building under construction. The photograph illustrates the kind of work these rules cover. It is not a named Chennai site, and it is not a plan approved under these orders.*

## What third-party certification actually is

The gazette defines a third party as an architect registered with the Council of Architecture, or a Registered Engineer Grade I who is registered on the single-window portal. It is not any civil engineer, and it is not the plot owner acting alone.

Third-party certification is a **joint declaration**. The applicant and the professional say that the ownership papers match the ground, that the proposal fits the building rules and the master plan, and that what was uploaded is accurate. The professional also indemnifies the authority against claims that arise from permission issued on those self-certified records.

The applicant has to be the owner, a leaseholder, or a power-of-attorney holder with the right to develop the land.

On payment of the charges, the rule says the approved plan and proceedings, with a QR code, are generated online instantly and can be downloaded. The gazette does not print a rupee fee. The portal’s own rate is the one that applies.

## Who qualifies

The gazette sets three eligible buildings.

| Building | What the 7 October gazette allows |
| --- | --- |
| Residential | Floor Space Index area up to **750 sq m** (about 8,070 sq ft, as reported by [The New Indian Express](${NIE})). Height up to **14 metres**. Stilt plus 3 floors, or ground plus 2. Up to **8 dwelling units**. |
| Commercial | Floor Space Index area up to **300 sq m** (about 3,230 sq ft in the same report). Height up to **14 metres**. Stilt plus 3, or ground plus 2. |
| Industrial | **White or green** category only, in a layout developed by SIDCO, SIPCOT, or ELCOT, or in any other approved industrial layout. Floor Space Index area up to **2,500 sq m**. The definition in the same order also caps height at **18.30 metres**. |

Floor Space Index area is the figure in the rule. A larger built-up number on a drawing does not, by itself, bring a project inside the cap.

For houses and shops, the plot itself has to be one of three kinds: an approved layout or approved subdivision, a layout regularised under the Tamil Nadu Regularisation of Unapproved Layouts and Plots Rules, 2017, or a plot registered by a deed executed before **20 October 2016**.

## Where this route does not apply

The scheme is closed in the Coastal Regulation Zone, in hill areas notified by the Hill Area Conservation Authority, in development-prohibited or restricted areas in Annexure XVII of the rules, in ecologically sensitive areas, and in any other area the government notifies.

It is also closed on natham land, and on land classed as agriculture, institutional, special and hazardous, industrial (except a white or green industrial building that otherwise qualifies), open space and recreational, or non-urban. A site in a street alignment, a road widening, a road, or an area reserved for a public purpose in a master plan, a new-town plan, a detailed development plan, or a grid of roads is out.

The professional must not certify a plot that has a case pending. Before signing, the professional has to inspect the site and confirm the public road, the width of the access, the site dimensions, and the applicant’s ownership, and has to check the master plan, the zone, and the rules.

## What you upload

The application goes online through the Tamil Nadu Single Window Portal for Planning Permission. The gazette asks for:

- geo-tagged site photographs
- the registered sale deed, self-attested, and verified by the third party
- patta or the town survey land register in the owner’s name, verified the same way
- the approved layout, approved subdivision, regularised layout, or the pre-20 October 2016 deed
- the building plan in **.dxf or .dwg**, plus the online plan-scrutiny report and the site-inspection report

The drawings still have to meet the development rules and the building rules named in the annexure, including the setbacks and parking in those rules. A third-party signature does not replace those measurements.

![A stair core and scaffolding on a building under construction](${STAIR})

*Another building under construction. Same note: this is an illustration, not an approved drawing.*

## What happens if the certificate is wrong

The applicant and the professional are jointly and severally responsible for a misrepresentation, a deviation, or a violation.

The authority has to pick at least **10 per cent** of that month’s applications for a random check of the records. The selection is system-generated. The authority can also inspect the plan and the construction at any stage. If it finds a violation, the owner has to correct it. If the owner does not, the authority may take steps to remove the violation.

If permission was obtained by misrepresentation or fraud, the authority revokes it and can proceed under sections 56 and 57 of the Tamil Nadu Town and Country Planning Act, 1971. The applicant and the professional can also face prosecution, including section 236 of the Bharatiya Nyaya Sanhita, 2023. The authority can blacklist the professional and cancel the registration or licence, after a hearing.

When the building is finished, the professional files a compliance report. The format in the gazette compares the approved setbacks, FSI, parking, height, floors, use, and dwelling units with what is on the site. If there is a violation, the professional must not issue that report.

Permission lasts **five years**. The authority may extend it once, for **three years**, if the application is made before it expires. A renewal fee may be charged. The gazette does not print the amount.

## A larger plan can still go to the local body

[G.O. Ms. No. 180](${DTCP}), dated **8 October 2026**, is a different order. It widens what corporations, municipalities, town panchayats, and village panchayats may approve themselves. The [Directorate of Town and Country Planning press note](${PR950}) of 30 October, Press Release No. 950, says those revised powers **went live on 27 October 2026**.

| Local body | Residential, as in the 30 October press note | Commercial |
| --- | --- | --- |
| Corporations and municipalities, including the Greater Chennai Corporation | From 10,000 sq ft and 8 dwelling units (12 metres, stilt plus 3 or ground plus 2) to **16,140 sq ft and 16 dwelling units** (1,500 sq m, not over **14 metres**, stilt plus 3 or ground plus 2) | From 2,000 sq ft to **5,380 sq ft** (500 sq m, same 14-metre and floor cap), for local bodies |
| Town and village panchayats | To **12,912 sq ft and 12 dwelling units** (1,200 sq m, same height and floor cap) | The same 5,380 sq ft commercial cap |

Housing and Urban Development Minister B. Rajkumar told [The Times of India](${TOI}) that the government had simplified the process and that, under the previous regime, people faced unnecessary hassles.

This is still a local-body permission. It is not the third-party download. The height in this press note stays at 14 metres.

## 19.5 metres is a third change

[G.O. Ms. No. 194](${GO194}), dated **26 October 2026**, amends the same 2019 rules again. In the definition and in the non-high-rise tables, **18.30 metres becomes 19.50 metres**. For the non-high-rise row, the order adds a floor cap: up to stilt plus 5 floors, or ground plus 5 floors. [The Hindu](${HINDU_HEIGHT}) reported the same height change.

A building that crosses 19.50 metres is still in high-rise territory. A building between 14 metres and 19.50 metres is **not** pulled into the third-party scheme or into the local-body limits above. Those two routes stay at 14 metres, with stilt plus 3 or ground plus 2.

The same order also says that, in a residential or primary-residential use zone, a site that abuts and takes access from a road of **12 metres** and above is deemed zoned for commercial use. In another table, the order sets that deemed commercial access at **12 metres** in the Chennai Metropolitan Area and at **9 metres** in the rest of Tamil Nadu. It also rewrites several setback, road-width, and parking lines, including parking for IT offices, IT-enabled services, and bio-informatics centres: one car space for every 75 sq m of floor area or part, and one two-wheeler space for every 50 sq m or part. Use the PDF for a setback on a real drawing. A summary is the wrong place to measure a side open space.

## The 5,000 sq ft self-certification line

On **28 August 2026**, Minister Rajkumar told the Assembly that self-certification for a residential building of ground plus two floors, or stilt plus three, would rise from **3,500 sq ft to 5,000 sq ft**, and that small commercial buildings up to **1,500 sq ft** would get a self-certification route. [The Hindu](${HINDU_ASSEMBLY}) reported the announcement.

That is an announcement in the House. This desk has not found an October gazette that writes 5,000 sq ft into the rules. The notified third-party scheme, with the 750 sq m and 14-metre caps, is the order a homeowner can read today. Treat a download button on the portal as open only when the portal itself offers it for that plot.

## What a Chennai owner can do this week

1. Ask whether the plot is an approved layout, a regularised layout, or a deed registered before 20 October 2016, and whether it sits in CRZ, a road widening, or another excluded class.
2. Match the drawing to one route: third-party (750 sq m / 300 sq m / the industrial test), local body (the 27 October limits), or the ordinary CMDA or town-planning file if it is larger or taller.
3. Hire an architect on the Council of Architecture register, or a Grade-I engineer already registered on the single-window portal, if you are using G.O. 179. Ask for the portal registration id.
4. Keep geo-tagged photos, the sale deed, patta or TSLR, and the layout proof ready as files, plus the drawing in dxf or dwg.
5. Pay only the fee the portal shows. The orders do not authorise a cash fee to a middleman.
6. After permission, the professional still has to certify completion against the approved plan. A QR code at the start is not a completion certificate.

The Directorate of Town and Country Planning lists these orders on [its G.O. page](${DTCP}). G.O. Ms. No. 158, dated 17 August 2026, is listed there as an online appeal and dispute-resolution system on the single-window portal. This report does not reproduce that order.

## Fact box

| Detail | As notified |
| --- | --- |
| Third-party order | G.O. Ms. No. 179, 7 October 2026, gazette 9 October |
| Who may certify | Council of Architecture architect, or Grade-I engineer on the single-window portal |
| House cap | 750 sq m FSI, 14 m, stilt+3 or ground+2, 8 homes |
| Shop cap | 300 sq m FSI, 14 m, stilt+3 or ground+2 |
| Factory cap | White or green, approved industrial layout, 2,500 sq m FSI; definition also says 18.30 m |
| Local-body order | G.O. Ms. No. 180, 8 October 2026; press note says live from 27 October |
| Corporation / municipality house | 1,500 sq m (16,140 sq ft), 16 homes, 14 m |
| Panchayat house | 1,200 sq m (12,912 sq ft), 12 homes, 14 m |
| Local-body shop | 500 sq m (5,380 sq ft), 14 m |
| High-rise line | G.O. Ms. No. 194, 26 October 2026: 18.30 m becomes 19.50 m, with a stilt+5 or ground+5 cap on that non-high-rise row |
| Permit life | Five years, and one extension of three years |

## Key takeaways

- G.O. 179 lets a registered architect or a Grade-I portal engineer certify smaller plans. After the fee, the rule says the plan and a QR code are generated online.
- A house on that route stops at 750 sq m of FSI, 14 metres, stilt plus 3 or ground plus 2, and eight homes. Many plots are excluded.
- Corporations can approve a larger house, up to 1,500 sq m, from 27 October. That file is still a local-body permission, and it is still 14 metres.
- 19.50 metres is the new line for a non-high-rise. It does not lift the 14-metre cap on the two easier routes.
- The 5,000 sq ft self-certification figure was announced in the Assembly on 28 August. Read a gazette before you treat it as open.
- A wrong certificate can be revoked. The owner and the professional answer together, and the professional can be blacklisted after a hearing.

## Fine print

This report was drafted with AI assistance and checked against the 9 October 2026 gazette, G.O. Ms. No. 194, and the 30 October town-planning press note. AI can miss a proviso. Before you pay a fee, sign a drawing, or start construction, read the order and the single-window screen for your plot.`.trim();

  const analysisBody = "";

  const body = `G.O. Ms. No. 179 of 7 October 2026 lets a registered architect or a Grade-I engineer certify smaller building plans on Tamil Nadu’s single-window portal. A house on that route is capped at 750 sq m of FSI, 14 metres, and eight homes. Separate orders widen local-body powers and raise the non-high-rise line from 18.30 metres to 19.50 metres.`;

  const values = {
    cityId: city.id,
    slug: SLUG,
    title:
      "Registered architects can now certify smaller building plans in Tamil Nadu",
    summary:
      "G.O. Ms. No. 179 caps the third-party route at 750 sq m of FSI, 14 metres, and eight homes. Local bodies got a higher limit from 27 October. The non-high-rise line is now 19.50 metres, and that does not widen the easier routes.",
    dek: "The October orders split into three tests: a third-party certificate, a larger local-body file, and a new 19.50-metre line for non-high-rise buildings.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    status: "published" as const,
    publishedAt,
    featured: false,
    heroImageUrl: HERO,
    sourceUrl: GAZETTE,
    sourceName: "Tamil Nadu Government Gazette, 9 October 2026",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "Can any engineer approve my house plan?",
          answer:
            "No. G.O. Ms. No. 179 defines the third party as an architect registered with the Council of Architecture, or a Registered Engineer Grade I registered on the Tamil Nadu Single Window Portal for Planning Permission.",
        },
        {
          question: "What size of house qualifies?",
          answer:
            "Floor Space Index area up to 750 sq m, height up to 14 metres, stilt plus 3 floors or ground plus 2, and up to eight dwelling units. The plot must be an approved or regularised layout, or a deed registered before 20 October 2016. CRZ, natham, agriculture, and road-widening sites are among the exclusions.",
        },
        {
          question: "Does the new 19.5 metre rule let me use the third-party route for a taller building?",
          answer:
            "No. G.O. Ms. No. 194 raises the non-high-rise line from 18.30 metres to 19.50 metres. The third-party route and the expanded local-body powers stay at 14 metres.",
        },
        {
          question: "Is the 5,000 sq ft self-certification already open?",
          answer:
            "On 28 August 2026 the Housing Minister told the Assembly the self-certification limit would rise from 3,500 sq ft to 5,000 sq ft for ground plus two or stilt plus three. This report has not found an October gazette that writes that figure into the rules. Use the portal’s own screen for your plot.",
        },
        {
          question: "What if the certificate is wrong?",
          answer:
            "The owner and the professional are jointly responsible. The authority checks at least 10 per cent of applications each month, can revoke a permission obtained by misrepresentation, and can blacklist the professional after a hearing.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-tn-building-approval] Refreshed:", SLUG);
  } else {
    await db.insert(articles).values({ ...values, createdAt: now });
    console.log("[seed-tn-building-approval] Inserted:", SLUG);
  }

  console.log(
    "[seed-tn-building-approval] Public URL:",
    `https://mychennaicity.in/chennai-local-news/${SLUG}`,
  );

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-tn-building-approval",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
