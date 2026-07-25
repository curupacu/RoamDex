export interface LocationEncounter {
  speciesId: number
  // Spawn weight within this location, mirroring the Pokémon Red-version
  // chance from Bulbapedia (see docs/ROTAS-KANTO.md) — not invented.
  weight: number
  // Discrete Bulbapedia level lists (e.g. "6, 8, 10, 12") were flattened to
  // a min-max range for simplicity — see docs/ROTAS-KANTO.md.
  minLevel: number
  maxLevel: number
}

export interface LocationDefinition {
  id: string
  name: string
  // Lifetime candies required to travel here from the previous location.
  // 0 for the run's starting location. Provisional — Sprint 25
  // ("Balanceamento") tunes these against real play data.
  unlockAt: number
  // Empty for towns/gyms, which have no wild grass.
  encounters: LocationEncounter[]
}

// Kanto, Pallet Town → Victory Road (the 8-gym stretch). docs/ROTAS-KANTO.md
// has the full research this is sourced from (Bulbapedia, Pokémon Red).
//
// Two simplifications applied uniformly here, per the project owner's call:
// - Fishing-rod encounters (Old/Good/Super Rod) are dropped — a separate
//   item+action mechanic the game doesn't have, unlike Surf.
// - Surf encounters are folded into the same pool as grass/cave "walking"
//   encounters ("finge que é chão normal, mesmo sendo água") — their
//   Bulbapedia weights are used as-is, unrenormalized, alongside the
//   walking table.
// - Multi-floor dungeons (Mt. Moon, Rock Tunnel, Seafoam Islands, Victory
//   Road) are collapsed into one location: per-species weight is the sum
//   across floors, level range is the min–max across floors. This keeps
//   each dungeon a single stop on the line instead of sub-areas.
export const KANTO_LOCATIONS: LocationDefinition[] = [
  { id: 'pallet-town', name: 'Pallet Town', unlockAt: 0, encounters: [] },
  {
    id: 'route-1',
    name: 'Rota 1',
    unlockAt: 0,
    encounters: [
      { speciesId: 16, weight: 50, minLevel: 2, maxLevel: 5 }, // Pidgey
      { speciesId: 19, weight: 50, minLevel: 2, maxLevel: 4 }, // Rattata
    ],
  },
  {
    id: 'route-2',
    name: 'Rota 2',
    unlockAt: 200,
    encounters: [
      { speciesId: 13, weight: 15, minLevel: 3, maxLevel: 5 }, // Weedle
      { speciesId: 16, weight: 45, minLevel: 3, maxLevel: 5 }, // Pidgey
      { speciesId: 19, weight: 40, minLevel: 2, maxLevel: 5 }, // Rattata
    ],
  },
  {
    id: 'viridian-forest',
    name: 'Floresta de Viridian',
    unlockAt: 600,
    encounters: [
      { speciesId: 10, weight: 5, minLevel: 3, maxLevel: 3 }, // Caterpie
      { speciesId: 11, weight: 5, minLevel: 4, maxLevel: 4 }, // Metapod
      { speciesId: 13, weight: 45, minLevel: 3, maxLevel: 5 }, // Weedle
      { speciesId: 14, weight: 40, minLevel: 4, maxLevel: 6 }, // Kakuna
      { speciesId: 25, weight: 5, minLevel: 3, maxLevel: 5 }, // Pikachu
    ],
  },
  { id: 'pewter-city', name: 'Pewter City', unlockAt: 1_500, encounters: [] }, // gym: Brock

  // --- Trecho 2: Pewter → Cerulean (Misty) ---
  {
    id: 'route-3',
    name: 'Rota 3',
    unlockAt: 3_000,
    encounters: [
      { speciesId: 16, weight: 45, minLevel: 6, maxLevel: 8 }, // Pidgey
      { speciesId: 21, weight: 45, minLevel: 5, maxLevel: 8 }, // Spearow
      { speciesId: 39, weight: 10, minLevel: 3, maxLevel: 7 }, // Jigglypuff
    ],
  },
  {
    id: 'mt-moon',
    name: 'Monte Moon',
    unlockAt: 6_000,
    encounters: [
      { speciesId: 35, weight: 11, minLevel: 8, maxLevel: 12 }, // Clefairy
      { speciesId: 41, weight: 188, minLevel: 6, maxLevel: 12 }, // Zubat
      { speciesId: 46, weight: 30, minLevel: 8, maxLevel: 12 }, // Paras
      { speciesId: 74, weight: 71, minLevel: 7, maxLevel: 10 }, // Geodude
    ],
  },
  {
    id: 'route-4',
    name: 'Rota 4',
    unlockAt: 10_000,
    encounters: [
      { speciesId: 19, weight: 40, minLevel: 8, maxLevel: 12 }, // Rattata
      { speciesId: 21, weight: 35, minLevel: 8, maxLevel: 12 }, // Spearow
      { speciesId: 23, weight: 25, minLevel: 6, maxLevel: 12 }, // Ekans
    ],
  },
  { id: 'cerulean-city', name: 'Cerulean City', unlockAt: 15_000, encounters: [] }, // gym: Misty

  // --- Trecho 3: Cerulean → Vermilion (Lt. Surge) ---
  {
    id: 'route-24',
    name: 'Rota 24',
    unlockAt: 20_000,
    encounters: [
      { speciesId: 13, weight: 20, minLevel: 7, maxLevel: 7 }, // Weedle
      { speciesId: 14, weight: 20, minLevel: 8, maxLevel: 8 }, // Kakuna
      { speciesId: 16, weight: 20, minLevel: 12, maxLevel: 13 }, // Pidgey
      { speciesId: 43, weight: 25, minLevel: 12, maxLevel: 14 }, // Oddish
      { speciesId: 63, weight: 15, minLevel: 8, maxLevel: 12 }, // Abra
    ],
  },
  {
    id: 'route-25',
    name: 'Rota 25',
    unlockAt: 25_000,
    encounters: [
      { speciesId: 10, weight: 1, minLevel: 8, maxLevel: 8 }, // Caterpie
      { speciesId: 11, weight: 4, minLevel: 7, maxLevel: 7 }, // Metapod
      { speciesId: 13, weight: 20, minLevel: 8, maxLevel: 8 }, // Weedle
      { speciesId: 14, weight: 20, minLevel: 9, maxLevel: 9 }, // Kakuna
      { speciesId: 16, weight: 15, minLevel: 13, maxLevel: 13 }, // Pidgey
      { speciesId: 43, weight: 25, minLevel: 12, maxLevel: 14 }, // Oddish
      { speciesId: 63, weight: 15, minLevel: 10, maxLevel: 12 }, // Abra
    ],
  },
  {
    id: 'route-5',
    name: 'Rota 5',
    unlockAt: 32_000,
    encounters: [
      { speciesId: 16, weight: 40, minLevel: 13, maxLevel: 16 }, // Pidgey
      { speciesId: 43, weight: 35, minLevel: 13, maxLevel: 16 }, // Oddish
      { speciesId: 56, weight: 25, minLevel: 10, maxLevel: 16 }, // Mankey
    ],
  },
  {
    id: 'route-6',
    name: 'Rota 6',
    unlockAt: 40_000,
    encounters: [
      { speciesId: 16, weight: 40, minLevel: 13, maxLevel: 16 }, // Pidgey
      { speciesId: 43, weight: 35, minLevel: 13, maxLevel: 16 }, // Oddish
      { speciesId: 56, weight: 25, minLevel: 10, maxLevel: 16 }, // Mankey
    ],
  },
  { id: 'vermilion-city', name: 'Vermilion City', unlockAt: 50_000, encounters: [] }, // gym: Lt. Surge

  // --- Trecho 4: Vermilion → Celadon (Erika) ---
  {
    id: 'route-11',
    name: 'Rota 11',
    unlockAt: 60_000,
    encounters: [
      { speciesId: 21, weight: 35, minLevel: 13, maxLevel: 17 }, // Spearow
      { speciesId: 23, weight: 40, minLevel: 12, maxLevel: 15 }, // Ekans
      { speciesId: 96, weight: 25, minLevel: 9, maxLevel: 15 }, // Drowzee
    ],
  },
  {
    id: 'diglett-cave',
    name: "Caverna do Diglett",
    unlockAt: 72_000,
    encounters: [
      { speciesId: 50, weight: 95, minLevel: 15, maxLevel: 22 }, // Diglett
      { speciesId: 51, weight: 5, minLevel: 29, maxLevel: 31 }, // Dugtrio
    ],
  },
  {
    id: 'route-9',
    name: 'Rota 9',
    unlockAt: 85_000,
    encounters: [
      { speciesId: 19, weight: 40, minLevel: 14, maxLevel: 17 }, // Rattata
      { speciesId: 21, weight: 35, minLevel: 13, maxLevel: 17 }, // Spearow
      { speciesId: 23, weight: 25, minLevel: 11, maxLevel: 17 }, // Ekans
    ],
  },
  {
    id: 'rock-tunnel',
    name: 'Túnel da Rocha',
    unlockAt: 100_000,
    encounters: [
      { speciesId: 41, weight: 105, minLevel: 15, maxLevel: 18 }, // Zubat
      { speciesId: 74, weight: 51, minLevel: 16, maxLevel: 18 }, // Geodude
      { speciesId: 66, weight: 30, minLevel: 15, maxLevel: 17 }, // Machop
      { speciesId: 95, weight: 14, minLevel: 13, maxLevel: 17 }, // Onix
    ],
  },
  {
    id: 'route-10',
    name: 'Rota 10',
    unlockAt: 115_000,
    encounters: [
      { speciesId: 21, weight: 35, minLevel: 13, maxLevel: 17 }, // Spearow
      { speciesId: 23, weight: 25, minLevel: 11, maxLevel: 17 }, // Ekans
      { speciesId: 100, weight: 40, minLevel: 14, maxLevel: 17 }, // Voltorb
    ],
  },
  {
    id: 'route-7',
    name: 'Rota 7',
    unlockAt: 130_000,
    encounters: [
      { speciesId: 16, weight: 30, minLevel: 19, maxLevel: 22 }, // Pidgey
      { speciesId: 43, weight: 30, minLevel: 19, maxLevel: 22 }, // Oddish
      { speciesId: 56, weight: 30, minLevel: 17, maxLevel: 20 }, // Mankey
      { speciesId: 58, weight: 10, minLevel: 18, maxLevel: 20 }, // Growlithe
    ],
  },
  {
    id: 'route-8',
    name: 'Rota 8',
    unlockAt: 145_000,
    encounters: [
      { speciesId: 16, weight: 30, minLevel: 18, maxLevel: 20 }, // Pidgey
      { speciesId: 23, weight: 20, minLevel: 17, maxLevel: 19 }, // Ekans
      { speciesId: 56, weight: 30, minLevel: 18, maxLevel: 20 }, // Mankey
      { speciesId: 58, weight: 20, minLevel: 15, maxLevel: 18 }, // Growlithe
    ],
  },
  { id: 'celadon-city', name: 'Celadon City', unlockAt: 165_000, encounters: [] }, // gym: Erika

  // --- Trecho 5: Celadon → Fuchsia (Koga) ---
  {
    id: 'route-16',
    name: 'Rota 16',
    unlockAt: 185_000,
    encounters: [
      { speciesId: 19, weight: 30, minLevel: 18, maxLevel: 22 }, // Rattata
      { speciesId: 20, weight: 5, minLevel: 23, maxLevel: 25 }, // Raticate
      { speciesId: 21, weight: 40, minLevel: 20, maxLevel: 22 }, // Spearow
      { speciesId: 84, weight: 25, minLevel: 18, maxLevel: 22 }, // Doduo
    ],
  },
  {
    id: 'route-17',
    name: 'Rota 17 (Cycling Road)',
    unlockAt: 205_000,
    encounters: [
      { speciesId: 20, weight: 30, minLevel: 25, maxLevel: 29 }, // Raticate
      { speciesId: 21, weight: 40, minLevel: 20, maxLevel: 22 }, // Spearow
      { speciesId: 22, weight: 5, minLevel: 25, maxLevel: 27 }, // Fearow
      { speciesId: 84, weight: 25, minLevel: 24, maxLevel: 28 }, // Doduo
    ],
  },
  {
    id: 'route-18',
    name: 'Rota 18',
    unlockAt: 225_000,
    encounters: [
      { speciesId: 20, weight: 20, minLevel: 25, maxLevel: 29 }, // Raticate
      { speciesId: 21, weight: 40, minLevel: 20, maxLevel: 22 }, // Spearow
      { speciesId: 22, weight: 15, minLevel: 25, maxLevel: 29 }, // Fearow
      { speciesId: 84, weight: 25, minLevel: 24, maxLevel: 28 }, // Doduo
    ],
  },
  { id: 'fuchsia-city', name: 'Fuchsia City', unlockAt: 245_000, encounters: [] }, // gym: Koga

  // --- Trecho 6: Fuchsia → Saffron (Sabrina) ---
  {
    id: 'route-15',
    name: 'Rota 15',
    unlockAt: 265_000,
    encounters: [
      { speciesId: 16, weight: 15, minLevel: 23, maxLevel: 23 }, // Pidgey
      { speciesId: 17, weight: 5, minLevel: 28, maxLevel: 30 }, // Pidgeotto
      { speciesId: 43, weight: 35, minLevel: 22, maxLevel: 26 }, // Oddish
      { speciesId: 44, weight: 5, minLevel: 30, maxLevel: 30 }, // Gloom
      { speciesId: 48, weight: 20, minLevel: 26, maxLevel: 28 }, // Venonat
      { speciesId: 132, weight: 20, minLevel: 26, maxLevel: 26 }, // Ditto
    ],
  },
  {
    id: 'route-14',
    name: 'Rota 14',
    unlockAt: 285_000,
    encounters: [
      { speciesId: 16, weight: 20, minLevel: 26, maxLevel: 26 }, // Pidgey
      { speciesId: 17, weight: 5, minLevel: 28, maxLevel: 30 }, // Pidgeotto
      { speciesId: 43, weight: 35, minLevel: 22, maxLevel: 26 }, // Oddish
      { speciesId: 44, weight: 5, minLevel: 30, maxLevel: 30 }, // Gloom
      { speciesId: 48, weight: 20, minLevel: 24, maxLevel: 26 }, // Venonat
      { speciesId: 132, weight: 15, minLevel: 23, maxLevel: 23 }, // Ditto
    ],
  },
  {
    id: 'route-13',
    name: 'Rota 13',
    unlockAt: 305_000,
    encounters: [
      { speciesId: 16, weight: 35, minLevel: 25, maxLevel: 27 }, // Pidgey
      { speciesId: 43, weight: 35, minLevel: 22, maxLevel: 26 }, // Oddish
      { speciesId: 44, weight: 5, minLevel: 28, maxLevel: 30 }, // Gloom
      { speciesId: 48, weight: 20, minLevel: 24, maxLevel: 26 }, // Venonat
      { speciesId: 132, weight: 5, minLevel: 25, maxLevel: 25 }, // Ditto
    ],
  },
  {
    id: 'route-12',
    name: 'Rota 12',
    unlockAt: 325_000,
    encounters: [
      { speciesId: 16, weight: 40, minLevel: 23, maxLevel: 27 }, // Pidgey
      { speciesId: 43, weight: 35, minLevel: 22, maxLevel: 26 }, // Oddish
      { speciesId: 44, weight: 5, minLevel: 28, maxLevel: 30 }, // Gloom
      { speciesId: 48, weight: 20, minLevel: 24, maxLevel: 26 }, // Venonat
    ],
  },
  { id: 'saffron-city', name: 'Saffron City', unlockAt: 345_000, encounters: [] }, // gym: Sabrina

  // --- Trecho 7: Saffron → Cinnabar (Blaine) ---
  {
    id: 'route-19',
    name: 'Rota 19',
    unlockAt: 365_000,
    encounters: [{ speciesId: 72, weight: 100, minLevel: 5, maxLevel: 40 }], // Tentacool (Surf)
  },
  {
    id: 'route-20',
    name: 'Rota 20',
    unlockAt: 385_000,
    encounters: [{ speciesId: 72, weight: 100, minLevel: 5, maxLevel: 40 }], // Tentacool (Surf)
  },
  {
    id: 'seafoam-islands',
    name: 'Ilhas Seafoam',
    unlockAt: 405_000,
    encounters: [
      { speciesId: 41, weight: 10, minLevel: 21, maxLevel: 21 }, // Zubat
      { speciesId: 42, weight: 10, minLevel: 29, maxLevel: 32 }, // Golbat
      { speciesId: 54, weight: 5, minLevel: 28, maxLevel: 28 }, // Psyduck
      { speciesId: 55, weight: 1, minLevel: 38, maxLevel: 38 }, // Golduck
      { speciesId: 79, weight: 115, minLevel: 28, maxLevel: 33 }, // Slowpoke
      { speciesId: 86, weight: 115, minLevel: 28, maxLevel: 33 }, // Seel
      { speciesId: 90, weight: 84, minLevel: 28, maxLevel: 33 }, // Shellder
      { speciesId: 116, weight: 115, minLevel: 28, maxLevel: 33 }, // Horsea
      { speciesId: 87, weight: 5, minLevel: 37, maxLevel: 38 }, // Dewgong
      { speciesId: 117, weight: 5, minLevel: 37, maxLevel: 39 }, // Seadra
      { speciesId: 120, weight: 30, minLevel: 30, maxLevel: 30 }, // Staryu
      { speciesId: 80, weight: 5, minLevel: 37, maxLevel: 39 }, // Slowbro
    ],
  },
  { id: 'cinnabar-island', name: 'Cinnabar Island', unlockAt: 425_000, encounters: [] }, // gym: Blaine

  // --- Trecho 8: volta a Viridian (Giovanni) → Victory Road ---
  {
    id: 'route-21',
    name: 'Rota 21',
    unlockAt: 445_000,
    encounters: [
      { speciesId: 16, weight: 30, minLevel: 21, maxLevel: 23 }, // Pidgey
      { speciesId: 17, weight: 15, minLevel: 30, maxLevel: 32 }, // Pidgeotto
      { speciesId: 19, weight: 30, minLevel: 21, maxLevel: 23 }, // Rattata
      { speciesId: 20, weight: 15, minLevel: 30, maxLevel: 30 }, // Raticate
      { speciesId: 114, weight: 10, minLevel: 28, maxLevel: 32 }, // Tangela
      { speciesId: 72, weight: 100, minLevel: 5, maxLevel: 40 }, // Tentacool (Surf)
    ],
  },
  {
    id: 'route-22',
    name: 'Rota 22',
    unlockAt: 465_000,
    encounters: [
      { speciesId: 19, weight: 45, minLevel: 2, maxLevel: 4 }, // Rattata
      { speciesId: 21, weight: 10, minLevel: 3, maxLevel: 5 }, // Spearow
      { speciesId: 29, weight: 5, minLevel: 3, maxLevel: 4 }, // Nidoran♀
      { speciesId: 32, weight: 40, minLevel: 2, maxLevel: 4 }, // Nidoran♂
    ],
  },
  {
    id: 'route-23',
    name: 'Rota 23',
    unlockAt: 485_000,
    encounters: [
      { speciesId: 21, weight: 15, minLevel: 26, maxLevel: 26 }, // Spearow
      { speciesId: 22, weight: 25, minLevel: 38, maxLevel: 43 }, // Fearow
      { speciesId: 23, weight: 20, minLevel: 26, maxLevel: 26 }, // Ekans
      { speciesId: 24, weight: 5, minLevel: 41, maxLevel: 41 }, // Arbok
      { speciesId: 132, weight: 35, minLevel: 33, maxLevel: 43 }, // Ditto
    ],
  },
  { id: 'viridian-city', name: 'Viridian City', unlockAt: 505_000, encounters: [] }, // gym: Giovanni (8ª insígnia)
  {
    id: 'victory-road',
    name: 'Victory Road',
    unlockAt: 525_000,
    encounters: [
      { speciesId: 41, weight: 45, minLevel: 22, maxLevel: 26 }, // Zubat
      { speciesId: 42, weight: 15, minLevel: 40, maxLevel: 41 }, // Golbat
      { speciesId: 66, weight: 60, minLevel: 22, maxLevel: 24 }, // Machop
      { speciesId: 67, weight: 14, minLevel: 41, maxLevel: 45 }, // Machoke
      { speciesId: 74, weight: 60, minLevel: 24, maxLevel: 26 }, // Geodude
      { speciesId: 75, weight: 11, minLevel: 41, maxLevel: 43 }, // Graveler
      { speciesId: 95, weight: 80, minLevel: 36, maxLevel: 45 }, // Onix
      { speciesId: 105, weight: 5, minLevel: 40, maxLevel: 43 }, // Marowak
      { speciesId: 49, weight: 10, minLevel: 40, maxLevel: 40 }, // Venomoth
    ],
  },
]
