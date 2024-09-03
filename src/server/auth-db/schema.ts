import { boolean, text, unique } from "drizzle-orm/pg-core";

import { pgTableCreator, timestamp } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `cms-app_${name}`);

export const users = createTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  password: text("password"),
  email: text("email").notNull(),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("createdAt", { mode: "date" }),
});

export const InviteToken = createTable(
  "invite_token",
  {
    id: text("id").primaryKey().default(crypto.randomUUID()),
    email: text("email").notNull(),
    token: text("token").notNull().unique(),
    role: text("role").notNull().default("user"),
    usedAt: timestamp("used_at", { mode: "date" }),
    expiresAt: timestamp("expires_at", { mode: "date" }),
  },
  (t) => ({ unq: unique().on(t.email, t.token) }),
);

export const PasswordResetToken = createTable(
  "password_reset_token",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    email: text("email").notNull(),
    token: text("token").notNull().unique(),
    expiresAt: timestamp("expires_at", { mode: "date" }),
  },
  (t) => ({ unq: unique().on(t.email, t.token) }),
);
