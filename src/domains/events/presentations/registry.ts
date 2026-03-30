import { FestivalRichEventDetail } from "@/components/events/special/festival-rich-event-detail";
import { getFestivalRichContent } from "@/content/special-events";
import type { PresentationRegistryEntry } from "./types";

/** Maps `events.presentation_key` → loader + page. Add new keys here for future rich layouts. */
export const eventPresentationRegistry: Record<string, PresentationRegistryEntry> = {
  festival_rich: {
    loadContent: getFestivalRichContent,
    Page: FestivalRichEventDetail,
  },
};
