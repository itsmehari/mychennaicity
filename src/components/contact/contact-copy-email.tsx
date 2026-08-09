"use client";

import { useState } from "react";

export function ContactCopyEmail({ email }: { email: string }) {
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
    <button
      type="button"
      className="mcc-contact-btn mcc-contact-btn--ghost mcc-contact-btn--sm"
      onClick={onCopy}
      aria-live="polite"
    >
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}
