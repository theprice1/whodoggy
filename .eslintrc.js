module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Modern JS syntax support
    sourceType: 'module', // ES Modules
    project: ['./tsconfig.json'], // For type-aware linting (optional)
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Ensures ESLint + Prettier compatibility
  ],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    // Add these for better TypeScript support and style consistency:
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // allow unused args starting with _
    '@typescript-eslint/explicit-function-return-type': 'off', // Optional strictness
    '@typescript-eslint/no-explicit-any': 'warn', // Encourage avoiding 'any'
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    '.expo/',
    'pnpm-lock.yaml',
  ],
};
