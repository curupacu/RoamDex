import { buildGen } from './common.js'

// Paldea, National Dex 906-1025 (120 species, includes DLC).
buildGen('gen9', 906, 120).catch((err: unknown) => {
  console.error(err)
  process.exitCode = 1
})
