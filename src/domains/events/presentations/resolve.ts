import type { PublicEventRow } from "@/domains/events";
import type { FestivalRichContent } from "@/content/special-events";
import type { PresentationRegistryEntry } from "./types";
import { eventPresentationRegistry } from "./registry";

export type ResolvedRichPresentation = {
  entry: PresentationRegistryEntry;
  content: FestivalRichContent;
};

/** Returns rich presentation when key + content resolve; otherwise null (standard page). */
export function resolveEventPresentation(
  ev: PublicEventRow,
): ResolvedRichPresentation | null {
  const key = ev.presentationKey?.trim();
  if (!key) return null;

  const entry = eventPresentationRegistry[key];
  if (!entry) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[events] Unknown presentation_key:", key);
    }
    return null;
  }

  const content = entry.loadContent(ev.contentRef);
  if (!content) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[events] No content bundle for content_ref:",
        ev.contentRef,
      );
    }
    return null;
  }

  return { entry, content };
}
