import { env } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import app from "..";

describe("app", () => {
  it("return 200 for index route", async () => {
    const res = await app.request("/", {}, env);
    expect(res.status).toBe(200);
  });

  it("return 200 for books route", async () => {
    const res = await app.request("/books", {}, env);
    expect(res.status).toBe(200);
  });
});
