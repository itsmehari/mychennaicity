import { GoogleAdSenseSlot } from "@/components/analytics/google-adsense-slot";
import { PageAdSlot } from "@/components/ads/page-ad-slot";
import { isAdSenseDisplayEnabled } from "@/lib/feature-flags";
import type { PartnerAdPlacement, PartnerAdShape } from "@/lib/partner-ads";

type Props = {
  adsenseSlotEnvKey: string;
  /** Partner rotator placement when AdSense is not serving this slot. */
  placement: PartnerAdPlacement;
  shape?: PartnerAdShape;
  /** Kept for older call sites. */
  slotId?: string;
  size?: string;
};

function adsenseSlotConfigured(envKey: string): boolean {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() ?? "";
  const slotId =
    process.env[`NEXT_PUBLIC_ADSENSE_SLOT_${envKey}`]?.trim() ?? "";
  return Boolean(clientId && slotId);
}

/**
 * AdSense when client + slot env are set; otherwise the labeled partner rotator.
 */
export function ArticleAdRegion({
  adsenseSlotEnvKey,
  placement,
  shape = "rectangle",
}: Props) {
  if (isAdSenseDisplayEnabled() && adsenseSlotConfigured(adsenseSlotEnvKey)) {
    return (
      <GoogleAdSenseSlot slotEnvKey={adsenseSlotEnvKey} className="my-6" />
    );
  }
  return <PageAdSlot shape={shape} placement={placement} />;
}
