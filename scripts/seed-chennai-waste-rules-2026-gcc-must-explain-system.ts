/**
 * Editorial: Chennai SWM Rules 2026 — GCC must explain how the system works.
 *
 * Dev:  npm run db:seed:chennai-waste-rules-2026-gcc-must-explain-system
 * Live: npm run db:seed:chennai-waste-rules-2026-gcc-must-explain-system:live
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const HERO_IMAGE_URL =
  "/images/articles/chennai-waste-rules-2026-gcc-must-explain-hero.jpg";

const TNIE_URL =
  "https://www.newindianexpress.com/cities/chennai/2026/Jul/30/chennai-scraps-waste-collection-agencies-for-dumping-bulk-garbage-into-roadside-compactor-bins";
const GCC_SWM =
  "https://chennaicorporation.gov.in/gcc/department/solid-waste-management/";
const GCC_BWG_PORTAL = "https://gccservices.in/bulkwaste/register";
const RELATED_PAPER_TRAIL =
  "/chennai-local-news/gcc-bulk-waste-agencies-scrapped-paper-trail-chennai";
const RELATED_EMPANELMENT =
  "/chennai-local-news/chennai-bulk-waste-empanelment-two-vendors-four-zones-july-2026";
const RELATED_REGISTRATION =
  "/chennai-local-news/chennai-bulk-waste-generators-swm-rules-2026-registration-deadline";
const RELATED_BYE_LAWS =
  "/chennai-local-news/chennai-solid-waste-bye-laws-2019-swm-rules-2026-update";
const RELATED_NGT =
  "/chennai-local-news/chennai-ngt-gcc-wet-dry-waste-separate-collection-days";
const GUIDE_CHECKLIST =
  "/guides/bulk-waste-generator-readiness-checklist-2026";

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
const SLUG = "chennai-waste-rules-2026-gcc-must-explain-system";

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

  const publishedAt = new Date("2026-07-31T06:45:00.000Z");
  const now = new Date();

  const reportBody = `The Greater Chennai Corporation’s Solid Waste Management Department is intensifying enforcement against Bulk Waste Generators, changing the agencies responsible for collecting their waste and reportedly discontinuing several previously empanelled vendors.

Yet the Corporation has not presented the people of Chennai with one clear, consolidated explanation of what it has done, why it has done it and how the revised system is expected to operate.

Different public records and media reports refer to different numbers of authorised or empanelled service providers. The reported reasons for discontinuing them also vary—from inadequate performance and public complaints to alleged dumping in GCC compactor bins and the inability of vendors to demonstrate functional processing facilities.

At the same time, it remains unclear which entities are presently authorised to collect each category of waste in every GCC zone, where that waste must be taken, what processing responsibility rests with collectors and what documentary proof must be given to Bulk Waste Generators.

These are not minor administrative details.

They determine whether hotels, restaurants, hospitals, malls, educational institutions, IT parks, apartment communities and other Bulk Waste Generators can comply with the Solid Waste Management Rules, 2026. They also determine whether smaller waste-management enterprises are given a fair opportunity to participate or gradually excluded from the system because they cannot independently acquire expensive land and establish processing plants within Chennai.

GCC’s Solid Waste Management Department must now put its house in order—not merely by enforcing the rules against generators and vendors, but by clearly publishing the rules, responsibilities, orders, authorised service channels and supporting infrastructure through which compliance is expected to happen.

## Enforcement has increased, but clarity has not kept pace

The Solid Waste Management Rules, 2026 came into force on April 1, 2026, replacing the earlier national rules of 2016. The new framework mandates segregation at source into four streams: wet waste, dry waste, sanitary waste and special-care waste. It also places defined responsibilities on Bulk Waste Generators and provides for online monitoring of waste collection, transportation, processing and disposal.

GCC has consequently directed Bulk Waste Generators to register online and has warned of penalties for non-compliance. A July 2026 report said GCC had identified 3,203 Bulk Waste Generators, of which 1,944 had registered at that stage.

Registration and enforcement are necessary. Major commercial and institutional generators cannot be allowed to mix large quantities of waste and place them in bins meant for ordinary municipal collection.

But effective enforcement requires more than directing generators to comply.

A Bulk Waste Generator must know:

- who is legally authorised to collect each waste stream;
- whether the collector can operate in its zone;
- where the waste will be processed;
- what document will prove collection and processing;
- whether wet waste must be processed on-site;
- what alternative applies when on-site processing is impractical;
- who bears the cost;
- and which authority will resolve disputes.

At present, these answers are not available in one clear, publicly accessible GCC document.

The Corporation cannot reasonably demand perfect compliance from establishments while leaving the implementation pathway fragmented across press reports, old vendor lists, portal notices, concessionaire arrangements and regulatory provisions.

## What exactly happened to the empanelled vendors?

A July 30 report in [*The New Indian Express*](${TNIE_URL}) quoted a senior GCC official as saying that nearly 17 to 18 empanelled agencies had earlier been engaged to collect and process waste from Bulk Waste Generators, but their empanelment was cancelled after many were allegedly found depositing the waste in GCC compactor bins rather than processing it.

The same official reportedly stated that, when questioned, most of the agencies could not demonstrate functional processing units. One agency associated with the Chetpet Bio-CNG plant was identified as an exception.

According to the report, Ramky and Urbaser were subsequently entrusted with collecting and scientifically processing dry waste, sanitary waste and special-care waste from Bulk Waste Generators.

These are serious official claims. But they have not yet been accompanied in the public domain by a consolidated agency-wise record showing:

- which vendors were affected;
- whether each vendor was cancelled, suspended or not renewed;
- the date and number of each order;
- the zones and waste categories concerned;
- the inspection findings;
- the processing facility declared by each vendor;
- the alleged compactor-bin dumping incidents;
- show-cause notices and replies;
- penalties or recoveries;
- and the effective replacement arrangement.

Public disclosure is important both for accountability and fairness.

If a vendor was found violating its conditions, GCC should disclose the basis of that finding through a reasoned administrative process. If another vendor’s permission simply expired, that should not be presented as though the vendor had necessarily committed a violation. If the entire empanelment model was discontinued as part of a policy change, GCC should say so clearly.

Until these categories are separated, all previously empanelled vendors risk being placed under the same general cloud of suspicion.

Related reporting on this site: [GCC bulk-waste agencies — reported cancellations and the public paper trail](${RELATED_PAPER_TRAIL}).

## Even the NGT sought clarity on responsibilities

The uncertainty is not confined to public discussion.

In June 2026, the Southern Bench of the National Green Tribunal reportedly observed that GCC’s report was unclear about the roles and responsibilities of the private entities involved, the manner in which end-to-end accountability was being ensured and the timeline for addressing legacy waste.

The Tribunal also stressed the importance of strict source segregation and asked GCC to consider collecting wet and dry waste on different days.

That observation goes to the centre of Chennai’s waste-management problem.

The city does not merely need organisations that collect waste. It needs a system in which responsibility can be traced from the point of generation to the point of processing and final disposal.

For every load, the system should be capable of establishing:

**Bulk Waste Generator → authorised collector → registered vehicle → verified destination → authorised processing facility → material recovered → processing rejects → lawful final disposal.**

Without this end-to-end chain, changing the name of the contractor may not change the environmental outcome.

Background: [NGT direction on wet and dry waste collection days](${RELATED_NGT}).

## Requiring processing capacity is reasonable—but what does GCC mean by it?

GCC officials are right to ask where collected waste is ultimately processed.

A vendor should not be permitted to collect segregated waste, charge a generator for responsible handling and then deposit the material in a public bin or send it to an unauthorised destination.

But GCC must define precisely what it expects when it asks a vendor to demonstrate a “functional processing unit.”

Does the vendor have to own the facility?

Can it lease a facility?

Can several vendors jointly use a common processing centre?

Can the vendor maintain a legally enforceable agreement with an independently authorised processor?

Will a long-term capacity-allocation agreement be accepted?

Must the facility be located inside GCC limits?

Can it be situated elsewhere in the Chennai Metropolitan Area or in a nearby district, provided transportation and processing are lawful?

What TNPCB permissions must be produced?

What minimum capacity must be reserved?

How will GCC compare the vendor’s collected tonnage against the quantity actually received and processed?

These questions must be answered through published eligibility criteria rather than oral directions given separately to individual vendors.

A requirement that every collector must independently own land and operate a processing plant within Chennai would have major competition and policy consequences. Land within the city is expensive, scarce and difficult to secure for waste-management activity. Such a condition could effectively restrict participation to large companies with substantial capital and access to infrastructure.

That does not automatically mean that GCC is deliberately favouring large companies. No such conclusion should be drawn without evidence.

But unless the eligibility conditions, land requirements and processing alternatives are publicly defined, the implementation may produce a field that is structurally easier for major concessionaires to enter and much harder for smaller specialist operators to survive.

## Collection and processing are different functions

A critical policy distinction must also be maintained between collecting waste and processing it.

Some enterprises may be capable of:

- conducting source-segregation programmes;
- collecting particular waste streams;
- operating specialised vehicles;
- tracking pickups digitally;
- aggregating material;
- conducting preliminary sorting;
- and delivering waste to an authorised processor.

Another enterprise may specialise in:

- composting;
- biomethanation;
- material recovery;
- recycling;
- refuse-derived fuel;
- treatment of sanitary waste;
- or processing of special-care waste.

There is no inherent reason why every collection operator must necessarily own every processing facility, provided the system establishes clear contractual responsibility, authorised destinations, traceability and guaranteed processing capacity.

Vertical integration may offer operational advantages, but it must not be treated as the only possible model without a published policy assessment.

A city as large as Chennai may benefit from a diverse ecosystem consisting of:

- specialised collectors;
- decentralised composters;
- biomethanation operators;
- dry-waste aggregators;
- material-recovery facilities;
- recyclers;
- digital traceability providers;
- social enterprises;
- resident-led initiatives;
- and larger concessionaires.

The purpose of regulation should be to ensure environmental performance—not merely to reduce the number of participants.

## Smaller vendors should be regulated, not automatically pushed out

Chennai’s waste problem is too large to be solved by a handful of companies alone.

Smaller waste-management enterprises may possess local knowledge, relationships with generators, experience in particular neighbourhoods and expertise in specific waste streams. Some may also be willing to invest in collection, sorting and processing if the city provides a predictable regulatory pathway.

They must, of course, satisfy strict standards.

A vendor that cannot demonstrate a lawful destination, maintain collection records, segregate waste or account for its tonnage should not be allowed to operate merely because it is a small business.

But the answer to weak compliance should be to improve verification, common infrastructure, training, digital tracking and performance monitoring—not to design a system in which only enterprises capable of purchasing urban land can participate.

GCC could develop graded categories such as:

1. **Collection-only service providers**, permitted to transport specified waste streams to approved facilities under documented agreements.
2. **Collection-and-processing operators**, possessing their own authorised facilities.
3. **Specialist waste-stream operators**, handling dry, sanitary, horticultural or special-care waste.
4. **Common-facility participants**, using processing infrastructure allotted or facilitated by the government.
5. **Zone-level decentralised operators**, working within defined tonnage and geographical limits.

Each category could have separate financial, technical, environmental and reporting requirements.

This would create a regulated market based on capability and accountability rather than a single capital-intensive entry condition.

## Government must address the land question

The Solid Waste Management Rules, 2026 do not treat land availability as a problem to be left entirely to individual vendors.

The Union government’s explanation of the new rules specifically refers to provisions intended to facilitate faster land allocation for waste-processing facilities. The framework introduces graded criteria for facilities and buffer zones, with the stated intention of helping states and Union Territories accelerate the allocation of land for processing infrastructure.

This is an important policy signal.

If GCC and the Tamil Nadu government expect decentralised scientific processing, they must help create the physical conditions necessary for it.

Instead of asking every interested vendor to independently acquire expensive land in Chennai, the government could consider:

- identifying suitable processing clusters;
- allocating land through transparent tenders;
- establishing common composting and biomethanation facilities;
- developing shared material-recovery centres;
- offering capacity to qualified vendors on a user-fee basis;
- facilitating access to TNPCB-compliant infrastructure;
- allowing consortium and cooperative models;
- supporting technology upgrades;
- and publishing long-term waste-flow projections.

Such facilities must be properly located, environmentally assessed, monitored and protected by appropriate buffer requirements. Land facilitation should not mean compromising environmental safeguards or imposing waste facilities unfairly on vulnerable communities.

But without planned land and infrastructure, the system risks demanding processing performance while withholding the basic conditions necessary to deliver it.

## Chennai’s revised bye-laws are still awaited

Another important source of uncertainty is the status of GCC’s local solid-waste bye-laws.

The Corporation’s existing framework was developed under the Solid Waste Management Rules, 2016. The national rules have now been replaced by the Solid Waste Management Rules, 2026, which introduce four-stream segregation, updated Bulk Waste Generator responsibilities, online traceability and other revised mechanisms.

Under Rule 39 of the 2026 framework, urban local bodies are required to frame bye-laws incorporating the new rules by **March 31, 2027**.

Therefore, as of July 31, 2026, GCC is still within the legally provided transition period. It would be inaccurate to say that the Corporation has already violated the final deadline merely because revised bye-laws have not yet been published.

However, the existence of a future deadline does not justify present-day confusion.

The new national rules have been in force since April 1, 2026. GCC is already demanding registration and compliance from Bulk Waste Generators. It is changing collection arrangements and assigning responsibilities for newly defined waste streams.

The Corporation should therefore publish an interim implementation circular immediately, even while the comprehensive revised bye-laws are being prepared.

That circular should explain:

- which parts of the existing GCC bye-laws remain operational;
- which provisions have been superseded by the 2026 rules;
- the four-stream segregation requirements;
- the current definition of a Bulk Waste Generator;
- Extended Bulk Waste Generator Responsibility;
- current registration procedures;
- waste-stream-specific collection arrangements;
- authorised processing destinations;
- environmental-compensation provisions;
- documentation and record-keeping requirements;
- grievance and appeal procedures;
- and the proposed timetable for publishing the revised bye-laws.

It should also place the draft revised bye-laws in the public domain for consultation before finalisation.

A city-wide regulatory framework should not emerge solely through internal instructions, oral communications or scattered newspaper reports.

Background: [Chennai solid-waste bye-laws 2019 vs SWM Rules 2026](${RELATED_BYE_LAWS}).

## GCC must explain the role of the major concessionaires

Reports indicate that bulk-waste responsibilities are increasingly being integrated into the work of Chennai’s major zonal concessionaires.

A January 2026 report said GCC planned to add bulk-waste collection to private-contractor arrangements and quoted an official as saying earlier empanelled vendors had not performed properly. It also recorded residents’ concern that mere transportation would not be enough unless segregation and processing were ensured.

The question is not whether Ramky, Urbaser or another concessionaire should be excluded. Large concessionaires may possess the fleet, workforce, systems and financial capacity required for city-scale operations.

The question is whether their responsibilities are transparent and measurable.

GCC should publish:

- the zones assigned to each concessionaire;
- the relevant contract or work-order provisions;
- waste streams covered;
- processing facilities used;
- permitted capacities;
- collection charges;
- payment mechanisms;
- diversion targets;
- recycling and recovery obligations;
- reject quantities;
- landfill quantities;
- performance indicators;
- inspection systems;
- penalties;
- and monthly results.

A concessionaire should not be considered compliant merely because it collects waste from the generator’s premises.

The scientific-processing claim must be tested against actual destinations and outcomes.

Related: [Who collects bulk waste in Chennai? Two providers, four zones](${RELATED_EMPANELMENT}).

## GCC also needs to clarify responsibility for wet waste

The current discussion has largely focused on dry, sanitary and special-care waste. But wet waste is one of the most difficult streams for Bulk Waste Generators to manage.

Large hotels, marriage halls, restaurants, markets, hospitals, apartment communities, campuses and institutions can generate significant quantities of biodegradable waste.

The preferred approach is often on-site composting or biomethanation. But not every property has sufficient space, appropriate infrastructure or practical conditions to process all of its wet waste within its premises.

GCC should consequently publish zone-wise answers to the following:

- When is on-site processing mandatory?
- What exemptions or alternatives are available?
- Which authorised facilities accept off-site wet waste?
- Who may transport it?
- Is the Chetpet Bio-CNG plant available to all qualifying generators?
- What is its operational capacity?
- What other facilities are available?
- How are contamination and rejected loads managed?
- What certificate proves that the waste was processed?
- What happens when available processing capacity is exhausted?

Without a reliable off-site pathway, some generators may continue to use public bins—not necessarily because every establishment rejects compliance, but because the legal and infrastructural route remains unclear or inaccessible.

That does not excuse illegal dumping. It demonstrates why enforcement and service planning must proceed together.

## A transparent empanelment framework is urgently required

GCC should replace the present cloudiness with a single online Bulk Waste Management transparency dashboard.

The dashboard should display, for every authorised provider:

- legal name;
- authorisation number;
- contact details;
- zones served;
- waste streams handled;
- collection or processing classification;
- declared facility;
- facility location;
- permitted capacity;
- TNPCB consent status;
- validity and expiry date;
- suspension or cancellation status;
- and a link to the relevant public order.

The portal should also permit Bulk Waste Generators to verify a vendor before entering into an agreement.

Monthly data should show:

- waste collected;
- waste received at each facility;
- waste processed;
- recovered material;
- compost or biogas output;
- rejects generated;
- waste landfilled;
- complaints received;
- inspections conducted;
- penalties imposed;
- and corrective actions completed.

This would protect responsible generators, compliant vendors, concessionaires and GCC itself.

It would also make it much harder for an unauthorised operator to collect waste and falsely represent that the material has been scientifically processed.

## A fair system does not mean a weak system

Calling for a level playing field must not be misunderstood as asking GCC to lower environmental standards.

Chennai needs stricter standards, not weaker ones.

Every vendor—small or large—should be required to demonstrate:

- legal authorisation;
- technically suitable vehicles;
- trained personnel;
- waste-stream segregation;
- digital pickup records;
- GPS-enabled transportation;
- verified processing destinations;
- facility gate receipts;
- quantity reconciliation;
- environmental compliance;
- and an auditable trail for rejects.

But standards must be clear, uniformly applied and proportionate to the role performed.

GCC should not inform one vendor that a third-party processing agreement is acceptable while telling another that it must own land. Nor should conditions be altered informally after investments have been made.

Any change in eligibility must be published prospectively, accompanied by a reasonable transition period and supported by a speaking order explaining the environmental and operational rationale.

That is how regulation creates confidence.

## Singara Chennai cannot be built through administrative fog

The ambition behind “Singara Chennai” is not merely to make major roads look clean.

A genuinely world-class city must be able to account for what happens to the waste generated by its homes, businesses, institutions and public spaces.

It must prevent overflowing bins, mixed waste, open dumping and avoidable landfilling. It must also build a circular economy in which biodegradable material, recyclables and recoverable resources are kept out of dumping grounds.

That cannot happen when the roles of generators, vendors, concessionaires, processing facilities and regulators remain unclear.

Nor can it happen if the city’s response to a weak vendor system is simply to replace a cloudy small-vendor arrangement with a cloudy large-concessionaire arrangement.

Chennai needs a visible system:

- clear rules;
- published orders;
- transparent contracts;
- mapped infrastructure;
- traceable waste;
- verifiable processing;
- fair participation;
- and measurable environmental results.

The Corporation’s Solid Waste Management Department may have valid reasons for restructuring the earlier empanelment system. It may also possess inspection reports and evidence that have not yet been released publicly.

But public confidence cannot rest indefinitely on unattributed explanations.

GCC must now publish what action it has taken, which vendors were affected, what evidence supported the decisions, how responsibilities have been reassigned and where every category of bulk waste is expected to go.

It should accelerate the preparation of the revised solid-waste bye-laws, issue interim guidance during the transition and invite meaningful public and industry consultation.

It should also examine whether common land and processing infrastructure can be provided through transparent mechanisms so that capable local enterprises are not excluded solely because they cannot purchase land within Chennai.

The city’s waste challenge requires the participation of responsible generators, communities, small operators, specialist processors and large concessionaires. The system should reward demonstrated performance—not merely size.

Chennai cannot enforce its way to cleanliness without first explaining how compliance is supposed to work.

Before the Corporation asks every generator and vendor to put their house in order, its own Solid Waste Management Department must make the rules, responsibilities and waste trail unmistakably clear.`;

  const analysisBody = `## Editorial note

This article raises policy and governance questions based on publicly reported changes to Chennai’s Bulk Waste Generator collection arrangements and the implementation of the Solid Waste Management Rules, 2026. It does not conclude that GCC deliberately favoured any company, that every discontinued vendor was compliant, or that any named entity committed wrongdoing. Claims regarding dumping, processing capacity and vendor performance remain subject to the relevant official records and responses of the affected parties.

## Related reading on mychennaicity.in

- [GCC bulk-waste agencies: reported cancellations and the public paper trail](${RELATED_PAPER_TRAIL})
- [Who collects bulk waste in Chennai? Two providers, four zones](${RELATED_EMPANELMENT})
- [Chennai bulk waste generators: registration under SWM Rules 2026](${RELATED_REGISTRATION})
- [Chennai solid-waste bye-laws 2019 vs SWM Rules 2026](${RELATED_BYE_LAWS})
- [NGT direction on wet and dry waste collection days](${RELATED_NGT})
- [BWG readiness checklist 2026](${GUIDE_CHECKLIST})
- [GCC Solid Waste Management Department](${GCC_SWM})
- [GCC bulk-waste registration portal](${GCC_BWG_PORTAL})`;

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
      "Chennai’s waste rules are changing, but GCC must tell the public how its system actually works",
    summary:
      "GCC is intensifying Bulk Waste Generator enforcement and changing collection agencies under the Solid Waste Management Rules, 2026 — but Chennai still lacks one clear public account of authorised collectors, processing duties, wet-waste pathways and vendor decisions.",
    dek: "Cloudy vendor records, unclear processing responsibilities and the absence of updated public guidance risk creating an uneven playing field in the implementation of the Solid Waste Management Rules, 2026.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    areaHubSlug: null as string | null,
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: TNIE_URL,
    sourceName:
      "The New Indian Express (30 July 2026); Greater Chennai Corporation Solid Waste Management materials; Solid Waste Management Rules, 2026; National Green Tribunal Southern Bench observations as reported",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question:
            "Have the Solid Waste Management Rules, 2026 already come into force?",
          answer:
            "Yes. The national Solid Waste Management Rules, 2026 came into force on 1 April 2026, replacing the 2016 rules. They require four-stream segregation and place defined duties on Bulk Waste Generators.",
        },
        {
          question:
            "Has Greater Chennai Corporation missed the deadline to revise its solid-waste bye-laws?",
          answer:
            "No. Rule 39 of the 2026 framework requires urban local bodies to frame updated bye-laws by 31 March 2027. As of 31 July 2026, GCC is still inside that transition period. That does not remove the need for interim public guidance while enforcement continues.",
        },
        {
          question:
            "What did media reports say about empanelled bulk-waste vendors?",
          answer:
            "A 30 July 2026 New Indian Express report quoted a senior GCC official as saying nearly 17–18 empanelled agencies were cancelled after alleged dumping in GCC compactor bins, and that Ramky and Urbaser were later entrusted with dry, sanitary and special-care streams. Agency-wise public orders were not consolidated in the public domain reviewed for related mychennaicity reporting.",
        },
        {
          question:
            "Does this article say GCC deliberately favoured large companies?",
          answer:
            "No. It argues that unpublished eligibility and land conditions may produce a structurally uneven field, and that no conclusion of deliberate favouritism should be drawn without evidence.",
        },
        {
          question:
            "Must every waste collector own a processing plant inside Chennai?",
          answer:
            "That is precisely one of the unanswered public questions. This editorial asks GCC to publish whether ownership, leasing, common facilities, third-party processing agreements and locations outside GCC limits are acceptable — through written eligibility criteria, not oral directions.",
        },
        {
          question: "What should Bulk Waste Generators know before they can comply?",
          answer:
            "Who is authorised for each waste stream in their zone; where waste must go; what proof of collection and processing is required; whether wet waste must be processed on-site; what alternative applies when on-site processing is impractical; who bears the cost; and which authority resolves disputes.",
        },
        {
          question: "Is this an official GCC statement?",
          answer:
            "No. It is an independent editorial on policy and governance. Prefer primary GCC orders, notices and bye-laws for authoritative text. Formal clarifications will be considered for updates.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-chennai-waste-rules-clarity] Refreshed:", SLUG);
  } else {
    await db.insert(articles).values({ ...values, createdAt: now });
    console.log("[seed-chennai-waste-rules-clarity] Inserted:", SLUG);
  }

  console.log(
    "[seed-chennai-waste-rules-clarity] Public URL:",
    `https://mychennaicity.in/chennai-local-news/${SLUG}`,
  );

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-chennai-waste-rules-clarity",
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
