import {
  boolean,
  doublePrecision,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { users } from "./auth";

export const articleStatusEnum = pgEnum("article_status", [
  "draft",
  "published",
  "archived",
]);

export const eventStatusEnum = pgEnum("event_status", [
  "draft",
  "scheduled",
  "cancelled",
  "completed",
]);

export const jobPostingStatusEnum = pgEnum("job_posting_status", [
  "draft",
  "open",
  "closed",
]);

export const jobSeekerPostStatusEnum = pgEnum("job_seeker_post_status", [
  "draft",
  "open",
  "closed",
]);

export const classifiedListingStatusEnum = pgEnum("classified_listing_status", [
  "draft",
  "open",
  "closed",
]);

export const cities = pgTable("cities", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  countryCode: text("country_code").notNull().default("IN"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const articles = pgTable(
  "articles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    cityId: uuid("city_id")
      .notNull()
      .references(() => cities.id, { onDelete: "restrict" }),
    authorId: text("author_id").references(() => users.id, { onDelete: "set null" }),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    summary: text("summary"),
    /** Legacy / RSS plain fallback; prefer reportBody + analysisBody when set. */
    body: text("body").notNull(),
    reportBody: text("report_body"),
    analysisBody: text("analysis_body"),
    interactiveJson: jsonb("interactive_json").$type<Record<string, unknown> | null>(),
    sourceUrl: text("source_url"),
    sourceName: text("source_name"),
    category: text("category"),
    dek: text("dek"),
    status: articleStatusEnum("status").notNull().default("draft"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    featured: boolean("featured").notNull().default(false),
    heroImageUrl: text("hero_image_url"),
    /** Optional macro hub slug; must match `chennaiZones` when set. */
    areaHubSlug: text("area_hub_slug"),
    authorByline: text("author_byline"),
    /** Comma-separated profile URLs for JSON-LD Person.sameAs */
    authorSameAs: text("author_same_as"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    citySlug: uniqueIndex("articles_city_slug_uidx").on(t.cityId, t.slug),
  }),
);

export const employers = pgTable("employers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  websiteUrl: text("website_url"),
  logoUrl: text("logo_url"),
  /** Editorial: employer vetted before prominent placement. */
  verified: boolean("verified").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const events = pgTable(
  "events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    cityId: uuid("city_id")
      .notNull()
      .references(() => cities.id, { onDelete: "restrict" }),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
    endsAt: timestamp("ends_at", { withTimezone: true }),
    allDay: boolean("all_day").notNull().default(false),
    venueName: text("venue_name"),
    venueAddress: text("venue_address"),
    localityLabel: text("locality_label"),
    status: eventStatusEnum("status").notNull().default("draft"),
    featured: boolean("featured").notNull().default(false),
    /** When set with `contentRef`, detail page uses a registered rich layout; NULL = legacy prose layout. */
    presentationKey: text("presentation_key"),
    /** Keys the code content module (e.g. festival schedule bundle). */
    contentRef: text("content_ref"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    citySlug: uniqueIndex("events_city_slug_uidx").on(t.cityId, t.slug),
  }),
);

/** One row per anonymous visitor (`mcc_vid` cookie) per event — unique reader views. */
export const eventPageViewers = pgTable(
  "event_page_viewers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    eventId: uuid("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    visitorId: text("visitor_id").notNull(),
    viewedAt: timestamp("viewed_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    eventVisitorUidx: uniqueIndex("event_page_viewers_event_visitor_uidx").on(
      t.eventId,
      t.visitorId,
    ),
  }),
);

export const jobPostings = pgTable(
  "job_postings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    employerId: uuid("employer_id")
      .notNull()
      .references(() => employers.id, { onDelete: "cascade" }),
    cityId: uuid("city_id")
      .notNull()
      .references(() => cities.id, { onDelete: "restrict" }),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    body: text("body").notNull(),
    locationLabel: text("location_label"),
    salaryMin: integer("salary_min"),
    salaryMax: integer("salary_max"),
    salaryDisclosed: boolean("salary_disclosed").notNull().default(true),
    remotePolicy: text("remote_policy").notNull().default("onsite"),
    openingsCount: integer("openings_count").notNull().default(1),
    status: jobPostingStatusEnum("status").notNull().default("draft"),
    validThrough: timestamp("valid_through", { withTimezone: true }),
    /** When the role first went live as `open` — used for JobPosting `datePosted` when set. */
    publishedAt: timestamp("published_at", { withTimezone: true }),
    /** Official apply URL (employer ATS or careers page). */
    applicationUrl: text("application_url"),
    /** e.g. FULL_TIME, PART_TIME, CONTRACTOR */
    employmentType: text("employment_type"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    citySlug: uniqueIndex("job_postings_city_slug_uidx").on(t.cityId, t.slug),
  }),
);

