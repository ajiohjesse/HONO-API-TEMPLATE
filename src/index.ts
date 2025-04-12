import { cors } from "hono/cors";
import "zod-openapi/extend";

import { createRouter } from "./libs/helpers";
import { setupOpenapi } from "./libs/openapi";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { booksRouter } from "./routes/books/book.route";

const app = createRouter();
app.use(cors());
app.use(loggerMiddleware);

setupOpenapi(app);
app.route("/", booksRouter);

export default app;
