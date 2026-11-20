"use client";

import { useEffect } from "react";
import { WA_JOIN_STATE_COOKIE, WA_JOIN_STATE_MAX_AGE_SEC } from "@/lib/whatsapp-community-flags";
import { memberInviteShareHref } from "@/lib/whatsapp-link";
import { waFunnelEventsEnabled } from "@/lib/whatsapp-community-flags";
import { waGtagEvent } from "@/lib/whatsapp-gtag-client";

export function WhatsappJoinSuccessExtras({
  lang,
  alreadyApproved,
  waitlist = false,
  name,
  locality,
  approvalHours,
}: {
  lang: "en" | "ta";
  alreadyApproved: boolean;
  waitlist?: boolean;
  name: string;
  locality?: string;
  approvalHours: number;
}) {
  const ta = lang === "ta";

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

  return (
    <div className="mt-4 space-y-4 text-sm text-[var(--muted)]">
      <p>
        {alreadyApproved
          ? ta
            ? "நீங்கள் ஏற்கனவே குழுவில் உள்ளீர்கள். இந்தத் தொலைபேசியில் இணைப்பு வேண்டுமானால் மேலே உள்ள மெசேஜை அனுப்புங்கள்."
            : "You are already in the group. Send the message above if you need the link on this phone."
          : waitlist
            ? ta
              ? "இடம் திறந்ததும் பகல் நேரத்தில் எழுதுவோம்."
              : "We will write during the day when a seat opens."
            : ta
              ? `அனுமதி பொதுவாக பகல் நேரத்தில் ${approvalHours} மணி நேரத்துக்குள். இணைப்பு இந்தப் பக்கத்தில் இல்லை.`
              : `Approval usually within ${approvalHours} hours during the day. The group link is not on this page.`}
      </p>
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
