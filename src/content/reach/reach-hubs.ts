/**
 * Reach hubs plan — gold visibility, events today/weekend, hospitals, festivals,
 * salary, EV charging, WhatsApp admin toolkit (Aug 2026).
 *
 * Status: implemented as MVP pages + filters + directory seed in this pass.
 */

export const REACH_HUBS = [
  {
    id: "gold",
    route: "/chennai-gold-rate",
    note: "Existing hub — footer + nav visibility",
  },
  {
    id: "events-today-weekend",
    route: "/chennai-local-events",
    note: "Today + This weekend chips on hub",
  },
  {
    id: "hospitals",
    route: "/directory",
    note: "Seed hospital directory entries",
  },
  {
    id: "festivals",
    route: "/guides/chennai-festivals-calendar",
  },
  {
    id: "salary",
    route: "/guides/chennai-salary-guide-2026",
  },
  {
    id: "ev",
    route: "/guides/chennai-ev-charging",
  },
  {
    id: "wa-admins",
    route: "/chennai-whatsapp-group-admins",
  },
] as const;
