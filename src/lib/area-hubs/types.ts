export type AreaHubFactRow = {
  label: string;
  value: string;
};

export type AreaHubLocalityCard = {
  id: string;
  name: string;
  zone: string;
  description: string;
  tags: string[];
};

export type AreaHubGuideLink = {
  label: string;
  href: string;
  hint: string;
  external?: boolean;
};

export type AreaHubFaqItem = {
  question: string;
  answer: string;
};

export type AreaHubPartnerLink = {
  label: string;
  href: string;
  description: string;
};

export type AreaHubBestOfCard = {
  id: string;
  title: string;
  blurb: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
};

export type RichAreaHubContent = {
  slug: string;
  /** Overrides zone.blurb for metadata when set. */
  metaDescription: string;
  /** Short identity under the H1 (landing-page feel). */
  identityLine: string;
  heroDek: string;
  /** Optional full-bleed hero; falls back to a Chennai editorial image. */
  heroImage?: string;
  heroImageAlt?: string;
  /** One-liner for map panel / map section. */
  mapBlurb: string;
  /** Short chips under the hero. */
  statChips: { label: string; value: string }[];
  /** Anchor nav labels → section ids. */
  sectionNav: { id: string; label: string }[];
  bestOf: AreaHubBestOfCard[];
  aboutTitle: string;
  aboutSubtitle: string;
  aboutParagraphs: string[];
  corridorFacts: AreaHubFactRow[];
  localityCards: AreaHubLocalityCard[];
  commuteRows: AreaHubFactRow[];
  civicWatchlist: string[];
  civicTitle: string;
  lifestyleNotes: string[];
  practicalGuides: AreaHubGuideLink[];
  partnerLinks: AreaHubPartnerLink[];
  relatedHubSlugs: string[];
  faq: AreaHubFaqItem[];
};
