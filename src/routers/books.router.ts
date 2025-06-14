import { bookTable } from "@/database/schemas";
import { createApp } from "@/libs/create-app";
import { paginatedResponse, successResponse } from "@/libs/response";
import { requireAuth } from "@/middlewares/auth.middleware";
import { BookSchema } from "@/schemas/books.schema";
import { createRoute } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";

const app = createApp();

app.openapi(
  createRoute({
    method: "get",
    path: "/",
    tags: ["Books"],
    operationId: "bookList",
    responses: {
      200: {
        description: "Paginated list of all books",
        content: {
          "application/json": {
            schema: paginatedResponse(BookSchema),
          },
        },
      },
    },
  }),
  async c => {
    const db = c.var.db;
    const data = await db.query.bookTable.findMany({ limit: 10 });

    return c.json(
      {
        data,
        pagination: {
          currentPage: 1,
          pageSize: 10,
          totalItems: data.length,
        },
      },
      200
    );
  }
);

app.openapi(
  createRoute({
    method: "post",
    path: "/",
    tags: ["Books"],
    operationId: "bookCreate",
    request: {
      body: {
        content: {
          "application/json": {
            schema: BookSchema.omit({ id: true, createdAt: true }),
          },
        },
      },
    },
    responses: {
      200: {
        description: "The newly created book",
        content: {
          "application/json": {
            schema: successResponse(BookSchema),
          },
        },
      },
    },
    security: [
      {
        Bearer: [],
      },
    ],
    middleware: [requireAuth] as const,
  }),
  async c => {
    const body = c.req.valid("json");
    const userId = c.get("userId");
    c.var.logger.info({ userId });

    const db = c.var.db;
    const [created] = await db.insert(bookTable).values(body).returning();

    if (!created)
      throw new HTTPException(400, {
        message: "Failed to create book record",
      });

    return c.json({ data: created }, 200);
  }
);

export { app as booksRouter };
