/// <reference types="vitest" />
import { resolve } from 'node:path'
import { defineConfig } from 'vite';
import dts from 'unplugin-dts/vite';
import camelCase from 'camelcase';
import packageJson from './package.json' with { type: 'json' };
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const packageName = packageJson.name.split('/').pop() || packageJson.name

export default defineConfig({
  base: "./",
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs', 'umd', 'iife'],
      name: camelCase(packageName, { pascalCase: true }),
      fileName: packageName,
    },
  },
  plugins: [
    dts({ rollupTypes: true }),
  ],
  test: {},
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@@": resolve(__dirname),
    },
  }
})
