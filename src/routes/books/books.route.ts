import { validator } from "hono-openapi/zod";

import type { ApiPaginatedResponse, ApiResponse } from "@/libs/types";

import { createRouter } from "@/libs/helpers";

import type { BookDTO } from "./books.schema";

import { bookDocs } from "./books.docs";
import { bookSchema } from "./books.schema";
import booksService from "./books.service";

const router = createRouter();
export { router as booksRouter };

router.get("/books", bookDocs.getAllBooks, (c) => {
  const books = booksService.getAllBooks();
  return c.json<ApiPaginatedResponse<BookDTO>>(
    {
      success: true,
      statusCode: 200,
      message: "Successful",
      data: {
        items: books,
        currentPage: 1,
        totalPages: 5,
        totalItems: 20,
      },
    },
    200,
  );
});

router.post("/books", bookDocs.createBook, validator("json", bookSchema), (c) => {
  const book = c.req.valid("json");
  return c.json<ApiResponse<BookDTO>>(
    {
      success: true,
      message: "Success",
      statusCode: 200,
      data: book,
    },
    200,
  );
});
