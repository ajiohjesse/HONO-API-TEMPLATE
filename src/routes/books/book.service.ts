import { DB } from "@/database";
import { type PinoLogger } from "hono-pino";
import type { BookDTO } from "./book.schema";

export class BooksService {
  constructor(
    private readonly db: DB,
    private readonly logger: PinoLogger
  ) {
    this.db = db;
    this.logger = logger;
  }

  async getAllBooks(): Promise<BookDTO[]> {
    const books = await this.db.query.bookTable.findMany();
    this.logger.info({ books });
    return books;
  }
}
