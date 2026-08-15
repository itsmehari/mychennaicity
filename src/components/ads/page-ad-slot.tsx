import { partnerAds, type PartnerAdPlacement, type PartnerAdShape } from "@/lib/partner-ads";
import { PartnerAdRotator } from "@/components/ads/partner-ad-rotator";

type Props = {
  shape: PartnerAdShape;
  placement: PartnerAdPlacement;
  className?: string;
};

/**
 * Page-level partner ad. Copy lives in `partnerAds()` — this wrapper only
 * chooses shape + placement.
 */
export function PageAdSlot({ shape, placement, className }: Props) {
  const ads = partnerAds(placement);
  if (ads.length === 0) return null;
  return (
    <PartnerAdRotator
      ads={ads}
      shape={shape}
      placement={placement}
      className={className}
    />
  );
}
