import type { RichAreaHubContent } from "@/lib/area-hubs/types";
import { buildAllDefaultRichHubs } from "@/lib/area-hubs/build-default-rich-content";
import { ADYAR_THIRUVANMIYUR_HUB } from "./adyar-thiruvanmiyur";
import { AMBATTUR_ANNANAGAR_HUB } from "./ambattur-annanagar";
import { KODAMBAKKAM_T_NAGAR_HUB } from "./kodambakkam-t-nagar";
import { MADHAVARAM_MADHAVARAM_HUB } from "./madhavaram-madhavaram";
import { OMR_PERUNGUDI_SHOLINGANALLUR_HUB } from "./omr-perungudi-sholinganallur";
import { ROYAPURAM_TONDIARPET_HUB } from "./royapuram-tondiarpet";
import { SAIDAPET_GUINDY_ALANDUR_HUB } from "./saidapet-guindy-alandur";
import { TEYNAMPET_NUNGAMBAKKAM_HUB } from "./teynampet-nungambakkam";
import { TIRUVOTTIYUR_MANALI_HUB } from "./tiruvottiyur-manali-belt";
import { VALASARAVAKKAM_PORUR_HUB } from "./valasaravakkam-porur";

const RICH_AREA_HUBS: Record<string, RichAreaHubContent> = {
  ...buildAllDefaultRichHubs(),
  [OMR_PERUNGUDI_SHOLINGANALLUR_HUB.slug]: OMR_PERUNGUDI_SHOLINGANALLUR_HUB,
  [ADYAR_THIRUVANMIYUR_HUB.slug]: ADYAR_THIRUVANMIYUR_HUB,
  [KODAMBAKKAM_T_NAGAR_HUB.slug]: KODAMBAKKAM_T_NAGAR_HUB,
  [AMBATTUR_ANNANAGAR_HUB.slug]: AMBATTUR_ANNANAGAR_HUB,
  [TIRUVOTTIYUR_MANALI_HUB.slug]: TIRUVOTTIYUR_MANALI_HUB,
  [MADHAVARAM_MADHAVARAM_HUB.slug]: MADHAVARAM_MADHAVARAM_HUB,
  [ROYAPURAM_TONDIARPET_HUB.slug]: ROYAPURAM_TONDIARPET_HUB,
  [TEYNAMPET_NUNGAMBAKKAM_HUB.slug]: TEYNAMPET_NUNGAMBAKKAM_HUB,
  [SAIDAPET_GUINDY_ALANDUR_HUB.slug]: SAIDAPET_GUINDY_ALANDUR_HUB,
  [VALASARAVAKKAM_PORUR_HUB.slug]: VALASARAVAKKAM_PORUR_HUB,
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
  MADHAVARAM_MADHAVARAM_HUB,
  OMR_PERUNGUDI_SHOLINGANALLUR_HUB,
  ROYAPURAM_TONDIARPET_HUB,
  SAIDAPET_GUINDY_ALANDUR_HUB,
  TEYNAMPET_NUNGAMBAKKAM_HUB,
  TIRUVOTTIYUR_MANALI_HUB,
  VALASARAVAKKAM_PORUR_HUB,
};
