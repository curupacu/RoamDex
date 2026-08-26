import { buildGen } from './common.js'

// Hoenn's own species (252-386) aren't the whole story: docs/ROTAS-HOENN.md's
// wild tables and gym/Elite Four/champion teams reuse a lot of Gen 1/2
// species (Geodude, Tentacool, Oddish, Xatu, Kingdra...), and the game
// fetches exactly one dataUrl per region (App.tsx) — no merge with
// gen1.json/gen2.json at runtime. Every legacy id a Hoenn save can ever
// reference has to ship inside gen3.json too. Same rule as build-gen2.ts:
// every species named directly in a wild table or trainer team in
// ROTAS-HOENN.md, plus the level-up (never trade/stone) evolution
// successors of whichever of those are wild-catchable.
const LEGACY_IDS = [
  27, 28, 37, 39, 41, 42, 43, 44, 63, 64, 66, 67, 72, 73, 74, 75, 82, 88, 89,
  100, 101, 109, 110, 118, 119, 130, 178, 183, 184, 218, 219, 227, 230,
]

buildGen('gen3', 252, 135, LEGACY_IDS).catch((err: unknown) => {
  console.error(err)
  process.exitCode = 1
})
