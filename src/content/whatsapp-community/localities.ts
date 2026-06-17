/** Chennai localities for GEO body copy and area grid on the landing page. */
export const WHATSAPP_COMMUNITY_LOCALITIES: {
  label: string;
  href?: string;
}[] = [
  { label: "OMR", href: "/areas/omr-perungudi-sholinganallur" },
  { label: "Adyar", href: "/areas/adyar-thiruvanmiyur" },
  { label: "T Nagar", href: "/areas/kodambakkam-t-nagar" },
  { label: "Anna Nagar", href: "/areas/ambattur-annanagar" },
  { label: "Velachery" },
  { label: "Tambaram" },
  { label: "Porur", href: "/areas/valasaravakkam-porur" },
  { label: "Chrompet" },
  { label: "Sholinganallur" },
  { label: "Perungudi" },
  { label: "Nungambakkam", href: "/areas/teynampet-nungambakkam" },
  { label: "Royapuram", href: "/areas/royapuram-tondiarpet" },
  { label: "Ambattur", href: "/areas/ambattur-annanagar" },
  { label: "Madhavaram", href: "/areas/madhavaram-madhavaram" },
  { label: "Ennore", href: "/areas/tiruvottiyur-manali-belt" },
  { label: "Guindy", href: "/areas/saidapet-guindy-alandur" },
];

export const WHATSAPP_COMMUNITY_BENEFITS = [
  {
    title: "Local news",
    description: "Short Chennai updates and civic context from our newsroom.",
    href: "/chennai-local-news",
  },
  {
    title: "Jobs",
    description: "Fresh roles across OMR, tech parks, and city employers.",
    href: "/chennai-jobs",
  },
  {
    title: "Events",
    description: "Festivals, meetups, and weekend plans worth knowing.",
    href: "/chennai-local-events",
  },
  {
    title: "Directory",
    description: "Schools, clinics, food, and services readers recommend.",
    href: "/directory",
  },
  {
    title: "Civic alerts",
    description: "Water, traffic, GCC notices — with location when possible.",
    href: "/chennai-local-news/topic/chennai",
  },
  {
    title: "Ask the community",
    description: "Neighbour help, area tips, and civil Q&A — moderated.",
    href: "/community-guidelines",
  },
] as const;
