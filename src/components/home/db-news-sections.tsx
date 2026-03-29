import { Section } from "@/components/home/section";
import {
  EditorsRevealGrid,
  NewsRevealGrid,
} from "@/components/home/news-reveal-cards";
import type { PublicArticleRow } from "@/domains/news";

export function HomeDbNewsSections({
  latest,
  featured,
}: {
  latest: PublicArticleRow[];
  featured: PublicArticleRow[];
}) {
  return (
    <div className="rounded-[1.35rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm ring-1 ring-[color-mix(in_srgb,var(--foreground)_4%,transparent)] sm:p-8">
      <Section
        eyebrow="Latest"
        title="News bulletin"
        subtitle="Fresh stories from our database — each one has a short report, local angle, and a small on-page extra."
        action={{
          href: "/chennai-local-news",
          label: "All news layout",
        }}
      >
        <NewsRevealGrid articles={latest} variant="bulletin" />
      </Section>
      <div className="mt-12 border-t border-[var(--home-section-border)] pt-12 sm:mt-14 sm:pt-14">
        <Section
          eyebrow="Picks"
          title="Editor's picks"
          subtitle="Stories we are highlighting — hover a card on desktop, tap on mobile to see more."
          action={{
            href: "/chennai-local-news",
            label: "All stories",
          }}
        >
          <EditorsRevealGrid articles={featured} />
        </Section>
      </div>
    </div>
  );
}
