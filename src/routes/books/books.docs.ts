import { describeRoute } from 'hono-openapi';
import { resolver } from 'hono-openapi/zod';
import { bookSchema } from './books.schema';

export const bookDocs = {
  getAllBooks: describeRoute({
    summary: 'Get all books',
    operationId: 'getAllBooks',
    description: 'This returns a list of all books',
    tags: ['Books'],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: resolver(bookSchema),
          },
        },
      },
    },
  }),

  createBook: describeRoute({
    summary: 'Create book',
    operationId: 'createBook',
    description: 'This creates a new book record',
    tags: ['Books'],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: resolver(bookSchema),
          },
        },
      },
    },
  }),
};
