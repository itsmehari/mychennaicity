-- mybanglore.in
-- One database. MySQL 8 or MariaDB 10.6+.
-- Datetimes are UTC. The PHP app displays Asia/Kolkata.
-- Public URLs use slugs. They never use the numeric id.
-- Import this file once. Later phases insert rows. They do not add a second schema.
-- Do not point this script at any database other than mybanglore.

CREATE DATABASE IF NOT EXISTS mybanglore
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE mybanglore;

-- ---------------------------------------------------------------------------
-- Geography
-- ---------------------------------------------------------------------------

CREATE TABLE cities (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(64) NOT NULL,
  name VARCHAR(120) NOT NULL,
  country_code CHAR(2) NOT NULL DEFAULT 'IN',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY cities_slug_uidx (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE areas (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  city_id BIGINT UNSIGNED NOT NULL,
  slug VARCHAR(120) NOT NULL,
  label VARCHAR(160) NOT NULL,
  blurb VARCHAR(400) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  pin_lat DECIMAL(9,6) NOT NULL,
  pin_lng DECIMAL(9,6) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY areas_city_slug_uidx (city_id, slug),
  CONSTRAINT areas_city_fk FOREIGN KEY (city_id) REFERENCES cities (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Desk login. PHP sessions. No OAuth tables.
-- ---------------------------------------------------------------------------

CREATE TABLE users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(190) NOT NULL,
  name VARCHAR(160) NULL,
  role ENUM('reader','contributor','editor','admin') NOT NULL DEFAULT 'reader',
  password_hash VARCHAR(255) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY users_email_uidx (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE audit_log (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  actor_user_id BIGINT UNSIGNED NULL,
  action VARCHAR(80) NOT NULL,
  entity_type VARCHAR(40) NOT NULL,
  entity_id BIGINT UNSIGNED NULL,
  payload JSON NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY audit_log_entity_idx (entity_type, entity_id, created_at),
  CONSTRAINT audit_log_actor_fk FOREIGN KEY (actor_user_id) REFERENCES users (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- News
-- lang is en-IN for every v1 row. The public site stays English. The column is there so a later translation can share the table. Do not build that translation in v1.
-- ---------------------------------------------------------------------------

CREATE TABLE articles (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  city_id BIGINT UNSIGNED NOT NULL,
  author_id BIGINT UNSIGNED NULL,
  lang VARCHAR(12) NOT NULL DEFAULT 'en-IN',
  slug VARCHAR(190) NOT NULL,
  title VARCHAR(300) NOT NULL,
  dek VARCHAR(400) NULL,
  summary TEXT NULL,
  body MEDIUMTEXT NOT NULL,
  report_body MEDIUMTEXT NULL,
  analysis_body MEDIUMTEXT NULL,
  interactive_json JSON NULL,
  source_url VARCHAR(500) NULL,
  source_name VARCHAR(200) NULL,
  category VARCHAR(80) NULL,
  status ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
  published_at DATETIME NULL,
  featured TINYINT(1) NOT NULL DEFAULT 0,
  hero_image_url VARCHAR(500) NULL,
  area_id BIGINT UNSIGNED NULL,
  author_byline VARCHAR(160) NULL,
  author_same_as VARCHAR(500) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY articles_city_lang_slug_uidx (city_id, lang, slug),
  KEY articles_public_idx (city_id, status, published_at),
  KEY articles_featured_idx (city_id, featured, published_at),
  FULLTEXT KEY articles_search (title, dek, summary),
  CONSTRAINT articles_city_fk FOREIGN KEY (city_id) REFERENCES cities (id),
  CONSTRAINT articles_author_fk FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE SET NULL,
  CONSTRAINT articles_area_fk FOREIGN KEY (area_id) REFERENCES areas (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Jobs. Salary columns stay NULL when the source printed no figure.
-- openings_count stays NULL when the note gave no count. Do not default it to 1.
-- remote_policy stays NULL when the note did not say office, hybrid, or remote.
-- ---------------------------------------------------------------------------

CREATE TABLE employers (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(190) NOT NULL,
  website_url VARCHAR(500) NULL,
  logo_url VARCHAR(500) NULL,
  verified TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY employers_slug_uidx (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE job_postings (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  employer_id BIGINT UNSIGNED NOT NULL,
  city_id BIGINT UNSIGNED NOT NULL,
  lang VARCHAR(12) NOT NULL DEFAULT 'en-IN',
  slug VARCHAR(190) NOT NULL,
  title VARCHAR(300) NOT NULL,
  body MEDIUMTEXT NOT NULL,
  location_label VARCHAR(200) NULL,
  area_id BIGINT UNSIGNED NULL,
  salary_min INT NULL,
  salary_max INT NULL,
  salary_disclosed TINYINT(1) NOT NULL DEFAULT 0,
  salary_note VARCHAR(200) NULL,
  remote_policy ENUM('onsite','hybrid','remote') NULL,
  employment_type VARCHAR(32) NULL,
  openings_count INT NULL,
  status ENUM('draft','open','closed') NOT NULL DEFAULT 'draft',
  valid_through DATETIME NULL,
  published_at DATETIME NULL,
  application_url VARCHAR(500) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY job_postings_city_lang_slug_uidx (city_id, lang, slug),
  KEY job_postings_public_idx (city_id, status, valid_through),
  FULLTEXT KEY job_postings_search (title, location_label),
  CONSTRAINT job_postings_employer_fk FOREIGN KEY (employer_id) REFERENCES employers (id),
  CONSTRAINT job_postings_city_fk FOREIGN KEY (city_id) REFERENCES cities (id),
  CONSTRAINT job_postings_area_fk FOREIGN KEY (area_id) REFERENCES areas (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE job_seeker_posts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  city_id BIGINT UNSIGNED NOT NULL,
  lang VARCHAR(12) NOT NULL DEFAULT 'en-IN',
  slug VARCHAR(190) NOT NULL,
  title VARCHAR(300) NOT NULL,
  body MEDIUMTEXT NOT NULL,
  seeker_label VARCHAR(200) NULL,
  location_label VARCHAR(200) NULL,
  area_id BIGINT UNSIGNED NULL,
  role_sought VARCHAR(200) NULL,
  needs_accommodation TINYINT(1) NOT NULL DEFAULT 0,
  availability VARCHAR(120) NULL,
  contact_phone VARCHAR(40) NULL,
  contact_whatsapp VARCHAR(40) NULL,
  contact_email VARCHAR(190) NULL,
  status ENUM('draft','open','closed') NOT NULL DEFAULT 'draft',
  published_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY job_seeker_posts_city_lang_slug_uidx (city_id, lang, slug),
  KEY job_seeker_posts_public_idx (city_id, status, published_at),
  CONSTRAINT job_seeker_posts_city_fk FOREIGN KEY (city_id) REFERENCES cities (id),
  CONSTRAINT job_seeker_posts_area_fk FOREIGN KEY (area_id) REFERENCES areas (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Events
-- ---------------------------------------------------------------------------

CREATE TABLE events (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  city_id BIGINT UNSIGNED NOT NULL,
  lang VARCHAR(12) NOT NULL DEFAULT 'en-IN',
  slug VARCHAR(190) NOT NULL,
  title VARCHAR(300) NOT NULL,
  description MEDIUMTEXT NULL,
  starts_at DATETIME NOT NULL,
  ends_at DATETIME NULL,
  all_day TINYINT(1) NOT NULL DEFAULT 0,
  venue_name VARCHAR(200) NULL,
  venue_address VARCHAR(400) NULL,
  locality_label VARCHAR(200) NULL,
  area_id BIGINT UNSIGNED NULL,
  status ENUM('draft','scheduled','cancelled','completed') NOT NULL DEFAULT 'draft',
  featured TINYINT(1) NOT NULL DEFAULT 0,
  ticket_note VARCHAR(300) NULL,
  source_url VARCHAR(500) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY events_city_lang_slug_uidx (city_id, lang, slug),
  KEY events_public_idx (city_id, status, starts_at),
  FULLTEXT KEY events_search (title, venue_name, locality_label),
  CONSTRAINT events_city_fk FOREIGN KEY (city_id) REFERENCES cities (id),
  CONSTRAINT events_area_fk FOREIGN KEY (area_id) REFERENCES areas (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Directory and classifieds
-- ---------------------------------------------------------------------------

CREATE TABLE directory_entries (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  city_id BIGINT UNSIGNED NOT NULL,
  lang VARCHAR(12) NOT NULL DEFAULT 'en-IN',
  type ENUM(
    'bank','school','hospital','park','restaurant','atm',
    'it_company','it_park','government_office','industry'
  ) NOT NULL,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(190) NOT NULL,
  blurb VARCHAR(400) NULL,
  address VARCHAR(400) NULL,
  locality_label VARCHAR(200) NULL,
  area_id BIGINT UNSIGNED NULL,
  phone VARCHAR(40) NULL,
  website_url VARCHAR(500) NULL,
  verified TINYINT(1) NOT NULL DEFAULT 0,
  status ENUM('draft','published') NOT NULL DEFAULT 'draft',
  metadata JSON NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY directory_city_type_lang_slug_uidx (city_id, type, lang, slug),
  KEY directory_public_idx (city_id, status),
  FULLTEXT KEY directory_search (name, blurb, locality_label),
  CONSTRAINT directory_city_fk FOREIGN KEY (city_id) REFERENCES cities (id),
  CONSTRAINT directory_area_fk FOREIGN KEY (area_id) REFERENCES areas (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE classified_listings (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  city_id BIGINT UNSIGNED NOT NULL,
  lang VARCHAR(12) NOT NULL DEFAULT 'en-IN',
  slug VARCHAR(190) NOT NULL,
  title VARCHAR(300) NOT NULL,
  body MEDIUMTEXT NOT NULL,
  category VARCHAR(80) NULL,
  poster_name VARCHAR(160) NULL,
  location_label VARCHAR(200) NULL,
  area_id BIGINT UNSIGNED NULL,
  contact_phone VARCHAR(40) NULL,
  contact_phone_gated TINYINT(1) NOT NULL DEFAULT 0,
  featured TINYINT(1) NOT NULL DEFAULT 0,
  image_urls JSON NULL,
  video_url VARCHAR(500) NULL,
  price_note VARCHAR(200) NULL,
  status ENUM('draft','open','closed') NOT NULL DEFAULT 'draft',
  published_at DATETIME NULL,
  expires_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY classified_city_lang_slug_uidx (city_id, lang, slug),
  KEY classified_public_idx (city_id, status, expires_at),
  FULLTEXT KEY classified_search (title, body, location_label),
  CONSTRAINT classified_city_fk FOREIGN KEY (city_id) REFERENCES cities (id),
  CONSTRAINT classified_area_fk FOREIGN KEY (area_id) REFERENCES areas (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE classified_phone_reveals (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  listing_id BIGINT UNSIGNED NOT NULL,
  enquirer_name VARCHAR(160) NULL,
  enquirer_phone VARCHAR(40) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY classified_reveals_listing_phone_uidx (listing_id, enquirer_phone),
  CONSTRAINT classified_reveals_listing_fk FOREIGN KEY (listing_id) REFERENCES classified_listings (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Community. WhatsApp rows are not articles.
-- ---------------------------------------------------------------------------

CREATE TABLE newsletter_subscribers (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(160) NULL,
  email VARCHAR(190) NOT NULL,
  status ENUM('active','unsubscribed') NOT NULL DEFAULT 'active',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY newsletter_email_uidx (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE whatsapp_join_verifications (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  display_name VARCHAR(160) NOT NULL,
  phone_raw VARCHAR(40) NOT NULL,
  phone_e164 VARCHAR(20) NOT NULL,
  phone_last4 CHAR(4) NOT NULL,
  locality VARCHAR(160) NOT NULL,
  intent VARCHAR(80) NOT NULL,
  intro VARCHAR(500) NULL,
  status ENUM('submitted','approved','declined','spam') NOT NULL DEFAULT 'submitted',
  source VARCHAR(80) NULL,
  ip_hash CHAR(64) NULL,
  user_agent VARCHAR(400) NULL,
  notes TEXT NULL,
  approved_at DATETIME NULL,
  approved_by BIGINT UNSIGNED NULL,
  last_contacted_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY whatsapp_join_phone_uidx (phone_e164),
  KEY whatsapp_join_last4_idx (phone_last4),
  KEY whatsapp_join_status_idx (status, created_at),
  CONSTRAINT whatsapp_join_approver_fk FOREIGN KEY (approved_by) REFERENCES users (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE contact_messages (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(160) NOT NULL,
  email VARCHAR(190) NULL,
  phone VARCHAR(40) NULL,
  topic ENUM('story','job','property','event','directory','advertise','general') NOT NULL DEFAULT 'general',
  body TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY contact_messages_topic_idx (topic, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Measurement. No IP address. visitor_id is the anonymous cookie.
-- ---------------------------------------------------------------------------

CREATE TABLE content_engagement_events (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  content_kind VARCHAR(32) NOT NULL,
  content_slug VARCHAR(190) NOT NULL,
  event_kind VARCHAR(32) NOT NULL,
  visitor_id VARCHAR(64) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY engagement_lookup_idx (content_kind, content_slug, event_kind, created_at),
  KEY engagement_visitor_idx (content_kind, content_slug, event_kind, visitor_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Discovery and later desks. Tables exist now. Pages wait for a real source.
-- ---------------------------------------------------------------------------

CREATE TABLE redirects (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  from_path VARCHAR(255) NOT NULL,
  to_path VARCHAR(255) NOT NULL,
  http_status SMALLINT NOT NULL DEFAULT 301,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY redirects_from_uidx (from_path)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gold_rate_snapshots (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  city_id BIGINT UNSIGNED NOT NULL,
  rate_date DATE NOT NULL,
  rate_24k_per_gram INT NOT NULL,
  rate_22k_per_gram INT NOT NULL,
  rate_18k_per_gram INT NOT NULL,
  silver_per_gram INT NULL,
  platinum_per_gram INT NULL,
  source_name VARCHAR(200) NOT NULL,
  source_note VARCHAR(400) NULL,
  fetched_at DATETIME NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY gold_rate_city_date_uidx (city_id, rate_date),
  CONSTRAINT gold_rate_city_fk FOREIGN KEY (city_id) REFERENCES cities (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE boundary_feedback (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  feedback_type VARCHAR(40) NOT NULL,
  lat DECIMAL(9,6) NOT NULL,
  lng DECIMAL(9,6) NOT NULL,
  ward_hint VARCHAR(120) NULL,
  note VARCHAR(500) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
