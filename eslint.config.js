import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/build/**",
      "**/android/**",
      "**/ios/**",
      "**/coverage/**",
    ],
  },
  {
    files: ["packages/**/src/**/*.{ts,tsx,js,jsx}", "apps/**/src/**/*.{ts,tsx,js,jsx}"],
  },
  ...compat.config({
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:jsx-a11y/recommended"
    ],
    parserOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      ecmaFeatures: { jsx: true }
    },
    env: { browser: true, node: true },
    globals: { NodeJS: "readonly", React: "readonly", JSX: "readonly" },
    rules: {
      "no-console": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "react/react-in-jsx-scope": "off"
    },
    settings: { react: { version: "detect" } }
  })
];
