import { GoogleAdSenseSlot } from "@/components/analytics/google-adsense-slot";
import { isAdSenseDisplayEnabled } from "@/lib/feature-flags";

type Props = {
  /** Kept for call-site compatibility; IAB house fallback was removed. */
  slotId?: string;
  size?: string;
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
 * AdSense display unit when client + slot env are set (post-approval).
 * Otherwise renders nothing — partner house ads use `<PageAdSlot />`.
 */
export function ArticleAdRegion({ adsenseSlotEnvKey }: Props) {
  if (isAdSenseDisplayEnabled() && adsenseSlotConfigured(adsenseSlotEnvKey)) {
    return (
      <GoogleAdSenseSlot slotEnvKey={adsenseSlotEnvKey} className="my-6" />
    );
  }
  return null;
}
