import type { HubAeoContent } from "@/content/aeo/hub-answers";
import type { EducationFaqItem } from "@/content/education/hse-faq";
import {
  DGE_HOME_URL,
  EDUCATION_2502_VS_2503_PATH,
  EDUCATION_2702_VS_2708_PATH,
  EDUCATION_AFTER_12TH_PATH,
  EDUCATION_CHOOSE_PATH,
  EDUCATION_COMMERCE_PATH,
  EDUCATION_COMPARE_PATH,
  EDUCATION_HUB_PATH,
  EDUCATION_SCIENCE_PATH,
  EDUCATION_TEXTBOOKS_PATH,
  EDUCATION_WORKSHEET_PATH,
  ICAI_HOME_URL,
  ICMAI_HOME_URL,
  ICSI_HOME_URL,
  NEET_NTA_URL,
  TNEA_HOME_URL,
  educationClusterPath,
  educationGroupPath,
  educationTextbookPath,
} from "@/content/education/paths";

export type EducationLink = { href: string; label: string };

export type EducationExplainer = {
  id: string;
  path: string;
  taPath?: string;
  seoTitle: string;
  seoDescription: string;
  title: string;
  dek: string;
  crumb: string;
  related: EducationLink[];
  paragraphs: string[];
  sections: { heading: string; items: string[] }[];
  officialLinks: EducationLink[];
  childLinks: EducationLink[];
  faq: EducationFaqItem[];
  faqFragment: string;
  howTo?: boolean;
  geo?: boolean;
  aeo?: HubAeoContent;
};

const groups = {
  c2502: { href: educationGroupPath("2502"), label: "Group 2502 — Maths + CS" },
  c2503: { href: educationGroupPath("2503"), label: "Group 2503 — Maths + Biology" },
  c2702: { href: educationGroupPath("2702"), label: "Group 2702 — Commerce + CA" },
  c2708: { href: educationGroupPath("2708"), label: "Group 2708 — Commerce + Business Maths" },
  c2804: { href: educationGroupPath("2804"), label: "Group 2804 — Humanities + Pol. Sci." },
  c2802: { href: educationGroupPath("2802"), label: "Group 2802 — Humanities + Comp. Apps" },
};

