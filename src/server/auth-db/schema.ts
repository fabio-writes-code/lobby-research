import { sql } from "drizzle-orm";
import { 
  text, 
  integer, 
  sqliteTable,
  uniqueIndex 
} from "drizzle-orm/sqlite-core";

// Users table (merged with clients)
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password"),
  role: text("role", { enum: ["admin", "user", "client"] }).notNull().default("user"),
  keywords: text("keywords"), // For client-specific keywords, stored as JSON
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
}, (table) => ({
  emailIdx: uniqueIndex('email_idx').on(table.email),
}));

// Invite tokens table
export const inviteTokens = sqliteTable("invite_tokens", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull(),
  token: text("token").notNull(),
  role: text("role", { enum: ["admin", "user", "client"] }).notNull().default("user"),
  usedAt: integer("used_at", { mode: "timestamp" }),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
}, (table) => ({
  emailTokenIdx: uniqueIndex('email_token_idx').on(table.email, table.token),
}));

// Password reset tokens table
export const passwordResetTokens = sqliteTable("password_reset_tokens", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull(),
  token: text("token").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
}, (table) => ({
  emailTokenIdx: uniqueIndex('email_token_idx').on(table.email, table.token),
}));

