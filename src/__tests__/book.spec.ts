import app from "@/index";
import { env } from "cloudflare:test";
import { describe, expect, it } from "vitest";

describe("Books route", () => {
  it("GET /books - should return 200", async () => {
    const res = await app.request("/books", {}, env);
    expect(res.status).toBe(200);
  });

  it("POST /books - should return 401", async () => {
    const res = await app.request("/books", { method: "post" }, env);
    expect(res.status).toBe(401);
  });
});
