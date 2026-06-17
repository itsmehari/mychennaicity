import Image from "next/image";
import Link from "next/link";
import type { EventHubCardData } from "@/lib/events/event-hub-helpers";

function CardInner({ card }: { card: EventHubCardData }) {
  return (
    <>
      <div className="mcc-events-hub-card__media">
        {card.imageSrc ? (
          <Image
            src={card.imageSrc}
            alt={card.imageAlt}
            fill
            sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw"
            className="object-cover"
          />
        ) : (
          <div
            className={`mcc-events-hub-card__placeholder mcc-events-hub-card__placeholder--${card.placeholderTone}`}
            aria-hidden
          />
        )}
        <span className="mcc-events-hub-card__date">{card.dateBadge}</span>
      </div>
      <p
        className={`mcc-events-hub-card__status mcc-events-hub-card__status--${card.statusTone}`}
      >
        {card.statusLabel}
      </p>
      <h3 className="mcc-events-hub-card__title">{card.title}</h3>
      <p className="mcc-events-hub-card__venue">{card.venueLine}</p>
    </>
  );
}

export function EventHubCard({ card }: { card: EventHubCardData }) {
  const className =
    "mcc-events-hub-card group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

  if (card.external) {
    return (
      <article className={className}>
        <a href={card.href} target="_blank" rel="noopener noreferrer" className="block">
          <CardInner card={card} />
        </a>
      </article>
    );
  }

  return (
    <article className={className}>
      <Link href={card.href} className="block">
        <CardInner card={card} />
      </Link>
    </article>
  );
}
