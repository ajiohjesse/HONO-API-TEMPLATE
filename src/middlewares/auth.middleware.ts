import { jwt } from 'hono/jwt';

export const JWT_SECRET = 'supersecretkey'; // Ideally from ENV in production

export const authMiddleware = jwt({
  secret: JWT_SECRET,
  cookie: 'token', // optional: check for JWT in cookie
});
