import { createDatabase } from "@/database";
import type { AppContext } from "@/libs/types";
import type { MiddlewareHandler } from "hono";

export const dbMiddleware: MiddlewareHandler<AppContext> = async (c, next) => {
  const db = await createDatabase();
  c.set("db", db);
  return next();
};
