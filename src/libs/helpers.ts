import type { z } from "zod";

import { Hono } from "hono";
import { validator } from "hono-openapi/zod";

import type { ApiResponse, AppEnv } from "./types";

export function createRouter() {
  return new Hono<AppEnv>();
}

export function validateRequest<T extends z.ZodSchema<any>>(
  target: "json" | "query" | "param",
  schema: T,
) {
  return validator(target, schema, (result, c) => {
    if (!result.success) {
      return c.json<ApiResponse<Record<string, unknown>>>({
        success: false,
        statusCode: 400,
        message: "Invalid request payload",
        data: {
          fields: result.error.flatten().fieldErrors,
        },
      }, 400);
    }
  });
}
