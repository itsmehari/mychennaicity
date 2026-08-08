/**
 * Answer-first AEO block for Solid Waste Management Rules coverage.
 * Facts are drawn only from published mychennaicity.in reporting — no new claims.
 */

export const SWM_RULES_AEO_SECTION_ID = "swm-rules-aeo";

export type SwmRulesAeoFact = {
  term: string;
  definition: string;
};

export type SwmRulesRelatedLink = {
  slug: string;
  title: string;
  /** Absolute path when not a news article under /chennai-local-news/. */
  href?: string;
};

export type SwmRulesAeoContent = {
  slug: string;
  /** One direct answer AI/search systems can quote. */
  directAnswer: string;
  /** Short supporting lines (optional; keep factual). */
  contextParagraphs?: string[];
  /** Article-specific key facts. */
  facts: SwmRulesAeoFact[];
};

/** Shared series context — same on every SWM Rules article page. */
export const SWM_RULES_SERIES_INTRO =
  "The Solid Waste Management Rules, 2026 were notified by the Union Ministry of Environment, Forest and Climate Change through S.O. 388(E) dated 27 January 2026, published in the Gazette on 28 January, and came into force on 1 April 2026. They supersede the Solid Waste Management Rules, 2016.";

export const SWM_RULES_SHARED_FACTS: SwmRulesAeoFact[] = [
  {
    term: "Four waste streams",
    definition:
      "Under the 2026 Rules, generators must segregate wet (biodegradable), dry (recyclable), sanitary, and special-care waste.",
  },
  {
    term: "Bulk Waste Generator (BWG)",
    definition:
      "A premises may qualify if it has 20,000 sq m or more built-up area, uses 40,000 litres or more of water a day, or generates 100 kg or more of solid waste a day. Meeting any one threshold can be enough.",
  },
  {
    term: "Local bye-law deadline",
    definition:
      "Rule 39 requires every urban local body to frame bye-laws incorporating the new provisions by 31 March 2027. As of July 2026 reporting, Greater Chennai Corporation is still inside that transition window.",
  },
];

export const SWM_RULES_SERIES_LINKS: SwmRulesRelatedLink[] = [
  {
    slug: "bulk-waste-generator-readiness-checklist-2026",
    title: "BWG readiness checklist 2026 (interactive guide)",
    href: "/guides/bulk-waste-generator-readiness-checklist-2026",
  },
  {
    slug: "chennai-bulk-waste-generators-swm-rules-2026-registration-deadline",
    title: "Bulk waste generators: registration under SWM Rules 2026",
  },
  {
    slug: "chennai-solid-waste-bye-laws-2019-swm-rules-2026-update",
    title: "Chennai bye-laws 2019 vs SWM Rules 2026",
  },
  {
    slug: "chennai-bulk-waste-empanelment-two-vendors-four-zones-july-2026",
    title: "Bulk-waste empanelment: two vendors, four zones",
  },
  {
    slug: "gcc-bulk-waste-agencies-scrapped-paper-trail-chennai",
    title: "GCC bulk-waste agencies: reported cancellations and paper trail",
  },
  {
    slug: "chennai-waste-rules-2026-gcc-must-explain-system",
    title: "Waste rules changing: GCC must explain how the system works",
  },
  {
    slug: "chennai-ngt-gcc-wet-dry-waste-separate-collection-days",
    title: "NGT direction on wet and dry waste collection days",
  },
];

