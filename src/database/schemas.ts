import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const bookTable = pgTable("book", {
  id: serial().primaryKey(),
  title: text().notNull(),
  author: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});
