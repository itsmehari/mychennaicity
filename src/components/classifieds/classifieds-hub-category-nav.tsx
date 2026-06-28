import Link from "next/link";
import {
  CLASSIFIED_HUB_CATEGORIES,
  type ClassifiedCategoryId,
} from "@/lib/classifieds/categories";
import { chennaiClassifiedsHubPath } from "@/lib/routes/chennai-classifieds";

export function ClassifiedsHubCategoryNav({
  activeCategory,
}: {
  activeCategory: ClassifiedCategoryId | null;
}) {
  return (
    <nav
      className="mcc-events-hub-categories"
      aria-label="Filter classified ads by category"
    >
      {CLASSIFIED_HUB_CATEGORIES.map((cat) => {
        const active =
          cat.id === "all" ? activeCategory === null : activeCategory === cat.id;
        return (
          <Link
            key={cat.id}
            href={chennaiClassifiedsHubPath({
              category: cat.id === "all" ? null : cat.id,
            })}
            className={`mcc-events-hub-categories__chip${active ? " is-active" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            {cat.label}
          </Link>
        );
      })}
    </nav>
  );
}
