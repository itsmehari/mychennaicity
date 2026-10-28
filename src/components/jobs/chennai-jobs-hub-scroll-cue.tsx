"use client";

import { useEffect, useState } from "react";

const BOARD_ID = "chennai-jobs-board";

function boardIsBelowFold(target: HTMLElement) {
  return target.getBoundingClientRect().top > window.innerHeight * 0.82;
}

type Props = {
  totalJobs: number;
};

export function ChennaiJobsHubScrollCue({ totalJobs }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(BOARD_ID);
    if (!target) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setVisible(boardIsBelowFold(target));
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!visible) return null;

  const countLabel = `${totalJobs} open job${totalJobs === 1 ? "" : "s"}`;

  return (
    <div className="mcc-jobs-hub__scroll-cue-anchor">
      <button
        type="button"
        className="mcc-jobs-hub__scroll-cue"
        aria-controls={BOARD_ID}
        aria-label={`${countLabel} — scroll to search and browse listings`}
        onClick={() => {
          const target = document.getElementById(BOARD_ID);
          if (!target) return;
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        }}
      >
        <span className="mcc-jobs-hub__scroll-cue-badge">{countLabel}</span>
        <span className="mcc-jobs-hub__scroll-cue-title">Search & browse jobs</span>
        <span className="mcc-jobs-hub__scroll-cue-chevron" aria-hidden>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
            <path
              d="M7 9.5 12 14.5 17 9.5"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}
