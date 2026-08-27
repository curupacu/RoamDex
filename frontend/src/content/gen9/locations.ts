import type { LocationDefinition } from '../gen1/locations'

// Paldea, Cabo Poco → Area Zero (o trecho de 8 ginásios), mesmo formato de
// content/gen1/locations.ts's KANTO_LOCATIONS e as outras 8 regiões.
// docs/ROTAS-PALDEA.md tem a pesquisa completa (Bulbapedia, Pokémon
// Scarlet) — inclui a decisão de forçar ordem fixa por nível crescente
// num jogo que originalmente é mundo aberto (Katy→Brassius→Iono→Kofu→
// Larry→Ryme→Tulip→Grusha), com 2 trechos exigindo salto geográfico
// grande (ver docs/ROTAS-PALDEA.md's Metodologia).
//
// Mesmas simplificações de sempre: tabelas com bioma demais viraram um
// resumo das espécies mais citadas, não a lista 100% completa; "Area
// Zero" vira o id 'victory-road' (App.tsx depende desse literal em toda
// região) — no jogo real é epílogo pós-Campeã, aqui é a masmorra final
// antes do Elite Four (única disponível na lista de locais fornecida,
// ver Metodologia). Glaseado Mountain é visitada 2x (passagem no Trecho
// 6, ginásio de Grusha no Trecho 8) — mesmo padrão 'X'/'X-gym' já usado
// em Motostoke/Hammerlocke (Galar). unlockAt é provisório, mesmo status
// de toda outra região.
export const PALDEA_LOCATIONS: LocationDefinition[] = [
  { id: 'cabo-poco', name: 'Cabo Poco', unlockAt: 0, background: 'beach.png', encounters: [] },

  // --- Trecho 1: Cabo Poco → Cortondo (Ginásio 1: Katy, Bug) ---
  {
    id: 'poco-path',
    name: 'Poco Path',
    unlockAt: 0,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 661, weight: 100, minLevel: 2, maxLevel: 4 }, // Fletchling
      { speciesId: 915, weight: 50, minLevel: 2, maxLevel: 4 }, // Lechonk
      { speciesId: 917, weight: 50, minLevel: 2, maxLevel: 4 }, // Tarountula
      { speciesId: 187, weight: 40, minLevel: 2, maxLevel: 4 }, // Hoppip
      { speciesId: 278, weight: 80, minLevel: 2, maxLevel: 4 }, // Wingull
      { speciesId: 418, weight: 20, minLevel: 2, maxLevel: 4 }, // Buizel
    ],
  },
  {
    id: 'inlet-grotto',
    name: 'Inlet Grotto',
    unlockAt: 300,
    background: 'cave.png',
    encounters: [
      { speciesId: 228, weight: 60, minLevel: 3, maxLevel: 5 }, // Houndour
      { speciesId: 50, weight: 20, minLevel: 3, maxLevel: 5 }, // Diglett
      { speciesId: 734, weight: 20, minLevel: 3, maxLevel: 5 }, // Yungoos
    ],
  },
  {
    id: 'south-province-1',
    name: 'South Province (Área Um)',
    unlockAt: 800,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 661, weight: 100, minLevel: 2, maxLevel: 8 }, // Fletchling
      { speciesId: 915, weight: 80, minLevel: 2, maxLevel: 8 }, // Lechonk
      { speciesId: 187, weight: 60, minLevel: 2, maxLevel: 8 }, // Hoppip
      { speciesId: 917, weight: 50, minLevel: 2, maxLevel: 8 }, // Tarountula
      { speciesId: 415, weight: 40, minLevel: 5, maxLevel: 8 }, // Combee
      { speciesId: 92, weight: 100, minLevel: 4, maxLevel: 7 }, // Gastly
    ],
  },
  { id: 'los-platos', name: 'Los Platos', unlockAt: 1_200, background: 'path.png', encounters: [] },
  { id: 'mesagoza', name: 'Mesagoza', unlockAt: 1_500, background: 'path-2.png', encounters: [] },
  {
    id: 'south-province-2',
    name: 'South Province (Área Dois)',
    unlockAt: 2_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 661, weight: 100, minLevel: 7, maxLevel: 14 }, // Fletchling
      { speciesId: 396, weight: 70, minLevel: 7, maxLevel: 14 }, // Starly
      { speciesId: 179, weight: 60, minLevel: 9, maxLevel: 14 }, // Mareep
      { speciesId: 942, weight: 30, minLevel: 10, maxLevel: 14 }, // Maschiff
      { speciesId: 928, weight: 40, minLevel: 7, maxLevel: 11 }, // Smoliv
      { speciesId: 964, weight: 30, minLevel: 7, maxLevel: 10 }, // Shroodle
    ],
  },
  { id: 'cortondo', name: 'Cortondo', unlockAt: 2_800, background: 'flowers.jpg', encounters: [] }, // gym: Katy

  // --- Trecho 2: Cortondo → Artazon (Ginásio 2: Brassius, Grass) ---
  {
    id: 'south-province-3',
    name: 'South Province (Área Três)',
    unlockAt: 4_500,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 821, weight: 40, minLevel: 7, maxLevel: 17 }, // Rookidee
      { speciesId: 919, weight: 40, minLevel: 14, maxLevel: 17 }, // Nymble
      { speciesId: 198, weight: 60, minLevel: 15, maxLevel: 17 }, // Murkrow
      { speciesId: 403, weight: 40, minLevel: 7, maxLevel: 12 }, // Shinx
      { speciesId: 932, weight: 60, minLevel: 10, maxLevel: 17 }, // Nacli
      { speciesId: 950, weight: 30, minLevel: 15, maxLevel: 17 }, // Klawf
    ],
  },
  { id: 'artazon', name: 'Artazon', unlockAt: 6_500, background: 'flowers.jpg', encounters: [] }, // gym: Brassius

  // --- Trecho 3: Artazon → Levincia (Ginásio 3: Iono, Electric) ---
  {
    id: 'east-province-1',
    name: 'East Province (Área Um)',
    unlockAt: 10_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 188, weight: 100, minLevel: 18, maxLevel: 23 }, // Skiploom
      { speciesId: 128, weight: 90, minLevel: 22, maxLevel: 23 }, // Tauros
      { speciesId: 822, weight: 100, minLevel: 18, maxLevel: 23 }, // Corvisquire
      { speciesId: 198, weight: 60, minLevel: 17, maxLevel: 23 }, // Murkrow
      { speciesId: 747, weight: 60, minLevel: 18, maxLevel: 23 }, // Mareanie
      { speciesId: 940, weight: 60, minLevel: 18, maxLevel: 23 }, // Wattrel
    ],
  },
  {
    id: 'east-province-2',
    name: 'East Province (Área Dois)',
    unlockAt: 13_500,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 81, weight: 30, minLevel: 19, maxLevel: 26 }, // Magnemite
      { speciesId: 204, weight: 30, minLevel: 19, maxLevel: 26 }, // Pineco
      { speciesId: 775, weight: 20, minLevel: 19, maxLevel: 26 }, // Komala
      { speciesId: 79, weight: 30, minLevel: 19, maxLevel: 26 }, // Slowpoke
      { speciesId: 769, weight: 20, minLevel: 19, maxLevel: 26 }, // Sandygast
      { speciesId: 92, weight: 20, minLevel: 19, maxLevel: 26 }, // Gastly
    ],
  },
  {
    id: 'east-province-3',
    name: 'East Province (Área Três)',
    unlockAt: 17_000,
    background: 'path.png',
    encounters: [
      { speciesId: 52, weight: 30, minLevel: 23, maxLevel: 28 }, // Meowth
      { speciesId: 821, weight: 30, minLevel: 23, maxLevel: 24 }, // Rookidee
      { speciesId: 822, weight: 20, minLevel: 23, maxLevel: 24 }, // Corvisquire
      { speciesId: 100, weight: 30, minLevel: 26, maxLevel: 28 }, // Voltorb
      { speciesId: 837, weight: 20, minLevel: 17, maxLevel: 36 }, // Rolycoly
      { speciesId: 757, weight: 20, minLevel: 17, maxLevel: 36 }, // Salandit
    ],
  },
  { id: 'levincia', name: 'Levincia', unlockAt: 20_000, background: 'path-2.png', encounters: [] }, // gym: Iono

  // --- Trecho 4: Levincia → Cascarrafa (Ginásio 4: Kofu, Water) — salto
  // geográfico grande (Metodologia), assumido como viagem rápida pelo
  // hub de Mesagoza. ---
  {
    id: 'south-province-4',
    name: 'South Province (Área Quatro)',
    unlockAt: 26_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 396, weight: 70, minLevel: 16, maxLevel: 23 }, // Starly
      { speciesId: 198, weight: 60, minLevel: 16, maxLevel: 23 }, // Murkrow
      { speciesId: 848, weight: 60, minLevel: 16, maxLevel: 23 }, // Toxel
      { speciesId: 915, weight: 80, minLevel: 16, maxLevel: 18 }, // Lechonk
      { speciesId: 749, weight: 60, minLevel: 16, maxLevel: 23 }, // Mudbray
      { speciesId: 550, weight: 70, minLevel: 16, maxLevel: 20 }, // Basculin
    ],
  },
  {
    id: 'west-province-1',
    name: 'West Province (Área Um)',
    unlockAt: 32_000,
    background: 'mountain.png',
    encounters: [
      { speciesId: 333, weight: 70, minLevel: 18, maxLevel: 20 }, // Swablu
      { speciesId: 322, weight: 60, minLevel: 18, maxLevel: 20 }, // Numel
      { speciesId: 56, weight: 40, minLevel: 15, maxLevel: 19 }, // Mankey
      { speciesId: 744, weight: 40, minLevel: 13, maxLevel: 17 }, // Rockruff
      { speciesId: 231, weight: 20, minLevel: 13, maxLevel: 20 }, // Phanpy
      { speciesId: 371, weight: 20, minLevel: 13, maxLevel: 20 }, // Bagon
    ],
  },
  {
    id: 'asado-desert',
    name: 'Asado Desert',
    unlockAt: 40_000,
    background: 'desert.png',
    encounters: [
      { speciesId: 751, weight: 40, minLevel: 22, maxLevel: 26 }, // Silicobra
      { speciesId: 231, weight: 30, minLevel: 19, maxLevel: 26 }, // Phanpy
      { speciesId: 331, weight: 20, minLevel: 20, maxLevel: 24 }, // Cacnea
      { speciesId: 449, weight: 20, minLevel: 23, maxLevel: 26 }, // Hippopotas
      { speciesId: 627, weight: 20, minLevel: 21, maxLevel: 26 }, // Rufflet
      { speciesId: 874, weight: 20, minLevel: 20, maxLevel: 26 }, // Stonjourner
    ],
  },
  { id: 'porto-marinada', name: 'Porto Marinada', unlockAt: 46_000, background: 'beach.png', encounters: [] },
  {
    id: 'west-province-2',
    name: 'West Province (Área Dois)',
    unlockAt: 50_000,
    background: 'path.png',
    encounters: [
      { speciesId: 52, weight: 30, minLevel: 22, maxLevel: 29 }, // Meowth
      { speciesId: 203, weight: 20, minLevel: 22, maxLevel: 29 }, // Girafarig
      { speciesId: 132, weight: 20, minLevel: 22, maxLevel: 29 }, // Ditto
      { speciesId: 183, weight: 20, minLevel: 22, maxLevel: 29 }, // Marill
      { speciesId: 51, weight: 20, minLevel: 23, maxLevel: 29 }, // Dugtrio
      { speciesId: 924, weight: 20, minLevel: 26, maxLevel: 29 }, // Tandemaus
    ],
  },
  { id: 'cascarrafa', name: 'Cascarrafa', unlockAt: 55_000, background: 'ocean.png', encounters: [] }, // gym: Kofu

  // --- Trecho 5: Cascarrafa → Medali (Ginásio 5: Larry, Normal) ---
  {
    id: 'west-province-3',
    name: 'West Province (Área Três)',
    unlockAt: 68_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 53, weight: 30, minLevel: 28, maxLevel: 35 }, // Persian
      { speciesId: 662, weight: 30, minLevel: 28, maxLevel: 35 }, // Fletchinder
      { speciesId: 916, weight: 20, minLevel: 28, maxLevel: 35 }, // Oinkologne
      { speciesId: 57, weight: 20, minLevel: 28, maxLevel: 35 }, // Primeape
      { speciesId: 185, weight: 60, minLevel: 28, maxLevel: 35 }, // Sudowoodo
      { speciesId: 590, weight: 60, minLevel: 28, maxLevel: 35 }, // Foongus
    ],
  },
  { id: 'medali', name: 'Medali', unlockAt: 82_000, background: 'path-2.png', encounters: [] }, // gym: Larry

  // --- Trecho 6: Medali → Montenevera (Ginásio 6: Ryme, Ghost) ---
  {
    id: 'tagtree-thicket',
    name: 'Tagtree Thicket',
    unlockAt: 98_000,
    background: 'forest.jpg',
    encounters: [
      { speciesId: 198, weight: 60, minLevel: 25, maxLevel: 32 }, // Murkrow
      { speciesId: 48, weight: 25, minLevel: 25, maxLevel: 40 }, // Venonat
      { speciesId: 204, weight: 30, minLevel: 25, maxLevel: 32 }, // Pineco
      { speciesId: 570, weight: 30, minLevel: 25, maxLevel: 31 }, // Zorua
      { speciesId: 590, weight: 30, minLevel: 25, maxLevel: 32 }, // Foongus
      { speciesId: 859, weight: 40, minLevel: 25, maxLevel: 32 }, // Impidimp
    ],
  },
  {
    id: 'glaseado-mountain',
    name: 'Glaseado Mountain',
    unlockAt: 118_000,
    background: 'mountain.png',
    encounters: [
      { speciesId: 215, weight: 60, minLevel: 34, maxLevel: 40 }, // Sneasel
      { speciesId: 610, weight: 60, minLevel: 34, maxLevel: 42 }, // Axew
      { speciesId: 613, weight: 40, minLevel: 34, maxLevel: 40 }, // Cubchoo
      { speciesId: 872, weight: 40, minLevel: 34, maxLevel: 40 }, // Snom
      { speciesId: 614, weight: 40, minLevel: 40, maxLevel: 42 }, // Beartic
      { speciesId: 713, weight: 30, minLevel: 37, maxLevel: 42 }, // Avalugg
    ],
  }, // passagem — o ginásio de Grusha fica no pico, ver 'glaseado-mountain-gym'
  { id: 'montenevera', name: 'Montenevera', unlockAt: 140_000, background: 'snow.png', encounters: [] }, // gym: Ryme

  // --- Trecho 7: Montenevera → Alfornada (Ginásio 7: Tulip, Psychic) —
  // salto geográfico grande (Metodologia), assumido como viagem rápida
  // pelo hub de Mesagoza. ---
  {
    id: 'south-province-6',
    name: 'South Province (Área Seis)',
    unlockAt: 170_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 232, weight: 100, minLevel: 37, maxLevel: 43 }, // Donphan
      { speciesId: 419, weight: 100, minLevel: 37, maxLevel: 40 }, // Floatzel
      { speciesId: 834, weight: 100, minLevel: 37, maxLevel: 40 }, // Drednaw
      { speciesId: 550, weight: 70, minLevel: 37, maxLevel: 40 }, // Basculin
      { speciesId: 932, weight: 100, minLevel: 37, maxLevel: 42 }, // Nacli
      { speciesId: 444, weight: 100, minLevel: 40, maxLevel: 44 }, // Gabite
    ],
  },
  { id: 'alfornada', name: 'Alfornada', unlockAt: 200_000, background: 'path.png', encounters: [] }, // gym: Tulip

  // --- Trecho 8: Alfornada → Glaseado Mountain (Ginásio 8: Grusha, Ice) ---
  {
    id: 'casseroya-lake',
    name: 'Casseroya Lake',
    unlockAt: 240_000,
    background: 'lake.png',
    encounters: [
      { speciesId: 130, weight: 30, minLevel: 49, maxLevel: 55 }, // Gyarados
      { speciesId: 977, weight: 30, minLevel: 49, maxLevel: 55 }, // Dondozo
      { speciesId: 614, weight: 40, minLevel: 52, maxLevel: 56 }, // Beartic
      { speciesId: 972, weight: 30, minLevel: 52, maxLevel: 56 }, // Houndstone
      { speciesId: 975, weight: 30, minLevel: 52, maxLevel: 56 }, // Cetitan
      { speciesId: 941, weight: 30, minLevel: 49, maxLevel: 55 }, // Kilowattrel
    ],
  },
  {
    id: 'north-province-1',
    name: 'North Province (Área Um)',
    unlockAt: 275_000,
    background: 'mountain-2.png',
    encounters: [
      { speciesId: 448, weight: 30, minLevel: 46, maxLevel: 53 }, // Lucario
      { speciesId: 701, weight: 30, minLevel: 46, maxLevel: 53 }, // Hawlucha
      { speciesId: 461, weight: 30, minLevel: 49, maxLevel: 53 }, // Weavile
      { speciesId: 478, weight: 20, minLevel: 49, maxLevel: 53 }, // Froslass
      { speciesId: 147, weight: 20, minLevel: 47, maxLevel: 53 }, // Dratini
      { speciesId: 715, weight: 20, minLevel: 46, maxLevel: 53 }, // Noivern
    ],
  },
  {
    id: 'north-province-2',
    name: 'North Province (Área Dois)',
    unlockAt: 310_000,
    background: 'snow.png',
    encounters: [
      { speciesId: 334, weight: 20, minLevel: 49, maxLevel: 52 }, // Altaria
      { speciesId: 229, weight: 20, minLevel: 49, maxLevel: 52 }, // Houndoom
      { speciesId: 323, weight: 20, minLevel: 49, maxLevel: 52 }, // Camerupt
      { speciesId: 123, weight: 50, minLevel: 49, maxLevel: 52 }, // Scyther
      { speciesId: 402, weight: 30, minLevel: 49, maxLevel: 52 }, // Kricketune
      { speciesId: 625, weight: 20, minLevel: 52, maxLevel: 52 }, // Bisharp
    ],
  },
  {
    id: 'north-province-3',
    name: 'North Province (Área Três)',
    unlockAt: 345_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 189, weight: 100, minLevel: 43, maxLevel: 50 }, // Jumpluff
      { speciesId: 419, weight: 60, minLevel: 43, maxLevel: 50 }, // Floatzel
      { speciesId: 847, weight: 60, minLevel: 43, maxLevel: 45 }, // Barraskewda
      { speciesId: 933, weight: 60, minLevel: 43, maxLevel: 47 }, // Naclstack
      { speciesId: 673, weight: 30, minLevel: 43, maxLevel: 47 }, // Gogoat
      { speciesId: 879, weight: 20, minLevel: 43, maxLevel: 47 }, // Copperajah
    ],
  },
  { id: 'glaseado-mountain-gym', name: 'Glaseado Mountain', unlockAt: 380_000, background: 'snow.png', encounters: [] }, // gym: Grusha — mesmo local de glaseado-mountain, pico

  // --- Trecho 9: Glaseado Mountain → Elite Four → Campeã ---
  {
    id: 'great-crater-of-paldea',
    name: 'Great Crater of Paldea',
    unlockAt: 420_000,
    background: 'cave-2.png',
    encounters: [
      { speciesId: 445, weight: 50, minLevel: 57, maxLevel: 58 }, // Garchomp
      { speciesId: 462, weight: 50, minLevel: 57, maxLevel: 58 }, // Magnezone
    ],
  },
  // id fixo 'victory-road' (App.tsx depende desse literal em toda
  // região) — Area Zero é epílogo pós-Campeã no jogo real, aqui vira a
  // masmorra final antes do Elite Four (ver Metodologia).
  {
    id: 'victory-road',
    name: 'Area Zero',
    unlockAt: 460_000,
    background: 'cave-3.png',
    encounters: [
      { speciesId: 189, weight: 30, minLevel: 52, maxLevel: 56 }, // Jumpluff
      { speciesId: 308, weight: 30, minLevel: 52, maxLevel: 56 }, // Medicham
      { speciesId: 334, weight: 30, minLevel: 52, maxLevel: 56 }, // Altaria
      { speciesId: 701, weight: 30, minLevel: 52, maxLevel: 56 }, // Hawlucha
      { speciesId: 745, weight: 30, minLevel: 52, maxLevel: 56 }, // Lycanroc
      { speciesId: 323, weight: 30, minLevel: 55, maxLevel: 59 }, // Camerupt
    ],
  }, // Elite Four + Campeã
]
