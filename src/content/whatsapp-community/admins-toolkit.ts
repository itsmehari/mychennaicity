import {
  WHATSAPP_ADMINS_TOOLKIT_PATH,
  WHATSAPP_COMMUNITY_GUIDE_PATH,
  WHATSAPP_COMMUNITY_PAGE_PATH,
  WHATSAPP_SPAMMERS_PAGE_PATH,
} from "@/lib/whatsapp-community";

export { WHATSAPP_ADMINS_TOOLKIT_PATH };

export const WA_ADMIN_PLAYBOOK = [
  {
    title: "Turn on admin approval for joins",
    body: "Invite-link floods are the #1 spam pattern. Require admin approval on every join request.",
  },
  {
    title: "Screenshot before you reject",
    body: "Capture profile name + number. Share with neighbour admins via our spammers list workflow.",
  },
  {
    title: "Pin community rules",
    body: "No forwards of unverified crime/medical rumours; no political spam; no job-scam PDFs.",
  },
  {
    title: "Separate announce vs chat",
    body: "If your apartment group is noisy, run a small announce-only channel for GCC/Metro alerts.",
  },
  {
    title: "Never click strange payment links",
    body: "Admins are high-value targets. Confirm bank details offline for society collections.",
  },
];

export const WA_ADMIN_LINKS = [
  { href: WHATSAPP_SPAMMERS_PAGE_PATH, label: "Flagged spam numbers (admins)" },
  { href: WHATSAPP_COMMUNITY_GUIDE_PATH, label: "WhatsApp community SEO / join guide" },
  { href: WHATSAPP_COMMUNITY_PAGE_PATH, label: "Join mychennaicity WhatsApp group" },
  { href: "/contact#news", label: "Tip us a neighbourhood scam pattern" },
];
