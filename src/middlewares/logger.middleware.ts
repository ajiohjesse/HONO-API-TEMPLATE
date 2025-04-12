import type { MiddlewareHandler } from "hono";

import { pinoLogger } from "hono-pino";
import pino from "pino";

export const loggerMiddleware: MiddlewareHandler = async (c, next) => {
  const isDev = c.env.MODE === "development";
  const logger = pinoLogger({
    pino: pino(
      {
        level: isDev ? "debug" : "info",
      },
    ),
    http: isDev
      ? false
      : {
          reqId: () => crypto.randomUUID(),
          onReqMessage: () => "--> Request received",
          onResMessage: () => "<-- Request completed",
        },
  });

  return logger(c, next);
};
