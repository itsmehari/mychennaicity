"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DISMISS_COOLDOWN_MS,
  LS_NEWSLETTER_DISMISSED_AT,
  LS_NEWSLETTER_SUBSCRIBED_AT,
  NEWSLETTER_OPEN_EVENT,
  SS_NEWSLETTER_AUTO_SHOWN,
  newsletterRuleForPathname,
} from "@/config/newsletter-modal";
import { NewsletterModal } from "./newsletter-modal";

function readLs(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeLs(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private mode */
  }
}

function shouldReduceMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function NewsletterModalHost() {
  const pathname = usePathname() ?? "/";
  const rule = useMemo(() => newsletterRuleForPathname(pathname), [pathname]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const skipAuto = useCallback(() => {
    if (typeof window === "undefined") return true;
    if (readLs(LS_NEWSLETTER_SUBSCRIBED_AT)) return true;
    const dismissedAt = readLs(LS_NEWSLETTER_DISMISSED_AT);
    if (dismissedAt) {
      const t = Number(dismissedAt);
      if (!Number.isNaN(t) && Date.now() - t < DISMISS_COOLDOWN_MS) {
        return true;
      }
    }
    if (sessionStorage.getItem(SS_NEWSLETTER_AUTO_SHOWN) === "1") return true;
    if (shouldReduceMotion()) return true;
    return false;
  }, []);

  const openModal = useCallback((isAuto: boolean) => {
    setOpen(true);
    if (isAuto) {
      try {
        sessionStorage.setItem(SS_NEWSLETTER_AUTO_SHOWN, "1");
      } catch {
        /* */
      }
    }
  }, []);

  /** Manual: footer button, custom event, #newsletter hash */
  useEffect(() => {
    const onEvent = () => setOpen(true);
    window.addEventListener(NEWSLETTER_OPEN_EVENT, onEvent);
    return () => window.removeEventListener(NEWSLETTER_OPEN_EVENT, onEvent);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#newsletter") {
      window.dispatchEvent(new CustomEvent(NEWSLETTER_OPEN_EVENT));
      history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }
  }, [pathname]);

  /** Auto-open from rule (new timer/scroll listener per pathname) */
  useEffect(() => {
    if (!rule) return;
    if (skipAuto()) return;

    let cancelled = false;
    let opened = false;

    const tryOpen = () => {
      if (cancelled || opened) return;
      if (skipAuto()) return;
      opened = true;
      openModal(true);
    };

    const timer = window.setTimeout(tryOpen, rule.delayMs);

    const scrollPct = rule.scrollPercent;
    if (scrollPct != null) {
      const onScroll = () => {
        const doc = document.documentElement;
        const h = doc.scrollHeight - doc.clientHeight;
        if (h <= 0) return;
        const pct = (doc.scrollTop / h) * 100;
        if (pct >= scrollPct) tryOpen();
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => {
        cancelled = true;
        window.clearTimeout(timer);
        window.removeEventListener("scroll", onScroll);
      };
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [pathname, rule, openModal, skipAuto]);

  const handleDismissPersist = useCallback(() => {
    writeLs(LS_NEWSLETTER_DISMISSED_AT, String(Date.now()));
  }, []);

  const handleSubscribeSuccess = useCallback(() => {
    writeLs(LS_NEWSLETTER_SUBSCRIBED_AT, String(Date.now()));
  }, []);

  return (
    <NewsletterModal
      open={open}
      onClose={() => setOpen(false)}
      onDismissPersist={handleDismissPersist}
      onSubscribeSuccess={handleSubscribeSuccess}
    />
  );
}
