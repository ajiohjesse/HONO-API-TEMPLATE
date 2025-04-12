import type { PinoLogger } from "hono-pino";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import type { z } from "zod";

export interface AppBindings {
  Bindings: {
    MODE?: "production" | "development";
  };
  Variables: {
    logger: PinoLogger;
  };
}

export interface ApiResponse<
  T extends z.RecordType<string, unknown> | null = null,
> {
  success: boolean;
  statusCode: ContentfulStatusCode;
  message: string;
  data: T;
}

export interface ApiPaginatedResponse<
  T extends z.RecordType<string, unknown> | null = null,
> {
  success: boolean;
  statusCode: ContentfulStatusCode;
  message: string;
  data: {
    items: T[];
    totalItems: number;
    currentPage: number;
    pageSize: number;
  };
}
