/**
 * Reach hubs (Aug 2026) + compulsive connective hubs registry pointer.
 */

import { COMPULSIVE_HUBS } from "@/content/compulsive/index";

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
    id: "tourism-ecr",
    route: "/chennai-tourism/this-weekend-ecr-plan",
    note: "TTDC / Tamil Nadu Tourism ECR weekend loop",
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
  {
    id: "auto-fare",
    route: "/guides/chennai-auto-fare",
    note: "2013 meter vs July 2026 proposals",
  },
  {
    id: "power-feeder",
    route: "/civic-tools/power-feeder-desk",
  },
] as const;

/** Compulsive hubs — see `src/content/compulsive/index.ts` for full metadata. */
export const COMPULSIVE_REACH_POINTER = COMPULSIVE_HUBS.map((h) => ({
  id: h.id,
  route: h.path,
  wave: h.wave,
  idea: h.idea,
}));
