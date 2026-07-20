"use client";

import { useEffect, useMemo, useState } from "react";
import type { ArticleTocEntry } from "@/lib/markdown-outline";

function tocLinkLabel(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "$1");
}

export function ArticleTocNav({
  entries,
  variant = "rail",
}: {
  entries: ArticleTocEntry[];
  variant?: "rail" | "inline";
}) {
  const entryKey = useMemo(
    () => entries.map((e) => e.domId).join("|"),
    [entries],
  );
  const [activeId, setActiveId] = useState<string | null>(
    entries[0]?.domId ?? null,
  );

  useEffect(() => {
    if (entries.length === 0) return;

    const elements = entries
      .map((e) => document.getElementById(e.domId))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (obsEntries) => {
        for (const entry of obsEntries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visible.set(id, entry.intersectionRatio);
          } else {
            visible.delete(id);
          }
        }

        if (visible.size === 0) return;

        let bestId: string | null = null;
        let bestRatio = -1;
        for (const [id, ratio] of visible) {
          if (ratio >= bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestId) setActiveId(bestId);
      },
      {
        rootMargin: "-18% 0px -58% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 1],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [entries, entryKey]);

  useEffect(() => {
    if (!activeId || variant !== "rail") return;
    const safeId =
      typeof CSS !== "undefined" && typeof CSS.escape === "function"
        ? CSS.escape(activeId)
        : activeId.replace(/"/g, '\\"');
    const link = document.querySelector(
      `.civic-toc--rail a[href="#${safeId}"]`,
    );
    link?.scrollIntoView({ block: "nearest" });
  }, [activeId, variant]);

  if (entries.length === 0) return null;

  const activeIndex = Math.max(
    0,
    entries.findIndex((e) => e.domId === activeId),
  );
  const progressPct = Math.round(((activeIndex + 1) / entries.length) * 100);
  const progressLabel = `${activeIndex + 1} / ${entries.length}`;

  return (
    <nav
      className={`civic-toc civic-toc--${variant}`}
      aria-label="On this page"
    >
      <div className="civic-toc__header">
        <p className="civic-toc__label">On this page</p>
        {variant === "rail" ? (
          <span className="civic-toc__progress" aria-live="polite">
            <span className="civic-toc__progress-count">{progressLabel}</span>
            <span className="civic-toc__progress-pct" aria-hidden>
              {progressPct}%
            </span>
          </span>
        ) : null}
      </div>
      <ol className="civic-toc__list">
        {entries.map((e) => {
          const isActive = e.domId === activeId;
          return (
            <li
              key={e.domId}
              className={
                e.level === 3
                  ? "civic-toc__item civic-toc__item--nested"
                  : "civic-toc__item"
              }
            >
              <a
                href={`#${e.domId}`}
                className={
                  isActive
                    ? "civic-toc__link civic-toc__link--active"
                    : "civic-toc__link"
                }
                aria-current={isActive ? "location" : undefined}
              >
                {tocLinkLabel(e.text)}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
