import { OpenAPIHono } from "@hono/zod-openapi";
import type { ValidationErrorResponse } from "./response";
import type { AppContext } from "./types";

export function createApp() {
  return new OpenAPIHono<AppContext>({
    defaultHook: (result, c) => {
      if (!result.success) {
        const data: ValidationErrorResponse = {
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid request body",
            fieldErrors: result.error.flatten().fieldErrors,
          },
        };

        return c.json(data, 422);
      }
    },
  });
}

export type App = ReturnType<typeof createApp>;
