"use client";

import { useEffect, useState } from "react";
import { WA_JOIN_STATE_COOKIE, WA_JOIN_STATE_MAX_AGE_SEC } from "@/lib/whatsapp-community-flags";
import { memberInviteShareHref } from "@/lib/whatsapp-link";
import { waFunnelEventsEnabled } from "@/lib/whatsapp-community-flags";
import { WhatsAppDeskButton } from "@/components/contact/whatsapp-desk-button";
import { waGtagEvent } from "@/lib/whatsapp-gtag-client";

export function WhatsappJoinSuccessExtras({
  lang,
  invite,
  alreadyApproved,
  waitlist = false,
  name,
  locality,
  approvalHours,
}: {
  lang: "en" | "ta";
  invite: string | null;
  alreadyApproved: boolean;
  waitlist?: boolean;
  name: string;
  locality?: string;
  approvalHours: number;
}) {
  const ta = lang === "ta";
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.cookie = `${WA_JOIN_STATE_COOKIE}=verified; path=/; max-age=${WA_JOIN_STATE_MAX_AGE_SEC}; SameSite=Lax`;
    if (!waFunnelEventsEnabled()) return;
    if (sessionStorage.getItem("wa_join_event_sent") === "1") return;
    sessionStorage.setItem("wa_join_event_sent", "1");
    waGtagEvent("wa_join_verified", {
      locality: (locality ?? "").slice(0, 40),
      language: lang,
      already_approved: alreadyApproved ? "1" : "0",
    });
  }, [alreadyApproved, lang, locality]);

  async function copyInvite() {
    if (!invite) return;
    try {
      await navigator.clipboard.writeText(invite);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-4 space-y-4 text-sm text-[var(--muted)]">
      <p>
        {alreadyApproved
          ? ta
            ? "நீங்கள் ஏற்கனவே குழுவில் உள்ளீர்கள். தேவைப்பட்டால் மீண்டும் Join தட்டவும்."
            : "You are already in the group. Tap Join again if you need the link on this phone."
          : waitlist
            ? ta
              ? "இடம் திறந்ததும் பகல் நேரத்தில் எழுதுவோம்."
              : "We will write during the day when a seat opens."
            : ta
            ? `அனுமதி பொதுவாக பகல் நேரத்தில் ${approvalHours} மணி நேரத்துக்குள்.`
            : `Approval usually within ${approvalHours} hours during the day.`}
      </p>
      <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
        <p className="font-semibold text-[var(--foreground)]">
          {ta ? "வாட்ஸ்அப் திறக்கவில்லையா?" : "WhatsApp did not open?"}
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          {invite ? (
            <button
              type="button"
              onClick={() => void copyInvite()}
              className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold"
            >
              {copied
                ? ta
                  ? "நகலெடுக்கப்பட்டது"
                  : "Copied"
                : ta
                  ? "இணைப்பை நகலெடு"
                  : "Copy link"}
            </button>
          ) : null}
          <WhatsAppDeskButton
            source="join_fallback"
            text={`I submitted the join form as ${name}${locality ? `, ${locality}` : ""}.`}
            className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--foreground)]"
          >
            {ta ? "mychennaicity உடன் அரட்டை" : "Chat with mychennaicity"}
          </WhatsAppDeskButton>
        </div>
      </div>
      <p>
        <a
          href={memberInviteShareHref()}
          className="font-semibold text-[var(--accent)] hover:underline"
          data-wa-type="share"
          data-wa-placement="join-success"
          data-wa-content="member-invite"
        >
          {ta ? "ஒரு அண்டையை அழைக்க — படிவத்தைப் பகிர" : "Invite a neighbour — share the join page"}
        </a>
      </p>
      <span className="sr-only">{name}</span>
    </div>
  );
}

export function WhatsappInviteClickTracker({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span
      onClick={() => {
        if (!waFunnelEventsEnabled()) return;
        if (typeof window.gtag === "function") {
          window.gtag("event", "wa_invite_click", {
            event_category: "whatsapp_community",
          });
        }
      }}
    >
      {children}
    </span>
  );
}
