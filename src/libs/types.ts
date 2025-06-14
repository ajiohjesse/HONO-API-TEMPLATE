import type { DB } from "@/database";
import type { PinoLogger } from "hono-pino";

export interface AppContext {
  Bindings: Env;
  Variables: {
    logger: PinoLogger;
    db: DB;
  };
}
