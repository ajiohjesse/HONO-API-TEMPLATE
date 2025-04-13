import { createDatabase } from "@/database";
import { AppEnv } from "@/libs/types";
import { MiddlewareHandler } from "hono";

export const dbMiddleware: MiddlewareHandler<AppEnv> = (c, next) => {
  const { DB_URL, MODE } = c.env;
  const db = createDatabase({
    url: DB_URL,
    isDev: MODE === "development",
  });
  c.set("db", db);
  return next();
};