export const HSE_SCIENCE: EducationExplainer = {
  id: "science",
  path: EDUCATION_SCIENCE_PATH,
  taPath: educationClusterPath("science", "ta"),
  seoTitle: "TN Plus Two science groups — 2502 vs 2503",
  seoDescription:
    "Tamil Nadu Higher Secondary science desk: group 2502 (Maths + Computer Science) versus 2503 (Maths + Biology), textbooks, and after-12th doors.",
  title: "Science groups after Class 10",
  dek: "Two current DGE science codes on this desk: 2502 keeps Computer Science; 2503 keeps Biology. Both keep Physics, Chemistry and Mathematics.",
  crumb: "Science",
  geo: true,
  related: [
    { href: EDUCATION_HUB_PATH, label: "All groups" },
    { href: EDUCATION_2502_VS_2503_PATH, label: "2502 vs 2503" },
    { href: educationTextbookPath("physics"), label: "Physics books" },
  ],
  aeo: {
    id: "tn-plus-two-science-aeo",
    eyebrow: "Science desk",
    title: "Which science group?",
    dek: "A short answer you can read with a parent.",
    directAnswer:
      "Tamil Nadu science combinations on this desk are 2502 (Physics, Chemistry, Computer Science, Mathematics) and 2503 (Physics, Chemistry, Biology, Mathematics). Pick 2502 if computing and engineering-style maths matter more than Biology. Pick 2503 if you want Biology in school — the usual subject mix for medical-adjacent counselling — and you can handle the extra load. Confirm the school offers the code.",
    contextParagraphs: [
      "Both groups still write Part I language and Part II English. Eligibility for TNEA or NEET is an official-notification question each year — not a sentence on this page.",
    ],
    facts: [
      { term: "Shared cores", definition: "Physics, Chemistry, Mathematics in both 2502 and 2503." },
      { term: "The split", definition: "Computer Science (2502) versus Biology (2503)." },
    ],
    disclaimer: "Not a DGE circular. Verify the printed group code at the admitting school.",
  },
  paragraphs: [
    "Science in Higher Secondary is not one stream with a nickname. The Directorate of Government Examinations labels combinations with codes. This desk documents two current science codes that Chennai and Tamil Nadu schools commonly discuss after Class 10.",
    "Read the split page if you are stuck between computers and Biology. Use the worksheet with a parent if both feel possible. Then open the matching textbook finders — we link official portals only.",
  ],
  sections: [
    {
      heading: "Who these groups are for",
      items: [
        "2502 — mathematics, programming interest, engineering and IT doors",
        "2503 — life science plus maths, medical-adjacent and some engineering doors",
        "Both — laboratory science workload for two years",
      ],
    },
  ],
  officialLinks: [
    { href: DGE_HOME_URL, label: "DGE Tamil Nadu" },
    { href: TNEA_HOME_URL, label: "TNEA" },
    { href: NEET_NTA_URL, label: "NTA NEET" },
  ],
  childLinks: [
    groups.c2502,
    groups.c2503,
    { href: EDUCATION_2502_VS_2503_PATH, label: "2502 vs 2503 explainer" },
    { href: educationClusterPath("engineering"), label: "Engineering / TNEA" },
    { href: educationClusterPath("medicine"), label: "Medicine / NEET" },
    { href: educationClusterPath("it-degrees"), label: "IT degrees" },
    { href: educationTextbookPath("physics"), label: "Physics books" },
    { href: educationTextbookPath("chemistry"), label: "Chemistry books" },
    { href: educationTextbookPath("mathematics"), label: "Maths books" },
    { href: educationTextbookPath("biology"), label: "Biology books" },
  ],
  faq: [
    {
      q: "Is 2503 always better because it keeps more doors?",
      a: "It keeps Biology and Mathematics together, which is a wider subject mix, but the weekly load is usually heavier. A door you cannot study well is not a real door.",
    },
    {
      q: "Can I take Biology later if I pick 2502?",
      a: "School Biology for two years is what many medical-adjacent rules look at. Do not assume a short course replaces 2503. Read the current NEET / university notice.",
    },
  ],
  faqFragment: "science-faq",
};

