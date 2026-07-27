import type { LocationDefinition } from '../gen1/locations'

// Johto, New Bark Town → Victory Road (the 8-gym stretch, same shape as
// content/gen1/locations.ts's KANTO_LOCATIONS). docs/ROTAS-JOHTO.md has the
// full research this is sourced from (Bulbapedia, Pokémon Gold).
//
// Same simplifications as Kanto, plus two Gen II-specific ones (see the doc's
// own Metodologia section for the full reasoning):
// - Fishing, Headbutt and Rock Smash encounters are dropped entirely (not
//   just fishing, like Kanto — Gen II gates even more behind HMs/moves the
//   game doesn't model).
// - Gen II's morning/day/night split is folded into one table per location:
//   the day pool is the baseline, night-exclusive rows are added in on top,
//   unrenormalized — same "just add it to the pool" treatment Kanto already
//   gave Surf.
// - Multi-floor dungeons (Union Cave, Slowpoke Well, Mt. Mortar, Ice Path,
//   Victory Road) are collapsed the same way Kanto collapsed Mt. Moon/Rock
//   Tunnel/Seafoam/Victory Road: per-species weight summed across floors,
//   level range spans all floors.
//
// Trecho 6 (Jasmine) is a real gameplay beat with no new geography of its
// own — the player backtracks to Olivine after curing Amphy with Chuck's
// SecretPotion — so it's a second Olivine location entry ('olivine-city-gym')
// reusing the same encounter table, not a new place. See the doc's Trecho 6
// section for why this isn't merged into the first Olivine stop.
export const JOHTO_LOCATIONS: LocationDefinition[] = [
  { id: 'new-bark-town', name: 'New Bark Town', unlockAt: 0, background: 'flowers.jpg', encounters: [] },

  // --- Trecho 1: New Bark → Violet (Falkner) ---
  {
    id: 'route-29',
    background: 'tall-grass.png',
    name: 'Rota 29',
    unlockAt: 0,
    encounters: [
      { speciesId: 161, weight: 40, minLevel: 2, maxLevel: 3 }, // Sentret
      { speciesId: 16, weight: 55, minLevel: 2, maxLevel: 4 }, // Pidgey
      { speciesId: 187, weight: 5, minLevel: 3, maxLevel: 3 }, // Hoppip
      { speciesId: 163, weight: 85, minLevel: 2, maxLevel: 4 }, // Hoothoot
      { speciesId: 19, weight: 15, minLevel: 2, maxLevel: 4 }, // Rattata
    ],
  },
  {
    id: 'route-30',
    background: 'tall-grass.png',
    name: 'Rota 30',
    unlockAt: 300,
    encounters: [
      { speciesId: 10, weight: 50, minLevel: 3, maxLevel: 4 }, // Caterpie
      { speciesId: 11, weight: 10, minLevel: 4, maxLevel: 4 }, // Metapod
      { speciesId: 16, weight: 40, minLevel: 2, maxLevel: 4 }, // Pidgey
      { speciesId: 165, weight: 30, minLevel: 3, maxLevel: 3 }, // Ledyba
      { speciesId: 187, weight: 5, minLevel: 4, maxLevel: 4 }, // Hoppip
      { speciesId: 19, weight: 40, minLevel: 3, maxLevel: 4 }, // Rattata
      { speciesId: 163, weight: 30, minLevel: 4, maxLevel: 4 }, // Hoothoot
      { speciesId: 60, weight: 20, minLevel: 4, maxLevel: 4 }, // Poliwag
      { speciesId: 41, weight: 5, minLevel: 3, maxLevel: 3 }, // Zubat
    ],
  },
  {
    id: 'route-31',
    background: 'tall-grass-night.png',
    name: 'Rota 31',
    unlockAt: 800,
    encounters: [
      { speciesId: 69, weight: 20, minLevel: 3, maxLevel: 5 }, // Bellsprout
      { speciesId: 10, weight: 30, minLevel: 4, maxLevel: 5 }, // Caterpie
      { speciesId: 11, weight: 15, minLevel: 5, maxLevel: 5 }, // Metapod
      { speciesId: 16, weight: 30, minLevel: 3, maxLevel: 5 }, // Pidgey
      { speciesId: 165, weight: 30, minLevel: 4, maxLevel: 4 }, // Ledyba
      { speciesId: 187, weight: 5, minLevel: 5, maxLevel: 5 }, // Hoppip
      { speciesId: 163, weight: 40, minLevel: 5, maxLevel: 5 }, // Hoothoot
      { speciesId: 167, weight: 30, minLevel: 4, maxLevel: 4 }, // Spinarak
      { speciesId: 92, weight: 5, minLevel: 5, maxLevel: 5 }, // Gastly
      { speciesId: 41, weight: 5, minLevel: 4, maxLevel: 4 }, // Zubat
    ],
  },
  { id: 'violet-city', name: 'Violet City', unlockAt: 2_000, background: 'path.png', encounters: [] }, // gym: Falkner

  // --- Trecho 2: Violet → Azalea (Bugsy) ---
  {
    id: 'route-32',
    background: 'tall-grass.png',
    name: 'Rota 32',
    unlockAt: 4_000,
    encounters: [
      { speciesId: 19, weight: 40, minLevel: 4, maxLevel: 8 }, // Rattata
      { speciesId: 23, weight: 30, minLevel: 4, maxLevel: 4 }, // Ekans
      { speciesId: 69, weight: 30, minLevel: 6, maxLevel: 6 }, // Bellsprout
      { speciesId: 179, weight: 20, minLevel: 6, maxLevel: 6 }, // Mareep
      { speciesId: 187, weight: 10, minLevel: 6, maxLevel: 6 }, // Hoppip
      { speciesId: 194, weight: 4, minLevel: 4, maxLevel: 4 }, // Wooper
      { speciesId: 16, weight: 5, minLevel: 7, maxLevel: 7 }, // Pidgey
      { speciesId: 41, weight: 1, minLevel: 4, maxLevel: 4 }, // Zubat
      { speciesId: 194, weight: 35, minLevel: 6, maxLevel: 8 }, // Wooper (night)
      { speciesId: 92, weight: 5, minLevel: 7, maxLevel: 7 }, // Gastly (night)
      { speciesId: 163, weight: 5, minLevel: 7, maxLevel: 7 }, // Hoothoot (night)
      { speciesId: 72, weight: 60, minLevel: 15, maxLevel: 19 }, // Tentacool (Surf)
      { speciesId: 73, weight: 10, minLevel: 20, maxLevel: 24 }, // Tentacruel (Surf)
      { speciesId: 195, weight: 30, minLevel: 20, maxLevel: 24 }, // Quagsire (Surf)
    ],
  },
  {
    id: 'union-cave',
    background: 'cave.png',
    name: 'Caverna União',
    unlockAt: 8_000,
    encounters: [
      { speciesId: 41, weight: 80, minLevel: 5, maxLevel: 22 }, // Zubat
      { speciesId: 74, weight: 70, minLevel: 6, maxLevel: 21 }, // Geodude
      { speciesId: 19, weight: 50, minLevel: 4, maxLevel: 22 }, // Rattata
      { speciesId: 27, weight: 60, minLevel: 6, maxLevel: 8 }, // Sandshrew
      { speciesId: 95, weight: 20, minLevel: 6, maxLevel: 23 }, // Onix
      { speciesId: 20, weight: 30, minLevel: 22, maxLevel: 22 }, // Raticate
      { speciesId: 42, weight: 20, minLevel: 22, maxLevel: 22 }, // Golbat
      { speciesId: 194, weight: 120, minLevel: 15, maxLevel: 19 }, // Wooper (Surf)
      { speciesId: 195, weight: 70, minLevel: 15, maxLevel: 24 }, // Quagsire (Surf)
      { speciesId: 72, weight: 60, minLevel: 15, maxLevel: 19 }, // Tentacool (Surf)
      { speciesId: 73, weight: 10, minLevel: 20, maxLevel: 24 }, // Tentacruel (Surf)
    ],
  },
  {
    id: 'route-33',
    background: 'tall-grass.png',
    name: 'Rota 33',
    unlockAt: 13_000,
    encounters: [
      { speciesId: 19, weight: 40, minLevel: 6, maxLevel: 7 }, // Rattata
      { speciesId: 23, weight: 30, minLevel: 7, maxLevel: 7 }, // Ekans
      { speciesId: 187, weight: 35, minLevel: 6, maxLevel: 8 }, // Hoppip
      { speciesId: 21, weight: 20, minLevel: 6, maxLevel: 6 }, // Spearow
      { speciesId: 74, weight: 20, minLevel: 6, maxLevel: 6 }, // Geodude
      { speciesId: 41, weight: 5, minLevel: 4, maxLevel: 4 }, // Zubat
      { speciesId: 19, weight: 60, minLevel: 6, maxLevel: 7 }, // Rattata (night)
    ],
  },
  {
    id: 'slowpoke-well',
    background: 'cave-2.png',
    name: 'Poço do Slowpoke',
    unlockAt: 18_000,
    encounters: [
      { speciesId: 41, weight: 165, minLevel: 5, maxLevel: 23 }, // Zubat
      { speciesId: 79, weight: 30, minLevel: 6, maxLevel: 23 }, // Slowpoke
      { speciesId: 42, weight: 5, minLevel: 23, maxLevel: 23 }, // Golbat
      { speciesId: 79, weight: 190, minLevel: 10, maxLevel: 24 }, // Slowpoke (Surf)
      { speciesId: 80, weight: 10, minLevel: 20, maxLevel: 24 }, // Slowbro (Surf)
    ],
  },
  { id: 'azalea-town', name: 'Azalea Town', unlockAt: 24_000, background: 'forest.jpg', encounters: [] }, // gym: Bugsy

  // --- Trecho 3: Azalea → Goldenrod (Whitney) ---
  {
    id: 'ilex-forest',
    background: 'forest.jpg',
    name: 'Floresta Ilex',
    unlockAt: 32_000,
    encounters: [
      { speciesId: 10, weight: 50, minLevel: 5, maxLevel: 6 }, // Caterpie
      { speciesId: 13, weight: 50, minLevel: 5, maxLevel: 6 }, // Weedle
      { speciesId: 16, weight: 5, minLevel: 7, maxLevel: 7 }, // Pidgey
      { speciesId: 41, weight: 5, minLevel: 5, maxLevel: 5 }, // Zubat
      { speciesId: 46, weight: 15, minLevel: 5, maxLevel: 6 }, // Paras
      { speciesId: 43, weight: 60, minLevel: 5, maxLevel: 6 }, // Oddish (night)
      { speciesId: 48, weight: 30, minLevel: 5, maxLevel: 5 }, // Venonat (night)
      { speciesId: 41, weight: 25, minLevel: 5, maxLevel: 6 }, // Zubat (night)
      { speciesId: 46, weight: 15, minLevel: 5, maxLevel: 6 }, // Paras (night)
      { speciesId: 54, weight: 10, minLevel: 7, maxLevel: 7 }, // Psyduck (night)
      { speciesId: 163, weight: 5, minLevel: 7, maxLevel: 7 }, // Hoothoot (night)
      { speciesId: 54, weight: 90, minLevel: 10, maxLevel: 19 }, // Psyduck (Surf)
      { speciesId: 55, weight: 10, minLevel: 15, maxLevel: 19 }, // Golduck (Surf)
    ],
  },
  {
    id: 'route-34',
    background: 'tall-grass.png',
    name: 'Rota 34',
    unlockAt: 42_000,
    encounters: [
      { speciesId: 19, weight: 35, minLevel: 11, maxLevel: 13 }, // Rattata
      { speciesId: 16, weight: 20, minLevel: 12, maxLevel: 20 }, // Pidgey
      { speciesId: 209, weight: 30, minLevel: 10, maxLevel: 10 }, // Snubbull
      { speciesId: 63, weight: 10, minLevel: 10, maxLevel: 10 }, // Abra
      { speciesId: 39, weight: 5, minLevel: 12, maxLevel: 12 }, // Jigglypuff
      { speciesId: 132, weight: 5, minLevel: 10, maxLevel: 10 }, // Ditto
      { speciesId: 72, weight: 90, minLevel: 15, maxLevel: 24 }, // Tentacool (Surf)
      { speciesId: 73, weight: 10, minLevel: 20, maxLevel: 24 }, // Tentacruel (Surf)
    ],
  },
  { id: 'goldenrod-city', name: 'Goldenrod City', unlockAt: 55_000, background: 'path-2.png', encounters: [] }, // gym: Whitney

  // --- Trecho 4: Goldenrod → Ecruteak (Morty) ---
  {
    id: 'route-35',
    background: 'tall-grass.png',
    name: 'Rota 35',
    unlockAt: 70_000,
    encounters: [
      { speciesId: 29, weight: 30, minLevel: 12, maxLevel: 12 }, // Nidoran♀
      { speciesId: 32, weight: 30, minLevel: 12, maxLevel: 12 }, // Nidoran♂
      { speciesId: 209, weight: 30, minLevel: 12, maxLevel: 12 }, // Snubbull
      { speciesId: 96, weight: 20, minLevel: 14, maxLevel: 14 }, // Drowzee
      { speciesId: 58, weight: 20, minLevel: 13, maxLevel: 13 }, // Growlithe
      { speciesId: 63, weight: 10, minLevel: 10, maxLevel: 10 }, // Abra
      { speciesId: 16, weight: 5, minLevel: 14, maxLevel: 14 }, // Pidgey
      { speciesId: 39, weight: 5, minLevel: 12, maxLevel: 12 }, // Jigglypuff
      { speciesId: 132, weight: 4, minLevel: 10, maxLevel: 10 }, // Ditto
      { speciesId: 193, weight: 1, minLevel: 12, maxLevel: 12 }, // Yanma
      { speciesId: 163, weight: 5, minLevel: 14, maxLevel: 14 }, // Hoothoot (night)
      { speciesId: 54, weight: 90, minLevel: 15, maxLevel: 24 }, // Psyduck (Surf)
      { speciesId: 55, weight: 10, minLevel: 20, maxLevel: 24 }, // Golduck (Surf)
    ],
  },
  {
    id: 'national-park',
    background: 'flowers.jpg',
    name: 'Parque Nacional',
    unlockAt: 85_000,
    encounters: [
      { speciesId: 10, weight: 50, minLevel: 10, maxLevel: 12 }, // Caterpie
      { speciesId: 13, weight: 50, minLevel: 10, maxLevel: 12 }, // Weedle
      { speciesId: 11, weight: 30, minLevel: 10, maxLevel: 10 }, // Metapod
      { speciesId: 14, weight: 30, minLevel: 10, maxLevel: 10 }, // Kakuna
      { speciesId: 16, weight: 35, minLevel: 10, maxLevel: 14 }, // Pidgey
      { speciesId: 29, weight: 30, minLevel: 12, maxLevel: 12 }, // Nidoran♀
      { speciesId: 32, weight: 30, minLevel: 12, maxLevel: 12 }, // Nidoran♂
      { speciesId: 191, weight: 25, minLevel: 11, maxLevel: 13 }, // Sunkern
      { speciesId: 165, weight: 20, minLevel: 14, maxLevel: 14 }, // Ledyba
      { speciesId: 163, weight: 100, minLevel: 10, maxLevel: 14 }, // Hoothoot (night)
      { speciesId: 54, weight: 30, minLevel: 12, maxLevel: 12 }, // Psyduck (night)
      { speciesId: 167, weight: 20, minLevel: 14, maxLevel: 14 }, // Spinarak (night)
      { speciesId: 48, weight: 10, minLevel: 10, maxLevel: 12 }, // Venonat (night)
    ],
  },
  {
    id: 'route-36',
    background: 'tall-grass.png',
    name: 'Rota 36',
    unlockAt: 100_000,
    encounters: [
      { speciesId: 29, weight: 30, minLevel: 12, maxLevel: 12 }, // Nidoran♀
      { speciesId: 32, weight: 30, minLevel: 12, maxLevel: 12 }, // Nidoran♂
      { speciesId: 16, weight: 25, minLevel: 13, maxLevel: 15 }, // Pidgey
      { speciesId: 37, weight: 10, minLevel: 13, maxLevel: 13 }, // Vulpix
      { speciesId: 58, weight: 10, minLevel: 13, maxLevel: 13 }, // Growlithe
      { speciesId: 234, weight: 5, minLevel: 13, maxLevel: 13 }, // Stantler
      { speciesId: 163, weight: 25, minLevel: 13, maxLevel: 15 }, // Hoothoot (night)
    ],
  },
  {
    id: 'route-37',
    background: 'tall-grass.png',
    name: 'Rota 37',
    unlockAt: 115_000,
    encounters: [
      { speciesId: 16, weight: 60, minLevel: 13, maxLevel: 15 }, // Pidgey
      { speciesId: 165, weight: 30, minLevel: 13, maxLevel: 13 }, // Ledyba
      { speciesId: 37, weight: 15, minLevel: 14, maxLevel: 16 }, // Vulpix
      { speciesId: 58, weight: 15, minLevel: 14, maxLevel: 16 }, // Growlithe
      { speciesId: 17, weight: 5, minLevel: 15, maxLevel: 15 }, // Pidgeotto
      { speciesId: 163, weight: 60, minLevel: 13, maxLevel: 15 }, // Hoothoot (night)
      { speciesId: 167, weight: 30, minLevel: 13, maxLevel: 13 }, // Spinarak (night)
      { speciesId: 234, weight: 30, minLevel: 15, maxLevel: 15 }, // Stantler (night)
      { speciesId: 164, weight: 5, minLevel: 15, maxLevel: 15 }, // Noctowl (night)
    ],
  },
  { id: 'ecruteak-city', name: 'Ecruteak City', unlockAt: 135_000, background: 'path-night.png', encounters: [] }, // gym: Morty

  // --- Trecho 5: Ecruteak → Cianwood (Chuck) ---
  {
    id: 'route-38',
    background: 'route-grass.webp',
    name: 'Rota 38',
    unlockAt: 155_000,
    encounters: [
      { speciesId: 19, weight: 30, minLevel: 16, maxLevel: 16 }, // Rattata
      { speciesId: 20, weight: 30, minLevel: 16, maxLevel: 16 }, // Raticate
      { speciesId: 52, weight: 30, minLevel: 16, maxLevel: 16 }, // Meowth
      { speciesId: 81, weight: 20, minLevel: 16, maxLevel: 16 }, // Magnemite
      { speciesId: 17, weight: 10, minLevel: 16, maxLevel: 16 }, // Pidgeotto
      { speciesId: 83, weight: 10, minLevel: 16, maxLevel: 16 }, // Farfetch'd
      { speciesId: 241, weight: 5, minLevel: 13, maxLevel: 13 }, // Miltank
      { speciesId: 128, weight: 4, minLevel: 13, maxLevel: 13 }, // Tauros
      { speciesId: 209, weight: 1, minLevel: 13, maxLevel: 13 }, // Snubbull
    ],
  },
  {
    id: 'route-39',
    background: 'route-grass.webp',
    name: 'Rota 39',
    unlockAt: 175_000,
    encounters: [
      { speciesId: 19, weight: 30, minLevel: 16, maxLevel: 16 }, // Rattata
      { speciesId: 20, weight: 30, minLevel: 17, maxLevel: 17 }, // Raticate
      { speciesId: 52, weight: 30, minLevel: 16, maxLevel: 16 }, // Meowth
      { speciesId: 81, weight: 20, minLevel: 16, maxLevel: 16 }, // Magnemite
      { speciesId: 17, weight: 10, minLevel: 16, maxLevel: 16 }, // Pidgeotto
      { speciesId: 83, weight: 10, minLevel: 16, maxLevel: 16 }, // Farfetch'd
      { speciesId: 128, weight: 5, minLevel: 15, maxLevel: 15 }, // Tauros
      { speciesId: 241, weight: 5, minLevel: 15, maxLevel: 15 }, // Miltank
    ],
  },
  { id: 'olivine-city', name: 'Olivine City', unlockAt: 195_000, background: 'ocean.png', encounters: [] }, // passagem, ginásio fechado
  {
    id: 'route-40',
    background: 'underwater.png',
    name: 'Rota 40',
    unlockAt: 215_000,
    encounters: [
      { speciesId: 72, weight: 90, minLevel: 15, maxLevel: 24 }, // Tentacool (Surf)
      { speciesId: 73, weight: 10, minLevel: 20, maxLevel: 24 }, // Tentacruel (Surf)
    ],
  },
  {
    id: 'route-41',
    background: 'underwater.png',
    name: 'Rota 41',
    unlockAt: 235_000,
    encounters: [
      { speciesId: 72, weight: 70, minLevel: 15, maxLevel: 24 }, // Tentacool (Surf)
      { speciesId: 73, weight: 20, minLevel: 20, maxLevel: 24 }, // Tentacruel (Surf)
      { speciesId: 226, weight: 10, minLevel: 20, maxLevel: 24 }, // Mantine (Surf)
    ],
  },
  { id: 'cianwood-city', name: 'Cianwood City', unlockAt: 255_000, background: 'mountain-2.png', encounters: [] }, // gym: Chuck

  // --- Trecho 6: volta a Olivine (Jasmine) ---
  {
    id: 'olivine-city-gym',
    name: 'Olivine City (Farol)',
    unlockAt: 270_000,
    background: 'ocean.png',
    encounters: [],
  }, // gym: Jasmine — mesma água de olivine-city, ver nota em content/gen2/gyms.ts

  // --- Trecho 7: Olivine/Cianwood → Mahogany (Pryce) ---
  {
    id: 'route-42',
    background: 'mountain.png',
    name: 'Rota 42',
    unlockAt: 290_000,
    encounters: [
      { speciesId: 23, weight: 30, minLevel: 13, maxLevel: 13 }, // Ekans
      { speciesId: 56, weight: 30, minLevel: 15, maxLevel: 15 }, // Mankey
      { speciesId: 179, weight: 30, minLevel: 13, maxLevel: 13 }, // Mareep
      { speciesId: 21, weight: 30, minLevel: 14, maxLevel: 16 }, // Spearow
      { speciesId: 19, weight: 20, minLevel: 15, maxLevel: 15 }, // Rattata
      { speciesId: 180, weight: 10, minLevel: 15, maxLevel: 17 }, // Flaaffy
      { speciesId: 20, weight: 10, minLevel: 16, maxLevel: 16 }, // Raticate
      { speciesId: 22, weight: 5, minLevel: 16, maxLevel: 16 }, // Fearow
      { speciesId: 24, weight: 5, minLevel: 15, maxLevel: 15 }, // Arbok
      { speciesId: 118, weight: 90, minLevel: 15, maxLevel: 24 }, // Goldeen (Surf)
      { speciesId: 119, weight: 10, minLevel: 20, maxLevel: 24 }, // Seaking (Surf)
    ],
  },
  {
    id: 'mt-mortar',
    background: 'cave-3.png',
    name: 'Monte Mortar',
    unlockAt: 315_000,
    encounters: [
      { speciesId: 41, weight: 125, minLevel: 13, maxLevel: 17 }, // Zubat
      { speciesId: 74, weight: 75, minLevel: 13, maxLevel: 31 }, // Geodude
      { speciesId: 66, weight: 65, minLevel: 13, maxLevel: 16 }, // Machop
      { speciesId: 19, weight: 44, minLevel: 14, maxLevel: 16 }, // Rattata
      { speciesId: 20, weight: 20, minLevel: 14, maxLevel: 30 }, // Raticate
      { speciesId: 67, weight: 30, minLevel: 32, maxLevel: 32 }, // Machoke
      { speciesId: 75, weight: 30, minLevel: 31, maxLevel: 31 }, // Graveler
      { speciesId: 42, weight: 5, minLevel: 30, maxLevel: 30 }, // Golbat
      { speciesId: 183, weight: 1, minLevel: 15, maxLevel: 15 }, // Marill
      { speciesId: 118, weight: 180, minLevel: 15, maxLevel: 29 }, // Goldeen (Surf)
      { speciesId: 119, weight: 20, minLevel: 20, maxLevel: 29 }, // Seaking (Surf)
    ],
  },
  {
    id: 'lake-of-rage',
    background: 'lake-night.png',
    name: 'Lago da Fúria',
    unlockAt: 340_000,
    encounters: [
      { speciesId: 129, weight: 90, minLevel: 10, maxLevel: 19 }, // Magikarp
      { speciesId: 130, weight: 10, minLevel: 15, maxLevel: 19 }, // Gyarados
    ],
  },
  {
    id: 'route-43',
    background: 'forest.jpg',
    name: 'Rota 43',
    unlockAt: 365_000,
    encounters: [
      { speciesId: 161, weight: 30, minLevel: 15, maxLevel: 15 }, // Sentret
      { speciesId: 17, weight: 25, minLevel: 17, maxLevel: 17 }, // Pidgeotto
      { speciesId: 83, weight: 20, minLevel: 16, maxLevel: 16 }, // Farfetch'd
      { speciesId: 162, weight: 15, minLevel: 15, maxLevel: 17 }, // Furret
      { speciesId: 180, weight: 30, minLevel: 15, maxLevel: 15 }, // Flaaffy
      { speciesId: 179, weight: 10, minLevel: 15, maxLevel: 15 }, // Mareep
      { speciesId: 20, weight: 5, minLevel: 17, maxLevel: 17 }, // Raticate
      { speciesId: 48, weight: 5, minLevel: 16, maxLevel: 16 }, // Venonat
      { speciesId: 164, weight: 20, minLevel: 17, maxLevel: 17 }, // Noctowl (night)
      { speciesId: 48, weight: 15, minLevel: 16, maxLevel: 16 }, // Venonat (night)
      { speciesId: 129, weight: 100, minLevel: 10, maxLevel: 24 }, // Magikarp (Surf)
    ],
  },
  {
    id: 'route-44',
    background: 'forest.jpg',
    name: 'Rota 44',
    unlockAt: 390_000,
    encounters: [
      { speciesId: 108, weight: 40, minLevel: 22, maxLevel: 26 }, // Lickitung
      { speciesId: 70, weight: 35, minLevel: 22, maxLevel: 24 }, // Weepinbell
      { speciesId: 114, weight: 30, minLevel: 23, maxLevel: 23 }, // Tangela
      { speciesId: 69, weight: 20, minLevel: 22, maxLevel: 22 }, // Bellsprout
      { speciesId: 60, weight: 90, minLevel: 20, maxLevel: 29 }, // Poliwag (Surf)
      { speciesId: 61, weight: 10, minLevel: 25, maxLevel: 29 }, // Poliwhirl (Surf)
    ],
  },
  { id: 'mahogany-town', name: 'Mahogany Town', unlockAt: 415_000, background: 'snow.png', encounters: [] }, // gym: Pryce

  // --- Trecho 8: Mahogany → Blackthorn (Clair) ---
  {
    id: 'ice-path',
    background: 'snow-night.png',
    name: 'Caminho de Gelo',
    unlockAt: 440_000,
    encounters: [
      { speciesId: 220, weight: 160, minLevel: 21, maxLevel: 25 }, // Swinub
      { speciesId: 42, weight: 120, minLevel: 22, maxLevel: 24 }, // Golbat
      { speciesId: 41, weight: 100, minLevel: 22, maxLevel: 24 }, // Zubat
      { speciesId: 225, weight: 80, minLevel: 22, maxLevel: 24 }, // Delibird
      { speciesId: 124, weight: 20, minLevel: 22, maxLevel: 24 }, // Jynx
    ],
  },
  {
    id: 'route-45',
    background: 'mountain-2.png',
    name: 'Rota 45',
    unlockAt: 465_000,
    encounters: [
      { speciesId: 75, weight: 40, minLevel: 23, maxLevel: 27 }, // Graveler
      { speciesId: 74, weight: 30, minLevel: 23, maxLevel: 23 }, // Geodude
      { speciesId: 207, weight: 20, minLevel: 24, maxLevel: 24 }, // Gligar
      { speciesId: 231, weight: 10, minLevel: 20, maxLevel: 20 }, // Phanpy
      { speciesId: 227, weight: 5, minLevel: 27, maxLevel: 27 }, // Skarmory
      { speciesId: 129, weight: 100, minLevel: 5, maxLevel: 24 }, // Magikarp (Surf)
    ],
  },
  {
    id: 'route-46',
    background: 'mountain-2.png',
    name: 'Rota 46',
    unlockAt: 490_000,
    // Sprint 25 ("Balanceamento"): níveis 2-3 abaixo são os originais de
    // Bulbapedia (Pokémon Gold) — corretos lá, onde a Rota 46 é uma
    // "volta" que conecta perto de Violet City (bem no início do jogo),
    // mas aqui ela é a ÚLTIMA parada antes de Blackthorn/Clair (nível
    // médio ~38). Mesmo problema encontrado na Rota 22 de Kanto
    // (tests/simulations/progression.sim.test.ts): preso aqui treinando
    // pro ginásio ainda não vencido, o jogador nunca ganha XP suficiente.
    // Níveis ajustados pra ficarem entre o Caminho de Gelo/Rota 45
    // (~21-27) e Clair, mantendo as mesmas espécies pesquisadas.
    encounters: [
      { speciesId: 21, weight: 35, minLevel: 26, maxLevel: 30 }, // Spearow
      { speciesId: 74, weight: 40, minLevel: 26, maxLevel: 30 }, // Geodude
      { speciesId: 19, weight: 20, minLevel: 26, maxLevel: 28 }, // Rattata
      { speciesId: 39, weight: 5, minLevel: 27, maxLevel: 31 }, // Jigglypuff
    ],
  },
  { id: 'blackthorn-city', name: 'Blackthorn City', unlockAt: 520_000, background: 'snow.png', encounters: [] }, // gym: Clair

  // --- Rumo a Indigo Plateau (Elite Four + Campeão) ---
  {
    id: 'route-26',
    background: 'desert.png',
    name: 'Rota 26',
    unlockAt: 550_000,
    encounters: [
      { speciesId: 84, weight: 40, minLevel: 28, maxLevel: 30 }, // Doduo
      { speciesId: 28, weight: 30, minLevel: 28, maxLevel: 28 }, // Sandslash
      { speciesId: 77, weight: 20, minLevel: 32, maxLevel: 32 }, // Ponyta
      { speciesId: 85, weight: 5, minLevel: 30, maxLevel: 30 }, // Dodrio
      { speciesId: 20, weight: 4, minLevel: 30, maxLevel: 30 }, // Raticate
      { speciesId: 195, weight: 1, minLevel: 30, maxLevel: 30 }, // Quagsire
      { speciesId: 72, weight: 90, minLevel: 25, maxLevel: 34 }, // Tentacool (Surf)
      { speciesId: 73, weight: 10, minLevel: 30, maxLevel: 34 }, // Tentacruel (Surf)
    ],
  },
  {
    id: 'route-27',
    background: 'desert.png',
    name: 'Rota 27',
    unlockAt: 580_000,
    encounters: [
      { speciesId: 84, weight: 50, minLevel: 28, maxLevel: 30 }, // Doduo
      { speciesId: 20, weight: 30, minLevel: 28, maxLevel: 28 }, // Raticate
      { speciesId: 24, weight: 30, minLevel: 28, maxLevel: 28 }, // Arbok
      { speciesId: 195, weight: 10, minLevel: 28, maxLevel: 28 }, // Quagsire
      { speciesId: 28, weight: 5, minLevel: 30, maxLevel: 30 }, // Sandslash
      { speciesId: 77, weight: 5, minLevel: 32, maxLevel: 32 }, // Ponyta
      { speciesId: 85, weight: 5, minLevel: 30, maxLevel: 30 }, // Dodrio
      { speciesId: 164, weight: 40, minLevel: 28, maxLevel: 32 }, // Noctowl (night)
      { speciesId: 72, weight: 90, minLevel: 15, maxLevel: 24 }, // Tentacool (Surf)
      { speciesId: 73, weight: 10, minLevel: 20, maxLevel: 24 }, // Tentacruel (Surf)
    ],
  },
  {
    id: 'route-28',
    background: 'desert-night.png',
    name: 'Rota 28',
    unlockAt: 610_000,
    encounters: [
      { speciesId: 77, weight: 30, minLevel: 40, maxLevel: 40 }, // Ponyta
      { speciesId: 114, weight: 30, minLevel: 39, maxLevel: 39 }, // Tangela
      { speciesId: 78, weight: 10, minLevel: 42, maxLevel: 42 }, // Rapidash
      { speciesId: 24, weight: 10, minLevel: 42, maxLevel: 42 }, // Arbok
      { speciesId: 217, weight: 20, minLevel: 40, maxLevel: 40 }, // Ursaring
      { speciesId: 84, weight: 5, minLevel: 41, maxLevel: 41 }, // Doduo
      { speciesId: 85, weight: 5, minLevel: 43, maxLevel: 43 }, // Dodrio
      { speciesId: 61, weight: 40, minLevel: 40, maxLevel: 40 }, // Poliwhirl (night)
      { speciesId: 42, weight: 30, minLevel: 40, maxLevel: 42 }, // Golbat (night)
      { speciesId: 215, weight: 10, minLevel: 40, maxLevel: 40 }, // Sneasel (night)
      { speciesId: 60, weight: 90, minLevel: 35, maxLevel: 44 }, // Poliwag (Surf)
      { speciesId: 61, weight: 10, minLevel: 40, maxLevel: 44 }, // Poliwhirl (Surf)
    ],
  },
  {
    id: 'victory-road',
    background: 'mountain-night.png',
    name: 'Victory Road',
    unlockAt: 650_000,
    encounters: [
      { speciesId: 75, weight: 25, minLevel: 32, maxLevel: 40 }, // Graveler
      { speciesId: 42, weight: 20, minLevel: 32, maxLevel: 34 }, // Golbat
      { speciesId: 217, weight: 20, minLevel: 33, maxLevel: 33 }, // Ursaring
      { speciesId: 95, weight: 15, minLevel: 32, maxLevel: 36 }, // Onix
      { speciesId: 111, weight: 15, minLevel: 32, maxLevel: 35 }, // Rhyhorn
      { speciesId: 28, weight: 3, minLevel: 35, maxLevel: 35 }, // Sandslash
      { speciesId: 112, weight: 2, minLevel: 35, maxLevel: 35 }, // Rhydon
    ],
  },
]
