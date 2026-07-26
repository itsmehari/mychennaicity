/**
 * Tamil Nadu Government Order portal outdated — transparency editorial (July 2026).
 *
 * Dev:  `npm run db:seed:tamil-nadu-government-order-portal-july-2026`
 * Live: `npm run db:seed:tamil-nadu-government-order-portal-july-2026:live`
 *
 * Hero + in-article images are official-portal screenshots under public/images/articles/.
 * Deploy the site (or at least those assets) so production can serve the PNGs.
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const HERO_IMAGE_URL =
  "/images/articles/tamil-nadu-government-orders-portal-department-wise-july-2026.png";
const PWD_ARCHIVE_IMAGE =
  "/images/articles/tamil-nadu-public-works-department-gos-november-2022-archive.png";

const TN_GO_PORTAL = "https://www.tn.gov.in/";
const HINDU_JULY =
  "https://www.thehindu.com/news/national/tamil-nadu/a-majority-of-departments-are-yet-to-upload-gos-on-the-tamil-nadu-government-website/article71183172.ece";
const HINDU_EARLIER =
  "https://www.thehindu.com/news/national/tamil-nadu/some-departments-lag-behind-others-in-making-gos-public-on-tn-govt-website/article69061095.ece";

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

const SLUG =
  "tamil-nadu-government-order-portal-outdated-missing-gos-transparency-july-2026";

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

  const publishedAt = new Date("2026-07-26T06:30:00.000Z");
  const now = new Date();

  const reportBody = `## Key takeaways

- Tamil Nadu’s official Government Order portal presents a department-wise directory that looks authoritative — but many departmental archives are years behind.
- A July 2026 review found that **only five of 38 departments** had uploaded recent G.O.s for **May and June 2026**.
- The **Public Works Department** page on the central portal still shows its latest visible orders from **November 2022**.
- The **Public (Elections)** section has reportedly not published G.O.s since **June 2015**.
- Missing G.O.s for high-profile announcements weaken citizens’ ability to verify what was actually sanctioned.
- Archive gaps span multiple years and administrations; responsibility for fixing the portal rests with the government now in office.

## Disclaimer — read before the report

This article is **civic journalism** for public-interest, informational and educational purposes. It examines the accessibility and completeness of the Tamil Nadu Government Order portal using publicly accessible government webpages, published news reports, official statements, political manifestos and other sources available at the time of publication.

References to missing, unavailable, outdated or unpublished Government Orders mean the relevant records **could not be identified** through the public portal or sources reviewed at that time. They do **not**, by themselves, establish that an order does not exist, was never issued, or was intentionally concealed, suppressed or unlawfully withheld.

Government records, links, officeholders and portal contents may change after publication. Verify current information with the competent department, the official Tamil Nadu website, an RTI application or a qualified adviser before relying on this article for legal or administrative decisions.

Statements about campaign speeches, election assurances and governance commitments are presented with attribution. They do not constitute endorsement, opposition or proof of implementation.

## Summary

**Chennai, 26 July 2026** — Government Orders are among the most important administrative records issued by a State government. They are not routine office notes. They are the formal instruments through which many decisions are authorised, funded, amended or withdrawn.

A government may announce a welfare scheme at a public function. A minister may issue a press statement. A department may post a social-media graphic. But the Government Order — commonly called a G.O. — often contains the information that makes the announcement administratively meaningful: the legal authority, the money sanctioned, the implementing department, eligibility, territorial limits, officers empowered to act, the effective date, whether an earlier order is superseded, and the monitoring mechanism.

For citizens, lawyers, journalists, researchers, businesses, civil-society groups and government employees, access to these orders is essential for understanding what the State has actually authorised.

Tamil Nadu maintains an official Government Order portal that, at first sight, appears to provide this information. It offers department-wise browsing, alphabetical listing and search.

![Tamil Nadu Government Orders portal — Department Wise directory](${HERO_IMAGE_URL})

*Screenshot: Tamil Nadu Government Orders portal (Department Wise view), showing the official department directory used by the public to locate G.O.s.*

Yet a closer review reveals a serious problem: many departments have not published recent G.O.s. Some archives appear stagnant for two, three or more years. Reporting in July 2026 found that only five of the State’s 38 departments had uploaded recent orders for May and June 2026.

**The central concern:** when the government maintains an official repository but leaves much of it incomplete, citizens cannot know whether an order does not exist, has not been uploaded, is hosted elsewhere, is mis-indexed — or is being withheld. A public database without a completeness statement can be more misleading than having no database at all.

## What the portal presents

The Tamil Nadu Government website provides a department-wise Government Order directory covering Finance, Health, School Education, Public Works, Housing, Environment, Municipal Administration and Water Supply, and dozens of other departments.

Department pages typically show the G.O. number, date, subject, a PDF download link and links to earlier archive years. In principle, this structure is useful: users who do not know a G.O. number can browse by department and year.

But the value of such a system depends entirely on whether the records are complete, current and consistently indexed. The portal does not prominently state whether every G.O. issued by a department is included; what categories are excluded; when each archive was last updated; how many orders were issued versus uploaded; whether documents await publication; who is responsible for uploading; or how a citizen can report a missing order. Users are left to infer completeness from the interface. That is unsafe for an official records system.

## The scale of the publication gap

The problem is not one missing document. A July 2026 review, reported by [*The Hindu*](${HINDU_JULY}), found that only five departments — Rural Development and Panchayat Raj, Health and Family Welfare, Co-operation, Food and Consumer Protection, Finance, and Public — had hosted G.O.s issued in May and June after the new government assumed office on 10 May. The overwhelming majority of departments had not kept their English-language G.O. sections current for that period.

A department-by-department picture drawn from that and related portal reviews shows large variation in last available dates:

| Department | Last publicly visible G.O. (reported) |
|---|---|
| Finance | July 2026 |
| Health and Family Welfare | June 2026 |
| Rural Development and Panchayat Raj | June 2026 |
| Public Department | May 2026 |
| BC, MBC and Minorities Welfare | March 2026 |
| Water Resources / Tourism / Handlooms | January 2026 |
| Commercial Taxes and Registration | November 2025 |
| Environment, Climate Change and Forests | October 2025 |
| Revenue and Disaster Management | September 2025 |
| Agriculture and Farmers Welfare | April 2025 |
| Higher Education / Social Welfare | November 2024 |
| Energy / Animal Husbandry | October 2024 |
| Industries | March 2024 |
| Law | **December 2023** |
| Public Works | **November 2022** |
| Youth Welfare and Sports | **June 2022** |
| Cooperation, Food and Consumer Protection (English section) | **January 2022*** |
| Public (Elections) | **June 2015** |

\\*Reporting also noted that some recent Co-operation orders appeared under “What’s New” or the Tamil G.O. section but not the English G.O. archive — itself evidence of fragmented disclosure.

These gaps are too large to explain as short processing delays. They suggest that departments may have stopped using the central portal, publish selectively, host documents elsewhere without integration, lack clear upload responsibility, or suffer technical failures. Without an official explanation, citizens cannot tell which possibility is correct.

## The Public Works Department example

Public Works is responsible for major government buildings, institutional infrastructure, maintenance and substantial public expenditure. Its G.O.s may cover administrative and financial sanctions, construction of offices and hospitals, staff quarters, contractor registration, procurement and project implementation.

Yet the central portal page for the department still shows only a small set of 2022 orders — the latest visible being **G.O. Ms. No. 106 dated 1 November 2022** (administrative and financial sanction for multi-storeyed C-type quarters at Todhunter Nagar, Saidapet, estimated at about ₹99.77 crore). Other visible entries include G.O. Ms. Nos. 92 and 91 (22 September 2022) and G.O. Ms. No. 37 (17 June 2022). Archive links for earlier years appear; visible records for 2023–2026 do not.

![Public Works Department G.O. list ending November 2022](${PWD_ARCHIVE_IMAGE})

*Screenshot: Public Works Department Government Orders page on the Tamil Nadu portal — latest visible entries from 2022, with year archives below.*

It is unreasonable to assume that a construction-heavy department issued no Government Orders for more than three and a half years. The more plausible conclusion is that newer orders are absent from this public archive, maintained elsewhere, misclassified or not retrieved by the portal. The website, however, provides no warning that the archive is incomplete, that recent orders live elsewhere, or that records are under migration.

A citizen searching for a recent PWD sanction may conclude that the order was never issued, that a project has no administrative sanction, or that the department has not acted — when the document may exist in an internal system or another repository. An official archive must not force users to guess.

## Missing records for major public schemes

The publication gap becomes sharper when it concerns high-profile announcements. Reports stated that G.O.s connected with major policy announcements — including the Singappen Special Force and additional free-electricity benefits for domestic consumers — were not available through the official G.O. repository when reviewed.

A public announcement describes intention. The Government Order answers harder questions: Which department is nodal? What expenditure is sanctioned? Is the programme universal or limited? What are eligibility criteria and documents? From which budget head will money be drawn? What is the implementation date? Are earlier G.O.s amended? Without the order, the public sees the promise but not the machinery.

## Who depends on Government Orders

**Citizens** may need a G.O. to establish eligibility for a benefit, concession, pension, subsidy, educational opportunity or government service. Without the original order, they fall back on a local official’s interpretation, a WhatsApp copy, a newspaper report or a third-party website.

**Government employees** rely on G.O.s for recruitment, promotion, pay, pension, leave, transfer, seniority, disciplinary procedure and creation or abolition of posts.

**Businesses and professionals** — contractors, engineers, institutions, hospitals and industrial units — need authoritative orders on tenders, licences, incentives, land use, procurement, building regulation and environmental requirements.

**Courts and lawyers** routinely ask whether an order remains in force, has been amended or superseded, applies retrospectively or was issued by a competent authority.

**Researchers and local communities** use G.O.s as the documentary trail of policy — budget allocation, restructuring, flood mitigation, housing, wetland protection, waste facilities and resettlement. Missing records produce gaps in administrative history and weaken neighbourhood-level participation across Chennai.

## The legal foundation: RTI and proactive disclosure

The Right to Information Act, 2005 was enacted to promote transparency and accountability. Tamil Nadu’s proactive-disclosure manuals recognise this purpose under Section 4(1)(b), covering rules, regulations, instructions, records and information available in electronic form.

Section 3 gives citizens the right to information held by public authorities, subject to lawful exemptions. Section 4 requires authorities to maintain records so that access is facilitated — catalogued, indexed and, where feasible, computerised and networked — and to publish important categories of information proactively so that citizens need not file individual RTI applications for routine records.

Government Orders are central administrative records. Not every G.O. is publishable in full; some may contain exempt information under Section 8. But exemptions apply to information, not automatically to every document titled “Government Order.” The government cannot treat all unuploaded orders as confidential merely because they are absent online. Where a document mixes exempt and non-exempt material, severability allows redaction of protected portions.

A responsible system should distinguish published orders, partially redacted orders, temporarily withheld orders, permanently exempt records and orders awaiting publication. The present portal largely leaves silent gaps instead.

## Accessibility is more than “a PDF somewhere”

Departments sometimes treat disclosure as binary: if a file sits on a government server, it is “public.” That standard is inadequate. A record is meaningfully accessible only when an ordinary user can locate, identify, retrieve and understand it without unreasonable difficulty.

A Government Order repository needs stable links, accurate indexing, searchable text, department and year classification, subject keywords, amendment history, clear publication status, disability accessibility, mobile compatibility and bilingual metadata where appropriate.

An authoritative repository must answer three questions: Does the record exist? Is this the authentic version? Is it currently valid? The Tamil Nadu portal can often answer the second for documents that are actually available. It does not reliably answer the first or third. Even when found, status — active, amended, superseded, stayed or withdrawn — is often unclear. The portal functions more like a file collection than a modern public register.`;

  const analysisBody = `## Why stale archives actively mislead

An incomplete archive does not merely fail to inform. Confronted with a PWD page ending in November 2022, a citizen may assume that no later orders exist, that all later orders are confidential, that the department no longer issues G.O.s, or — correctly but damagingly — that the official portal cannot be trusted. An official information system should increase confidence in public records. It should not train users to assume government databases are incomplete.

The uneven update pattern also suggests that G.O. publication is not governed by a uniform, automated statewide workflow. Uploads appear to depend on departmental practice, designated officers, manual processes and inconsistent interpretation of disclosure duties. An order can be issued, circulated and implemented while public upload remains a separate task that never happens.

**What every department page should show:** latest order issued · latest order published · totals issued vs available · numbers withheld or awaiting redaction · last synchronisation date and time · responsible officer. Example: “Orders issued in 2026: 184 · published: 176 · partially redacted: 4 · withheld under Section 8: 2 · awaiting publication: 2 · last synchronised: 26 July 2026, 11:30 a.m.” Without such a dashboard, independent verification of completeness is impossible.

## RTI should not be the default route for routine G.O.s

The RTI Act gives citizens a request mechanism. It should not be the default route for ordinary administrative orders. Individual applications produce delay, duplication, burden on Public Information Officers, unequal access for those unfamiliar with the process, and fragmented public knowledge — a document supplied privately to one applicant does not become searchable for everyone else. Section 4 proactive disclosure exists precisely to prevent this pattern.

Website reliability is itself part of the right to information. When digital infrastructure is the primary access route, uptime, data integrity, permanent URLs, search accuracy, version control and archival preservation become governance obligations. A broken or outdated portal is not merely an IT inconvenience; it obstructs information access.

Modern governments upload press releases, scheme posters and social-media content rapidly. Publicity tells citizens what the government wants them to know. The underlying order allows them to verify what was formally approved. When press communication is instant but G.O.s remain unavailable, the information environment becomes unbalanced.

## An institutional problem — and a fair chance to fix it

Reported archive gaps cover periods spanning more than one administration — departments last updated in 2022, 2023 or 2024, alongside 2026 concerns about newly announced schemes. This should not be reduced to a party-political allegation alone. The deeper problem is institutional: record-management policy, digital architecture, departmental accountability, proactive-disclosure standards and audit.

Where a G.O. cannot be published immediately or in full, the registry should not silently omit it. It should publish metadata: number, department, date, broad subject, publication status, legal basis for withholding, temporary or permanent status, review date and whether a redacted version is available.

When official access fails, unofficial copies fill the gap — WhatsApp groups, Telegram channels, private databases and poorly scanned photocopies. These may be incomplete, altered, missing annexures, outdated or unauthenticated. Citizens should not have to rely on a forwarded PDF to determine government policy.

## Why this matters for money, infrastructure and Chennai’s environment

Administrative and financial sanction orders reveal estimated cost, funding source, implementing agency, timeline and technical conditions. They allow citizens to compare announced cost with sanctioned cost, tender value, revised estimates and actual delivery. If the sanction order is unavailable, meaningful scrutiny collapses — especially for Public Works, Highways, Housing, Municipal Administration, Water Resources, Environment, Revenue and Industries.

Environmental decisions often involve multiple authorities. A G.O. may constitute a committee, declare an ecologically sensitive area, assign land, approve restoration, sanction flood infrastructure, establish a waste facility or amend regulation. Press releases describe objectives; orders reveal boundaries, conditions, exceptions, monitoring and deadlines. Missing G.O.s weaken environmental accountability across Chennai — from stormwater and canals to wetlands and waste facilities.

## Election assurances on transparent governance must also apply to G.O.s

The condition of Tamil Nadu’s Government Order portal must also be examined against transparency assurances made during the 2026 Assembly election campaign and after formation of the new government.

Chief Minister C. Joseph Vijay assumed office on **10 May 2026** after the Tamilaga Vettri Kazhagam-led formation secured legislative support. Transparency, anti-corruption measures, citizen access to services and technology-enabled accountability were presented as central parts of the governing mandate placed before voters.

The election platform’s “Clean Governance” commitments included proposals for a Tamil Nadu Right to Service Act; legally defined service time limits; automatic compensation for delay; a unified digital platform for public services; real-time application tracking; district development plans with measurable targets and public dashboards; whistle-blower protection; an anti-corruption ombudsman; greater transparency in transfers and postings; and a White Paper on State finances. Following swearing-in, the Chief Minister reportedly promised a corruption-free administration, transparent operations and release of a financial White Paper.

These assurances create a public standard against which continued non-publication of Government Orders should be assessed. A government cannot meaningfully claim digitally trackable, accountable administration while the formal orders authorising its decisions remain missing, fragmented or years out of date on the official portal.

G.O.s are frequently the documentary foundation of the very governance commitments placed before voters. Transparency must cover not only citizen applications and certificates, but also the government’s own decision-making records. Without the underlying order, the public cannot independently distinguish electoral assurance, announcement, Cabinet decision, administrative sanction and implemented programme. That distinction is fundamental to democratic accountability.

**Transparency must be demonstrable.** It is not established merely by declaring that an administration will be transparent. It must be shown through reliable access to official records. Citizens should not depend on unofficial copies, private databases, forwarded PDFs, newspaper reports or individual RTI applications to locate routine Government Orders.

Archive gaps appear to span multiple years and cannot reasonably be attributed entirely to a government that assumed office only in May 2026. The Public Works page visibly stopping in November 2022 shows that part of the failure predates the current administration. **Responsibility for correcting an inherited transparency failure, however, rests with the government presently in office.**

An appropriate response would be to: acknowledge that the portal is incomplete; order a department-wise audit and publish findings; restore missing records; set a mandatory publication deadline; build automatic publication into future workflows; and report compliance openly.

**Governance undernote:** During the 2026 election campaign and upon assuming office, the present Tamil Nadu administration placed transparency, clean governance, anti-corruption measures, technology-enabled public services and measurable accountability among its stated commitments. The condition of the Government Order portal should therefore be viewed not merely as a legacy website problem, but as an immediate opportunity to translate those assurances into verifiable administrative practice.

## What a modern G.O. registry should look like

Tamil Nadu should replace the fragmented archive model with a central, transaction-level Government Order registry. Every non-exempt order should receive a permanent public record at the time of issue, with unique ID, type and number, department, dates, subject and summary, full text, keywords, jurisdiction, budget head where relevant, implementing agency, status, related and superseded orders, digitally signed PDF, annexures and machine-readable metadata.

Status labels should be explicit: active, amended, superseded, withdrawn, stayed, expired or under review. Search should work by keyword, department, date range, number, district, scheme, project and status. Metadata and summaries should be available in Tamil and English.

### Reform steps

1. **Build publication into the approval workflow.** Draft → digital approval → official number → classify as fully publishable / redacted / temporarily exempt / exempt → mandatory metadata → digital signature → automatic transmission to the central registry → time-bound public release → automatic linking of amendments → audit logs for delay or withholding.
2. **Adopt clear publication deadlines.** Ordinary non-exempt G.O.s within 24 hours; redactions within three working days; urgent public-safety orders immediately; delayed publication must record a reason; exempt orders should still generate a metadata entry where legally permissible.
3. **Audit annually and report to the Assembly.** Compare orders issued internally with those published, redacted and withheld; measure delay, broken links and missing annexures; publish findings; require corrective action from non-compliant departments.

## Questions the Tamil Nadu Government should answer

- How many G.O.s did each department issue from January 2022 to July 2026, and how many are on the central portal?
- Why do some departmental archives stop several years ago?
- Are recent G.O.s hosted on another platform? Is the department-wise portal intended to be comprehensive?
- Who is responsible for uploading, and what is the prescribed time limit?
- Are departments audited for compliance? How are exempt orders recorded?
- Is a centralised replacement planned? Will missing historical orders be backfilled?
- Will the government publish a department-wise compliance dashboard, digitally signed searchable PDFs, and machine-readable metadata?
- What mechanism can citizens use to report missing or broken records?

## mychennaicity.in editorial position

**A government that expects citizens to comply with its orders must make those orders reasonably, reliably and consistently accessible.**

Tamil Nadu’s Government Order portal cannot presently be treated as a complete and dependable public register. The problem includes outdated departmental pages, missing recent orders, inconsistent publication practices, fragmented systems, defective navigation and the absence of any declaration confirming whether displayed records are complete.

The Public Works archive ending in November 2022 is only one example. Reports that only a small number of departments had uploaded recent orders during May and June 2026 show that the failure is systemic. This does not establish that every missing order has been deliberately withheld. Gaps may result from administrative delay, manual upload failures, restructuring, portal defects, system migration or the absence of a uniform publication protocol. The consequence for the public remains the same.

Government Orders often determine how public money is spent, how schemes operate, how projects are sanctioned, how departments exercise power and how citizens’ rights and obligations are administered. Their publication should be treated as a basic component of transparent government.

The present administration has publicly associated its governing mandate with transparency, clean governance, anti-corruption measures, digital public services and measurable accountability. Restoring and modernising the G.O. repository would be a direct and visible way of applying those commitments.

Citizens should not be required to file repeated RTI applications merely to discover ordinary Government Orders that should already form part of proactive public disclosure.

*— mychennaicity.in editorial*`;

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
      "Tamil Nadu’s Government Order portal is years out of date: why missing G.O.s are a serious transparency failure",
    summary:
      "Only five of 38 Tamil Nadu departments uploaded recent May–June 2026 G.O.s. Public Works still ends at November 2022. Why incomplete archives mislead citizens — and how election transparency promises apply.",
    dek: "A public G.O. repository without a completeness statement can be more misleading than having no repository at all.",
    body,
    reportBody,
    analysisBody,
    category: "Politics",
    areaHubSlug: null as string | null,
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: HINDU_JULY,
    sourceName: `The Hindu (${HINDU_JULY}; earlier lag report ${HINDU_EARLIER}); Tamil Nadu Government Orders portal (${TN_GO_PORTAL}); RTI Act 2005 §§3–4, 8`,
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "Does a missing G.O. on the portal mean it was never issued?",
          answer:
            "Not necessarily. It may exist internally, be hosted elsewhere, be mis-indexed, await upload, or — in limited cases — be lawfully withheld. The portal’s silence does not prove non-existence.",
        },
        {
          question: "Is this article accusing the current government of hiding orders?",
          answer:
            "No. Archive gaps appear to span multiple years and administrations. The article argues that responsibility for repairing an incomplete public registry rests with the government now in office.",
        },
        {
          question: "Which departments were current for May–June 2026?",
          answer:
            "Reporting identified Rural Development and Panchayat Raj, Health and Family Welfare, Co-operation, Food and Consumer Protection, Finance, and Public among those with recent May–June uploads — five of 38 departments overall.",
        },
        {
          question: "Why does Public Works matter as an example?",
          answer:
            "PWD sanctions involve major public buildings and expenditure. A central-portal archive ending in November 2022, without a completeness warning, illustrates how an obsolete official page can mislead citizens.",
        },
        {
          question: "What should citizens do if they cannot find a G.O.?",
          answer:
            "Check the department-wise portal, the department’s own site, What’s New, press releases citing order numbers, related court filings, and — if needed — request the record or file an RTI. Prefer certified copies when authenticity matters.",
        },
        {
          question: "Is this legal advice?",
          answer:
            "No. It is independent civic journalism. Nothing here constitutes legal advice, an official government communication, or a certified reproduction of a Government Order.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-tn-go-portal] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-tn-go-portal] Inserted article:", SLUG);
  }

  console.log(
    "[seed-tn-go-portal] Public URL:",
    `https://mychennaicity.in/chennai-local-news/${SLUG}`,
  );
  console.log("[seed-tn-go-portal] Hero image:", HERO_IMAGE_URL);
  console.log("[seed-tn-go-portal] PWD screenshot:", PWD_ARCHIVE_IMAGE);

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-tn-go-portal",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
