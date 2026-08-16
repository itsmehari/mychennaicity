"use client";

import { useState } from "react";
import { trackCompulsiveEvent } from "@/lib/analytics/compulsive-events";

export function CopyShareButton({
  buildText,
  text,
  label = "Copy for WhatsApp",
  hubId,
}: {
  /** Client-only: do not pass a function from a Server Component. */
  buildText?: () => string;
  /** Safe to pass from a Server Component. */
  text?: string;
  label?: string;
  /** When set, fires GA4 `compulsive_share` on successful share/copy. */
  hubId?: string;
}) {
  const [done, setDone] = useState(false);

  async function onClick() {
    const value = text ?? buildText?.() ?? "";
    let shared = false;
    try {
      if (navigator.share) {
        await navigator.share({ text: value, title: "mychennaicity.in" });
        shared = true;
      }
    } catch {
      /* fall through */
    }
    if (!shared) {
      try {
        await navigator.clipboard.writeText(value);
        shared = true;
      } catch {
        alert(value);
      }
    }
    if (shared) {
      setDone(true);
      if (hubId) {
        trackCompulsiveEvent("compulsive_share", { hub_id: hubId });
      }
      window.setTimeout(() => setDone(false), 2000);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void onClick()}
      className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-bold text-[var(--foreground)] hover:border-[var(--accent)] cursor-pointer"
    >
      {done ? "Copied" : label}
    </button>
  );
}
