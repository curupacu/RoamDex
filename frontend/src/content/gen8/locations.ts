import type { LocationDefinition } from '../gen1/locations'

// Galar, Postwick → Wyndon (o trecho de 8 ginásios), mesmo formato de
// content/gen1/locations.ts's KANTO_LOCATIONS e as outras 6 regiões.
// docs/ROTAS-GALAR.md tem a pesquisa completa (Bulbapedia, Pokémon Sword).
//
// Mesmas simplificações de sempre: pesca, curry/acampamento e a Wild Area
// (zona aberta gigante, sem progressão linear) ficam de fora do trecho
// principal; tabelas ocultas ("hidden encounters") não entraram linha a
// linha. unlockAt é provisório, mesmo status de toda outra região.
//
// Motostoke e Hammerlocke são visitadas 2x no jogo real (hub trancado →
// ginásio mais tarde) — mesmo padrão 'X-city'/'X-city-gym' já usado em
// Petalburg (Hoenn) e Olivine (Johto): 2 entradas de local, o ginásio
// aponta pra segunda.
export const GALAR_LOCATIONS: LocationDefinition[] = [
  { id: 'postwick', name: 'Postwick', unlockAt: 0, background: 'flowers.jpg', encounters: [] },
  { id: 'wedgehurst', name: 'Wedgehurst', unlockAt: 0, background: 'path.png', encounters: [] },

  // --- Trecho 1: Postwick → Turffield (Ginásio 1: Milo, Grass) ---
  {
    id: 'route-1',
    name: 'Rota 1',
    unlockAt: 0,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 819, weight: 50, minLevel: 3, maxLevel: 6 }, // Skwovet
      { speciesId: 821, weight: 30, minLevel: 3, maxLevel: 6 }, // Rookidee
      { speciesId: 831, weight: 15, minLevel: 3, maxLevel: 6 }, // Wooloo
      { speciesId: 827, weight: 5, minLevel: 3, maxLevel: 6 }, // Nickit
    ],
  },
  {
    id: 'route-2',
    name: 'Rota 2',
    unlockAt: 300,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 819, weight: 38, minLevel: 5, maxLevel: 7 }, // Skwovet
      { speciesId: 821, weight: 30, minLevel: 5, maxLevel: 7 }, // Rookidee
      { speciesId: 827, weight: 15, minLevel: 5, maxLevel: 7 }, // Nickit
      { speciesId: 833, weight: 10, minLevel: 5, maxLevel: 7 }, // Chewtle
      { speciesId: 835, weight: 5, minLevel: 5, maxLevel: 7 }, // Yamper
      { speciesId: 263, weight: 2, minLevel: 5, maxLevel: 7 }, // Zigzagoon Galariana
    ],
  },
  {
    id: 'slumbering-weald',
    name: 'Slumbering Weald',
    unlockAt: 700,
    background: 'forest.jpg',
    encounters: [
      { speciesId: 819, weight: 50, minLevel: 2, maxLevel: 3 }, // Skwovet
      { speciesId: 821, weight: 30, minLevel: 2, maxLevel: 3 }, // Rookidee
      { speciesId: 824, weight: 20, minLevel: 2, maxLevel: 3 }, // Blipbug
    ],
  },
  { id: 'motostoke', name: 'Motostoke', unlockAt: 1_500, background: 'path.png', encounters: [] }, // passagem, ginásio fechado
  {
    id: 'route-3',
    name: 'Rota 3',
    unlockAt: 2_500,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 263, weight: 38, minLevel: 10, maxLevel: 14 }, // Zigzagoon Galariana
      { speciesId: 829, weight: 30, minLevel: 10, maxLevel: 14 }, // Gossifleur
      { speciesId: 37, weight: 15, minLevel: 10, maxLevel: 14 }, // Vulpix
      { speciesId: 434, weight: 10, minLevel: 10, maxLevel: 14 }, // Stunky
      { speciesId: 568, weight: 5, minLevel: 10, maxLevel: 14 }, // Trubbish
      { speciesId: 236, weight: 2, minLevel: 10, maxLevel: 14 }, // Tyrogue
    ],
  },
  {
    id: 'galar-mine',
    name: 'Mina de Galar',
    unlockAt: 3_500,
    background: 'cave.png',
    encounters: [
      { speciesId: 837, weight: 35, minLevel: 11, maxLevel: 14 }, // Rolycoly
      { speciesId: 524, weight: 25, minLevel: 11, maxLevel: 14 }, // Roggenrola
      { speciesId: 527, weight: 15, minLevel: 11, maxLevel: 14 }, // Woobat
      { speciesId: 50, weight: 10, minLevel: 11, maxLevel: 14 }, // Diglett
      { speciesId: 529, weight: 10, minLevel: 11, maxLevel: 14 }, // Drilbur
      { speciesId: 532, weight: 5, minLevel: 11, maxLevel: 14 }, // Timburr
    ],
  },
  {
    id: 'route-4',
    name: 'Rota 4',
    unlockAt: 5_500,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 309, weight: 30, minLevel: 14, maxLevel: 16 }, // Electrike
      { speciesId: 52, weight: 23, minLevel: 14, maxLevel: 16 }, // Meowth Galariana
      { speciesId: 710, weight: 21, minLevel: 14, maxLevel: 16 }, // Pumpkaboo
      { speciesId: 835, weight: 20, minLevel: 14, maxLevel: 16 }, // Yamper
    ],
  },
  { id: 'turffield', name: 'Turffield', unlockAt: 8_000, background: 'tall-grass.png', encounters: [] }, // gym: Milo

  // --- Trecho 2: Turffield → Hulbury (Ginásio 2: Nessa, Water) ---
  {
    id: 'route-5',
    name: 'Rota 5',
    unlockAt: 14_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 759, weight: 35, minLevel: 19, maxLevel: 21 }, // Stufful
      { speciesId: 682, weight: 30, minLevel: 16, maxLevel: 21 }, // Spritzee
      { speciesId: 825, weight: 26, minLevel: 16, maxLevel: 18 }, // Dottler
      { speciesId: 271, weight: 20, minLevel: 16, maxLevel: 18 }, // Lombre
      { speciesId: 202, weight: 10, minLevel: 19, maxLevel: 21 }, // Wobbuffet
      { speciesId: 840, weight: 10, minLevel: 16, maxLevel: 18 }, // Applin
      { speciesId: 425, weight: 5, minLevel: 19, maxLevel: 21 }, // Drifloon
    ],
  },
  { id: 'hulbury', name: 'Hulbury', unlockAt: 20_000, background: 'beach.png', encounters: [] }, // gym: Nessa

  // --- Trecho 3: Hulbury → Motostoke, volta (Ginásio 3: Kabu, Fire) ---
  {
    id: 'galar-mine-no-2',
    name: 'Mina de Galar Nº2',
    unlockAt: 28_000,
    background: 'cave-2.png',
    encounters: [
      { speciesId: 422, weight: 25, minLevel: 20, maxLevel: 24 }, // Shellos (Mar do Leste)
      { speciesId: 767, weight: 25, minLevel: 20, maxLevel: 24 }, // Wimpod
      { speciesId: 453, weight: 15, minLevel: 20, maxLevel: 24 }, // Croagunk
      { speciesId: 688, weight: 15, minLevel: 20, maxLevel: 24 }, // Binacle
      { speciesId: 714, weight: 10, minLevel: 20, maxLevel: 24 }, // Noibat
      { speciesId: 213, weight: 5, minLevel: 20, maxLevel: 24 }, // Shuckle
      { speciesId: 833, weight: 5, minLevel: 20, maxLevel: 24 }, // Chewtle
    ],
  },
  {
    id: 'motostoke-outskirts',
    name: 'Arredores de Motostoke',
    unlockAt: 36_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 164, weight: 35, minLevel: 22, maxLevel: 26 }, // Noctowl
      { speciesId: 185, weight: 30, minLevel: 22, maxLevel: 26 }, // Sudowoodo
      { speciesId: 109, weight: 15, minLevel: 22, maxLevel: 26 }, // Koffing
      { speciesId: 856, weight: 10, minLevel: 22, maxLevel: 26 }, // Hatenna
    ],
  },
  { id: 'motostoke-gym', name: 'Motostoke', unlockAt: 45_000, background: 'path.png', encounters: [] }, // gym: Kabu — mesma cidade de motostoke, 2ª passagem

  // --- Trecho 4: Motostoke → Stow-on-Side (Ginásio 4: Bea OU Allister) ---
  { id: 'hammerlocke', name: 'Hammerlocke', unlockAt: 55_000, background: 'mountain.png', encounters: [] }, // passagem, ginásio fechado
  {
    id: 'route-6',
    name: 'Rota 6',
    unlockAt: 68_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 562, weight: 35, minLevel: 29, maxLevel: 33 }, // Yamask Galariana
      { speciesId: 694, weight: 29, minLevel: 29, maxLevel: 33 }, // Helioptile
      { speciesId: 51, weight: 20, minLevel: 29, maxLevel: 33 }, // Dugtrio
      { speciesId: 556, weight: 10, minLevel: 29, maxLevel: 33 }, // Maractus
      { speciesId: 328, weight: 5, minLevel: 29, maxLevel: 33 }, // Trapinch
    ],
  },
  { id: 'stow-on-side', name: 'Stow-on-Side', unlockAt: 82_000, background: 'path-2.png', encounters: [] }, // gym: Bea/Allister

  // --- Trecho 5: Stow-on-Side → Ballonlea (Ginásio 5: Opal, Fairy) ---
  {
    id: 'glimwood-tangle',
    name: 'Glimwood Tangle',
    unlockAt: 98_000,
    background: 'forest.jpg',
    encounters: [
      { speciesId: 860, weight: 20, minLevel: 34, maxLevel: 36 }, // Morgrem
      { speciesId: 756, weight: 15, minLevel: 34, maxLevel: 36 }, // Shiinotic
      { speciesId: 77, weight: 10, minLevel: 34, maxLevel: 36 }, // Ponyta Galariana
      { speciesId: 682, weight: 10, minLevel: 34, maxLevel: 36 }, // Spritzee
      { speciesId: 708, weight: 10, minLevel: 34, maxLevel: 36 }, // Phantump
      { speciesId: 854, weight: 10, minLevel: 34, maxLevel: 36 }, // Sinistea
      { speciesId: 857, weight: 10, minLevel: 34, maxLevel: 36 }, // Hattrem
      { speciesId: 765, weight: 9, minLevel: 34, maxLevel: 36 }, // Oranguru
      { speciesId: 876, weight: 5, minLevel: 34, maxLevel: 36 }, // Indeedee macho
    ],
  },
  { id: 'ballonlea', name: 'Ballonlea', unlockAt: 115_000, background: 'flowers.jpg', encounters: [] }, // gym: Opal

  // --- Trecho 6: Ballonlea → Circhester (Ginásio 6: Gordie OU Melony) ---
  {
    id: 'route-7',
    name: 'Rota 7',
    unlockAt: 140_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 863, weight: 30, minLevel: 37, maxLevel: 41 }, // Perrserker
      { speciesId: 848, weight: 25, minLevel: 28, maxLevel: 40 }, // Toxel
      { speciesId: 616, weight: 22, minLevel: 28, maxLevel: 40 }, // Shelmet
      { speciesId: 596, weight: 20, minLevel: 37, maxLevel: 41 }, // Galvantula
      { speciesId: 823, weight: 20, minLevel: 28, maxLevel: 40 }, // Corviknight
      { speciesId: 828, weight: 20, minLevel: 37, maxLevel: 41 }, // Thievul
      { speciesId: 510, weight: 12, minLevel: 28, maxLevel: 41 }, // Liepard
      { speciesId: 686, weight: 10, minLevel: 37, maxLevel: 41 }, // Inkay
      { speciesId: 678, weight: 10, minLevel: 28, maxLevel: 40 }, // Meowstic fêmea
      { speciesId: 537, weight: 7, minLevel: 28, maxLevel: 40 }, // Seismitoad
      { speciesId: 877, weight: 5, minLevel: 37, maxLevel: 41 }, // Morpeko
    ],
  },
  {
    id: 'route-8',
    name: 'Rota 8',
    unlockAt: 165_000,
    background: 'tall-grass.png',
    encounters: [
      { speciesId: 622, weight: 25, minLevel: 39, maxLevel: 41 }, // Golett
      { speciesId: 525, weight: 25, minLevel: 39, maxLevel: 41 }, // Boldore
      { speciesId: 624, weight: 20, minLevel: 39, maxLevel: 41 }, // Pawniard
      { speciesId: 629, weight: 10, minLevel: 39, maxLevel: 41 }, // Vullaby
      { speciesId: 533, weight: 10, minLevel: 39, maxLevel: 41 }, // Gurdurr
      { speciesId: 337, weight: 5, minLevel: 39, maxLevel: 41 }, // Lunatone
      { speciesId: 777, weight: 5, minLevel: 39, maxLevel: 41 }, // Togedemaru
    ],
  },
  {
    id: 'steamdrift-way',
    name: 'Steamdrift Way',
    unlockAt: 185_000,
    background: 'snow.png',
    encounters: [
      { speciesId: 872, weight: 40, minLevel: 38, maxLevel: 43 }, // Snom
      { speciesId: 361, weight: 25, minLevel: 39, maxLevel: 43 }, // Snorunt
      { speciesId: 215, weight: 22, minLevel: 38, maxLevel: 43 }, // Sneasel
      { speciesId: 459, weight: 20, minLevel: 38, maxLevel: 41 }, // Snover
      { speciesId: 225, weight: 15, minLevel: 38, maxLevel: 41 }, // Delibird
      { speciesId: 583, weight: 10, minLevel: 39, maxLevel: 43 }, // Vanillish
      { speciesId: 538, weight: 5, minLevel: 39, maxLevel: 43 }, // Throh
    ],
  },
  { id: 'circhester', name: 'Circhester', unlockAt: 210_000, background: 'snow.png', encounters: [] }, // gym: Gordie/Melony

  // --- Trecho 7: Circhester → Spikemuth (Ginásio 7: Piers, Dark) ---
  {
    id: 'route-9',
    name: 'Rota 9',
    unlockAt: 250_000,
    background: 'ocean.png',
    encounters: [
      { speciesId: 279, weight: 40, minLevel: 41, maxLevel: 44 }, // Pelipper
      { speciesId: 593, weight: 35, minLevel: 41, maxLevel: 44 }, // Jellicent
      { speciesId: 423, weight: 15, minLevel: 41, maxLevel: 44 }, // Gastrodon (Mar do Leste)
      { speciesId: 747, weight: 5, minLevel: 41, maxLevel: 44 }, // Mareanie
      { speciesId: 771, weight: 5, minLevel: 41, maxLevel: 44 }, // Pyukumuku
    ],
  },
  { id: 'spikemuth', name: 'Spikemuth', unlockAt: 290_000, background: 'cave-3.png', encounters: [] }, // gym: Piers

  // --- Trecho 8: Spikemuth → Hammerlocke, volta (Ginásio 8: Raihan) → Wyndon ---
  {
    id: 'route-10',
    name: 'Rota 10',
    unlockAt: 340_000,
    background: 'snow.png',
    encounters: [
      { speciesId: 122, weight: 32, minLevel: 45, maxLevel: 48 }, // Mr. Mime Galariano
      { speciesId: 459, weight: 25, minLevel: 45, maxLevel: 48 }, // Snover
      { speciesId: 613, weight: 25, minLevel: 45, maxLevel: 48 }, // Cubchoo
      { speciesId: 215, weight: 14, minLevel: 45, maxLevel: 48 }, // Sneasel
      { speciesId: 362, weight: 10, minLevel: 45, maxLevel: 48 }, // Glalie
      { speciesId: 584, weight: 10, minLevel: 45, maxLevel: 48 }, // Vanilluxe
      { speciesId: 884, weight: 1, minLevel: 45, maxLevel: 48 }, // Duraludon
    ],
  },
  { id: 'hammerlocke-gym', name: 'Hammerlocke', unlockAt: 400_000, background: 'mountain-2.png', encounters: [] }, // gym: Raihan — mesma cidade de hammerlocke, 2ª passagem
  // id fixo 'victory-road' (App.tsx's handleChallengeEliteFour depende
  // desse literal em toda região) — Wyndon/Estádio Nacional é o "Victory
  // Road" de Galar (Champion Cup + Campeão), sem local próprio de
  // "corredor final" no jogo real.
  { id: 'victory-road', name: 'Wyndon', unlockAt: 460_000, background: 'path-2.png', encounters: [] }, // Champion Cup + Campeão
]
