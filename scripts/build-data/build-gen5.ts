import { buildGen } from './common.js'

// Unova, National Dex 494-649 (156 species).
buildGen('gen5', 494, 156).catch((err: unknown) => {
  console.error(err)
  process.exitCode = 1
})
