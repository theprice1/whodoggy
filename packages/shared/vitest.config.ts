import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts', 'src/**/*.spec.ts'], // Where your test files live
    exclude: ['node_modules', 'dist'],                 // Ignore these
    globals: true,                                    // Optional, for global test APIs
    environment: 'node',                              // Node environment
    coverage: {
      reporter: ['text', 'lcov'],                    // Optional coverage reporting
    },
  },
})
