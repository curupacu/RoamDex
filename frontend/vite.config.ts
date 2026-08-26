/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Vite 8 (rolldown) defaults CSS minification to Lightning CSS, which
    // rewrites `@media (max-width: 860px)` into the modern range syntax
    // `@media (width <= 860px)` — valid CSS, but unsupported by some
    // mobile WebViews (found live: the game-area's mobile breakpoint
    // silently never matched on the project owner's phone, leaving the
    // 3-column desktop grid active and unreachable/squished on a real
    // device). `cssMinify: 'esbuild'` would keep the classic syntax, but
    // this rolldown-based Vite doesn't bundle esbuild anymore (build
    // fails: "Cannot find package 'esbuild'") — turning minification off
    // entirely is the simple, guaranteed-correct fix; the CSS file is
    // small enough that the size cost doesn't matter here.
    cssMinify: false,
  },
  server: {
    // tests/simulations/ (Sprint 25) lives one level up from this config's
    // root — Vite's dev-server fs sandbox blocks serving files outside
    // root by default, so it needs an explicit allow.
    fs: { allow: ['..'] },
  },
  test: {
    environment: 'jsdom',
    // Sprint 25 ("Balanceamento") lives in tests/simulations/ (repo root,
    // README's own stated location) instead of frontend/src — sibling
    // folder to this config's root, so it needs an explicit include
    // alongside the default src/**/*.test.ts pattern.
    include: ['src/**/*.{test,spec}.ts', '../tests/simulations/**/*.{test,spec}.ts'],
  },
})
