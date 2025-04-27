import type { ApiResponse, AppEnv } from "@/libs/types";
import type { ErrorHandler, MiddlewareHandler, NotFoundHandler } from "hono";
import { HTTPException } from "hono/http-exception";

export const healthCheckHandler: MiddlewareHandler = async c => {
  return c.json<ApiResponse>({
    success: true,
    statusCode: 200,
    message: "OK",
    data: null,
  });
};

export const notFoundHandler: NotFoundHandler = async c => {
  return c.json<ApiResponse>(
    {
      success: false,
      message: "Not Found",
      statusCode: 404,
      data: null,
    },
    404
  );
};

export const errorHandler: ErrorHandler<AppEnv> = async (err, c) => {
  if (err instanceof HTTPException) {
    return c.json<ApiResponse>(
      {
        success: false,
        message: err.message,
        statusCode: err.status,
        data: null,
      },
      err.status
    );
  }

  c.var.logger.error("Internal Server Error", err);

  return c.json<ApiResponse>(
    {
      success: false,
      message: "Internal Server Error",
      statusCode: 500,
      data: null,
    },
    500
  );
};
