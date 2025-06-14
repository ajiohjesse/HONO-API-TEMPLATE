import { env } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import app from "../index";

describe("app", () => {
  it("return 200 for index route", async () => {
    const res = await app.request("/", {}, env);
    expect(res.status).toBe(200);
  });
});
