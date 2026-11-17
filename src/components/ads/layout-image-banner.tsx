"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import {
  layoutBannerForView,
  withPartnerUtm,
  type LayoutImageBanner as LayoutImageCreative,
} from "@/lib/partner-ads";

const SESSION_SEED_KEY = "mcc-layout-banner-seed";

type Props = {
  /** Where this column sits. The file itself changes per session and page. */
  placement: string;
  className?: string;
};

function isPrintEnquiry(id: string): boolean {
  return id === "print-offer";
}

async function openPrintEnquiry(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  try {
    const res = await fetch("/api/partner-ads/print-enquiry", {
      method: "POST",
      credentials: "same-origin",
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      window.location.assign("/contact");
      return;
    }
    const data = (await res.json()) as { url?: unknown };
    const url = typeof data.url === "string" ? data.url : "";
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || parsed.hostname !== "wa.me") {
      window.location.assign("/contact");
      return;
    }
    const link = document.createElement("a");
    link.href = parsed.toString();
    link.target = "_blank";
    link.rel = "noreferrer noopener nofollow";
    link.click();
  } catch {
    window.location.assign("/contact");
  }
}

function sessionSeed(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_SEED_KEY);
    if (existing) return existing;
    const next =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : String(Math.random());
    sessionStorage.setItem(SESSION_SEED_KEY, next);
    return next;
  } catch {
    return "mcc";
  }
}

/**
 * Finished image inside an existing column. The same visit keeps one file
 * on a page. The next page, or the next visit, can show another file.
 */
export function LayoutImageBanner({ placement, className = "" }: Props) {
  const pathname = usePathname() ?? "/";
  const [banner, setBanner] = useState<LayoutImageCreative | null>(null);

  useEffect(() => {
    setBanner(layoutBannerForView(sessionSeed(), pathname));
  }, [pathname]);

  const shown = banner;
  const landscape = Boolean(shown && shown.width > shown.height * 1.08);
  return (
    <div
      className={`layout-banner${landscape ? " layout-banner--landscape" : ""}${className ? ` ${className}` : ""}`}
    >
      <p className="layout-banner__label">Advertisement</p>
      {shown ? (
        <a
          className="layout-banner__link"
          href={isPrintEnquiry(shown.id) ? shown.url : withPartnerUtm(shown.url, placement)}
          style={{ aspectRatio: `${shown.width} / ${shown.height}` }}
          target="_blank"
          rel={
            isPrintEnquiry(shown.id)
              ? "nofollow noreferrer noopener"
              : "noopener noreferrer"
          }
          data-partner-link={shown.partner}
          data-partner-id={shown.id}
          data-utm-content={placement}
          aria-label={shown.alt}
          onClick={isPrintEnquiry(shown.id) ? openPrintEnquiry : undefined}
        >
          <img
            src={shown.image}
            alt=""
            width={shown.width}
            height={shown.height}
            decoding="async"
          />
        </a>
      ) : (
        <div className="layout-banner__link" style={{ aspectRatio: "1 / 1" }} />
      )}
    </div>
  );
}
