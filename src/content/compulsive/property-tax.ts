import { compulsivePath } from "@/content/compulsive/index";

export const PROPERTY_TAX_PATH = compulsivePath("property-tax");

export type PropertyTaxCheckItem = {
  id: string;
  title: string;
  summary: string;
  whyItMatters: string;
  doNext: string;
};

/** Interactive checklist themes — verify every figure on the official GCC portal. */
export const PROPERTY_TAX_CHECKLIST: PropertyTaxCheckItem[] = [
  {
    id: "early-bird",
    title: "Early-bird / prompt-payment window",
    summary:
      "GCC often publishes a rebate or concession window for paying the half-year or annual demand early.",
    whyItMatters:
      "Missing the published cutoff means you pay the full demand even if you “meant to” pay later the same month.",
    doNext:
      "Open your assessment on the official GCC property-tax portal, note the half-year due dates and any rebate text for the current year, and set a calendar reminder a week before the cutoff. Verify the live notice — schemes change.",
  },
  {
    id: "wrong-classification",
    title: "Wrong usage / classification",
    summary:
      "Residential vs commercial (and related usage tags) drive how the property is assessed.",
    whyItMatters:
      "A home tagged as commercial — or a shop still tagged residential after a change of use — can mean over- or under-assessment relative to how the building is actually used.",
    doNext:
      "Compare the classification shown on your GCC tax extract with the actual use of each floor. If it looks wrong, gather occupancy / licence proof and ask the zone revenue / assessment desk how to file a correction. Do not assume a WhatsApp forward is the tariff rule.",
  },
  {
    id: "vacant-land",
    title: "Vacant land vs built-up mix",
    summary:
      "Vacant land, partly built plots, and fully built assessments are not interchangeable.",
    whyItMatters:
      "Paying as if the plot were fully built when a large share is vacant (or the reverse) is a common overpay / dispute pattern after renovations or phased construction.",
    doNext:
      "Check whether the portal lists vacant-land components separately. After construction or demolition, ask revenue how and when the assessment should be revised — keep approved plan / completion papers ready.",
  },
  {
    id: "name-mismatch",
    title: "Name / ownership mismatch",
    summary:
      "Spelling, initials, and outdated owner names on the assessment can block online payment and refunds.",
    whyItMatters:
      "Banks, sale deeds, and GCC extracts that disagree create repeat counter visits — and sometimes duplicate or stuck payments.",
    doNext:
      "Align the assessment name with your registered deed / legal heir documents. Use the official name-transfer / mutation path on GCC channels; keep acknowledgement numbers.",
  },
];

export const PROPERTY_TAX_OFFICIAL_NOTE =
  "Always verify demand amounts, rebate windows, classification, and payment status on the official Greater Chennai Corporation property-tax / online services portal (chennaicorporation.gov.in). Third-party sites and forwards can be outdated. This checklist is civic journalism for residents — not a tax advisor or GCC notice.";

export const PROPERTY_TAX_PORTAL_URL =
  "https://chennaicorporation.gov.in/gcc/online-civic-services/";

export const PROPERTY_TAX_FAQ = [
  {
    q: "Will this tell me the exact rupees I overpaid?",
    a: "No. It is a self-check list of common mismatch themes. Only your GCC assessment extract and receipts show real numbers.",
  },
  {
    q: "Is early-bird always available?",
    a: "Not guaranteed every cycle. Read the live portal notice for the half-year you are paying.",
  },
  {
    q: "Can mychennaicity.in change my assessment?",
    a: "No. Corrections and payments happen only through GCC revenue channels and the official portal.",
  },
];
