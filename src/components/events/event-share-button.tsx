"use client";

import { useCallback, useState } from "react";

type Props = {
  title: string;
  text: string;
  className?: string;
  label?: string;
};

export function EventShareButton({
  title,
  text,
  className = "",
  label = "Share event",
}: Props) {
  const [status, setStatus] = useState<"idle" | "copied" | "shared">("idle");

  const onShare = useCallback(async () => {
    const url = window.location.href;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url });
        setStatus("shared");
        window.setTimeout(() => setStatus("idle"), 2200);
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2200);
    } catch {
      setStatus("idle");
    }
  }, [title, text]);

  const statusLabel =
    status === "copied"
      ? "Link copied"
      : status === "shared"
        ? "Shared"
        : null;

  return (
    <span className="inline-flex w-full flex-col items-stretch gap-1">
      <button
        type="button"
        onClick={onShare}
        className={className}
        aria-label={label}
      >
        {label}
      </button>
      {statusLabel ? (
        <span
          className="mcc-event-share-status text-center text-xs font-medium text-[var(--accent)]"
          role="status"
          aria-live="polite"
        >
          {statusLabel}
        </span>
      ) : null}
    </span>
  );
}
