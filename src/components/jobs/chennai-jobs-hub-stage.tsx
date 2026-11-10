"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { WhatsAppCommunityJoinLink } from "@/components/community/whatsapp-community-join-link";
import type { ChennaiJobsHubCard } from "@/lib/jobs/chennai-jobs-hub-helpers";
import { ADVERTISE_JOBS_PATH } from "@/lib/routes/advertise-listings";

type Lane = "all" | "freshers" | "walk-in" | "office" | "featured";

const LANES: { id: Lane; label: string }[] = [
  { id: "all", label: "All openings" },
  { id: "freshers", label: "Freshers" },
  { id: "walk-in", label: "Walk-in" },
  { id: "office", label: "Office" },
  { id: "featured", label: "Featured" },
];

const COMPARE = [
  ["Where", "A named Chennai area on the listing", "Often only “Chennai”, or no place at all"],
  ["Apply", "The employer’s own page, mail, or phone", "A personal number with no company named"],
  ["Money", "Free to read. We do not charge to show a role", "Often asks for a registration or training fee"],
  ["Check", "Published after a basic editorial check", "Anyone can forward it"],
  ["Hiring", "The employer hires. We do not collect your CV", "The sender may be collecting CVs"],
] as const;

type Props = {
  cards: ChennaiJobsHubCard[];
  totalJobs: number;
  fresherCount: number;
  walkInCount: number;
  seekingCount: number;
};

function inLane(card: ChennaiJobsHubCard, lane: Lane): boolean {
  if (lane === "all") return true;
  if (lane === "freshers") return card.isFresherFriendly;
  if (lane === "walk-in") return card.isWalkIn;
  if (lane === "featured") return card.featured;
  const mode = (card.workMode ?? "").toLowerCase();
  return mode.includes("office") || mode.includes("on-site") || mode.includes("onsite");
}

function pill(card: ChennaiJobsHubCard): string {
  if (card.compensation) return card.compensation;
  if (card.isWalkIn) return "Walk-in";
  if (card.isFresherFriendly) return "Freshers";
  return "Open";
}

