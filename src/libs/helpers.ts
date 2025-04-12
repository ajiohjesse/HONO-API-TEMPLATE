import { Handler, Hono } from 'hono';
import { AppBindings } from './types';

export function createRouter() {
  return new Hono<AppBindings>();
}
