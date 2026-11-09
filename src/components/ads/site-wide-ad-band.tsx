"use client";

import { usePathname } from "next/navigation";
import { shouldShowSiteWideAd } from "@/lib/partner-ads";
import { LayoutImageBanner } from "@/components/ads/layout-image-banner";

/**
 * Catch-all after `<main>` on pages without their own column banner.
 * Hidden on legal/auth/admin and on pages that already have a slot.
 */
export function SiteWideAdBand() {
  const pathname = usePathname() ?? "/";
  if (!shouldShowSiteWideAd(pathname)) return null;

  return (
    <div className="partner-ad-band">
      <LayoutImageBanner placement="site_band" />
    </div>
  );
}
