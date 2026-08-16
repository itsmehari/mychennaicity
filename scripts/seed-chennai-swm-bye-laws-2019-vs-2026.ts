/**
 * Chennai Solid Waste Bye-Laws 2019 vs SWM Rules 2026 — alignment gap.
 *
 * Dev:  `npm run db:seed:chennai-swm-bye-laws-2019-vs-2026`
 * Live: `npm run db:seed:chennai-swm-bye-laws-2019-vs-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const HERO_IMAGE_URL =
  "/images/articles/chennai-swm-bye-laws-2019-vs-2026-hero.jpg";

const GCC_SITE = "https://chennaicorporation.gov.in/";
const GCC_PORTAL = "https://gccservices.in/bulkwaste/register";
const RELATED_BWG_REGISTRATION =
  "/chennai-local-news/chennai-bulk-waste-generators-swm-rules-2026-registration-deadline";
const RELATED_EMPANELMENT =
  "/chennai-local-news/chennai-bulk-waste-empanelment-two-vendors-four-zones-july-2026";
const RELATED_NGT_COLLECTION =
  "/chennai-local-news/chennai-ngt-gcc-wet-dry-waste-separate-collection-days";

/** Statutory ULB bye-law framing deadline under SWM Rules 2026 Rule 39 (IST end of day). */
const BYE_LAW_DEADLINE_ENDS_AT = "2027-03-31T18:29:59.000Z";

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

