/* eslint-disable no-console */
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { type InferInsertModel, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schemas";

expand(
  config({
    path: ".dev.vars",
  })
);

const DB_URL = process.env.DB_URL;
if (!DB_URL) throw new Error("❌DB_URL is not set.");

const db = drizzle(DB_URL, { schema, casing: "snake_case" });

const books: InferInsertModel<typeof schema.bookTable>[] = [
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
await db.execute(sql`TRUNCATE TABLE ${schema.bookTable} RESTART IDENTITY `);
console.log("⚡Inserting records...");
await db.insert(schema.bookTable).values(books);
console.log("✅➡Seeding complete.");
process.exit(0);
