import { z } from "@hono/zod-openapi";

export const BookSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    title: z.string().openapi({ example: "Programming with Typescript" }),
    author: z.string().openapi({ example: "John Doe" }),
    createdAt: z.date().openapi({ example: "2025-06-09T12:00:00.000Z" }),
  })
  .openapi("Book");
