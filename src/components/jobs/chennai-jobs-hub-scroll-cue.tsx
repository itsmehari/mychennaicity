"use client";

import { useEffect, useState } from "react";

const BOARD_ID = "chennai-jobs-board";

function boardIsBelowFold(target: HTMLElement) {
  return target.getBoundingClientRect().top > window.innerHeight * 0.82;
}

export function ChennaiJobsHubScrollCue() {
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

  return (
    <button
      type="button"
      className="mcc-jobs-hub__scroll-cue"
      aria-controls={BOARD_ID}
      onClick={() => {
        const target = document.getElementById(BOARD_ID);
        if (!target) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }}
    >
      <span>See open jobs</span>
      <span className="mcc-jobs-hub__scroll-cue-chevron" aria-hidden>
        <svg viewBox="0 0 20 20" width="18" height="18" fill="none">
          <path
            d="M5 7.5 10 12.5 15 7.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
