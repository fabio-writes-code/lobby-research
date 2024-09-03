import { type Config } from "drizzle-kit";

console.log("POSTGRES_URL", process.env.POSTGRES_URL);

export default {
  schema: "./src/server/auth-db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL as string,
  },
  tablesFilter: ["cms-app_*"],
} satisfies Config;
