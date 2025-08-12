import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test'],
    setupFiles: ['src/__tests__/setup'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      // remove unsupported thresholds like functions, branches, statements
    }
  }
});
