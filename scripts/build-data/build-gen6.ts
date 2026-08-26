import { buildGen } from './common.js'

// Kalos's own species (650-721) aren't the whole story: docs/ROTAS-KALOS.md's
// wild tables and gym/Elite Four/champion teams reuse a LOT of older-gen
// species (Kalos is famous for this — most routes mix in Pokémon from every
// prior region), and the game fetches exactly one dataUrl per region
// (App.tsx) — no merge with gen1-5.json at runtime. Same rule as
// build-gen2/3/4.ts: every species named directly in a wild table or
// trainer team in ROTAS-KALOS.md, plus the level-up (never trade/stone)
// evolution successors of whichever of those are wild-catchable.
const LEGACY_IDS = [
  10, 11, 13, 14, 16, 17, 25, 30, 33, 43, 51, 54, 63, 67, 70, 75, 79, 82, 83,
  84, 93, 102, 108, 121, 122, 123, 124, 127, 128, 130, 133, 161, 165, 183,
  184, 189, 195, 199, 202, 206, 209, 212, 214, 215, 217, 221, 225, 228, 235,
  241, 247, 262, 263, 280, 281, 282, 283, 290, 297, 298, 300, 302, 303, 305,
  306, 311, 313, 314, 315, 316, 324, 325, 327, 328, 334, 335, 352, 359, 371,
  372, 373, 397, 399, 400, 406, 412, 415, 417, 419, 425, 433, 434, 441, 443,
  447, 449, 451, 452, 453, 455, 459, 460, 473, 476, 505, 510, 511, 513, 515,
  524, 534, 539, 551, 561, 577, 578, 579, 580, 587, 588, 590, 609, 614, 615,
  616, 619, 621, 622, 624, 631, 632, 634,
]

buildGen('gen6', 650, 72, LEGACY_IDS).catch((err: unknown) => {
  console.error(err)
  process.exitCode = 1
})