export const HSE_COMMERCE: EducationExplainer = {
  id: "commerce",
  path: EDUCATION_COMMERCE_PATH,
  taPath: educationClusterPath("commerce", "ta"),
  seoTitle: "TN Plus Two commerce groups — 2702 vs 2708",
  seoDescription:
    "Tamil Nadu commerce desk: 2702 Computer Applications versus 2708 Business Mathematics, plus Accountancy books and CA-related pathways.",
  title: "Commerce groups after Class 10",
  dek: "Both 2702 and 2708 take Economics, Commerce and Accountancy. The fourth paper is Computer Applications or Business Mathematics and Statistics.",
  crumb: "Commerce",
  geo: true,
  related: [
    { href: EDUCATION_HUB_PATH, label: "All groups" },
    { href: EDUCATION_2702_VS_2708_PATH, label: "2702 vs 2708" },
    { href: educationClusterPath("ca-finance"), label: "CA / finance" },
  ],
  aeo: {
    id: "tn-plus-two-commerce-aeo",
    eyebrow: "Commerce desk",
    title: "Which commerce group?",
    dek: "Accountancy is in both. The fourth paper is the real choice.",
    directAnswer:
      "Choose 2702 if you want Computer Applications with the commerce trio. Choose 2708 if you want Business Mathematics and Statistics instead. Both groups include Accountancy, Commerce and Economics. CA and other professional courses have their own rules after Class 12 — pick the fourth paper you can actually score in.",
    contextParagraphs: [
      "Schools do not always offer both codes. Confirm the prospectus before you decide on a fourth paper you cannot sit.",
    ],
    facts: [
      { term: "Shared trio", definition: "Economics, Commerce, Accountancy." },
      { term: "The split", definition: "Computer Applications (2702) versus Business Maths (2708)." },
    ],
    disclaimer: "Civic guidance — not an ICAI or DGE circular.",
  },
  paragraphs: [
    "Commerce is a professional-looking stream, but the school year is still six papers including language and English. The prestige story (“commerce is easy”, “CA needs 2708 only”) is weaker than the mark sheet you will actually produce.",
    "Use the split page, then the Accountancy / Commerce / Economics finder and the Computer Applications finder. The CA / finance page lists official institute homes — not a rank predictor.",
  ],
  sections: [
    {
      heading: "Typical next degrees",
      items: [
        "B.Com, BBA, Accounting & Finance",
        "BCA or information-systems programmes where the college accepts the mix (more natural after 2702)",
        "Economics or analytics programmes (check each college’s maths rule — more often discussed after 2708)",
      ],
    },
  ],
  officialLinks: [
    { href: DGE_HOME_URL, label: "DGE Tamil Nadu" },
    { href: ICAI_HOME_URL, label: "ICAI" },
    { href: ICMAI_HOME_URL, label: "ICMAI" },
    { href: ICSI_HOME_URL, label: "ICSI" },
  ],
  childLinks: [
    groups.c2702,
    groups.c2708,
    { href: EDUCATION_2702_VS_2708_PATH, label: "2702 vs 2708 explainer" },
    { href: educationClusterPath("ca-finance"), label: "CA / CMA / CS / banking" },
    { href: educationTextbookPath("commerce"), label: "Accountancy / Commerce / Economics books" },
    { href: educationTextbookPath("computer"), label: "Computer Applications books" },
    { href: educationTextbookPath("mathematics"), label: "Business Maths books" },
  ],
  faq: [
    {
      q: "Which group is required for CA?",
      a: "Neither code is a CA ticket. Both include Accountancy. ICAI foundation / eligibility rules after Class 12 decide entry. Choose the fourth paper you can sustain.",
    },
    {
      q: "Is 2708 “the maths commerce group”?",
      a: "It includes Business Mathematics and Statistics, which is a quantitative commerce paper — not the same book as science Mathematics in 2502/2503.",
    },
  ],
  faqFragment: "commerce-faq",
};

