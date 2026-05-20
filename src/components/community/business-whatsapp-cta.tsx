import Link from "next/link";
import {
  businessWhatsAppHref,
  getBusinessWhatsAppCopy,
  type BusinessWhatsAppCtaVariant,
} from "@/lib/whatsapp-cta-copy";
import { isWhatsAppBusinessConfigured } from "@/lib/whatsapp-server";

const ctaBase =
  "inline-flex min-h-[44px] min-w-[12rem] items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--foreground)_12%,var(--border))] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

export function BusinessWhatsAppCta({
  variant,
  className = "",
  embedded = false,
}: {
  variant: BusinessWhatsAppCtaVariant;
  className?: string;
  /** When true, omit outer card (for nesting inside another band). */
  embedded?: boolean;
}) {
  const row = getBusinessWhatsAppCopy(variant);
  const wa = isWhatsAppBusinessConfigured();
  const href = wa ? businessWhatsAppHref(row) : "/contact";

  const shell = embedded
    ? `space-y-2 ${className}`.trim()
    : `rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_92%,var(--accent)_5%)] p-5 ring-1 ring-[color-mix(in_srgb,var(--foreground)_4%,transparent)] sm:p-6 ${className}`.trim();

  return (
    <div className={shell}>
      <h2 className="text-sm font-semibold text-[var(--foreground)]">
        {row.title}
      </h2>
      <p className="type-lede mt-2 text-sm leading-relaxed text-[var(--muted)]">
        {row.body}
      </p>
      <p className="mt-4">
        {wa ? (
          <a href={href} className={ctaBase}>
            {row.buttonWhatsApp}
          </a>
        ) : (
          <Link href={href} className={ctaBase}>
            {row.buttonFallback}
          </Link>
        )}
      </p>
    </div>
  );
}
