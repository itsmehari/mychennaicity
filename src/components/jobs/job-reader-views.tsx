"use client";

import { useEffect, useState } from "react";
import { formatJobUniqueViewLabel } from "@/lib/jobs/job-view-label";

type Props = {
  slug: string;
  initialCount: number;
  className?: string;
};

export function JobReaderViews({ slug, initialCount, className = "" }: Props) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    let cancelled = false;

    async function recordView() {
      try {
        const res = await fetch(`/api/jobs/${encodeURIComponent(slug)}/view`, {
          method: "POST",
          credentials: "same-origin",
        });
        if (!res.ok) return;
        const data = (await res.json()) as { uniqueViews?: number };
        if (!cancelled && typeof data.uniqueViews === "number") {
          setCount(data.uniqueViews);
        }
      } catch {
        /* keep the server count */
      }
    }

    void recordView();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <p
      className={`text-sm text-[var(--muted)] ${className}`.trim()}
      aria-live="polite"
    >
      {formatJobUniqueViewLabel(count)}
    </p>
  );
}
