import type { GymDefinition } from '../gen1/gyms'

// Sources: https://bulbapedia.bulbagarden.net/wiki/Roark and the equivalent
// per-leader Bulbapedia pages listed in docs/ROTAS-SINNOH.md (Pokémon
// Platinum — gym ORDER differs from Diamond/Pearl: Fantina is 3rd, Maylene
// is 4th, see the doc's Metodologia).
export const GYMS: GymDefinition[] = [
  {
    id: 'roark',
    leaderName: 'Roark',
    badgeName: 'Insígnia Seixo',
    locationId: 'oreburgh-city',
    team: [
      { speciesId: 74, level: 12 }, // Geodude
      { speciesId: 95, level: 12 }, // Onix
      { speciesId: 408, level: 14 }, // Cranidos
    ],
  },
  {
    id: 'gardenia',
    leaderName: 'Gardenia',
    badgeName: 'Insígnia Floresta',
    locationId: 'eterna-city',
    team: [
      { speciesId: 387, level: 20 }, // Turtwig
      { speciesId: 421, level: 20 }, // Cherrim
      { speciesId: 407, level: 22 }, // Roserade
    ],
  },
  {
    id: 'fantina',
    leaderName: 'Fantina',
    badgeName: 'Insígnia Relíquia',
    locationId: 'hearthome-city',
    team: [
      { speciesId: 355, level: 24 }, // Duskull
      { speciesId: 93, level: 24 }, // Haunter
      { speciesId: 429, level: 26 }, // Mismagius
    ],
  },
  {
    id: 'maylene',
    leaderName: 'Maylene',
    badgeName: 'Insígnia Cosme',
    locationId: 'veilstone-city',
    team: [
      { speciesId: 307, level: 28 }, // Meditite
      { speciesId: 67, level: 29 }, // Machoke
      { speciesId: 448, level: 32 }, // Lucario
    ],
  },
  {
    id: 'crasher-wake',
    leaderName: 'Crasher Wake',
    badgeName: 'Insígnia Pântano',
    locationId: 'pastoria-city',
    team: [
      { speciesId: 130, level: 33 }, // Gyarados
      { speciesId: 195, level: 34 }, // Quagsire
      { speciesId: 419, level: 37 }, // Floatzel
    ],
  },
  {
    id: 'byron',
    leaderName: 'Byron',
    badgeName: 'Insígnia Alvorada',
    locationId: 'canalave-city',
    team: [
      { speciesId: 82, level: 37 }, // Magneton
      { speciesId: 208, level: 38 }, // Steelix
      { speciesId: 411, level: 41 }, // Bastiodon
    ],
  },
  {
    id: 'candice',
    leaderName: 'Candice',
    badgeName: 'Insígnia Icicle',
    locationId: 'snowpoint-city',
    team: [
      { speciesId: 215, level: 40 }, // Sneasel
      { speciesId: 221, level: 40 }, // Piloswine
      { speciesId: 460, level: 42 }, // Abomasnow
      { speciesId: 478, level: 44 }, // Froslass
    ],
  },
  {
    id: 'volkner',
    leaderName: 'Volkner',
    badgeName: 'Insígnia Feixe',
    locationId: 'sunyshore-city',
    team: [
      { speciesId: 135, level: 46 }, // Jolteon
      { speciesId: 26, level: 46 }, // Raichu
      { speciesId: 405, level: 48 }, // Luxray
      { speciesId: 466, level: 50 }, // Electivire
    ],
  },
]
