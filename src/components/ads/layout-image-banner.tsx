"use client";

import { useEffect, useState } from "react";
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
  return (
    <div className={`layout-banner${className ? ` ${className}` : ""}`}>
      <p className="layout-banner__label">Advertisement</p>
      {shown ? (
        <a
          className="layout-banner__link"
          href={withPartnerUtm(shown.url, placement)}
          style={{ aspectRatio: `${shown.width} / ${shown.height}` }}
          target="_blank"
          rel="noopener noreferrer"
          data-partner-link={shown.partner}
          data-partner-id={shown.id}
          data-utm-content={placement}
          aria-label={shown.alt}
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
