import { ContentfulStatusCode } from 'hono/utils/http-status';
import { z } from 'zod';

export interface AppBindings {
  Variables: {};
}

export interface ApiResponse<
  T extends z.RecordType<string, unknown> | null = null
> {
  success: boolean;
  statusCode: ContentfulStatusCode;
  message: string;
  data: T;
}

export interface ApiPaginatedResponse<
  T extends z.RecordType<string, unknown> | null = null
> {
  success: boolean;
  statusCode: ContentfulStatusCode;
  message: string;
  data: {
    items: T[];
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };
}
