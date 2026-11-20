"use client";

import { useActionState, useEffect, useState } from "react";
import {
  submitWhatsappJoin,
  type WhatsappJoinFormState,
} from "@/app/(public)/whatsapp-community/join/actions";
import { waFunnelEventsEnabled } from "@/lib/whatsapp-community-flags";

const INTENTS = [
  ["news", "Local news", "உள்ளூர் செய்தி"],
  ["jobs", "Jobs", "வேலை"],
  ["events", "Events", "நிகழ்வுகள்"],
  ["neighbour", "Neighbour help", "அண்டை உதவி"],
  ["listings", "Listings", "விளம்பரங்கள்"],
] as const;

const initial: WhatsappJoinFormState = { ok: false, message: "" };

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-[#d7ebe4] bg-[#f7fbf9] px-3.5 py-3 text-base text-[#10211c] outline-none transition placeholder:text-[#7a948c] focus:border-[#128C7E] focus:bg-white focus:ring-2 focus:ring-[#25D366]/40";

export function WhatsappJoinForm({
  lang,
  source,
  localities,
  switchHref,
  partner,
  placement,
  utmSource,
  utmMedium,
  utmCampaign,
  heading,
}: {
  lang: "en" | "ta";
  source: string;
  localities: string[];
  switchHref: string;
  heading: string;
  partner?: string;
  placement?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}) {
  const [state, action, pending] = useActionState(submitWhatsappJoin, initial);
  const ta = lang === "ta";
  const [readySteps, setReadySteps] = useState(0);
  const [introCount, setIntroCount] = useState(state.intro?.length ?? 0);

  function refreshProgress(form: HTMLFormElement) {
    const data = new FormData(form);
    const phone = String(data.get("phone") ?? "").replace(/\D/g, "");
    let steps = 0;
    if (String(data.get("display_name") ?? "").trim()) steps += 1;
    if (phone.length >= 10) steps += 1;
    if (String(data.get("locality") ?? "")) steps += 1;
    if (String(data.get("intent") ?? "") && data.get("agree")) steps += 1;
    setReadySteps(steps);
    setIntroCount(String(data.get("intro") ?? "").length);
  }

  useEffect(() => {
    if (!state.message || !waFunnelEventsEnabled()) return;
    if (typeof window.gtag !== "function") return;
    const blocked = /blocked|தடுக்கப்பட்டது/i.test(state.message);
    window.gtag("event", "wa_join_submit_error", {
      event_category: "whatsapp_community",
      error_key: blocked ? "blocked" : "validation",
    });
  }, [state.message]);

  function markFormStart() {
    if (!waFunnelEventsEnabled()) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("wa_join_form_started") === "1") return;
    sessionStorage.setItem("wa_join_form_started", "1");
    if (typeof window.gtag === "function") {
      window.gtag("event", "wa_join_form_start", {
        event_category: "whatsapp_community",
        language: lang,
      });
    }
  }

  const stepLabels = ta
    ? ["பெயர்", "எண்", "பகுதி", "ஏன்"]
    : ["Name", "Number", "Area", "Why"];
  const nextHint = (
    ta
      ? [
          "வாட்ஸ்அப் பெயரில் தொடங்குங்கள்.",
          "வாட்ஸ்அப்பில் பயன்படுத்தும் எண்ணை எழுதுங்கள்.",
          "சென்னை பகுதியைத் தேர்ந்தெடுக்கவும்.",
          "ஏன் சேர்கிறீர்கள் என்று சொல்லி, உறுதி செய்யுங்கள்.",
          "தயார். சேமித்து அடுத்த படிக்குச் செல்லுங்கள்.",
        ]
      : [
          "Start with the name you use on WhatsApp.",
          "Add the mobile you will message us from.",
          "Pick the Chennai area you live in.",
          "Say why you are joining, then confirm.",
          "Ready. Save this and open the next step.",
        ]
  )[readySteps];
  const ready = readySteps === 4;

  return (
    <form
      key={state.message}
      id="join-form"
      action={action}
      className="relative scroll-mt-28 overflow-hidden rounded-[1.75rem] bg-[#075E54] text-white shadow-[0_28px_70px_-28px_rgba(7,94,84,0.85)] ring-1 ring-[#043f39]"
      onInput={(event) => refreshProgress(event.currentTarget)}
      onChange={(event) => refreshProgress(event.currentTarget)}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#25D366]/30 blur-2xl" aria-hidden="true" />

      <div className="relative px-5 pb-4 pt-5 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#b7f5d4]">
              {ta ? "சேரும் மேசை" : "Join desk"}
            </p>
            <h2 className="mt-1 text-2xl font-bold leading-tight text-white">
              {heading}
            </h2>
          </div>
          <div className="flex shrink-0 rounded-full bg-black/20 p-1 text-sm font-semibold">
            {ta ? (
              <a href={switchHref} className="rounded-full px-3 py-1 text-white/75" hrefLang="en">
                English
              </a>
            ) : (
              <span className="rounded-full bg-white px-3 py-1 text-[#075E54]">English</span>
            )}
            {ta ? (
              <span className="rounded-full bg-white px-3 py-1 text-[#075E54]">தமிழ்</span>
            ) : (
              <a href={switchHref} className="rounded-full px-3 py-1 text-white/75" hrefLang="ta">
                தமிழ்
              </a>
            )}
          </div>
        </div>
        <p className="mt-2 max-w-[22rem] text-sm leading-relaxed text-[#d7f5e6]" aria-live="polite">
          {nextHint}
        </p>
        <ol className="mt-4 grid grid-cols-4 gap-1.5" aria-label={ta ? "படிவம் முன்னேற்றம்" : "Form progress"}>
          {stepLabels.map((label, index) => {
            const done = readySteps > index;
            return (
              <li key={label} className="min-w-0">
                <span
                  className={`block h-1.5 rounded-full transition-colors ${done ? "bg-[#25D366]" : "bg-white/25"}`}
                />
                <span className={`mt-1 block truncate text-[11px] font-semibold ${done ? "text-white" : "text-white/55"}`}>
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="relative mx-2 mb-2 rounded-[1.35rem] bg-[#f4fbf7] px-4 py-5 text-[#10211c] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:mx-3 sm:px-5">
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>
        <input type="hidden" name="lang" value={lang} />
        <input type="hidden" name="source" value={source} />
        {placement ? <input type="hidden" name="placement" value={placement} /> : null}
        {partner ? <input type="hidden" name="partner" value={partner} /> : null}
        {utmSource ? <input type="hidden" name="utm_source" value={utmSource} /> : null}
        {utmMedium ? <input type="hidden" name="utm_medium" value={utmMedium} /> : null}
        {utmCampaign ? <input type="hidden" name="utm_campaign" value={utmCampaign} /> : null}

        {state.message ? (
          <p role="alert" className="mb-4 rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
            {state.message}
          </p>
        ) : null}

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-[#10211c]">
            {ta ? "வாட்ஸ்அப் பெயர்" : "Name on WhatsApp"}
            <input
              required
              name="display_name"
              autoComplete="name"
              maxLength={120}
              defaultValue={state.displayName ?? ""}
              className={fieldClass}
              onFocus={markFormStart}
            />
          </label>

          <label className="block text-sm font-semibold text-[#10211c]">
            {ta ? "மொபைல் எண்" : "Mobile number"}
            <span className="mt-1.5 flex overflow-hidden rounded-xl border border-[#d7ebe4] bg-[#f7fbf9] focus-within:border-[#128C7E] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#25D366]/40">
              <span className="flex items-center border-r border-[#d7ebe4] bg-[#e7f6ef] px-3 text-sm font-bold tracking-wide text-[#075E54]">
                +91
              </span>
              <input
                required
                name="phone"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="98765 43210"
                maxLength={14}
                defaultValue={state.phone ?? ""}
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base text-[#10211c] outline-none"
                onFocus={markFormStart}
              />
            </span>
            <span className="mt-2 block text-xs font-normal leading-relaxed text-[#5d746c]">
              {ta
                ? "சேர கோரிக்கையை அனுமதிக்க மட்டும். தளத்தில் காட்டப்படாது. நீக்க கேட்க "
                : "Used only to approve your join request. Never shown on the site. Ask us to delete it any time — "}
              <a href="/privacy#whatsapp-join" className="font-semibold text-[#0d6e6e] underline-offset-2 hover:underline">
                {ta ? "தனியுரிமை" : "privacy"}
              </a>
              .
            </span>
          </label>

          <label className="block text-sm font-semibold text-[#10211c]">
            {ta ? "சென்னை பகுதி" : "Chennai area"}
            <select required name="locality" defaultValue={state.locality ?? ""} className={fieldClass}>
              <option value="" disabled>
                {ta ? "பகுதியைத் தேர்ந்தெடுக்கவும்" : "Choose an area"}
              </option>
              {localities.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </label>

          <fieldset>
            <legend className="text-sm font-semibold text-[#10211c]">
              {ta ? "ஏன் சேர வேண்டும்?" : "Why do you want to join?"}
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {INTENTS.map(([key, en, taLabel]) => (
                <label
                  key={key}
                  className="cursor-pointer rounded-full border border-[#c5e4d8] bg-white px-3.5 py-2 text-sm text-[#10211c] transition has-[:checked]:border-[#075E54] has-[:checked]:bg-[#075E54] has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#128C7E]"
                >
                  <input
                    className="sr-only"
                    type="radio"
                    name="intent"
                    value={key}
                    required
                    defaultChecked={state.intent === key}
                  />
                  {ta ? taLabel : en}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block text-sm font-semibold text-[#10211c]">
            {ta ? "குறுகிய அறிமுகம் (விருப்பம்)" : "Short intro (optional)"}
            <textarea
              name="intro"
              maxLength={500}
              rows={2}
              defaultValue={state.intro ?? ""}
              className={fieldClass}
            />
            <span className="mt-1 block text-right text-xs font-normal text-[#5d746c]">
              {introCount}/500
            </span>
          </label>

          <label className="flex items-start gap-3 rounded-xl border border-[#d7ebe4] bg-white px-3 py-3 text-sm text-[#10211c] has-[:checked]:border-[#128C7E] has-[:checked]:bg-[#e7f6ef]">
            <input
              required
              type="checkbox"
              name="agree"
              defaultChecked={Boolean(state.agreed)}
              className="mt-0.5 h-5 w-5 accent-[#128C7E]"
            />
            <span>
              {ta
                ? "முதலீடு, கிரிப்டோ, அல்லது அந்நிய விளம்பரம் போடமாட்டேன்."
                : "I will not post investment, crypto, or unrelated ads."}
            </span>
          </label>

          <button
            type="submit"
            disabled={pending}
            className={`inline-flex min-h-12 w-full items-center justify-center rounded-full px-5 py-3 text-sm font-bold text-white transition disabled:opacity-60 ${
              ready
                ? "bg-[#25D366] shadow-[0_10px_24px_-12px_rgba(37,211,102,0.9)] hover:bg-[#1ebe5d]"
                : "bg-[#128C7E] hover:bg-[#0f7a6e]"
            }`}
          >
            {pending
              ? ta
                ? "சேமிக்கிறது…"
                : "Saving…"
              : ready
                ? ta
                  ? "தயார் — எண்ணைச் சேமித்து தொடரவும்"
                  : "Ready — save my number and continue"
                : ta
                  ? "எண்ணைச் சேமித்து தொடரவும்"
                  : "Save my number and continue"}
          </button>
          <p className="text-center text-xs text-[#5d746c]">
            {ta
              ? "அடுத்து வாட்ஸ்அப் திறக்கும். இணைப்பு அந்தப் பதிலில் மட்டுமே."
              : "Next, WhatsApp opens. The group link comes only in that reply."}
          </p>
        </div>
      </div>
    </form>
  );
}
