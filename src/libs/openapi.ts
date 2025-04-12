import { Scalar } from '@scalar/hono-api-reference';
import { Hono } from 'hono';
import { openAPISpecs } from 'hono-openapi';
import { AppBindings } from './types';
import { APP_CONFIG } from './app.config';

export function setupOpenapi(app: Hono<AppBindings>) {
  app.get(
    '/openapi',
    openAPISpecs(app, {
      documentation: {
        info: {
          title: APP_CONFIG.NAME,
          version: APP_CONFIG.VERSION,
          description: APP_CONFIG.DESCRIPTION,
        },
      },
    })
  );

  app.get(
    '/docs',
    Scalar({
      theme: 'elysiajs',
      url: '/openapi',
      title: APP_CONFIG.NAME,
      favicon: '⚡',
      defaultHttpClient: {
        targetKey: 'node',
        clientKey: 'fetch',
      },
    })
  );
}
