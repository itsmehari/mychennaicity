"use client";

import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import type { HomeSpotlightEvent, HomeSpotlightJob } from "@/lib/home-feed";

let scrollTriggerRegistered = false;

function ensureScrollTrigger() {
  if (typeof window === "undefined" || scrollTriggerRegistered) return;
  gsap.registerPlugin(ScrollTrigger);
  scrollTriggerRegistered = true;
}

const cardHover =
  "transition-shadow duration-200 ease-out hover:shadow-lg";

export function JobsSpotlightList({ jobs }: { jobs: HomeSpotlightJob[] }) {
  const rootRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    ensureScrollTrigger();
    const items = root.querySelectorAll<HTMLElement>("[data-spotlight-item]");
    if (!items.length) return;

    gsap.set(items, { opacity: 0, y: 22 });
    const ctx = gsap.context(() => {
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.48,
        ease: "power2.out",
        stagger: 0.09,
        scrollTrigger: {
          trigger: root,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    }, root);
    return () => ctx.revert();
  }, [jobs]);

  if (jobs.length === 0) return null;

  return (
    <ul
      ref={rootRef}
      className="home-spotlight-jobs flex flex-nowrap gap-4 overflow-x-auto overflow-y-visible pb-3 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] snap-x snap-mandatory scroll-pl-4 scroll-pr-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:pl-0 sm:pr-0 sm:snap-none lg:grid-cols-4"
      aria-label="Featured job listings"
    >
      {jobs.map((j, i) => {
        const className = `home-spotlight-link home-bento-tile ${cardHover} flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
          i === 0
            ? "relative overflow-hidden bg-[color-mix(in_srgb,var(--accent)_7%,var(--surface))] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(120deg,transparent_40%,color-mix(in_srgb,var(--accent)_12%,transparent)_100%)] lg:min-h-[11rem] lg:flex-row lg:items-center lg:gap-8 lg:p-8"
            : ""
        }`;
        const inner = (
          <>
            <div className={i === 0 ? "lg:max-w-md" : ""}>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                {i === 0 ? "Featured role" : "Open role"}
              </p>
              <p
                className={`mt-1 font-semibold text-[var(--foreground)] ${
                  i === 0 ? "text-lg sm:text-xl" : "text-sm"
                }`}
              >
                {j.title}
              </p>
              <p className="mt-1 text-xs text-[var(--muted)]">{j.company}</p>
            </div>
            <p
              className={`mt-3 text-xs font-bold text-[var(--accent)] lg:mt-0 ${
                i === 0 ? "lg:ml-auto lg:text-sm" : ""
              }`}
            >
              {j.location} · View listing
            </p>
          </>
        );
        return (
          <li
            key={`${j.href}-${j.title}`}
            data-spotlight-item
            className={`shrink-0 snap-center first:pl-0 sm:first:pl-0 ${
              i === 0
                ? "min-w-[min(92vw,22rem)] sm:col-span-2 sm:min-w-0"
                : "min-w-[min(78vw,17rem)] sm:min-w-0"
            }`}
          >
            {j.external ? (
              <a
                href={j.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {inner}
              </a>
            ) : (
              <Link href={j.href} className={className}>
                {inner}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function EventsFeaturedList({ events }: { events: HomeSpotlightEvent[] }) {
  const rootRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    ensureScrollTrigger();
    const items = root.querySelectorAll<HTMLElement>("[data-spotlight-item]");
    if (!items.length) return;

    gsap.set(items, { opacity: 0, y: 22 });
    const ctx = gsap.context(() => {
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: root,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    }, root);
    return () => ctx.revert();
  }, [events]);

  if (events.length === 0) return null;

  return (
    <ul
      ref={rootRef}
      className="home-spotlight-events flex flex-nowrap gap-4 overflow-x-auto overflow-y-visible pb-3 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] snap-x snap-mandatory scroll-pl-4 scroll-pr-4 lg:grid lg:grid-cols-2 lg:overflow-visible lg:pb-0 lg:pl-0 lg:pr-0 lg:snap-none"
      aria-label="Featured events"
    >
      {events.map((e, i) => {
        const className = `home-spotlight-link home-bento-tile ${cardHover} flex rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
          i === 0
            ? "flex-col gap-4 border-l-4 border-l-[var(--accent-warm)] p-6 sm:flex-row sm:items-center sm:justify-between"
            : "flex-col p-5"
        }`;
        const inner = (
          <>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-warm)]">
                {i === 0 ? "Headline" : "On our calendar"}
              </p>
              <p
                className={`font-semibold text-[var(--foreground)] ${
                  i === 0 ? "text-lg sm:text-xl" : "text-sm"
                }`}
              >
                {e.title}
              </p>
              <p className="text-xs text-[var(--muted)]">{e.when}</p>
            </div>
            <p className="shrink-0 rounded-xl bg-[color-mix(in_srgb,var(--accent-warm)_12%,var(--surface))] px-4 py-2 text-center text-xs font-bold text-[var(--accent-warm)] sm:text-left">
              {e.where}
            </p>
          </>
        );
        return (
          <li
            key={`${e.href}-${e.title}`}
            data-spotlight-item
            className={`shrink-0 snap-center first:pl-0 lg:min-w-0 ${
              i === 0
                ? "min-w-[min(92vw,22rem)] lg:col-span-2"
                : "min-w-[min(78vw,17rem)]"
            }`}
          >
            {e.external ? (
              <a
                href={e.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {inner}
              </a>
            ) : (
              <Link href={e.href} className={className}>
                {inner}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
