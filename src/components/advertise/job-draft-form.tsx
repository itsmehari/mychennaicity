"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import {
  submitEmployerJobDraft,
  type JobDraftState,
} from "@/app/(public)/advertise/jobs/actions";

function sendEmployerEvent(event: "employer_cta_click" | "employer_form_start" | "employer_form_submit") {
  void fetch("/api/analytics/engagement", {
    method: "POST",
    headers: { "content-type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      kind: "guide",
      slug: "advertise-jobs",
      event,
    }),
  });
}

export function EmployerCtaBeacon({ children }: { children: ReactNode }) {
  return (
    <span
      onClick={() => sendEmployerEvent("employer_cta_click")}
      className="inline-flex"
    >
      {children}
    </span>
  );
}

export function JobDraftForm({ locale }: { locale: "en" | "ta" }) {
  const ta = locale === "ta";
  const [state, action, pending] = useActionState<JobDraftState | null, FormData>(
    submitEmployerJobDraft,
    null,
  );
  const started = useRef(false);
  const reported = useRef(false);

  useEffect(() => {
    if (state?.ok && !reported.current) {
      reported.current = true;
      sendEmployerEvent("employer_form_submit");
    }
  }, [state]);

  return (
    <form
      action={action}
      className="mt-8 space-y-4 rounded-[22px] border border-[#eceaf3] bg-white px-5 py-5 sm:px-6"
      onFocus={() => {
        if (started.current) return;
        started.current = true;
        sendEmployerEvent("employer_form_start");
      }}
    >
      <h2 className="text-2xl font-semibold tracking-tight text-[#16161d]">
        {ta ? "வரைவாக அனுப்பு" : "Send the vacancy as a draft"}
      </h2>
      <p className="text-sm leading-relaxed text-[#5c5872]">
        {ta
          ? "இது உடனே வெளியாகாது. ஆசிரியர் பார்த்த பிறகே பொதுப் பலகையில் வரும்."
          : "This does not publish by itself. An editor checks the notice before it appears on the board."}
      </p>
      <label className="hidden" aria-hidden="true">
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label={ta ? "நிறுவனப் பெயர்" : "Employer name"} name="employerName" required />
        <Field label={ta ? "தொடர்பு பெயர்" : "Contact person"} name="contactName" />
        <Field label={ta ? "மின்னஞ்சல்" : "Email"} name="email" type="email" />
        <Field label={ta ? "தொலைபேசி" : "Phone"} name="phone" />
        <Field label={ta ? "பதவி" : "Job title"} name="title" required className="sm:col-span-2" />
        <Field label={ta ? "இடம்" : "Job location"} name="locationLabel" required />
        <label className="block space-y-1 text-sm">
          <span className="font-medium text-[#16161d]">{ta ? "வேலை வகை" : "Employment type"}</span>
          <select name="employmentType" className="w-full rounded-xl border border-[#e4e1ee] px-3 py-2" defaultValue="">
            <option value="">{ta ? "தெரியவில்லை" : "Not stated"}</option>
            <option value="FULL_TIME">FULL_TIME</option>
            <option value="PART_TIME">PART_TIME</option>
            <option value="CONTRACTOR">CONTRACTOR</option>
            <option value="INTERN">INTERN</option>
          </select>
        </label>
        <label className="block space-y-1 text-sm sm:col-span-2">
          <span className="font-medium text-[#16161d]">{ta ? "வேலை விவரம்" : "Job description"}</span>
          <textarea name="description" required minLength={40} rows={5} className="w-full rounded-xl border border-[#e4e1ee] px-3 py-2" />
        </label>
        <label className="block space-y-1 text-sm sm:col-span-2">
          <span className="font-medium text-[#16161d]">{ta ? "தகுதி" : "Qualifications"}</span>
          <textarea name="qualifications" rows={3} className="w-full rounded-xl border border-[#e4e1ee] px-3 py-2" />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="font-medium text-[#16161d]">{ta ? "வேலை முறை" : "Work mode"}</span>
          <select name="remotePolicy" className="w-full rounded-xl border border-[#e4e1ee] px-3 py-2" defaultValue="onsite">
            <option value="onsite">{ta ? "அலுவலகம்" : "On-site"}</option>
            <option value="hybrid">{ta ? "கலப்பு" : "Hybrid"}</option>
            <option value="remote">{ta ? "தொலைதூரம்" : "Remote"}</option>
          </select>
        </label>
        <Field label={ta ? "விண்ணப்ப இணைப்பு" : "Apply URL"} name="applyUrl" className="sm:col-span-2" />
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input type="checkbox" name="salaryDisclosed" />
          <span>{ta ? "சம்பளத்தைக் காட்டவும்" : "Show a salary band the employer stated"}</span>
        </label>
        <Field label={ta ? "குறைந்தபட்சம் (₹)" : "Minimum (INR)"} name="salaryMin" type="number" />
        <Field label={ta ? "அதிகபட்சம் (₹)" : "Maximum (INR)"} name="salaryMax" type="number" />
        <label className="block space-y-1 text-sm">
          <span className="font-medium text-[#16161d]">{ta ? "சம்பள காலம்" : "Pay period"}</span>
          <select name="salaryUnit" className="w-full rounded-xl border border-[#e4e1ee] px-3 py-2" defaultValue="">
            <option value="">{ta ? "குறிக்கவில்லை" : "Not stated"}</option>
            <option value="MONTH">MONTH</option>
            <option value="YEAR">YEAR</option>
          </select>
        </label>
        <Field label={ta ? "காலி இடங்கள்" : "Vacancy count"} name="openingsCount" type="number" />
        <label className="block space-y-1 text-sm sm:col-span-2">
          <span className="font-medium text-[#16161d]">{ta ? "கடைசி நாள்" : "Application deadline"}</span>
          <input type="datetime-local" name="validThrough" className="w-full rounded-xl border border-[#e4e1ee] px-3 py-2" />
        </label>
      </div>
      <label className="flex items-start gap-2 text-sm text-[#2a2640]">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>
          {ta
            ? "இந்த காலியிடம் உண்மை. விளம்பரம் போட எனக்கு உரிமை உண்டு. விண்ணப்பம் நான் கொடுத்த வழியில் நடக்கும். தளம் எனக்காக ஆள் எடுக்காது."
            : "This vacancy is real, I am allowed to advertise it, and candidates will apply on the channel I named. MyChennaiCity reviews the notice and does not hire for me."}
        </span>
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-[#16161d] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? (ta ? "அனுப்புகிறது" : "Sending") : ta ? "வரைவை அனுப்பு" : "Submit draft"}
      </button>
      {state ? (
        <p role="status" className={state.ok ? "text-sm text-[#1d6b3a]" : "text-sm text-[#9b2c2c]"}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block space-y-1 text-sm ${className}`}>
      <span className="font-medium text-[#16161d]">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-[#e4e1ee] px-3 py-2"
      />
    </label>
  );
}
