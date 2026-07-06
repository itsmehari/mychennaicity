import type { FaqItem } from "@/lib/seo/faq-jsonld";

/** Visible FAQ text must match JSON-LD on /chennai-gold-rate. */
export const CHENNAI_GOLD_RATE_FAQ: FaqItem[] = [
  {
    question: "What is today's 24 carat gold rate in Chennai?",
    answer:
      "The 24 carat (99.9% purity) gold rate in Chennai is updated daily on this page in Indian Rupees per gram. Check the rate card at the top for today's figure and the last-updated time. Shop counters may quote slightly higher or lower after making charges.",
  },
  {
    question: "How is 22K gold price calculated from 24K?",
    answer:
      "22K gold is 91.6% pure (22 parts gold out of 24). The indicative 22K rate is derived from the 24K benchmark: 24K rate × (22 ÷ 24), rounded to the nearest rupee. Jewellers may round again at billing.",
  },
  {
    question: "Why is the shop price higher than the rate shown online?",
    answer:
      "Published rates usually reflect gold value per gram. At a Chennai jewellery shop you also pay making charges (labour), wastage on some designs, stone charges if any, and 3% GST on the taxable portion of the bill. Use our jewellery calculator to estimate the total.",
  },
  {
    question: "What are making charges and wastage in Chennai jewellery?",
    answer:
      "Making charges cover design and labour — quoted as a percentage of gold value or rupees per gram. Wastage is an extra weight allowance on intricate pieces (bangles, chains). Both vary by shop and design; T Nagar and central Chennai corridors often compete on making rates during festival weeks.",
  },
  {
    question: "Is GST included in the gold rate on this page?",
    answer:
      "No. The per-gram rates here are indicative gold-value benchmarks before making charges and GST. On hallmarked jewellery in Tamil Nadu, GST is typically 3% on the invoice total (rules can differ for coins or specific categories — confirm on your bill).",
  },
  {
    question: "What is the silver rate in Chennai today?",
    answer:
      "When available, we publish Chennai silver per gram alongside gold on this page. Silver moves on a different market cycle than gold; verify the shop quote before buying silver articles or coins.",
  },
  {
    question: "Where do Chennai buyers usually purchase gold?",
    answer:
      "Most retail demand is for jewellery — chains, bangles, rings, and wedding sets — from established corridors such as T Nagar, George Town, and neighbourhood showrooms. Coins and bars are a smaller share. Compare hallmark (BIS), invoice, and buy-back terms, not just the daily rate.",
  },
];
