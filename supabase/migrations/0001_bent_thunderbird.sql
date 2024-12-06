CREATE TABLE IF NOT EXISTS "gallery" (
	"id" uuid PRIMARY KEY NOT NULL,
	"section_id" uuid NOT NULL,
	"image_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "global_settings" (
	"id" uuid PRIMARY KEY NOT NULL,
	"phone_number" text,
	"email" text,
	"address" text,
	"facebook_link" text,
	"instagram_link" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sections" (
	"id" uuid PRIMARY KEY NOT NULL,
	"section_name" text NOT NULL,
	"title" text,
	"sub_title" text,
	"content" text,
	"tagline" text,
	"button_text" text,
	"button_link" text,
	"image" text,
	"extra_data" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "services" (
	"id" uuid PRIMARY KEY NOT NULL,
	"section_id" uuid NOT NULL,
	"title" text NOT NULL,
	"image_url" text
);
