"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** AdSense ad slot id from the AdSense UI, e.g. `1234567890`. */
  slotId: string;
  /** Full client id, e.g. `ca-pub-xxxxxxxxxxxxxxxx`. */
  clientId: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  fullWidthResponsive?: boolean;
  className?: string;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Single AdSense display unit. Loads only when `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is set
 * (post-approval). House partners use `<PageAdSlot />`; this unit is network display only.
 */
export function GoogleAdSenseUnit({
  slotId,
  clientId,
  format = "auto",
  fullWidthResponsive = true,
  className = "",
}: Props) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle ?? []).push({});
    } catch {
      /* ad blocker or script not loaded */
    }
  }, [slotId]);

  return (
    <section
      className={`ad-banner-region ad-banner-region--adsense ${className}`.trim()}
      role="region"
      aria-label="Advertisement"
    >
      <p className="ad-banner__disclosure">
        <span className="ad-banner__label">Ad</span>
      </p>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={
          fullWidthResponsive ? "true" : "false"
        }
      />
    </section>
  );
}
