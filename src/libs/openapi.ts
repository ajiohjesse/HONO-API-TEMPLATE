import { z } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { env } from "cloudflare:workers";
import { APP_CONFIG } from "./app.config";
import type { App } from "./create-app";
import {
  errorResponse,
  paginatedResponse,
  successResponse,
  validationErrorResponse,
} from "./response";

export function setupOpenapi(app: App) {
  if (env.MODE === "production") return;

  const registry = app.openAPIRegistry;

  registry.registerComponent("securitySchemes", "Bearer", {
    type: "http",
    scheme: "bearer",
  });

  registry.registerComponent("securitySchemes", "RefreshToken", {
    type: "apiKey",
    in: "cookie",
    name: "refresh_token",
  });

  const sampleSchema = z
    .record(z.string(), z.unknown())
    .openapi({ example: {} });

  registry.register("SuccessResponse", successResponse(sampleSchema));
  registry.register("PaginatedResponseSchema", paginatedResponse(sampleSchema));
  registry.register("ErrorResponseSchema", errorResponse());
  registry.register("ValidationErrorResponseSchema", validationErrorResponse());

  app.doc("/openapi", {
    openapi: "3.0.0",
    info: {
      title: APP_CONFIG.NAME,
      version: APP_CONFIG.VERSION,
      description: APP_CONFIG.DESCRIPTION,
    },
  });

  app.get(
    "/docs",
    Scalar({
      theme: "bluePlanet",
      url: "/openapi",
      title: APP_CONFIG.NAME,
      pageTitle: APP_CONFIG.NAME,
      defaultHttpClient: {
        targetKey: "node",
        clientKey: "fetch",
      },
    })
  );
}
