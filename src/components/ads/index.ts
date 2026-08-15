/**
 * Local advertising — drop-in panels for hubs and detail pages.
 *
 * @example
 * import { AdvertisePanel } from "@/components/ads";
 *
 * // Full home-style hero (categories + WhatsApp CTA card)
 * <AdvertisePanel variant="home" layout="hero" />
 *
 * // Hub mid/footer band
 * <AdvertisePanel variant="news" layout="section" className="mt-8" />
 *
 * // Compact strip under article / listing body
 * <AdvertisePanel variant="jobs" layout="strip" />
 *
 * // Partner rotator (square rail / rectangle band)
 * import { PageAdSlot } from "@/components/ads";
 * <PageAdSlot shape="square" placement="job_detail_square" />
 */
export { AdvertisePanel } from "@/components/ads/advertise-panel";
export type {
  AdvertisePanelLayout,
  AdvertisePanelVariant,
} from "@/lib/advertise-panel-copy";
export { PageAdSlot } from "@/components/ads/page-ad-slot";
export { SiteWideAdBand } from "@/components/ads/site-wide-ad-band";
export { PartnerAdRotator } from "@/components/ads/partner-ad-rotator";
