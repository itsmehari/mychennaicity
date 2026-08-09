export type EventsNavPreviewItem = {
  slug: string;
  title: string;
  href: string;
  dateBadge: string;
  venueLine: string;
};

export type EventsNavPreviewResponse = {
  count: number;
  upcoming: EventsNavPreviewItem[];
  updatedAt: string;
};