export const HSE_AFTER_12TH: EducationExplainer = {
  id: "after-12th",
  path: EDUCATION_AFTER_12TH_PATH,
  taPath: educationClusterPath("after-12th", "ta"),
  seoTitle: "After 12th in Tamil Nadu — TNEA, NEET, CA, law, IT",
  seoDescription:
    "Map Higher Secondary groups to engineering, medicine, CA, law and IT degrees. Official portals only — no invented cut-offs.",
  title: "After Class 12 — doors from each group",
  dek: "TNEA, NEET, CA, law and IT degrees depend on subjects you already studied and on this year’s official notice. This page is a map, not a predictor.",
  crumb: "After 12th",
  geo: true,
  related: [
    { href: EDUCATION_HUB_PATH, label: "Group guide" },
    { href: EDUCATION_WORKSHEET_PATH, label: "Decision worksheet" },
    { href: EDUCATION_SCIENCE_PATH, label: "Science desk" },
  ],
  aeo: {
    id: "tn-plus-two-after12-aeo",
    eyebrow: "After 12th",
    title: "Which door after Plus Two?",
    dek: "Match the group you already have to the official counselling you want.",
    directAnswer:
      "Engineering counselling in Tamil Nadu is organised through TNEA and similar routes and usually looks for Physics, Chemistry and Mathematics. Medical-adjacent counselling that uses NEET usually looks for Physics, Chemistry and Biology. CA, CMA and CS have institute foundations after Class 12. Law and many IT degrees admit from more than one school stream — always read the college. This site does not publish cut-offs.",
    contextParagraphs: [
      "2502 and 2503 are the science groups on this desk. 2702 and 2708 are commerce. 2804 and 2802 are humanities. Any recognised stream can sit many competitive exams later; school subjects are a foundation, not a monopoly.",
    ],
    facts: [
      { term: "No cut-offs here", definition: "TNEA / NEET ranks change every year. Use the official portal." },
      { term: "Six papers still", definition: "Language and English remain on the Higher Secondary mark sheet." },
    ],
    disclaimer: "Verify every claim on TNEA, NTA, ICAI or the university site before you act.",
  },
  paragraphs: [
    "Parents often want one sentence: “This group guarantees engineering.” Nothing on this desk guarantees a seat. What we can say is which school subjects usually overlap with a degree family, and where to read the rule.",
    "Open the child pages for the door you care about. Then confirm the group you already chose still matches. If you are still in Class 10, use the worksheet before fees are paid.",
  ],
  sections: [
    {
      heading: "Read official pages, not forwards",
      items: [
        "TNEA for Tamil Nadu engineering counselling",
        "NTA NEET for the national medical entrance",
        "ICAI / ICMAI / ICSI for professional accountancy routes",
        "Each law college or integrated programme for its own test",
      ],
    },
  ],
  officialLinks: [
    { href: TNEA_HOME_URL, label: "TNEA" },
    { href: NEET_NTA_URL, label: "NTA NEET" },
    { href: ICAI_HOME_URL, label: "ICAI" },
    { href: DGE_HOME_URL, label: "DGE Tamil Nadu" },
  ],
  childLinks: [
    { href: educationClusterPath("engineering"), label: "Engineering / TNEA" },
    { href: educationClusterPath("medicine"), label: "Medicine / NEET" },
    { href: educationClusterPath("ca-finance"), label: "CA / finance" },
    { href: educationClusterPath("law-civil-services"), label: "Law & civil services" },
    { href: educationClusterPath("it-degrees"), label: "IT degrees" },
    groups.c2502,
    groups.c2503,
    groups.c2702,
    groups.c2708,
    groups.c2804,
    groups.c2802,
  ],
  faq: [
    {
      q: "Can a commerce student become an engineer?",
      a: "Most Tamil Nadu engineering counselling expects Physics, Chemistry and Mathematics in Higher Secondary. Commerce groups on this desk do not include that trio. Do not rely on a viral exception story — read TNEA for the year you apply.",
    },
    {
      q: "Can a science student do CA?",
      a: "Professional institutes publish their own Class 12 eligibility. Science is not a ban by default. Accountancy in school helps; it is not the only path. Check ICAI.",
    },
  ],
  faqFragment: "after12-faq",
};

export const HSE_2502_VS_2503: EducationExplainer = {
  id: "2502-vs-2503",
  path: EDUCATION_2502_VS_2503_PATH,
  seoTitle: "2502 vs 2503 — Computer Science or Biology",
  seoDescription:
    "Compare Tamil Nadu Plus Two groups 2502 and 2503: shared Physics, Chemistry, Maths, and the Computer Science versus Biology split.",
  title: "2502 vs 2503",
  dek: "Same three science-maths cores. Fourth paper: Computer Science or Biology. That one paper changes the usual medical-adjacent route.",
  crumb: "2502 vs 2503",
  related: [
    { href: EDUCATION_SCIENCE_PATH, label: "Science desk" },
    groups.c2502,
    groups.c2503,
  ],
  paragraphs: [
    "Both codes include Physics, Chemistry and Mathematics. 2502 adds Computer Science. 2503 adds Biology. Language and English still sit on the timetable.",
    "Choose 2502 when you care more about computing and you are comfortable leaving school Biology. Choose 2503 when you want Biology in the mark sheet and you can carry maths plus life science together.",
    "Do not invent a rule such as “2502 students cannot write NEET” unless the current official notice says so — and then quote that notice. What we can say without a circular: 2502 does not teach Biology as a core.",
  ],
  sections: [
    {
      heading: "Quick contrast",
      items: [
        "2502 — stronger school computing paper; usual engineering / IT conversation",
        "2503 — Biology present; usual medical-adjacent conversation plus maths-based science",
        "Workload — 2503 is typically heavier because both maths and Biology are present",
      ],
    },
  ],
  officialLinks: [
    { href: TNEA_HOME_URL, label: "TNEA" },
    { href: NEET_NTA_URL, label: "NTA NEET" },
  ],
  childLinks: [
    groups.c2502,
    groups.c2503,
    { href: educationClusterPath("engineering"), label: "Engineering" },
    { href: educationClusterPath("medicine"), label: "Medicine" },
    { href: EDUCATION_WORKSHEET_PATH, label: "Worksheet" },
  ],
  faq: [
    {
      q: "Which is the “computer group”?",
      a: "2502 includes Computer Science. 2503 does not.",
    },
    {
      q: "Which is the “bio-maths group”?",
      a: "2503 is the Maths + Biology combination on this desk.",
    },
  ],
  faqFragment: "split-science-faq",
};

