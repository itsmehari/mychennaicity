/**
 * DVAC raids / GCC suspensions — Zone 6 & 9 and related cases (July 2026).
 *
 * Dev:  `npm run db:seed:dvac-raids-chennai-corporation-july-2026`
 * Live: `npm run db:seed:dvac-raids-chennai-corporation-july-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

/** Representational civic-administration image — not a photo of any accused official or raid. */
const HERO_IMAGE_URL =
  "/images/articles/chennai-gcc-competitive-tenders-civic-works-savings-2026.jpg";

const DVAC_SITE = "https://www.dvac.tn.gov.in/";
const GCC_SITE = "https://chennaicorporation.gov.in/";
const RELATED_ZONES =
  "/chennai-local-news/chennai-corporation-zones-current-15-proposed-20-map-explained";
const RELATED_TENDERS =
  "/chennai-local-news/chennai-gcc-competitive-tenders-civic-works-savings-2026";

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
  "dvac-raids-chennai-corporation-officials-suspended-corruption-probe";

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

  const publishedAt = new Date("2026-07-20T06:00:00.000Z");
  const now = new Date();

  const reportBody = `## Key takeaways

- Following statewide DVAC surprise inspections on **3 July 2026**, Greater Chennai Corporation has suspended **seven** officials connected with **Zone 6 (Thiru Vi Ka Nagar)** and **Zone 9 (Teynampet)**.
- Media reports based on FIR material describe alleged unaccounted cash, Google Pay trails, gold-savings documents, housing-loan papers and liquor bottles allegedly described as contractor gifts. **These remain allegations under investigation.**
- Separately, media reports identify **six** other GCC employees suspended in other corruption-related cases in June–July 2026 — producing **at least 13** publicly named suspensions; some Corporation sources have cited **14**. Claims of **15** are not confirmed by a published consolidated order.
- Suspension is an administrative step. It is **not** a finding of guilt. Named persons must be presumed innocent unless guilt is established through departmental or judicial process.
- No publicly reported FIR material has alleged involvement by Chennai Mayor **R. Priya**, despite media notes that one engineer was attached to Ward 74.

## Disclaimer — read before the report

This article is **civic journalism** based on publicly reported DVAC activity, Greater Chennai Corporation statements quoted in the press, and contemporaneous media coverage. It is **not** an official DVAC, police, court or Corporation order.

**All persons named are facing allegations and/or investigation. They must be presumed innocent** unless and until guilt is established through the applicable departmental inquiry or criminal trial. Nothing in this article should be read as a finding that any named individual accepted a bribe, possessed illegal assets, obstructed an inspection, or committed any offence.

References to FIRs, seizures, bank deposits, Google Pay records, gold-savings schemes, liquor bottles, contractor gifts or “unexplained” cash are **reported allegations** attributed to investigating agencies and media summaries of case papers. Document recovery does not by itself prove illegal income; unexplained deposits and digital transfers are investigative leads until source, purpose and connection to an official act are proved.

**No allegation against Mayor R. Priya.** Mention of Ward 74 is administrative context only. Publicly available reporting cited here does not allege that the mayor participated in, knew about or benefited from the transactions under investigation.

mychennaicity.in does not assert that any contractor, intermediary or property owner named or unnamed in press coverage is guilty of offering illegal gratification. Where this article discusses possible contractor liability, it describes what investigators would ordinarily examine — not a concluded finding.

Figures for cash seized, digital transactions and suspension totals may differ across DVAC releases and media reports. Prefer primary DVAC / GCC documents when they become available. This page may be updated if official corrections are issued.

## Summary

**Chennai, 20 July 2026** — The Greater Chennai Corporation has initiated one of its most significant recent disciplinary crackdowns after surprise inspections by the Directorate of Vigilance and Anti-Corruption uncovered alleged financial irregularities across multiple zonal offices.

Seven Corporation officials connected to the Thiru Vi Ka Nagar and Teynampet zones have now been suspended. Several face criminal investigation, departmental proceedings and possible removal from service — outcomes that remain contingent on due process.

The investigation has been reported to involve unexplained bank deposits, Google Pay transactions, cash kept inside offices, gold-purchase documents, gold-savings schemes, housing-loan records and liquor bottles allegedly received as gifts from contractors. Media coverage links these leads to FIR material; they have not been adjudicated as proven facts in this report.

The latest suspensions form part of a wider anti-corruption drive under the Tamil Nadu government, with the Corporation indicating that suspension will not necessarily be the final disciplinary action.

## Statewide DVAC inspections conducted on 3 July

The investigation originated from a statewide series of surprise inspections conducted by DVAC on **3 July 2026**.

According to an official DVAC press release reported in the media, inspections were conducted at Corporation, municipality and panchayat offices across Tamil Nadu. The agency reported seizing **₹31.27 lakh** in unaccounted cash and identifying suspected Google Pay transactions amounting to **₹26.71 lakh** during the statewide operation.

Greater Chennai Corporation offices in Zone 6, covering Thiru Vi Ka Nagar, and Zone 9, covering Teynampet, were among the offices that came under scrutiny.

The New Indian Express reported that DVAC teams examined cash, documents, vouchers and financial transactions connected to Corporation employees. The agency reportedly seized **₹41,790** from the Zone 6 office and **₹1.39 lakh** from the Zone 9 office.

## Nine-hour search at Thiru Vi Ka Nagar zonal office

A team of nine DVAC personnel reportedly entered the Thiru Vi Ka Nagar zonal office on 3 July after receiving information about suspected corruption.

The search continued for approximately nine hours.

Executive Engineer **R. Saravanan** and Assistant Engineer **T. Saraswathi** became principal subjects of the investigation, according to media reports. A regular case relating to the Local Bodies Department was registered by DVAC’s Chennai City unit on **6 July 2026**. The registration of a Local Bodies case on that date is recorded on the official DVAC FIR portal, as reported in coverage of the matter.

According to reports based on the FIR, investigators recovered unaccounted cash, jewellery, tax invoices and documents connected to gold-savings schemes from Saravanan’s office.

One document reportedly referred to a gold-savings plan with monthly instalments of **₹25,000** over **246 months**. Another scheme reportedly carried monthly instalments of **₹5,000** over **182 months** and was recorded in Saraswathi’s name.

**Important caveat:** The presence of these documents does not by itself prove that every listed instalment was paid or that the investments represented illegal income. Investigators must establish who made the payments, how much was actually invested and whether the money can be connected to official decisions.

## Liquor bottles allegedly described as contractor gifts

DVAC officials also reportedly found foreign liquor valued at approximately **₹32,000** inside Saravanan’s office cupboard.

According to the FIR account reported by The Times of India, Saravanan allegedly told investigators that the bottles had been received as gifts from contractors. The agency reportedly treated the explanation as an indication of a possible undue advantage received from persons dealing with the Corporation.

This part of the investigation could become particularly important — still as an **allegation** requiring proof.

The value of the bottles is less significant than the alleged relationship between an executive engineer and contractors whose work may have required official approval.

Investigators will need to identify the contractors involved and examine whether they received tenders, work orders, measurement approvals, completion certificates, bill clearances or other favourable decisions from the officials concerned.

Any contractor found to have offered illegal gratification must also face investigation and possible disqualification from future Corporation contracts — again, only if evidence supports such findings after due process.

## Saraswathi’s financial documents reportedly found in official vehicle

DVAC reportedly recovered documents connected to Assistant Engineer T. Saraswathi’s housing loan from Saravanan’s official vehicle.

Investigators are examining why documents belonging to one official were allegedly found in the office or vehicle controlled by another official.

According to reported FIR details, an examination of Saravanan’s bank accounts covering **1 January to 30 June 2026** identified approximately **₹10.61 lakh** in cash deposits for which an acceptable explanation was allegedly not provided.

The source of these deposits, the identity of those making them and any connection with Corporation contracts or approvals will have to be established during the investigation.

An unexplained deposit is an investigative lead. It becomes evidence of corruption only when authorities can demonstrate its source, purpose and connection to an official act.

## Engineer allegedly left during the inspection

During the search, DVAC personnel reportedly sought to question Saraswathi about investments and documents bearing her name.

The FIR reportedly states that she left or avoided the search proceedings without obtaining the consent of the DVAC team.

When she subsequently appeared before investigators, Saraswathi reportedly stated that she had attended a meeting concerning the Otteri Nullah canal development project at the office of the Joint Commissioner for Works in Ripon Buildings.

DVAC reportedly verified this explanation with the zonal administration and concluded that she had not attended the meeting as claimed. Investigators consequently alleged that she had attempted to avoid questioning and conceal relevant information. These remain agency allegations pending further proceedings.

The agency reportedly collected 14 pages of her Google Pay transaction records and identified approximately **₹1.71 lakh** in transactions over six months for which it said satisfactory explanations had not been provided. She was subsequently included in the case.

## Town-planning engineer booked over digital transactions

Assistant Executive Engineer for Town Planning **E. Ravivarman**, who worked from the same premises, was also brought under investigation.

DVAC reportedly identified approximately **₹2.39 lakh** in digital transactions over six months that Ravivarman was allegedly unable to explain.

GCC Commissioner **Dr G.S. Sameeran** told DT Next that the Corporation received a preliminary DVAC report and immediately suspended the officials concerned. He said FIRs had been registered and that further departmental action would follow after due process.

Town planning is considered one of the most sensitive functions within a civic body because officials interact with property owners, developers, builders, architects and contractors.

Their responsibilities may include scrutiny of building plans, planning permission, inspection of construction, identification of unauthorised deviations and initiation of enforcement or lock-and-seal action.

Investigators must therefore examine whether the reported transactions correspond with particular applications, properties, enforcement cases or building approvals handled by the officials — without treating any application file as proof of wrongdoing until linked by evidence.

## Four more Corporation employees suspended

Four other employees connected to the Thiru Vi Ka Nagar and Teynampet zones were also suspended following the inspections.

They were identified in media reports as:

- Junior Assistant **Manikandan**
- Accounts Superintendent **A. Sriramulu**
- Sanitary Officer **A. Manjith**
- Conservancy Inspector **R. Kothandan**

The officials were reportedly suspended after approximately **₹1.39 lakh** in cumulative unexplained cash was detected during the inspections.

The latest batch of seven suspended employees therefore includes officials from engineering, town planning, accounts, sanitation and conservancy functions.

This spread indicates that the investigation is not limited to one department or one type of transaction.

## Six officials had already been suspended in separate cases

The latest action followed the suspension of six other Greater Chennai Corporation employees in separate corruption-related cases, according to media reports. The summaries below are **allegations as reported**; they are not findings of guilt by this publication.

### Planning-permission allegation

Assistant Executive Engineer **Anandarao** of Madhavaram zone was suspended after allegedly demanding **₹2.5 lakh** from a building owner for granting planning permission.

The suspension was reportedly ordered on **17 June**. Criminal proceedings were also initiated, as reported.

### Alleged fake medical-equipment bills

**Dr Devikala**, a zonal health official connected to Manali and Madhavaram, was suspended on **9 July** after an internal investigation into alleged fake bills worth **₹9 lakh** for medical-equipment procurement during 2025–26.

### Alleged cash-for-jobs case

Senior Entomologist **Siva Porkodi** was suspended on **11 July** over allegations that **₹6 lakh** was received from a person after promising employment in the Corporation.

Authorities reportedly initiated criminal proceedings even though the official allegedly claimed that the money had later been returned.

Returning money after a complaint does not automatically erase a possible offence if the original acceptance was unlawful — a legal principle that still requires proof in each case.

### Lock-and-seal threat allegation

A Corporation road worker identified as **Baskar** was suspended on **10 July** after allegedly receiving **₹50,000** from a property owner.

Authorities alleged that the official threatened the owner with lock-and-seal action even though the property owner possessed official permission.

### Alleged demand for clearing contractor bills

A bill clerk named **Durga** and an NULM worker named **Kannan** were suspended on **15 July**.

The two were accused of demanding money from a mechanical-department contractor for clearing pending bills in the Royapuram zone.

Together, these cases — if proved — would point to potential vulnerabilities across planning permission, building enforcement, recruitment, medical procurement and contractor bill processing. Until proved, they remain contested or pending matters.

## Is the suspension total 13, 14 or 15?

Several social-media posts have claimed that **15** Greater Chennai Corporation officials were suspended within two weeks.

That number cannot presently be confirmed from a publicly available consolidated GCC order.

The publicly detailed cases account for:

- Six officials suspended in the earlier group
- Seven officials suspended following the Zone 6 and Zone 9 inspections

This produces **13** individually identifiable suspensions.

The New Indian Express, citing Corporation officials, reported that the recent anti-corruption drive had resulted in a total of **14** suspensions. However, the same report specifically referred to seven latest suspensions and six earlier suspensions without identifying the additional official required to reconcile the total.

Until the Greater Chennai Corporation publishes a consolidated list, the most accurate description is that **at least 13** officials have been publicly identified, while Corporation sources have placed the broader total at **14**.

The claim that **15** officials were suspended should not be treated as a confirmed fact without an official order or complete list.`.trim();

  const analysisBody = `## Why the Google Pay evidence matters

The investigation also demonstrates how suspected corruption inquiries increasingly examine digital transfers alongside cash.

Payments made through Google Pay, bank transfers or other digital platforms can create records showing:

- the account from which money originated;
- the recipient’s account;
- date and time of the transaction;
- frequency of transfers;
- transaction remarks;
- possible links between officials, contractors and intermediaries.

However, the existence of a digital transaction does **not** automatically establish corruption.

Authorities must connect the payment to an official decision, benefit or favour. The payer must be identified, the relationship with the official established and the transaction’s stated purpose examined.

The statewide 3 July operation identified **₹26.71 lakh** in suspected Google Pay transactions. In another statewide operation at taluk offices on **17 July**, DVAC reportedly identified **₹68.33 lakh** in suspicious digital transactions and seized **₹13.78 lakh** in unaccounted cash.

This indicates that digital-payment analysis is becoming a central part of anti-corruption investigations in Tamil Nadu — while still requiring case-by-case proof.

## Absence of a cash register raises internal-control questions

DVAC reportedly observed that the Thiru Vi Ka Nagar zonal office did not maintain an effective personal cash register to record cash carried or retained by officials inside the office.

If accurate, this would represent a serious administrative weakness.

When substantial cash is found inside a government office, officials may provide explanations such as personal expenses, office collections, staff welfare contributions, ceremonial expenses or money temporarily kept on behalf of another person.

Without a daily cash-declaration mechanism, investigators may find it difficult to distinguish legitimate personal cash from illegal collections.

Sensitive departments should consider:

- daily declarations of personal cash above a prescribed limit;
- contractor and visitor registers;
- CCTV retention requirements;
- digital tracking of files and approvals;
- random audits of officials in high-risk positions;
- rotation of employees holding sensitive posts for extended periods;
- mandatory disclosure of gifts received from contractors or applicants;
- direct online payment systems reducing cash interaction;
- audit trails for planning permissions, tenders and bill approvals.

These are governance recommendations. They are not findings that any particular control failure caused the alleged irregularities in this case.

## Suspension is not proof of guilt

All allegations remain subject to investigation and due process.

Suspension is an administrative measure. It may be imposed to prevent an employee from influencing witnesses, accessing official records, interfering with an investigation or continuing in a sensitive position.

It does **not** amount to a judicial finding of guilt.

Two separate processes are likely to proceed.

### Departmental inquiry

The Corporation can examine whether an employee violated service rules, failed to maintain integrity, accepted prohibited gifts, possessed unexplained money or obstructed an official inspection.

Corporation officials have said departmental proceedings may be completed within approximately three months and that employees found guilty could face dismissal or removal from service.

### Criminal investigation

DVAC must collect evidence capable of establishing offences under the applicable criminal and anti-corruption laws.

Investigators must prove the source of money, the recipient, the benefit provided and the connection between the payment and an official act.

A criminal conviction requires a substantially higher evidentiary standard than departmental disciplinary action.

## No allegation against Chennai Mayor R. Priya

Assistant Engineer T. Saraswathi was reportedly attached to Ward 74, which is represented by Chennai Mayor **R. Priya**.

This administrative connection has been mentioned in news reports. However, **no publicly reported FIR material has alleged that the mayor participated in, knew about or benefited from the transactions under investigation**.

The fact that an official worked in a ward represented by an elected councillor does not establish wrongdoing by the councillor.

Any discussion of Ward 74 or Mayor R. Priya in this article is limited to that clarification.

## Government signals stronger action beyond suspension

The crackdown follows public directions from Chief Minister **C. Joseph Vijay** that corruption and policy irregularities should invite strict action.

During a Cabinet meeting on **16 July**, the Chief Minister reportedly warned ministers that those found involved in corruption could be removed and directed departments to ensure that public services were delivered without bribery.

Commissioner Sameeran has similarly stated that suspension should be treated only as the first stage of disciplinary action and that officials found guilty could face removal from service and criminal proceedings.

The effectiveness of the initiative will depend on whether cases proceed beyond announcements and suspensions to completed investigations, departmental orders, prosecutions and recovery of illegal assets — always subject to fair process for those accused.

## Contractors and intermediaries must also be investigated

A credible anti-corruption exercise cannot stop with action against public officials.

If contractors offered liquor, gifts, money or digital payments, their involvement must also be investigated — where evidence so warrants.

Authorities should examine, where relevant:

- tender applications submitted by the contractors;
- work orders awarded to them;
- rates quoted and approved;
- measurement books;
- quality-inspection reports;
- completion certificates;
- variation orders;
- pending and cleared bills;
- payments authorised by the accused officials;
- complaints or penalties previously recorded against the contractors.

Contractors found to have bribed officials should face prosecution, recovery proceedings and blacklisting — again, only after due process. Naming a contractor in an FIR summary is not the same as blacklisting.

## GCC should publish a consolidated action report

Public confidence will require greater transparency from the Greater Chennai Corporation.

The Corporation should release a consolidated report containing:

- names and designations of suspended officials;
- zones and departments involved;
- dates of suspension;
- nature of allegations;
- FIR numbers where applicable;
- status of departmental inquiries;
- contractors connected to the transactions, if formally identified;
- amounts seized or identified;
- action taken against supervisory officers;
- final disciplinary outcomes.

This would also resolve the confusion over whether the recent suspension total is 13, 14 or 15.

The Corporation must protect the rights of employees facing unproven allegations while simultaneously ensuring that serious cases are not delayed until public attention fades.

## A test of Chennai’s civic-governance system

The documents and financial trails reportedly uncovered during the DVAC inspections indicate that the case — if the allegations are established — extends beyond small quantities of cash found in office drawers.

The investigation now reportedly includes alleged contractor gifts, gold-related investments, housing-loan documents, bank deposits, digital transactions and potentially misleading explanations given during an official search.

Suspending officials may provide an immediate administrative response. Lasting reform requires stronger financial controls, transparent approvals, contractor accountability, time-bound inquiries and publication of final outcomes.

The people of Chennai interact with the Corporation for essential services including property tax, building permission, roads, sanitation, public health, waste management and civic infrastructure.

Corruption in these functions, where proved, does not merely involve financial loss. It delays public services, increases construction and infrastructure costs, rewards non-compliant contractors and places ordinary citizens under pressure to pay for services they are legally entitled to receive.

The investigation must therefore be completed transparently and without political interference.

Those against whom evidence is established must face proportionate departmental and criminal action. Those against whom allegations are not proved must also receive a timely and fair conclusion rather than remaining indefinitely under suspicion.

The real measure of the crackdown will not be the number of raids or suspensions announced. It will be the number of investigations completed, illegal assets recovered where lawfully ordered, contractors prosecuted where proved, officials lawfully removed and administrative loopholes permanently closed.

## Related reading on mychennaicity.in

- [Chennai Corporation zones: 15 vs 20 explained](${RELATED_ZONES})
- [GCC competitive tenders and civic-works savings](${RELATED_TENDERS})
- [DVAC Tamil Nadu](${DVAC_SITE})
- [Greater Chennai Corporation](${GCC_SITE})

## Legal note and disclaimers

**Presumption of innocence.** Every person named in this report — including R. Saravanan, T. Saraswathi, E. Ravivarman, Manikandan, A. Sriramulu, A. Manjith, R. Kothandan, Anandarao, Dr Devikala, Siva Porkodi, Baskar, Durga, Kannan and any other official, contractor or private person referred to in connection with these matters — is entitled to the presumption of innocence. Suspension, FIR registration, seizure of cash or documents, and media reporting of allegations are **not** convictions.

**Allegations, not findings.** Descriptions drawn from DVAC releases, FIR summaries and newspaper reports are presented as alleged facts under investigation. mychennaicity.in has not independently verified every seizure figure, bank-entry total or Google Pay amount. Primary agency records control where they differ from secondary reporting.

**No allegation against Mayor R. Priya.** Ward 74 is mentioned solely because media reports noted an administrative attachment. This article does not allege mayoral involvement, knowledge or benefit.

**Not legal advice.** This is public-interest reporting on civic administration. It is not advice to complainants, accused persons, contractors or Corporation employees. For legal rights and remedies, consult a qualified advocate and follow official notices.

**Right of reply / correction.** If any named person, their counsel, DVAC, GCC or another competent authority provides a formal clarification, denial or correction, mychennaicity.in will update this article in good faith upon verification.

**Hero image.** The accompanying photograph is a representational image of Greater Chennai Corporation civic administration themes. It is **not** a photograph of any accused person, raid scene, seized property or court proceeding.

**Sources (secondary, as reported):** Directorate of Vigilance and Anti-Corruption public materials and FIR-portal references; Greater Chennai Corporation statements as quoted by The Times of India, The New Indian Express, DT Next and India Today. Readers should consult official DVAC and GCC publications for authoritative text.`.trim();

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
      "DVAC raids shake Chennai Corporation: seven more officials suspended as financial irregularities surface",
    summary:
      "DVAC inspections at Thiru Vi Ka Nagar and Teynampet zones led to seven GCC suspensions amid alleged unexplained cash, Google Pay trails and contractor gifts. Allegations remain under investigation; suspension is not proof of guilt.",
    dek: "Unexplained bank deposits, Google Pay transactions, gold-savings documents, contractor gifts and unaccounted office cash have placed several Greater Chennai Corporation officials under investigation — all subject to due process.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    areaHubSlug: null as string | null,
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: DVAC_SITE,
    sourceName:
      "DVAC public materials / FIR portal references; GCC statements as reported by The Times of India, The New Indian Express, DT Next and India Today",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "Have the suspended officials been proved guilty?",
          answer:
            "No. Suspension is an administrative step while investigation and departmental proceedings continue. Named persons must be presumed innocent unless guilt is established through the applicable inquiry or criminal trial.",
        },
        {
          question: "How many GCC officials have been suspended?",
          answer:
            "Publicly detailed reporting identifies seven suspensions after the Zone 6 and Zone 9 inspections plus six in separate earlier cases — at least 13 named individuals. Some Corporation sources have cited 14. Claims of 15 are not confirmed by a published consolidated GCC order.",
        },
        {
          question: "Is Mayor R. Priya accused in this case?",
          answer:
            "No. Media reports noted that one engineer was attached to Ward 74, which the mayor represents. No publicly reported FIR material cited here alleges that the mayor participated in, knew about or benefited from the transactions under investigation.",
        },
        {
          question: "Does finding gold-savings documents prove illegal income?",
          answer:
            "Not by itself. Investigators must establish who paid, how much was invested, and whether funds can be linked to official decisions. Document recovery is an investigative lead, not a conviction.",
        },
        {
          question: "Do Google Pay records automatically prove corruption?",
          answer:
            "No. Digital trails can show accounts, timing and frequency, but authorities must still connect a payment to an official act, identify the payer and examine the stated purpose of the transfer.",
        },
        {
          question: "What is the difference between departmental and criminal action?",
          answer:
            "A departmental inquiry can examine service-rule violations and may lead to dismissal. A criminal case under anti-corruption law requires a higher standard of proof linking money or benefit to an official act. Outcomes of each process can differ.",
        },
        {
          question: "Is this article an official DVAC or GCC statement?",
          answer:
            "No. It is independent civic journalism based on publicly reported agency activity and media coverage. Prefer primary DVAC and GCC documents for authoritative text. Corrections will be considered if formal clarifications are provided.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-dvac-gcc] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-dvac-gcc] Inserted article:", SLUG);
  }

  console.log("[seed-dvac-gcc] Public URL:", `/chennai-local-news/${SLUG}`);
  console.log("[seed-dvac-gcc] Hero image:", HERO_IMAGE_URL);

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-dvac-gcc",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
