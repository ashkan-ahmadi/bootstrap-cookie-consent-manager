import { defineConfig } from 'tsup'

export default defineConfig({
  entry: { index: 'src/index.ts' },
  format: ['esm', 'cjs', 'iife'],
  globalName: 'BootstrapCookieConsentManager',
  outDir: 'dist',
  dts: true,
  sourcemap: true,
  minify: true,
  clean: true,
  target: 'es2020',
  platform: 'browser',
})
