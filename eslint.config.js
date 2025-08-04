import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactNativePlugin from 'eslint-plugin-react-native';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        JSX: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-native': reactNativePlugin,
    },
    rules: {
      'react-native/no-inline-styles': 'warn',
      'react-native/no-unused-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      // Add more custom WhoDoggy-specific rules here if needed
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    env: {
      es2021: true,
      node: true,
      'react-native/react-native': true,
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // JS-specific rules if any
    },
  },
];
