// eslint.config.js
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';

export default [
  // --- Базовые правила ESLint ---
  js.configs.recommended,

  // --- Настройки для React ---
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        browser: true,
        node: true,
      },
    },
    env: {
      browser: true, // document, window, navigator и т.д.
      node: true, // глобальные Node.js объекты
      es2021: true, // современные возможности JS
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
    },
    rules: {
      // React
      'react/react-in-jsx-scope': 'off', // Не нужен импорт React в новых версиях
      'react/prop-types': 'off', // Не используем PropTypes (если не нужно)
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'warn',

      // Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Общие правила JS
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      eqeqeq: ['error', 'always'], // Строгое сравнение ===
      'no-var': 'error', // Предпочитаем let/const
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // --- Интеграция с Prettier ---
  prettier,
];
