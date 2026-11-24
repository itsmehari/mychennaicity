import Link from "next/link";
import {
  FREE_POST_HUB_LEDE,
  type FreePostKind,
  freePostGuide,
} from "@/content/free-posting";
import { DeskPostAnchor } from "@/components/free-posting/desk-post-context";
import {
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";

export function FreePostHandoff({
  kind,
  locale = "en",
}: {
  kind: FreePostKind;
  locale?: "en" | "ta";
}) {
  const guide = freePostGuide(kind);
  const ta = locale === "ta";

  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: ta ? "முகப்பு" : "Home", href: "/" },
          { label: guide.navLabel },
        ]}
      />
      <h1 className="type-display mt-6 text-3xl text-[var(--foreground)] sm:text-4xl">
        {guide.navLabel}
      </h1>
      <p className="type-lede mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        {ta
          ? "இலவசமாகப் பதிவிட MyChennaiCity மேசைக்கு WhatsApp செய்தி அனுப்புங்கள். பொதுப் படிவம் இல்லை. விவரங்களைச் சேர்த்து அனுப்புங்கள். மேசை சரிபார்த்த பிறகு சென்னைக்காக வெளியிடும்."
          : FREE_POST_HUB_LEDE}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <DeskPostAnchor kind={kind} className="mcc-supply-cta">
          {ta ? "WhatsApp செய்தி அனுப்பு" : "Send a WhatsApp message"}
        </DeskPostAnchor>
        <Link
          href={guide.path}
          className="text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
        >
          {guide.h1}
        </Link>
      </div>
      <p className="mt-3 max-w-2xl text-sm text-[var(--muted)]">
        {ta
          ? "WhatsApp ஒரு தொடக்கச் செய்தியுடன் திறக்கும். விவரங்களைச் சேர்த்து அனுப்புங்கள்."
          : "WhatsApp opens with a starter message. Add the details and press send."}
      </p>
    </div>
  );
}