export function ChennaiJobsHubStage({
  cards,
  totalJobs,
  fresherCount,
  walkInCount,
  seekingCount,
}: Props) {
  const picker = cards.slice(0, 8);
  const [activeId, setActiveId] = useState(picker[0]?.id ?? "");
  const [lane, setLane] = useState<Lane>("all");
  const active = picker.find((card) => card.id === activeId) ?? picker[0] ?? null;

  const laneCards = useMemo(
    () => cards.filter((card) => inLane(card, lane)).slice(0, 12),
    [cards, lane],
  );

  const stats = [
    { value: totalJobs > 0 ? String(totalJobs) : "—", label: "Open roles" },
    { value: String(fresherCount), label: "Fresher-friendly" },
    { value: String(walkInCount), label: "Walk-ins" },
    { value: String(seekingCount), label: "People looking" },
  ];

  return (
    <section className="mt-6" aria-labelledby="jobs-stage-title">
      <div className="overflow-hidden rounded-[28px] bg-[#0e1324] text-white shadow-[0_24px_60px_rgba(14,19,36,0.18)]">
        <div className="grid gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)] lg:items-center lg:px-10 lg:py-12">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-[#b7b4ff] uppercase">
              Currently hiring
            </p>
            <h1
              id="jobs-stage-title"
              className="mt-3 max-w-xl text-4xl leading-[1.05] font-semibold tracking-tight text-white sm:text-5xl"
            >
              Work that is actually in{" "}
              <span className="text-[#7aa2ff] italic">Chennai</span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
              Local openings, walk-ins, and office roles. Read the full notice
              here, then apply only on the employer’s own page or phone.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#chennai-jobs-board"
                className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0e1324] transition hover:bg-[#f3f0ff]"
              >
                See open roles
              </a>
              <Link
                href={ADVERTISE_JOBS_PATH}
                className="inline-flex items-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/60"
              >
                Post a job
              </Link>
            </div>
          </div>

          <div className="rounded-[22px] bg-white text-[#16161d] shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
            <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">
              <div className="border-b border-[#eceaf3] p-3 md:border-r md:border-b-0">
                <p className="px-2 pt-1 pb-2 text-[10px] font-semibold tracking-[0.14em] text-[#8b87a8] uppercase">
                  Open right now
                </p>
                {picker.length === 0 ? (
                  <p className="px-2 py-6 text-sm text-[#5c5872]">
                    No open listings yet. Employers can post a role and it will
                    show here after a check.
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
                            <span
                              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#ece9ff] text-[11px] font-semibold text-[#3d348f]"
                              aria-hidden
                            >
                              {card.initials.slice(0, 3)}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-semibold text-[#1c1733]">
                                {card.title}
                              </span>
                              <span className="block truncate text-xs text-[#6d6886]">
                                {card.employerName}
                              </span>
                            </span>
                            <span
                              className={
                                selected
                                  ? "hidden shrink-0 rounded-full bg-[#5b4dff] px-2.5 py-1 text-[10px] font-semibold text-white sm:inline"
                                  : "hidden shrink-0 rounded-full bg-[#eef0f6] px-2.5 py-1 text-[10px] font-semibold text-[#3c3954] sm:inline"
                              }
                            >
                              {pill(card)}
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
                  This role
                </p>
                {active ? (
                  <>
                    <div className="mt-3 overflow-hidden rounded-2xl bg-gradient-to-br from-[#123c34] via-[#1a4d42] to-[#2a6b4f] px-4 py-5 text-white">
                      <p className="text-[11px] tracking-[0.12em] uppercase opacity-80">
                        {active.location || "Chennai"}
                      </p>
                      <p className="mt-2 text-2xl font-semibold tracking-tight">
                        {active.compensation ?? "Pay on the listing"}
                      </p>
                      <p className="mt-1 text-xs text-white/75">{active.employerName}</p>
                    </div>
                    <h2 className="mt-4 text-lg leading-snug font-semibold text-[#16161d]">
                      {active.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#5c5872]">
                      {active.excerpt}
                    </p>
                    <Link
                      href={active.href}
                      className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#6d5efc] to-[#8a5cff] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(109,94,252,0.35)] transition hover:brightness-110"
                    >
                      Open this role
                    </Link>
                  </>
                ) : (
                  <p className="mt-4 text-sm text-[#5c5872]">
                    Listings appear here as soon as an opening is published.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#eceaf3] bg-white px-4 py-4"
          >
            <dt className="text-xs text-[#6d6886]">{stat.label}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-[#16161d]">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-[#16161d] sm:text-3xl">
          Why read a job <span className="text-[#5b4dff] italic">here</span>
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-[#5c5872]">
          Same facts as the listing page. This is how a notice on this board
          differs from a job pasted into a chat.
        </p>
        <div className="mt-5 overflow-x-auto rounded-3xl border border-[#eceaf3] bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#eceaf3] text-xs tracking-wide text-[#6d6886] uppercase">
                <th className="px-4 py-3 font-semibold sm:px-6"> </th>
                <th className="bg-[#f6f4ff] px-4 py-3 font-semibold text-[#3d348f] sm:px-6">
                  This board
                  <span className="ml-2 rounded-full bg-[#5b4dff] px-2 py-0.5 text-[10px] font-semibold tracking-normal text-white normal-case">
                    Recommended
                  </span>
                </th>
                <th className="px-4 py-3 font-semibold sm:px-6">A forwarded post</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map(([label, here, there]) => (
                <tr key={label} className="border-b border-[#f1f0f5] last:border-0">
                  <th className="px-4 py-4 font-semibold text-[#16161d] sm:px-6">{label}</th>
                  <td className="bg-[#f6f4ff] px-4 py-4 text-[#2a2640] sm:px-6">{here}</td>
                  <td className="px-4 py-4 text-[#5c5872] sm:px-6">{there}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-tight text-[#16161d]">
            Browse by the kind of work
          </h2>
          <WhatsAppCommunityJoinLink
            utmContent="jobs-hub-stage"
            className="text-sm font-semibold text-[#5b4dff] underline-offset-4 hover:underline"
          >
            Jobs updates on WhatsApp
          </WhatsAppCommunityJoinLink>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Job lanes">
          {LANES.map((item) => {
            const selected = lane === item.id;
            const count = cards.filter((card) => inLane(card, item.id)).length;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setLane(item.id)}
                className={
                  selected
                    ? "shrink-0 rounded-full bg-[#16161d] px-4 py-2 text-sm font-semibold text-white"
                    : "shrink-0 rounded-full border border-[#e4e1ee] bg-white px-4 py-2 text-sm font-semibold text-[#3c3954] hover:border-[#c9c4de]"
                }
              >
                {item.label}
                <span className={selected ? "ml-1.5 text-white/70" : "ml-1.5 text-[#8b87a8]"}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex snap-x gap-3 overflow-x-auto pb-2">
          {laneCards.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-[#e4e1ee] px-4 py-8 text-sm text-[#5c5872]">
              {lane === "all"
                ? "No open listings yet."
                : "Nothing in this lane right now. Try All openings."}
            </p>
          ) : (
            laneCards.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                className="w-[260px] shrink-0 snap-start rounded-[22px] border border-[#eceaf3] bg-white p-4 shadow-[0_10px_30px_rgba(22,22,29,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(22,22,29,0.08)]"
              >
                <span className="inline-flex rounded-full bg-[#f4f1ff] px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#3d348f] uppercase">
                  {pill(card)}
                </span>
                <span className="mt-3 block text-base leading-snug font-semibold text-[#16161d]">
                  {card.title}
                </span>
                <span className="mt-1 block text-sm text-[#5c5872]">{card.employerName}</span>
                <span className="mt-3 block text-xs text-[#6d6886]">
                  {card.location || "Chennai"}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
