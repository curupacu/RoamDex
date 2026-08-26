import type { LocationDefinition } from '../gen1/locations'

// Kalos, Vaniville Town → Victory Road (the 8-gym stretch, same shape as
// content/gen1/locations.ts's KANTO_LOCATIONS and the other 3 regions'
// LOCATIONS arrays). docs/ROTAS-KALOS.md has the full research this is
// sourced from (Bulbapedia, Pokémon X — X/Y don't swap gym order like
// Hoenn/Sinnoh did, only a handful of version-exclusive wild species,
// resolved in favor of X throughout).
//
// Same simplifications as the previous 3 regions: fishing, Rock Smash and
// horde encounters (Gen 6's new "several weak wild Pokémon at once"
// mechanic) dropped entirely; colored-flower variants folded into the same
// table as plain grass, unrenormalized; multi-area caves collapsed into one
// row per species. unlockAt is provisional, same as every other region.
//
// Lumiose City appears twice (pass-through early, gym later) — same
// 'X-city' / 'X-city-gym' pattern already used for Petalburg (Hoenn) and
// Olivine (Johto).
export const KALOS_LOCATIONS: LocationDefinition[] = [
  { id: 'vaniville-town', name: 'Vaniville Town', unlockAt: 0, background: 'flowers.jpg', encounters: [] },

  // --- Trecho 1: Vaniville → Santalune (Viola) ---
  { id: 'route-1', name: 'Rota 1', unlockAt: 0, background: 'tall-grass.png', encounters: [] }, // sem selvagem em nenhuma versão
  { id: 'aquacorde-town', name: 'Aquacorde Town', unlockAt: 300, background: 'path.png', encounters: [] },
  {
    id: 'route-2',
    background: 'tall-grass.png',
    name: 'Rota 2',
    unlockAt: 700,
    encounters: [
      { speciesId: 661, weight: 20, minLevel: 2, maxLevel: 3 }, // Fletchling
      { speciesId: 659, weight: 20, minLevel: 2, maxLevel: 3 }, // Bunnelby
      { speciesId: 664, weight: 20, minLevel: 2, maxLevel: 3 }, // Scatterbug
      { speciesId: 263, weight: 15, minLevel: 3, maxLevel: 4 }, // Zigzagoon
      { speciesId: 16, weight: 14, minLevel: 3, maxLevel: 4 }, // Pidgey
      { speciesId: 10, weight: 11, minLevel: 3, maxLevel: 4 }, // Caterpie
      { speciesId: 13, weight: 11, minLevel: 3, maxLevel: 4 }, // Weedle
    ],
  },
  {
    id: 'santalune-forest',
    background: 'forest.jpg',
    name: 'Floresta Santalune',
    unlockAt: 1_500,
    encounters: [
      { speciesId: 10, weight: 20, minLevel: 2, maxLevel: 3 }, // Caterpie
      { speciesId: 13, weight: 20, minLevel: 2, maxLevel: 3 }, // Weedle
      { speciesId: 664, weight: 20, minLevel: 2, maxLevel: 3 }, // Scatterbug
      { speciesId: 513, weight: 10, minLevel: 4, maxLevel: 4 }, // Pansear
      { speciesId: 511, weight: 10, minLevel: 4, maxLevel: 4 }, // Pansage
      { speciesId: 515, weight: 10, minLevel: 4, maxLevel: 4 }, // Panpour
      { speciesId: 661, weight: 10, minLevel: 4, maxLevel: 4 }, // Fletchling
      { speciesId: 25, weight: 6, minLevel: 3, maxLevel: 4 }, // Pikachu
      { speciesId: 11, weight: 4, minLevel: 4, maxLevel: 4 }, // Metapod
      { speciesId: 14, weight: 4, minLevel: 4, maxLevel: 4 }, // Kakuna
    ],
  },
  {
    id: 'route-3',
    background: 'tall-grass.png',
    name: 'Rota 3',
    unlockAt: 2_800,
    encounters: [
      { speciesId: 659, weight: 20, minLevel: 3, maxLevel: 4 }, // Bunnelby
      { speciesId: 661, weight: 20, minLevel: 3, maxLevel: 5 }, // Fletchling
      { speciesId: 399, weight: 20, minLevel: 3, maxLevel: 4 }, // Bidoof
      { speciesId: 298, weight: 10, minLevel: 5, maxLevel: 5 }, // Azurill
      { speciesId: 412, weight: 10, minLevel: 5, maxLevel: 5 }, // Burmy
      { speciesId: 16, weight: 10, minLevel: 4, maxLevel: 4 }, // Pidgey
      { speciesId: 206, weight: 5, minLevel: 5, maxLevel: 5 }, // Dunsparce
      { speciesId: 25, weight: 5, minLevel: 4, maxLevel: 5 }, // Pikachu
    ],
  },
  { id: 'santalune-city', name: 'Santalune City', unlockAt: 4_500, background: 'path-2.png', encounters: [] }, // gym: Viola

  // --- Trecho 2: Santalune → Cyllage (Grant) ---
  {
    id: 'route-4',
    background: 'flowers.jpg',
    name: 'Rota 4',
    unlockAt: 7_000,
    encounters: [
      { speciesId: 415, weight: 30, minLevel: 6, maxLevel: 8 }, // Combee
      { speciesId: 669, weight: 30, minLevel: 6, maxLevel: 8 }, // Flabébé
      { speciesId: 165, weight: 10, minLevel: 8, maxLevel: 8 }, // Ledyba
      { speciesId: 300, weight: 10, minLevel: 8, maxLevel: 8 }, // Skitty
      { speciesId: 406, weight: 10, minLevel: 8, maxLevel: 8 }, // Budew
      { speciesId: 280, weight: 5, minLevel: 8, maxLevel: 8 }, // Ralts
    ],
  },
  { id: 'lumiose-city', name: 'Lumiose City', unlockAt: 9_500, background: 'path-2.png', encounters: [] },
  {
    id: 'route-5',
    background: 'tall-grass.png',
    name: 'Rota 5',
    unlockAt: 13_000,
    encounters: [
      { speciesId: 659, weight: 30, minLevel: 8, maxLevel: 10 }, // Bunnelby
      { speciesId: 676, weight: 20, minLevel: 8, maxLevel: 9 }, // Furfrou
      { speciesId: 84, weight: 10, minLevel: 10, maxLevel: 10 }, // Doduo
      { speciesId: 316, weight: 10, minLevel: 10, maxLevel: 10 }, // Gulpin
      { speciesId: 672, weight: 10, minLevel: 10, maxLevel: 10 }, // Skiddo
      { speciesId: 674, weight: 10, minLevel: 10, maxLevel: 10 }, // Pancham
      { speciesId: 311, weight: 5, minLevel: 9, maxLevel: 10 }, // Plusle
      { speciesId: 63, weight: 5, minLevel: 10, maxLevel: 10 }, // Abra
    ],
  },
  {
    id: 'route-6',
    background: 'tall-grass.png',
    name: 'Rota 6',
    unlockAt: 17_000,
    encounters: [
      { speciesId: 43, weight: 30, minLevel: 10, maxLevel: 12 }, // Oddish
      { speciesId: 161, weight: 20, minLevel: 10, maxLevel: 11 }, // Sentret
      { speciesId: 677, weight: 20, minLevel: 11, maxLevel: 12 }, // Espurr
      { speciesId: 679, weight: 15, minLevel: 11, maxLevel: 12 }, // Honedge
      { speciesId: 290, weight: 10, minLevel: 12, maxLevel: 12 }, // Nincada
      { speciesId: 352, weight: 5, minLevel: 11, maxLevel: 12 }, // Kecleon
    ],
  },
  {
    id: 'route-7',
    background: 'flowers.jpg',
    name: 'Rota 7',
    unlockAt: 22_000,
    encounters: [
      { speciesId: 453, weight: 35, minLevel: 12, maxLevel: 14 }, // Croagunk
      { speciesId: 235, weight: 10, minLevel: 14, maxLevel: 14 }, // Smeargle
      { speciesId: 313, weight: 10, minLevel: 13, maxLevel: 13 }, // Volbeat
      { speciesId: 314, weight: 10, minLevel: 13, maxLevel: 13 }, // Illumise
      { speciesId: 315, weight: 10, minLevel: 14, maxLevel: 14 }, // Roselia
      { speciesId: 580, weight: 10, minLevel: 14, maxLevel: 14 }, // Ducklett
      { speciesId: 682, weight: 10, minLevel: 14, maxLevel: 14 }, // Spritzee
      { speciesId: 669, weight: 4, minLevel: 13, maxLevel: 13 }, // Flabébé
    ],
  },
  {
    id: 'route-8',
    background: 'flowers.jpg',
    name: 'Rota 8',
    unlockAt: 28_000,
    encounters: [
      { speciesId: 425, weight: 30, minLevel: 13, maxLevel: 15 }, // Drifloon
      { speciesId: 325, weight: 20, minLevel: 13, maxLevel: 14 }, // Spoink
      { speciesId: 686, weight: 15, minLevel: 14, maxLevel: 15 }, // Inkay
      { speciesId: 335, weight: 10, minLevel: 14, maxLevel: 14 }, // Zangoose
      { speciesId: 359, weight: 10, minLevel: 15, maxLevel: 15 }, // Absol
      { speciesId: 619, weight: 10, minLevel: 15, maxLevel: 15 }, // Mienfoo
      { speciesId: 371, weight: 5, minLevel: 14, maxLevel: 15 }, // Bagon
    ],
  },
  {
    id: 'route-9',
    background: 'desert.png',
    name: 'Rota 9',
    unlockAt: 35_000,
    encounters: [
      { speciesId: 449, weight: 40, minLevel: 15, maxLevel: 17 }, // Hippopotas
      { speciesId: 551, weight: 40, minLevel: 15, maxLevel: 17 }, // Sandile
      { speciesId: 694, weight: 20, minLevel: 15, maxLevel: 17 }, // Helioptile
    ],
  },
  { id: 'cyllage-city', name: 'Cyllage City', unlockAt: 43_000, background: 'beach.png', encounters: [] }, // gym: Grant

  // --- Trecho 3: Cyllage → Shalour (Korrina) ---
  {
    id: 'route-10',
    background: 'tall-grass.png',
    name: 'Rota 10',
    unlockAt: 53_000,
    encounters: [
      { speciesId: 622, weight: 30, minLevel: 19, maxLevel: 21 }, // Golett
      { speciesId: 561, weight: 20, minLevel: 19, maxLevel: 21 }, // Sigilyph
      { speciesId: 701, weight: 20, minLevel: 19, maxLevel: 20 }, // Hawlucha
      { speciesId: 209, weight: 10, minLevel: 21, maxLevel: 21 }, // Snubbull
      { speciesId: 228, weight: 10, minLevel: 21, maxLevel: 21 }, // Houndour
      { speciesId: 133, weight: 5, minLevel: 19, maxLevel: 21 }, // Eevee
      { speciesId: 587, weight: 5, minLevel: 19, maxLevel: 20 }, // Emolga
    ],
  },
  {
    id: 'reflection-cave',
    background: 'cave-2.png',
    name: 'Caverna Reflexo',
    unlockAt: 64_000,
    encounters: [
      { speciesId: 524, weight: 20, minLevel: 21, maxLevel: 22 }, // Roggenrola
      { speciesId: 577, weight: 20, minLevel: 22, maxLevel: 23 }, // Solosis
      { speciesId: 122, weight: 20, minLevel: 22, maxLevel: 23 }, // Mr. Mime
      { speciesId: 433, weight: 15, minLevel: 21, maxLevel: 22 }, // Chingling
      { speciesId: 202, weight: 10, minLevel: 22, maxLevel: 22 }, // Wobbuffet
      { speciesId: 703, weight: 10, minLevel: 23, maxLevel: 23 }, // Carbink
      { speciesId: 302, weight: 5, minLevel: 22, maxLevel: 23 }, // Sableye
    ],
  },
  {
    id: 'route-11',
    background: 'tall-grass.png',
    name: 'Rota 11',
    unlockAt: 76_000,
    encounters: [
      { speciesId: 297, weight: 20, minLevel: 22, maxLevel: 23 }, // Hariyama
      { speciesId: 397, weight: 20, minLevel: 22, maxLevel: 23 }, // Staravia
      { speciesId: 539, weight: 20, minLevel: 22, maxLevel: 23 }, // Sawk
      { speciesId: 433, weight: 10, minLevel: 21, maxLevel: 21 }, // Chingling
      { speciesId: 434, weight: 10, minLevel: 21, maxLevel: 21 }, // Stunky
      { speciesId: 30, weight: 10, minLevel: 21, maxLevel: 21 }, // Nidorina
      { speciesId: 33, weight: 10, minLevel: 21, maxLevel: 21 }, // Nidorino
      { speciesId: 702, weight: 5, minLevel: 21, maxLevel: 22 }, // Dedenne
    ],
  },
  { id: 'shalour-city', name: 'Shalour City', unlockAt: 90_000, background: 'ocean.png', encounters: [] }, // gym: Korrina

  // --- Trecho 4: Shalour → Coumarine (Ramos) ---
  {
    id: 'route-12',
    background: 'tall-grass.png',
    name: 'Rota 12',
    unlockAt: 105_000,
    encounters: [
      { speciesId: 79, weight: 30, minLevel: 23, maxLevel: 25 }, // Slowpoke
      { speciesId: 441, weight: 30, minLevel: 23, maxLevel: 25 }, // Chatot
      { speciesId: 128, weight: 10, minLevel: 25, maxLevel: 25 }, // Tauros
      { speciesId: 241, weight: 10, minLevel: 25, maxLevel: 25 }, // Miltank
      { speciesId: 102, weight: 10, minLevel: 24, maxLevel: 24 }, // Exeggcute
      { speciesId: 127, weight: 5, minLevel: 25, maxLevel: 25 }, // Pinsir
      { speciesId: 214, weight: 5, minLevel: 25, maxLevel: 25 }, // Heracross
      { speciesId: 417, weight: 5, minLevel: 23, maxLevel: 24 }, // Pachirisu
    ],
  },
  { id: 'coumarine-city', name: 'Coumarine City', unlockAt: 122_000, background: 'ocean.png', encounters: [] }, // gym: Ramos

  // --- Trecho 5: Coumarine → Lumiose (Clemont) ---
  {
    id: 'route-13',
    background: 'desert.png',
    name: 'Rota 13',
    unlockAt: 140_000,
    encounters: [
      { speciesId: 51, weight: 40, minLevel: 26, maxLevel: 28 }, // Dugtrio
      { speciesId: 328, weight: 40, minLevel: 26, maxLevel: 28 }, // Trapinch
      { speciesId: 443, weight: 20, minLevel: 26, maxLevel: 28 }, // Gible
    ],
  },
  {
    id: 'lumiose-city-gym',
    name: 'Lumiose City (Ginásio)',
    unlockAt: 160_000,
    background: 'path-2.png',
    encounters: [],
  }, // gym: Clemont — mesma cidade de lumiose-city, ver nota no topo do arquivo

  // --- Trecho 6: Lumiose → Laverre (Valerie) ---
  {
    id: 'route-14',
    background: 'forest.jpg',
    name: 'Rota 14',
    unlockAt: 182_000,
    encounters: [
      { speciesId: 451, weight: 20, minLevel: 30, maxLevel: 31 }, // Skorupi
      { speciesId: 70, weight: 20, minLevel: 31, maxLevel: 32 }, // Weepinbell
      { speciesId: 455, weight: 15, minLevel: 30, maxLevel: 32 }, // Carnivine
      { speciesId: 195, weight: 10, minLevel: 30, maxLevel: 30 }, // Quagsire
      { speciesId: 588, weight: 10, minLevel: 30, maxLevel: 30 }, // Karrablast
      { speciesId: 616, weight: 10, minLevel: 30, maxLevel: 30 }, // Shelmet
      { speciesId: 704, weight: 10, minLevel: 30, maxLevel: 30 }, // Goomy
      { speciesId: 93, weight: 5, minLevel: 31, maxLevel: 31 }, // Haunter
    ],
  },
  { id: 'laverre-city', name: 'Laverre City', unlockAt: 206_000, background: 'flowers.jpg', encounters: [] }, // gym: Valerie

  // --- Trecho 7: Laverre → Anistar (Olympia) ---
  {
    id: 'route-15',
    background: 'tall-grass.png',
    name: 'Rota 15',
    unlockAt: 232_000,
    encounters: [
      { speciesId: 262, weight: 30, minLevel: 34, maxLevel: 36 }, // Mightyena
      { speciesId: 510, weight: 30, minLevel: 34, maxLevel: 36 }, // Liepard
      { speciesId: 451, weight: 20, minLevel: 34, maxLevel: 35 }, // Skorupi
      { speciesId: 590, weight: 20, minLevel: 34, maxLevel: 35 }, // Foongus
      { speciesId: 505, weight: 10, minLevel: 36, maxLevel: 36 }, // Watchog
      { speciesId: 624, weight: 10, minLevel: 36, maxLevel: 36 }, // Pawniard
      { speciesId: 707, weight: 10, minLevel: 34, maxLevel: 36 }, // Klefki
    ],
  },
  {
    id: 'route-16',
    background: 'forest.jpg',
    name: 'Rota 16',
    unlockAt: 262_000,
    encounters: [
      { speciesId: 710, weight: 30, minLevel: 34, maxLevel: 35 }, // Pumpkaboo
      { speciesId: 590, weight: 20, minLevel: 34, maxLevel: 36 }, // Foongus
      { speciesId: 708, weight: 10, minLevel: 35, maxLevel: 35 }, // Phantump
      { speciesId: 707, weight: 9, minLevel: 34, maxLevel: 35 }, // Klefki
    ],
  },
  {
    id: 'route-17',
    background: 'snow.png',
    name: 'Rota 17',
    unlockAt: 294_000,
    encounters: [
      { speciesId: 225, weight: 40, minLevel: 38, maxLevel: 40 }, // Delibird
      { speciesId: 459, weight: 30, minLevel: 38, maxLevel: 39 }, // Snover
      { speciesId: 215, weight: 29, minLevel: 38, maxLevel: 40 }, // Sneasel
      { speciesId: 460, weight: 1, minLevel: 40, maxLevel: 40 }, // Abomasnow
    ],
  },
  {
    id: 'frost-cavern',
    background: 'cave-night.png',
    name: 'Caverna Gélida',
    unlockAt: 328_000,
    encounters: [
      { speciesId: 124, weight: 20, minLevel: 39, maxLevel: 40 }, // Jynx
      { speciesId: 221, weight: 20, minLevel: 38, maxLevel: 39 }, // Piloswine
      { speciesId: 614, weight: 20, minLevel: 39, maxLevel: 40 }, // Beartic
      { speciesId: 712, weight: 20, minLevel: 39, maxLevel: 40 }, // Bergmite
      { speciesId: 93, weight: 16, minLevel: 38, maxLevel: 40 }, // Haunter
      { speciesId: 615, weight: 4, minLevel: 40, maxLevel: 40 }, // Cryogonal
    ],
  },
  { id: 'anistar-city', name: 'Anistar City', unlockAt: 364_000, background: 'path.png', encounters: [] }, // gym: Olympia

  // --- Trecho 8: Anistar → Snowbelle (Wulfric) → Elite Four → Campeã ---
  {
    id: 'route-18',
    background: 'flowers.jpg',
    name: 'Rota 18',
    unlockAt: 402_000,
    encounters: [
      { speciesId: 534, weight: 30, minLevel: 44, maxLevel: 46 }, // Gurdurr
      { speciesId: 324, weight: 20, minLevel: 44, maxLevel: 45 }, // Torkoal
      { speciesId: 75, weight: 15, minLevel: 45, maxLevel: 46 }, // Graveler
      { speciesId: 247, weight: 10, minLevel: 46, maxLevel: 46 }, // Pupitar
      { speciesId: 305, weight: 10, minLevel: 46, maxLevel: 46 }, // Lairon
      { speciesId: 632, weight: 10, minLevel: 44, maxLevel: 44 }, // Durant
      { speciesId: 631, weight: 5, minLevel: 45, maxLevel: 46 }, // Heatmor
    ],
  },
  {
    id: 'route-19',
    background: 'flowers.jpg',
    name: 'Rota 19',
    unlockAt: 442_000,
    encounters: [
      { speciesId: 452, weight: 30, minLevel: 46, maxLevel: 48 }, // Drapion
      { speciesId: 70, weight: 20, minLevel: 46, maxLevel: 47 }, // Weepinbell
      { speciesId: 195, weight: 10, minLevel: 48, maxLevel: 48 }, // Quagsire
      { speciesId: 588, weight: 10, minLevel: 47, maxLevel: 47 }, // Karrablast
      { speciesId: 616, weight: 10, minLevel: 47, maxLevel: 47 }, // Shelmet
      { speciesId: 705, weight: 10, minLevel: 48, maxLevel: 48 }, // Sliggoo
      { speciesId: 455, weight: 5, minLevel: 46, maxLevel: 48 }, // Carnivine
      { speciesId: 93, weight: 5, minLevel: 47, maxLevel: 47 }, // Haunter
    ],
  },
  { id: 'snowbelle-city', name: 'Snowbelle City', unlockAt: 484_000, background: 'snow.png', encounters: [] }, // gym: Wulfric
  {
    id: 'route-21',
    background: 'flowers.jpg',
    name: 'Rota 21',
    unlockAt: 528_000,
    encounters: [
      { speciesId: 419, weight: 40, minLevel: 50, maxLevel: 52 }, // Floatzel
      { speciesId: 327, weight: 20, minLevel: 50, maxLevel: 52 }, // Spinda
      { speciesId: 334, weight: 20, minLevel: 50, maxLevel: 51 }, // Altaria
      { speciesId: 123, weight: 10, minLevel: 50, maxLevel: 52 }, // Scyther
      { speciesId: 217, weight: 10, minLevel: 52, maxLevel: 52 }, // Ursaring
    ],
  },
  {
    id: 'route-22',
    background: 'tall-grass.png',
    name: 'Rota 22',
    unlockAt: 574_000,
    encounters: [
      { speciesId: 54, weight: 20, minLevel: 25, maxLevel: 26 }, // Psyduck
      { speciesId: 400, weight: 20, minLevel: 26, maxLevel: 27 }, // Bibarel
      { speciesId: 184, weight: 20, minLevel: 25, maxLevel: 26 }, // Azumarill
      { speciesId: 660, weight: 10, minLevel: 27, maxLevel: 27 }, // Diggersby
      { speciesId: 83, weight: 10, minLevel: 26, maxLevel: 26 }, // Farfetch'd
      { speciesId: 667, weight: 10, minLevel: 25, maxLevel: 25 }, // Litleo
      { speciesId: 206, weight: 5, minLevel: 26, maxLevel: 26 }, // Dunsparce
      { speciesId: 447, weight: 5, minLevel: 25, maxLevel: 26 }, // Riolu
    ],
  },
  {
    id: 'victory-road',
    background: 'mountain-night.png',
    name: 'Victory Road',
    unlockAt: 622_000,
    encounters: [
      { speciesId: 534, weight: 30, minLevel: 57, maxLevel: 59 }, // Gurdurr
      { speciesId: 621, weight: 20, minLevel: 58, maxLevel: 59 }, // Druddigon
      { speciesId: 75, weight: 20, minLevel: 57, maxLevel: 58 }, // Graveler
      { speciesId: 108, weight: 15, minLevel: 58, maxLevel: 59 }, // Lickitung
      { speciesId: 93, weight: 10, minLevel: 58, maxLevel: 58 }, // Haunter
      { speciesId: 634, weight: 5, minLevel: 59, maxLevel: 59 }, // Zweilous
    ],
  },
]
