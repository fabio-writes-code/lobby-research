
import type { Config } from "drizzle-kit";

import { env } from "~/env";

export default { 
  schema: "./src/server/auth-db/schema.ts",
  out: "./server/db/migrations",
  dialect: "turso",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken:env.TURSO_AUTH_TOKEN,
  },
} satisfies Config;

