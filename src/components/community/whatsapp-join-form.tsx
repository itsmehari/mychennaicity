"use client";

import { useActionState } from "react";
import {
  submitWhatsappJoin,
  type WhatsappJoinFormState,
} from "@/app/(public)/whatsapp-community/join/actions";

const INTENTS = [
  ["news", "Local news", "உள்ளூர் செய்தி"],
  ["jobs", "Jobs", "வேலை"],
  ["events", "Events", "நிகழ்வுகள்"],
  ["neighbour", "Neighbour help", "அண்டை உதவி"],
  ["listings", "Listings", "விளம்பரங்கள்"],
] as const;

const initial: WhatsappJoinFormState = { ok: false, message: "" };

const fieldClass =
  "mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-base text-[var(--foreground)]";

export function WhatsappJoinForm({
  lang,
  source,
  localities,
  switchHref,
}: {
  lang: "en" | "ta";
  source: string;
  localities: string[];
  switchHref: string;
}) {
  const [state, action, pending] = useActionState(submitWhatsappJoin, initial);
  const ta = lang === "ta";

  return (
    <form key={state.message} action={action} className="mt-6 space-y-5">
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <input type="hidden" name="lang" value={lang} />
      <input type="hidden" name="source" value={source} />

      <p className="text-sm">
        <a href={switchHref} className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline">
          {ta ? "English" : "தமிழ்"}
        </a>
      </p>

      {state.message ? (
        <p role="alert" className="rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
          {state.message}
        </p>
      ) : null}

      <label className="block text-sm font-semibold text-[var(--foreground)]">
        {ta ? "வாட்ஸ்அப் பெயர்" : "Name on WhatsApp"}
        <input
          required
          name="display_name"
          autoComplete="name"
          maxLength={120}
          defaultValue={state.displayName ?? ""}
          className={fieldClass}
        />
      </label>

      <label className="block text-sm font-semibold text-[var(--foreground)]">
        {ta ? "மொபைல் (+91)" : "Mobile (+91)"}
        <input
          required
          name="phone"
          inputMode="tel"
          autoComplete="tel"
          placeholder="98765 43210"
          defaultValue={state.phone ?? ""}
          className={fieldClass}
        />
      </label>

      <label className="block text-sm font-semibold text-[var(--foreground)]">
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
        <legend className="text-sm font-semibold text-[var(--foreground)]">
          {ta ? "ஏன் சேர வேண்டும்?" : "Why do you want to join?"}
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {INTENTS.map(([key, en, taLabel]) => (
            <label
              key={key}
              className="cursor-pointer rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm has-[:checked]:border-[#128C7E] has-[:checked]:bg-[color-mix(in_srgb,#25D366_16%,var(--surface))]"
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

      <label className="block text-sm font-semibold text-[var(--foreground)]">
        {ta ? "குறுகிய அறிமுகம் (விருப்பம்)" : "Short intro (optional)"}
        <textarea
          name="intro"
          maxLength={500}
          rows={3}
          defaultValue={state.intro ?? ""}
          className={fieldClass}
        />
      </label>

      <label className="flex items-start gap-3 text-sm text-[var(--foreground)]">
        <input
          required
          type="checkbox"
          name="agree"
          defaultChecked={Boolean(state.agreed)}
          className="mt-1 h-4 w-4"
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
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white disabled:opacity-60 sm:w-auto"
      >
        {pending ? (ta ? "சேமிக்கிறது…" : "Saving…") : ta ? "கோரிக்கையை அனுப்பு" : "Submit request"}
      </button>
    </form>
  );
}
