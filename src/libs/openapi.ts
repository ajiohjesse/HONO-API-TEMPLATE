import { Scalar } from "@scalar/hono-api-reference";
import type { Hono } from "hono";
import { openAPISpecs } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { z } from "zod";
import { APP_CONFIG } from "./app.config";
import type { AppEnv } from "./types";

export function setupOpenapi(app: Hono<AppEnv>) {
  app.get(
    "/openapi",
    openAPISpecs(app, {
      documentation: {
        info: {
          title: APP_CONFIG.NAME,
          version: APP_CONFIG.VERSION,
          description: APP_CONFIG.DESCRIPTION,
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
      },
    })
  );

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

const baseResponseSchema = z.object({
  success: z.boolean().openapi({ example: true }),
  statusCode: z.number().openapi({ example: 200 }),
  message: z.string().openapi({ example: "Success" }),
});

export function openApiJsonContent(schema: z.Schema) {
  return {
    "application/json": {
      schema: resolver(
        z.object({
          ...baseResponseSchema.shape,
          data: schema,
        })
      ),
    },
  };
}

export function openApiPaginatedJsonContent(schema: z.Schema) {
  return {
    "application/json": {
      schema: resolver(
        z.object({
          ...baseResponseSchema.shape,
          data: z.object({
            items: schema.array(),
            currentPage: z.number().openapi({ example: 1 }),
            totalItems: z.number().openapi({ example: 100 }),
            pageSize: z.number().openapi({ example: 10 }),
          }),
        })
      ),
    },
  };
}
