import { compulsivePath } from "@/content/compulsive/index";

export const MOVED_CHECKLIST_PATH = compulsivePath("moved-checklist");

export const MOVED_CHECKLIST_STORAGE_KEY = "mcc-moved-chennai-v1";

export type ChecklistItem = {
  id: string;
  label: string;
  hint?: string;
};

export type ChecklistSection = {
  id: string;
  title: string;
  blurb: string;
  items: ChecklistItem[];
};

export const MOVED_CHECKLIST_SECTIONS: ChecklistSection[] = [
  {
    id: "eb",
    title: "EB / electricity",
    blurb: "Name transfer, online login, and summer AC reality.",
    items: [
      {
        id: "eb-name-transfer",
        label: "Start / track service connection name transfer",
        hint: "Keep sale/rent papers and ID ready; timelines vary.",
      },
      {
        id: "eb-portal-login",
        label: "Create TNPDCL / TNEB online login for the service number",
      },
      {
        id: "eb-meter-photo",
        label: "Photograph meter + service number for your records",
      },
      {
        id: "eb-summer-plan",
        label: "Note AC load vs last bill — plan summer habits early",
      },
    ],
  },
  {
    id: "water",
    title: "Water / Metro Water",
    blurb: "Sump, tanker habits, and complaint channels before peak summer.",
    items: [
      {
        id: "water-sump-check",
        label: "Confirm sump / overhead tank condition with landlord or society",
      },
      {
        id: "water-tanker-norm",
        label: "Ask neighbours about tanker frequency and trusted vendors",
      },
      {
        id: "water-metro-login",
        label: "Bookmark CMWSSB / Metro Water self-service if applicable",
      },
      {
        id: "water-filter",
        label: "Decide RO / filter servicing schedule for the new flat",
      },
    ],
  },
  {
    id: "ration",
    title: "Ration / address proofs",
    blurb: "Cards, address updates, and document folder hygiene.",
    items: [
      {
        id: "ration-card-update",
        label: "Update ration card address if your household needs it",
      },
      {
        id: "ration-docs-folder",
        label: "Keep rent agreement + EB bill copies in one cloud folder",
      },
      {
        id: "ration-gas",
        label: "Transfer / book LPG connection and note distributor number",
      },
    ],
  },
  {
    id: "school",
    title: "School / kids logistics",
    blurb: "Skip if not applicable — otherwise start early.",
    items: [
      {
        id: "school-shortlist",
        label: "Shortlist schools by commute at drop-off time (not noon)",
      },
      {
        id: "school-docs",
        label: "Gather TC, birth certificate, and address proofs for admissions",
      },
      {
        id: "school-van",
        label: "Ask society parents about van / carpool norms",
      },
    ],
  },
  {
    id: "whatsapp",
    title: "WhatsApp neighbourhood layer",
    blurb: "Society, street, and admin-vetted city groups — carefully.",
    items: [
      {
        id: "wa-society",
        label: "Join society / apartment official group (ask admin, don’t spam)",
      },
      {
        id: "wa-street",
        label: "Find street / block group for water, power, and security alerts",
      },
      {
        id: "wa-admins-page",
        label: "Read mychennaicity WhatsApp admin tips before joining random invites",
      },
      {
        id: "wa-mute",
        label: "Mute aggressively — keep alerts, drop forward chaos",
      },
    ],
  },
  {
    id: "gcc-apps",
    title: "GCC / civic apps",
    blurb: "Complaints, property tax, and ward awareness.",
    items: [
      {
        id: "gcc-app-install",
        label: "Install / bookmark official GCC digital services you need",
      },
      {
        id: "gcc-ward",
        label: "Note your zone / ward (and that boundaries can reorganise)",
      },
      {
        id: "gcc-civic-tools",
        label: "Try mychennaicity civic tools for address / responsibility routing",
      },
      {
        id: "gcc-waste",
        label: "Learn local waste segregation / collection timing for your street",
      },
    ],
  },
  {
    id: "hospitals",
    title: "Hospitals / emergencies",
    blurb: "Know the nearest options before you need them at 2am.",
    items: [
      {
        id: "hosp-nearest",
        label: "Save nearest 24×7 hospital + clinic pins offline",
      },
      {
        id: "hosp-pharmacy",
        label: "Locate a reliable late-night pharmacy on your corridor",
      },
      {
        id: "hosp-insurance",
        label: "Confirm cashless hospital list for your insurance (if any)",
      },
      {
        id: "hosp-ambulance",
        label: "Save emergency numbers your household will actually dial",
      },
    ],
  },
];

export const MOVED_CHECKLIST_FAQ = [
  {
    q: "Does this replace official portals?",
    a: "No. It is a resident planning checklist. Name transfers, ration updates, and complaints still happen on official GCC / utility channels.",
  },
  {
    q: "Where is my progress stored?",
    a: "In this browser via localStorage (key mcc-moved-chennai-v1). Clearing site data resets ticks — it is not synced to an account.",
  },
];
