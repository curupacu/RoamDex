import { buildGen } from './common.js'

// Paldea, National Dex 906-1025 (120 species, includes DLC).
//
// LEGACY_IDS: espécies de outras gerações usadas nas rotas/ginásios de
// Paldea (docs/ROTAS-PALDEA.md) fora do dex nativo 906-1025 — mesmo
// padrão já usado por gen2/gen3/gen4/gen5/gen6/gen7/gen8.
const LEGACY_IDS = [
  48, 50, 51, 52, 53, 56, 57, 79, 81, 92, 100, 123, 128, 130, 132, 147, 179, 183, 185, 187, 188, 189, 198, 203, 204,
  215, 216, 228, 229, 231, 232, 278, 282, 308, 322, 323, 331, 333, 334, 340, 354, 357, 371, 396, 398, 402, 403, 404,
  415, 418, 419, 429, 437, 444, 445, 448, 449, 461, 462, 478, 548, 550, 570, 590, 610, 612, 613, 614, 625, 627, 661,
  662, 671, 673, 691, 701, 713, 715, 734, 740, 741, 744, 745, 747, 749, 751, 757, 769, 775, 778, 821, 822, 823, 834,
  837, 841, 847, 848, 849, 859, 872, 873, 874, 879,
]

buildGen('gen9', 906, 120, LEGACY_IDS).catch((err: unknown) => {
  console.error(err)
  process.exitCode = 1
})
