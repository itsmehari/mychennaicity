"use client";

import { CopyShareButton } from "@/components/compulsive/copy-share-button";

export function WhatsAppDraftBox({
  draft,
  hubId,
  heading,
  hint,
  copyLabel,
}: {
  draft: string;
  hubId: string;
  heading: string;
  hint: string;
  copyLabel: string;
}) {
  return (
    <div className="mt-5 rounded-xl border border-dashed border-[var(--border)] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
        {heading}
      </p>
      <p className="mt-1 text-xs text-[var(--muted)]">{hint}</p>
      <textarea
        readOnly
        rows={8}
        className="mt-3 w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 font-mono text-xs leading-relaxed text-[var(--foreground)]"
        value={draft}
      />
      <div className="mt-3">
        <CopyShareButton hubId={hubId} label={copyLabel} buildText={() => draft} />
      </div>
    </div>
  );
}
