import { educationGroupPath } from "@/content/education/paths";

export type HseStream = "science" | "commerce" | "humanities";

export type HseSubject = {
  en: string;
  ta: string;
};

export type HseGroup = {
  code: string;
  stream: HseStream;
  nameEn: string;
  nameTa: string;
  dek: string;
  cores: HseSubject[];
  whoFor: string[];
  skills: string[];
  higherEd: string[];
  professional: string[];
  careers: string[];
  advantages: string[];
  cautions: string[];
  bestSuited: string;
  bestSuitedTa: string;
  seoTitle: string;
  seoDescription: string;
};

export const HSE_LANGUAGE_PAPERS: HseSubject[] = [
  { en: "Tamil / other permitted language (Part I)", ta: "தமிழ் / அனுமதிக்கப்பட்ட பிற மொழி" },
  { en: "English (Part II)", ta: "ஆங்கிலம்" },
];

export const HSE_GROUPS: readonly HseGroup[] = [
  {
    code: "2502",
    stream: "science",
    nameEn: "Mathematics + Computer Science",
    nameTa: "கணிதம் + கணினி அறிவியல்",
    dek: "Physics, Chemistry, Computer Science and Mathematics — the current DGE group code for a maths-plus-computing science combination.",
    cores: [
      { en: "Physics", ta: "இயற்பியல்" },
      { en: "Chemistry", ta: "வேதியியல்" },
      { en: "Computer Science", ta: "கணினி அறிவியல்" },
      { en: "Mathematics", ta: "கணிதம்" },
    ],
    whoFor: [
      "Students who enjoy mathematics and logical problem-solving",
      "Students interested in computers, programming and software",
      "Students aiming at engineering or technology undergraduate programmes",
    ],
    skills: ["Algebra and applied maths", "Logical reasoning", "Comfort with computers", "Sustained science workload"],
    higherEd: [
      "B.E. / B.Tech — Computer Science, IT, AI, Data Science, ECE, EEE, Mechanical, Civil, Robotics, Cyber Security (subject to TNEA / other admission rules)",
      "B.Sc. Computer Science",
      "B.Sc. Mathematics",
      "BCA",
      "Statistics and data-analytics degrees",
    ],
    professional: ["Engineering counselling (TNEA and similar)", "Later postgraduate IT or data specialisations"],
    careers: [
      "Software engineer",
      "AI / data roles after further study",
      "Cybersecurity specialist",
      "Web or app developer",
      "Electronics or core-engineering roles",
      "Technology entrepreneur",
    ],
    advantages: [
      "Keeps a strong mathematics foundation for engineering and computing degrees",
      "Computer Science in Classes XI–XII is useful preparation for B.E. CSE / IT and BCA",
    ],
    cautions: [
      "This combination does not include Biology, so it is not the usual school-subject route for MBBS / BDS counselling that expects Biology",
      "Mathematics plus three science papers is a heavy weekly load — confirm you can sustain both",
      "Confirm the school actually offers group 2502 before admission",
    ],
    bestSuited: "Engineering + IT + technology",
    bestSuitedTa: "பொறியியல் + தகவல் தொழில்நுட்பம் + தொழில்நுட்பம்",
    seoTitle: "TN Plus Two group 2502 — Maths + Computer Science",
    seoDescription:
      "Tamil Nadu Higher Secondary group 2502: Physics, Chemistry, Computer Science and Mathematics. Who it suits, six exam papers, and typical engineering and IT pathways.",
  },
  {
    code: "2503",
    stream: "science",
    nameEn: "Mathematics + Biology",
    nameTa: "கணிதம் + உயிரியல்",
    dek: "Physics, Chemistry, Biology and Mathematics — one of the broadest science combinations because both maths and life science are present.",
    cores: [
      { en: "Physics", ta: "இயற்பியல்" },
      { en: "Chemistry", ta: "வேதியியல்" },
      { en: "Biology", ta: "உயிரியல்" },
      { en: "Mathematics", ta: "கணிதம்" },
    ],
    whoFor: [
      "Students who want to keep medicine and mathematics-based science pathways open",
      "Students interested in life sciences as well as engineering eligibility where maths is required",
      "Students ready for a comparatively high academic workload",
    ],
    skills: ["Biology reading and diagrams", "Mathematics stamina", "Laboratory science habits", "Time management"],
    higherEd: [
      "MBBS, BDS, veterinary, agriculture, pharmacy, nursing and allied health — subject to NEET and university rules",
      "Biotechnology, biomedical science and other life-science degrees",
      "B.E. / B.Tech where the admitting authority accepts this subject mix (including biomedical / biotechnology engineering)",
      "B.Sc. programmes in biology-related and mathematics-related fields",
    ],
    professional: ["NEET counselling where Biology is required", "Engineering counselling where Mathematics is required"],
    careers: [
      "Doctor, dentist or veterinarian after the relevant professional degree",
      "Pharmacist or allied-health professional",
      "Biomedical or biotechnology roles",
      "Agricultural scientist",
      "Engineer where admission rules allow this group",
    ],
    advantages: [
      "Keeps both medical-adjacent and maths-based science doors in view, subject to official eligibility",
      "Useful if you are genuinely unsure between medicine and engineering at Class 10",
    ],
    cautions: [
      "Mathematics and Biology together usually mean a heavier workload than groups with only one of those papers",
      "Undergraduate admission still depends on the current year’s official eligibility — not on interest alone",
      "Confirm the school offers group 2503 and has laboratory facilities you need",
    ],
    bestSuited: "Medicine + engineering + biological sciences",
    bestSuitedTa: "மருத்துவம் + பொறியியல் + உயிரியல் அறிவியல்",
    seoTitle: "TN Plus Two group 2503 — Maths + Biology",
    seoDescription:
      "Tamil Nadu Higher Secondary group 2503: Physics, Chemistry, Biology and Mathematics. Workload, six exam papers, and medical versus engineering pathways.",
  },
  {
    code: "2702",
    stream: "commerce",
    nameEn: "Commerce + Computer Applications",
    nameTa: "வணிகவியல் + கணினிப் பயன்பாடுகள்",
    dek: "Economics, Commerce, Accountancy and Computer Applications — a commerce group with a business-technology paper instead of Business Mathematics.",
    cores: [
      { en: "Economics", ta: "பொருளியல்" },
      { en: "Commerce", ta: "வணிகவியல்" },
      { en: "Accountancy", ta: "கணக்குப்பதிவியல்" },
      { en: "Computer Applications", ta: "கணினிப் பயன்பாடுகள்" },
    ],
    whoFor: [
      "Students interested in business, accounting, banking and entrepreneurship",
      "Students who also want computers and business software in the mix",
      "Students considering B.Com, BBA, BCA or digital-business degrees",
    ],
    skills: ["Accounts discipline", "Business concepts", "Comfort with computers", "Written English for commerce papers"],
    higherEd: [
      "B.Com, B.Com Computer Applications, Accounting & Finance, Corporate Secretaryship",
      "BBA and Bachelor of Management Studies",
      "BCA and information-systems degrees",
      "Banking, finance and e-commerce programmes",
    ],
    professional: ["CA, CMA, CS, ACCA after the relevant foundation / eligibility rules", "Banking qualifications", "MBA after graduation"],
    careers: [
      "Accountant, auditor or tax consultant after professional study",
      "Banking professional",
      "Business or financial analyst",
      "E-commerce or business-software roles",
      "Entrepreneur",
    ],
    advantages: [
      "Pairs core commerce papers with Computer Applications — a practical route into digital business",
      "Still a standard Accountancy base for CA / CMA / CS pathways",
    ],
    cautions: [
      "Business Mathematics is not in this group — if you want a stronger quantitative commerce paper, look at 2708",
      "Professional courses have their own entrance and article-ship rules after Class 12",
      "Confirm the school offers group 2702",
    ],
    bestSuited: "Commerce + business + computers",
    bestSuitedTa: "வணிகம் + நிதி + கணினி",
    seoTitle: "TN Plus Two group 2702 — Commerce + Computer Applications",
    seoDescription:
      "Tamil Nadu Higher Secondary group 2702: Economics, Commerce, Accountancy and Computer Applications. B.Com, BBA, BCA and CA-related pathways.",
  },
  {
    code: "2708",
    stream: "commerce",
    nameEn: "Commerce + Business Mathematics",
    nameTa: "வணிகவியல் + வணிகக் கணிதம் மற்றும் புள்ளியியல்",
    dek: "Economics, Commerce, Accountancy and Business Mathematics & Statistics — a commerce group with a stronger numerical paper.",
    cores: [
      { en: "Economics", ta: "பொருளியல்" },
      { en: "Commerce", ta: "வணிகவியல்" },
      { en: "Accountancy", ta: "கணக்குப்பதிவியல்" },
      { en: "Business Mathematics & Statistics", ta: "வணிகக் கணிதம் மற்றும் புள்ளியியல்" },
    ],
    whoFor: [
      "Students who like accounts, finance and numbers",
      "Students considering CA, actuarial, economics or business-analytics routes",
      "Students who prefer a quantitative fourth paper over Computer Applications",
    ],
    skills: ["Numerical comfort", "Accountancy accuracy", "Statistics basics", "Sustained problem practice"],
    higherEd: [
      "B.Com, Accounting & Finance, Banking & Insurance",
      "BBA and management degrees",
      "Economics and statistics-related programmes",
      "Actuarial science and business analytics (check each college’s Class 12 maths requirement)",
    ],
    professional: ["CA, CMA, CS, ACCA", "Actuarial qualifications", "CFA pathway after appropriate higher education"],
    careers: [
      "Chartered accountant or auditor",
      "Investment or financial analyst",
      "Actuary after further qualification",
      "Banker",
      "Business analyst or economist",
    ],
    advantages: [
      "Business Mathematics can give a stronger numerical base for finance, statistics and analytics programmes",
      "Same core commerce trio (Economics, Commerce, Accountancy) as 2702",
    ],
    cautions: [
      "Computer Applications is not in this group — if you want a computing paper, look at 2702",
      "Actuarial and some analytics degrees may still ask for a specific maths paper — verify the college",
      "Confirm the school offers group 2708",
    ],
    bestSuited: "Finance + accounting + analytics",
    bestSuitedTa: "நிதி + கணக்கியல் + பகுப்பாய்வு",
    seoTitle: "TN Plus Two group 2708 — Commerce + Business Maths",
    seoDescription:
      "Tamil Nadu Higher Secondary group 2708: Economics, Commerce, Accountancy and Business Mathematics & Statistics. CA, finance and analytics pathways.",
  },
  {
    code: "2804",
    stream: "humanities",
    nameEn: "Humanities + Political Science",
    nameTa: "மனிதவியல் + அரசியல் அறிவியல்",
    dek: "Geography, History, Economics and Political Science — a 2800-series humanities combination. Other 2800 codes exist; confirm what the school offers.",
    cores: [
      { en: "Geography", ta: "புவியியல்" },
      { en: "History", ta: "வரலாறு" },
      { en: "Economics", ta: "பொருளியல்" },
      { en: "Political Science", ta: "அரசியல் அறிவியல்" },
    ],
    whoFor: [
      "Students interested in history, society, government and public administration",
      "Students considering law, journalism, civil-services foundation or social sciences",
      "Students who prefer reading-and-writing papers over laboratory science",
    ],
    skills: ["Reading stamina", "Essay writing", "Map and current-affairs habits", "Interest in institutions"],
    higherEd: [
      "B.A. History, Economics, Political Science, Geography, Public Administration",
      "Sociology, psychology, social work",
      "Journalism and mass communication",
      "Law (after the relevant undergraduate or integrated programme rules)",
      "International relations",
    ],
    professional: ["Law entrance after the required degree path", "UPSC / TNPSC later — any recognised stream can sit many exams; humanities gives early subject exposure"],
    careers: [
      "Civil services and government administration after competitive exams",
      "Lawyer",
      "Journalist or media professional",
      "Policy analyst, teacher or researcher",
      "Social-sector roles",
    ],
    advantages: [
      "Early school-level exposure to History, Economics, Geography and Political Science",
      "A strong reading base for law and social-science degrees",
    ],
    cautions: [
      "The Tamil Nadu 2800-series has several combinations — 2804 is one option, not the only humanities group",
      "Students from other groups can still write many competitive exams later; humanities is a foundation, not a monopoly",
      "Confirm the school’s exact 2800-series code and fourth subject",
    ],
    bestSuited: "Civil services + law + government + social sciences",
    bestSuitedTa: "குடிமைப் பணிகள் + சட்டம் + அரசு நிர்வாகம் + சமூக அறிவியல்",
    seoTitle: "TN Plus Two group 2804 — Humanities + Political Science",
    seoDescription:
      "Tamil Nadu Higher Secondary group 2804: Geography, History, Economics and Political Science. Humanities subjects, six papers, and law or civil-services foundation notes.",
  },
  {
    code: "2802",
    stream: "humanities",
    nameEn: "Humanities + Computer Applications",
    nameTa: "மனிதவியல் + கணினிப் பயன்பாடுகள்",
    dek: "Geography, History, Economics and Computer Applications — a 2800-series option that keeps a computing paper with humanities cores.",
    cores: [
      { en: "Geography", ta: "புவியியல்" },
      { en: "History", ta: "வரலாறு" },
      { en: "Economics", ta: "பொருளியல்" },
      { en: "Computer Applications", ta: "கணினிப் பயன்பாடுகள்" },
    ],
    whoFor: [
      "Students who want humanities cores plus a computer paper",
      "Students interested in media, social sciences or digital work without a full science group",
      "Students whose school offers 2802 rather than 2804",
    ],
    skills: ["Reading and writing", "Basic computing", "Economics literacy", "Independent study"],
    higherEd: [
      "B.A. programmes in history, economics, geography and related social sciences",
      "Journalism, mass communication and digital-media degrees",
      "BCA or information-systems programmes where the college accepts this mix — verify eligibility",
      "Law after the relevant undergraduate path",
    ],
    professional: ["Law and civil-services routes later, subject to each exam’s rules", "Digital-media or IT diplomas after Class 12"],
    careers: [
      "Media and communications",
      "Government and social-sector roles after further study",
      "Teaching and research",
      "Digital operations roles where computing plus social-science literacy helps",
    ],
    advantages: [
      "Keeps History, Geography and Economics with a Computer Applications paper",
      "Useful if the school does not offer Political Science as the fourth humanities subject",
    ],
    cautions: [
      "Political Science is not in this combination — 2804 is the Political Science option in this guide",
      "BCA / IT degree eligibility depends on the university, not on the group name alone",
      "Confirm the school offers 2802",
    ],
    bestSuited: "Humanities + digital skills + social sciences",
    bestSuitedTa: "மனிதவியல் + கணினி + சமூக அறிவியல்",
    seoTitle: "TN Plus Two group 2802 — Humanities + Computer Applications",
    seoDescription:
      "Tamil Nadu Higher Secondary group 2802: Geography, History, Economics and Computer Applications. Six exam papers and how it differs from group 2804.",
  },
];

export const HSE_GROUP_CODES = HSE_GROUPS.map((g) => g.code);

export function getHseGroup(code: string): HseGroup | undefined {
  return HSE_GROUPS.find((g) => g.code === code);
}

export function hseExamList(group: HseGroup): HseSubject[] {
  return [...HSE_LANGUAGE_PAPERS, ...group.cores];
}

export function siblingGroups(code: string): HseGroup[] {
  return HSE_GROUPS.filter((g) => g.code !== code);
}

export function groupHref(code: string): string {
  return educationGroupPath(code);
}
