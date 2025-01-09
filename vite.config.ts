// my-calendar-app\vite.config.ts

/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { UserConfigExport } from 'vite';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  test: { // Это свойство добавляется Vitest.
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
} as UserConfigExport);


