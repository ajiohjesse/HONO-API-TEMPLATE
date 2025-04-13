# 🔥 Hono Starter Template for Cloudflare Workers

A minimal yet powerful Hono starter template built for [Cloudflare Workers](https://developers.cloudflare.com/workers/) with:

- ✅ Type-safe environment variable management
- 🧪 Testing via [Vitest](https://vitest.dev/)
- 🧼 Linting and formatting via [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)
- 📖 Auto-generated API documentation using [hono-openapi](https://github.com/honojs/hono-openapi)
- 🐘 PostgreSQL: Local in development, [Neon Serverless](https://neon.tech/) in production
- ⚡ Powered by [Bun](https://bun.sh/)

---

## 📦 Features

- **⚡ Fast Dev with Bun:** Built using Bun for fast installs and execution.
- **📘 OpenAPI Docs:** Routes are automatically documented using `hono-openapi`.
- **🧪 First-Class Testing:** Configured for `vitest` with Cloudflare's `vitest-pool-workers`.
- **🛠️ Clean Codebase:** Prettier and ESLint for consistent formatting and linting.
- **🔒 Environment Safety:** All env vars are strongly typed and managed via `.dev.vars`.

---

## 🚀 Getting Started

### 1. Clone the Template and install dependencies

```bash
git clone https://github.com/ajiohjesse/HONO-API-TEMPLATE.git hono-api
cd hono-api
bun install
```

### 2. Set Up Your Environment

Rename the example env file:

```bash
mv .dev.vars.example .dev.vars
```

Update `wrangler.jsonc` with your preferred settings (e.g. account ID, project name).

If your test environment requires different variables, create:

```bash
.dev.vars.test
```

> ☝️ **Note:** All environment variables must be added to the `AppEnv` type in [`./src/libs/types.ts`](./src/libs/types.ts) for type safety and validation.

---

## Seeding Database

App a postgres database url in the .dev.vars file and the the following command:

```bash
bun run db:push
bun run db:seed
```

This should push the databse schemas defined in `./src/database/schemas.ts` and also seed the
the database with sample data.

---

## 🧪 Running Tests

```bash
bun run test
```

This uses `vitest` with isolated worker environments. If a `.dev.vars.test` file exists, it will be picked up automatically when running tests (based on `wrangler.jsonc` config and environment).

---

## 🧑‍💻 Dev vs Production

The `MODE` environment variable determines the runtime mode:

- `MODE=development` → uses **local PostgreSQL**
- Anything else → uses **Neon (serverless PostgreSQL)** via `neon-http`

---

## ✅ Linting & Formatting

```bash
bun run lint:fix
bun run format
```

Runs ESLint and Prettier respectively.

---

## 📚 API Documentation

Start your dev server and view OpenAPI docs at localhost:8787/docs:

```
bun run dev
```

---

## 📌 Conventions

- All new env variables **must** be declared in `AppEnv` (inside `src/libs/types.ts`)
- Avoid hardcoding secrets in source files
- Use `.dev.vars` for local development only

---

## 💡 Inspiration

Inspired by the simplicity of [Hono](https://hono.dev/), Cloudflare’s edge-first philosophy, and the modern DX of Bun.

---

## 📜 License

MIT
