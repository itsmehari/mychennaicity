import Script from "next/script";
import { internalMeasurementPrefixes } from "@/lib/analytics/measurement-paths";

type Props = {
  measurementId: string;
};

/**
 * Loads gtag.js once from the root layout.
 * The desk does not send a page view: the first hit is suppressed on those
 * URLs, and later page_view commands for the same paths are dropped. Public
 * pages keep the normal first page view.
 */
export function GoogleAnalyticsScripts({ measurementId }: Props) {
  const prefixes = JSON.stringify(internalMeasurementPrefixes());
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-config" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          var mccPrefixes = ${prefixes};
          function mccInternalPath(value) {
            if (!value) return false;
            var path = String(value);
            try {
              if (path.indexOf('://') !== -1) path = new URL(path).pathname;
            } catch (e) { return false; }
            path = (path.split('?')[0] || '/').split('#')[0] || '/';
            if (path.length > 1) path = path.replace(/\\/+$/, '');
            for (var i = 0; i < mccPrefixes.length; i++) {
              var prefix = mccPrefixes[i];
              if (path === prefix || path.indexOf(prefix + '/') === 0) return true;
            }
            return false;
          }
          var mccRawPush = window.dataLayer.push.bind(window.dataLayer);
          window.dataLayer.push = function () {
            try {
              var item = arguments[0];
              if (item && item[0] === 'event' && item[1] === 'page_view') {
                var params = item[2] || {};
                var target = params.page_path || params.page_location || location.pathname;
                if (mccInternalPath(target)) return window.dataLayer.length;
              }
              if (item && item[0] === 'config') {
                var cfg = item[2] || {};
                if (cfg.page_path && mccInternalPath(cfg.page_path)) return window.dataLayer.length;
              }
            } catch (e) {}
            return mccRawPush.apply(window.dataLayer, arguments);
          };
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', mccInternalPath(location.pathname) ? { send_page_view: false } : {});
        `}
      </Script>
    </>
  );
}
