"use client";

import { useEffect, useState } from "react";
import { formatReaderViewLabel } from "@/lib/events/event-view-label";

type Props = {
  slug: string;
  initialCount: number;
  className?: string;
};

export function EventReaderViews({ slug, initialCount, className = "" }: Props) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    let cancelled = false;

    async function recordView() {
      try {
        const res = await fetch(`/api/events/${encodeURIComponent(slug)}/view`, {
          method: "POST",
          credentials: "same-origin",
        });
        if (!res.ok) return;
        const data = (await res.json()) as { uniqueViews?: number };
        if (!cancelled && typeof data.uniqueViews === "number") {
          setCount(data.uniqueViews);
        }
      } catch {
        /* ignore — display stays at server count */
      }
    }

    void recordView();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const label = formatReaderViewLabel(count);
  if (!label) return null;

  return (
    <p
      className={`mcc-event-reader-views text-sm text-[var(--muted)] ${className}`.trim()}
      aria-live="polite"
    >
      {label}
    </p>
  );
}
