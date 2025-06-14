import pluginJs from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "no-console": "warn",
    },
  },
  {
    ignores: [
      "node_modules",
      "dist",
      "logs",
      "build",
      "coverage",
      ".git",
      "*.min.js",
      "*.config.js",
      "public",
      "temp",
      ".cache",
      ".env*",
      "*.lock",
      ".wrangler",
      "worker-configuration.d.ts",
    ],
  },
];
