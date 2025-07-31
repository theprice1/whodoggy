// eslint.config.js
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['dist', 'node_modules'],
    files: ['**/*.ts'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
];
