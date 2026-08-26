import type { LocationDefinition } from '../gen1/locations'

// Unova, Nuvema Town → Victory Road (o trecho dos 8 ginásios), mesmo shape
// de content/gen1/locations.ts's KANTO_LOCATIONS e as outras 4 regiões.
// docs/ROTAS-UNOVA.md tem a pesquisa completa (Bulbapedia, Pokémon Black —
// Black/White só trocam algumas espécies por versão, resolvido em favor de
// Black em toda a tabela, e o líder do Ginásio 8 - Drayden/Iris -, mesmo
// time).
//
// Mesmas simplificações das regiões anteriores: pesca/Surf fora, cavernas
// multi-área colapsadas numa linha por espécie, sazonalidade (mecânica
// nova da Gen 5 — a grama muda por estação real do jogo) resolvida a favor
// da tabela de Primavera. unlockAt é uma curva escrita à mão, provisória
// igual toda região antes do respectivo Sprint de balanceamento.
export const UNOVA_LOCATIONS: LocationDefinition[] = [
  { id: 'nuvema-town', name: 'Nuvema Town', unlockAt: 0, background: 'flowers.jpg', encounters: [] },

  // --- Trecho 1: Nuvema → Striaton (Ginásio 1: Cilan/Chili/Cress) ---
  {
    id: 'route-1',
    background: 'tall-grass.png',
    name: 'Rota 1',
    unlockAt: 0,
    encounters: [
      { speciesId: 504, weight: 50, minLevel: 2, maxLevel: 4 }, // Patrat
      { speciesId: 506, weight: 50, minLevel: 2, maxLevel: 4 }, // Lillipup
    ],
  },
  { id: 'accumula-town', name: 'Accumula Town', unlockAt: 300, background: 'path.png', encounters: [] },
  {
    id: 'route-2',
    background: 'tall-grass.png',
    name: 'Rota 2',
    unlockAt: 700,
    encounters: [
      { speciesId: 504, weight: 40, minLevel: 4, maxLevel: 7 }, // Patrat
      { speciesId: 506, weight: 40, minLevel: 4, maxLevel: 7 }, // Lillipup
      { speciesId: 509, weight: 20, minLevel: 4, maxLevel: 5 }, // Purrloin
    ],
  },
  { id: 'striaton-city', name: 'Striaton City', unlockAt: 4_500, background: 'path-2.png', encounters: [] }, // gym: Cilan/Chili/Cress (por inicial)

  // --- Trecho 2: Striaton → Nacrene (Ginásio 2: Lenora) ---
  {
    id: 'route-3',
    background: 'tall-grass.png',
    name: 'Rota 3',
    unlockAt: 7_000,
    encounters: [
      { speciesId: 519, weight: 40, minLevel: 8, maxLevel: 11 }, // Pidove
      { speciesId: 522, weight: 20, minLevel: 8, maxLevel: 11 }, // Blitzle
      { speciesId: 504, weight: 20, minLevel: 8, maxLevel: 8 }, // Patrat
      { speciesId: 506, weight: 10, minLevel: 9, maxLevel: 9 }, // Lillipup
      { speciesId: 509, weight: 10, minLevel: 9, maxLevel: 9 }, // Purrloin
    ],
  },
  { id: 'nacrene-city', name: 'Nacrene City', unlockAt: 14_000, background: 'path-2.png', encounters: [] }, // gym: Lenora

  // --- Trecho 3: Nacrene → Castelia (Ginásio 3: Burgh) ---
  {
    id: 'pinwheel-forest',
    background: 'forest.jpg',
    name: 'Floresta Pinwheel',
    unlockAt: 20_000,
    encounters: [
      { speciesId: 535, weight: 40, minLevel: 12, maxLevel: 15 }, // Tympole
      { speciesId: 519, weight: 30, minLevel: 12, maxLevel: 13 }, // Pidove
      { speciesId: 532, weight: 20, minLevel: 13, maxLevel: 14 }, // Timburr
      { speciesId: 538, weight: 10, minLevel: 12, maxLevel: 15 }, // Throh
    ],
  },
  { id: 'skyarrow-bridge', name: 'Ponte Skyarrow', unlockAt: 30_000, background: 'ocean.png', encounters: [] },
  { id: 'castelia-city', name: 'Castelia City', unlockAt: 43_000, background: 'path-2.png', encounters: [] }, // gym: Burgh

  // --- Trecho 4: Castelia → Nimbasa (Ginásio 4: Elesa) ---
  {
    id: 'route-4',
    background: 'desert.png',
    name: 'Rota 4',
    unlockAt: 53_000,
    encounters: [
      { speciesId: 551, weight: 40, minLevel: 15, maxLevel: 18 }, // Sandile
      { speciesId: 554, weight: 40, minLevel: 15, maxLevel: 18 }, // Darumaka
      { speciesId: 559, weight: 20, minLevel: 16, maxLevel: 17 }, // Scraggy
    ],
  },
  {
    id: 'desert-resort',
    background: 'desert.png',
    name: 'Desert Resort',
    unlockAt: 64_000,
    encounters: [
      { speciesId: 551, weight: 40, minLevel: 19, maxLevel: 22 }, // Sandile
      { speciesId: 554, weight: 30, minLevel: 19, maxLevel: 20 }, // Darumaka
      { speciesId: 556, weight: 10, minLevel: 20, maxLevel: 20 }, // Maractus
      { speciesId: 559, weight: 10, minLevel: 20, maxLevel: 20 }, // Scraggy
      { speciesId: 557, weight: 10, minLevel: 20, maxLevel: 22 }, // Dwebble
      { speciesId: 561, weight: 5, minLevel: 20, maxLevel: 20 }, // Sigilyph
    ],
  },
  { id: 'nimbasa-city', name: 'Nimbasa City', unlockAt: 90_000, background: 'path-2.png', encounters: [] }, // gym: Elesa

  // --- Trecho 5: Nimbasa → Driftveil (Ginásio 5: Clay) ---
  {
    id: 'route-5',
    background: 'tall-grass.png',
    name: 'Rota 5',
    unlockAt: 105_000,
    encounters: [
      { speciesId: 572, weight: 30, minLevel: 19, maxLevel: 22 }, // Minccino
      { speciesId: 574, weight: 20, minLevel: 19, maxLevel: 22 }, // Gothita
      { speciesId: 510, weight: 20, minLevel: 20, maxLevel: 22 }, // Liepard
      { speciesId: 568, weight: 20, minLevel: 19, maxLevel: 21 }, // Trubbish
    ],
  },
  {
    id: 'driftveil-drawbridge',
    background: 'ocean.png',
    name: 'Ponte Levadiça de Driftveil',
    unlockAt: 122_000,
    encounters: [
      { speciesId: 580, weight: 100, minLevel: 22, maxLevel: 25 }, // Ducklett
    ],
  },
  { id: 'driftveil-city', name: 'Driftveil City', unlockAt: 140_000, background: 'path.png', encounters: [] }, // gym: Clay

  // --- Trecho 6: Driftveil → Mistralton (Ginásio 6: Skyla) ---
  {
    id: 'route-6',
    background: 'tall-grass.png',
    name: 'Rota 6',
    unlockAt: 160_000,
    encounters: [
      { speciesId: 585, weight: 35, minLevel: 22, maxLevel: 24 }, // Deerling
      { speciesId: 588, weight: 25, minLevel: 22, maxLevel: 24 }, // Karrablast
      { speciesId: 520, weight: 15, minLevel: 23, maxLevel: 25 }, // Tranquill
      { speciesId: 590, weight: 15, minLevel: 23, maxLevel: 25 }, // Foongus
      { speciesId: 541, weight: 10, minLevel: 23, maxLevel: 23 }, // Swadloon
    ],
  },
  {
    id: 'chargestone-cave',
    background: 'cave-2.png',
    name: 'Caverna Chargestone',
    unlockAt: 182_000,
    encounters: [
      { speciesId: 595, weight: 39, minLevel: 24, maxLevel: 27 }, // Joltik
      { speciesId: 599, weight: 29, minLevel: 25, maxLevel: 27 }, // Klink
      { speciesId: 597, weight: 20, minLevel: 24, maxLevel: 26 }, // Ferroseed
      { speciesId: 525, weight: 10, minLevel: 24, maxLevel: 24 }, // Boldore
      { speciesId: 602, weight: 2, minLevel: 27, maxLevel: 27 }, // Tynamo
    ],
  },
  { id: 'mistralton-city', name: 'Mistralton City', unlockAt: 206_000, background: 'mountain.png', encounters: [] }, // gym: Skyla

  // --- Trecho 7: Mistralton → Icirrus (Ginásio 7: Brycen) ---
  {
    id: 'route-7',
    background: 'tall-grass.png',
    name: 'Rota 7',
    unlockAt: 232_000,
    encounters: [
      { speciesId: 520, weight: 30, minLevel: 26, maxLevel: 28 }, // Tranquill
      { speciesId: 613, weight: 30, minLevel: 26, maxLevel: 28 }, // Cubchoo
      { speciesId: 505, weight: 20, minLevel: 27, maxLevel: 29 }, // Watchog
      { speciesId: 523, weight: 20, minLevel: 27, maxLevel: 29 }, // Zebstrika
    ],
  },
  {
    id: 'twist-mountain',
    background: 'cave-3.png',
    name: 'Montanha Twist',
    unlockAt: 262_000,
    encounters: [
      { speciesId: 525, weight: 49, minLevel: 28, maxLevel: 31 }, // Boldore
      { speciesId: 533, weight: 30, minLevel: 28, maxLevel: 30 }, // Gurdurr
      { speciesId: 527, weight: 15, minLevel: 28, maxLevel: 31 }, // Woobat
      { speciesId: 613, weight: 10, minLevel: 28, maxLevel: 28 }, // Cubchoo
      { speciesId: 615, weight: 5, minLevel: 28, maxLevel: 31 }, // Cryogonal
    ],
  },
  { id: 'icirrus-city', name: 'Icirrus City', unlockAt: 294_000, background: 'snow.png', encounters: [] }, // gym: Brycen

  // --- Trecho 8: Icirrus → Opelucid (Ginásio 8: Drayden) → Elite Four → Campeão ---
  {
    id: 'route-8',
    background: 'tall-grass.png',
    name: 'Rota 8',
    unlockAt: 328_000,
    encounters: [
      { speciesId: 536, weight: 40, minLevel: 30, maxLevel: 33 }, // Palpitoad
      { speciesId: 616, weight: 40, minLevel: 30, maxLevel: 33 }, // Shelmet
      { speciesId: 618, weight: 20, minLevel: 31, maxLevel: 32 }, // Stunfisk
    ],
  },
  { id: 'tubeline-bridge', name: 'Ponte Tubeline', unlockAt: 350_000, background: 'ocean.png', encounters: [] },
  {
    id: 'route-9',
    background: 'tall-grass.png',
    name: 'Rota 9',
    unlockAt: 364_000,
    encounters: [
      { speciesId: 575, weight: 30, minLevel: 31, maxLevel: 34 }, // Gothorita
      { speciesId: 624, weight: 20, minLevel: 31, maxLevel: 34 }, // Pawniard
      { speciesId: 572, weight: 20, minLevel: 32, maxLevel: 32 }, // Minccino
      { speciesId: 569, weight: 20, minLevel: 31, maxLevel: 33 }, // Garbodor
      { speciesId: 510, weight: 10, minLevel: 33, maxLevel: 33 }, // Liepard
    ],
  },
  { id: 'opelucid-city', name: 'Opelucid City', unlockAt: 402_000, background: 'mountain-2.png', encounters: [] }, // gym: Drayden
  {
    id: 'route-10',
    background: 'snow.png',
    name: 'Rota 10',
    unlockAt: 442_000,
    encounters: [
      { speciesId: 507, weight: 30, minLevel: 33, maxLevel: 34 }, // Herdier
      { speciesId: 627, weight: 30, minLevel: 34, maxLevel: 36 }, // Rufflet
      { speciesId: 626, weight: 20, minLevel: 34, maxLevel: 35 }, // Bouffalant
      { speciesId: 538, weight: 10, minLevel: 33, maxLevel: 36 }, // Throh
      { speciesId: 590, weight: 10, minLevel: 34, maxLevel: 35 }, // Foongus
    ],
  },
  {
    id: 'victory-road',
    background: 'mountain-night.png',
    name: 'Victory Road',
    unlockAt: 484_000,
    encounters: [
      { speciesId: 632, weight: 40, minLevel: 37, maxLevel: 42 }, // Durant
      { speciesId: 525, weight: 25, minLevel: 37, maxLevel: 41 }, // Boldore
      { speciesId: 527, weight: 15, minLevel: 37, maxLevel: 42 }, // Woobat
      { speciesId: 619, weight: 10, minLevel: 39, maxLevel: 41 }, // Mienfoo
      { speciesId: 631, weight: 10, minLevel: 37, maxLevel: 40 }, // Heatmor
    ],
  },
]
