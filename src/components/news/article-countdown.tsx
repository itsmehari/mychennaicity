"use client";

import { useEffect, useState } from "react";
import type { ArticleCountdownData } from "@/lib/article-countdown";

export type { ArticleCountdownData } from "@/lib/article-countdown";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function useCountdown(endsAt: string) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const end = new Date(endsAt).getTime();
  if (Number.isNaN(end)) {
    return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const diff = Math.max(0, end - now);
  return {
    expired: diff === 0,
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

export function ArticleCountdown({ data }: { data: ArticleCountdownData }) {
  const { expired, days, hours, minutes, seconds } = useCountdown(data.endsAt);

  const units = [
    { label: "Days", value: pad(days) },
    { label: "Hours", value: pad(hours) },
    { label: "Mins", value: pad(minutes) },
    { label: "Secs", value: pad(seconds) },
  ];

  return (
    <aside className="civic-countdown" aria-label={data.title}>
      <div className="civic-countdown__eyebrow">Deadline watch</div>
      <h2 className="civic-countdown__title">{data.title}</h2>
      {data.subtitle ? (
        <p className="civic-countdown__subtitle">{data.subtitle}</p>
      ) : null}

      {expired ? (
        <p className="civic-countdown__expired" role="status">
          {data.expiredLabel?.trim() ||
            "The indicated window has ended. Register immediately if you have not already."}
        </p>
      ) : (
        <div
          className="civic-countdown__grid"
          role="timer"
          aria-live="polite"
          aria-atomic="true"
        >
          {units.map((u) => (
            <div key={u.label} className="civic-countdown__unit">
              <span className="civic-countdown__value">{u.value}</span>
              <span className="civic-countdown__label">{u.label}</span>
            </div>
          ))}
        </div>
      )}

      {(data.ctaUrl && data.ctaLabel) ||
      (data.secondaryCtaUrl && data.secondaryCtaLabel) ? (
        <div className="civic-countdown__actions">
          {data.ctaUrl && data.ctaLabel ? (
            <a
              href={data.ctaUrl}
              className="civic-countdown__cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.ctaLabel}
            </a>
          ) : null}
          {data.secondaryCtaUrl && data.secondaryCtaLabel ? (
            <a
              href={data.secondaryCtaUrl}
              className="civic-countdown__cta civic-countdown__cta--secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.secondaryCtaLabel}
            </a>
          ) : null}
        </div>
      ) : null}

      {data.note ? <p className="civic-countdown__note">{data.note}</p> : null}
    </aside>
  );
}
