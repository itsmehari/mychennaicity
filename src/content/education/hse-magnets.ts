import type { HubAeoContent } from "@/content/aeo/hub-answers";
import type { EducationFaqItem } from "@/content/education/hse-faq";
import type { EducationLink } from "@/content/education/hse-pathways";
import {
  EDUCATION_CHOOSE_PATH,
  EDUCATION_HUB_PATH,
  EDUCATION_HUB_TA_PATH,
  EDUCATION_M1_PATH,
  EDUCATION_M1_TA_PATH,
  EDUCATION_M2_PATH,
  EDUCATION_M2_TA_PATH,
  EDUCATION_TEXTBOOKS_PATH,
  EDUCATION_WORKSHEET_PATH,
  TEXTBOOK_CORP_HOME_URL,
  educationClusterPath,
  educationGroupPath,
  educationTextbookPath,
} from "@/content/education/paths";

export type EducationMagnet = {
  id: "m1" | "m2";
  path: string;
  taPath: string;
  seoTitle: string;
  seoDescription: string;
  title: string;
  dek: string;
  crumb: string;
  related: EducationLink[];
  aeo: HubAeoContent;
  paragraphs: string[];
  ctas: EducationLink[];
  faq: EducationFaqItem[];
  faqFragment: string;
};

export const HSE_M1: EducationMagnet = {
  id: "m1",
  path: EDUCATION_M1_PATH,
  taPath: EDUCATION_M1_TA_PATH,
  seoTitle: "Class 11 groups in Chennai — admission-season guide",
  seoDescription:
    "Chennai families choosing a Class 11 / Plus One group: what schools actually offer, five DGE codes, and a parent worksheet. Statewide system explainer lives on the TN Plus Two hub.",
  title: "Class 11 group admission in Chennai",
  dek: "A Chennai-parent landing for admission season — not the statewide Higher Secondary manual. Use this page to start, then open the group guide and the worksheet.",
  crumb: "Class 11 in Chennai",
  related: [
    { href: EDUCATION_HUB_PATH, label: "Statewide group guide" },
    { href: EDUCATION_CHOOSE_PATH, label: "How to choose" },
    { href: EDUCATION_WORKSHEET_PATH, label: "Parent worksheet" },
  ],
  aeo: {
    id: "tn-plus-two-m1-aeo",
    eyebrow: "Chennai admission season",
    title: "Which Class 11 group in Chennai?",
    dek: "The school offer matters as much as the code you like on paper.",
    directAnswer:
      "Chennai Higher Secondary schools do not all offer every DGE group. After Class 10, ask the admitting campus for the current code and the four Part III subjects. This site documents 2502, 2503, 2702, 2708, 2804 and 2802. The statewide explainer is the TN Plus Two hub; this page is for Chennai families in admission season.",
    contextParagraphs: [
      "Fees, bus routes and lab facilities differ by neighbourhood. Confirm the printed group on the school form before you pay.",
    ],
    facts: [
      { term: "This page", definition: "Chennai families + school-offer reality." },
      { term: "The hub", definition: "Statewide HSE system and all five preferred codes." },
    ],
    disclaimer: "Not a Greater Chennai Corporation or DGE admission list.",
  },
  paragraphs: [
    "Search traffic for “class 11 admission Chennai” is about a local school decision. The Higher Secondary group is statewide; the seat is local. A Tambaram campus and an Adyar campus may not print the same codes.",
    "Do not treat this landing as a school directory. We do not list which Chennai school offers 2503. Call the office. Then use the five-group hub, the how-to-choose steps, and the ranking worksheet with the student in the room.",
    "WhatsApp forwards that rank “best groups in Chennai” by prestige are a poor substitute for interest, ability and eligibility. Science is not automatically superior. Commerce is not automatically easier. Humanities is not a dead end.",
  ],
  ctas: [
    { href: EDUCATION_HUB_PATH, label: "Open the five preferred groups" },
    { href: EDUCATION_CHOOSE_PATH, label: "Five checks before you pay fees" },
    { href: EDUCATION_WORKSHEET_PATH, label: "Student–parent ranking sheet" },
    { href: educationGroupPath("2502"), label: "Science: 2502" },
    { href: educationGroupPath("2503"), label: "Science: 2503" },
    { href: educationGroupPath("2702"), label: "Commerce: 2702" },
    { href: educationGroupPath("2708"), label: "Commerce: 2708" },
    { href: "/chennai-whatsapp-group", label: "Chennai WhatsApp community" },
  ],
  faq: [
    {
      q: "Does every Chennai school offer 2502 and 2503?",
      a: "No. Group availability is a campus decision. Ask for the current code and the four subjects in writing.",
    },
    {
      q: "Is this the same as the Plus Two group guide?",
      a: "No. That hub explains the statewide HSE system. This page is the Chennai admission-season door into that hub.",
    },
  ],
  faqFragment: "m1-faq",
};

