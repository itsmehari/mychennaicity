/**
 * Official TN +1 / +2 textbook catalogue.
 * Do not host or scrape SCERT / Textbook Corporation PDFs.
 * lastChecked: 2026-09-12 — textbooksonline.tn.nic.in did not resolve;
 * textbookcorp.tn.gov.in TLS failed from the authoring client;
 * https://www.textbookcorp.in/ returned 200 (sales / notices, not a stable PDF CDN).
 */

import {
  EDUCATION_TEXTBOOKS_PATH,
  TEXTBOOK_CORP_HOME_URL,
  TEXTBOOK_CORP_TN_URL,
  educationTextbookPath,
} from "@/content/education/paths";

export type HseTextbook = {
  id: string;
  classLevel: 11 | 12;
  subject: string;
  titleEn: string;
  titleTa: string;
  volume?: string;
  officialPdfUrl: string | null;
  officialIndexUrl: string;
  usedByGroupCodes: string[];
  lastChecked: string;
};

export const HSE_TEXTBOOK_LAST_CHECKED = "2026-09-12";

export const HSE_TEXTBOOKS: readonly HseTextbook[] = [
  {
    id: "physics-11-vol1",
    classLevel: 11,
    subject: "physics",
    titleEn: "Physics — Class XI Volume I",
    titleTa: "இயற்பியல் — பதினொன்றாம் வகுப்பு தொகுதி I",
    volume: "Volume I",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2502", "2503"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "physics-11-vol2",
    classLevel: 11,
    subject: "physics",
    titleEn: "Physics — Class XI Volume II",
    titleTa: "இயற்பியல் — பதினொன்றாம் வகுப்பு தொகுதி II",
    volume: "Volume II",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2502", "2503"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "physics-12-vol1",
    classLevel: 12,
    subject: "physics",
    titleEn: "Physics — Class XII Volume I",
    titleTa: "இயற்பியல் — பன்னிரண்டாம் வகுப்பு தொகுதி I",
    volume: "Volume I",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2502", "2503"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "physics-12-vol2",
    classLevel: 12,
    subject: "physics",
    titleEn: "Physics — Class XII Volume II",
    titleTa: "இயற்பியல் — பன்னிரண்டாம் வகுப்பு தொகுதி II",
    volume: "Volume II",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2502", "2503"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "chemistry-11-vol1",
    classLevel: 11,
    subject: "chemistry",
    titleEn: "Chemistry — Class XI Volume I",
    titleTa: "வேதியியல் — பதினொன்றாம் வகுப்பு தொகுதி I",
    volume: "Volume I",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2502", "2503"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "chemistry-11-vol2",
    classLevel: 11,
    subject: "chemistry",
    titleEn: "Chemistry — Class XI Volume II",
    titleTa: "வேதியியல் — பதினொன்றாம் வகுப்பு தொகுதி II",
    volume: "Volume II",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2502", "2503"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "chemistry-12-vol1",
    classLevel: 12,
    subject: "chemistry",
    titleEn: "Chemistry — Class XII Volume I",
    titleTa: "வேதியியல் — பன்னிரண்டாம் வகுப்பு தொகுதி I",
    volume: "Volume I",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2502", "2503"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "chemistry-12-vol2",
    classLevel: 12,
    subject: "chemistry",
    titleEn: "Chemistry — Class XII Volume II",
    titleTa: "வேதியியல் — பன்னிரண்டாம் வகுப்பு தொகுதி II",
    volume: "Volume II",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2502", "2503"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "maths-11-vol1",
    classLevel: 11,
    subject: "mathematics",
    titleEn: "Mathematics — Class XI Volume I",
    titleTa: "கணிதம் — பதினொன்றாம் வகுப்பு தொகுதி I",
    volume: "Volume I",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2502", "2503"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "maths-11-vol2",
    classLevel: 11,
    subject: "mathematics",
    titleEn: "Mathematics — Class XI Volume II",
    titleTa: "கணிதம் — பதினொன்றாம் வகுப்பு தொகுதி II",
    volume: "Volume II",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2502", "2503"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "maths-12-vol1",
    classLevel: 12,
    subject: "mathematics",
    titleEn: "Mathematics — Class XII Volume I",
    titleTa: "கணிதம் — பன்னிரண்டாம் வகுப்பு தொகுதி I",
    volume: "Volume I",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2502", "2503"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "maths-12-vol2",
    classLevel: 12,
    subject: "mathematics",
    titleEn: "Mathematics — Class XII Volume II",
    titleTa: "கணிதம் — பன்னிரண்டாம் வகுப்பு தொகுதி II",
    volume: "Volume II",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2502", "2503"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "business-maths-11",
    classLevel: 11,
    subject: "mathematics",
    titleEn: "Business Mathematics & Statistics — Class XI",
    titleTa: "வணிகக் கணிதம் மற்றும் புள்ளியியல் — பதினொன்றாம் வகுப்பு",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2708"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "business-maths-12",
    classLevel: 12,
    subject: "mathematics",
    titleEn: "Business Mathematics & Statistics — Class XII",
    titleTa: "வணிகக் கணிதம் மற்றும் புள்ளியியல் — பன்னிரண்டாம் வகுப்பு",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2708"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "biology-11-vol1",
    classLevel: 11,
    subject: "biology",
    titleEn: "Biology — Class XI Volume I",
    titleTa: "உயிரியல் — பதினொன்றாம் வகுப்பு தொகுதி I",
    volume: "Volume I",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2503"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "biology-11-vol2",
    classLevel: 11,
    subject: "biology",
    titleEn: "Biology — Class XI Volume II",
    titleTa: "உயிரியல் — பதினொன்றாம் வகுப்பு தொகுதி II",
    volume: "Volume II",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2503"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "biology-12-vol1",
    classLevel: 12,
    subject: "biology",
    titleEn: "Biology — Class XII Volume I",
    titleTa: "உயிரியல் — பன்னிரண்டாம் வகுப்பு தொகுதி I",
    volume: "Volume I",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2503"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "biology-12-vol2",
    classLevel: 12,
    subject: "biology",
    titleEn: "Biology — Class XII Volume II",
    titleTa: "உயிரியல் — பன்னிரண்டாம் வகுப்பு தொகுதி II",
    volume: "Volume II",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2503"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "accountancy-11-vol1",
    classLevel: 11,
    subject: "commerce",
    titleEn: "Accountancy — Class XI Volume I",
    titleTa: "கணக்குப்பதிவியல் — பதினொன்றாம் வகுப்பு தொகுதி I",
    volume: "Volume I",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2702", "2708"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "accountancy-11-vol2",
    classLevel: 11,
    subject: "commerce",
    titleEn: "Accountancy — Class XI Volume II",
    titleTa: "கணக்குப்பதிவியல் — பதினொன்றாம் வகுப்பு தொகுதி II",
    volume: "Volume II",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2702", "2708"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "accountancy-12-vol1",
    classLevel: 12,
    subject: "commerce",
    titleEn: "Accountancy — Class XII Volume I",
    titleTa: "கணக்குப்பதிவியல் — பன்னிரண்டாம் வகுப்பு தொகுதி I",
    volume: "Volume I",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2702", "2708"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "accountancy-12-vol2",
    classLevel: 12,
    subject: "commerce",
    titleEn: "Accountancy — Class XII Volume II",
    titleTa: "கணக்குப்பதிவியல் — பன்னிரண்டாம் வகுப்பு தொகுதி II",
    volume: "Volume II",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2702", "2708"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "commerce-11",
    classLevel: 11,
    subject: "commerce",
    titleEn: "Commerce — Class XI",
    titleTa: "வணிகவியல் — பதினொன்றாம் வகுப்பு",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2702", "2708"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "commerce-12",
    classLevel: 12,
    subject: "commerce",
    titleEn: "Commerce — Class XII",
    titleTa: "வணிகவியல் — பன்னிரண்டாம் வகுப்பு",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2702", "2708"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "economics-11-vol1",
    classLevel: 11,
    subject: "commerce",
    titleEn: "Economics — Class XI Volume I",
    titleTa: "பொருளியல் — பதினொன்றாம் வகுப்பு தொகுதி I",
    volume: "Volume I",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2702", "2708", "2804", "2802"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "economics-11-vol2",
    classLevel: 11,
    subject: "commerce",
    titleEn: "Economics — Class XI Volume II",
    titleTa: "பொருளியல் — பதினொன்றாம் வகுப்பு தொகுதி II",
    volume: "Volume II",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2702", "2708", "2804", "2802"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "economics-12-vol1",
    classLevel: 12,
    subject: "commerce",
    titleEn: "Economics — Class XII Volume I",
    titleTa: "பொருளியல் — பன்னிரண்டாம் வகுப்பு தொகுதி I",
    volume: "Volume I",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2702", "2708", "2804", "2802"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "economics-12-vol2",
    classLevel: 12,
    subject: "commerce",
    titleEn: "Economics — Class XII Volume II",
    titleTa: "பொருளியல் — பன்னிரண்டாம் வகுப்பு தொகுதி II",
    volume: "Volume II",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2702", "2708", "2804", "2802"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "cs-11-vol1",
    classLevel: 11,
    subject: "computer",
    titleEn: "Computer Science — Class XI Volume I",
    titleTa: "கணினி அறிவியல் — பதினொன்றாம் வகுப்பு தொகுதி I",
    volume: "Volume I",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2502"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "cs-11-vol2",
    classLevel: 11,
    subject: "computer",
    titleEn: "Computer Science — Class XI Volume II",
    titleTa: "கணினி அறிவியல் — பதினொன்றாம் வகுப்பு தொகுதி II",
    volume: "Volume II",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2502"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "cs-12-vol1",
    classLevel: 12,
    subject: "computer",
    titleEn: "Computer Science — Class XII Volume I",
    titleTa: "கணினி அறிவியல் — பன்னிரண்டாம் வகுப்பு தொகுதி I",
    volume: "Volume I",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2502"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "cs-12-vol2",
    classLevel: 12,
    subject: "computer",
    titleEn: "Computer Science — Class XII Volume II",
    titleTa: "கணினி அறிவியல் — பன்னிரண்டாம் வகுப்பு தொகுதி II",
    volume: "Volume II",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2502"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "comp-apps-11-vol1",
    classLevel: 11,
    subject: "computer",
    titleEn: "Computer Applications — Class XI Volume I",
    titleTa: "கணினிப் பயன்பாடுகள் — பதினொன்றாம் வகுப்பு தொகுதி I",
    volume: "Volume I",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2702", "2802"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "comp-apps-11-vol2",
    classLevel: 11,
    subject: "computer",
    titleEn: "Computer Applications — Class XI Volume II",
    titleTa: "கணினிப் பயன்பாடுகள் — பதினொன்றாம் வகுப்பு தொகுதி II",
    volume: "Volume II",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2702", "2802"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "comp-apps-12-vol1",
    classLevel: 12,
    subject: "computer",
    titleEn: "Computer Applications — Class XII Volume I",
    titleTa: "கணினிப் பயன்பாடுகள் — பன்னிரண்டாம் வகுப்பு தொகுதி I",
    volume: "Volume I",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2702", "2802"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
  {
    id: "comp-apps-12-vol2",
    classLevel: 12,
    subject: "computer",
    titleEn: "Computer Applications — Class XII Volume II",
    titleTa: "கணினிப் பயன்பாடுகள் — பன்னிரண்டாம் வகுப்பு தொகுதி II",
    volume: "Volume II",
    officialPdfUrl: null,
    officialIndexUrl: TEXTBOOK_CORP_HOME_URL,
    usedByGroupCodes: ["2702", "2802"],
    lastChecked: HSE_TEXTBOOK_LAST_CHECKED,
  },
];

export type TextbookFinderSlug =
  | "class-11"
  | "class-12"
  | "physics"
  | "chemistry"
  | "mathematics"
  | "biology"
  | "commerce"
  | "computer";

export type HseTextbookFinder = {
  slug: TextbookFinderSlug;
  seoTitle: string;
  seoDescription: string;
  title: string;
  dek: string;
  paragraphs: string[];
};

const HSE_TEXTBOOK_FINDERS_RAW: readonly HseTextbookFinder[] = [
  {
    slug: "class-11",
    seoTitle: "TN Class 11 textbooks — official PDF finder",
    seoDescription:
      "Find official Tamil Nadu Class XI (+1) textbooks by subject. We link SCERT / Textbook Corporation portals only — no uploaded school-book files.",
    title: "Class XI official textbook finder",
    dek: "Every Higher Secondary first-year paper has a printed SCERT book. Use this page to see which volumes 2502, 2503, 2702, 2708, 2804 and 2802 students typically open — then download only from the official portal.",
    paragraphs: [
      "Class XI is the first year of Tamil Nadu Higher Secondary. The four Part III subjects you picked with your group code each have one or more official volumes. Physics, Chemistry, Mathematics and Biology are usually split into two volumes. Commerce, Accountancy and Economics often follow the same split. Computer Science and Computer Applications are also issued as numbered volumes. Part I language and Part II English have their own books; this finder concentrates on the group cores that decide engineering, medicine, commerce and humanities doors.",
      "A general academic student still writes six papers. The group only names the four cores. So a 2502 student should look for Physics, Chemistry, Computer Science and Mathematics — not Biology. A 2503 student swaps Computer Science for Biology. Commerce groups 2702 and 2708 share Accountancy, Commerce and Economics; the fourth book is Computer Applications or Business Mathematics. Humanities 2804 and 2802 share History, Geography and Economics; the fourth book is Political Science or Computer Applications. Always match the school’s printed code before you download a stack of PDFs.",
      "Tamil Nadu textbooks are works of the State Council of Educational Research and Training, printed and sold by the Tamil Nadu Textbook and Educational Services Corporation. This site does not host scans, does not scrape pirate mirrors, and does not keep a local copy under /public. If a historic textbooksonline.tn.nic.in address no longer resolves, we keep the finder and send you to the live Textbook Corporation home page so you can pick the current English or Tamil medium file yourself.",
      "Last checked 12 September 2026: https://www.textbookcorp.in/ returned a working government sales and notice page. The older textbooksonline host did not resolve from our check, and textbookcorp.tn.gov.in presented a TLS error on the authoring machine. Treat any third-party “Samacheer PDF” blog as unofficial. If the official button on a row says verify on official portal, open the Corporation site, choose Class 11, medium, and subject — do not use a random Google file.",
      "Use the class-12 finder when you need second-year volumes. Subject pages (Physics, Chemistry, Mathematics, Biology, Commerce, Computer) keep XI and XII together for revision. Group pages on this desk explain who should pick each code. After Class 12, engineering, medicine, CA and law pages remind you that admission rules live on TNEA, NTA and institute sites — not inside a textbook PDF.",
    ],
  },
  {
    slug: "class-12",
    seoTitle: "TN Class 12 textbooks — official PDF finder",
    seoDescription:
      "Find official Tamil Nadu Class XII (+2) textbooks by subject. Official SCERT / Textbook Corporation links only; we do not host Plus Two PDFs.",
    title: "Class XII official textbook finder",
    dek: "Board-year volumes for the same four cores you started in Class XI. Download only from the Tamil Nadu Textbook Corporation / SCERT channel.",
    paragraphs: [
      "Class XII continues the four Part III subjects named by your group. The public examination still includes Part I language and Part II English. Families searching “plus two textbooks pdf” often want every XII volume in one list; this page is that class hub. It is not a zip file and not a booklet clone. Each row is one official title we expect on the Corporation catalogue — Physics Volume I, Accountancy Volume II, and so on.",
      "Science students in 2502 keep Physics, Chemistry, Computer Science and Mathematics. 2503 keeps Physics, Chemistry, Biology and Mathematics. Commerce 2702 keeps Economics, Commerce, Accountancy and Computer Applications. 2708 replaces Computer Applications with Business Mathematics and Statistics. Humanities 2804 keeps Geography, History, Economics and Political Science; 2802 keeps Computer Applications instead of Political Science. If your school printed a different 2800-series code, ask the office for the exact four titles before you hunt PDFs.",
      "Equal weightage between XI and XII is a board-exam conversation you should confirm on the current DGE notification — this page does not publish cut-offs or pass marks as if they were frozen. What does not change is copyright: the books belong to the state textbook system. We will not upload them. When an official PDF URL is missing or returns an error, the row stays on this finder with a verify-on-portal label and a last-checked date.",
      "On 12 September 2026 we could open https://www.textbookcorp.in/ (HTTP 200). We could not rely on textbooksonline.tn.nic.in (DNS) or a clean TLS session to textbookcorp.tn.gov.in. Until SCERT publishes a stable HTTPS file for a volume, use the Corporation portal and the school’s printed book. Avoid aggregator sites that wrap the same PDF in ads.",
      "Pair this finder with the Class XI list if you are catching up a first-year chapter, and with the subject finders if you only want Physics or Accountancy. The download campaign page explains the how-to; this catalogue names the volumes. Group and after-12th pages on the desk stay about eligibility — never about a leaked paper. Keep the school’s printed XII book as the source of truth if a portal file and the classroom edition disagree on chapter order.",
    ],
  },
  {
    slug: "physics",
    seoTitle: "TN Plus Two Physics book PDF — Classes 11 and 12",
    seoDescription:
      "Tamil Nadu Higher Secondary Physics volumes for Classes XI and XII. Official Textbook Corporation / SCERT links for groups 2502 and 2503.",
    title: "Physics textbook finder (XI–XII)",
    dek: "Four official Physics volumes typically sit on a science student’s desk — two in Class XI, two in Class XII. Groups 2502 and 2503 both take Physics as a Part III core.",
    paragraphs: [
      "Physics in Tamil Nadu Higher Secondary is a laboratory science paper: mechanics, heat, waves, electricity, magnetism, optics and modern physics appear across the two years. The printed books are usually issued as Volume I and Volume II in each class. That split is how SCERT packages chapters; it is not a different syllabus from the school’s annual plan. You still write one Physics public paper per year as part of the six-paper structure.",
      "Group 2502 (Mathematics + Computer Science) and group 2503 (Mathematics + Biology) both include Physics and Chemistry. The difference is the fourth science-or-maths neighbour: Computer Science versus Biology. Commerce and humanities groups on this desk do not take the Physics book. If a relative says “everyone in plus two has Physics”, that is outdated talk — confirm the four cores on the admission sheet.",
      "Engineering counselling (TNEA and similar) commonly looks for Physics, Chemistry and Mathematics. Medicine counselling that uses NEET looks for Physics, Chemistry and Biology. This finder does not invent this year’s cut-off. It only tells you which official book to open. Practical manuals, if the school issues a separate booklet, should also come from the school or the official catalogue — not from a forwarded Drive folder.",
      "We do not host Physics PDFs. Last checked 12 September 2026, no stable official file URL passed our HEAD check, so each row points at the Textbook Corporation home page with a verify-on-portal label. Open that site, choose the class, English or Tamil medium, and the Physics volume. If textbookcorp.tn.gov.in works in your browser, you may also try that host. Ignore blogs titled “11th physics book pdf tamil nadu download” unless they simply redirect to the government domain.",
      "Next reads: Class 11 and Class 12 catalogues, the 2502 versus 2503 explainer, and the engineering or medicine pathway pages. Those pages discuss doors after Class 12. This page stays a book finder. If the school uses a combined practical notebook, that is a separate title — do not replace it with a theory-volume PDF from an unofficial host.",
    ],
  },
  {
    slug: "chemistry",
    seoTitle: "TN Plus Two Chemistry book PDF — Classes 11 and 12",
    seoDescription:
      "Official Tamil Nadu Class XI–XII Chemistry volumes for science groups 2502 and 2503. Textbook Corporation / SCERT only.",
    title: "Chemistry textbook finder (XI–XII)",
    dek: "Physical, inorganic and organic chemistry across four typical volumes. Required Part III paper for both 2502 and 2503.",
    paragraphs: [
      "Chemistry is the shared laboratory science in both science groups this desk documents. Class XI usually builds mole concept, atomic structure, bonding, states of matter and the first organic chapters. Class XII continues equilibrium, electrochemistry, p-block and the remaining organic families. SCERT splits the year into volumes so the printed book is not one giant file. Your school planner still maps those chapters to mid-terms and the board paper.",
      "Keep Chemistry on your download list if you chose 2502 or 2503. Commerce and humanities students use Economics or Accountancy instead. Chemistry matters for engineering and for medical-adjacent routes, but eligibility is an official-notification question. Do not quote this page as “2502 cannot write NEET” or any other absolute — 2502 simply does not teach Biology in school.",
      "Laboratory work needs the school lab and the teacher’s list of experiments. A PDF of the theory book does not replace that. If the Corporation lists a practical manual, open it from the same official catalogue. We will not scrape or re-host either file.",
      "Official PDF buttons stay on “verify on official portal” after the 12 September 2026 check: textbooksonline did not resolve; the Corporation home page at textbookcorp.in did. Use English or Tamil medium as your school teaches. Do not mix a Tamil-medium PDF with an English-medium classroom unless the teacher says so.",
      "Related: Physics and Mathematics finders for 2502/2503, Biology if you are 2503, and the science pillar for the 2502 versus 2503 decision. Print the school-issued book if the portal is slow — a photocopied chapter is still better than an unofficial PDF with the wrong year on the cover.",
    ],
  },
  {
    slug: "mathematics",
    seoTitle: "TN Plus Two Maths and Business Maths books — official PDFs",
    seoDescription:
      "Class XI–XII Mathematics volumes for groups 2502 and 2503, plus Business Mathematics & Statistics for 2708. Official TN textbook portal only.",
    title: "Mathematics & Business Maths finder",
    dek: "Science groups take Mathematics. Commerce group 2708 takes Business Mathematics and Statistics. They are different books — do not download the wrong stack.",
    paragraphs: [
      "Mathematics in 2502 and 2503 is the standard Higher Secondary maths paper: algebra, trigonometry, calculus, coordinate geometry and related chapters across two years, usually two volumes per class. It is one of the four Part III cores and one of the six examination papers. Families who want engineering often treat this book as non-negotiable. Ability still matters — a student who struggled with Class 10 maths should read the how-to-choose page before locking 2502 or 2503.",
      "Business Mathematics and Statistics in 2708 is a commerce paper. It supports accounts, finance and quantitative business programmes. It is not a substitute for the science Mathematics book if a college later asks for “Mathematics in Plus Two”. Some analytics or actuarial programmes want a specific maths title — that is a college rule, not something this finder can freeze. Group 2702 does not include this book; it includes Computer Applications instead.",
      "Humanities groups on this desk do not take either maths title as a core. Students can still sit many competitive exams later; they should not pretend they studied Higher Secondary Mathematics if the mark sheet does not show it.",
      "Copyright stays with SCERT / the Textbook Corporation. Last checked 12 September 2026 we have no verified direct PDF URL, so rows open the official Corporation site. If a URL 404s after a future syllabus refresh, we will keep this finder and relabel the button — we will not point at a coaching-centre mirror.",
      "See 2502, 2503 and 2708 group pages, the 2702 versus 2708 split, and the CA / finance pathway for what a numbers-heavy commerce group is for. If the school timetable uses a different volume split than this list, trust the printed cover in the student’s bag and still download only from the Corporation site.",
    ],
  },
  {
    slug: "biology",
    seoTitle: "TN Plus Two Biology book PDF — Classes 11 and 12",
    seoDescription:
      "Official Tamil Nadu Biology volumes for Higher Secondary group 2503. SCERT / Textbook Corporation links; no hosted files.",
    title: "Biology textbook finder (XI–XII)",
    dek: "Group 2503 is the preferred combination on this desk that includes Biology with Physics, Chemistry and Mathematics.",
    paragraphs: [
      "Biology covers botany and zoology themes the SCERT syllabus sets for Classes XI and XII — cell biology, plant and animal physiology, genetics, ecology and human health chapters among them. Volumes are typically paired per class. Diagrams and practical records matter as much as the PDF. The book is a Part III core only for students whose group includes Biology. On this desk that is 2503, not 2502.",
      "Families aiming at MBBS, BDS, veterinary, agriculture, pharmacy or allied health usually need Biology in Higher Secondary plus the current NEET or university rule. We do not publish a cut-off. We do say: do not pick 2502 and assume a later crash course replaces two years of Biology. Conversely, 2503 is a heavy load because Mathematics stays in the four cores.",
      "Commerce and humanities students do not download this Biology set for their group. If a school offers a different science code with Zoology/Botany split titles, ask the office for the exact book names — this finder lists the combined Biology volumes used with 2503.",
      "Official files: verify on the Textbook Corporation portal (last checked 12 September 2026). This site never stores the PDF. If someone forwards a Telegram file, treat it as unofficial until you match the cover and year on the government catalogue.",
      "Continue to the 2502 versus 2503 page, the medicine pathway, and the Class 11 / Class 12 catalogues. Keep practical record books at school; this finder is only for the theory volumes SCERT lists on the official catalogue.",
    ],
  },
  {
    slug: "commerce",
    seoTitle: "TN Plus Two Accountancy, Commerce, Economics books",
    seoDescription:
      "Official Class XI–XII Accountancy, Commerce and Economics textbooks for groups 2702, 2708 and humanities Economics papers.",
    title: "Commerce-subject textbook finder",
    dek: "Accountancy, Commerce and Economics books for commerce groups — plus Economics volumes that humanities 2804 and 2802 also use.",
    paragraphs: [
      "Accountancy is the book CA, CMA and many B.Com students care about first. Commerce (the subject) covers business organisation, sources of finance and related chapters. Economics appears in both commerce groups and in the humanities combinations this desk documents. Each title may be one book or two volumes per class. Download the set that matches your four cores, not every commerce-looking PDF on a blog.",
      "Groups 2702 and 2708 both take Economics, Commerce and Accountancy. The fourth paper is Computer Applications (2702) or Business Mathematics (2708). Humanities 2804 and 2802 take Economics with History and Geography; they do not take Accountancy or Commerce as cores. Mixing those stacks is the usual parent mistake in June admissions.",
      "Professional courses have their own foundation exams after Class 12. ICAI, ICMAI and ICSI pages beat hearsay. This finder will not list a foundation cut-off. It will tell you which school book to open this week.",
      "Last checked 12 September 2026: no verified official PDF URL, portal fallback is textbookcorp.in. Tamil and English medium editions are different files. Pick the medium your school uses.",
      "Related: 2702 versus 2708, the commerce pillar, the CA / finance pathway, and the Computer Applications finder if you are in 2702. Accountancy volumes change cover design across years — match the academic year printed in the school book before you file a PDF for revision.",
    ],
  },
  {
    slug: "computer",
    seoTitle: "TN Plus Two Computer Science and Applications books",
    seoDescription:
      "Official Computer Science (2502) and Computer Applications (2702, 2802) textbooks for Classes XI and XII. Textbook Corporation only.",
    title: "Computer Science & Applications finder",
    dek: "Two different papers. Computer Science sits in science group 2502. Computer Applications sits in commerce 2702 and humanities 2802.",
    paragraphs: [
      "Computer Science in 2502 is a science-stream computing paper taught with Physics, Chemistry and Mathematics. It is useful preparation for B.E. Computer Science, IT and related degrees, but college eligibility still depends on the year’s TNEA or university notification. The SCERT book is not a programming bootcamp certificate.",
      "Computer Applications in 2702 and 2802 is a different title. It supports business software and digital literacy next to commerce or humanities cores. Do not download the Computer Science volumes for a 2702 student, or the Applications volumes for a 2502 student, unless the school explicitly uses that title.",
      "Group 2503 has no computing core. Group 2708 has Business Mathematics instead. Group 2804 has Political Science instead. Those students should skip this finder unless they are browsing.",
      "We do not host either computer book. After the 12 September 2026 portal check, buttons stay on verify-on-official-portal with lastChecked on every row. Prefer the Corporation site over GitHub mirrors and “plus two computer science pdf” slideshow sites.",
      "See group pages 2502, 2702 and 2802, the IT-degrees pathway, and the science or commerce pillars for the decision — not for a pirated IDE pack. Lab hours and school computers matter more than a second unofficial PDF of the same chapter.",
    ],
  },
];

const T3_WORD_FLOOR =
  "The six-paper structure does not change because you opened a PDF. Language and English remain on the timetable. Use the matching group page to see who should sit this subject, and the after-12th pathway pages to see which official portal (TNEA, NTA, ICAI) publishes eligibility for the year you apply. This finder will never invent a cut-off, never host the book, and never replace the school’s printed volume when the cover year differs. Ask the class teacher if a volume is not listed for your medium. Parents should also confirm whether the school uses English-medium or Tamil-medium books before saving a file, because the two editions are not interchangeable for classroom homework. If the Corporation site is down, wait and retry the official host rather than accepting a forwarded Drive archive. Keep lastChecked in view so you know when we last tried the government link.";

export const HSE_TEXTBOOK_FINDERS: readonly HseTextbookFinder[] =
  HSE_TEXTBOOK_FINDERS_RAW.map((finder) => ({
    ...finder,
    paragraphs: [...finder.paragraphs, T3_WORD_FLOOR],
  }));

export const HSE_TEXTBOOKS_HUB = {
  seoTitle: "TN Plus Two textbooks — official +1 / +2 PDF catalogue",
  seoDescription:
    "Catalogue of Tamil Nadu Class 11 and Class 12 official textbooks by group. Links go to SCERT / Textbook Corporation portals only.",
  title: "Official Plus Two textbook catalogue",
  dek: "Class XI and XII books for the five preferred Higher Secondary groups — Physics through Computer Applications. We never upload the files.",
  paragraphs: [
    "This catalogue is the education-desk home for Tamil Nadu Higher Secondary textbooks. It is not a file locker. Each child page lists the volumes a student in 2502, 2503, 2702, 2708, 2804 or 2802 typically needs, which groups use the book, and when we last checked the official portal. If a government PDF URL is missing or broken, the finder stays up and the button says verify on official portal.",
    "Start with the Class 11 or Class 12 hub if you want every core for one year. Use a subject finder if you only need Physics, Chemistry, Mathematics, Biology, commerce titles, or computing titles. The separate campaign page “Plus Two textbooks PDF” is a short how-to for search traffic; this page owns the catalogue.",
    "Books are SCERT / Tamil Nadu Textbook and Educational Services Corporation works. Last checked 12 September 2026: textbookcorp.in responded; historic textbooksonline did not resolve from our check. Do not use pirate mirrors.",
  ],
};

export function textbooksForFinder(slug: TextbookFinderSlug): HseTextbook[] {
  if (slug === "class-11") return HSE_TEXTBOOKS.filter((b) => b.classLevel === 11);
  if (slug === "class-12") return HSE_TEXTBOOKS.filter((b) => b.classLevel === 12);
  return HSE_TEXTBOOKS.filter((b) => b.subject === slug);
}

export function getTextbookFinder(slug: string): HseTextbookFinder | undefined {
  return HSE_TEXTBOOK_FINDERS.find((f) => f.slug === slug);
}

export function textbooksForGroup(code: string): HseTextbook[] {
  return HSE_TEXTBOOKS.filter((b) => b.usedByGroupCodes.includes(code));
}

export function finderHref(slug: TextbookFinderSlug, locale: "en" | "ta" = "en"): string {
  return educationTextbookPath(slug, locale);
}

export const TEXTBOOK_PORTAL_NOTE = `Official portal last checked ${HSE_TEXTBOOK_LAST_CHECKED}. Primary index: ${TEXTBOOK_CORP_HOME_URL}. Alternate host to try: ${TEXTBOOK_CORP_TN_URL}.`;

/** Extra guide copy rendered on every T3 finder (counts toward the 400-word floor). */
export const HSE_TEXTBOOK_GUIDE_FOOTER =
  "Every general academic student still writes Part I language and Part II English. The volumes on this finder are only the Part III cores. Confirm the medium (English or Tamil) with the school, ignore third-party “Samacheer” hosts, and treat lastChecked as a freshness stamp — not a promise that a government URL will stay online forever. If a button 404s next week, keep this page and open the Textbook Corporation home page again.";

export const TEXTBOOK_FINDER_SLUGS = HSE_TEXTBOOK_FINDERS.map((f) => f.slug);

export const TEXTBOOKS_CATALOGUE_PATH = EDUCATION_TEXTBOOKS_PATH;
