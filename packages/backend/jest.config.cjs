/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest/presets/default-esm', // Use ESM preset for ts-jest
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  globals: {
    'ts-jest': {
      useESM: true, // Enable ESM support for ts-jest
      tsconfig: 'tsconfig.json',
    },
  },
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Allow import paths to omit .js extension for ts-jest
  },
  transformIgnorePatterns: ['/node_modules/'],
};
