"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type {
  MegaNavLiveKind,
  NavPreviewResponse,
  NavPreviewSectionPayload,
} from "@/lib/nav/nav-preview-types";

export type { MegaNavLiveKind };

type Props = {
  kind: MegaNavLiveKind;
  onNavigate?: () => void;
  compact?: boolean;
};

let cachedPreview: NavPreviewResponse | null = null;
let cachedAt = 0;
const CACHE_MS = 45_000;
let inflight: Promise<NavPreviewResponse> | null = null;

function loadNavPreview(): Promise<NavPreviewResponse> {
  const now = Date.now();
  if (cachedPreview && now - cachedAt < CACHE_MS) {
    return Promise.resolve(cachedPreview);
  }
  if (inflight) return inflight;

  inflight = fetch("/api/nav/preview")
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad status"))))
    .then((json: NavPreviewResponse) => {
      cachedPreview = json;
      cachedAt = Date.now();
      return json;
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

/**
 * Live rail for megamenu sections — news, jobs, events, explore, areas.
 * Shares one `/api/nav/preview` fetch across open panels in the same session.
 */
export function MegaNavLiveRail({
  kind,
  onNavigate,
  compact = false,
}: Props) {
  const [section, setSection] = useState<NavPreviewSectionPayload | null>(
    cachedPreview?.[kind] ?? null,
  );
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadNavPreview()
      .then((json) => {
        if (!cancelled) setSection(json[kind]);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [kind]);

  return (
    <div
      className={`mega-nav-live${compact ? " mega-nav-live--compact" : ""}`}
    >
      <div className="mega-nav-live__head">
        <div>
          <p className="mega-nav-live__eyebrow">
            {section?.eyebrow ?? "Live"}
          </p>
          <p className="mega-nav-live__title">
            {section?.title ?? "Updating…"}
          </p>
        </div>
        <p className="mega-nav-live__count" aria-live="polite">
          {section ? (
            section.countLabel
          ) : failed ? (
            "—"
          ) : (
            <span className="mega-nav-live__pulse">Updating…</span>
          )}
        </p>
      </div>

      {section && section.items.length > 0 ? (
        <ol className="mega-nav-live__list">
          {section.items.slice(0, compact ? 4 : 5).map((item, i) => (
            <li key={item.href + item.title}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className="mega-nav-live__item"
              >
                <span className="mega-nav-live__n" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mega-nav-live__body">
                  <span className="mega-nav-live__when">{item.meta}</span>
                  <span className="mega-nav-live__name">{item.title}</span>
                  {item.sub ? (
                    <span className="mega-nav-live__venue">{item.sub}</span>
                  ) : null}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mega-nav-live__empty">
          {failed
            ? "Couldn’t load live updates — open the full section."
            : "Loading…"}
        </p>
      )}

      {section ? (
        <Link
          href={section.ctaHref}
          onClick={onNavigate}
          className="mega-nav-live__cta"
        >
          {section.ctaLabel}
        </Link>
      ) : null}
    </div>
  );
}
