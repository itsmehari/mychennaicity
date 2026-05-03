import type { ReactNode } from "react";
import type { AdSize } from "@/ads/registry";
import { ADS } from "@/ads/registry";
import { selectCreative, selectCreativeRandom } from "@/ads/select-creative";
import { AdBannerIcon, normalizeDesignForClass } from "@/ads/ad-banner-icons";

function compactHeadline(headline: string, maxLen: number): string {
  const t = headline.trim();
  if (t.length <= maxLen) return t;
  return `${t.slice(0, maxLen - 1).trimEnd()}…`;
}

export function AdSlot({
  slotId,
  size,
  pickKeySuffix = "",
  creativeId,
  creativeIds,
}: {
  slotId: string;
  size: AdSize;
  /** For `AdSlotRow`: pass `|0`, `|1`, … so picks differ deterministically. */
  pickKeySuffix?: string;
  /** When set, only this creative is eligible. */
  creativeId?: string;
  /**
   * When set, only these creatives are eligible. If more than one matches the
   * slot + size, selection is random on each server render (visitors and page
   * loads see rotated ads).
   */
  creativeIds?: readonly string[];
}) {
  let pool = ADS;
  if (creativeIds != null && creativeIds.length > 0) {
    const idSet = new Set(creativeIds);
    pool = ADS.filter((a) => idSet.has(a.id));
  } else if (creativeId != null && creativeId !== "") {
    pool = ADS.filter((a) => a.id === creativeId);
  }

  const useRandom =
    creativeIds != null && creativeIds.length > 1 && pool.length > 1;
  const creative = useRandom
    ? selectCreativeRandom(slotId, size, { pickKeySuffix, ads: pool })
    : selectCreative(slotId, size, {
        pickKeySuffix,
        ads: pool,
      });
  if (!creative) return null;

  const designClass = normalizeDesignForClass(creative.design);
  const linkClass = `ad-banner ad-banner--${size} ad-banner--${designClass}`;
  const ariaLabel = `${creative.advertiser} - ${creative.headline}`;

  const icon = (
    <span className="ad-banner__icon" aria-hidden>
      <AdBannerIcon design={creative.design} />
    </span>
  );

  const copyWide = (
    <span className="ad-banner__copy">
      <span className="ad-banner__headline">{creative.headline}</span>
      <span className="ad-banner__tagline">{creative.tagline}</span>
    </span>
  );

  let inner: ReactNode;
  if (size === "728x90") {
    inner = (
      <>
        {icon}
        {copyWide}
        <span className="ad-banner__cta">Visit site</span>
      </>
    );
  } else if (size === "336x280" || size === "300x250") {
    inner = (
      <>
        {icon}
        {copyWide}
        <span className="ad-banner__cta">Learn more</span>
      </>
    );
  } else {
    inner = (
      <>
        {icon}
        <span className="ad-banner__copy">
          <span className="ad-banner__headline">
            {compactHeadline(creative.headline, 42)}
          </span>
        </span>
        <span className="ad-banner__cta">Visit</span>
      </>
    );
  }

  return (
    <section
      className="ad-banner-region"
      role="region"
      aria-label="Sponsored content"
    >
      <p className="ad-banner__disclosure">
        <span className="ad-banner__label">Ad</span>
      </p>
      <a
        href={creative.url}
        className={linkClass}
        target="_blank"
        rel="sponsored noopener noreferrer"
        aria-label={ariaLabel}
      >
        {inner}
      </a>
    </section>
  );
}

export function AdSlotRow({
  slotId,
  size,
  count,
}: {
  slotId: string;
  size: AdSize;
  count: number;
}) {
  const n = Math.max(0, Math.min(count, 8));
  const items: ReactNode[] = [];
  for (let i = 0; i < n; i++) {
    items.push(
      <AdSlot
        key={`${slotId}-${i}`}
        slotId={slotId}
        size={size}
        pickKeySuffix={`|${i}`}
      />,
    );
  }
  if (items.length === 0) return null;
  return (
    <div className="ad-banner-row" role="presentation">
      {items}
    </div>
  );
}
