import eslintPluginPrettier from 'eslint-plugin-prettier';
import parser from '@typescript-eslint/parser';  // import parser module

export default [
  {
    ignores: ['dist', 'node_modules', 'eslint.config.js'],
    files: ['**/*.ts'],
    languageOptions: {
      parser,  // use the imported parser object here
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
