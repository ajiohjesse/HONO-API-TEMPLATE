/* eslint-disable no-console */
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { InferInsertModel, sql } from "drizzle-orm";
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

console.log("Truncating old records...");
await db.execute(sql`TRUNCATE TABLE ${bookTable} RESTART IDENTITY `);
console.log("⚡Inserting records...");
await db.insert(bookTable).values(books);
console.log("✅➡Seeding complete.");
process.exit(0);
