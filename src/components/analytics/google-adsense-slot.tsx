import { isAdSenseDisplayEnabled } from "@/lib/feature-flags";
import { GoogleAdSenseUnit } from "./google-adsense-unit";

type Props = {
  /** Env key suffix, e.g. `ARTICLE_TOP` reads `NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_TOP`. */
  slotEnvKey: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
};

/**
 * Server wrapper: renders an AdSense unit when client id + slot env are both set.
 * Example: `NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_TOP=1234567890`
 */
export function GoogleAdSenseSlot({
  slotEnvKey,
  format = "auto",
  className,
}: Props) {
  if (!isAdSenseDisplayEnabled()) return null;

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() ?? "";
  const slotId =
    process.env[`NEXT_PUBLIC_ADSENSE_SLOT_${slotEnvKey}`]?.trim() ?? "";
  if (!clientId || !slotId) return null;

  return (
    <GoogleAdSenseUnit
      slotId={slotId}
      clientId={clientId}
      format={format}
      className={className}
    />
  );
}
