"use client";

import { usePathname } from "next/navigation";
import { partnerAds, shouldShowSiteWideAd } from "@/lib/partner-ads";
import { PartnerAdRotator } from "@/components/ads/partner-ad-rotator";

/**
 * Catch-all rectangle after `<main>`. Hidden on legal/auth/admin and on pages
 * that already mount `<PageAdSlot />`.
 */
export function SiteWideAdBand() {
  const pathname = usePathname() ?? "/";
  if (!shouldShowSiteWideAd(pathname)) return null;

  const ads = partnerAds("site_band");
  if (ads.length === 0) return null;

  return (
    <div className="partner-ad-band">
      <PartnerAdRotator ads={ads} shape="rectangle" placement="site_band" />
    </div>
  );
}
