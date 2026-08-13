"use client";

import { usePathname } from "next/navigation";
import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  SITE_MODAL_OPEN_EVENT,
  campaignByCtaKey,
  campaignById,
  isSiteModalAutoPathAllowed,
  isSiteModalPathSuppressed,
  pickWeightedCampaign,
  siteModalPolicy,
  type SiteModalOpenDetail,
  type SiteModalPoolItem,
} from "@/config/site-modals";
import { dispatchOpenNewsletterModal } from "@/config/newsletter-modal";
import { isSiteModalAutoEnabled } from "@/lib/feature-flags";
import { CampaignModalShell, type ShellModel } from "./campaign-modal-shell";
import { pickPoolItem } from "./content-pool";
import {
  trackSiteModalCta,
  trackSiteModalDismiss,
  trackSiteModalView,
} from "./site-modal-analytics";

type Props = {
  pool: SiteModalPoolItem[];
};

function ssGet(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function ssSet(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    /* private mode */
  }
}

function ssInt(key: string): number {
  const n = Number(ssGet(key) ?? "0");
  return Number.isFinite(n) ? n : 0;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function anotherDialogOpen(): boolean {
  const open = document.querySelectorAll("dialog[open]");
  return open.length > 0;
}

/**
 * Controller + orchestrator: open/close, data-site-cta, first-visit + capped rotation.
 */
export function SiteModalOrchestrator({ pool }: Props) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState<ShellModel | null>(null);
  const scrollingRef = useRef(false);
  const scrollTimer = useRef<number | null>(null);
  const activeIdRef = useRef<string | null>(null);

  useEffect(() => {
    startTransition(() => {
      setOpen(false);
      setModel(null);
      activeIdRef.current = null;
    });
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      scrollingRef.current = true;
      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
      scrollTimer.current = window.setTimeout(() => {
        scrollingRef.current = false;
      }, siteModalPolicy.scrollSettleMs);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
    };
  }, []);

  const autoCount = useCallback(
    () => ssInt(siteModalPolicy.storageKeys.autoShowCount),
    [],
  );

  const bumpAutoCount = useCallback(() => {
    ssSet(
      siteModalPolicy.storageKeys.autoShowCount,
      String(autoCount() + 1),
    );
  }, [autoCount]);

  const close = useCallback((persistDismiss: boolean) => {
    if (persistDismiss && activeIdRef.current) {
      trackSiteModalDismiss(activeIdRef.current);
    }
    setOpen(false);
    activeIdRef.current = null;
  }, []);

  const showModel = useCallback(
    (next: ShellModel, trig: string, isAuto: boolean) => {
      if (anotherDialogOpen() && !open) return;
      if (isAuto && scrollingRef.current) return;
      if (isAuto && prefersReducedMotion()) return;

      const modalId =
        next.kind === "top-story" ? `top-story:${next.item.slug}` : next.campaign.id;

      activeIdRef.current = modalId;
      setModel(next);
      setOpen(true);

      if (isAuto) bumpAutoCount();

      trackSiteModalView({
        modalId,
        trigger: trig,
        poolItem: next.kind === "top-story" ? next.item : null,
      });
    },
    [bumpAutoCount, open],
  );

  const showTopStory = useCallback(
    (trig: string, isAuto: boolean) => {
      const idx = ssInt(siteModalPolicy.storageKeys.newsIndex);
      const { item, nextIndex } = pickPoolItem(pool, idx, pathname);
      ssSet(siteModalPolicy.storageKeys.newsIndex, String(nextIndex));
      if (!item) return false;
      showModel({ kind: "top-story", item }, trig, isAuto);
      return true;
    },
    [pool, pathname, showModel],
  );

  const showCampaign = useCallback(
    (id: string, trig: string, isAuto: boolean) => {
      if (id === "newsletter") {
        // Reuse existing newsletter form modal for utility UX.
        if (isAuto) bumpAutoCount();
        trackSiteModalView({ modalId: "newsletter", trigger: trig });
        dispatchOpenNewsletterModal();
        return true;
      }
      const campaign = campaignById(id);
      if (!campaign) return false;
      showModel({ kind: "campaign", campaign }, trig, isAuto);
      return true;
    },
    [bumpAutoCount, showModel],
  );

  const showSlot = useCallback(
    (slot: string, trig: string, isAuto: boolean) => {
      if (slot === "top-story") return showTopStory(trig, isAuto);
      return showCampaign(slot, trig, isAuto);
    },
    [showCampaign, showTopStory],
  );

  /** Explicit open: CustomEvent + data-site-cta */
  useEffect(() => {
    const onOpen = (ev: Event) => {
      const detail = (ev as CustomEvent<SiteModalOpenDetail>).detail;
      const key = detail?.key;
      if (!key) return;
      if (isSiteModalPathSuppressed(pathname) && detail.trigger !== "click") {
        return;
      }
      if (key === "top-story" || key === "top-news") {
        showTopStory(detail.trigger ?? "programmatic", false);
        return;
      }
      const byCta = campaignByCtaKey(key);
      showCampaign(byCta?.id ?? key, detail.trigger ?? "programmatic", false);
    };
    window.addEventListener(SITE_MODAL_OPEN_EVENT, onOpen);

    const onClick = (ev: MouseEvent) => {
      const t = ev.target;
      if (!(t instanceof Element)) return;
      const el = t.closest<HTMLElement>("[data-site-cta]");
      if (!el) return;
      const key = el.getAttribute("data-site-cta");
      if (!key) return;
      // Allow default navigation only when no modal mapping — we always intercept mapped keys.
      if (
        key === "top-story" ||
        key === "top-news" ||
        campaignByCtaKey(key) ||
        campaignById(key)
      ) {
        ev.preventDefault();
        window.dispatchEvent(
          new CustomEvent(SITE_MODAL_OPEN_EVENT, {
            detail: { key, trigger: "click" } satisfies SiteModalOpenDetail,
          }),
        );
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener(SITE_MODAL_OPEN_EVENT, onOpen);
      document.removeEventListener("click", onClick);
    };
  }, [pathname, showCampaign, showTopStory]);

  /** Auto: first visit + capped rotation (homepage by policy). */
  useEffect(() => {
    if (!isSiteModalAutoEnabled()) return;
    if (!isSiteModalAutoPathAllowed(pathname)) return;
    if (prefersReducedMotion()) return;

    const { storageKeys, firstVisitDelayMs, rotationIntervalMs, maxAutoShowsPerSession, rotationSlots } =
      siteModalPolicy;

    let cancelled = false;
    let rotationTimer: number | null = null;

    const canAuto = () =>
      !cancelled &&
      autoCount() < maxAutoShowsPerSession &&
      !open &&
      !anotherDialogOpen() &&
      !scrollingRef.current;

    const runFirstVisit = () => {
      if (!canAuto()) return;
      if (ssGet(storageKeys.firstVisitShown) === "1") return;

      ssSet(storageKeys.firstVisitShown, "1");

      const pick = Math.random();
      if (pick < 0.45 && pool.length > 0) {
        if (showSlot("top-story", "first_visit", true)) return;
      }
      const c = pickWeightedCampaign(["whatsapp", "newsletter", "events", "civic", "today"]);
      showSlot(c.id, "first_visit", true);
    };

    const runRotation = () => {
      if (!canAuto()) return;
      const idx = ssInt(storageKeys.rotationIndex);
      const slot = rotationSlots[idx % rotationSlots.length];
      ssSet(storageKeys.rotationIndex, String(idx + 1));
      if (!showSlot(slot, "rotation", true) && slot === "top-story") {
        const c = pickWeightedCampaign(["whatsapp", "newsletter", "civic", "today"]);
        showSlot(c.id, "rotation", true);
      }
    };

    const firstTimer = window.setTimeout(runFirstVisit, firstVisitDelayMs);
    rotationTimer = window.setInterval(runRotation, rotationIntervalMs);

    return () => {
      cancelled = true;
      window.clearTimeout(firstTimer);
      if (rotationTimer) window.clearInterval(rotationTimer);
    };
  }, [pathname, pool.length, open, autoCount, showSlot]);

  const poolItem =
    model?.kind === "top-story" ? model.item : null;
  const modalId =
    model?.kind === "top-story"
      ? `top-story:${model.item.slug}`
      : model?.campaign.id ?? "unknown";

  const onPrimary = () => {
    trackSiteModalCta({
      modalId,
      cta: "primary",
      poolItem,
    });
    if (model?.kind === "campaign") {
      const action = model.campaign.primaryCta.action;
      if (action === "open-newsletter") {
        close(false);
        dispatchOpenNewsletterModal();
        return;
      }
      if (action === "dismiss") {
        close(true);
        return;
      }
    }
    close(false);
  };

  const onSecondary = () => {
    trackSiteModalCta({
      modalId,
      cta: "secondary",
      poolItem,
    });
    if (model?.kind === "campaign") {
      const action = model.campaign.secondaryCta?.action;
      if (action === "open-newsletter") {
        close(false);
        dispatchOpenNewsletterModal();
        return;
      }
    }
    close(true);
  };

  return (
    <CampaignModalShell
      open={open}
      model={model}
      onClose={close}
      onPrimary={onPrimary}
      onSecondary={onSecondary}
    />
  );
}
