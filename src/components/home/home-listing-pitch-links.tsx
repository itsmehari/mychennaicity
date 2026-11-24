import { DeskPostAnchor } from "@/components/free-posting/desk-post-context";

export function HomeListingPitchLinks() {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-3">
        <DeskPostAnchor kind="home" className="mcc-supply-cta">
          Post a property
        </DeskPostAnchor>
        <DeskPostAnchor kind="job" className="mcc-supply-cta">
          Post a job
        </DeskPostAnchor>
      </div>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Send the details on WhatsApp. The desk places the listing.
      </p>
    </div>
  );
}