const BY_SLUG: Record<string, SwmRulesAeoContent> = {
  "chennai-bulk-waste-generators-swm-rules-2026-registration-deadline": {
    slug: "chennai-bulk-waste-generators-swm-rules-2026-registration-deadline",
    directAnswer:
      "Greater Chennai Corporation has directed bulk waste generators across all 15 zones to complete mandatory online registration — on both the GCC bulk-waste portal and the CPCB solid-waste portal — generally within 15 days of the Corporation direction or zonal notice, under the Solid Waste Management Rules, 2026.",
    contextParagraphs: [
      "Reporting cites fines of ₹5,000 to ₹25,000. In June 2026, GCC reportedly collected ₹5.95 lakh from 120 bulk waste generators. Registration alone is not full compliance: four-stream segregation, wet-waste processing and authorised collection still apply.",
    ],
    facts: [
      {
        term: "Who must register",
        definition:
          "Large apartments, IT parks, hospitals, hotels, malls, colleges, marriage halls, factories and similar premises that meet any BWG threshold.",
      },
      {
        term: "Portals",
        definition:
          "GCC: gccservices.in/bulkwaste/register · CPCB: swm.cpcb.gov.in/register",
      },
      {
        term: "Reported fine range",
        definition:
          "₹5,000 to ₹25,000 under the Solid Waste Management Rules, 2026, based on contemporaneous media coverage of GCC enforcement.",
      },
    ],
  },

  "chennai-solid-waste-bye-laws-2019-swm-rules-2026-update": {
    slug: "chennai-solid-waste-bye-laws-2019-swm-rules-2026-update",
    directAnswer:
      "Greater Chennai Corporation’s operative local framework is the Corporation of Chennai Solid Waste Management Bye-Laws, 2019, sanctioned by the Tamil Nadu government on 10 January 2020 on the basis of the now-superseded Solid Waste Management Rules, 2016. The 2026 Rules give urban local bodies until 31 March 2027 to frame updated bye-laws — so as of July 2026 reporting, GCC has not missed that statutory deadline, but its 2019 text does not fully mirror the new national framework.",
    contextParagraphs: [
      "An earlier document titled “Draft Solid Waste Management Bye-Laws, 2016” should not be confused with the final sanctioned 2019 bye-laws. Compatible 2019 provisions may continue during the transition, but they cannot override binding duties in the 2026 Rules.",
    ],
    facts: [
      {
        term: "Sanction order",
        definition:
          "G.O. (2D) No. 9 dated 10 January 2020 (Municipal Administration and Water Supply Department).",
      },
      {
        term: "Main mismatches reported",
        definition:
          "Three-stream versus four-stream segregation; a narrower 100 kg/day BWG test versus three alternative thresholds; no EBWGR certificate framework in the 2019 bye-laws.",
      },
      {
        term: "What this page is not",
        definition:
          "Not legal advice. Verify obligations from the Gazette, sanctioned bye-laws, zonal notices and later official circulars.",
      },
    ],
  },

  "chennai-bulk-waste-empanelment-two-vendors-four-zones-july-2026": {
    slug: "chennai-bulk-waste-empanelment-two-vendors-four-zones-july-2026",
    directAnswer:
      "As of this report, Greater Chennai Corporation’s public empanelment list names only two bulk-waste service providers — covering Zones 1, 2, 7 and 14 — both with the same listed expiry of 25 July 2026. Public records still do not clearly explain who is authorised to collect and process bulk waste across all 15 zones.",
    contextParagraphs: [
      "GCC’s July 2026 Additional Status Report before the NGT Southern Zone describes a different arrangement: an initial group of 14 authorised providers, later shifted toward zonal concessionaires and direct GCC collection in parts of Zones 4, 7 and 8. This article examines gaps in public information; it does not allege wrongdoing by any listed provider.",
    ],
    facts: [
      {
        term: "Listed providers (website document)",
        definition:
          "Earth Recycler Private Limited (Zones 7 and 14) and Yokesh Enterprises (Zones 1 and 2), both shown for wet and dry waste.",
      },
      {
        term: "Listed expiry",
        definition:
          "25 July 2026 on the two-provider document then published by GCC. Confirm any renewal or replacement list on the official GCC website.",
      },
      {
        term: "Four-stream gap",
        definition:
          "The 2026 Rules require wet, dry, sanitary and special-care streams; the vendor document reviewed for this report identified the two listed providers only for wet and dry waste.",
      },
    ],
  },

  "gcc-bulk-waste-agencies-scrapped-paper-trail-chennai": {
    slug: "gcc-bulk-waste-agencies-scrapped-paper-trail-chennai",
    directAnswer:
      "As of 30–31 July 2026 reporting, a senior Greater Chennai Corporation official was quoted as saying nearly 17–18 bulk-waste agencies were removed after alleged dumping of Bulk Waste Generator waste into roadside compactors. Separate public records still refer to 31, 14, two and 17–18 providers; agency-wise orders and inspection findings were not in the reviewed public domain.",
    contextParagraphs: [
      "Media coverage also said dry, sanitary and special-care collection shifted to Ramky and Urbaser. This page maps attributed claims against public-record gaps. It does not conclude that any named or unnamed agency committed an offence.",
    ],
    facts: [
      {
        term: "Attributed claim",
        definition:
          "Nearly 17–18 empanelled agencies cancelled, per a senior GCC official quoted by The New Indian Express (30 July 2026).",
      },
      {
        term: "Provider counts in public materials",
        definition:
          "31 (2024 NGT-linked status), 14 (2026 NGT-linked status), two (GCC sheet for four zones), 17–18 (July 2026 media).",
      },
      {
        term: "Still unpublished in reviewed materials",
        definition:
          "Complete agency list, order type per agency, inspection evidence, show-cause replies, and zone-wise wet-waste destination advisory.",
      },
    ],
  },

  "chennai-waste-rules-2026-gcc-must-explain-system": {
    slug: "chennai-waste-rules-2026-gcc-must-explain-system",
    directAnswer:
      "Greater Chennai Corporation is enforcing Solid Waste Management Rules, 2026 against Bulk Waste Generators and changing collection arrangements, but as of 31 July 2026 reporting it has not published one consolidated public explanation of authorised collectors by zone and waste stream, processing eligibility, wet-waste pathways, or agency-wise reasons for discontinuing earlier vendors.",
    contextParagraphs: [
      "This editorial asks for interim implementation guidance while revised bye-laws are prepared (Rule 39 deadline: 31 March 2027), a transparency dashboard for authorised providers, and graded participation models. It does not conclude that GCC deliberately favoured any company.",
    ],
    facts: [
      {
        term: "Core ask",
        definition:
          "Publish rules, responsibilities, orders, authorised service channels and supporting infrastructure so generators and vendors can comply on a level field.",
      },
      {
        term: "Bye-law transition",
        definition:
          "GCC remains inside the Rule 39 window to frame updated bye-laws by 31 March 2027, but should still issue interim public guidance while enforcement continues.",
      },
      {
        term: "What this page is not",
        definition:
          "Not a finding of wrongdoing against any vendor, concessionaire or official. Prefer primary GCC orders and notices for authoritative text.",
      },
    ],
  },

  "chennai-ngt-gcc-wet-dry-waste-separate-collection-days": {
    slug: "chennai-ngt-gcc-wet-dry-waste-separate-collection-days",
    directAnswer:
      "The National Green Tribunal Southern Bench has directed Greater Chennai Corporation to consider collecting wet waste and dry waste on different days, to support source segregation. An implementation schedule, ward list and penalties remain unconfirmed until GCC issues local instructions.",
    contextParagraphs: [
      "The direction is relevant to households, apartments, shops and bulk waste generators. It sits alongside later GCC enforcement of the Solid Waste Management Rules, 2026, which require four-stream segregation at source.",
    ],
    facts: [
      {
        term: "Authority",
        definition: "National Green Tribunal, Southern Bench.",
      },
      {
        term: "Civic body",
        definition: "Greater Chennai Corporation.",
      },
      {
        term: "Implementation status",
        definition:
          "Proposed change only until GCC publishes route-level or zone-level collection-day instructions.",
      },
    ],
  },
};

export function isSwmRulesArticleSlug(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(BY_SLUG, slug);
}

export function getSwmRulesAeoContent(
  slug: string,
): SwmRulesAeoContent | null {
  return BY_SLUG[slug] ?? null;
}

export function swmRulesRelatedLinks(
  currentSlug: string,
): SwmRulesRelatedLink[] {
  return SWM_RULES_SERIES_LINKS.filter((l) => l.slug !== currentSlug);
}
