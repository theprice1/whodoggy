import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm', // Use ESM preset
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },
  extensionsToTreatAsEsm: [''],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Fixes ESM path issues in imports
  },
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  verbose: true,

  // Run tests sequentially (important for DB state consistency)
  // Useful especially in CI environment
  maxWorkers: 1,

  // Automatically run setup before tests (adjust path as needed)
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup'],

  // Enforce minimum code coverage thresholds globally
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

export default config;
