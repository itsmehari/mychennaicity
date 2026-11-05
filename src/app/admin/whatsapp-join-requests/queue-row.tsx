import { WhatsappQueueActions } from "./queue-actions";

export type WhatsappJoinQueueRowData = {
  id: string;
  requestNo: number;
  stamp: string;
  displayName: string;
  headline: string;
  phoneDisplay: string;
  phoneLast4: string;
  locality: string;
  status: "submitted" | "approved" | "declined" | "spam";
  onSpamList: boolean;
  messageUrl: string | null;
  returnTo: string;
  intentLabel: string;
  intro: string;
  phoneRaw: string;
  source: string;
  createdStamp: string;
  updatedStamp: string;
  approved: string;
  lastNudge: string;
  notes: string;
  ipHash: string;
  userAgent: string;
};

const STATUS_PILL: Record<WhatsappJoinQueueRowData["status"], string> = {
  submitted: "bg-amber-100 text-amber-950",
  approved: "bg-emerald-100 text-emerald-950",
  declined: "bg-red-100 text-red-900",
  spam: "bg-red-100 text-red-900",
};

function statusLabel(status: WhatsappJoinQueueRowData["status"]): string {
  if (status === "submitted") return "Ready";
  return status;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="font-semibold uppercase tracking-wide text-zinc-500">{label}</dt>
      <dd className="mt-0.5 break-words text-zinc-800 dark:text-zinc-200">{value || "—"}</dd>
    </div>
  );
}

export function WhatsappJoinQueueRow({ row }: { row: WhatsappJoinQueueRowData }) {
  return (
    <li
      id={`join-${row.id}`}
      className="rounded-lg border border-zinc-200 bg-white text-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex flex-col gap-2 p-2 sm:flex-row sm:items-start">
        <details className="min-w-0 flex-1">
          <summary className="cursor-pointer list-none overflow-hidden [&::-webkit-details-marker]:hidden">
            <span className="grid grid-cols-2 gap-x-3 gap-y-1 sm:grid-cols-[2.75rem_6.75rem_minmax(0,1.4fr)_9rem_7.5rem_5.5rem] sm:items-center">
              <span className="font-mono text-xs text-zinc-500">#{row.requestNo}</span>
              <span className="text-xs text-zinc-600 dark:text-zinc-400">{row.stamp}</span>
              <span className="col-span-2 min-w-0 sm:col-span-1">
                <span className="block font-medium">{row.displayName}</span>
                <span className="mt-0.5 line-clamp-2 block text-xs text-zinc-600 dark:text-zinc-400">
                  {row.headline}
                </span>
              </span>
              <span>
                <span className="block font-mono text-xs">{row.phoneDisplay}</span>
                <span className="block text-xs text-zinc-500">last {row.phoneLast4}</span>
              </span>
              <span className="text-xs text-zinc-700 dark:text-zinc-300">{row.locality}</span>
              <span
                className={`w-fit rounded-full px-2 py-0.5 text-xs font-semibold uppercase ${STATUS_PILL[row.status]}`}
              >
                {statusLabel(row.status)}
                {row.onSpamList ? " · list" : ""}
              </span>
            </span>
          </summary>
          <dl className="grid gap-3 border-t border-zinc-200 px-1 py-3 text-xs sm:grid-cols-2 dark:border-zinc-800">
            <Field label="Intent" value={row.intentLabel} />
            <Field label="Phone as typed" value={row.phoneRaw} />
            <Field label="Source" value={row.source} />
            <Field label="Created" value={row.createdStamp} />
            <Field label="Updated" value={row.updatedStamp} />
            <Field label="Approved" value={row.approved} />
            <Field label="Last nudge" value={row.lastNudge} />
            <div className="min-w-0 sm:col-span-2">
              <dt className="font-semibold uppercase tracking-wide text-zinc-500">Intro</dt>
              <dd className="mt-0.5 whitespace-pre-wrap text-zinc-800 dark:text-zinc-200">
                {row.intro || "—"}
              </dd>
            </div>
            <Field label="IP hash" value={row.ipHash} />
            <Field label="Browser" value={row.userAgent} />
            <form
              method="post"
              action="/super-admin/whatsapp-join-requests/notes"
              className="sm:col-span-2"
            >
              <input type="hidden" name="id" value={row.id} />
              <input type="hidden" name="returnTo" value={row.returnTo} />
              <label className="block">
                <span className="font-semibold uppercase tracking-wide text-zinc-500">Notes</span>
                <textarea
                  name="notes"
                  rows={2}
                  maxLength={2000}
                  defaultValue={row.notes}
                  className="mt-1 w-full rounded border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </label>
              <button
                type="submit"
                className="mt-2 cursor-pointer rounded border border-zinc-300 px-2 py-1 text-xs font-semibold dark:border-zinc-700"
              >
                Save note
              </button>
            </form>
          </dl>
        </details>
        <WhatsappQueueActions
          id={row.id}
          returnTo={row.returnTo}
          messageUrl={row.messageUrl}
          phoneDisplay={row.phoneDisplay}
        />
      </div>
    </li>
  );
}
