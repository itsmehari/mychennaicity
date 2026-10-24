"use client";

import { partnerAdOfferFont } from "@/components/ads/partner-ad-offer-font";
import type { PartnerAdCreative } from "@/lib/partner-ads";

export function PartnerAdPhotoBody({ ad }: { ad: PartnerAdCreative }) {
  return (
    <span className={`partner-ad__photo-root ${partnerAdOfferFont.variable}`}>
      <span className="partner-ad__photo" aria-hidden="true">
        <img src={ad.image} alt="" />
      </span>
      <span className="partner-ad__scrim" aria-hidden="true" />
      <span className="partner-ad__stack">
        <span className="partner-ad__kicker">{ad.photoLabel}</span>
        <span className="partner-ad__copy">
          <span className="partner-ad__offer">{ad.offer}</span>
          <span className="partner-ad__support">{ad.support}</span>
        </span>
      </span>
      <span className="partner-ad__cta">
        <span className="partner-ad__cta-dot" aria-hidden="true" />
        <span className="partner-ad__cta-label">{ad.photoCta}</span>
        <span className="partner-ad__cta-short">{ad.ctaShort}</span>
        <svg
          className="partner-ad__cta-arrow"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path
            d="M3 8h9M8.5 4.5 12.5 8 8.5 11.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  );
}