export const HSE_2702_VS_2708: EducationExplainer = {
  id: "2702-vs-2708",
  path: EDUCATION_2702_VS_2708_PATH,
  seoTitle: "2702 vs 2708 — Computer Applications or Business Maths",
  seoDescription:
    "Compare Tamil Nadu commerce groups 2702 and 2708: shared Accountancy trio and the Computer Applications versus Business Mathematics split.",
  title: "2702 vs 2708",
  dek: "Same commerce trio. Fourth paper: Computer Applications or Business Mathematics and Statistics.",
  crumb: "2702 vs 2708",
  related: [
    { href: EDUCATION_COMMERCE_PATH, label: "Commerce desk" },
    groups.c2702,
    groups.c2708,
  ],
  paragraphs: [
    "Both groups take Economics, Commerce and Accountancy. 2702 adds Computer Applications. 2708 adds Business Mathematics and Statistics.",
    "Pick 2702 if you want a computing paper with business. Pick 2708 if you want a stronger numerical commerce paper. Neither group is “the only CA group”.",
    "If a college later asks for Mathematics specifically, read that college’s rule — Business Mathematics is not automatically the same as science Mathematics.",
  ],
  sections: [
    {
      heading: "Quick contrast",
      items: [
        "2702 — digital business / BCA conversations are more natural, subject to college rules",
        "2708 — finance, statistics and analytics conversations often mention the numerical paper",
        "Shared — Accountancy base for professional accountancy study after Class 12",
      ],
    },
  ],
  officialLinks: [
    { href: ICAI_HOME_URL, label: "ICAI" },
    { href: DGE_HOME_URL, label: "DGE" },
  ],
  childLinks: [
    groups.c2702,
    groups.c2708,
    { href: educationClusterPath("ca-finance"), label: "CA / finance" },
    { href: educationClusterPath("it-degrees"), label: "IT degrees" },
    { href: EDUCATION_WORKSHEET_PATH, label: "Worksheet" },
  ],
  faq: [
    {
      q: "Does 2708 include Computer Applications?",
      a: "No. That paper is in 2702 (and in humanities 2802).",
    },
    {
      q: "Does 2702 include Business Maths?",
      a: "No. That paper is in 2708.",
    },
  ],
  faqFragment: "split-commerce-faq",
};

