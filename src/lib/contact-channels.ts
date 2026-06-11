import type { BusinessWhatsAppCtaVariant } from "@/lib/whatsapp-cta-copy";

export type ContactChannel = {
  id: string;
  title: string;
  body: string;
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
    title: "Story tips & corrections",
    body: "Spotted civic works, consumer issues, or a human story we should cover? Send dates, locations, and links to primary sources.",
    hub: { href: "/editorial-standards", label: "How we handle mistakes" },
    whatsappVariant: "news",
    emailSubject: "Chennai story tip",
  },
  {
    id: "jobs",
    title: "Jobs in Chennai",
    body: "Hiring locally or need a listing fixed? Tell us the role, company, area, and where candidates should apply.",
    hub: { href: "/chennai-jobs", label: "Browse open roles" },
    whatsappVariant: "jobs",
    emailSubject: "Chennai job listing",
  },
  {
    id: "events",
    title: "Local events",
    body: "Festival, meetup, or neighbourhood calendar item — share what, when, and where readers should confirm.",
    hub: { href: "/chennai-local-events", label: "See what’s on" },
    whatsappVariant: "events",
    emailSubject: "Chennai event listing",
  },
  {
    id: "directory",
    title: "Directory & listings",
    body: "School, clinic, studio, or neighbourhood spot that belongs in the Chennai directory — name, area, and one line on why it matters.",
    hub: { href: "/directory", label: "Explore directory" },
    whatsappVariant: "directory",
    emailSubject: "Chennai directory listing",
  },
  {
    id: "advertise",
    title: "Advertising & partnerships",
    body: "Sponsorships, branded placements, or editorial partnerships for Greater Chennai audiences — tell us your goal and timeline.",
    hub: { href: "/about", label: "About the site" },
    whatsappVariant: "default",
    emailSubject: "Advertising enquiry",
  },
  {
    id: "general",
    title: "Everything else",
    body: "Site feedback, privacy requests, or a question that does not fit the buckets above — we route it internally.",
    hub: { href: "/privacy", label: "Privacy policy" },
    whatsappVariant: "default",
    emailSubject: "General enquiry",
  },
];
