import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { resolveAdsenseClientId } from "@/lib/adsense-config";
import { AdSensePathGate } from "./adsense-path-gate";
import { PartnerOutboundClickTracker } from "@/components/ads/partner-outbound-analytics";
import { GoogleAnalyticsRouteTracker } from "./google-analytics-route-tracker";
import { GoogleAnalyticsScripts } from "./google-analytics-scripts";
import { VercelAnalyticsGate } from "./vercel-analytics-gate";

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";
const adsenseClientId = resolveAdsenseClientId(
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
);

type Props = {
  /** When true (matched server-side IP), skip GA + AdSense only. */
  suppressGoogleMeasurement?: boolean;
};

/**
 * Single entry for all site-wide measurement. Mounted once in `app/layout.tsx`.
 * `/super-admin` (and the old `/admin` and `/login` URLs) do not send a GA4
 * page view. IP exclusion still skips Google tags entirely.
 */
export function SiteAnalytics({
  suppressGoogleMeasurement = false,
}: Props) {
  const loadGoogle = !suppressGoogleMeasurement;
  return (
    <>
      {loadGoogle && gaId ? (
        <>
          <GoogleAnalyticsScripts measurementId={gaId} />
          <Suspense fallback={null}>
            <GoogleAnalyticsRouteTracker measurementId={gaId} />
          </Suspense>
        </>
      ) : null}
      {loadGoogle && adsenseClientId ? (
        <AdSensePathGate clientId={adsenseClientId} />
      ) : null}
      <PartnerOutboundClickTracker />
      <VercelAnalyticsGate />
      <SpeedInsights />
    </>
  );
}
