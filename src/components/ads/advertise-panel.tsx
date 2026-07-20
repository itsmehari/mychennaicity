import Link from "next/link";
import {
  advertiseDetailSources,
  advertisePanelHref,
  getAdvertisePanelCopy,
  type AdvertisePanelLayout,
  type AdvertisePanelVariant,
} from "@/lib/advertise-panel-copy";
import { isWhatsAppBusinessConfigured } from "@/lib/whatsapp-server";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function MegaphoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  );
}

function PanelCta({
  href,
  label,
  className = "ad-panel__btn",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  const wa = isWhatsAppBusinessConfigured();
  if (wa) {
    return (
      <a href={href} className={className}>
        <WhatsAppIcon className="ad-panel__btn-icon" />
        {label}
      </a>
    );
  }
  return (
    <Link href="/contact" className="ad-panel__fallback-link">
      Contact us
    </Link>
  );
}

function resolveSource(
  variant: AdvertisePanelVariant,
  layout: AdvertisePanelLayout,
  sourceOverride?: string,
): string {
  if (sourceOverride?.trim()) return sourceOverride.trim();
  if (layout === "strip" && variant !== "home") {
    return advertiseDetailSources[variant];
  }
  return getAdvertisePanelCopy(variant).source;
}

function panelClass(
  variant: AdvertisePanelVariant,
  layout: AdvertisePanelLayout,
  className: string,
): string {
  const variantClass = variant === "home" ? "" : ` ad-panel--${variant}`;
  return `ad-panel ad-panel--${layout}${variantClass} ${className}`.trim();
}

function HeroLayout({
  row,
  href,
  areaLabel,
}: {
  row: ReturnType<typeof getAdvertisePanelCopy>;
  href: string;
  areaLabel?: string;
}) {
  const headline =
    areaLabel && row.headline.includes("neighbourhood")
      ? `Reach customers in ${areaLabel}.`
      : row.headline;

  return (
    <div className="ad-panel__hero-grid">
      <div>
        <p className="ad-panel__eyebrow">{row.eyebrow}</p>
        <h2 className="ad-panel__headline">
          {headline}
          {row.headlineAccent ? (
            <>
              {" "}
              <span className="ad-panel__headline-accent">
                {row.headlineAccent}
              </span>
            </>
          ) : null}
        </h2>
        <p className="ad-panel__body">{row.body}</p>
        {row.categories?.length ? (
          <ul className="ad-panel__categories" aria-label="Business categories">
            {row.categories.map((cat) => (
              <li key={cat} className="ad-panel__category">
                {cat}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <aside className="ad-panel__cta-card">
        {row.ctaSideTitle ? (
          <p className="ad-panel__cta-card-title">{row.ctaSideTitle}</p>
        ) : null}
        {row.ctaSideBody ? (
          <p className="ad-panel__cta-card-body">{row.ctaSideBody}</p>
        ) : null}
        <PanelCta href={href} label={row.ctaLabel} className="ad-panel__btn ad-panel__btn--wa" />
        <p className="ad-panel__note">
          No phone number shown here — tap the button to open a secure WhatsApp
          enquiry.
        </p>
      </aside>
    </div>
  );
}

function SectionLayout({
  row,
  href,
  areaLabel,
}: {
  row: ReturnType<typeof getAdvertisePanelCopy>;
  href: string;
  areaLabel?: string;
}) {
  const headline =
    areaLabel && row.headline.includes("neighbourhood")
      ? `Reach customers in ${areaLabel}.`
      : row.headline;

  return (
    <div className="ad-panel__section-grid">
      <div className="min-w-0">
        <p className="ad-panel__eyebrow">{row.eyebrow}</p>
        <h2 className="ad-panel__section-headline">{headline}</h2>
        <p className="ad-panel__section-body">{row.body}</p>
      </div>
      <PanelCta href={href} label={row.ctaLabel} />
    </div>
  );
}

function StripLayout({
  href,
  ctaLabel,
}: {
  href: string;
  ctaLabel: string;
}) {
  return (
    <div className="ad-panel__strip-grid">
      <div className="ad-panel__strip-copy">
        <span className="ad-panel__strip-icon">
          <MegaphoneIcon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="ad-panel__strip-title">
            Promote your business to <strong>Chennai readers</strong>
          </p>
          <p className="ad-panel__strip-sub">
            Get visibility across local news, events, jobs and area pages.
          </p>
        </div>
      </div>
      <PanelCta href={href} label={ctaLabel} />
    </div>
  );
}

/**
 * Local advertising panel for My Chennai City.
 *
 * Drop into any public page:
 * ```tsx
 * import { AdvertisePanel } from "@/components/ads";
 * <AdvertisePanel variant="news" layout="section" className="mt-8" />
 * ```
 *
 * Layouts: `hero` (home-style), `section` (hub band), `strip` (compact).
 * WhatsApp via `/api/contact/whatsapp` (number never in HTML; API in robots.txt).
 */
export function AdvertisePanel({
  variant,
  layout = "section",
  className = "",
  areaLabel,
  source,
}: {
  variant: AdvertisePanelVariant;
  layout?: AdvertisePanelLayout;
  className?: string;
  /** Optional neighbourhood name for area variant copy. */
  areaLabel?: string;
  /** Override tracking source (e.g. `jobs_seeking_hub`). */
  source?: string;
}) {
  const row = getAdvertisePanelCopy(variant);
  const trackingSource = resolveSource(variant, layout, source);
  const href = advertisePanelHref(trackingSource, row.prefill);

  return (
    <section
      className={panelClass(variant, layout, className)}
      aria-label="Advertise on My Chennai City"
    >
      {layout === "hero" ? (
        <HeroLayout row={row} href={href} areaLabel={areaLabel} />
      ) : layout === "strip" ? (
        <StripLayout href={href} ctaLabel={row.ctaLabel} />
      ) : (
        <SectionLayout row={row} href={href} areaLabel={areaLabel} />
      )}
    </section>
  );
}
