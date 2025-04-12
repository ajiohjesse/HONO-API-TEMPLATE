import { cors } from "hono/cors";
import "zod-openapi/extend";

import { createRouter } from "./libs/helpers";
import { setupOpenapi } from "./libs/openapi";
import { booksRouter } from "./routes/books/books.route";

const app = createRouter();
app.use(cors());

setupOpenapi(app);
app.route("/", booksRouter);

export default app;
