import type { LocationDefinition } from '../gen1/locations'

// Sinnoh, Twinleaf Town → Victory Road (the 8-gym stretch, same shape as
// content/gen1/locations.ts's KANTO_LOCATIONS, content/gen2/locations.ts's
// JOHTO_LOCATIONS and content/gen3/locations.ts's HOENN_LOCATIONS).
// docs/ROTAS-SINNOH.md has the full research this is sourced from
// (Bulbapedia, Pokémon Platinum — gym order differs from Diamond/Pearl,
// see the doc's Metodologia: Fantina is 3rd, Maylene is 4th).
//
// Same simplifications as Kanto/Johto/Hoenn: fishing and Rock Smash
// encounters dropped entirely; Surf folded into the same table as the
// "walking" encounters, unrenormalized; multi-floor/multi-area locations
// (Oreburgh Gate, Mt. Coronet, Victory Road) collapsed the same way —
// per-species weight summed across floors/areas, level range spans all of
// them. Sinnoh also has a morning/day/night split (like Johto) — day is the
// baseline pool, night-exclusive rows added on top unrenormalized.
//
// unlockAt is provisional, same as every other region.
export const SINNOH_LOCATIONS: LocationDefinition[] = [
  { id: 'twinleaf-town', name: 'Twinleaf Town', unlockAt: 0, background: 'flowers.jpg', encounters: [] },

  // --- Trecho 1: Twinleaf → Oreburgh (Roark) ---
  {
    id: 'route-201',
    background: 'tall-grass.png',
    name: 'Rota 201',
    unlockAt: 0,
    encounters: [
      { speciesId: 399, weight: 50, minLevel: 2, maxLevel: 4 }, // Bidoof
      { speciesId: 396, weight: 40, minLevel: 2, maxLevel: 3 }, // Starly
      { speciesId: 401, weight: 10, minLevel: 3, maxLevel: 3 }, // Kricketot
    ],
  },
  { id: 'sandgem-town', name: 'Sandgem Town', unlockAt: 300, background: 'path.png', encounters: [] },
  {
    id: 'route-202',
    background: 'tall-grass.png',
    name: 'Rota 202',
    unlockAt: 700,
    encounters: [
      { speciesId: 399, weight: 45, minLevel: 2, maxLevel: 4 }, // Bidoof
      { speciesId: 396, weight: 20, minLevel: 2, maxLevel: 4 }, // Starly
      { speciesId: 401, weight: 20, minLevel: 3, maxLevel: 4 }, // Kricketot
      { speciesId: 403, weight: 15, minLevel: 3, maxLevel: 4 }, // Shinx
    ],
  },
  { id: 'jubilife-city', name: 'Jubilife City', unlockAt: 1_500, background: 'path-2.png', encounters: [] },
  {
    id: 'route-203',
    background: 'tall-grass.png',
    name: 'Rota 203',
    unlockAt: 2_800,
    encounters: [
      { speciesId: 396, weight: 25, minLevel: 4, maxLevel: 7 }, // Starly
      { speciesId: 403, weight: 25, minLevel: 4, maxLevel: 5 }, // Shinx
      { speciesId: 63, weight: 15, minLevel: 4, maxLevel: 5 }, // Abra
      { speciesId: 399, weight: 15, minLevel: 5, maxLevel: 7 }, // Bidoof
      { speciesId: 401, weight: 10, minLevel: 4, maxLevel: 5 }, // Kricketot
      { speciesId: 41, weight: 10, minLevel: 4, maxLevel: 4 }, // Zubat (à noite)
    ],
  },
  {
    id: 'oreburgh-gate',
    background: 'cave.png',
    name: 'Portão de Oreburgh',
    unlockAt: 4_500,
    encounters: [
      { speciesId: 41, weight: 50, minLevel: 5, maxLevel: 9 }, // Zubat
      { speciesId: 54, weight: 35, minLevel: 5, maxLevel: 10 }, // Psyduck
      { speciesId: 74, weight: 15, minLevel: 5, maxLevel: 8 }, // Geodude
      { speciesId: 42, weight: 5, minLevel: 10, maxLevel: 10 }, // Golbat
    ],
  },
  { id: 'oreburgh-city', name: 'Oreburgh City', unlockAt: 7_000, background: 'mountain.png', encounters: [] }, // gym: Roark

  // --- Trecho 2: Oreburgh → Eterna (Gardenia) ---
  {
    id: 'route-204',
    background: 'tall-grass.png',
    name: 'Rota 204',
    unlockAt: 9_500,
    encounters: [
      { speciesId: 396, weight: 30, minLevel: 4, maxLevel: 6 }, // Starly
      { speciesId: 399, weight: 25, minLevel: 4, maxLevel: 6 }, // Bidoof
      { speciesId: 406, weight: 25, minLevel: 3, maxLevel: 5 }, // Budew
      { speciesId: 403, weight: 15, minLevel: 4, maxLevel: 5 }, // Shinx
      { speciesId: 401, weight: 10, minLevel: 3, maxLevel: 4 }, // Kricketot
      { speciesId: 265, weight: 10, minLevel: 4, maxLevel: 4 }, // Wurmple
    ],
  },
  {
    id: 'ravaged-path',
    background: 'cave-2.png',
    name: 'Caminho Devastado',
    unlockAt: 13_000,
    encounters: [
      { speciesId: 41, weight: 65, minLevel: 3, maxLevel: 6 }, // Zubat
      { speciesId: 54, weight: 35, minLevel: 4, maxLevel: 6 }, // Psyduck
    ],
  },
  {
    id: 'route-205',
    background: 'route-grass.webp',
    name: 'Rota 205',
    unlockAt: 17_000,
    encounters: [
      { speciesId: 422, weight: 65, minLevel: 9, maxLevel: 12 }, // Shellos
      { speciesId: 418, weight: 15, minLevel: 10, maxLevel: 11 }, // Buizel
      { speciesId: 417, weight: 10, minLevel: 9, maxLevel: 11 }, // Pachirisu
      { speciesId: 399, weight: 10, minLevel: 10, maxLevel: 10 }, // Bidoof
    ],
  },
  {
    id: 'eterna-forest',
    background: 'forest.jpg',
    name: 'Floresta Eterna',
    unlockAt: 22_000,
    encounters: [
      { speciesId: 406, weight: 30, minLevel: 10, maxLevel: 11 }, // Budew
      { speciesId: 198, weight: 20, minLevel: 10, maxLevel: 11 }, // Murkrow
      { speciesId: 200, weight: 20, minLevel: 10, maxLevel: 11 }, // Misdreavus
      { speciesId: 399, weight: 10, minLevel: 12, maxLevel: 12 }, // Bidoof
      { speciesId: 401, weight: 10, minLevel: 12, maxLevel: 12 }, // Kricketot
      { speciesId: 266, weight: 5, minLevel: 12, maxLevel: 12 }, // Silcoon
      { speciesId: 268, weight: 5, minLevel: 12, maxLevel: 12 }, // Cascoon
      { speciesId: 163, weight: 10, minLevel: 12, maxLevel: 12 }, // Hoothoot (à noite)
      { speciesId: 92, weight: 4, minLevel: 13, maxLevel: 13 }, // Gastly (à noite)
      { speciesId: 267, weight: 1, minLevel: 14, maxLevel: 14 }, // Beautifly
      { speciesId: 269, weight: 1, minLevel: 14, maxLevel: 14 }, // Dustox
    ],
  },
  { id: 'eterna-city', name: 'Eterna City', unlockAt: 28_000, background: 'path.png', encounters: [] }, // gym: Gardenia

  // --- Trecho 3: Eterna → Hearthome (Fantina) ---
  {
    id: 'route-206',
    background: 'tall-grass.png',
    name: 'Rota 206',
    unlockAt: 35_000,
    encounters: [
      { speciesId: 74, weight: 30, minLevel: 16, maxLevel: 18 }, // Geodude
      { speciesId: 77, weight: 30, minLevel: 16, maxLevel: 17 }, // Ponyta
      { speciesId: 434, weight: 25, minLevel: 14, maxLevel: 16 }, // Stunky
      { speciesId: 207, weight: 20, minLevel: 16, maxLevel: 18 }, // Gligar
      { speciesId: 66, weight: 20, minLevel: 17, maxLevel: 19 }, // Machop
      { speciesId: 41, weight: 10, minLevel: 17, maxLevel: 17 }, // Zubat
    ],
  },
  {
    id: 'route-207',
    background: 'tall-grass.png',
    name: 'Rota 207',
    unlockAt: 43_000,
    encounters: [
      { speciesId: 66, weight: 45, minLevel: 5, maxLevel: 8 }, // Machop
      { speciesId: 74, weight: 30, minLevel: 5, maxLevel: 7 }, // Geodude
      { speciesId: 77, weight: 25, minLevel: 5, maxLevel: 7 }, // Ponyta
      { speciesId: 401, weight: 10, minLevel: 5, maxLevel: 6 }, // Kricketot
      { speciesId: 41, weight: 10, minLevel: 5, maxLevel: 5 }, // Zubat (à noite)
    ],
  },
  {
    id: 'mt-coronet',
    background: 'cave-3.png',
    name: 'Monte Coronet',
    unlockAt: 53_000,
    encounters: [
      { speciesId: 74, weight: 30, minLevel: 14, maxLevel: 19 }, // Geodude
      { speciesId: 41, weight: 20, minLevel: 14, maxLevel: 19 }, // Zubat
      { speciesId: 307, weight: 20, minLevel: 18, maxLevel: 20 }, // Meditite
      { speciesId: 436, weight: 20, minLevel: 18, maxLevel: 18 }, // Bronzor
      { speciesId: 35, weight: 10, minLevel: 17, maxLevel: 17 }, // Clefairy
      { speciesId: 433, weight: 10, minLevel: 17, maxLevel: 19 }, // Chingling
      { speciesId: 66, weight: 10, minLevel: 20, maxLevel: 20 }, // Machop
    ],
  },
  {
    id: 'route-208',
    background: 'tall-grass.png',
    name: 'Rota 208',
    unlockAt: 64_000,
    encounters: [
      { speciesId: 54, weight: 30, minLevel: 16, maxLevel: 18 }, // Psyduck
      { speciesId: 399, weight: 20, minLevel: 18, maxLevel: 18 }, // Bidoof
      { speciesId: 400, weight: 20, minLevel: 18, maxLevel: 20 }, // Bibarel
      { speciesId: 315, weight: 15, minLevel: 19, maxLevel: 20 }, // Roselia
      { speciesId: 280, weight: 15, minLevel: 17, maxLevel: 18 }, // Ralts
      { speciesId: 66, weight: 10, minLevel: 16, maxLevel: 17 }, // Machop
      { speciesId: 307, weight: 10, minLevel: 16, maxLevel: 17 }, // Meditite
      { speciesId: 406, weight: 10, minLevel: 18, maxLevel: 19 }, // Budew
      { speciesId: 41, weight: 10, minLevel: 19, maxLevel: 19 }, // Zubat (à noite)
    ],
  },
  { id: 'hearthome-city', name: 'Hearthome City', unlockAt: 76_000, background: 'path-2.png', encounters: [] }, // gym: Fantina

  // --- Trecho 4: Hearthome → Veilstone (Maylene) ---
  {
    id: 'route-209',
    background: 'tall-grass.png',
    name: 'Rota 209',
    unlockAt: 90_000,
    encounters: [
      { speciesId: 315, weight: 25, minLevel: 19, maxLevel: 20 }, // Roselia
      { speciesId: 400, weight: 30, minLevel: 18, maxLevel: 19 }, // Bibarel
      { speciesId: 280, weight: 20, minLevel: 17, maxLevel: 19 }, // Ralts
      { speciesId: 396, weight: 20, minLevel: 16, maxLevel: 16 }, // Starly
      { speciesId: 397, weight: 20, minLevel: 18, maxLevel: 19 }, // Staravia
      { speciesId: 41, weight: 10, minLevel: 19, maxLevel: 19 }, // Zubat (à noite)
      { speciesId: 92, weight: 10, minLevel: 19, maxLevel: 19 }, // Gastly (à noite)
      { speciesId: 355, weight: 10, minLevel: 17, maxLevel: 17 }, // Duskull (à noite)
    ],
  },
  { id: 'solaceon-town', name: 'Solaceon Town', unlockAt: 105_000, background: 'flowers.jpg', encounters: [] },
  {
    id: 'route-210',
    background: 'route-grass.webp',
    name: 'Rota 210',
    unlockAt: 122_000,
    encounters: [
      { speciesId: 77, weight: 35, minLevel: 19, maxLevel: 21 }, // Ponyta
      { speciesId: 402, weight: 30, minLevel: 18, maxLevel: 19 }, // Kricketune
      { speciesId: 397, weight: 20, minLevel: 19, maxLevel: 19 }, // Staravia
      { speciesId: 74, weight: 20, minLevel: 18, maxLevel: 18 }, // Geodude
      { speciesId: 315, weight: 15, minLevel: 20, maxLevel: 21 }, // Roselia
      { speciesId: 164, weight: 10, minLevel: 21, maxLevel: 21 }, // Noctowl
      { speciesId: 163, weight: 10, minLevel: 20, maxLevel: 20 }, // Hoothoot
      { speciesId: 113, weight: 5, minLevel: 19, maxLevel: 21 }, // Chansey
      { speciesId: 123, weight: 5, minLevel: 19, maxLevel: 19 }, // Scyther
    ],
  },
  {
    id: 'route-215',
    background: 'tall-grass.png',
    name: 'Rota 215',
    unlockAt: 140_000,
    encounters: [
      { speciesId: 397, weight: 30, minLevel: 19, maxLevel: 22 }, // Staravia
      { speciesId: 183, weight: 25, minLevel: 20, maxLevel: 22 }, // Marill
      { speciesId: 123, weight: 15, minLevel: 20, maxLevel: 22 }, // Scyther
      { speciesId: 108, weight: 10, minLevel: 20, maxLevel: 20 }, // Lickitung
      { speciesId: 402, weight: 10, minLevel: 20, maxLevel: 20 }, // Kricketune
      { speciesId: 63, weight: 10, minLevel: 19, maxLevel: 19 }, // Abra
      { speciesId: 64, weight: 10, minLevel: 21, maxLevel: 22 }, // Kadabra
    ],
  },
  { id: 'veilstone-city', name: 'Veilstone City', unlockAt: 160_000, background: 'mountain-2.png', encounters: [] }, // gym: Maylene

  // --- Trecho 5: Veilstone → Pastoria (Crasher Wake) ---
  {
    id: 'route-214',
    background: 'mountain.png',
    name: 'Rota 214',
    unlockAt: 182_000,
    encounters: [
      { speciesId: 75, weight: 25, minLevel: 21, maxLevel: 24 }, // Graveler
      { speciesId: 77, weight: 25, minLevel: 23, maxLevel: 24 }, // Ponyta
      { speciesId: 74, weight: 20, minLevel: 21, maxLevel: 24 }, // Geodude
      { speciesId: 111, weight: 20, minLevel: 21, maxLevel: 24 }, // Rhyhorn
      { speciesId: 402, weight: 20, minLevel: 22, maxLevel: 23 }, // Kricketune
      { speciesId: 228, weight: 15, minLevel: 22, maxLevel: 24 }, // Houndour (à noite)
      { speciesId: 41, weight: 10, minLevel: 22, maxLevel: 22 }, // Zubat (à noite)
    ],
  },
  {
    id: 'route-213',
    background: 'beach.png',
    name: 'Rota 213',
    unlockAt: 206_000,
    encounters: [
      { speciesId: 422, weight: 35, minLevel: 24, maxLevel: 26 }, // Shellos
      { speciesId: 418, weight: 25, minLevel: 23, maxLevel: 25 }, // Buizel
      { speciesId: 278, weight: 20, minLevel: 24, maxLevel: 26 }, // Wingull
      { speciesId: 441, weight: 20, minLevel: 23, maxLevel: 25 }, // Chatot
      { speciesId: 419, weight: 10, minLevel: 22, maxLevel: 22 }, // Floatzel
    ],
  },
  { id: 'pastoria-city', name: 'Pastoria City', unlockAt: 232_000, background: 'lake.png', encounters: [] }, // gym: Crasher Wake

  // --- Trecho 6: Pastoria → Canalave (Byron) ---
  {
    id: 'route-212',
    background: 'lake-night.png',
    name: 'Rota 212',
    unlockAt: 262_000,
    encounters: [
      { speciesId: 400, weight: 35, minLevel: 18, maxLevel: 20 }, // Bibarel
      { speciesId: 315, weight: 35, minLevel: 22, maxLevel: 24 }, // Roselia
      { speciesId: 183, weight: 25, minLevel: 21, maxLevel: 23 }, // Marill
      { speciesId: 195, weight: 30, minLevel: 24, maxLevel: 26 }, // Quagsire
      { speciesId: 281, weight: 20, minLevel: 22, maxLevel: 24 }, // Kirlia
      { speciesId: 397, weight: 20, minLevel: 21, maxLevel: 23 }, // Staravia
      { speciesId: 418, weight: 15, minLevel: 23, maxLevel: 25 }, // Buizel
      { speciesId: 280, weight: 10, minLevel: 22, maxLevel: 22 }, // Ralts
      { speciesId: 453, weight: 10, minLevel: 24, maxLevel: 25 }, // Croagunk
    ],
  },
  {
    id: 'route-218',
    background: 'route-grass.webp',
    name: 'Rota 218',
    unlockAt: 294_000,
    encounters: [
      { speciesId: 422, weight: 35, minLevel: 28, maxLevel: 30 }, // Shellos
      { speciesId: 419, weight: 30, minLevel: 29, maxLevel: 31 }, // Floatzel
      { speciesId: 122, weight: 25, minLevel: 29, maxLevel: 31 }, // Mr. Mime
      { speciesId: 441, weight: 20, minLevel: 28, maxLevel: 30 }, // Chatot
      { speciesId: 278, weight: 10, minLevel: 29, maxLevel: 30 }, // Wingull
    ],
  },
  {
    id: 'route-219',
    background: 'underwater.png',
    name: 'Rota 219',
    unlockAt: 328_000,
    encounters: [
      { speciesId: 72, weight: 60, minLevel: 20, maxLevel: 30 }, // Tentacool
      { speciesId: 278, weight: 30, minLevel: 20, maxLevel: 30 }, // Wingull
      { speciesId: 73, weight: 9, minLevel: 20, maxLevel: 40 }, // Tentacruel
      { speciesId: 279, weight: 1, minLevel: 20, maxLevel: 40 }, // Pelipper
    ],
  },
  {
    id: 'route-220',
    background: 'underwater.png',
    name: 'Rota 220',
    unlockAt: 364_000,
    encounters: [
      { speciesId: 72, weight: 60, minLevel: 20, maxLevel: 30 }, // Tentacool
      { speciesId: 278, weight: 30, minLevel: 20, maxLevel: 30 }, // Wingull
      { speciesId: 73, weight: 9, minLevel: 20, maxLevel: 40 }, // Tentacruel
      { speciesId: 279, weight: 1, minLevel: 20, maxLevel: 40 }, // Pelipper
    ],
  },
  {
    id: 'route-221',
    background: 'beach.png',
    name: 'Rota 221',
    unlockAt: 402_000,
    encounters: [
      { speciesId: 185, weight: 25, minLevel: 29, maxLevel: 31 }, // Sudowoodo
      { speciesId: 203, weight: 25, minLevel: 28, maxLevel: 30 }, // Girafarig
      { speciesId: 315, weight: 25, minLevel: 28, maxLevel: 30 }, // Roselia
      { speciesId: 419, weight: 25, minLevel: 29, maxLevel: 31 }, // Floatzel
      { speciesId: 72, weight: 60, minLevel: 20, maxLevel: 30 }, // Tentacool (Surf)
      { speciesId: 278, weight: 30, minLevel: 20, maxLevel: 30 }, // Wingull (Surf)
      { speciesId: 73, weight: 9, minLevel: 20, maxLevel: 40 }, // Tentacruel (Surf)
      { speciesId: 279, weight: 1, minLevel: 20, maxLevel: 40 }, // Pelipper (Surf)
    ],
  },
  { id: 'canalave-city', name: 'Canalave City', unlockAt: 442_000, background: 'ocean.png', encounters: [] }, // gym: Byron

  // --- Trecho 7: Canalave → Snowpoint (Candice) ---
  {
    id: 'route-211',
    background: 'tall-grass.png',
    name: 'Rota 211',
    unlockAt: 484_000,
    encounters: [
      { speciesId: 307, weight: 40, minLevel: 13, maxLevel: 15 }, // Meditite
      { speciesId: 399, weight: 20, minLevel: 14, maxLevel: 14 }, // Bidoof
      { speciesId: 66, weight: 15, minLevel: 14, maxLevel: 15 }, // Machop
      { speciesId: 433, weight: 15, minLevel: 14, maxLevel: 16 }, // Chingling
      { speciesId: 436, weight: 10, minLevel: 14, maxLevel: 16 }, // Bronzor
      { speciesId: 74, weight: 10, minLevel: 13, maxLevel: 13 }, // Geodude
      { speciesId: 77, weight: 10, minLevel: 13, maxLevel: 13 }, // Ponyta
      { speciesId: 41, weight: 10, minLevel: 14, maxLevel: 14 }, // Zubat (à noite)
      { speciesId: 163, weight: 10, minLevel: 15, maxLevel: 15 }, // Hoothoot (à noite)
    ],
  },
  {
    id: 'route-216',
    background: 'snow.png',
    name: 'Rota 216',
    unlockAt: 528_000,
    encounters: [
      { speciesId: 459, weight: 40, minLevel: 32, maxLevel: 35 }, // Snover
      { speciesId: 215, weight: 35, minLevel: 33, maxLevel: 35 }, // Sneasel
      { speciesId: 307, weight: 20, minLevel: 32, maxLevel: 33 }, // Meditite
      { speciesId: 164, weight: 10, minLevel: 33, maxLevel: 33 }, // Noctowl
      { speciesId: 361, weight: 10, minLevel: 33, maxLevel: 33 }, // Snorunt
      { speciesId: 67, weight: 10, minLevel: 34, maxLevel: 34 }, // Machoke
      { speciesId: 75, weight: 5, minLevel: 35, maxLevel: 35 }, // Graveler
      { speciesId: 41, weight: 10, minLevel: 32, maxLevel: 32 }, // Zubat (à noite)
    ],
  },
  {
    id: 'route-217',
    background: 'snow-night.png',
    name: 'Rota 217',
    unlockAt: 574_000,
    encounters: [
      { speciesId: 459, weight: 40, minLevel: 32, maxLevel: 35 }, // Snover
      { speciesId: 220, weight: 35, minLevel: 32, maxLevel: 34 }, // Swinub
      { speciesId: 215, weight: 25, minLevel: 33, maxLevel: 35 }, // Sneasel
      { speciesId: 308, weight: 20, minLevel: 35, maxLevel: 36 }, // Medicham
      { speciesId: 67, weight: 20, minLevel: 35, maxLevel: 36 }, // Machoke
      { speciesId: 307, weight: 10, minLevel: 35, maxLevel: 35 }, // Meditite
      { speciesId: 361, weight: 20, minLevel: 33, maxLevel: 33 }, // Snorunt (à noite)
      { speciesId: 41, weight: 10, minLevel: 35, maxLevel: 35 }, // Zubat (à noite)
      { speciesId: 164, weight: 10, minLevel: 35, maxLevel: 35 }, // Noctowl (à noite)
    ],
  },
  { id: 'snowpoint-city', name: 'Snowpoint City', unlockAt: 622_000, background: 'snow.png', encounters: [] }, // gym: Candice

  // --- Trecho 8: Snowpoint → Sunyshore (Volkner) → Elite Four → Campeã ---
  {
    id: 'route-222',
    background: 'tall-grass-night.png',
    name: 'Rota 222',
    unlockAt: 645_000,
    encounters: [
      { speciesId: 466, weight: 30, minLevel: 39, maxLevel: 41 }, // Electabuzz — Bulbapedia listed here; see nota no docs/ROTAS-SINNOH.md
      { speciesId: 419, weight: 20, minLevel: 40, maxLevel: 40 }, // Floatzel
      { speciesId: 432, weight: 15, minLevel: 41, maxLevel: 42 }, // Purugly
      { speciesId: 431, weight: 20, minLevel: 40, maxLevel: 40 }, // Glameow
      { speciesId: 422, weight: 10, minLevel: 40, maxLevel: 42 }, // Shellos
      { speciesId: 404, weight: 10, minLevel: 38, maxLevel: 40 }, // Luxio
      { speciesId: 81, weight: 10, minLevel: 39, maxLevel: 39 }, // Magnemite
      { speciesId: 278, weight: 10, minLevel: 38, maxLevel: 38 }, // Wingull
      { speciesId: 441, weight: 10, minLevel: 38, maxLevel: 38 }, // Chatot
      { speciesId: 82, weight: 5, minLevel: 41, maxLevel: 41 }, // Magneton
      { speciesId: 279, weight: 5, minLevel: 40, maxLevel: 40 }, // Pelipper
    ],
  },
  { id: 'sunyshore-city', name: 'Sunyshore City', unlockAt: 660_000, background: 'ocean-night.png', encounters: [] }, // gym: Volkner
  {
    id: 'route-223',
    background: 'underwater.png',
    name: 'Rota 223',
    unlockAt: 668_000,
    encounters: [
      { speciesId: 73, weight: 60, minLevel: 30, maxLevel: 50 }, // Tentacruel
      { speciesId: 279, weight: 30, minLevel: 30, maxLevel: 50 }, // Pelipper
      { speciesId: 458, weight: 10, minLevel: 30, maxLevel: 40 }, // Mantyke
    ],
  },
  {
    id: 'victory-road',
    background: 'mountain-night.png',
    name: 'Victory Road',
    unlockAt: 680_000,
    encounters: [
      { speciesId: 208, weight: 20, minLevel: 42, maxLevel: 44 }, // Steelix
      { speciesId: 112, weight: 15, minLevel: 41, maxLevel: 43 }, // Rhydon
      { speciesId: 111, weight: 20, minLevel: 41, maxLevel: 41 }, // Rhyhorn
      { speciesId: 75, weight: 15, minLevel: 42, maxLevel: 43 }, // Graveler
      { speciesId: 42, weight: 10, minLevel: 41, maxLevel: 43 }, // Golbat
      { speciesId: 82, weight: 30, minLevel: 41, maxLevel: 43 }, // Magneton
      { speciesId: 95, weight: 5, minLevel: 42, maxLevel: 42 }, // Onix
      { speciesId: 308, weight: 15, minLevel: 44, maxLevel: 47 }, // Medicham
      { speciesId: 444, weight: 5, minLevel: 41, maxLevel: 43 }, // Gabite
      { speciesId: 184, weight: 30, minLevel: 41, maxLevel: 43 }, // Azumarill
      { speciesId: 419, weight: 30, minLevel: 42, maxLevel: 44 }, // Floatzel
    ],
  },
]
