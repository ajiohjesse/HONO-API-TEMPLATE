import { describe, expect, it } from "vitest";

import type { AppEnv } from "@/libs/types";

import app from "..";

const env: AppEnv["Bindings"] = {
  MODE: "test",
  JWT_SECRET: "test-secret",
};

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
