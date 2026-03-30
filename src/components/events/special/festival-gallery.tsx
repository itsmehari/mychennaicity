import Image from "next/image";
import type { FestivalGalleryItem } from "@/content/special-events/types";

type Props = { items: FestivalGalleryItem[] };

export function FestivalGallery({ items }: Props) {
  if (!items.length) return null;
  return (
    <section
      id="gallery"
      className="mt-12 scroll-mt-24"
      aria-labelledby="gallery-heading"
    >
      <h2
        id="gallery-heading"
        className="type-display text-xl font-semibold text-[var(--foreground)] sm:text-2xl"
      >
        Festival glimpses
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <li
            key={`${item.src}-${i}`}
            className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={800}
              height={520}
              className="aspect-[800/520] w-full object-cover"
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              priority={i === 0}
            />
            {item.caption ? (
              <p className="border-t border-[var(--border)] px-3 py-2 text-xs leading-relaxed text-[var(--muted)]">
                {item.caption}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
