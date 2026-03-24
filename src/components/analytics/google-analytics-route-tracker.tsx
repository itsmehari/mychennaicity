"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

type Props = {
  measurementId: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends GA4 page_path on client-side navigations (initial load is handled by gtag config). */
export function GoogleAnalyticsRouteTracker({ measurementId }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (!measurementId || typeof window.gtag !== "function") return;
    const q = searchParams?.toString();
    const pagePath = q ? `${pathname}?${q}` : pathname;
    window.gtag("config", measurementId, { page_path: pagePath });
  }, [pathname, searchParams, measurementId]);

  return null;
}
