"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const InteractiveChennaiMapExplorer = dynamic(
  () =>
    import("@/components/chennai-map-explorer/interactive-chennai-map-explorer").then(
      (m) => m.InteractiveChennaiMapExplorer,
    ),
  {
    ssr: false,
    loading: () => <MapPlaceholder />,
  },
);

function MapPlaceholder() {
  return (
    <div
      className="flex min-h-[28rem] items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--muted)]"
      aria-hidden
    >
      Loading Chennai map…
    </div>
  );
}

/** Ward map JS + GeoJSON stay off the homepage until the section is near the viewport. */
export function HomeAreaMap() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setReady(true);
          io.disconnect();
        }
      },
      { rootMargin: "240px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="min-h-[28rem]">
      {ready ? <InteractiveChennaiMapExplorer /> : <MapPlaceholder />}
    </div>
  );
}
