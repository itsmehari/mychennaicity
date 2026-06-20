import type { AdSize } from "@/ads/registry";
import { AdSlot } from "@/ads/render-ad-slot";
import { GoogleAdSenseSlot } from "@/components/analytics/google-adsense-slot";
import { isAdSenseDisplayEnabled } from "@/lib/feature-flags";

type Props = {
  slotId: string;
  size: AdSize;
  /** Maps to `NEXT_PUBLIC_ADSENSE_SLOT_*` when AdSense display is enabled. */
  adsenseSlotEnvKey: string;
};

function adsenseSlotConfigured(envKey: string): boolean {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() ?? "";
  const slotId =
    process.env[`NEXT_PUBLIC_ADSENSE_SLOT_${envKey}`]?.trim() ?? "";
  return Boolean(clientId && slotId);
}

/**
 * House banner by default; switches to AdSense unit when client + slot env are set (post-approval).
 */
export function ArticleAdRegion({ slotId, size, adsenseSlotEnvKey }: Props) {
  if (isAdSenseDisplayEnabled() && adsenseSlotConfigured(adsenseSlotEnvKey)) {
    return (
      <GoogleAdSenseSlot slotEnvKey={adsenseSlotEnvKey} className="my-6" />
    );
  }
  return <AdSlot slotId={slotId} size={size} />;
}
