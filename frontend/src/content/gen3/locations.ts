import type { LocationDefinition } from '../gen1/locations'

// Hoenn, Littleroot Town → Victory Road (the 8-gym stretch, same shape as
// content/gen1/locations.ts's KANTO_LOCATIONS and content/gen2/locations.ts's
// JOHTO_LOCATIONS). docs/ROTAS-HOENN.md has the full research this is
// sourced from (Bulbapedia, Pokémon Emerald — chosen over Ruby/Sapphire
// because Emerald is the one where Juan/Wallace fill gym 8/Champion, see the
// doc's Metodologia section).
//
// Same simplifications as Kanto/Johto (see the doc's own Metodologia for the
// full reasoning): fishing and Rock Smash encounters dropped entirely; Surf
// folded into the same table as the "walking" encounters, unrenormalized;
// multi-floor/multi-room dungeons (Granite Cave, Meteor Falls, Victory Road)
// collapsed the same way — per-species weight summed across
// floors/rooms/tide-states, level range spans all of them.
//
// unlockAt is provisional, same as every other region — Sprint 25-style
// simulation (tests/simulations/) tunes it against real play data later, not
// invented here beyond "monotonically increasing, similar final scale to
// Johto's 650,000 (docs/ROTAS-HOENN.md ended up with more real locations
// researched than Johto, hence the slightly higher final number)".
//
// Trecho 5 (Norman) has no new geography of its own — same beat as Johto's
// Trecho 6 (Jasmine): the player backtracks to Petalburg City, whose gym was
// closed on the first pass. Second entry ('petalburg-city-gym') reuses the
// same (empty) encounter table, not a new place — see docs/ROTAS-HOENN.md's
// Trecho 5.
export const HOENN_LOCATIONS: LocationDefinition[] = [
  { id: 'littleroot-town', name: 'Littleroot Town', unlockAt: 0, background: 'flowers.jpg', encounters: [] },

  // --- Trecho 1: Littleroot → Rustboro (Roxanne) ---
  {
    id: 'route-101',
    background: 'tall-grass.png',
    name: 'Rota 101',
    unlockAt: 0,
    encounters: [
      { speciesId: 261, weight: 45, minLevel: 2, maxLevel: 3 }, // Poochyena
      { speciesId: 265, weight: 45, minLevel: 2, maxLevel: 3 }, // Wurmple
      { speciesId: 263, weight: 10, minLevel: 2, maxLevel: 3 }, // Zigzagoon
    ],
  },
  {
    id: 'route-102',
    background: 'tall-grass.png',
    name: 'Rota 102',
    unlockAt: 300,
    encounters: [
      { speciesId: 261, weight: 30, minLevel: 3, maxLevel: 4 }, // Poochyena
      { speciesId: 265, weight: 30, minLevel: 3, maxLevel: 4 }, // Wurmple
      { speciesId: 270, weight: 20, minLevel: 3, maxLevel: 4 }, // Lotad
      { speciesId: 263, weight: 15, minLevel: 3, maxLevel: 4 }, // Zigzagoon
      { speciesId: 280, weight: 4, minLevel: 4, maxLevel: 4 }, // Ralts
      { speciesId: 273, weight: 1, minLevel: 3, maxLevel: 3 }, // Seedot
      { speciesId: 283, weight: 1, minLevel: 3, maxLevel: 3 }, // Surskit
      { speciesId: 183, weight: 99, minLevel: 5, maxLevel: 35 }, // Marill (Surf)
      { speciesId: 118, weight: 1, minLevel: 20, maxLevel: 30 }, // Goldeen (Surf)
      { speciesId: 283, weight: 1, minLevel: 20, maxLevel: 30 }, // Surskit (Surf)
    ],
  },
  {
    id: 'route-103',
    background: 'beach.png',
    name: 'Rota 103',
    unlockAt: 700,
    encounters: [
      { speciesId: 261, weight: 60, minLevel: 2, maxLevel: 4 }, // Poochyena
      { speciesId: 263, weight: 20, minLevel: 3, maxLevel: 4 }, // Zigzagoon
      { speciesId: 278, weight: 20, minLevel: 2, maxLevel: 4 }, // Wingull
      { speciesId: 72, weight: 60, minLevel: 5, maxLevel: 35 }, // Tentacool (Surf)
      { speciesId: 278, weight: 35, minLevel: 10, maxLevel: 30 }, // Wingull (Surf)
      { speciesId: 279, weight: 5, minLevel: 25, maxLevel: 30 }, // Pelipper (Surf)
    ],
  },
  { id: 'petalburg-city', name: 'Petalburg City', unlockAt: 1_500, background: 'path.png', encounters: [] }, // passagem, ginásio fechado
  {
    id: 'route-104',
    background: 'tall-grass.png',
    name: 'Rota 104',
    unlockAt: 2_800,
    encounters: [
      { speciesId: 263, weight: 50, minLevel: 4, maxLevel: 5 }, // Zigzagoon
      { speciesId: 261, weight: 40, minLevel: 4, maxLevel: 5 }, // Poochyena
      { speciesId: 183, weight: 20, minLevel: 4, maxLevel: 5 }, // Marill
      { speciesId: 265, weight: 20, minLevel: 4, maxLevel: 4 }, // Wurmple
      { speciesId: 276, weight: 10, minLevel: 4, maxLevel: 5 }, // Taillow
      { speciesId: 278, weight: 10, minLevel: 3, maxLevel: 5 }, // Wingull
      { speciesId: 278, weight: 95, minLevel: 10, maxLevel: 30 }, // Wingull (Surf)
      { speciesId: 279, weight: 5, minLevel: 25, maxLevel: 30 }, // Pelipper (Surf)
    ],
  },
  {
    id: 'petalburg-woods',
    background: 'forest.jpg',
    name: 'Floresta de Petalburg',
    unlockAt: 4_500,
    encounters: [
      { speciesId: 261, weight: 30, minLevel: 5, maxLevel: 6 }, // Poochyena
      { speciesId: 263, weight: 30, minLevel: 5, maxLevel: 6 }, // Zigzagoon
      { speciesId: 265, weight: 25, minLevel: 5, maxLevel: 6 }, // Wurmple
      { speciesId: 266, weight: 10, minLevel: 5, maxLevel: 5 }, // Silcoon
      { speciesId: 268, weight: 10, minLevel: 5, maxLevel: 5 }, // Cascoon
      { speciesId: 285, weight: 15, minLevel: 5, maxLevel: 6 }, // Shroomish
      { speciesId: 276, weight: 5, minLevel: 5, maxLevel: 6 }, // Taillow
      { speciesId: 287, weight: 5, minLevel: 5, maxLevel: 6 }, // Slakoth
    ],
  },
  { id: 'rustboro-city', name: 'Rustboro City', unlockAt: 7_000, background: 'path-2.png', encounters: [] }, // gym: Roxanne

  // --- Trecho 2: Rustboro → Dewford (Brawly) ---
  {
    id: 'route-109',
    background: 'ocean.png',
    name: 'Rota 109',
    unlockAt: 9_000,
    encounters: [
      { speciesId: 72, weight: 60, minLevel: 5, maxLevel: 35 }, // Tentacool (Surf)
      { speciesId: 278, weight: 35, minLevel: 10, maxLevel: 30 }, // Wingull (Surf)
      { speciesId: 279, weight: 5, minLevel: 25, maxLevel: 30 }, // Pelipper (Surf)
    ],
  },
  {
    id: 'granite-cave',
    background: 'cave-2.png',
    name: 'Caverna de Granito',
    unlockAt: 12_000,
    encounters: [
      { speciesId: 41, weight: 30, minLevel: 7, maxLevel: 11 }, // Zubat
      { speciesId: 63, weight: 10, minLevel: 8, maxLevel: 10 }, // Abra
      { speciesId: 296, weight: 30, minLevel: 6, maxLevel: 11 }, // Makuhita
      { speciesId: 74, weight: 10, minLevel: 6, maxLevel: 9 }, // Geodude
      { speciesId: 302, weight: 15, minLevel: 9, maxLevel: 12 }, // Sableye
      { speciesId: 303, weight: 15, minLevel: 9, maxLevel: 12 }, // Mawile
      { speciesId: 304, weight: 40, minLevel: 9, maxLevel: 12 }, // Aron
    ],
  },
  { id: 'dewford-town', name: 'Dewford Town', unlockAt: 16_000, background: 'beach-2.png', encounters: [] }, // gym: Brawly

  // --- Trecho 3: Dewford → Mauville (Wattson) ---
  {
    id: 'route-117',
    background: 'tall-grass.png',
    name: 'Rota 117',
    unlockAt: 20_000,
    encounters: [
      { speciesId: 43, weight: 40, minLevel: 13, maxLevel: 14 }, // Oddish
      { speciesId: 261, weight: 30, minLevel: 13, maxLevel: 14 }, // Poochyena
      { speciesId: 263, weight: 30, minLevel: 13, maxLevel: 14 }, // Zigzagoon
      { speciesId: 315, weight: 30, minLevel: 13, maxLevel: 14 }, // Roselia
      { speciesId: 313, weight: 18, minLevel: 13, maxLevel: 14 }, // Volbeat
      { speciesId: 314, weight: 1, minLevel: 13, maxLevel: 13 }, // Illumise
      { speciesId: 283, weight: 1, minLevel: 13, maxLevel: 13 }, // Surskit
      { speciesId: 273, weight: 1, minLevel: 13, maxLevel: 13 }, // Seedot
      { speciesId: 183, weight: 99, minLevel: 5, maxLevel: 35 }, // Marill (Surf)
      { speciesId: 118, weight: 1, minLevel: 20, maxLevel: 30 }, // Goldeen (Surf)
      { speciesId: 283, weight: 1, minLevel: 20, maxLevel: 30 }, // Surskit (Surf)
    ],
  },
  {
    id: 'route-116',
    background: 'tall-grass.png',
    name: 'Rota 116',
    unlockAt: 25_000,
    encounters: [
      { speciesId: 293, weight: 50, minLevel: 6, maxLevel: 7 }, // Whismur
      { speciesId: 261, weight: 28, minLevel: 6, maxLevel: 8 }, // Poochyena
      { speciesId: 263, weight: 28, minLevel: 6, maxLevel: 8 }, // Zigzagoon
      { speciesId: 276, weight: 20, minLevel: 6, maxLevel: 8 }, // Taillow
      { speciesId: 290, weight: 20, minLevel: 6, maxLevel: 7 }, // Nincada
      { speciesId: 63, weight: 10, minLevel: 7, maxLevel: 7 }, // Abra
      { speciesId: 300, weight: 2, minLevel: 7, maxLevel: 8 }, // Skitty
    ],
  },
  {
    id: 'rusturf-tunnel',
    background: 'cave.png',
    name: 'Túnel Rusturf',
    unlockAt: 31_000,
    encounters: [
      { speciesId: 293, weight: 100, minLevel: 5, maxLevel: 8 }, // Whismur
    ],
  },
  { id: 'verdanturf-town', name: 'Verdanturf Town', unlockAt: 37_000, background: 'flowers.jpg', encounters: [] },
  {
    id: 'route-110',
    background: 'route-grass.webp',
    name: 'Rota 110',
    unlockAt: 44_000,
    encounters: [
      { speciesId: 309, weight: 30, minLevel: 12, maxLevel: 13 }, // Electrike
      { speciesId: 263, weight: 20, minLevel: 12, maxLevel: 12 }, // Zigzagoon
      { speciesId: 261, weight: 20, minLevel: 12, maxLevel: 12 }, // Poochyena
      { speciesId: 316, weight: 15, minLevel: 12, maxLevel: 13 }, // Gulpin
      { speciesId: 43, weight: 10, minLevel: 13, maxLevel: 13 }, // Oddish
      { speciesId: 278, weight: 8, minLevel: 12, maxLevel: 12 }, // Wingull
      { speciesId: 312, weight: 2, minLevel: 12, maxLevel: 13 }, // Minun
      { speciesId: 72, weight: 60, minLevel: 5, maxLevel: 35 }, // Tentacool (Surf)
      { speciesId: 278, weight: 35, minLevel: 10, maxLevel: 30 }, // Wingull (Surf)
      { speciesId: 279, weight: 5, minLevel: 25, maxLevel: 30 }, // Pelipper (Surf)
    ],
  },
  { id: 'mauville-city', name: 'Mauville City', unlockAt: 52_000, background: 'path-2.png', encounters: [] }, // gym: Wattson

  // --- Trecho 4: Mauville → Lavaridge (Flannery) ---
  {
    id: 'route-111',
    background: 'desert.png',
    name: 'Rota 111',
    unlockAt: 62_000,
    encounters: [
      { speciesId: 27, weight: 35, minLevel: 19, maxLevel: 21 }, // Sandshrew
      { speciesId: 328, weight: 35, minLevel: 19, maxLevel: 21 }, // Trapinch
      { speciesId: 343, weight: 24, minLevel: 19, maxLevel: 21 }, // Baltoy
      { speciesId: 331, weight: 6, minLevel: 20, maxLevel: 22 }, // Cacnea
    ],
  },
  {
    id: 'route-112',
    background: 'mountain.png',
    name: 'Rota 112',
    unlockAt: 73_000,
    encounters: [
      { speciesId: 322, weight: 75, minLevel: 14, maxLevel: 16 }, // Numel
      { speciesId: 66, weight: 25, minLevel: 14, maxLevel: 16 }, // Machop
      { speciesId: 183, weight: 25, minLevel: 14, maxLevel: 16 }, // Marill
    ],
  },
  { id: 'mt-chimney', name: 'Monte Chimney', unlockAt: 85_000, background: 'mountain-night.png', encounters: [] }, // sem encontro selvagem, evento de trama
  {
    id: 'fiery-path',
    background: 'cave-3.png',
    name: 'Trilha Ígnea',
    unlockAt: 98_000,
    encounters: [
      { speciesId: 322, weight: 30, minLevel: 15, maxLevel: 16 }, // Numel
      { speciesId: 109, weight: 25, minLevel: 15, maxLevel: 16 }, // Koffing
      { speciesId: 88, weight: 25, minLevel: 15, maxLevel: 16 }, // Grimer
      { speciesId: 324, weight: 18, minLevel: 14, maxLevel: 16 }, // Torkoal
      { speciesId: 66, weight: 15, minLevel: 15, maxLevel: 16 }, // Machop
      { speciesId: 218, weight: 10, minLevel: 15, maxLevel: 15 }, // Slugma
    ],
  },
  {
    id: 'jagged-pass',
    background: 'mountain-2.png',
    name: 'Passagem Irregular',
    unlockAt: 112_000,
    encounters: [
      { speciesId: 322, weight: 55, minLevel: 20, maxLevel: 22 }, // Numel
      { speciesId: 66, weight: 25, minLevel: 20, maxLevel: 22 }, // Machop
      { speciesId: 325, weight: 20, minLevel: 20, maxLevel: 22 }, // Spoink
    ],
  },
  {
    id: 'route-113',
    background: 'desert-night.png',
    name: 'Rota 113',
    unlockAt: 127_000,
    encounters: [
      { speciesId: 327, weight: 70, minLevel: 14, maxLevel: 16 }, // Spinda
      { speciesId: 27, weight: 25, minLevel: 14, maxLevel: 16 }, // Sandshrew
      { speciesId: 218, weight: 25, minLevel: 14, maxLevel: 16 }, // Slugma
      { speciesId: 227, weight: 5, minLevel: 16, maxLevel: 16 }, // Skarmory
    ],
  },
  { id: 'lavaridge-town', name: 'Lavaridge Town', unlockAt: 144_000, background: 'mountain.png', encounters: [] }, // gym: Flannery

  // --- Trecho 5: Lavaridge → Petalburg (Norman) ---
  {
    id: 'petalburg-city-gym',
    name: 'Petalburg City (Ginásio)',
    unlockAt: 150_000,
    background: 'path.png',
    encounters: [],
  }, // gym: Norman — mesma cidade de petalburg-city, ver nota no topo do arquivo

  // --- Trecho 6: Petalburg → Fortree (Winona) ---
  {
    id: 'route-114',
    background: 'tall-grass.png',
    name: 'Rota 114',
    unlockAt: 165_000,
    encounters: [
      { speciesId: 333, weight: 40, minLevel: 15, maxLevel: 17 }, // Swablu
      { speciesId: 270, weight: 30, minLevel: 15, maxLevel: 16 }, // Lotad
      { speciesId: 273, weight: 30, minLevel: 15, maxLevel: 16 }, // Seedot
      { speciesId: 271, weight: 20, minLevel: 16, maxLevel: 18 }, // Lombre
      { speciesId: 335, weight: 19, minLevel: 15, maxLevel: 17 }, // Zangoose
      { speciesId: 336, weight: 9, minLevel: 15, maxLevel: 17 }, // Seviper
      { speciesId: 274, weight: 1, minLevel: 15, maxLevel: 15 }, // Nuzleaf
      { speciesId: 283, weight: 1, minLevel: 15, maxLevel: 15 }, // Surskit
    ],
  },
  {
    id: 'meteor-falls',
    background: 'cave-night.png',
    name: 'Queda do Meteoro',
    unlockAt: 182_000,
    encounters: [
      { speciesId: 41, weight: 80, minLevel: 14, maxLevel: 20 }, // Zubat
      { speciesId: 42, weight: 65, minLevel: 33, maxLevel: 40 }, // Golbat
      { speciesId: 337, weight: 55, minLevel: 14, maxLevel: 39 }, // Lunatone
      { speciesId: 338, weight: 55, minLevel: 14, maxLevel: 39 }, // Solrock
      { speciesId: 371, weight: 25, minLevel: 25, maxLevel: 35 }, // Bagon
    ],
  },
  {
    id: 'route-115',
    background: 'route-grass.webp',
    name: 'Rota 115',
    unlockAt: 200_000,
    encounters: [
      { speciesId: 276, weight: 40, minLevel: 23, maxLevel: 25 }, // Taillow
      { speciesId: 333, weight: 30, minLevel: 23, maxLevel: 25 }, // Swablu
      { speciesId: 39, weight: 10, minLevel: 24, maxLevel: 25 }, // Jigglypuff
      { speciesId: 278, weight: 10, minLevel: 24, maxLevel: 26 }, // Wingull
      { speciesId: 277, weight: 10, minLevel: 25, maxLevel: 25 }, // Swellow
    ],
  },
  {
    id: 'route-118',
    background: 'route-grass.webp',
    name: 'Rota 118',
    unlockAt: 219_000,
    encounters: [
      { speciesId: 263, weight: 30, minLevel: 24, maxLevel: 26 }, // Zigzagoon
      { speciesId: 309, weight: 30, minLevel: 24, maxLevel: 26 }, // Electrike
      { speciesId: 278, weight: 19, minLevel: 25, maxLevel: 27 }, // Wingull
      { speciesId: 264, weight: 10, minLevel: 26, maxLevel: 26 }, // Linoone
      { speciesId: 310, weight: 10, minLevel: 26, maxLevel: 26 }, // Manectric
      { speciesId: 352, weight: 1, minLevel: 25, maxLevel: 25 }, // Kecleon
    ],
  },
  {
    id: 'route-119',
    background: 'forest.jpg',
    name: 'Rota 119',
    unlockAt: 239_000,
    encounters: [
      { speciesId: 263, weight: 30, minLevel: 25, maxLevel: 27 }, // Zigzagoon
      { speciesId: 264, weight: 30, minLevel: 25, maxLevel: 27 }, // Linoone
      { speciesId: 43, weight: 30, minLevel: 24, maxLevel: 27 }, // Oddish
      { speciesId: 357, weight: 9, minLevel: 25, maxLevel: 27 }, // Tropius
      { speciesId: 352, weight: 1, minLevel: 25, maxLevel: 25 }, // Kecleon
    ],
  },
  { id: 'fortree-city', name: 'Fortree City', unlockAt: 260_000, background: 'forest.jpg', encounters: [] }, // gym: Winona

  // --- Trecho 7: Fortree → Mossdeep (Tate & Liza) ---
  {
    id: 'route-120',
    background: 'tall-grass.png',
    name: 'Rota 120',
    unlockAt: 283_000,
    encounters: [
      { speciesId: 262, weight: 30, minLevel: 25, maxLevel: 27 }, // Mightyena
      { speciesId: 264, weight: 30, minLevel: 25, maxLevel: 27 }, // Linoone
      { speciesId: 43, weight: 25, minLevel: 25, maxLevel: 27 }, // Oddish
      { speciesId: 359, weight: 8, minLevel: 25, maxLevel: 27 }, // Absol
      { speciesId: 273, weight: 1, minLevel: 25, maxLevel: 25 }, // Seedot
      { speciesId: 283, weight: 1, minLevel: 25, maxLevel: 25 }, // Surskit
      { speciesId: 352, weight: 1, minLevel: 25, maxLevel: 25 }, // Kecleon
    ],
  },
  {
    id: 'route-121',
    background: 'tall-grass.png',
    name: 'Rota 121',
    unlockAt: 307_000,
    encounters: [
      { speciesId: 353, weight: 30, minLevel: 26, maxLevel: 28 }, // Shuppet
      { speciesId: 355, weight: 30, minLevel: 26, maxLevel: 28 }, // Duskull
      { speciesId: 262, weight: 20, minLevel: 26, maxLevel: 26 }, // Mightyena
      { speciesId: 43, weight: 15, minLevel: 26, maxLevel: 28 }, // Oddish
      { speciesId: 278, weight: 9, minLevel: 26, maxLevel: 28 }, // Wingull
      { speciesId: 44, weight: 5, minLevel: 28, maxLevel: 28 }, // Gloom
      { speciesId: 352, weight: 1, minLevel: 25, maxLevel: 25 }, // Kecleon
    ],
  },
  {
    id: 'route-122',
    background: 'ocean.png',
    name: 'Rota 122',
    unlockAt: 332_000,
    encounters: [
      { speciesId: 72, weight: 60, minLevel: 5, maxLevel: 35 }, // Tentacool (Surf)
      { speciesId: 278, weight: 35, minLevel: 10, maxLevel: 30 }, // Wingull (Surf)
      { speciesId: 279, weight: 5, minLevel: 25, maxLevel: 30 }, // Pelipper (Surf)
    ],
  },
  {
    id: 'mt-pyre',
    background: 'mountain-night.png',
    name: 'Monte Pyre',
    unlockAt: 358_000,
    encounters: [
      { speciesId: 353, weight: 60, minLevel: 22, maxLevel: 29 }, // Shuppet
      { speciesId: 355, weight: 60, minLevel: 22, maxLevel: 29 }, // Duskull
      { speciesId: 37, weight: 30, minLevel: 25, maxLevel: 29 }, // Vulpix
      { speciesId: 307, weight: 30, minLevel: 27, maxLevel: 29 }, // Meditite
      { speciesId: 278, weight: 10, minLevel: 26, maxLevel: 28 }, // Wingull
      { speciesId: 358, weight: 2, minLevel: 28, maxLevel: 28 }, // Chimecho
    ],
  },
  {
    id: 'route-123',
    background: 'tall-grass.png',
    name: 'Rota 123',
    unlockAt: 385_000,
    encounters: [
      { speciesId: 355, weight: 30, minLevel: 26, maxLevel: 28 }, // Duskull
      { speciesId: 262, weight: 20, minLevel: 26, maxLevel: 28 }, // Mightyena
      { speciesId: 264, weight: 20, minLevel: 26, maxLevel: 28 }, // Linoone
      { speciesId: 43, weight: 15, minLevel: 26, maxLevel: 28 }, // Oddish
      { speciesId: 278, weight: 9, minLevel: 26, maxLevel: 28 }, // Wingull
      { speciesId: 44, weight: 5, minLevel: 28, maxLevel: 28 }, // Gloom
      { speciesId: 352, weight: 1, minLevel: 25, maxLevel: 25 }, // Kecleon
    ],
  },
  { id: 'lilycove-city', name: 'Lilycove City', unlockAt: 413_000, background: 'ocean.png', encounters: [] },
  {
    id: 'route-125',
    background: 'ocean.png',
    name: 'Rota 125',
    unlockAt: 442_000,
    encounters: [
      { speciesId: 72, weight: 60, minLevel: 5, maxLevel: 35 }, // Tentacool (Surf)
      { speciesId: 278, weight: 35, minLevel: 10, maxLevel: 30 }, // Wingull (Surf)
      { speciesId: 279, weight: 5, minLevel: 25, maxLevel: 30 }, // Pelipper (Surf)
    ],
  },
  { id: 'mossdeep-city', name: 'Mossdeep City', unlockAt: 472_000, background: 'beach.png', encounters: [] }, // gym: Tate & Liza

  // --- Trecho 8: Mossdeep → Sootopolis (Juan) → Elite Four → Campeã ---
  {
    id: 'route-126',
    background: 'underwater.png',
    name: 'Rota 126',
    unlockAt: 500_000,
    encounters: [
      { speciesId: 72, weight: 60, minLevel: 5, maxLevel: 35 }, // Tentacool (Surf)
      { speciesId: 278, weight: 35, minLevel: 10, maxLevel: 30 }, // Wingull (Surf)
      { speciesId: 279, weight: 5, minLevel: 25, maxLevel: 30 }, // Pelipper (Surf)
    ],
  },
  {
    id: 'route-128',
    background: 'underwater.png',
    name: 'Rota 128',
    unlockAt: 528_000,
    encounters: [
      { speciesId: 72, weight: 60, minLevel: 5, maxLevel: 35 }, // Tentacool (Surf)
      { speciesId: 278, weight: 35, minLevel: 10, maxLevel: 30 }, // Wingull (Surf)
      { speciesId: 279, weight: 5, minLevel: 25, maxLevel: 30 }, // Pelipper (Surf)
    ],
  },
  {
    id: 'shoal-cave',
    background: 'cave-night.png',
    name: 'Caverna Shoal',
    unlockAt: 557_000,
    encounters: [
      { speciesId: 363, weight: 45, minLevel: 26, maxLevel: 32 }, // Spheal
      { speciesId: 41, weight: 45, minLevel: 26, maxLevel: 32 }, // Zubat
      { speciesId: 361, weight: 10, minLevel: 26, maxLevel: 30 }, // Snorunt
      { speciesId: 42, weight: 5, minLevel: 30, maxLevel: 32 }, // Golbat
    ],
  },
  {
    id: 'seafloor-cavern',
    background: 'underwater.png',
    name: 'Caverna do Fundo do Mar',
    unlockAt: 587_000,
    encounters: [
      { speciesId: 41, weight: 90, minLevel: 28, maxLevel: 35 }, // Zubat
      { speciesId: 42, weight: 10, minLevel: 33, maxLevel: 36 }, // Golbat
    ],
  },
  { id: 'sootopolis-city', name: 'Sootopolis City', unlockAt: 618_000, background: 'lake.png', encounters: [] }, // gym: Juan
  {
    id: 'route-131',
    background: 'underwater.png',
    name: 'Rota 131',
    unlockAt: 635_000,
    encounters: [
      { speciesId: 72, weight: 60, minLevel: 5, maxLevel: 35 }, // Tentacool (Surf)
      { speciesId: 278, weight: 35, minLevel: 10, maxLevel: 30 }, // Wingull (Surf)
      { speciesId: 279, weight: 5, minLevel: 25, maxLevel: 30 }, // Pelipper (Surf)
    ],
  },
  {
    id: 'route-134',
    background: 'underwater.png',
    name: 'Rota 134',
    unlockAt: 650_000,
    encounters: [
      { speciesId: 72, weight: 60, minLevel: 5, maxLevel: 35 }, // Tentacool (Surf)
      { speciesId: 278, weight: 35, minLevel: 10, maxLevel: 30 }, // Wingull (Surf)
      { speciesId: 279, weight: 5, minLevel: 25, maxLevel: 30 }, // Pelipper (Surf)
    ],
  },
  {
    id: 'victory-road',
    background: 'mountain-night.png',
    name: 'Victory Road',
    unlockAt: 670_000,
    encounters: [
      { speciesId: 42, weight: 35, minLevel: 38, maxLevel: 44 }, // Golbat
      { speciesId: 297, weight: 30, minLevel: 36, maxLevel: 42 }, // Hariyama
      { speciesId: 305, weight: 20, minLevel: 40, maxLevel: 44 }, // Lairon
      { speciesId: 308, weight: 12, minLevel: 40, maxLevel: 44 }, // Medicham
      { speciesId: 293, weight: 5, minLevel: 36, maxLevel: 36 }, // Whismur
      { speciesId: 294, weight: 10, minLevel: 40, maxLevel: 40 }, // Loudred
      { speciesId: 304, weight: 5, minLevel: 36, maxLevel: 36 }, // Aron
      { speciesId: 41, weight: 10, minLevel: 36, maxLevel: 36 }, // Zubat
      { speciesId: 302, weight: 35, minLevel: 40, maxLevel: 44 }, // Sableye
      { speciesId: 303, weight: 5, minLevel: 42, maxLevel: 44 }, // Mawile
    ],
  },
]
