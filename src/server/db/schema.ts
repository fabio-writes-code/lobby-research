import { sql } from "drizzle-orm";
import { text, integer, sqliteTable} from "drizzle-orm/sqlite-core";

export const hansardDocuments = sqliteTable("hansard_documents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  content: text("content").notNull(),
  hansardDate: integer("hansard_date", { mode: "timestamp" }).notNull(),
  hansardId: text("hansard_id").notNull().unique()
});


// Users table (merged with clients)
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password"),
  role: text("role", { enum: ["admin", "user", "client"] }).notNull().default("user"),
  keywords: text("keywords"), // For client-specific keywords, stored as JSON
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Invite tokens table
export const inviteTokens = sqliteTable("invite_tokens", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull(),
  token: text("token").notNull(),
  role: text("role", { enum: ["admin", "user", "client"] }).notNull().default("user"),
  usedAt: integer("used_at", { mode: "timestamp" }),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
}); // Password reset tokens table

export const passwordResetTokens = sqliteTable("password_reset_tokens", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull(),
  token: text("token").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});


