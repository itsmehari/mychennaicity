"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUS_ACTION = {
  approved: "cursor-pointer rounded bg-emerald-700 px-2 py-1 text-xs font-semibold text-white disabled:opacity-60",
  declined:
    "cursor-pointer rounded border border-red-400 px-2 py-1 text-xs font-semibold text-red-700 disabled:opacity-60",
  spam: "cursor-pointer rounded border border-red-400 px-2 py-1 text-xs font-semibold text-red-700 disabled:opacity-60",
} as const;

function StatusForm({
  id,
  returnTo,
  status,
  label,
}: {
  id: string;
  returnTo: string;
  status: keyof typeof STATUS_ACTION;
  label: string;
}) {
  const [pending, setPending] = useState(false);
  return (
    <form
      method="post"
      action="/super-admin/whatsapp-join-requests/status"
      onSubmit={() => setPending(true)}
    >
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <input type="hidden" name="returnTo" value={returnTo} />
      <button type="submit" disabled={pending} className={STATUS_ACTION[status]}>
        {pending ? "Saving…" : label}
      </button>
    </form>
  );
}

export function WhatsappQueueActions({
  id,
  returnTo,
  messageUrl,
  phoneDisplay,
}: {
  id: string;
  returnTo: string;
  messageUrl: string | null;
  phoneDisplay: string;
}) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [opening, setOpening] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  async function copyPhone() {
    setCopyError(null);
    try {
      await navigator.clipboard.writeText(phoneDisplay);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopyError("Could not copy. Select the number instead.");
    }
  }

  return (
    <div className="relative z-10 flex shrink-0 flex-col items-stretch gap-1 sm:items-end">
      <div className="flex flex-wrap gap-1.5 sm:justify-end">
        <button
          type="button"
          onClick={() => void copyPhone()}
          className="cursor-pointer rounded border border-zinc-300 px-2 py-1 text-xs font-semibold text-zinc-800 dark:border-zinc-600 dark:text-zinc-100"
        >
          {copied ? "Copied" : "Copy"}
        </button>
        {messageUrl ? (
          <form
            method="post"
            action="/super-admin/whatsapp-join-requests/message"
            target="_blank"
            onSubmit={() => {
              setOpening(true);
              window.setTimeout(() => {
                setOpening(false);
                router.refresh();
              }, 800);
            }}
          >
            <input type="hidden" name="id" value={id} />
            <button
              type="submit"
              disabled={opening}
              className="cursor-pointer rounded bg-[#128C7E] px-2 py-1 text-xs font-semibold text-white disabled:opacity-60"
            >
              {opening ? "Opening…" : "Message"}
            </button>
          </form>
        ) : null}
        <StatusForm id={id} returnTo={returnTo} status="approved" label="Approve" />
        <StatusForm id={id} returnTo={returnTo} status="declined" label="Decline" />
        <StatusForm id={id} returnTo={returnTo} status="spam" label="Spam" />
      </div>
      {copyError ? <p className="text-xs text-red-700">{copyError}</p> : null}
    </div>
  );
}
