import { buildGen } from './common.js'

// Galar, National Dex 810-905 (96 species, includes Legends Arceus-origin
// species minted in the Gen 8 dex slot before Gen 9 launched).
buildGen('gen8', 810, 96).catch((err: unknown) => {
  console.error(err)
  process.exitCode = 1
})
