import type { RichAreaHubContent } from "@/lib/area-hubs/types";
import { buildAllDefaultRichHubs } from "@/lib/area-hubs/build-default-rich-content";
import { OMR_PERUNGUDI_SHOLINGANALLUR_HUB } from "./omr-perungudi-sholinganallur";

const RICH_AREA_HUBS: Record<string, RichAreaHubContent> = {
  ...buildAllDefaultRichHubs(),
  [OMR_PERUNGUDI_SHOLINGANALLUR_HUB.slug]: OMR_PERUNGUDI_SHOLINGANALLUR_HUB,
};

export function getRichAreaHubContent(
  slug: string,
): RichAreaHubContent | undefined {
  return RICH_AREA_HUBS[slug];
}

export { OMR_PERUNGUDI_SHOLINGANALLUR_HUB };
