"use client";

import { useEffect, type ReactNode } from "react";
import {
  engagementEventFromClick,
  type ContentKind,
} from "@/lib/analytics/engagement-events";

function sendEngagement(kind: ContentKind, slug: string, event: string) {
  const body = JSON.stringify({ kind, slug, event });
  void fetch("/api/analytics/engagement", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    keepalive: true,
    credentials: "same-origin",
  }).catch(() => undefined);
}

export function ContentEngagementScope({
  kind,
  slug,
  children,
}: {
  kind: ContentKind;
  slug: string;
  children: ReactNode;
}) {
  useEffect(() => {
    const marker = `${kind}:${slug}`;
    sendEngagement(kind, slug, "pageview");
    const onClick = (event: MouseEvent) => {
      const scope = document.querySelector(
        `[data-engagement-scope="${CSS.escape(marker)}"]`,
      );
      const target = event.target;
      if (!scope || !(target instanceof Element)) return;
      if (target.closest("[data-engagement-ignore]")) return;
      const node = target.closest("a, button");
      if (!node || !scope.contains(node)) return;
      const tracked = engagementEventFromClick(node);
      if (tracked) sendEngagement(kind, slug, tracked);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [kind, slug]);

  return (
    <div className="contents" data-engagement-scope={`${kind}:${slug}`}>
      {children}
    </div>
  );
}
