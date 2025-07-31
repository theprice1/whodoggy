/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest/presets/default-esm', // Use ESM preset for ts-jest
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: './src',
  globals: {
    'ts-jest': {
      useESM: true,         // Enable ESM support for ts-jest
      tsconfig: 'tsconfig.json', // Point to your tsconfig
    },
  },
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },
};
