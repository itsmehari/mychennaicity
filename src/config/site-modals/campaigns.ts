/**
 * Campaign copy for mychennaicity.in — city goals, not OMR hiring.
 */

import { WHATSAPP_COMMUNITY_PAGE_PATH } from "@/lib/whatsapp-community";
import type { SiteModalCampaign } from "./types";

const HERO = "/images/explore-chennai-madras-high-court.jpg";

export const siteModalCampaigns: SiteModalCampaign[] = [
  {
    id: "whatsapp",
    ctaKey: "whatsapp",
    eyebrow: "Chennai community",
    title: "Join the mychennaicity WhatsApp group",
    body: "Local news alerts, civic tips, and neighbourhood chatter — without the spam flood of random city groups.",
    image: HERO,
    imageAlt: "Madras High Court, Chennai",
    benefits: [
      "Chennai-first updates",
      "Community guidelines + spam list for admins",
      "Free to join",
    ],
    primaryCta: {
      label: "Join WhatsApp",
      href: `${WHATSAPP_COMMUNITY_PAGE_PATH}?src=site_modal`,
    },
    secondaryCta: {
      label: "Maybe later",
      action: "dismiss",
    },
    priority: 3,
  },
  {
    id: "newsletter",
    ctaKey: "newsletter",
    eyebrow: "Chennai digest",
    title: "Get a weekly Chennai briefing",
    body: "Jobs, civic deadlines, and weekend events — one concise email. No spam.",
    image: HERO,
    imageAlt: "Madras High Court, Chennai",
    benefits: ["Weekly cadence", "City-wide, not just one corridor", "Unsubscribe any time"],
    primaryCta: {
      label: "Subscribe",
      action: "open-newsletter",
    },
    secondaryCta: {
      label: "Not now",
      action: "dismiss",
    },
    priority: 2,
  },
  {
    id: "events",
    ctaKey: "events",
    eyebrow: "This week in Chennai",
    title: "Browse Chennai local events",
    body: "Concerts, workshops, community meetups, and weekend plans — curated for the city, not buried in flyers.",
    image: HERO,
    imageAlt: "Madras High Court, Chennai",
    benefits: ["Discovery hub", "Calendar-ready listings", "Free & ticketed"],
    primaryCta: {
      label: "Open events",
      href: "/chennai-local-events",
    },
    secondaryCta: {
      label: "Close",
      action: "dismiss",
    },
    priority: 2,
  },
  {
    id: "civic",
    ctaKey: "civic",
    eyebrow: "Civic tools",
    title: "Bulk waste generator rules — are you ready?",
    body: "Apartments, IT parks, and hospitals face SWM 2026 registration deadlines. Check readiness before fines land.",
    image: HERO,
    imageAlt: "Madras High Court, Chennai",
    benefits: ["Checklist", "Thresholds explained", "Chennai-focused"],
    primaryCta: {
      label: "Open readiness guide",
      href: "/guides/bulk-waste-generator-readiness-checklist-2026",
    },
    secondaryCta: {
      label: "Later",
      action: "dismiss",
    },
    priority: 1,
  },
  {
    id: "today",
    ctaKey: "today",
    eyebrow: "Daily desk",
    title: "Chennai today in 60 seconds",
    body: "Weather cue, Metro note, one news headline, one upcoming event — the morning WhatsApp card for the city.",
    image: HERO,
    imageAlt: "Madras High Court, Chennai",
    benefits: ["60-second read", "Copy for WhatsApp", "Links to live news & events"],
    primaryCta: {
      label: "Open Chennai today",
      href: "/chennai-today",
    },
    secondaryCta: {
      label: "Maybe later",
      action: "dismiss",
    },
    priority: 3,
  },
];

export function campaignById(id: string): SiteModalCampaign | undefined {
  return siteModalCampaigns.find((c) => c.id === id);
}

export function campaignByCtaKey(key: string): SiteModalCampaign | undefined {
  return siteModalCampaigns.find((c) => c.ctaKey === key);
}

/** Weighted random among campaigns (for first-visit pick excluding top-story). */
export function pickWeightedCampaign(
  ids: string[] = ["whatsapp", "newsletter", "events", "today"],
): SiteModalCampaign {
  const pool = ids
    .map((id) => campaignById(id))
    .filter((c): c is SiteModalCampaign => Boolean(c));
  const total = pool.reduce((sum, c) => sum + Math.max(1, c.priority), 0);
  let r = Math.random() * total;
  for (const c of pool) {
    r -= Math.max(1, c.priority);
    if (r <= 0) return c;
  }
  return pool[0] ?? siteModalCampaigns[0];
}
