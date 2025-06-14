import { env } from "cloudflare:workers";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { createApp } from "./libs/create-app";
import { setupOpenapi } from "./libs/openapi";
import { dbMiddleware } from "./middlewares/db.middleware";
import {
  errorHandler,
  healthCheckHandler,
  notFoundHandler,
} from "./middlewares/default.middleware";
import { requestLogger } from "./middlewares/logger.middleware";
import { routers } from "./routers/router";

const app = createApp();

app.use(secureHeaders());
app.use(
  cors({
    origin: env.ALLOWED_API_ORIGINS?.split(",") ?? [],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  })
);
app.use(requestLogger);

setupOpenapi(app);

app.use(dbMiddleware);
app.get("/health", healthCheckHandler);
app.get("/", healthCheckHandler);
app.route("/", routers);

app.notFound(notFoundHandler);
app.onError(errorHandler);

export default app;
