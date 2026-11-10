"use client";

import Link from "next/link";
import { useState } from "react";
import type { ChennaiSeekerHubCard } from "@/lib/jobs/chennai-seekers-hub-helpers";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";

type Props = {
  cards: ChennaiSeekerHubCard[];
  totalProfiles: number;
  accommodationCount: number;
  immediateCount: number;
};

function pill(card: ChennaiSeekerHubCard): string {
  if (card.needsAccommodation) return "Stay needed";
  if (card.isImmediate) return "Immediate";
  if (card.availability) return card.availability;
  return "Available";
}

export function ChennaiSeekersHubStage({
  cards,
  totalProfiles,
  accommodationCount,
  immediateCount,
}: Props) {
  const picker = cards.slice(0, 8);
  const [activeId, setActiveId] = useState(picker[0]?.id ?? "");
  const active = picker.find((card) => card.id === activeId) ?? picker[0] ?? null;
  const stats = [
    { value: totalProfiles > 0 ? String(totalProfiles) : "—", label: "Profiles" },
    { value: String(immediateCount), label: "Can start soon" },
    { value: String(accommodationCount), label: "Need stay" },
    { value: "Chennai", label: "Where they can work" },
  ];

  return (
    <section className="mt-6" aria-labelledby="seekers-stage-title">
      <div className="overflow-hidden rounded-[28px] bg-[#0e1324] text-white shadow-[0_24px_60px_rgba(14,19,36,0.18)]">
        <div className="grid gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)] lg:items-center lg:px-10 lg:py-12">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-[#b7b4ff] uppercase">
              People available
            </p>
            <h1
              id="seekers-stage-title"
              className="mt-3 max-w-xl text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl"
            >
              Looking for work in{" "}
              <span className="text-[#7aa2ff] italic">Chennai</span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
              Residents posting that they can work — watchmen, caretakers,
              household help, and similar roles. Read the profile, then reach
              them on the contact they published.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#chennai-seekers-board"
                className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0e1324] hover:bg-[#f3f0ff]"
              >
                See profiles
              </a>
              <Link
                href="/contact#jobs"
                className="inline-flex items-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/60"
              >
                Post availability
              </Link>
              <Link
                href={CHENNAI_JOBS_HUB_PATH}
                className="inline-flex items-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/60"
              >
                Browse open jobs
              </Link>
            </div>
          </div>

          <div className="rounded-[22px] bg-white text-[#16161d] shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
            <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">
              <div className="border-b border-[#eceaf3] p-3 md:border-r md:border-b-0">
                <p className="px-2 pt-1 pb-2 text-[10px] font-semibold tracking-[0.14em] text-[#8b87a8] uppercase">
                  Available now
                </p>
                {picker.length === 0 ? (
                  <p className="px-2 py-6 text-sm text-[#5c5872]">
                    No profiles yet. A person can post that they are looking
                    for work from the contact form.
                  </p>
                ) : (
                  <ul className="max-h-[340px] space-y-1 overflow-auto">
                    {picker.map((card) => {
                      const selected = card.id === active?.id;
                      return (
                        <li key={card.id}>
                          <button
                            type="button"
                            onMouseEnter={() => setActiveId(card.id)}
                            onFocus={() => setActiveId(card.id)}
                            onClick={() => setActiveId(card.id)}
                            className={
                              selected
                                ? "flex w-full items-center gap-3 rounded-2xl bg-[#f4f1ff] px-2.5 py-2 text-left"
                                : "flex w-full items-center gap-3 rounded-2xl px-2.5 py-2 text-left hover:bg-[#f7f7fb]"
                            }
                            aria-pressed={selected}
                          >
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#ece9ff] text-[11px] font-semibold text-[#3d348f]">
                              {card.initials.slice(0, 3)}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-semibold">
                                {card.title}
                              </span>
                              <span className="block truncate text-xs text-[#6d6886]">
                                {card.roleSought || card.location || "Chennai"}
                              </span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-[10px] font-semibold tracking-[0.14em] text-[#8b87a8] uppercase">
                  This profile
                </p>
                {active ? (
                  <>
                    <div className="mt-3 rounded-2xl bg-gradient-to-br from-[#241a4a] to-[#3d348f] px-4 py-5 text-white">
                      <p className="text-[11px] tracking-[0.12em] uppercase opacity-80">
                        {active.location || "Chennai"}
                      </p>
                      <p className="mt-2 text-2xl font-semibold tracking-tight">{pill(active)}</p>
                      <p className="mt-1 text-xs text-white/75">
                        {active.seekerLabel || "Looking for work"}
                      </p>
                    </div>
                    <h2 className="mt-4 text-lg leading-snug font-semibold">{active.title}</h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#5c5872]">
                      {active.excerpt}
                    </p>
                    <Link
                      href={active.href}
                      className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#6d5efc] to-[#8a5cff] px-4 py-2.5 text-sm font-semibold text-white"
                    >
                      Open this profile
                    </Link>
                  </>
                ) : (
                  <p className="mt-4 text-sm text-[#5c5872]">
                    Profiles appear here after they are published.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-[#eceaf3] bg-white px-4 py-4">
            <dt className="text-xs text-[#6d6886]">{stat.label}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-[#16161d]">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
