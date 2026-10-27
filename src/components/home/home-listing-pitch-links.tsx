import Link from "next/link";
import {
  ADVERTISE_JOBS_PATH,
  ADVERTISE_PROPERTY_PATH,
} from "@/lib/routes/advertise-listings";

export function HomeListingPitchLinks() {
  return (
    <p className="mb-6 text-sm text-[var(--muted)]">
      <Link href={ADVERTISE_PROPERTY_PATH} className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline">
        Post a property
      </Link>
      {" · "}
      <Link href={ADVERTISE_JOBS_PATH} className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline">
        Post a job
      </Link>
      . We place the listing. There is no login.
    </p>
  );
}
