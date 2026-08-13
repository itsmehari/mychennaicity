/**
 * GA4 helpers for compulsive / connective hubs.
 * Event names stay stable for dashboards.
 */

type GtagFn = (
  command: "event",
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>,
) => void;

function gtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & { gtag?: GtagFn };
  return typeof w.gtag === "function" ? w.gtag : null;
}

export type CompulsiveEventName =
  | "compulsive_share"
  | "compulsive_quiz_complete"
  | "compulsive_checklist_complete"
  | "compulsive_tool_open";

export function trackCompulsiveEvent(
  name: CompulsiveEventName,
  params?: {
    hub_id?: string;
    archetype?: string;
    progress?: number;
    label?: string;
  },
): void {
  gtag()?.("event", name, {
    event_category: "compulsive_hub",
    hub_id: params?.hub_id,
    archetype: params?.archetype,
    progress: params?.progress,
    event_label: params?.label ?? params?.hub_id,
  });
}
