/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
