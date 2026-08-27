import type { GymDefinition } from '../gen1/gyms'

// Sources: docs/ROTAS-GALAR.md (Bulbapedia, Pokémon Sword/Shield). Ginásios
// 4 (Stow-on-Side) e 6 (Circhester) são version-exclusive de verdade — Bea/
// Gordie só existem em Sword, Allister/Melony só em Shield. Resolvido em
// systems/gyms/gymProgress.ts's resolveGym, chaveado por
// RegionSave.versionVariant (sorteado uma vez na criação do save).
export const GYMS: GymDefinition[] = [
  {
    id: 'milo',
    leaderName: 'Milo',
    badgeName: 'Insígnia Grama',
    locationId: 'turffield',
    team: [
      { speciesId: 829, level: 19 }, // Gossifleur
      { speciesId: 830, level: 20 }, // Eldegoss
    ],
  },
  {
    id: 'nessa',
    leaderName: 'Nessa',
    badgeName: 'Insígnia Água',
    locationId: 'hulbury',
    team: [
      { speciesId: 118, level: 22 }, // Goldeen
      { speciesId: 846, level: 23 }, // Arrokuda
      { speciesId: 834, level: 24 }, // Drednaw
    ],
  },
  {
    id: 'kabu',
    leaderName: 'Kabu',
    badgeName: 'Insígnia Fogo',
    // Não a 1ª passagem por Motostoke — ver 'motostoke-gym' em
    // content/gen8/locations.ts (mesmo padrão de petalburg-city-gym/
    // olivine-city-gym).
    locationId: 'motostoke-gym',
    team: [
      { speciesId: 38, level: 25 }, // Ninetales
      { speciesId: 59, level: 25 }, // Arcanine
      { speciesId: 851, level: 27 }, // Centiskorch
    ],
  },
  {
    id: 'stow-on-side',
    leaderName: 'Bea',
    badgeName: 'Insígnia Punho',
    locationId: 'stow-on-side',
    team: [
      { speciesId: 237, level: 34 }, // Hitmontop
      { speciesId: 675, level: 34 }, // Pangoro
      { speciesId: 865, level: 35 }, // Sirfetch'd
      { speciesId: 68, level: 36 }, // Machamp
    ],
    leaderNameByVersion: { a: 'Bea', b: 'Allister' },
    teamByVersion: {
      a: [
        { speciesId: 237, level: 34 }, // Hitmontop
        { speciesId: 675, level: 34 }, // Pangoro
        { speciesId: 865, level: 35 }, // Sirfetch'd
        { speciesId: 68, level: 36 }, // Machamp
      ],
      b: [
        { speciesId: 562, level: 34 }, // Yamask
        { speciesId: 778, level: 34 }, // Mimikyu
        { speciesId: 864, level: 35 }, // Cursola
        { speciesId: 94, level: 36 }, // Gengar
      ],
    },
  },
  {
    id: 'opal',
    leaderName: 'Opal',
    badgeName: 'Insígnia Fada',
    locationId: 'ballonlea',
    team: [
      { speciesId: 110, level: 36 }, // Weezing
      { speciesId: 303, level: 36 }, // Mawile
      { speciesId: 468, level: 37 }, // Togekiss
      { speciesId: 869, level: 38 }, // Alcremie
    ],
  },
  {
    id: 'circhester',
    leaderName: 'Gordie',
    badgeName: 'Insígnia Pedra',
    locationId: 'circhester',
    team: [
      { speciesId: 689, level: 40 }, // Barbaracle
      { speciesId: 213, level: 40 }, // Shuckle
      { speciesId: 874, level: 41 }, // Stonjourner
      { speciesId: 839, level: 42 }, // Coalossal
    ],
    leaderNameByVersion: { a: 'Gordie', b: 'Melony' },
    teamByVersion: {
      a: [
        { speciesId: 689, level: 40 }, // Barbaracle
        { speciesId: 213, level: 40 }, // Shuckle
        { speciesId: 874, level: 41 }, // Stonjourner
        { speciesId: 839, level: 42 }, // Coalossal
      ],
      b: [
        { speciesId: 873, level: 40 }, // Frosmoth
        { speciesId: 555, level: 40 }, // Darmanitan Galariana
        { speciesId: 875, level: 41 }, // Eiscue
        { speciesId: 131, level: 42 }, // Lapras
      ],
    },
  },
  {
    id: 'piers',
    leaderName: 'Piers',
    badgeName: 'Insígnia Sombria',
    locationId: 'spikemuth',
    team: [
      { speciesId: 560, level: 44 }, // Scrafty
      { speciesId: 687, level: 45 }, // Malamar
      { speciesId: 435, level: 45 }, // Skuntank
      { speciesId: 862, level: 46 }, // Obstagoon
    ],
  },
  {
    id: 'raihan',
    leaderName: 'Raihan',
    badgeName: 'Insígnia Dragão',
    // Não a 1ª passagem por Hammerlocke — ver 'hammerlocke-gym' em
    // content/gen8/locations.ts (mesmo padrão de petalburg-city-gym/
    // olivine-city-gym).
    locationId: 'hammerlocke-gym',
    team: [
      { speciesId: 526, level: 46 }, // Gigalith
      { speciesId: 844, level: 46 }, // Sandaconda
      { speciesId: 330, level: 47 }, // Flygon
      { speciesId: 884, level: 48 }, // Duraludon
    ],
  },
]
