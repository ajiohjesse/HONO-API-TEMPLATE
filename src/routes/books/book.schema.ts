import { z } from "zod";

export const bookSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    title: z.string().openapi({ example: "Programming with Typescript" }),
    author: z.string().openapi({ example: "John Doe" }),
    createdAt: z.date(),
  })
  .openapi({ ref: "Book" });
export type BookDTO = z.infer<typeof bookSchema>;
