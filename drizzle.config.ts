import type { Config } from "drizzle-kit";

export default {
  schema: "server/src/drizzle/schemas/index.ts",
  out: "server/src/drizzle/migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
} satisfies Config;
