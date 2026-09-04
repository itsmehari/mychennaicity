import type { RichAreaHubContent } from "@/lib/area-hubs/types";
import { buildAllDefaultRichHubs } from "@/lib/area-hubs/build-default-rich-content";
import { ADYAR_THIRUVANMIYUR_HUB } from "./adyar-thiruvanmiyur";
import { AMBATTUR_ANNANAGAR_HUB } from "./ambattur-annanagar";
import { KODAMBAKKAM_T_NAGAR_HUB } from "./kodambakkam-t-nagar";
import { OMR_PERUNGUDI_SHOLINGANALLUR_HUB } from "./omr-perungudi-sholinganallur";

const RICH_AREA_HUBS: Record<string, RichAreaHubContent> = {
  ...buildAllDefaultRichHubs(),
  [OMR_PERUNGUDI_SHOLINGANALLUR_HUB.slug]: OMR_PERUNGUDI_SHOLINGANALLUR_HUB,
  [ADYAR_THIRUVANMIYUR_HUB.slug]: ADYAR_THIRUVANMIYUR_HUB,
  [KODAMBAKKAM_T_NAGAR_HUB.slug]: KODAMBAKKAM_T_NAGAR_HUB,
  [AMBATTUR_ANNANAGAR_HUB.slug]: AMBATTUR_ANNANAGAR_HUB,
};

export function getRichAreaHubContent(
  slug: string,
): RichAreaHubContent | undefined {
  return RICH_AREA_HUBS[slug];
}

export {
  ADYAR_THIRUVANMIYUR_HUB,
  AMBATTUR_ANNANAGAR_HUB,
  KODAMBAKKAM_T_NAGAR_HUB,
  OMR_PERUNGUDI_SHOLINGANALLUR_HUB,
};
