"use client";

import { useEffect, useMemo, useState } from "react";
import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import {
  BIRYANI_CONTENDERS,
  BIRYANI_ROUNDS,
  BIRYANI_VOTE_STORAGE_KEY,
  getBiryaniContender,
} from "@/content/compulsive/biryani-bracket";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";

type Votes = Record<string, string>;

function loadVotes(): Votes {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(BIRYANI_VOTE_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Votes;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function BiryaniBracketTool() {
  const [votes, setVotes] = useState<Votes>({});
  const [hydrated, setHydrated] = useState(false);
  const path = compulsivePath("biryani");

  useEffect(() => {
    setVotes(loadVotes());
    setHydrated(true);
  }, []);

  function pick(roundId: string, contenderId: string) {
    setVotes((prev) => {
      const next = { ...prev, [roundId]: contenderId };
      try {
        window.localStorage.setItem(BIRYANI_VOTE_STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore quota */
      }
      return next;
    });
  }

  const crownId = useMemo(() => {
    const tally: Record<string, number> = {};
    for (const id of Object.values(votes)) {
      tally[id] = (tally[id] ?? 0) + 1;
    }
    let best: string | null = null;
    let bestCount = 0;
    for (const [id, count] of Object.entries(tally)) {
      if (count > bestCount) {
        best = id;
        bestCount = count;
      }
    }
    return best;
  }, [votes]);

  const crown = crownId ? getBiryaniContender(crownId) : undefined;
  const picksDone = Object.keys(votes).length;

  return (
    <div className="not-prose space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
          Playful editorial bracket
        </p>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Pick a side by style / area legend — not an official brand award. Votes stay in
          this browser only.
        </p>
        {hydrated && crown ? (
          <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
            Your current crown: {crown.name}
          </p>
        ) : (
          <p className="mt-2 text-sm text-[var(--muted)]">
            {hydrated
              ? `Pick sides below (${picksDone}/${BIRYANI_ROUNDS.length} rounds).`
              : "Loading your local picks…"}
          </p>
        )}
      </div>

      <ul className="space-y-4">
        {BIRYANI_ROUNDS.map((round) => {
          const a = getBiryaniContender(round.a);
          const b = getBiryaniContender(round.b);
          if (!a || !b) return null;
          const chosen = votes[round.id];
          return (
            <li
              key={round.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3 sm:p-4"
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
                {round.title}
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {[a, b].map((side) => {
                  const active = chosen === side.id;
                  return (
                    <button
                      key={side.id}
                      type="button"
                      onClick={() => pick(round.id, side.id)}
                      className={`rounded-xl border px-3 py-3 text-left transition ${
                        active
                          ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]"
                          : "border-[var(--border)] hover:border-[var(--accent)]"
                      }`}
                    >
                      <p className="text-sm font-bold text-[var(--foreground)]">{side.name}</p>
                      <p className="mt-0.5 text-[11px] font-semibold text-[var(--accent)]">
                        {side.styleTag}
                      </p>
                      <p className="mt-2 text-xs text-[var(--muted)]">{side.blurb}</p>
                      <ul className="mt-2 space-y-1">
                        {side.hallmarks.map((h) => (
                          <li key={h} className="text-[11px] text-[var(--foreground)]">
                            · {h}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-2 text-[11px] font-bold text-[var(--foreground)]">
                        {active ? "Your pick" : "Pick this side"}
                      </p>
                    </button>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="rounded-xl border border-dashed border-[var(--border)] p-3">
        <p className="text-xs font-semibold text-[var(--foreground)]">All contenders (styles)</p>
        <p className="mt-1 text-xs text-[var(--muted)]">
          {BIRYANI_CONTENDERS.map((c) => c.styleTag).join(" · ")}
        </p>
      </div>

      <CopyShareButton
        label={crown ? "Share my crown" : "Copy for WhatsApp"}
        buildText={() =>
          crown
            ? `I crowned ${crown.name} in the playful Chennai biryani style bracket (editorial — not an official ranking). ${getSiteUrl()}${path}`
            : `Chennai biryani war bracket — pick a style/area side (playful editorial): ${getSiteUrl()}${path}`
        }
      />
    </div>
  );
}
