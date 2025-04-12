import type { ErrorHandler, NotFoundHandler } from "hono";

import { HTTPException } from "hono/http-exception";

import type { ApiResponse, AppEnv } from "@/libs/types";

export const notFoundHandler: NotFoundHandler = async (c) => {
  return c.json<ApiResponse>({
    success: false,
    message: "Not Found",
    statusCode: 404,
    data: null,
  });
};

export const errorHandler: ErrorHandler<AppEnv> = async (err, c) => {
  if (err instanceof HTTPException) {
    return c.json<ApiResponse>({
      success: false,
      message: err.message,
      statusCode: err.status,
      data: null,
    }, err.status);
  }

  c.var.logger.error("Internal Server Error", err);

  return c.json<ApiResponse>({
    success: false,
    message: "Internal Server Error",
    statusCode: 500,
    data: null,
  }, 500);
};
