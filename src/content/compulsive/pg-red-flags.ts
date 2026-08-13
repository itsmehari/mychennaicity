import { compulsivePath } from "@/content/compulsive/index";

export const PG_RED_FLAGS_PATH = compulsivePath("pg-red-flags");

export type FlagLevel = "red" | "amber" | "green";

export type PgFlagItem = {
  id: string;
  level: FlagLevel;
  label: string;
  detail: string;
};

export const PG_FLAG_LEVEL_META: Record<
  FlagLevel,
  { title: string; blurb: string; badgeClass: string }
> = {
  red: {
    title: "Red flags",
    blurb: "Pause and verify hard — money, safety, or paperwork smoke.",
    badgeClass: "bg-red-600/15 text-red-800 border-red-600/30",
  },
  amber: {
    title: "Amber signals",
    blurb: "Not automatic deal-breakers — ask, document, negotiate.",
    badgeClass: "bg-amber-500/15 text-amber-900 border-amber-600/30",
  },
  green: {
    title: "Green signals",
    blurb: "Healthy signs you’re dealing with a clearer setup.",
    badgeClass: "bg-emerald-600/15 text-emerald-900 border-emerald-600/30",
  },
};

export const PG_FLAG_ITEMS: PgFlagItem[] = [
  {
    id: "red-cash-only",
    level: "red",
    label: "Cash-only deposit with no written receipt",
    detail: "Demand a dated receipt with name, amount, and address — or walk.",
  },
  {
    id: "red-no-agreement",
    level: "red",
    label: "Refuses any rent / PG agreement or house rules in writing",
    detail: "Verbal-only deals turn ugly on notice period and deposit return.",
  },
  {
    id: "red-passport-hold",
    level: "red",
    label: "Wants to hold passport / original ID “for safety”",
    detail: "Copies may be needed for police intimation — originals staying with them is a hard no.",
  },
  {
    id: "red-lock-change",
    level: "red",
    label: "Won’t let you change room lock / share spare keys oddly",
    detail: "Clarify access: who enters when, and with what notice.",
  },
  {
    id: "red-pressure",
    level: "red",
    label: "Pressure to pay today or “someone else is coming”",
    detail: "Artificial urgency is a classic rush tactic — sleep on it.",
  },
  {
    id: "red-illegal-build",
    level: "red",
    label: "Obvious illegal floor / blocked exits / no emergency egress",
    detail: "If fire exit logic fails a basic look, prioritise safety over rent savings.",
  },
  {
    id: "amber-broker",
    level: "amber",
    label: "Broker fee unclear or “token” that isn’t adjustable",
    detail: "Get fee %, refund rules, and who pays what in writing before transfer.",
  },
  {
    id: "amber-eb",
    level: "amber",
    label: "EB / water billed vaguely (“fixed extra” with no meter story)",
    detail: "Ask how shared utilities are split and what summer spikes look like.",
  },
  {
    id: "amber-guests",
    level: "amber",
    label: "Guest / gender / timing rules only explained after payment",
    detail: "Rules can be fine — surprise rules after deposit are not.",
  },
  {
    id: "amber-flatmate",
    level: "amber",
    label: "Flatmates won’t video-call or meet before you move in",
    detail: "Personality mismatch is expensive; a 15-minute call is cheap.",
  },
  {
    id: "amber-notice",
    level: "amber",
    label: "Notice period / deposit return timeline fuzzy",
    detail: "Get days + deductions list (painting, cleaning) in the agreement.",
  },
  {
    id: "amber-whatsapp",
    level: "amber",
    label: "Owner only reachable on shifting numbers / random WhatsApp",
    detail: "Save a stable contact and a local reference if possible.",
  },
  {
    id: "green-receipt",
    level: "green",
    label: "Written agreement + deposit receipt on day one",
    detail: "Boring paperwork is a feature.",
  },
  {
    id: "green-police",
    level: "green",
    label: "Clear on tenant police intimation / ID copy process",
    detail: "Legitimate stays usually have a boring compliance path.",
  },
  {
    id: "green-visit",
    level: "green",
    label: "Lets you visit at night and talk to current tenants alone",
    detail: "Night water pressure and honest tenant chat beat daytime staging.",
  },
  {
    id: "green-inventory",
    level: "green",
    label: "Room inventory / photo checklist for deposit protection",
    detail: "Photos dated on move-in day save end-of-stay arguments.",
  },
  {
    id: "green-upi",
    level: "green",
    label: "UPI / bank transfer to a named account matching the agreement",
    detail: "Traceable payments beat anonymous cash stacks.",
  },
];

export const PG_RED_FLAGS_FAQ = [
  {
    q: "Is this legal advice?",
    a: "No. It is practical resident guidance for Chennai PG and flatmate hunts. For disputes, deposits, or contracts, consult a qualified professional and official channels.",
  },
  {
    q: "Do amber items mean I should reject the place?",
    a: "Not automatically. Amber means clarify in writing. Stacked ambers plus any red usually means keep looking.",
  },
];
