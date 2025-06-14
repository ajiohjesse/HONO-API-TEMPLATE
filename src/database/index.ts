import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schemas";

export async function createDatabase() {
  //for using local postgres in development & testing
  if (env.MODE === "development" || env.MODE === "test") {
    const { drizzle: devDrizzle } = await import("drizzle-orm/postgres-js");
    return devDrizzle(env.DB_URL, {
      schema,
      casing: "snake_case",
      logger: true,
    });
  }
  return drizzle(env.DB_URL, { schema, casing: "snake_case" });
}

export type DB = Awaited<ReturnType<typeof createDatabase>>;