export const HSE_ENGINEERING: EducationExplainer = {
  id: "engineering",
  path: educationClusterPath("engineering"),
  seoTitle: "Engineering after 12th — which TN Plus Two group",
  seoDescription:
    "How Tamil Nadu groups 2502 and 2503 relate to TNEA and engineering degrees. No cut-offs — official TNEA portal only.",
  title: "Engineering after Higher Secondary",
  dek: "TNEA and similar counselling usually look for Physics, Chemistry and Mathematics. This page names groups that include that trio — not this year’s rank.",
  crumb: "Engineering",
  related: [
    { href: EDUCATION_AFTER_12TH_PATH, label: "After 12th map" },
    groups.c2502,
    groups.c2503,
  ],
  paragraphs: [
    "Tamil Nadu engineering admissions for many government and affiliated colleges run through TNEA. Other universities and national tests have their own forms. We do not invent a cut-off or a “safe score”.",
    "On this desk, 2502 and 2503 both include Physics, Chemistry and Mathematics. 2502 adds Computer Science. 2503 adds Biology (useful if you also want biomedical or life-science engineering conversations — still verify the college).",
    "Commerce and humanities groups do not include that PCM trio. Treat viral stories about lateral exceptions as unverified until TNEA says so.",
  ],
  sections: [
    {
      heading: "What to do this year",
      items: [
        "Read the current TNEA information brochure",
        "Match your mark sheet subjects to the brochure, not to a WhatsApp list",
        "Open 2502 or 2503 group pages if you are still choosing in Class 10",
      ],
    },
  ],
  officialLinks: [{ href: TNEA_HOME_URL, label: "TNEA official site" }],
  childLinks: [
    groups.c2502,
    groups.c2503,
    { href: EDUCATION_2502_VS_2503_PATH, label: "2502 vs 2503" },
    { href: educationClusterPath("it-degrees"), label: "IT degrees" },
    { href: educationTextbookPath("physics"), label: "Physics books" },
  ],
  faq: [
    {
      q: "What rank do I need?",
      a: "This site does not publish TNEA cut-offs. Use the official counselling site for the year you apply.",
    },
    {
      q: "Is Computer Science in school required for B.E. CSE?",
      a: "Many engineering admissions care about PCM. School Computer Science helps preparation; it is not always a brochure requirement. Read TNEA.",
    },
  ],
  faqFragment: "engineering-faq",
};

export const HSE_MEDICINE: EducationExplainer = {
  id: "medicine",
  path: educationClusterPath("medicine"),
  seoTitle: "Medicine after 12th — NEET and TN group 2503",
  seoDescription:
    "How group 2503 (Physics, Chemistry, Biology, Mathematics) relates to NEET and life-science degrees. No invented cut-offs.",
  title: "Medicine and life sciences after Higher Secondary",
  dek: "NEET and many health-science programmes look for Physics, Chemistry and Biology. On this desk, 2503 is the group that includes Biology with Mathematics.",
  crumb: "Medicine",
  related: [
    { href: EDUCATION_AFTER_12TH_PATH, label: "After 12th map" },
    groups.c2503,
    { href: EDUCATION_2502_VS_2503_PATH, label: "2502 vs 2503" },
  ],
  paragraphs: [
    "MBBS, BDS and several other health programmes use NEET as the national test. NTA publishes the information bulletin. We will not guess a qualifying percentile.",
    "Group 2503 includes Biology plus Physics, Chemistry and Mathematics. Group 2502 does not include Biology. If you want school Biology, 2503 is the documented science option here.",
    "Agriculture, pharmacy, nursing and allied health each have their own counselling. Read that year’s notice. Laboratory facilities at the school matter as much as the PDF of the Biology book.",
  ],
  sections: [
    {
      heading: "Practical next steps",
      items: [
        "Open the current NTA NEET bulletin",
        "Confirm Biology is on your Higher Secondary mark sheet if the bulletin requires it",
        "Use the Biology textbook finder for official volumes only",
      ],
    },
  ],
  officialLinks: [{ href: NEET_NTA_URL, label: "NTA NEET" }],
  childLinks: [
    groups.c2503,
    { href: EDUCATION_2502_VS_2503_PATH, label: "2502 vs 2503" },
    { href: educationTextbookPath("biology"), label: "Biology books" },
    { href: EDUCATION_SCIENCE_PATH, label: "Science desk" },
  ],
  faq: [
    {
      q: "Can 2502 students write NEET?",
      a: "Read the current NTA bulletin. This desk will not invent a yes or no. 2502 does not include Biology as a school core.",
    },
    {
      q: "Does 2503 guarantee a medical seat?",
      a: "No. It only includes the usual school subjects. Seats depend on the test and counselling of that year.",
    },
  ],
  faqFragment: "medicine-faq",
};

