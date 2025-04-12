import { Scalar } from '@scalar/hono-api-reference';
import { openAPISpecs } from 'hono-openapi';
import { createRouter } from './libs/helpers';
import { cors } from 'hono/cors';
import 'zod-openapi/extend';
import { booksRouter } from './routes/books/books.route';
import { setupOpenapi } from './libs/openapi';
import { APP_CONFIG } from './libs/app.config';

const app = createRouter();
app.use(cors());

setupOpenapi(app);
app.route('/', booksRouter);

export default app;
