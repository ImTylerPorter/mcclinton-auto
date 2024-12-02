import {
  pgTable,
  uuid,
  text,
  timestamp,
  varchar,
  boolean,
  jsonb
} from "drizzle-orm/pg-core";

// Profile Table (Existing)
export const profileTable = pgTable("profile", {
  id: uuid("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
});

// Global Settings Table
export const globalSettingsTable = pgTable("global_settings", {
  id: uuid("id").primaryKey(),
  phoneNumber: text("phone_number"),
  email: text("email"),
  address: text("address"),
  facebookLink: text("facebook_link"),
  instagramLink: text("instagram_link"),
});

// Sections Table
export const sectionsTable = pgTable("sections", {
  id: uuid("id").primaryKey(),
  sectionName: text("section_name").notNull(), // e.g., "Hero", "Services", etc.
  title: text("title"),
  subTitle: text("sub_title"),
  content: text("content"),
  tagline: text("tagline"),
  buttonText: text("button_text"),
  buttonLink: text("button_link"),
  image: text("image"),
  extraData: jsonb("extra_data"), // JSON for custom data specific to the section
});

// Gallery Table
export const galleryTable = pgTable("gallery", {
  id: uuid("id").primaryKey(),
  sectionId: uuid("section_id").notNull(), // Foreign Key referencing sectionsTable.id
  imageUrl: text("image_url").notNull(),
});

// Services Table
export const servicesTable = pgTable("services", {
  id: uuid("id").primaryKey(),
  sectionId: uuid("section_id").notNull(), // Foreign Key referencing sectionsTable.id
  title: text("title").notNull(),
  imageUrl: text("image_url"),
});