/** Job seeker / “looking for work” listings — people hiring managers can reach out to. */
export const jobSeekerPosts = pgTable(
  "job_seeker_posts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    cityId: uuid("city_id")
      .notNull()
      .references(() => cities.id, { onDelete: "restrict" }),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    body: text("body").notNull(),
    /** Short label, e.g. “Watchman · family of 3”. */
    seekerLabel: text("seeker_label"),
    locationLabel: text("location_label"),
    roleSought: text("role_sought"),
    needsAccommodation: boolean("needs_accommodation").notNull().default(false),
    /** e.g. immediate, 2 weeks notice */
    availability: text("availability"),
    contactPhone: text("contact_phone"),
    contactWhatsApp: text("contact_whatsapp"),
    contactEmail: text("contact_email"),
    status: jobSeekerPostStatusEnum("status").notNull().default("draft"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    citySlug: uniqueIndex("job_seeker_posts_city_slug_uidx").on(t.cityId, t.slug),
  }),
);

export const directoryEntryTypeEnum = pgEnum("directory_entry_type", [
  "bank",
  "school",
  "hospital",
  "park",
  "restaurant",
  "atm",
  "it_company",
  "it_park",
  "government_office",
  "industry",
]);

export const directoryEntries = pgTable(
  "directory_entries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    cityId: uuid("city_id")
      .notNull()
      .references(() => cities.id, { onDelete: "restrict" }),
    type: directoryEntryTypeEnum("type").notNull(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    address: text("address"),
    localityLabel: text("locality_label"),
    phone: text("phone"),
    websiteUrl: text("website_url"),
    verified: boolean("verified").notNull().default(false),
    metadata: text("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    cityTypeSlug: uniqueIndex("directory_city_type_slug_uidx").on(
      t.cityId,
      t.type,
      t.slug,
    ),
  }),
);

/** Reader-submitted classified ads — tuition, services, wanted posts, etc. */
export const classifiedListings = pgTable(
  "classified_listings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    cityId: uuid("city_id")
      .notNull()
      .references(() => cities.id, { onDelete: "restrict" }),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    body: text("body").notNull(),
    /** e.g. tuition, services, wanted */
    category: text("category"),
    posterName: text("poster_name"),
    posterUrl: text("poster_url"),
    locationLabel: text("location_label"),
    contactPhone: text("contact_phone"),
    areaHubSlug: text("area_hub_slug"),
    status: classifiedListingStatusEnum("status").notNull().default("draft"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    citySlug: uniqueIndex("classified_listings_city_slug_uidx").on(t.cityId, t.slug),
  }),
);

/** Community boundary feedback — does not modify authoritative geo data. */
export const boundaryFeedback = pgTable("boundary_feedback", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: text("type").notNull(),
  lat: doublePrecision("lat").notNull(),
  lng: doublePrecision("lng").notNull(),
  wardHint: text("ward_hint"),
  note: text("note"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Daily Chennai retail gold/silver benchmark — one row per IST calendar day. */
export const goldRateSnapshots = pgTable(
  "gold_rate_snapshots",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    cityId: uuid("city_id")
      .notNull()
      .references(() => cities.id, { onDelete: "restrict" }),
    /** IST calendar date `YYYY-MM-DD`. */
    rateDate: text("rate_date").notNull(),
    /** INR per gram, whole rupees. */
    rate24kPerGram: integer("rate_24k_per_gram").notNull(),
    rate22kPerGram: integer("rate_22k_per_gram").notNull(),
    rate18kPerGram: integer("rate_18k_per_gram").notNull(),
    silverPerGram: integer("silver_per_gram"),
    platinumPerGram: integer("platinum_per_gram"),
    sourceName: text("source_name").notNull(),
    sourceNote: text("source_note"),
    fetchedAt: timestamp("fetched_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    cityRateDate: uniqueIndex("gold_rate_snapshots_city_date_uidx").on(
      t.cityId,
      t.rateDate,
    ),
  }),
);
