import type { FaqItem } from "@/lib/seo/faq-jsonld";

/** Visible FAQ text must match JSON-LD on /chennai-local-news. */
export const CHENNAI_NEWS_HUB_FAQ: FaqItem[] = [
  {
    question: "Where can I read Chennai local news today?",
    answer:
      "mychennaicity.in/chennai-local-news publishes Chennai civic updates, neighbourhood developments, transport, consumer reports, politics, and public notices for Greater Chennai — from Royapuram and Anna Nagar to Adyar, OMR, and Tambaram corridors.",
  },
  {
    question: "What topics does mychennaicity.in cover for Chennai?",
    answer:
      "We cover Greater Chennai Corporation and civic administration, mobility and Metro, elections and politics, consumer alerts, economy, and area-tagged neighbourhood stories. Open topic hubs such as Chennai, Politics, Elections, Economy, Consumer, and Mobility from the category bar.",
  },
  {
    question: "How often is Chennai local news updated?",
    answer:
      "The newsroom files stories as sources confirm them. The hub is served dynamically from our database, so new published articles appear on the listing and in the RSS feed without waiting for a static rebuild. Check the date and “updated” line under the page title for the latest desk activity.",
  },
  {
    question: "Can I follow Chennai news by neighbourhood?",
    answer:
      "Yes. Use Explore by area and News from your neighbourhood for hubs such as OMR, Adyar, Anna Nagar, T. Nagar, Guindy, Royapuram, and Porur. Each area page groups local context, and stories may link back to the Chennai local news feed.",
  },
  {
    question: "How do I tip a Chennai news story?",
    answer:
      "Use the Contact → Story tips form. Include dates, locations, and links we can verify. Tips help us prioritise civic alerts, public notices, and neighbourhood developments that affect Chennai residents.",
  },
  {
    question: "Is there an RSS feed for Chennai local news?",
    answer:
      "Yes. Subscribe at mychennaicity.in/chennai-local-news/feed.xml to receive newly published Chennai stories in your reader.",
  },
];
