"use client";

import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MegaNavPanel } from "./mega-nav-panel";
import { MEGA_NAV_SECTIONS, getMegaNavSection } from "./nav-config";

const CLOSE_DELAY_MS = 160;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`shrink-0 opacity-60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function MegaNavDesktop() {
  const [openId, setOpenId] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenId(null), CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const reveal = useCallback(
    (id: string) => {
      clearCloseTimer();
      setOpenId(id);
    },
    [clearCloseTimer],
  );

  useEffect(() => {
    startTransition(() => setOpenId(null));
  }, [pathname]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenId(null);
    }
    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpenId(null);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  useEffect(
    () => () => {
      clearCloseTimer();
    },
    [clearCloseTimer],
  );

  const active = getMegaNavSection(openId);

  return (
    <div
      ref={rootRef}
      className="relative hidden min-w-0 w-full justify-center md:flex"
      onMouseLeave={scheduleClose}
    >
      <div className="relative flex w-full items-center justify-center">
        <ul
          className="flex flex-nowrap items-center justify-center"
          role="menubar"
          aria-label="Site sections"
        >
          {MEGA_NAV_SECTIONS.map((s) => {
            const isOpen = openId === s.id;
            return (
              <li key={s.id} role="none" className="shrink-0" onMouseEnter={() => reveal(s.id)}>
                <button
                  type="button"
                  role="menuitem"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  aria-controls={isOpen ? `mega-panel-${s.id}` : undefined}
                  aria-label={s.label}
                  id={`mega-trigger-${s.id}`}
                  className="focus-ring flex min-h-11 cursor-pointer items-center gap-0.5 whitespace-nowrap rounded-xl px-2 py-2 text-[13px] font-semibold text-[var(--muted)] transition hover:bg-[color-mix(in_srgb,var(--accent)_8%,var(--surface))] hover:text-[var(--foreground)] data-[open=true]:bg-[color-mix(in_srgb,var(--accent)_10%,var(--surface))] data-[open=true]:text-[var(--accent)] lg:gap-1 lg:px-2.5 xl:px-3.5 xl:text-sm"
                  data-open={isOpen}
                  onFocus={() => reveal(s.id)}
                  onClick={() =>
                    setOpenId((prev) => (prev === s.id ? null : s.id))
                  }
                >
                  {s.shortLabel ?? s.label}
                  <Chevron open={isOpen} />
                </button>
              </li>
            );
          })}
        </ul>

        {active ? (
          <>
            <div
              className="mega-nav-scrim fixed inset-0 top-[var(--site-header-offset,4.5rem)] z-[54]"
              aria-hidden
              onClick={() => setOpenId(null)}
            />
            <div
              className="mega-nav-surface mega-nav-dropdown absolute left-1/2 top-full z-[55] w-screen max-w-[100vw] -translate-x-1/2"
              id={`mega-panel-${active.id}`}
              role="region"
              aria-labelledby={`mega-trigger-${active.id}`}
              onMouseEnter={clearCloseTimer}
            >
              <div className="mega-nav-mesh mx-auto max-w-[1536px] px-4 py-5 sm:px-6 sm:py-6">
                <div className="mega-nav-card">
                  <MegaNavPanel section={active} />
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
