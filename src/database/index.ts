import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as nodeDrizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schemas";

export function createDatabase({
  url,
  isDev,
}: {
  url: string;
  isDev: boolean;
}) {
  //for using local postgres in development
  if (isDev)
    return nodeDrizzle(url, { schema, casing: "snake_case", logger: true });
  return drizzle(url, { schema, casing: "snake_case" });
}

export type DB = ReturnType<typeof createDatabase>;
