export const CONTENT_KINDS = [
  "news",
  "job",
  "event",
  "classified",
  "job_seeker",
] as const;

export type ContentKind = (typeof CONTENT_KINDS)[number];

export const ENGAGEMENT_EVENT_KINDS = [
  "pageview",
  "call_click",
  "whatsapp_click",
] as const;

export type EngagementEventKind = (typeof ENGAGEMENT_EVENT_KINDS)[number];

const SLUG_RE = /^[a-z0-9%][a-z0-9%-]{0,200}$/i;

export function isContentKind(value: string): value is ContentKind {
  return (CONTENT_KINDS as readonly string[]).includes(value);
}

export function isEngagementEventKind(value: string): value is EngagementEventKind {
  return (ENGAGEMENT_EVENT_KINDS as readonly string[]).includes(value);
}

export function isTrackedSlug(value: string): boolean {
  return SLUG_RE.test(value);
}

/** Public URL segment. `job_seeker` is `job-seeker` in the admin path. */
export function contentKindToParam(kind: ContentKind): string {
  return kind === "job_seeker" ? "job-seeker" : kind;
}

export function contentKindFromParam(param: string): ContentKind | null {
  if (param === "job-seeker") return "job_seeker";
  return isContentKind(param) ? param : null;
}

export function engagementEventFromClick(node: {
  getAttribute(name: string): string | null;
}): EngagementEventKind | null {
  const explicit = node.getAttribute("data-engagement");
  if (explicit === "call") return "call_click";
  if (explicit === "whatsapp") return "whatsapp_click";
  if (node.getAttribute("data-whatsapp-desk") !== null) return "whatsapp_click";
  const href = node.getAttribute("href") ?? "";
  if (/^tel:/i.test(href)) return "call_click";
  if (/^https?:\/\/(?:wa\.me|api\.whatsapp\.com)\//i.test(href)) return "whatsapp_click";
  return null;
}
