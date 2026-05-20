export type BusinessWhatsAppCtaVariant =
  | "home"
  | "jobs"
  | "directory"
  | "events"
  | "news"
  | "default";

export type BusinessWhatsAppCopy = {
  title: string;
  body: string;
  buttonWhatsApp: string;
  buttonFallback: string;
  /** Optional wa.me prefill (server adds via `?text=` on `/api/contact/whatsapp`). */
  prefill?: string;
};

const copy: Record<BusinessWhatsAppCtaVariant, BusinessWhatsAppCopy> = {
  home: {
    title: "Community and listings",
    body: "For neighbourhood tips, listings, or a quick question about what we cover in Chennai, send a message — we read everything, even if we cannot reply instantly.",
    buttonWhatsApp: "Message us on WhatsApp",
    buttonFallback: "Contact page",
    prefill: "Hi — writing from mychennaicity.in about a Chennai listing or community question.",
  },
  jobs: {
    title: "Post a Chennai job on the site",
    body: "Hiring in Chennai and want a checked listing here? Tell us the role, company, and where candidates should apply — we will confirm before it goes live.",
    buttonWhatsApp: "Message us on WhatsApp",
    buttonFallback: "Contact page",
    prefill: "Hi — I would like to post a Chennai job listing on mychennaicity.in.",
  },
  directory: {
    title: "List a place or business",
    body: "School, clinic, studio, or neighbourhood spot — if it belongs in the Chennai directory, send the name, area, and one line on why readers should care.",
    buttonWhatsApp: "Message us on WhatsApp",
    buttonFallback: "Contact page",
    prefill: "Hi — I would like to suggest a directory listing on mychennaicity.in (Chennai).",
  },
  events: {
    title: "List an event",
    body: "Festival date, meetup, or civic calendar item — share what, when, and where readers should confirm. We prioritise verifiable on-the-ground Chennai listings.",
    buttonWhatsApp: "Message us on WhatsApp",
    buttonFallback: "Contact page",
    prefill: "Hi — I would like to suggest a Chennai event listing on mychennaicity.in.",
  },
  news: {
    title: "Tip the Chennai desk",
    body: "Spotted something we should look at — safety, civic works, consumer rip-offs, or a human story? A short message is enough; links and dates help.",
    buttonWhatsApp: "Message us on WhatsApp",
    buttonFallback: "Contact page",
    prefill: "Hi — story tip for mychennaicity.in (Chennai): ",
  },
  default: {
    title: "Reach the team",
    body: "Questions about coverage, corrections, or working with us — send a short message and we will route it to the right person.",
    buttonWhatsApp: "Message us on WhatsApp",
    buttonFallback: "Contact page",
    prefill: "Hi — message from a mychennaicity.in reader.",
  },
};

export function getBusinessWhatsAppCopy(
  variant: BusinessWhatsAppCtaVariant,
): BusinessWhatsAppCopy {
  return copy[variant] ?? copy.default;
}

export function businessWhatsAppHref(copyRow: BusinessWhatsAppCopy): string {
  const t = copyRow.prefill?.trim();
  if (!t) return "/api/contact/whatsapp";
  return `/api/contact/whatsapp?${new URLSearchParams({ text: t }).toString()}`;
}
