"use client";

/** Prefer site-modal contract; falls back to newsletter event for older callers. */
export function NewsletterFooterTrigger({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button type="button" className={className} data-site-cta="newsletter">
      {children}
    </button>
  );
}
