import { buildGen } from './common.js'

// Alola, National Dex 722-809 (88 species).
buildGen('gen7', 722, 88).catch((err: unknown) => {
  console.error(err)
  process.exitCode = 1
})