const SLUG = "chennai-solid-waste-bye-laws-2019-swm-rules-2026-update";

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

  const publishedAt = new Date("2026-07-20T05:30:00.000Z");
  const now = new Date();

  const reportBody = `## Key takeaways

- Greater Chennai Corporation’s operative local framework is the **Corporation of Chennai Solid Waste Management Bye-Laws, 2019**, sanctioned by the Tamil Nadu government on **10 January 2020** — not the earlier “Draft Solid Waste Management Bye-Laws, 2016.”
- Those bye-laws were expressly framed on the **Solid Waste Management Rules, 2016**, which the Union government superseded from **1 April 2026**.
- Rule 39 of the **Solid Waste Management Rules, 2026** requires every urban local body to frame bye-laws incorporating the new provisions by **31 March 2027**. GCC is still inside that transition window.
- Material gaps remain: **four-stream** segregation, a wider **Bulk Waste Generator** test, **EBWGR** certificates, special-care waste centres, portal registration and geo-tagging, and a clearer split between municipal fines and **environmental compensation**.
- Until amended bye-laws are notified, Chennai needs an **interim public order** stating which 2019 provisions still apply and how new 2026 duties are being administered.

## Disclaimer

This article is **civic journalism and public-interest analysis**, not legal advice, not a substitute for reading the Gazette notification or sanctioned bye-laws, and not an official GCC or Tamil Nadu government circular.

Readers — including households, apartment associations, Bulk Waste Generators, vendors and contractors — should verify current obligations from primary sources: the Solid Waste Management Rules, 2026; any GCC circular, council resolution or interim order; sanctioned municipal bye-laws; and directions from the Municipal Administration and Water Supply Department, CPCB or TNPCB. Where a zonal notice, portal instruction or state order differs from this summary, the official text prevails.

Nothing here alleges wrongdoing by Greater Chennai Corporation, the state government, concessionaires, recyclers or any named establishment. Dates, thresholds and procedures may change when amended bye-laws or fresh notifications are issued.

## Summary

**Chennai, July 2026** — The Greater Chennai Corporation’s current Solid Waste Management Bye-Laws were framed in 2019 and sanctioned by the Tamil Nadu government in January 2020. They repeatedly rely on the now-superseded Solid Waste Management Rules, 2016.

The new national Rules give urban local bodies until **31 March 2027** to frame bye-laws incorporating the revised provisions — but Chennai cannot wait until the deadline to clarify enforcement, user fees and Bulk Waste Generator obligations.

GCC has begun implementing the Solid Waste Management Rules, 2026 through registration drives, segregation directions and enforcement measures. Yet the principal local regulatory document available for Chennai — the Corporation of Chennai Solid Waste Management Bye-Laws, 2019 — continues to be built around the earlier 2016 Rules.

This creates a critical question:

**Can Chennai enforce the substantially revised 2026 framework using municipal bye-laws that still define obligations, waste streams, Bulk Waste Generators, penalties and collection systems through the language of the superseded 2016 Rules?**

The legal position requires care.

The 2019 bye-laws do not automatically disappear merely because the Union government has replaced the 2016 Rules. They may continue to operate to the extent that they are not inconsistent with the new national Rules. However, the Solid Waste Management Rules, 2026 expressly require every urban local body to frame bye-laws incorporating the new provisions by 31 March 2027.

Greater Chennai Corporation has therefore not yet crossed the statutory deadline. But this does not eliminate the immediate need for amendments, interim orders and clear public guidance.

## Chennai’s final bye-laws were framed in 2019, not 2016

One document hosted by GCC is titled “Draft Solid Waste Management Bye-Laws, 2016.” Its opening page says the draft was framed to implement the Solid Waste Management Rules, 2016 and under Section 349 of the Chennai City Municipal Corporation Act, 1919.

That draft should not be confused with the final sanctioned bye-laws.

The final local framework is the **Corporation of Chennai Solid Waste Management Bye-Laws, 2019**.

The Tamil Nadu Municipal Administration and Water Supply Department sanctioned these bye-laws through **G.O. (2D) No. 9** dated **10 January 2020**. The order records that:

- the Greater Chennai Corporation Commissioner forwarded the proposal on **21 October 2019**;
- the Special Officer-Council approved it through **Resolution No. 740/2019** dated **20 November 2019**;
- the state government sanctioned the Solid Waste Management Bye-Laws, 2019 under the Chennai City Municipal Corporation Act, 1919;
- the bye-laws were expressly framed based on the Solid Waste Management Rules, 2016.

The accurate description is therefore:

Chennai’s operative local solid-waste bye-laws were framed in **2019** and sanctioned by the Tamil Nadu government on **10 January 2020**, based on the national Solid Waste Management Rules, 2016.

They should not simply be described as “2016 bye-laws,” although an earlier draft carried that title.

## The national legal foundation changed on 1 April 2026

The Union Ministry of Environment, Forest and Climate Change notified the Solid Waste Management Rules, 2026 through **S.O. 388(E)** dated **27 January 2026**. The notification was published in the Gazette on **28 January** and came into force on **1 April 2026**. It expressly superseded the Solid Waste Management Rules, 2016, while protecting actions already taken or omitted under the earlier framework.

The new Rules are not a minor amendment.

They introduce or expand several regulatory components, including:

- four-stream segregation;
- a wider definition of Bulk Waste Generator;
- Extended Bulk Waste Generator Responsibility;
- compulsory online registration and reporting;
- geo-tagging and digital monitoring;
- special-care waste collection centres;
- environmental compensation;
- updated user-fee mechanisms;
- revised obligations for local bodies, processors and concessionaires;
- annual reporting on the implementation of municipal bye-laws.

The 2019 Chennai bye-laws were not designed around these provisions.

## The 2026 Rules directly require new local bye-laws

Rule 39 of the Solid Waste Management Rules, 2026 sets out the duties of urban local bodies.

It states:

> “All Urban Local bodies shall frame by-laws incorporating the provisions of these rules by 31st March 2027.”

This is a direct statutory obligation, not merely a recommendation.

The deadline means GCC has a transition period extending until 31 March 2027. Therefore, it would be inaccurate to report in July 2026 that GCC has already violated the deadline for revising its bye-laws.

The defensible finding is different:

**GCC is presently operating within the transition period, but its existing 2019 bye-laws do not fully reflect the new national framework.** Until amendments are notified, Chennai requires clear interim directions identifying which provisions of the old bye-laws remain applicable and how new obligations under the 2026 Rules will be administered.

## Where the 2019 Chennai bye-laws no longer align with the new Rules

A comparison of the two frameworks shows several material differences.

### 1. Three-stream segregation versus four-stream segregation

The 2019 Chennai bye-laws require waste generators to segregate waste into:

- biodegradable waste;
- non-biodegradable waste;
- domestic hazardous waste.

They also place wrapped sanitary waste in the dry or non-biodegradable waste stream.

The 2026 Rules require four distinct streams:

- wet waste;
- dry waste;
- sanitary waste;
- special-care waste.

This is not merely a change in terminology.

Under the new system, sanitary waste is no longer treated simply as part of dry waste. Special-care waste — including materials such as discarded paint containers, bulbs, mercury thermometers and expired medicines — must also be separately managed through authorised agencies or designated collection centres.

Chennai’s local bye-laws must therefore be amended to specify:

- four-stream storage requirements;
- bin or container standards;
- collection frequency;
- authorised collection channels;
- treatment and final disposal arrangements;
- penalties for mixing these streams.

### 2. The definition of Bulk Waste Generator has changed

The 2019 Chennai bye-laws define a Bulk Waste Generator largely through a single criterion: an average waste-generation rate exceeding **100 kilograms per day**.

The 2026 Rules use three alternative thresholds. An establishment can qualify as a Bulk Waste Generator if it meets at least one of the following:

- building floor area of **20,000 square metres** or more;
- water consumption of **40,000 litres per day** or more;
- solid-waste generation of **100 kilograms per day** or more.

This substantially broadens the classification.

An institution may now become a BWG based on its size or water consumption even where its measured daily waste has not been established at more than 100 kilograms.

Unless GCC revises its local framework, an establishment reading only the 2019 bye-laws could misunderstand whether it falls within the new category.

### 3. The old bye-laws expressly define “Rule” as the 2016 Rules

The 2019 Chennai bye-laws contain a definition stating that “Rule” means the Solid Waste Management Rules, 2016.

That national framework has now been superseded.

This reference requires formal correction. Otherwise, multiple clauses in the local bye-laws remain textually linked to a set of central Rules that is no longer the current governing framework.

### 4. No local framework yet for Extended Bulk Waste Generator Responsibility

The 2026 Rules introduce Extended Bulk Waste Generator Responsibility, or EBWGR.

BWGs must ensure environmentally sound collection, transportation and processing. Where on-site wet-waste processing is not feasible, the new system provides for an EBWGR certificate mechanism.

The Rules require urban local bodies to:

- issue EBWGR certificates covering total solid waste;
- notify the certificate cost;
- include the cost in the bye-laws or another appropriate local regulation;
- obtain approval from the state or Union territory government;
- base the fee on norms issued by CPCB in consultation with the Union ministry.

The Chennai bye-laws contain no EBWGR certificate framework because the concept did not exist in the 2016 Rules on which they were based.

This is one of the clearest areas requiring a fresh local regulation.

### 5. User fees require a new basis

The old Chennai bye-laws provide for user fees and include schedules relating to waste generators and local services. They were structured around the costs and responsibilities existing under the earlier system.

Under the 2026 Rules, user fees remain payable according to local-body bye-laws. The Rules also require local bodies to notify the cost of EBWGR certificates and suitable fines.

GCC therefore needs to clarify:

- whether the existing user-fee schedule remains operative;
- whether new concessionaire or collection charges are being imposed;
- whether BWGs must pay both user fees and an EBWGR certificate cost;
- how fees will be calculated;
- who is authorised to collect them;
- what receipts and compliance certificates must be issued.

Enforcement without an updated and publicly accessible fee framework could produce inconsistent charges and disputes.

### 6. Special-care waste centres are absent from the old framework

The 2026 Rules require urban local bodies, directly or through third parties, to provide special-care waste collection services.

They also require deposition centres to be established so that one centre serves an area of **five square kilometres** or part thereof. The local body must notify the operating hours and direct waste generators to deposit special-care waste at these centres.

The old Chennai bye-laws refer to domestic hazardous waste but do not establish this new special-care waste network.

GCC must publish:

- centre locations;
- zone and ward coverage;
- operating days and timings;
- accepted waste categories;
- collection-agency details;
- transport and disposal procedures.

### 7. Online registration, geo-tagging and digital reporting are new duties

The 2026 Rules establish a centralised online portal covering registration, collection, transportation, processing, disposal and reporting.

Urban local bodies must identify BWGs through detailed surveys, geo-tag them and update the list annually by **1 April**. They must also report waste generation and collection through the central portal.

The 2019 bye-laws were built around physical municipal administration, authorised collectors and conventional local records.

They do not provide a complete legal framework for:

- compulsory portal registration;
- geo-tagging;
- digital returns;
- online authorisation;
- audit uploads;
- monthly data disclosure;
- consequences of false online reporting.

### 8. Environmental compensation is different from municipal fines

The 2019 bye-laws provide for local fines and spot penalties.

The 2026 Rules retain municipal fines but also introduce environmental compensation under the Polluter Pays principle for violations including:

- operating without registration;
- false reporting;
- forged documents;
- improper solid-waste management.

Environmental compensation is to be guided by CPCB and levied by the State Pollution Control Board or Pollution Control Committee.

GCC’s revised bye-laws should clearly distinguish between:

- municipal spot fines;
- user fees;
- service charges;
- EBWGR certificate costs;
- environmental compensation levied by TNPCB;
- prosecution or closure action under other laws.

Without this distinction, businesses and residential communities may not understand which authority is imposing a particular liability or what appeal mechanism applies.`.trim();

  const analysisBody = `## Can the 2019 bye-laws continue until 31 March 2027?

Broadly, yes — but only as a transitional local framework and only to the extent that their provisions are compatible with the 2026 Rules.

The new national Rules have superior force within the regulatory structure created under the Environment (Protection) Act, 1986. A local bye-law cannot override or dilute a binding obligation contained in the central Rules.

Accordingly:

- an old provision that remains compatible may continue to operate;
- a new duty in the 2026 Rules applies even if it has not yet been copied into the local bye-laws;
- an old provision that directly conflicts with the 2026 Rules cannot be relied upon to defeat the national requirement;
- local fines, user fees and implementation details requiring a bye-law or local notification need an updated legal basis.

The strongest example is segregation.

GCC cannot continue demanding only three-stream segregation merely because the 2019 bye-laws use that structure. The four-stream requirement now arises directly from the 2026 Rules.

But GCC must still amend the bye-laws to specify how that four-stream system will work locally.

## The deadline is 31 March 2027 — but the transition cannot remain silent

The Union government has given urban local bodies until 31 March 2027 to frame bye-laws incorporating the new Rules.

This means GCC has approximately one year from the commencement of the Rules to complete the exercise.

However, the implementation of the new Rules began on 1 April 2026. Registration, collection, segregation and enforcement cannot be placed on hold until March 2027.

GCC should therefore publish an interim implementation order immediately, followed by draft amended bye-laws for public consultation.

The interim document should identify:

- provisions of the 2019 bye-laws that remain in force;
- provisions displaced by the 2026 Rules;
- new requirements already applicable;
- competent officers for registration and enforcement;
- current penalty provisions;
- authorised collection arrangements;
- BWG obligations;
- interim user-fee arrangements;
- appeal and grievance procedures.

## Public consultation should not be treated as a formality

Solid-waste bye-laws directly affect:

- individual households;
- apartment associations;
- gated communities;
- street vendors;
- restaurants and hotels;
- hospitals;
- schools and colleges;
- markets;
- IT parks;
- malls;
- industries;
- waste pickers;
- recyclers;
- collection contractors;
- waste-processing companies.

The 2019 bye-laws were approved through a municipal resolution and subsequently sanctioned by the state government. The new bye-laws will require a similar legally valid process under the applicable municipal law.

Before finalisation, GCC should release:

- a draft text;
- a comparison showing changes from the 2019 bye-laws;
- a statement explaining the reason for each major amendment;
- proposed user-fee and fine schedules;
- a zone-wise collection responsibility matrix;
- a public notice inviting objections and suggestions;
- details of stakeholder consultations;
- the final council resolution and government sanction.

## Questions GCC and the Tamil Nadu government should answer

Greater Chennai Corporation and the Municipal Administration and Water Supply Department should clarify:

1. Has work begun on replacing or amending the 2019 bye-laws?
2. Which department or committee is drafting the revised document?
3. What is the proposed timeline for public consultation?
4. Will the draft be placed before the elected Corporation Council?
5. Which provisions of the 2019 bye-laws are presently considered inconsistent with the 2026 Rules?
6. What is the interim legal basis for four-stream segregation?
7. What penalties can currently be imposed on BWGs?
8. Has the EBWGR certificate cost been calculated?
9. Has state-government approval been sought for that cost?
10. Will existing user-fee schedules be revised?
11. When will special-care waste deposition centres be established?
12. How will sanitary waste be collected separately?
13. When will the updated list of authorised collectors, processors and recyclers be published?
14. How will GCC prevent overlapping charges by the Corporation, concessionaires and private providers?
15. What appeal procedure is available against classification as a BWG or imposition of a fine?

## Updating the bye-laws is not a clerical exercise

The required revision cannot be completed by simply replacing “2016” with “2026” in the title and definitions.

The new national framework changes the structure of municipal solid-waste regulation.

The revised Chennai bye-laws must deal with:

- four-stream segregation;
- expanded BWG thresholds;
- digital registration;
- geo-tagging;
- EBWGR certificates;
- special-care waste centres;
- environmental compensation;
- revised user fees;
- portal-based reporting;
- facility audits;
- concessionaire accountability;
- authorised third-party collection;
- grievance redressal;
- updated fine schedules.

It must also reconcile these duties with Chennai’s current operational model, where collection is divided between concessionaires, GCC vehicles, authorised recyclers and other service providers.

## Chennai is within the deadline, but clarity is already overdue

Greater Chennai Corporation cannot presently be accused of missing the 31 March 2027 deadline prescribed in the Solid Waste Management Rules, 2026.

But the existence of that future deadline should not be used to justify present uncertainty.

The 2019 Chennai bye-laws were expressly framed under the Solid Waste Management Rules, 2016. They define the regulatory system through three-stream segregation, a narrower BWG test and an administrative structure that predates EBWGR certificates, centralised online tracking and special-care waste centres.

The national framework changed on 1 April 2026.

GCC must now do two things simultaneously:

1. implement the binding provisions of the 2026 Rules; and
2. complete a transparent process for revising Chennai’s local bye-laws before 31 March 2027.

Until that work is completed, GCC should publish an authoritative interim framework explaining how the new Rules interact with the existing 2019 bye-laws.

Citizens and Bulk Waste Generators should not have to compare an old municipal notification, a new 144-page Union Gazette, scattered circulars and departmental statements to understand their legal obligations.

The Rules have changed. Chennai’s local regulatory framework must now catch up.

## Related reading on mychennaicity.in

- [Chennai bulk waste generators: 15 days to register under SWM Rules 2026](${RELATED_BWG_REGISTRATION})
- [Two vendors, four zones: Chennai’s bulk-waste empanelment clarity gap](${RELATED_EMPANELMENT})
- [NGT direction on wet and dry waste collection days](${RELATED_NGT_COLLECTION})
- [Register on the GCC bulk-waste portal](${GCC_PORTAL})

## Editorial note and disclaimers

This report is based on the Solid Waste Management Rules, 2026 notified under S.O. 388(E); the Corporation of Chennai Solid Waste Management Bye-Laws, 2019; G.O. (2D) No. 9 dated 10 January 2020; and the earlier GCC draft bye-laws. The article examines the need to align Chennai’s municipal framework with the new national Rules. It does **not** state that GCC has already missed the statutory deadline, which is **31 March 2027**.

**Not legal advice.** mychennaicity.in is not a law firm. Comparisons between the 2019 bye-laws and the 2026 Rules are explanatory for Chennai readers and should not be treated as an opinion on any specific premises, penalty, fee dispute or prosecution. For compliance decisions, obtain advice from a qualified professional and follow the latest official notification applicable to your zone or establishment.

**Sources may be incomplete.** Public documents, website PDFs and Gazette text can lag behind operational practice. If GCC or the state government issues an interim order, draft bye-laws, revised fee schedule or special-care waste centre list after this article’s publication date, that later instrument controls.

**No allegation of default.** Operating inside the Union-prescribed transition period is not the same as completing local alignment. This piece argues for clearer interim public guidance; it does not accuse GCC of having violated Rule 39’s framing deadline as of July 2026.

**Countdown widget.** The on-page countdown tracks the Rule 39 ULB bye-law framing date only. It is not a registration, inspection or fine deadline for individual Bulk Waste Generators.`.trim();

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
      "Chennai’s solid waste bye-laws still reflect the 2016 framework. When will they be updated for the 2026 Rules?",
    summary:
      "GCC’s Solid Waste Management Bye-Laws, 2019 were sanctioned in January 2020 on the superseded 2016 Rules. The 2026 Rules allow ULBs until 31 March 2027 to frame new bye-laws — but Chennai already needs interim clarity on segregation, BWGs, fees and EBWGR.",
    dek: "Chennai is still inside the statutory transition window. That is not a reason to leave citizens and Bulk Waste Generators reading 2019 bye-laws against a 2026 national framework.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    areaHubSlug: null as string | null,
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: GCC_SITE,
    sourceName:
      "Solid Waste Management Rules, 2026 (S.O. 388(E)); Corporation of Chennai Solid Waste Management Bye-Laws, 2019; G.O. (2D) No. 9 dated 10 January 2020",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      countdown: {
        title: "ULB bye-law framing deadline",
        subtitle:
          "Rule 39 of the Solid Waste Management Rules, 2026 requires urban local bodies to frame bye-laws incorporating the new provisions by 31 March 2027. GCC is still within this transition period.",
        endsAt: BYE_LAW_DEADLINE_ENDS_AT,
        ctaLabel: "GCC website",
        ctaUrl: GCC_SITE,
        secondaryCtaLabel: "Bulk-waste portal",
        secondaryCtaUrl: GCC_PORTAL,
        expiredLabel:
          "The 31 March 2027 bye-law framing deadline under Rule 39 has passed. Check whether Greater Chennai Corporation and the Tamil Nadu government have notified amended Solid Waste Management bye-laws.",
        note: "This countdown tracks the statutory ULB bye-law deadline — not a registration or fine deadline for individual Bulk Waste Generators.",
      },
      items: [
        {
          question: "Are Chennai’s solid-waste bye-laws from 2016?",
          answer:
            "No. An earlier draft was titled Draft Solid Waste Management Bye-Laws, 2016, but the operative local framework is the Corporation of Chennai Solid Waste Management Bye-Laws, 2019, sanctioned by the Tamil Nadu government through G.O. (2D) No. 9 dated 10 January 2020, based on the national Solid Waste Management Rules, 2016.",
        },
        {
          question: "Has GCC already missed the deadline to update its bye-laws?",
          answer:
            "No. Rule 39 of the Solid Waste Management Rules, 2026 requires urban local bodies to frame bye-laws incorporating the new Rules by 31 March 2027. As of July 2026, Greater Chennai Corporation is still inside that transition window.",
        },
        {
          question: "Do the 2019 bye-laws stop applying because the 2016 Rules were superseded?",
          answer:
            "Not automatically. Compatible provisions may continue as a transitional local framework. But a local bye-law cannot override a binding duty in the 2026 Rules, and conflicting old provisions cannot defeat the national requirement. New duties such as four-stream segregation apply from the Rules even before local text is rewritten.",
        },
        {
          question: "What is the biggest practical mismatch with the 2026 Rules?",
          answer:
            "Several: three-stream versus four-stream segregation; a narrower 100 kg/day BWG test versus three alternative thresholds (floor area, water use, or waste volume); no EBWGR certificate framework; no special-care waste centre network; and incomplete local language for portal registration, geo-tagging and environmental compensation.",
        },
        {
          question: "What should GCC publish before the final bye-laws are ready?",
          answer:
            "An interim implementation order identifying which 2019 provisions remain in force, which are displaced by the 2026 Rules, new duties already applicable, competent officers, current penalties, authorised collection arrangements, BWG obligations, interim user-fee arrangements, and appeal procedures — then draft amended bye-laws for public consultation.",
        },
        {
          question: "What is Extended Bulk Waste Generator Responsibility (EBWGR)?",
          answer:
            "Under the 2026 Rules, BWGs must ensure environmentally sound collection, transport and processing. Where on-site wet-waste processing is not feasible, ULBs may issue EBWGR certificates covering total solid waste, notify the certificate cost (with state approval, based on CPCB norms), and include that cost in bye-laws or another local regulation. Chennai’s 2019 bye-laws have no such framework.",
        },
        {
          question: "Is this article legal advice?",
          answer:
            "No. It is civic journalism comparing publicly available bye-laws and central Rules. Always verify obligations from the Gazette, sanctioned GCC bye-laws, zonal notices and any later official circular. For premises-specific compliance or disputes, consult a qualified professional.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-swm-bye-laws] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-swm-bye-laws] Inserted article:", SLUG);
  }

  console.log("[seed-swm-bye-laws] Public URL:", `/chennai-local-news/${SLUG}`);
  console.log("[seed-swm-bye-laws] Hero image:", HERO_IMAGE_URL);
  console.log("[seed-swm-bye-laws] Bye-law deadline:", BYE_LAW_DEADLINE_ENDS_AT);

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-swm-bye-laws",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
