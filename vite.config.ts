import { defineConfig } from 'vite';
import tsconfigpaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigpaths()],
  test: {
    environmentMatchGlobs: [
      [
        'src/http/controllers/**',
        './prisma/vitest-environment-prisma/prisma-test-environment.ts',
      ],
    ],
  },
});
