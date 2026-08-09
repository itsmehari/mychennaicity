import type { BusinessWhatsAppCtaVariant } from "@/lib/whatsapp-cta-copy";

export type ContactChannelTone =
  | "news"
  | "jobs"
  | "events"
  | "directory"
  | "advertise"
  | "general";

export type ContactChannel = {
  id: string;
  /** Short chip label for the intent rail. */
  shortLabel: string;
  title: string;
  body: string;
  tone: ContactChannelTone;
  /** What to include so we can act faster. */
  checklist: string[];
  /** Primary button label when WhatsApp desk is available. */
  primaryLabel: string;
  /** Primary button when only email is available. */
  emailLabel: string;
  /** Hub or help page readers can browse first. */
  hub?: { href: string; label: string };
  /** WhatsApp desk prefill variant (business line). */
  whatsappVariant?: BusinessWhatsAppCtaVariant;
  /** Optional mailto subject when a public inbox exists. */
  emailSubject?: string;
};

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: "news",
    shortLabel: "Story tip",
    title: "Story tips & corrections",
    body: "Spotted civic works, consumer issues, or a human story we should cover? Send dates, locations, and links to primary sources.",
    tone: "news",
    checklist: [
      "What happened, and when",
      "Exact place / ward if you know it",
      "Links to GCC notices, photos, or court papers",
      "Your preferred contact if we need a follow-up",
    ],
    primaryLabel: "Tip the desk on WhatsApp",
    emailLabel: "Email a story tip",
    hub: { href: "/editorial-standards", label: "How we handle mistakes" },
    whatsappVariant: "news",
    emailSubject: "Chennai story tip",
  },
  {
    id: "jobs",
    shortLabel: "Post a job",
    title: "Jobs in Chennai",
    body: "Hiring locally or need a listing fixed? Tell us the role, company, area, and where candidates should apply.",
    tone: "jobs",
    checklist: [
      "Role title + company name",
      "Area / work mode (office, hybrid, remote)",
      "Apply link or email for candidates",
      "Salary range if you want it shown",
    ],
    primaryLabel: "Send job details on WhatsApp",
    emailLabel: "Email job details",
    hub: { href: "/chennai-jobs", label: "Browse open roles" },
    whatsappVariant: "jobs",
    emailSubject: "Chennai job listing",
  },
  {
    id: "events",
    shortLabel: "List an event",
    title: "Local events",
    body: "Festival, meetup, or neighbourhood calendar item — share what, when, and where readers should confirm.",
    tone: "events",
    checklist: [
      "Event name + one-line pitch",
      "Date, start time, and venue",
      "Ticket / RSVP link (or free entry note)",
      "Poster image URL if you have one",
    ],
    primaryLabel: "Share event on WhatsApp",
    emailLabel: "Email event details",
    hub: { href: "/chennai-local-events", label: "See what’s on" },
    whatsappVariant: "events",
    emailSubject: "Chennai event listing",
  },
  {
    id: "directory",
    shortLabel: "List a place",
    title: "Directory & listings",
    body: "School, clinic, studio, or neighbourhood spot that belongs in the Chennai directory — name, area, and one line on why it matters.",
    tone: "directory",
    checklist: [
      "Business or place name",
      "Neighbourhood / landmark",
      "Phone or website readers can verify",
      "One line on why locals care",
    ],
    primaryLabel: "Suggest a listing on WhatsApp",
    emailLabel: "Email a listing suggestion",
    hub: { href: "/directory", label: "Explore directory" },
    whatsappVariant: "directory",
    emailSubject: "Chennai directory listing",
  },
  {
    id: "advertise",
    shortLabel: "Advertise",
    title: "Advertising & partnerships",
    body: "Sponsorships, branded placements, or editorial partnerships for Greater Chennai audiences — tell us your goal and timeline.",
    tone: "advertise",
    checklist: [
      "Brand / organisation name",
      "Goal (awareness, hiring, leads)",
      "Budget band or package interest",
      "Preferred dates or campaign window",
    ],
    primaryLabel: "Message about advertising",
    emailLabel: "Email advertising enquiry",
    hub: { href: "/about", label: "About the site" },
    whatsappVariant: "default",
    emailSubject: "Advertising enquiry",
  },
  {
    id: "general",
    shortLabel: "Something else",
    title: "Everything else",
    body: "Site feedback, privacy requests, or a question that does not fit the buckets above — we route it internally.",
    tone: "general",
    checklist: [
      "One-line subject of your request",
      "Page URL if something is broken",
      "Privacy / data requests: say what you need removed",
    ],
    primaryLabel: "Message the team",
    emailLabel: "Email the team",
    hub: { href: "/privacy", label: "Privacy policy" },
    whatsappVariant: "default",
    emailSubject: "General enquiry",
  },
];