export const HSE_CA_FINANCE: EducationExplainer = {
  id: "ca-finance",
  path: educationClusterPath("ca-finance"),
  seoTitle: "CA, CMA, CS after TN Plus Two commerce",
  seoDescription:
    "How groups 2702 and 2708 relate to CA, CMA, CS and banking study. Institute portals only — no foundation ranks.",
  title: "CA, CMA, CS and finance after Higher Secondary",
  dek: "Both commerce groups include Accountancy. Professional institutes run their own foundations. We link ICAI, ICMAI and ICSI — we do not sell a crash course.",
  crumb: "CA / finance",
  related: [
    { href: EDUCATION_COMMERCE_PATH, label: "Commerce desk" },
    groups.c2702,
    groups.c2708,
  ],
  paragraphs: [
    "Chartered Accountancy, Cost Accountancy and Company Secretaryship are institute pathways. Entry rules live on icai.org, icmai.in and icsi.edu. A school group code is not a registration number.",
    "2702 and 2708 both teach Accountancy, Commerce and Economics. 2708 adds Business Mathematics. 2702 adds Computer Applications. Pick the fourth paper you can score in; then read the institute.",
    "Banking and B.Com programmes are college admissions, not ICAI. Science or humanities students should still read the institute page rather than assume a ban.",
  ],
  sections: [
    {
      heading: "Official homes",
      items: [
        "ICAI — Chartered Accountancy",
        "ICMAI — Cost and management accountancy",
        "ICSI — Company Secretary",
      ],
    },
  ],
  officialLinks: [
    { href: ICAI_HOME_URL, label: "ICAI" },
    { href: ICMAI_HOME_URL, label: "ICMAI" },
    { href: ICSI_HOME_URL, label: "ICSI" },
  ],
  childLinks: [
    groups.c2702,
    groups.c2708,
    { href: EDUCATION_2702_VS_2708_PATH, label: "2702 vs 2708" },
    { href: educationTextbookPath("commerce"), label: "Accountancy books" },
    { href: EDUCATION_COMMERCE_PATH, label: "Commerce desk" },
  ],
  faq: [
    {
      q: "Is 2708 mandatory for CA?",
      a: "No. Accountancy is in both commerce groups. ICAI publishes eligibility. Business Maths can help numerically; it is not a substitute for the institute form.",
    },
    {
      q: "When do articleship and foundations start?",
      a: "Those calendars change. Use the institute website for the year you register.",
    },
  ],
  faqFragment: "ca-faq",
};

export const HSE_LAW_CIVIL: EducationExplainer = {
  id: "law-civil-services",
  path: educationClusterPath("law-civil-services"),
  seoTitle: "Law and civil services after TN Plus Two",
  seoDescription:
    "Humanities groups 2804 and 2802 as a foundation for law and government exams. Any recognised stream can sit many tests later.",
  title: "Law and civil-services foundation",
  dek: "Humanities gives early History, Economics, Geography and (in 2804) Political Science. It is a foundation, not a monopoly on UPSC, TNPSC or law college.",
  crumb: "Law / civil services",
  related: [
    { href: EDUCATION_AFTER_12TH_PATH, label: "After 12th map" },
    groups.c2804,
    groups.c2802,
  ],
  paragraphs: [
    "Integrated law programmes after Class 12 have their own entrance tests. Three-year LL.B. usually follows a bachelor’s degree. Read the college. Humanities reading stamina helps; science and commerce graduates also enter law.",
    "Civil-services exams later in life are open to many graduates. School Political Science is useful exposure, not a reserved seat. Group 2804 includes Political Science. Group 2802 includes Computer Applications instead.",
    "Confirm the school’s exact 2800-series code. This desk does not catalogue every humanities combination.",
  ],
  sections: [
    {
      heading: "What this desk will not do",
      items: [
        "Predict a UPSC or TNPSC year",
        "Claim only humanities students can become officers",
        "Host a coaching timetable",
      ],
    },
  ],
  officialLinks: [{ href: DGE_HOME_URL, label: "DGE Tamil Nadu" }],
  childLinks: [
    groups.c2804,
    groups.c2802,
    { href: EDUCATION_HUB_PATH, label: "Group hub" },
    { href: EDUCATION_COMPARE_PATH, label: "Compare groups" },
    { href: EDUCATION_CHOOSE_PATH, label: "How to choose" },
  ],
  faq: [
    {
      q: "Must I take 2804 to study law?",
      a: "No. Law colleges set their own Class 12 or graduate rules. Humanities helps with reading; it is not the only path.",
    },
    {
      q: "Does 2802 include Political Science?",
      a: "No. 2804 does. 2802 uses Computer Applications as the fourth core.",
    },
  ],
  faqFragment: "law-faq",
};