export const HSE_M2: EducationMagnet = {
  id: "m2",
  path: EDUCATION_M2_PATH,
  taPath: EDUCATION_M2_TA_PATH,
  seoTitle: "Plus Two textbooks PDF — how to download official TN books",
  seoDescription:
    "How to download Tamil Nadu +1 / +2 textbooks as official PDFs. We do not host files. Use the Textbook Corporation portal, then the catalogue.",
  title: "How to download Plus Two textbooks (official PDF)",
  dek: "A short campaign page for the search “plus two textbooks pdf”. The full catalogue of volumes lives on the textbook pillar — this page is the how-to.",
  crumb: "Textbooks PDF",
  related: [
    { href: EDUCATION_TEXTBOOKS_PATH, label: "Full textbook catalogue" },
    { href: educationTextbookPath("class-11"), label: "Class 11 finder" },
    { href: educationTextbookPath("class-12"), label: "Class 12 finder" },
  ],
  aeo: {
    id: "tn-plus-two-m2-aeo",
    eyebrow: "Official downloads",
    title: "Where is the Plus Two textbook PDF?",
    dek: "On the government textbook portal — not as a file on this website.",
    directAnswer:
      "Tamil Nadu Class 11 and Class 12 textbooks are SCERT / Textbook Corporation works. Download them from the official Corporation portal. mychennaicity.in does not upload or scrape the books. Use our catalogue to see which volumes your group needs, then open the official site in a new tab.",
    contextParagraphs: [
      "If a historic textbooksonline link fails, keep using the finder pages. The button will say verify on official portal until a stable government PDF URL is confirmed.",
    ],
    facts: [
      { term: "This page", definition: "How to download — campaign landing." },
      { term: "The catalogue", definition: "/guides/tn-plus-two/textbooks lists volumes by class and subject." },
    ],
    disclaimer: "Never use a random “Samacheer PDF” host. Prefer textbookcorp.in.",
  },
  paragraphs: [
    "Step one: know your group code and four cores. Step two: open the class or subject finder. Step three: use the official portal button. Step four: pick English or Tamil medium to match the school.",
    "We last checked official hosts on 12 September 2026. textbookcorp.in responded. The older textbooksonline name did not resolve from our check. We will not substitute a coaching-blog URL.",
    "The catalogue page owns the list of volumes. This page exists so “plus two textbooks pdf” does not cannibalise that catalogue’s title.",
  ],
  ctas: [
    { href: EDUCATION_TEXTBOOKS_PATH, label: "Open the official catalogue" },
    { href: educationTextbookPath("class-11"), label: "Class 11 volumes" },
    { href: educationTextbookPath("class-12"), label: "Class 12 volumes" },
    { href: educationTextbookPath("physics"), label: "Physics" },
    { href: educationTextbookPath("chemistry"), label: "Chemistry" },
    { href: TEXTBOOK_CORP_HOME_URL, label: "Textbook Corporation (official)" },
  ],
  faq: [
    {
      q: "Can I download the PDF from mychennaicity.in?",
      a: "No. We only link the official portal. Hosting the book would copy a government textbook.",
    },
    {
      q: "Why do some buttons say verify on official portal?",
      a: "The government file URL was missing or failed a check. The finder stays; you complete the download on the Corporation site.",
    },
  ],
  faqFragment: "m2-faq",
};

export const HSE_M1_TA_LINKS: EducationLink[] = [
  { href: EDUCATION_HUB_TA_PATH, label: "ஐந்து குழுக்கள் (தமிழ்)" },
  { href: educationClusterPath("science", "ta"), label: "அறிவியல் மேடை" },
];
