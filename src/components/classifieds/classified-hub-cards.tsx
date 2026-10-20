import Image from "next/image";
import Link from "next/link";
import type { ClassifiedListingRow } from "@/domains/classifieds";
import { classifiedCardBlurb } from "@/lib/classifieds/card-blurb";
import { formatClassifiedCategoryLabel } from "@/lib/classifieds/categories";
import { classifiedCoverSrc } from "@/lib/classifieds/images";
import { chennaiClassifiedDetailPath } from "@/lib/routes/chennai-classifieds";

function listingPlace(listing: ClassifiedListingRow): string {
  return listing.locationLabel?.trim() || "Chennai";
}

function listingKicker(listing: ClassifiedListingRow): string {
  const category = listing.category?.trim();
  const label = category ? formatClassifiedCategoryLabel(category) : "Classified";
  const poster = listing.posterName?.trim();
  return poster ? `${label} · ${poster}` : label;
}

function isPhotoCover(listing: ClassifiedListingRow): boolean {
  return listing.category?.trim().toLowerCase() !== "property";
}

function BoardCard({ listing }: { listing: ClassifiedListingRow }) {
  const cover = classifiedCoverSrc(listing.imageUrls);
  const blurb = classifiedCardBlurb(listing.body);
  return (
    <Link
      href={chennaiClassifiedDetailPath(listing.slug)}
      className="mcc-classified-board"
    >
      {cover ? (
        <div className="mcc-classified-board__media">
          {listing.featured ? (
            <span className="mcc-classified-board__flag">Featured</span>
          ) : null}
          <Image
            src={cover}
            alt=""
            fill
            priority
            sizes="(max-width: 860px) 100vw, 560px"
            className="object-contain p-4 sm:p-6"
          />
        </div>
      ) : null}
      <div className="mcc-classified-board__body">
        <p className="mcc-classified-board__kicker">{listingKicker(listing)}</p>
        <h2 className="mcc-classified-board__title">{listing.title}</h2>
        <p className="mcc-classified-board__place">{listingPlace(listing)}</p>
        {blurb ? <p className="mcc-classified-board__blurb">{blurb}</p> : null}
        <span className="mcc-classified-board__cta">Open this ad</span>
      </div>
    </Link>
  );
}

function GridCard({ listing }: { listing: ClassifiedListingRow }) {
  const cover = classifiedCoverSrc(listing.imageUrls);
  const photo = Boolean(cover && isPhotoCover(listing));
  const blurb = classifiedCardBlurb(listing.body, 120);
  return (
    <Link
      href={chennaiClassifiedDetailPath(listing.slug)}
      className="mcc-classified-card"
    >
      {cover ? (
        <div
          className={
            photo
              ? "mcc-classified-card__media mcc-classified-card__media--photo"
              : "mcc-classified-card__media"
          }
        >
          {listing.featured ? (
            <span className="mcc-classified-card__flag">Featured</span>
          ) : null}
          <Image
            src={cover}
            alt=""
            fill
            sizes="(max-width: 720px) 100vw, 50vw"
            className={photo ? "object-cover" : "object-contain p-3"}
          />
        </div>
      ) : (
        <div className="mcc-classified-card__mast">
          <p className="mcc-classified-card__kicker">{listingKicker(listing)}</p>
        </div>
      )}
      <div className="mcc-classified-card__body">
        {cover ? (
          <p className="mcc-classified-card__kicker">{listingKicker(listing)}</p>
        ) : null}
        <h2 className="mcc-classified-card__title">{listing.title}</h2>
        <p className="mcc-classified-card__place">{listingPlace(listing)}</p>
        {blurb ? <p className="mcc-classified-card__blurb">{blurb}</p> : null}
        <span className="mcc-classified-card__cta">Open this ad</span>
      </div>
    </Link>
  );
}

export function ClassifiedHubListingCards({
  listings,
}: {
  listings: ClassifiedListingRow[];
}) {
  const leadIndex = listings.findIndex(
    (listing) => listing.featured && classifiedCoverSrc(listing.imageUrls),
  );
  const lead = leadIndex >= 0 ? listings[leadIndex] : null;
  const rest = listings.filter((_, index) => index !== leadIndex);

  return (
    <div className="mcc-classified-cards">
      {lead ? <BoardCard listing={lead} /> : null}
      {rest.length > 0 ? (
        <ul className="mcc-classified-grid">
          {rest.map((listing) => (
            <li key={listing.id}>
              <GridCard listing={listing} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
