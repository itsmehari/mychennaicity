import Link from "next/link";
import { loadWhatsappJoinScorecard } from "@/lib/whatsapp-join-scorecard";

export async function WhatsappJoinDashboardWidget() {
  const card = await loadWhatsappJoinScorecard();
  return (
    <section
      className="mx-auto w-full max-w-6xl px-4 pt-6"
      aria-label="WhatsApp join queue"
    >
      <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-sm font-semibold">WhatsApp joins</h2>
          <Link
            href="/super-admin/whatsapp-join-requests?status=submitted"
            className="text-sm font-semibold underline"
          >
            Open queue
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <p className="text-sm">
            Pending{" "}
            <strong className="block text-2xl tabular-nums">{card.submittedNow}</strong>
          </p>
          <p className="text-sm">
            Approved 7d{" "}
            <strong className="block text-2xl tabular-nums">{card.approved7d}</strong>
          </p>
          <p className="text-sm">
            Declined 30d{" "}
            <strong className="block text-2xl tabular-nums">{card.declined30d}</strong>
          </p>
          <p className="text-sm">
            Waitlist{" "}
            <strong className="block text-2xl tabular-nums">{card.waitlistNow}</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
