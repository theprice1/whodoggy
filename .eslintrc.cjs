module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,          // Support modern JS syntax
    sourceType: 'module',       // Enable ES modules
    project: ['./tsconfig.json'], // Enable type-aware linting
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Integrates Prettier with ESLint
  ],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Ignore unused vars starting with _
    '@typescript-eslint/explicit-function-return-type': 'off', // Optional, can enable for stricter typing
    '@typescript-eslint/no-explicit-any': 'warn', // Warn on use of any
    'prettier/prettier': 'error', // Show prettier formatting issues as errors
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    '.expo/',
    'pnpm-lock.yaml',
  ],
};
