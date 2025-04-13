/* eslint-disable no-console */
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { InferInsertModel } from "drizzle-orm";
import { createDatabase } from ".";
import { bookTable } from "./schemas";

expand(
  config({
    path: ".dev.vars",
  })
);

const DB_URL = process.env.DB_URL;
if (!DB_URL) throw new Error("❌DB_URL is not set.");
const db = createDatabase({
  url: DB_URL,
  isDev: true,
});

const books: InferInsertModel<typeof bookTable>[] = [
  {
    title: "Progamming with Javascript",
    author: "FreeCodeCamp",
  },
  {
    title: "Data Structures and Algorithms",
    author: "FreeCodeCamp",
  },
];

console.log("⚡Inserting records...");
// await db.execute(sql`TRUNCATE TABLE books `)
await db.insert(bookTable).values(books);
console.log("✅➡Seeding complete.");