export const HSE_IT_DEGREES: EducationExplainer = {
  id: "it-degrees",
  path: educationClusterPath("it-degrees"),
  seoTitle: "B.E. CSE, BCA, B.Sc CS after TN Plus Two",
  seoDescription:
    "Which Higher Secondary groups usually feed B.E. Computer Science, BCA and B.Sc. Computer Science. College rules beat group nicknames.",
  title: "IT and computing degrees after Higher Secondary",
  dek: "2502 includes Computer Science with PCM. 2702 and 2802 include Computer Applications. Degree eligibility is still a college or TNEA rule.",
  crumb: "IT degrees",
  related: [
    { href: EDUCATION_AFTER_12TH_PATH, label: "After 12th map" },
    groups.c2502,
    { href: educationClusterPath("engineering"), label: "Engineering" },
  ],
  paragraphs: [
    "B.E. / B.Tech Computer Science and IT usually travel with engineering counselling. PCM in Higher Secondary is the conversation TNEA documents. School Computer Science (2502) is useful preparation.",
    "BCA and B.Sc. Computer Science have varied eligibility. Some colleges accept commerce or humanities with Computer Applications (2702, 2802). Some still ask for Mathematics. Read that college.",
    "2503 has PCM but no Computer Science paper. Computing degrees can still be possible where the brochure cares about PCM, not about the school CS book.",
  ],
  sections: [
    {
      heading: "Groups to open first",
      items: [
        "2502 — Computer Science + PCM",
        "2702 — Computer Applications + commerce trio",
        "2802 — Computer Applications + humanities cores",
      ],
    },
  ],
  officialLinks: [{ href: TNEA_HOME_URL, label: "TNEA" }],
  childLinks: [
    groups.c2502,
    groups.c2702,
    groups.c2802,
    { href: educationTextbookPath("computer"), label: "Computer books" },
    { href: educationClusterPath("engineering"), label: "Engineering" },
  ],
  faq: [
    {
      q: "Is 2502 required for BCA?",
      a: "No. Many BCA colleges accept other mixes. Check the college. 2502 is the science computing group, not a universal IT ticket.",
    },
    {
      q: "Does 2708 include a computer paper?",
      a: "No. 2708 includes Business Mathematics. See 2702 for Computer Applications.",
    },
  ],
  faqFragment: "it-faq",
};

export const HSE_EXPLAINERS = [
  HSE_SCIENCE,
  HSE_COMMERCE,
  HSE_AFTER_12TH,
  HSE_2502_VS_2503,
  HSE_2702_VS_2708,
  HSE_ENGINEERING,
  HSE_MEDICINE,
  HSE_CA_FINANCE,
  HSE_LAW_CIVIL,
  HSE_IT_DEGREES,
] as const;

export function getExplainerById(id: string): EducationExplainer | undefined {
  return HSE_EXPLAINERS.find((p) => p.id === id);
}
