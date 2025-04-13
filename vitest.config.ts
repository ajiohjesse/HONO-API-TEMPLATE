import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineWorkersConfig({
  plugins: [tsconfigPaths()],
  test: {
    poolOptions: {
      envPath: ".test.vars",
      workers: {
        wrangler: {
          configPath: "./wrangler.jsonc",
          environment: "test",
        },
      },
    },
  },
});
