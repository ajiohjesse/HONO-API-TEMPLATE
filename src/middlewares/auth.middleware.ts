import type { ErrorResponse } from "@/libs/response";
import type { AppContext } from "@/libs/types";
import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

export const requireAuth = createMiddleware<{
  Bindings: AppContext["Bindings"];
  Variables: AppContext["Variables"] & { userId: string };
}>(async (c, next) => {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    const data: ErrorResponse = {
      error: {
        code: "UNAUTHENTICATED",
        message: "Missing authentication token",
      },
    };
    return c.json(data, 401);
  }

  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload.sub) {
      throw new Error("Invalid token");
    }
    c.set("userId", payload.sub as string);
    await next();
  } catch {
    const data: ErrorResponse = {
      error: {
        code: "UNAUTHENTICATED",
        message: "Authentication failed",
      },
    };
    return c.json(data, 401);
  }
});
