import { buildGen } from './common.js'

// Galar, National Dex 810-905 (96 species, includes Legends Arceus-origin
// species minted in the Gen 8 dex slot before Gen 9 launched).
//
// LEGACY_IDS: espécies de outras gerações usadas nas rotas/ginásios de
// Galar (docs/ROTAS-GALAR.md) que caem fora do dex nativo 810-905 — mesmo
// padrão já usado por gen2/gen3/gen4/gen5/gen6. Formas regionais
// (Galariana, Mar do Leste etc.) reaproveitam o mesmo id/stats/sprite da
// espécie-base, mesma simplificação de sempre.
const LEGACY_IDS = [
  6, 37, 38, 50, 51, 52, 59, 68, 77, 78, 94, 109, 110, 118, 122, 131, 143, 164, 185, 202, 213, 215, 225, 236, 237, 263,
  271, 279, 282, 303, 309, 324, 328, 330, 337, 361, 362, 422, 423, 425, 434, 435, 453, 454, 459, 464, 468, 510, 524,
  525, 526, 527, 529, 532, 533, 537, 538, 555, 556, 560, 562, 568, 583, 584, 593, 596, 612, 613, 616, 622, 624, 629,
  675, 678, 681, 682, 686, 687, 688, 689, 694, 700, 706, 708, 710, 714, 747, 756, 759, 765, 767, 771, 776, 777, 778,
]

buildGen('gen8', 810, 96, LEGACY_IDS).catch((err: unknown) => {
  console.error(err)
  process.exitCode = 1
})
