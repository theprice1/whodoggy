import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.test.js"],
    setupFiles: ["src/__tests__/setup.ts"],
    coverage: {
      reporter: ["text", "json", "html"],
    },
    // Use the test-specific TypeScript config
    typecheck: {
      tsconfig: './tsconfig.test.json'
    }
  },
});
