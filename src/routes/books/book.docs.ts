import {
  openApiJsonContent,
  openApiPaginatedJsonContent,
} from "@/libs/openapi";
import { describeRoute } from "hono-openapi";
import { bookSchema } from "./book.schema";

export const bookDocs = {
  getAllBooks: describeRoute({
    summary: "Get all books",
    operationId: "getAllBooks",
    description: "This returns a list of all books",
    tags: ["Books"],
    responses: {
      200: {
        description: "Success",
        content: openApiPaginatedJsonContent(bookSchema),
      },
    },
  }),

  createBook: describeRoute({
    summary: "Create book",
    operationId: "createBook",
    description: "This creates a new book record",
    tags: ["Books"],
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: "Success",
        content: openApiJsonContent(bookSchema),
      },
    },
  }),
};
