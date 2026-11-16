/**
 * Weekly digest of the best five site links shared in the group.
 * Owner (or editor) fills this list. Empty = page shows a waiting state.
 */

export type WhatsappThisWeekItem = {
  title: string;
  href: string;
  blurb: string;
};

export type WhatsappThisWeekEdition = {
  weekOf: string;
  updated: string;
  items: WhatsappThisWeekItem[];
};

export const WHATSAPP_THIS_WEEK: WhatsappThisWeekEdition = {
  weekOf: "16 November 2026",
  updated: "16 November 2026",
  items: [],
};
