import { createEnv } from "@t3-oss/env-nextjs";
// TYPES
import type { Config } from "drizzle-kit";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});

export default {
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    uri: env.DATABASE_URL,
  },
} satisfies Config;
