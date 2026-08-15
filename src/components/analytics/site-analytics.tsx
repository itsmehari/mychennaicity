import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { resolveAdsenseClientId } from "@/lib/adsense-config";
import { GoogleAdSenseScripts } from "./google-adsense-scripts";
import { PartnerOutboundClickTracker } from "@/components/ads/partner-outbound-analytics";
import { GoogleAnalyticsRouteTracker } from "./google-analytics-route-tracker";
import { GoogleAnalyticsScripts } from "./google-analytics-scripts";

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";
const adsenseClientId = resolveAdsenseClientId(
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
);

type Props = {
  /** When true (matched server-side IP), skip GA + AdSense only. */
  suppressGoogleMeasurement?: boolean;
};

/**
 * Single entry for all site-wide measurement. Mounted once in `app/layout.tsx`
 * so every route (public, admin, API error pages, etc.) is covered.
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
        <GoogleAdSenseScripts clientId={adsenseClientId} />
      ) : null}
      <PartnerOutboundClickTracker />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
