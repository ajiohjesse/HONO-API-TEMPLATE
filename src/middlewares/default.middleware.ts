import type { ErrorResponse } from "@/libs/response";
import type { AppContext } from "@/libs/types";
import type { ErrorHandler, MiddlewareHandler, NotFoundHandler } from "hono";
import { HTTPException } from "hono/http-exception";

export const healthCheckHandler: MiddlewareHandler = async () => {
  return new Response("OK", { status: 200 });
};

export const notFoundHandler: NotFoundHandler = async c => {
  const data: ErrorResponse = {
    error: {
      code: "NOT_FOUND",
      message: "Resource not found",
    },
  };

  return c.json(data, 404);
};

export const errorHandler: ErrorHandler<AppContext> = async (err, c) => {
  if (err instanceof HTTPException) {
    const data: ErrorResponse = {
      error: {
        code: "HTTP_EXCEPTION",
        message: err.message,
      },
    };
    return c.json(data, err.status);
  }

  c.var.logger.error("Internal Server Error", err);
  const data: ErrorResponse = {
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred.",
    },
  };
  return c.json(data, 500);
};
