/* eslint-disable no-console */
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { defineConfig } from "drizzle-kit";

expand(
  config({
    path: ".dev.vars",
  })
);

const { MODE, DB_URL } = process.env;

if (!DB_URL) throw new Error("DB_URL is not set");

console.log({
  environment: MODE,
  databaseUrl: DB_URL,
});

export default defineConfig({
  schema: "./src/database/schemas.ts",
  out: "./src/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: DB_URL,
  },
  casing: "snake_case",
  verbose: true,
  strict: true,
});
