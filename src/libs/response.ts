import { z } from "@hono/zod-openapi";

export const successResponse = <T extends z.ZodType>(dataSchema: T) => {
  return z.object({
    data: dataSchema,
  });
};

export type SuccessResponse<T extends z.ZodType> = z.infer<
  ReturnType<typeof successResponse<T>>
>;

export const paginatedResponse = <T extends z.ZodType>(dataSchema: T) => {
  return z.object({
    data: z.array(dataSchema),
    pagination: z.object({
      currentPage: z.number().openapi({ example: 1 }),
      totalItems: z.number().openapi({ example: 100 }),
      pageSize: z.number().openapi({ example: 10 }),
    }),
  });
};

export type PaginatedResponse<T extends z.ZodType> = z.infer<
  ReturnType<typeof paginatedResponse<T>>
>;

export const errorResponse = () => {
  return z.object({
    error: z.object({
      code: z.string().openapi({ example: "INTERNAL_SERVER_ERROR" }),
      message: z.string().openapi({ example: "An unexpected error occurred." }),
    }),
  });
};

export type ErrorResponse = z.infer<ReturnType<typeof errorResponse>>;

export const validationErrorResponse = () => {
  return z.object({
    error: z.object({
      code: z
        .literal("VALIDATION_ERROR")
        .openapi({ example: "VALIDATION_ERROR" }),
      message: z.string().openapi({ example: "Invalid request body" }),
      fieldErrors: z
        .record(z.string(), z.string().array().optional())
        .openapi({ example: { name: ["Required"] } }),
    }),
  });
};

export type ValidationErrorResponse = z.infer<
  ReturnType<typeof validationErrorResponse>
>;
