import { createApp } from "@/libs/create-app";
import { booksRouter } from "./books.router";

const routers = createApp();

routers.route("/books", booksRouter);

export { routers };
