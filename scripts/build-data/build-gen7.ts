import { buildGen } from './common.js'

// Alola, National Dex 722-809 (88 species).
//
// LEGACY_IDS: espécies de outras gerações usadas nas rotas/provações de
// Alola (docs/ROTAS-ALOLA.md) fora do dex nativo 722-809 — mesmo padrão
// já usado por gen2/gen3/gen4/gen5/gen6/gen8. Formas Alolanas reaproveitam
// o mesmo id/stats/sprite da espécie-base, mesma simplificação de sempre.
const LEGACY_IDS = [
  10, 19, 20, 21, 22, 27, 37, 38, 41, 42, 46, 50, 51, 52, 53, 55, 56, 57, 58, 60, 62, 63, 66, 67, 72, 74, 75, 76, 79,
  81, 88, 92, 93, 94, 96, 102, 103, 104, 123, 127, 128, 129, 132, 133, 143, 165, 166, 167, 168, 169, 173, 174, 198,
  210, 212, 215, 222, 227, 239, 240, 241, 278, 279, 283, 296, 297, 299, 302, 319, 320, 324, 328, 330, 351, 359, 361,
  369, 370, 374, 423, 426, 438, 447, 456, 462, 476, 478, 506, 524, 525, 546, 548, 551, 552, 568, 594, 627, 628, 629,
  630, 661, 674, 703, 707, 708,
]

buildGen('gen7', 722, 88, LEGACY_IDS).catch((err: unknown) => {
  console.error(err)
  process.exitCode = 1
})
