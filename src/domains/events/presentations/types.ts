import type { ComponentType } from "react";
import type { PublicEventRow } from "@/domains/events";
import type { FestivalRichContent } from "@/content/special-events";

export type FestivalRichPageProps = {
  event: PublicEventRow;
  content: FestivalRichContent;
};

export type PresentationRegistryEntry = {
  loadContent: (contentRef: string | null | undefined) => FestivalRichContent | null;
  Page: ComponentType<FestivalRichPageProps>;
};
