import { cors } from "hono/cors";
import "zod-openapi/extend";
import { createRouter } from "./libs/helpers";
import { setupOpenapi } from "./libs/openapi";
import { dbMiddleware } from "./middlewares/db.middleware";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/default.middleware";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { booksRouter } from "./routes/books/book.route";

const app = createRouter();

app.use(cors());
app.use(loggerMiddleware);

setupOpenapi(app);

app.use(dbMiddleware);
app.route("/", booksRouter);

app.notFound(notFoundHandler);
app.onError(errorHandler);

export default app;
