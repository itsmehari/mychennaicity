import type { FaqItem } from "@/lib/seo/faq-jsonld";

export const YOGA_DAY_2026_SLUG =
  "international-yoga-day-2026-chennai-yoga-for-healthy-ageing";

/** Visible H1 — SEO title lives in DB `articles.title`. */
export const YOGA_DAY_2026_H1 =
  "International Yoga Day 2026: Why Chennai Should Turn Yoga Day Into a Daily Health Habit";

export const YOGA_DAY_2026_SEO_TITLE =
  "International Yoga Day 2026: Chennai Embraces Yoga for Healthy Ageing";

export const YOGA_DAY_2026_META_DESCRIPTION =
  "International Yoga Day 2026 carries the theme Yoga for Healthy Ageing. Here is why Chennai should turn Yoga Day into a daily wellness habit for families, elders, students, and working professionals.";

export const YOGA_DAY_HERO_IMAGE =
  "/images/articles/international-yoga-day-2026-chennai-beach-yoga.webp";

export const YOGA_DAY_INDIA_SESSION_IMAGE =
  "/images/articles/international-yoga-day-india-public-yoga-session.webp";

export const YOGA_DAY_SENIOR_IMAGE =
  "/images/articles/yoga-for-healthy-ageing-chennai-senior-citizens.webp";

export const YOGA_DAY_WORKPLACE_IMAGE =
  "/images/articles/workplace-yoga-chennai-it-professionals.webp";

export const YOGA_DAY_BEACH_IMAGE =
  "/images/articles/marina-beach-sunrise-yoga-space-chennai.webp";

export const YOGA_DAY_FAMILY_IMAGE =
  "/images/articles/family-yoga-at-home-chennai-wellness.webp";

export const YOGA_DAY_CMRL_EVENT_IMAGE =
  "/images/articles/cmrl-shenoy-nagar-yoga-day-2026.webp";

export const yogaDayFactRibbon = [
  { label: "Date", value: "June 21" },
  { label: "2026 Theme", value: "Yoga for Healthy Ageing" },
  { label: "Local Focus", value: "Chennai wellness" },
  { label: "Habit Goal", value: "10 minutes daily" },
] as const;

export const yogaDayLocalRelevance = [
  {
    icon: "💻",
    title: "IT Professionals",
    problem: "Long sitting and screen fatigue",
    benefit: "Mobility, breathing, posture reset",
  },
  {
    icon: "📚",
    title: "Students",
    problem: "Exam pressure and long study hours",
    benefit: "Focus, breathing control, emotional balance",
  },
  {
    icon: "🧓",
    title: "Senior Citizens",
    problem: "Stiffness, balance, and low mobility",
    benefit: "Confidence, breathing, social connection",
  },
  {
    icon: "🏢",
    title: "Apartment Communities",
    problem: "Limited outdoor wellness space",
    benefit: "Low-cost group activity on terraces and halls",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Families",
    problem: "Irregular routines and screen time",
    benefit: "Shared 15-minute home wellness habit",
  },
  {
    icon: "🏫",
    title: "Schools and Colleges",
    problem: "Sedentary classroom routines",
    benefit: "Preventive health discipline beyond annual display",
  },
] as const;

export const yogaDayToc = [
  { id: "why-june-21", label: "Why June 21 became International Yoga Day" },
  { id: "theme-yoga-for-healthy-ageing", label: "2026 theme: Yoga for Healthy Ageing" },
  { id: "why-chennai-needs-yoga", label: "Why Chennai needs a daily yoga culture" },
  { id: "daily-practice", label: "From one-day event to 365-day practice" },
  { id: "working-population", label: "Yoga for Chennai's working population" },
  { id: "senior-citizens", label: "Yoga for senior citizens in Chennai" },
  { id: "chennai-yoga-spaces", label: "Chennai's natural yoga spaces" },
  { id: "family-yoga", label: "How families can start at home" },
  { id: "chennai-this-yoga-day", label: "What Chennai should do this Yoga Day" },
  { id: "faq", label: "Frequently asked questions" },
] as const;

export const yogaDayFaq: FaqItem[] = [
  {
    question: "When is International Yoga Day 2026?",
    answer:
      "International Yoga Day 2026 is observed on June 21. The day is marked across India and many countries through yoga sessions, public events, institutional programmes, and community activities.",
  },
  {
    question: "What is the theme of International Yoga Day 2026?",
    answer:
      'The theme of International Yoga Day 2026 is "Yoga for Healthy Ageing." It focuses on yoga as a lifelong practice that supports mobility, balance, breathing, mental calmness, emotional resilience, and active ageing.',
  },
  {
    question: "Why is the 2026 theme important for Chennai?",
    answer:
      "The theme is relevant for Chennai because the city has a large working population, student population, apartment communities, and senior citizens. Yoga can help address stress, long sitting hours, posture issues, stiffness, and the need for preventive wellness.",
  },
  {
    question: "Can beginners start yoga on International Yoga Day?",
    answer:
      "Yes. Beginners can start with simple breathing, stretching, basic postures, and relaxation. Difficult postures are not necessary. Consistency matters more than complexity.",
  },
  {
    question: "Is yoga safe for senior citizens?",
    answer:
      "Gentle yoga, chair yoga, supported movements, and breathing practices can be useful for senior citizens. However, people with chronic illness, heart conditions, vertigo, recent surgery, severe arthritis, or uncontrolled blood pressure should practise only after medical advice and under qualified guidance.",
  },
  {
    question: "Where can yoga be practised in Chennai?",
    answer:
      "Yoga can be practised at home, in apartment halls, terraces, parks, beaches, schools, colleges, offices, and community centres. Marina Beach, Elliot's Beach, and neighbourhood parks are natural outdoor wellness spaces in Chennai.",
  },
];

export const yogaDayUsefulLinks = [
  {
    label: "Explore upcoming Chennai events",
    href: "/chennai-local-events",
  },
  {
    label: "Join the Chennai local community",
    href: "/chennai-whatsapp-group",
  },
  {
    label: "Read more health and wellness updates",
    href: "/chennai-local-news/topic/health-wellness",
  },
  {
    label: "Submit a local event in Chennai",
    href: "/chennai-local-events",
  },
  {
    label: "Share a community update with MyChennaiCity",
    href: "/chennai-whatsapp-community-guide",
  },
] as const;
