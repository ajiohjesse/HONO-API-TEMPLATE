import type { DB } from "@/database";
import type { PinoLogger } from "hono-pino";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import type { z } from "zod";

export interface AppEnv {
  Bindings: Env;
  Variables: {
    logger: PinoLogger;
    db: DB;
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
