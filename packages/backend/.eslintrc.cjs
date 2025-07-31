module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',  // Local tsconfig for backend package
    sourceType: 'module',
  },
  plugins: ['prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': 'error',
    // Add your custom rules here
  },
  ignorePatterns: ['dist', 'node_modules'],
};
