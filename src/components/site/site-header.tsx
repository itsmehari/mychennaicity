"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState, type CSSProperties } from "react";
import { DeskPostAnchor } from "@/components/free-posting/desk-post-context";
import { headerLangFromPathname } from "@/lib/header-lang";
import {
  WHATSAPP_COMMUNITY_JOIN_PATH,
  whatsappCommunityJoinHref,
} from "@/lib/whatsapp-community";
import { whatsappHeaderJoinLabel } from "@/lib/whatsapp-link";
import { HeaderWhatsAppMark } from "./header-whatsapp-mark";
import { MegaNavDesktop } from "./mega-nav-desktop";
import { MegaNavMobile } from "./mega-nav-mobile";
import { SiteSearchForm } from "./site-search-form";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const pathname = usePathname() ?? "";
  const onJobsDesk = pathname.startsWith("/chennai-jobs");
  const onJoinForm = pathname.startsWith(WHATSAPP_COMMUNITY_JOIN_PATH);
  const headerLang = headerLangFromPathname(pathname);
  const headerWaLabel = whatsappHeaderJoinLabel(headerLang);

  return (
    <header
      className="site-header-bar sticky top-0 z-[60] w-full border-b border-[var(--border)] border-t-[3px] border-t-[var(--accent)] bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] backdrop-blur-md supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--surface)_78%,transparent)]"
      style={{ "--site-header-offset": "4.25rem" } as CSSProperties}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--accent)_35%,transparent)] to-transparent" />

      <div className="relative mx-auto grid max-w-[1536px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-4 py-3 md:gap-3 md:py-3.5 lg:px-6">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          onClick={closeMobile}
        >
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)] text-sm font-bold text-[var(--accent-fg)] shadow-md transition group-hover:scale-[1.03] group-hover:shadow-lg md:h-12 md:w-12 md:rounded-2xl md:text-base"
            aria-hidden
          >
            MC
          </span>
          <span className="hidden min-w-0 flex-col leading-tight sm:flex">
            <span className="type-display text-base text-[var(--foreground)] md:text-lg">
              mychennaicity
            </span>
            <span className="hidden text-[11px] font-light text-[var(--muted)] xl:block">
              News · directory · jobs · local events
            </span>
          </span>
        </Link>

        <MegaNavDesktop />

        <div className="flex shrink-0 items-center gap-2">
          {onJobsDesk ? (
            <DeskPostAnchor
              kind="job"
              className="mcc-supply-cta mcc-supply-cta--compact mcc-supply-cta--header"
              onClick={closeMobile}
            >
              Post a job
            </DeskPostAnchor>
          ) : null}
          <Link
            href="/contact"
            className="focus-ring inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--accent)_28%,var(--border))] bg-[color-mix(in_srgb,var(--accent)_8%,var(--surface))] text-[var(--accent)] transition hover:border-[var(--accent)] lg:min-w-0 lg:px-3.5 lg:py-2"
            aria-label="Contact"
            title="Contact"
            onClick={closeMobile}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <path d="m22 6-10 7L2 6" />
            </svg>
            <span className="hidden text-xs font-bold lg:inline">Contact</span>
          </Link>
          {onJoinForm ? null : (
            <Link
              href={whatsappCommunityJoinHref("nav")}
              data-site-cta="whatsapp"
              data-wa-type="request"
              data-wa-placement="header"
              data-wa-content="nav"
              className="focus-ring inline-flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-3 py-2 text-xs font-bold text-white shadow-[0_8px_20px_-10px_rgba(37,211,102,0.9)] ring-2 ring-[color-mix(in_srgb,#25D366_35%,transparent)] transition hover:bg-[#1ebe5d] sm:min-w-0 sm:px-4"
              aria-label={headerWaLabel}
              title={headerWaLabel}
              onClick={closeMobile}
            >
              <HeaderWhatsAppMark className="h-[1.125rem] w-[1.125rem] sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">{headerWaLabel}</span>
            </Link>
          )}
          <SiteSearchForm />
          <button
            type="button"
            className="focus-ring inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-[var(--foreground)] md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-mega-nav"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="sr-only">Open menu</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-mega-nav" aria-live="polite">
        <MegaNavMobile open={mobileOpen} onClose={closeMobile} />
      </div>
    </header>
  );
}
