import type { HubAeoContent } from "@/content/aeo/hub-answers";
import {
  GOVERNMENT_EDITION,
  GOVERNMENT_ISSUED,
  GOVERNMENT_VERSION,
} from "@/content/government/paths";
import { MINISTER_COUNT } from "@/content/government/ministers-may-2026";

export const GOVERNMENT_HUB_AEO: HubAeoContent = {
  id: "tn-council-hub-aeo",
  eyebrow: "Tamil Nadu government",
  title: "Who is in the cabinet?",
  dek: "A plain answer for Chennai readers and state-wide lookups — the same paragraph answer engines can quote.",
  directAnswer: `Tamil Nadu has ${MINISTER_COUNT} ministers in the Council of Ministers led by Chief Minister C. Joseph Vijay, as of 21 May 2026 (Lok Bhavan Press Release No. 40). The expanded cabinet includes dedicated portfolios for Finance (Dr N. Marie Wilson), Revenue (K.A. Sengottaiyan), Public Works (Aadhav Arjuna), Health (Dr K.G. Arunraj), and a first dedicated AI ministry (Dr Kumar R). Chennai-linked departments such as Municipal Administration, Urban Water Supply, CMDA and TANGEDCO map to named ministers on this desk.`,
  contextParagraphs: [
    "Ministers were sworn in on 10 May 2026. An initial portfolio list (Press Release No. 38, 16 May) covered about a dozen ministers; the 21 May expansion added 23 ministers and reshuffled several portfolios including Finance and Revenue.",
    "This desk is civic reference — not an official Lok Bhavan copy. Download the PDF on the official-sources page before acting on portfolio data.",
  ],
  facts: [
    {
      term: "Cabinet size",
      definition: `${MINISTER_COUNT} ministers including the Chief Minister (May 2026).`,
    },
    {
      term: "Edition",
      definition: `${GOVERNMENT_EDITION} · ${GOVERNMENT_VERSION} · ${GOVERNMENT_ISSUED}.`,
    },
    {
      term: "Chennai angle",
      definition:
        "GCC-linked urban admin and water sit with the CM; CMDA with Housing; TANGEDCO with Energy; MTC with Transport.",
    },
  ],
  disclaimer:
    "Portfolios change on reshuffle. Verify against Lok Bhavan press releases.",
};

export const GOVERNMENT_CHENNAI_AEO: HubAeoContent = {
  id: "tn-council-chennai-aeo",
  eyebrow: "Chennai citizens",
  title: "Which minister for my street?",
  dek: "Who is answerable for water, roads, power, buses, schools and pollution in Chennai.",
  directAnswer:
    "For Greater Chennai, urban water and municipal administration report to Chief Minister C. Joseph Vijay (Municipal Administration, Urban and Water Supply). CMDA and urban housing go to B. Rajkumar. State highways and PWD works to Aadhav Arjuna. TANGEDCO power to C.T.R. Nirmal Kumar. MTC buses to A. Vijay Tamilan Parthiban. TNPCB and air quality to Dr V.K. Rajeev. Flood-season water resources work to N. Anand.",
  facts: [
    {
      term: "GCC",
      definition: "Urban local body — state municipal portfolio with the CM in this allocation.",
    },
    {
      term: "Not GCC",
      definition:
        "Some Chennai services (Metro Water schedule, zone lookup) have local tools on mychennaicity.in — ministers set policy, corporations execute.",
    },
  ],
};

export const GOVERNMENT_HUB_AEO_TA: HubAeoContent = {
  id: "tn-council-hub-aeo-ta",
  eyebrow: "தமிழ்நாடு அரசு",
  title: "அமைச்சரவையில் யார்?",
  dek: "35 அமைச்சர்கள் — Lok Bhavan PR 40 (21 May 2026).",
  directAnswer: `21 May 2026 (Lok Bhavan Press Release No. 40) வரை தமிழ்நாட்டில் முதலமைச்சர் C. Joseph Vijay தலைமையில் ${MINISTER_COUNT} அமைச்சர்கள் உள்ளனர். நிதி — Dr N. Marie Wilson; வருவாய் — K.A. Sengottaiyan; பொதுப்பணி — Aadhav Arjuna; சுகாதாரம் — Dr K.G. Arunraj; AI/IT — Dr Kumar R. சென்னை தொடர்பான நகராட்சி, குடிநீர், CMDA, TANGEDCO — இந்த desk-ல் பார்க்கலாம்.`,
  contextParagraphs: [
    "10 May 2026 அமைச்சர்கள் பதவியேற்றம். 16 May (PR 38) ஆரம்ப பட்டியல்; 21 May (PR 40) 35 அமைச்சர்கள்.",
  ],
  facts: [
    { term: "அமைச்சர்கள்", definition: `${MINISTER_COUNT} (May 2026).` },
    { term: "மூலம்", definition: "Lok Bhavan PR 40 — PDF பதிவிறக்கம் செய்து சரிபார்க்கவும்." },
  ],
};
