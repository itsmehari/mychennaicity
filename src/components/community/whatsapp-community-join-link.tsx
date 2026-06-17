"use client";

import {
  whatsappCommunityJoinRedirectPath,
  WHATSAPP_COMMUNITY_PAGE_PATH,
} from "@/lib/whatsapp-community";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function trackJoinClick(utmContent: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "whatsapp_community_click", {
    event_category: "whatsapp_community",
    event_label: utmContent,
  });
}

export function WhatsAppCommunityJoinLink({
  utmContent,
  children,
  className,
  onClick,
}: {
  utmContent: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={whatsappCommunityJoinRedirectPath(utmContent)}
      className={className}
      onClick={() => {
        trackJoinClick(utmContent);
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}

/** Text link to the canonical landing page (not raw invite). */
export function WhatsAppCommunityPageLink({
  children,
  className,
  src,
}: {
  children: React.ReactNode;
  className?: string;
  /** Optional tracking query, e.g. float, nav */
  src?: string;
}) {
  const href = src
    ? `${WHATSAPP_COMMUNITY_PAGE_PATH}?src=${encodeURIComponent(src)}`
    : WHATSAPP_COMMUNITY_PAGE_PATH;
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
