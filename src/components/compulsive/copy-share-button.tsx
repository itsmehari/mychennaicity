"use client";

import { useState } from "react";

export function CopyShareButton({
  buildText,
  label = "Copy for WhatsApp",
}: {
  buildText: () => string;
  label?: string;
}) {
  const [done, setDone] = useState(false);

  async function onClick() {
    const text = buildText();
    try {
      if (navigator.share) {
        await navigator.share({ text, title: "mychennaicity.in" });
        setDone(true);
        return;
      }
    } catch {
      /* fall through */
    }
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      window.setTimeout(() => setDone(false), 2000);
    } catch {
      alert(text);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void onClick()}
      className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-bold text-[var(--foreground)] hover:border-[var(--accent)]"
    >
      {done ? "Copied" : label}
    </button>
  );
}
