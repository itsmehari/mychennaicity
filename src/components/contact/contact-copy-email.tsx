"use client";

import { useState } from "react";

export function ContactCopyEmail({
  email,
  className = "mcc-corp-btn mcc-corp-btn--outline-ink mcc-corp-btn--sm",
}: {
  email: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" className={className} onClick={onCopy} aria-live="polite">
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
