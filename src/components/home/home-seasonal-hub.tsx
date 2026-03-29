"use client";

import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

let scrollTriggerRegistered = false;

function ensureScrollTrigger() {
  if (typeof window === "undefined" || scrollTriggerRegistered) return;
  gsap.registerPlugin(ScrollTrigger);
  scrollTriggerRegistered = true;
}

/**
 * Tamil Nadu election seasonal band — GSAP scroll reveal + subtle orb motion.
 * Respects prefers-reduced-motion (no JS animation; static layout).
 */
export function HomeSeasonalHub() {
  const rootRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    ensureScrollTrigger();

    const ctx = gsap.context(() => {
      const ctas = ctasRef.current?.children;
      const targets = [
        eyebrowRef.current,
        titleRef.current,
        bodyRef.current,
      ].filter(Boolean);

      gsap.set(targets, { opacity: 0, y: 20 });
      if (ctas?.length) {
        gsap.set(Array.from(ctas), { opacity: 0, y: 16 });
      }
      if (orbRef.current) {
        gsap.set(orbRef.current, { scale: 0.88, opacity: 0.28 });
      }

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: root,
          start: "top 86%",
          toggleActions: "play none none none",
        },
      });

      if (orbRef.current) {
        tl.to(orbRef.current, {
          scale: 1,
          opacity: 0.42,
          duration: 0.85,
        });
      }

      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.38 }, "-=0.55")
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.48 }, "-=0.28")
        .to(bodyRef.current, { opacity: 1, y: 0, duration: 0.42 }, "-=0.32");

      if (ctas?.length) {
        tl.to(
          Array.from(ctas),
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.12 },
          "-=0.22",
        );
      }

      if (orbRef.current) {
        gsap.to(orbRef.current, {
          x: 10,
          y: -6,
          duration: 4.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--accent-warm)_14%,var(--surface))] p-6 shadow-md sm:p-10"
    >
      <div
        ref={orbRef}
        className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full blur-2xl will-change-transform"
        style={{
          background: `radial-gradient(circle, var(--accent-warm), transparent 70%)`,
        }}
        aria-hidden
      />
      <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p
            ref={eyebrowRef}
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-warm)]"
          >
            Seasonal hub
          </p>
          <h2
            ref={titleRef}
            className="type-display mt-3 text-2xl text-[var(--foreground)] sm:text-3xl"
          >
            Tamil Nadu Assembly Election 2026 — Chennai voter guide
          </h2>
          <p
            ref={bodyRef}
            className="type-lede mt-3 max-w-2xl text-sm leading-relaxed sm:text-base"
          >
            Constituency explainers, roll updates, and polling-day checklists —
            we’ll host a dedicated guide path; this band is the home-page slot
            for timely campaigns.
          </p>
        </div>
        <div
          ref={ctasRef}
          className="flex flex-col gap-3 sm:flex-row lg:flex-col"
        >
          <Link
            href="/chennai-local-news/topic/elections"
            className="inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-8 py-3 text-center text-sm font-bold text-[var(--background)] shadow-lg transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            Election news and explainers
          </Link>
          <Link
            href="/chennai-local-events"
            className="inline-flex items-center justify-center rounded-full border-2 border-[color-mix(in_srgb,var(--foreground)_25%,transparent)] bg-[var(--surface)] px-8 py-3 text-center text-sm font-bold text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            Town-hall events
          </Link>
        </div>
      </div>
    </div>
  );
}
