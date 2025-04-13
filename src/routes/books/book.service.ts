import { DB } from "@/database";
import type { BookDTO } from "./book.schema";

export class BooksService {
  constructor(private readonly db: DB) {
    this.db = db;
  }

  async getAllBooks(): Promise<BookDTO[]> {
    return this.db.query.bookTable.findMany();
  }
}
