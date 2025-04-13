import { createRouter, validateRequest } from "@/libs/helpers";
import type { ApiPaginatedResponse, ApiResponse } from "@/libs/types";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { bookDocs } from "./book.docs";
import type { BookDTO } from "./book.schema";
import { bookSchema } from "./book.schema";
import { BooksService } from "./book.service";

const router = createRouter();
export { router as booksRouter };

router.get("/books", bookDocs.getAllBooks, async c => {
  const booksService = new BooksService(c.var.db);
  const books = await booksService.getAllBooks();

  return c.json<ApiPaginatedResponse<BookDTO>>(
    {
      success: true,
      statusCode: 200,
      message: "Successful",
      data: {
        items: books,
        currentPage: 1,
        pageSize: 10,
        totalItems: books.length,
      },
    },
    200
  );
});

router.post(
  "/books",
  bookDocs.createBook,
  authMiddleware,
  validateRequest("json", bookSchema),
  c => {
    const { logger } = c.var;
    const userId = c.get("userId");
    logger.info("User ID from auth middleware:", userId);

    const book = c.req.valid("json");
    return c.json<ApiResponse<BookDTO>>(
      {
        success: true,
        message: "Success",
        statusCode: 200,
        data: book,
      },
      200
    );
  }
);
