import { z } from "zod";

export const bookSchema = z
  .object({
    id: z.string().openapi({ example: "1234" }),
    title: z.string().openapi({ example: "Programming with Typescript" }),
    author: z.string().openapi({ example: "John Doe" }),
  })
  .openapi({ ref: "Book" });
export type BookDTO = z.infer<typeof bookSchema>;
