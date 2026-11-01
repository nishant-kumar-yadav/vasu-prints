import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        test: {
          name: 'components',
          include: [
            'src/components/**/*.test.{ts,tsx}',
            'src/app/**/*.test.{ts,tsx}',
            'tests/unit/**/*.test.{ts,tsx}',
          ],
          environment: 'jsdom',
          setupFiles: ['./tests/setup.ts'],
          alias: {
            '@': path.resolve(import.meta.dirname, './src'),
          },
        },
      },
      {
        test: {
          name: 'node',
          include: ['src/lib/**/*.test.ts', 'src/schemas/**/*.test.ts'],
          environment: 'node',
          alias: {
            '@': path.resolve(import.meta.dirname, './src'),
          },
        },
      },
    ],
  },
});
