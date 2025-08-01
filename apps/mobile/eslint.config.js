import path from 'path';
import { fileURLToPath } from 'url';
import parser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactNativePlugin from 'eslint-plugin-react-native';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    ignores: ['dist', 'node_modules', 'eslint.config.js', 'app.d.ts'], // <-- added 'app.d.ts'
    files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
    languageOptions: {
      parser,
      parserOptions: {
        project: path.resolve(__dirname, './tsconfig.eslint.json'),
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslintPlugin,
      prettier: prettierPlugin,
      react: reactPlugin,
      'react-native': reactNativePlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-unused-styles': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
