import type { GoldRateSnapshotView } from "@/domains/gold-rate";
import { isGoldRateSnapshotStale } from "@/lib/gold-rate/spot-math";

export function GoldRateStaleNotice({ snapshot }: { snapshot: GoldRateSnapshotView }) {
  if (!isGoldRateSnapshotStale(snapshot.fetchedAt)) return null;

  return (
    <p
      role="status"
      className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
    >
      These rates may be stale — our automatic update did not run recently. We are
      showing the last saved snapshot from{" "}
      {snapshot.fetchedAt.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      })}{" "}
      IST.
    </p>
  );
}
