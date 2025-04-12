import { Hono } from "hono";

import type { AppBindings } from "./types";

export function createRouter() {
  return new Hono<AppBindings>();
}
