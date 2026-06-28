import type { RichAreaHubContent } from "@/lib/area-hubs/types";
import { OMR_PERUNGUDI_SHOLINGANALLUR_HUB } from "./omr-perungudi-sholinganallur";

const RICH_AREA_HUBS: Record<string, RichAreaHubContent> = {
  [OMR_PERUNGUDI_SHOLINGANALLUR_HUB.slug]: OMR_PERUNGUDI_SHOLINGANALLUR_HUB,
};

export function getRichAreaHubContent(
  slug: string,
): RichAreaHubContent | undefined {
  return RICH_AREA_HUBS[slug];
}

export { OMR_PERUNGUDI_SHOLINGANALLUR_HUB };
