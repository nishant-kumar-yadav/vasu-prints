import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    testTimeout: 30000,
    pool: 'threads',
    projects: [
      {
        test: {
          name: 'components',
          include: [
            'src/components/**/*.test.{ts,tsx}',
            'src/app/**/*.test.{ts,tsx}',
            'tests/unit/**/*.test.{ts,tsx}',
          ],
          exclude: ['tests/unit/lib/**/*.test.ts'],
          environment: 'jsdom',
          setupFiles: ['./tests/setup.ts'],
          alias: {
            '@': path.resolve(import.meta.dirname, './src'),
            'server-only': path.resolve(import.meta.dirname, './tests/empty.ts'),
          },
        },
      },
      {
        test: {
          name: 'node',
          include: [
            'src/lib/**/*.test.ts',
            'src/schemas/**/*.test.ts',
            'tests/unit/lib/**/*.test.ts',
          ],
          environment: 'node',
          alias: {
            '@': path.resolve(import.meta.dirname, './src'),
            'server-only': path.resolve(import.meta.dirname, './tests/empty.ts'),
          },
        },
      },
    ],
  },
});
