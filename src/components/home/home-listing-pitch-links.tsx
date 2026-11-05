import Link from "next/link";
import {
  ADVERTISE_JOBS_PATH,
  ADVERTISE_PROPERTY_PATH,
} from "@/lib/routes/advertise-listings";

export function HomeListingPitchLinks() {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-3">
        <Link href={ADVERTISE_PROPERTY_PATH} className="mcc-supply-cta">
          Post a property
        </Link>
        <Link href={ADVERTISE_JOBS_PATH} className="mcc-supply-cta">
          Post a job
        </Link>
      </div>
      <p className="mt-2 text-sm text-[var(--muted)]">
        We place the listing. There is no login.
      </p>
    </div>
  );
}
