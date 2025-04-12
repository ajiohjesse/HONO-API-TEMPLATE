import type { ApiResponse, AppEnv } from "@/libs/types";
import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

export const authMiddleware = createMiddleware<{
  Bindings: AppEnv["Bindings"];
  Variables: AppEnv["Variables"] & { userId: string };
}>(async (c, next) => {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.replace(/^Bearer\s/, "");

  if (!token) {
    return c.json<ApiResponse>(
      {
        success: false,
        message: "Missing Authorization token",
        statusCode: 401,
        data: null,
      },
      401
    );
  }

  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload.sub) {
      throw new Error("Invalid token");
    }
    c.set("userId", payload.sub as string);
    await next();
  } catch {
    return c.json<ApiResponse>(
      {
        success: false,
        message: "Invalid or expired token",
        statusCode: 401,
        data: null,
      },
      401
    );
  }
});
