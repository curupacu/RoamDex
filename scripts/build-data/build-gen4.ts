import { buildGen } from './common.js'

// Sinnoh's own species (387-493) aren't the whole story: docs/ROTAS-SINNOH.md's
// wild tables and gym/Elite Four/champion teams reuse a lot of Gen 1/2/3
// species (Geodude, Magneton, Ralts, Duskull, Milotic...), and the game
// fetches exactly one dataUrl per region (App.tsx) — no merge with
// gen1/2/3.json at runtime. Same rule as build-gen2.ts/build-gen3.ts: every
// species named directly in a wild table or trainer team in
// ROTAS-SINNOH.md, plus the level-up (never trade/stone) evolution
// successors of whichever of those are wild-catchable.
const LEGACY_IDS = [
  26, 35, 41, 42, 54, 55, 63, 64, 65, 66, 67, 72, 73, 74, 75, 76, 77, 78, 81,
  82, 92, 93, 95, 108, 111, 112, 113, 122, 123, 130, 135, 136, 163, 164, 183,
  184, 185, 194, 195, 196, 198, 200, 203, 207, 208, 212, 214, 215, 220, 221,
  228, 229, 265, 266, 267, 268, 269, 278, 279, 280, 281, 282, 307, 308, 315,
  340, 350, 355, 356, 358, 361, 362,
]

buildGen('gen4', 387, 107, LEGACY_IDS).catch((err: unknown) => {
  console.error(err)
  process.exitCode = 1
})
