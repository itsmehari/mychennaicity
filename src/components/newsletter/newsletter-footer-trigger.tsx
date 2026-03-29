"use client";

import { dispatchOpenNewsletterModal } from "@/config/newsletter-modal";

export function NewsletterFooterTrigger({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => dispatchOpenNewsletterModal()}
    >
      {children}
    </button>
  );
}
