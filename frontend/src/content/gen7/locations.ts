import type { LocationDefinition } from '../gen1/locations'

// Alola, Hau'oli City → Mount Lanakila (o trecho de 11 provações/grandes
// provações), mesmo formato de content/gen1/locations.ts's
// KANTO_LOCATIONS e as outras 7 regiões. docs/ROTAS-ALOLA.md tem a
// pesquisa completa (Bulbapedia, Pokémon Sun).
//
// Mesmas simplificações de sempre: pesca, Island Scan/QR Scanner e SOS
// Battles em encontros comuns ficam fora (só a convocação de aliado de
// Totem entrou, por ser estrutural pra provação); tabelas com % em faixa
// (ex. "20-30%") usam o primeiro número; sub-áreas multi-campo colapsadas
// numa linha por espécie. unlockAt é provisório, mesmo status de toda
// outra região.
//
// Mount Lanakila vira o id 'victory-road' (App.tsx depende desse literal
// em toda região) — é o caminho pra Elite Four, equivalente de verdade.
export const ALOLA_LOCATIONS: LocationDefinition[] = [
  {
    id: 'hauoli-city',
    name: "Hau'oli City",
    unlockAt: 0,
    background: 'path.png',
    encounters: [
      { speciesId: 63, weight: 25, minLevel: 5, maxLevel: 8 }, // Abra
      { speciesId: 19, weight: 20, minLevel: 5, maxLevel: 8 }, // Rattata Alolana
      { speciesId: 278, weight: 20, minLevel: 5, maxLevel: 8 }, // Wingull
      { speciesId: 734, weight: 20, minLevel: 5, maxLevel: 8 }, // Yungoos
      { speciesId: 81, weight: 10, minLevel: 5, maxLevel: 8 }, // Magnemite
      { speciesId: 88, weight: 10, minLevel: 5, maxLevel: 8 }, // Grimer Alolano
    ],
  },

  // --- Trecho 1: Hau'oli City → Verdant Cavern (Provação 1: Ilima, Normal) ---
  {
    id: 'route-1',
    name: 'Rota 1',
    unlockAt: 0,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 731, weight: 25, minLevel: 2, maxLevel: 13 }, // Pikipek
      { speciesId: 734, weight: 30, minLevel: 2, maxLevel: 13 }, // Yungoos
      { speciesId: 19, weight: 30, minLevel: 2, maxLevel: 13 }, // Rattata Alolana
      { speciesId: 165, weight: 20, minLevel: 2, maxLevel: 13 }, // Ledyba
      { speciesId: 167, weight: 20, minLevel: 2, maxLevel: 13 }, // Spinarak
      { speciesId: 10, weight: 20, minLevel: 2, maxLevel: 5 }, // Caterpie
    ],
  },
  {
    id: 'route-2',
    name: 'Rota 2',
    unlockAt: 300,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 21, weight: 40, minLevel: 7, maxLevel: 10 }, // Spearow
      { speciesId: 52, weight: 30, minLevel: 7, maxLevel: 10 }, // Meowth Alolano
      { speciesId: 96, weight: 20, minLevel: 7, maxLevel: 10 }, // Drowzee
      { speciesId: 58, weight: 20, minLevel: 7, maxLevel: 10 }, // Growlithe
      { speciesId: 742, weight: 20, minLevel: 7, maxLevel: 10 }, // Cutiefly
      { speciesId: 739, weight: 100, minLevel: 7, maxLevel: 10 }, // Crabrawler (monte de berries)
    ],
  },
  {
    id: 'route-3',
    name: 'Rota 3',
    unlockAt: 700,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 21, weight: 40, minLevel: 9, maxLevel: 12 }, // Spearow
      { speciesId: 56, weight: 20, minLevel: 9, maxLevel: 12 }, // Mankey
      { speciesId: 742, weight: 20, minLevel: 9, maxLevel: 12 }, // Cutiefly
      { speciesId: 627, weight: 30, minLevel: 11, maxLevel: 12 }, // Rufflet
      { speciesId: 629, weight: 30, minLevel: 11, maxLevel: 12 }, // Vullaby
      { speciesId: 739, weight: 100, minLevel: 9, maxLevel: 12 }, // Crabrawler (monte de berries)
    ],
  },
  {
    id: 'melemele-meadow',
    name: 'Melemele Meadow',
    unlockAt: 1_500,
    background: 'flowers.jpg',
    encounters: [
      { speciesId: 548, weight: 30, minLevel: 9, maxLevel: 12 }, // Petilil
      { speciesId: 741, weight: 20, minLevel: 9, maxLevel: 12 }, // Oricorio (Pom-Pom)
      { speciesId: 742, weight: 30, minLevel: 9, maxLevel: 12 }, // Cutiefly
      { speciesId: 10, weight: 10, minLevel: 9, maxLevel: 12 }, // Caterpie
    ],
  },
  {
    id: 'verdant-cavern',
    name: 'Verdant Cavern',
    unlockAt: 2_500,
    background: 'cave.png',
    encounters: [
      { speciesId: 41, weight: 70, minLevel: 8, maxLevel: 11 }, // Zubat
      { speciesId: 50, weight: 30, minLevel: 8, maxLevel: 11 }, // Diglett Alolano
    ],
  }, // provação: Ilima (Totem Gumshoos)

  // --- Trecho 2: Verdant Cavern → Iki Town (Grande Provação: Hala, Fighting) ---
  {
    id: 'ten-carat-hill',
    name: 'Ten Carat Hill',
    unlockAt: 3_000,
    background: 'cave-2.png',
    encounters: [
      { speciesId: 41, weight: 30, minLevel: 10, maxLevel: 13 }, // Zubat
      { speciesId: 524, weight: 25, minLevel: 10, maxLevel: 13 }, // Roggenrola
      { speciesId: 703, weight: 20, minLevel: 10, maxLevel: 13 }, // Carbink
      { speciesId: 66, weight: 30, minLevel: 10, maxLevel: 13 }, // Machop
      { speciesId: 744, weight: 20, minLevel: 10, maxLevel: 13 }, // Rockruff
    ],
  },
  { id: 'iki-town', name: 'Iki Town', unlockAt: 4_500, background: 'path.png', encounters: [] }, // grande provação: Hala

  // --- Trecho 3: Heahea → Brooklet Hill (Provação 3: Lana, Water) ---
  { id: 'heahea-city', name: 'Heahea City', unlockAt: 6_000, background: 'beach.png', encounters: [] },
  {
    id: 'route-4',
    name: 'Rota 4',
    unlockAt: 7_500,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 506, weight: 30, minLevel: 11, maxLevel: 14 }, // Lillipup
      { speciesId: 749, weight: 20, minLevel: 11, maxLevel: 14 }, // Mudbray
      { speciesId: 731, weight: 15, minLevel: 11, maxLevel: 14 }, // Pikipek
      { speciesId: 174, weight: 10, minLevel: 11, maxLevel: 14 }, // Igglybuff
      { speciesId: 739, weight: 100, minLevel: 11, maxLevel: 14 }, // Crabrawler (monte de berries)
    ],
  },
  {
    id: 'route-5',
    name: 'Rota 5',
    unlockAt: 9_500,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 753, weight: 30, minLevel: 13, maxLevel: 21 }, // Fomantis
      { speciesId: 506, weight: 30, minLevel: 13, maxLevel: 16 }, // Lillipup
      { speciesId: 731, weight: 20, minLevel: 13, maxLevel: 16 }, // Pikipek
      { speciesId: 732, weight: 20, minLevel: 18, maxLevel: 21 }, // Trumbeak
      { speciesId: 50, weight: 100, minLevel: 18, maxLevel: 21 }, // Diglett Alolano (nuvem de terra)
    ],
  },
  {
    id: 'route-6',
    name: 'Rota 6',
    unlockAt: 12_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 506, weight: 30, minLevel: 14, maxLevel: 17 }, // Lillipup
      { speciesId: 731, weight: 25, minLevel: 14, maxLevel: 17 }, // Pikipek
      { speciesId: 749, weight: 20, minLevel: 14, maxLevel: 17 }, // Mudbray
      { speciesId: 174, weight: 10, minLevel: 14, maxLevel: 17 }, // Igglybuff
      { speciesId: 133, weight: 5, minLevel: 14, maxLevel: 17 }, // Eevee
    ],
  },
  {
    id: 'route-7',
    name: 'Rota 7',
    unlockAt: 15_000,
    background: 'ocean.png',
    encounters: [
      { speciesId: 129, weight: 79, minLevel: 10, maxLevel: 19 }, // Magikarp (pesca)
      { speciesId: 456, weight: 30, minLevel: 16, maxLevel: 19 }, // Finneon
      { speciesId: 72, weight: 30, minLevel: 16, maxLevel: 19 }, // Tentacool
      { speciesId: 746, weight: 20, minLevel: 10, maxLevel: 19 }, // Wishiwashi
      { speciesId: 50, weight: 100, minLevel: 16, maxLevel: 19 }, // Diglett Alolano (nuvem de terra)
    ],
  },
  {
    id: 'route-8',
    name: 'Rota 8',
    unlockAt: 18_000,
    background: 'beach.png',
    encounters: [
      { speciesId: 19, weight: 30, minLevel: 17, maxLevel: 20 }, // Rattata Alolana
      { speciesId: 731, weight: 30, minLevel: 17, maxLevel: 20 }, // Pikipek
      { speciesId: 734, weight: 30, minLevel: 17, maxLevel: 20 }, // Yungoos
      { speciesId: 757, weight: 20, minLevel: 17, maxLevel: 20 }, // Salandit
      { speciesId: 129, weight: 79, minLevel: 10, maxLevel: 20 }, // Magikarp (pesca)
      { speciesId: 767, weight: 100, minLevel: 17, maxLevel: 20 }, // Wimpod (perseguição)
    ],
  },
  {
    id: 'route-9',
    name: 'Rota 9',
    unlockAt: 20_000,
    background: 'ocean.png',
    encounters: [
      { speciesId: 370, weight: 70, minLevel: 10, maxLevel: 23 }, // Luvdisc
      { speciesId: 129, weight: 15, minLevel: 10, maxLevel: 23 }, // Magikarp
      { speciesId: 746, weight: 10, minLevel: 10, maxLevel: 23 }, // Wishiwashi
      { speciesId: 222, weight: 5, minLevel: 10, maxLevel: 23 }, // Corsola
    ],
  },
  { id: 'paniola-town', name: 'Paniola Town', unlockAt: 21_000, background: 'path.png', encounters: [] },
  {
    id: 'paniola-ranch',
    name: 'Paniola Ranch',
    unlockAt: 22_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 749, weight: 50, minLevel: 12, maxLevel: 15 }, // Mudbray
      { speciesId: 506, weight: 40, minLevel: 12, maxLevel: 15 }, // Lillipup
      { speciesId: 128, weight: 5, minLevel: 12, maxLevel: 15 }, // Tauros
      { speciesId: 241, weight: 5, minLevel: 12, maxLevel: 15 }, // Miltank
    ],
  },
  {
    id: 'brooklet-hill',
    name: 'Brooklet Hill',
    unlockAt: 24_000,
    background: 'lake.png',
    encounters: [
      { speciesId: 751, weight: 30, minLevel: 14, maxLevel: 17 }, // Dewpider
      { speciesId: 283, weight: 25, minLevel: 14, maxLevel: 17 }, // Surskit
      { speciesId: 46, weight: 20, minLevel: 14, maxLevel: 17 }, // Paras
      { speciesId: 755, weight: 20, minLevel: 14, maxLevel: 17 }, // Morelull
      { speciesId: 60, weight: 10, minLevel: 14, maxLevel: 17 }, // Poliwag
    ],
  }, // provação: Lana (Totem Wishiwashi)

  // --- Trecho 4: Brooklet Hill → Wela Volcano Park (Provação 4: Kiawe, Fire) ---
  {
    id: 'wela-volcano-park',
    name: 'Wela Volcano Park',
    unlockAt: 27_000,
    background: 'mountain.png',
    encounters: [
      { speciesId: 661, weight: 30, minLevel: 16, maxLevel: 19 }, // Fletchling
      { speciesId: 757, weight: 30, minLevel: 16, maxLevel: 19 }, // Salandit
      { speciesId: 104, weight: 24, minLevel: 16, maxLevel: 19 }, // Cubone
      { speciesId: 240, weight: 15, minLevel: 16, maxLevel: 19 }, // Magby
    ],
  }, // provação: Kiawe (Totem Salazzle)

  // --- Trecho 5: Wela Volcano Park → Lush Jungle (Provação 5: Mallow, Grass) ---
  {
    id: 'lush-jungle',
    name: 'Lush Jungle',
    unlockAt: 32_000,
    background: 'forest.jpg',
    encounters: [
      { speciesId: 753, weight: 20, minLevel: 18, maxLevel: 21 }, // Fomantis
      { speciesId: 755, weight: 20, minLevel: 18, maxLevel: 21 }, // Morelull
      { speciesId: 764, weight: 15, minLevel: 18, maxLevel: 21 }, // Comfey
      { speciesId: 46, weight: 15, minLevel: 18, maxLevel: 21 }, // Paras
      { speciesId: 732, weight: 15, minLevel: 18, maxLevel: 21 }, // Trumbeak
      { speciesId: 438, weight: 15, minLevel: 18, maxLevel: 21 }, // Bonsly
    ],
  }, // provação: Mallow (Totem Lurantis)

  // --- Trecho 6: Lush Jungle → Akala Outskirts (Grande Provação: Olivia, Rock) ---
  {
    id: 'digletts-tunnel',
    name: "Diglett's Tunnel",
    unlockAt: 38_000,
    background: 'cave-3.png',
    encounters: [
      { speciesId: 41, weight: 70, minLevel: 19, maxLevel: 22 }, // Zubat
      { speciesId: 50, weight: 30, minLevel: 19, maxLevel: 22 }, // Diglett Alolano
    ],
  },
  { id: 'konikoni-city', name: 'Konikoni City', unlockAt: 40_000, background: 'path.png', encounters: [] },
  {
    id: 'memorial-hill',
    name: 'Memorial Hill',
    unlockAt: 42_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 92, weight: 50, minLevel: 20, maxLevel: 23 }, // Gastly
      { speciesId: 708, weight: 30, minLevel: 20, maxLevel: 23 }, // Phantump
      { speciesId: 41, weight: 20, minLevel: 20, maxLevel: 23 }, // Zubat
    ],
  },
  {
    id: 'akala-outskirts',
    name: 'Akala Outskirts',
    unlockAt: 45_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 278, weight: 50, minLevel: 20, maxLevel: 23 }, // Wingull
      { speciesId: 20, weight: 30, minLevel: 20, maxLevel: 23 }, // Raticate Alolana
      { speciesId: 735, weight: 30, minLevel: 20, maxLevel: 23 }, // Gumshoos
      { speciesId: 299, weight: 15, minLevel: 20, maxLevel: 23 }, // Nosepass
    ],
  }, // grande provação: Olivia

  // --- Trecho 7: Malie City → Mount Hokulani (Provação 7: Sophocles, Electric) ---
  {
    id: 'malie-city',
    name: 'Malie City',
    unlockAt: 55_000,
    background: 'path-2.png',
    encounters: [
      { speciesId: 568, weight: 30, minLevel: 24, maxLevel: 27 }, // Trubbish
      { speciesId: 88, weight: 30, minLevel: 24, maxLevel: 27 }, // Grimer Alolano
      { speciesId: 20, weight: 20, minLevel: 24, maxLevel: 27 }, // Raticate Alolana
      { speciesId: 81, weight: 20, minLevel: 24, maxLevel: 27 }, // Magnemite
      { speciesId: 735, weight: 20, minLevel: 24, maxLevel: 27 }, // Gumshoos
    ],
  },
  {
    id: 'route-10',
    name: 'Rota 10',
    unlockAt: 62_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 22, weight: 30, minLevel: 24, maxLevel: 27 }, // Fearow
      { speciesId: 20, weight: 30, minLevel: 24, maxLevel: 27 }, // Raticate Alolana
      { speciesId: 735, weight: 30, minLevel: 24, maxLevel: 27 }, // Gumshoos
      { speciesId: 166, weight: 20, minLevel: 24, maxLevel: 27 }, // Ledian
      { speciesId: 168, weight: 20, minLevel: 24, maxLevel: 27 }, // Ariados
      { speciesId: 739, weight: 100, minLevel: 24, maxLevel: 27 }, // Crabrawler (monte de berries)
    ],
  },
  {
    id: 'route-11',
    name: 'Rota 11',
    unlockAt: 70_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 20, weight: 20, minLevel: 24, maxLevel: 27 }, // Raticate Alolana
      { speciesId: 166, weight: 20, minLevel: 24, maxLevel: 27 }, // Ledian
      { speciesId: 674, weight: 20, minLevel: 24, maxLevel: 27 }, // Pancham
      { speciesId: 732, weight: 20, minLevel: 24, maxLevel: 27 }, // Trumbeak
      { speciesId: 735, weight: 20, minLevel: 24, maxLevel: 27 }, // Gumshoos
    ],
  },
  {
    id: 'mount-hokulani',
    name: 'Mount Hokulani',
    unlockAt: 78_000,
    background: 'mountain-2.png',
    encounters: [
      { speciesId: 22, weight: 30, minLevel: 25, maxLevel: 28 }, // Fearow
      { speciesId: 132, weight: 10, minLevel: 25, maxLevel: 28 }, // Ditto
      { speciesId: 227, weight: 10, minLevel: 25, maxLevel: 28 }, // Skarmory
      { speciesId: 173, weight: 10, minLevel: 25, maxLevel: 28 }, // Cleffa
      { speciesId: 374, weight: 10, minLevel: 25, maxLevel: 28 }, // Beldum
    ],
  }, // provação: Sophocles (Totem Vikavolt)

  // --- Trecho 8: Mount Hokulani → Thrifty Megamart (Provação 8: Acerola, Ghost) ---
  {
    id: 'route-12',
    name: 'Rota 12',
    unlockAt: 90_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 74, weight: 40, minLevel: 25, maxLevel: 29 }, // Geodude Alolano
      { speciesId: 749, weight: 30, minLevel: 25, maxLevel: 29 }, // Mudbray
      { speciesId: 324, weight: 20, minLevel: 25, maxLevel: 29 }, // Torkoal
      { speciesId: 239, weight: 10, minLevel: 25, maxLevel: 29 }, // Elekid
    ],
  },
  {
    id: 'route-13',
    name: 'Rota 13',
    unlockAt: 100_000,
    background: 'ocean.png',
    encounters: [
      { speciesId: 129, weight: 79, minLevel: 10, maxLevel: 30 }, // Magikarp (pesca)
      { speciesId: 746, weight: 30, minLevel: 10, maxLevel: 30 }, // Wishiwashi
      { speciesId: 779, weight: 20, minLevel: 10, maxLevel: 30 }, // Bruxish
    ],
  },
  {
    id: 'blush-mountain',
    name: 'Blush Mountain',
    unlockAt: 112_000,
    background: 'mountain.png',
    encounters: [
      { speciesId: 74, weight: 30, minLevel: 27, maxLevel: 30 }, // Geodude Alolano
      { speciesId: 749, weight: 20, minLevel: 27, maxLevel: 30 }, // Mudbray
      { speciesId: 776, weight: 10, minLevel: 27, maxLevel: 30 }, // Turtonator
      { speciesId: 777, weight: 10, minLevel: 27, maxLevel: 30 }, // Togedemaru
      { speciesId: 737, weight: 10, minLevel: 27, maxLevel: 30 }, // Charjabug
      { speciesId: 239, weight: 10, minLevel: 27, maxLevel: 30 }, // Elekid
      { speciesId: 324, weight: 10, minLevel: 27, maxLevel: 30 }, // Torkoal
    ],
  },
  {
    id: 'tapu-village',
    name: 'Tapu Village',
    unlockAt: 125_000,
    background: 'flowers.jpg',
    encounters: [
      { speciesId: 20, weight: 30, minLevel: 28, maxLevel: 31 }, // Raticate Alolana
      { speciesId: 279, weight: 30, minLevel: 28, maxLevel: 31 }, // Pelipper
      { speciesId: 735, weight: 30, minLevel: 28, maxLevel: 31 }, // Gumshoos
      { speciesId: 361, weight: 20, minLevel: 28, maxLevel: 31 }, // Snorunt
      { speciesId: 27, weight: 10, minLevel: 28, maxLevel: 31 }, // Sandshrew Alolano
      { speciesId: 37, weight: 10, minLevel: 28, maxLevel: 31 }, // Vulpix Alolano
      { speciesId: 359, weight: 10, minLevel: 28, maxLevel: 31 }, // Absol
    ],
  },
  { id: 'po-town', name: 'Po Town', unlockAt: 132_000, background: 'path-night.png', encounters: [] },
  {
    id: 'thrifty-megamart',
    name: 'Thrifty Megamart',
    unlockAt: 140_000,
    background: 'cave-night.png',
    encounters: [
      { speciesId: 42, weight: 40, minLevel: 29, maxLevel: 32 }, // Golbat
      { speciesId: 93, weight: 40, minLevel: 29, maxLevel: 32 }, // Haunter
      { speciesId: 707, weight: 15, minLevel: 29, maxLevel: 32 }, // Klefki
      { speciesId: 778, weight: 5, minLevel: 29, maxLevel: 32 }, // Mimikyu
    ],
  }, // provação: Acerola (Totem Mimikyu)

  // --- Trecho 9: Thrifty Megamart → Malie City (Grande Provação: Nanu, Dark) ---
  {
    id: 'route-14',
    name: 'Rota 14',
    unlockAt: 155_000,
    background: 'ocean.png',
    encounters: [
      { speciesId: 279, weight: 20, minLevel: 28, maxLevel: 31 }, // Pelipper
      { speciesId: 72, weight: 40, minLevel: 28, maxLevel: 31 }, // Tentacool
      { speciesId: 456, weight: 40, minLevel: 28, maxLevel: 31 }, // Finneon
      { speciesId: 129, weight: 79, minLevel: 10, maxLevel: 31 }, // Magikarp (pesca)
    ],
  },
  {
    id: 'route-15',
    name: 'Rota 15',
    unlockAt: 168_000,
    background: 'ocean.png',
    encounters: [
      { speciesId: 20, weight: 30, minLevel: 30, maxLevel: 33 }, // Raticate Alolana
      { speciesId: 79, weight: 20, minLevel: 30, maxLevel: 33 }, // Slowpoke
      { speciesId: 279, weight: 20, minLevel: 30, maxLevel: 33 }, // Pelipper
      { speciesId: 735, weight: 30, minLevel: 30, maxLevel: 33 }, // Gumshoos
      { speciesId: 129, weight: 79, minLevel: 10, maxLevel: 33 }, // Magikarp (pesca)
    ],
  },
  {
    id: 'route-16',
    name: 'Rota 16',
    unlockAt: 182_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 20, weight: 30, minLevel: 30, maxLevel: 33 }, // Raticate Alolana
      { speciesId: 79, weight: 20, minLevel: 30, maxLevel: 33 }, // Slowpoke
      { speciesId: 279, weight: 50, minLevel: 30, maxLevel: 33 }, // Pelipper
      { speciesId: 735, weight: 30, minLevel: 30, maxLevel: 33 }, // Gumshoos
      { speciesId: 739, weight: 100, minLevel: 30, maxLevel: 33 }, // Crabrawler (monte de berries)
    ],
  },
  {
    id: 'route-17',
    name: 'Rota 17',
    unlockAt: 198_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 20, weight: 30, minLevel: 31, maxLevel: 34 }, // Raticate Alolana
      { speciesId: 22, weight: 30, minLevel: 31, maxLevel: 34 }, // Fearow
      { speciesId: 166, weight: 20, minLevel: 31, maxLevel: 34 }, // Ledian
      { speciesId: 735, weight: 30, minLevel: 31, maxLevel: 34 }, // Gumshoos
      { speciesId: 75, weight: 20, minLevel: 31, maxLevel: 34 }, // Graveler Alolano
    ],
  },
  { id: 'aether-house', name: 'Aether House', unlockAt: 210_000, background: 'path.png', encounters: [] },
  {
    id: 'haina-desert',
    name: 'Haina Desert',
    unlockAt: 218_000,
    background: 'desert.png',
    encounters: [
      { speciesId: 551, weight: 70, minLevel: 28, maxLevel: 31 }, // Sandile
      { speciesId: 51, weight: 20, minLevel: 28, maxLevel: 31 }, // Dugtrio Alolano
      { speciesId: 328, weight: 10, minLevel: 28, maxLevel: 31 }, // Trapinch
    ],
  }, // grande provação: Nanu

  // --- Trecho 10: Rumo a Poni (Provação 10: Totem Kommo-o, Dragon) ---
  {
    id: 'seafolk-village',
    name: 'Seafolk Village',
    unlockAt: 235_000,
    background: 'beach.png',
    encounters: [
      { speciesId: 129, weight: 79, minLevel: 10, maxLevel: 43 }, // Magikarp
      { speciesId: 320, weight: 20, minLevel: 10, maxLevel: 43 }, // Wailmer
      { speciesId: 781, weight: 1, minLevel: 10, maxLevel: 43 }, // Dhelmise
    ],
  },
  {
    id: 'poni-meadow',
    name: 'Poni Meadow',
    unlockAt: 250_000,
    background: 'flowers.jpg',
    encounters: [
      { speciesId: 546, weight: 50, minLevel: 54, maxLevel: 57 }, // Cottonee
      { speciesId: 548, weight: 50, minLevel: 54, maxLevel: 57 }, // Petilil
      { speciesId: 743, weight: 30, minLevel: 54, maxLevel: 57 }, // Ribombee
      { speciesId: 741, weight: 20, minLevel: 54, maxLevel: 57 }, // Oricorio (Sensu)
    ],
  },
  {
    id: 'poni-wilds',
    name: 'Poni Wilds',
    unlockAt: 268_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 210, weight: 20, minLevel: 40, maxLevel: 43 }, // Granbull
      { speciesId: 279, weight: 20, minLevel: 40, maxLevel: 43 }, // Pelipper
      { speciesId: 20, weight: 30, minLevel: 40, maxLevel: 43 }, // Raticate Alolana
      { speciesId: 102, weight: 10, minLevel: 40, maxLevel: 43 }, // Exeggcute
      { speciesId: 423, weight: 10, minLevel: 40, maxLevel: 43 }, // Gastrodon (Mar do Leste)
      { speciesId: 767, weight: 100, minLevel: 40, maxLevel: 43 }, // Wimpod (perseguição)
    ],
  },
  {
    id: 'ancient-poni-path',
    name: 'Ancient Poni Path',
    unlockAt: 282_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 210, weight: 20, minLevel: 40, maxLevel: 43 }, // Granbull
      { speciesId: 279, weight: 30, minLevel: 40, maxLevel: 43 }, // Pelipper
      { speciesId: 20, weight: 30, minLevel: 40, maxLevel: 43 }, // Raticate Alolana
      { speciesId: 102, weight: 10, minLevel: 40, maxLevel: 43 }, // Exeggcute
      { speciesId: 735, weight: 30, minLevel: 40, maxLevel: 43 }, // Gumshoos
    ],
  },
  {
    id: 'poni-breaker-coast',
    name: 'Poni Breaker Coast',
    unlockAt: 296_000,
    background: 'beach.png',
    encounters: [
      { speciesId: 129, weight: 79, minLevel: 10, maxLevel: 43 }, // Magikarp
      { speciesId: 320, weight: 30, minLevel: 10, maxLevel: 43 }, // Wailmer
      { speciesId: 319, weight: 10, minLevel: 10, maxLevel: 43 }, // Sharpedo
      { speciesId: 767, weight: 100, minLevel: 40, maxLevel: 43 }, // Wimpod (perseguição)
    ],
  },
  {
    id: 'exeggutor-island',
    name: 'Exeggutor Island',
    unlockAt: 310_000,
    background: 'forest.jpg',
    encounters: [
      { speciesId: 102, weight: 40, minLevel: 40, maxLevel: 43 }, // Exeggcute
      { speciesId: 103, weight: 20, minLevel: 40, maxLevel: 43 }, // Exeggutor Alolano
      { speciesId: 279, weight: 30, minLevel: 40, maxLevel: 43 }, // Pelipper
      { speciesId: 423, weight: 10, minLevel: 40, maxLevel: 43 }, // Gastrodon (Mar do Leste)
    ],
  },
  {
    id: 'vast-poni-canyon',
    name: 'Vast Poni Canyon',
    unlockAt: 330_000,
    background: 'cave-2.png',
    encounters: [
      { speciesId: 67, weight: 30, minLevel: 41, maxLevel: 44 }, // Machoke
      { speciesId: 745, weight: 20, minLevel: 41, maxLevel: 44 }, // Lycanroc (Diurna)
      { speciesId: 42, weight: 30, minLevel: 41, maxLevel: 44 }, // Golbat
      { speciesId: 51, weight: 20, minLevel: 41, maxLevel: 44 }, // Dugtrio Alolano
      { speciesId: 782, weight: 5, minLevel: 41, maxLevel: 44 }, // Jangmo-o
      { speciesId: 198, weight: 10, minLevel: 41, maxLevel: 44 }, // Murkrow
    ],
  }, // provação: Totem Kommo-o (sem capitão)

  // --- Trecho 11: Poni Grove → Mount Lanakila (Grande Provação: Hapu, Ground) → Elite Four → Campeão ---
  {
    id: 'poni-grove',
    name: 'Poni Grove',
    unlockAt: 350_000,
    background: 'forest.jpg',
    encounters: [
      { speciesId: 20, weight: 30, minLevel: 52, maxLevel: 55 }, // Raticate Alolana
      { speciesId: 210, weight: 20, minLevel: 52, maxLevel: 55 }, // Granbull
      { speciesId: 732, weight: 30, minLevel: 52, maxLevel: 55 }, // Trumbeak
      { speciesId: 735, weight: 30, minLevel: 52, maxLevel: 55 }, // Gumshoos
      { speciesId: 127, weight: 10, minLevel: 52, maxLevel: 55 }, // Pinsir
      { speciesId: 447, weight: 10, minLevel: 52, maxLevel: 55 }, // Riolu
    ],
  },
  {
    id: 'poni-plains',
    name: 'Poni Plains',
    unlockAt: 368_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 20, weight: 30, minLevel: 54, maxLevel: 57 }, // Raticate Alolana
      { speciesId: 546, weight: 20, minLevel: 54, maxLevel: 57 }, // Cottonee
      { speciesId: 548, weight: 20, minLevel: 54, maxLevel: 57 }, // Petilil
      { speciesId: 732, weight: 20, minLevel: 54, maxLevel: 57 }, // Trumbeak
      { speciesId: 279, weight: 20, minLevel: 54, maxLevel: 57 }, // Pelipper
      { speciesId: 123, weight: 30, minLevel: 54, maxLevel: 57 }, // Scyther (arbusto)
      { speciesId: 739, weight: 100, minLevel: 54, maxLevel: 57 }, // Crabrawler (monte de berries)
    ],
  },
  {
    id: 'poni-coast',
    name: 'Poni Coast',
    unlockAt: 385_000,
    background: 'beach.png',
    encounters: [{ speciesId: 51, weight: 100, minLevel: 56, maxLevel: 59 }], // Dugtrio Alolano (nuvem de terra)
  },
  {
    id: 'poni-gauntlet',
    name: 'Poni Gauntlet',
    unlockAt: 400_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 20, weight: 30, minLevel: 56, maxLevel: 59 }, // Raticate Alolana
      { speciesId: 279, weight: 30, minLevel: 56, maxLevel: 59 }, // Pelipper
      { speciesId: 735, weight: 30, minLevel: 56, maxLevel: 59 }, // Gumshoos
      { speciesId: 210, weight: 20, minLevel: 56, maxLevel: 59 }, // Granbull
      { speciesId: 55, weight: 15, minLevel: 56, maxLevel: 59 }, // Golduck
      { speciesId: 760, weight: 5, minLevel: 56, maxLevel: 59 }, // Bewear
    ],
  }, // grande provação: Hapu
  {
    id: 'victory-road',
    name: 'Mount Lanakila',
    unlockAt: 460_000,
    background: 'snow.png',
    encounters: [
      { speciesId: 27, weight: 30, minLevel: 42, maxLevel: 48 }, // Sandshrew Alolano
      { speciesId: 37, weight: 30, minLevel: 45, maxLevel: 48 }, // Vulpix Alolano
      { speciesId: 361, weight: 30, minLevel: 42, maxLevel: 48 }, // Snorunt
      { speciesId: 215, weight: 20, minLevel: 42, maxLevel: 48 }, // Sneasel
      { speciesId: 42, weight: 30, minLevel: 42, maxLevel: 48 }, // Golbat
      { speciesId: 780, weight: 10, minLevel: 42, maxLevel: 45 }, // Drampa
    ],
  }, // Elite Four + Campeão
]
