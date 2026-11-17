"use client";

import { useEffect, useState } from "react";
import {
  interpolateLocality,
  placementFor,
  type WhatsappPlacementPageType,
} from "@/content/whatsapp-community/placements";
import {
  WA_JOIN_STATE_COOKIE,
  waReachEnabled,
} from "@/lib/whatsapp-community-flags";
import { claimWaReachImpression } from "@/lib/whatsapp-reach-frequency";
import { memberInviteShareHref, waLink, whatsappRequestCtaLabel } from "@/lib/whatsapp-link";
import { WhatsAppCommunityJoinLink } from "./whatsapp-community-join-link";
import { WhatsAppCommunityPageLink } from "./whatsapp-community-join-link";

function readJoinState(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((part) => part.trim() === `${WA_JOIN_STATE_COOKIE}=verified`);
}

export function WhatsAppPlacementCta({
  pageType,
  slot,
  locality,
  lang = "en",
  className = "",
}: {
  pageType: WhatsappPlacementPageType;
  slot: string;
  locality?: string;
  lang?: "en" | "ta";
  className?: string;
}) {
  const [joined, setJoined] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [impressionAllowed, setImpressionAllowed] = useState(false);
  const row = placementFor(pageType, slot);

  useEffect(() => {
    setJoined(readJoinState());
    const key = `wa_cta_dismissed_${slot}`;
    setDismissed(document.cookie.includes(`${key}=1`));
    if (waReachEnabled() && row && !document.cookie.includes(`${key}=1`)) {
      setImpressionAllowed(claimWaReachImpression());
    }
  }, [slot, row]);

  if (!waReachEnabled() || !row || dismissed || !impressionAllowed) return null;

  const copy = lang === "ta" ? row.ta : row.en;
  const title = interpolateLocality(copy.title, locality);
  const body = interpolateLocality(copy.body, locality);
  const placement = `${pageType}:${slot}`;

  if (joined) {
    return (
      <aside
        className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 ${className}`.trim()}
        data-wa-type="share"
        data-wa-placement={placement}
        data-wa-content="member-invite"
      >
        <p className="text-sm font-semibold text-[var(--foreground)]">
          {lang === "ta" ? "ஒரு அண்டையை அழைக்க" : "Invite a neighbour"}
        </p>
        <p className="mt-1 text-sm text-[var(--muted)]">
          {lang === "ta"
            ? "படிவ இணைப்பைப் பகிருங்கள். குழு இணைப்பை அல்ல."
            : "Share the join form, never the group invite."}
        </p>
        <a
          href={memberInviteShareHref()}
          className="mt-3 inline-flex min-h-11 items-center rounded-full bg-[#25D366] px-4 text-sm font-bold text-white"
          data-wa-type="share"
          data-wa-placement={placement}
          data-wa-content="member-invite"
        >
          {lang === "ta" ? "படிவத்தைப் பகிர" : "Share the join page"}
        </a>
      </aside>
    );
  }

  const href =
    row.linkType === "learn"
      ? waLink("learn", { lang, placement })
      : undefined;

  function dismiss() {
    document.cookie = `wa_cta_dismissed_${slot}=1; path=/; max-age=${14 * 24 * 60 * 60}; SameSite=Lax`;
    setDismissed(true);
  }

  const shell =
    row.variant === "strip"
      ? "flex flex-col gap-3 rounded-2xl border border-[color-mix(in_srgb,#25D366_22%,var(--border))] bg-[color-mix(in_srgb,var(--surface)_90%,#25D366_6%)] p-4 sm:flex-row sm:items-center sm:justify-between"
      : "rounded-2xl border border-[color-mix(in_srgb,#25D366_22%,var(--border))] bg-[color-mix(in_srgb,var(--surface)_90%,#25D366_6%)] p-4";

  return (
    <aside className={`${shell} ${className}`.trim()} aria-label={title}>
      <div>
        <p className="text-sm font-semibold text-[var(--foreground)]">{title}</p>
        <p className="mt-1 text-sm text-[var(--muted)]">{body}</p>
      </div>
      <p className="mt-3 flex flex-wrap items-center gap-3 sm:mt-0">
        {row.linkType === "learn" && href ? (
          <WhatsAppCommunityPageLink src={placement} className="text-sm font-semibold text-[#128C7E] hover:underline">
            {lang === "ta" ? "விதிகளைப் படிக்க" : "Read the rules"}
          </WhatsAppCommunityPageLink>
        ) : (
          <WhatsAppCommunityJoinLink
            utmContent={placement}
            className="inline-flex min-h-11 items-center rounded-full bg-[#25D366] px-4 text-sm font-bold text-white"
          >
            {whatsappRequestCtaLabel(lang)}
          </WhatsAppCommunityJoinLink>
        )}
        <button
          type="button"
          onClick={dismiss}
          className="text-xs font-semibold text-[var(--muted)] hover:underline"
        >
          {lang === "ta" ? "மறை" : "Hide"}
        </button>
      </p>
    </aside>
  );
}
