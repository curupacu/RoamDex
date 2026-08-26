import type { GymDefinition } from '../gen1/gyms'

// Sources: https://bulbapedia.bulbagarden.net/wiki/Viola and the equivalent
// per-leader Bulbapedia pages listed in docs/ROTAS-KALOS.md (Pokémon X —
// gym order and rosters are identical between X and Y, unlike Hoenn/Sinnoh).
export const GYMS: GymDefinition[] = [
  {
    id: 'viola',
    leaderName: 'Viola',
    badgeName: 'Insígnia Inseto',
    locationId: 'santalune-city',
    team: [
      { speciesId: 283, level: 10 }, // Surskit
      { speciesId: 666, level: 12 }, // Vivillon
    ],
  },
  {
    id: 'grant',
    leaderName: 'Grant',
    badgeName: 'Insígnia Penhasco',
    locationId: 'cyllage-city',
    team: [
      { speciesId: 698, level: 25 }, // Amaura
      { speciesId: 696, level: 25 }, // Tyrunt
    ],
  },
  {
    id: 'korrina',
    leaderName: 'Korrina',
    badgeName: 'Insígnia Combate',
    locationId: 'shalour-city',
    team: [
      { speciesId: 67, level: 28 }, // Machoke
      { speciesId: 619, level: 29 }, // Mienfoo
      { speciesId: 701, level: 32 }, // Hawlucha
    ],
  },
  {
    id: 'ramos',
    leaderName: 'Ramos',
    badgeName: 'Insígnia Planta',
    locationId: 'coumarine-city',
    team: [
      { speciesId: 189, level: 30 }, // Jumpluff
      { speciesId: 70, level: 31 }, // Weepinbell
      { speciesId: 673, level: 34 }, // Gogoat
    ],
  },
  {
    id: 'clemont',
    leaderName: 'Clemont',
    badgeName: 'Insígnia Voltagem',
    // Não é a primeira passagem por Lumiose — ver 'lumiose-city-gym' em
    // content/gen6/locations.ts: o jogador só desafia Clemont numa visita
    // posterior.
    locationId: 'lumiose-city-gym',
    team: [
      { speciesId: 587, level: 35 }, // Emolga
      { speciesId: 82, level: 35 }, // Magneton
      { speciesId: 695, level: 37 }, // Heliolisk
    ],
  },
  {
    id: 'valerie',
    leaderName: 'Valerie',
    badgeName: 'Insígnia Fada',
    locationId: 'laverre-city',
    team: [
      { speciesId: 303, level: 38 }, // Mawile
      { speciesId: 122, level: 39 }, // Mr. Mime
      { speciesId: 700, level: 42 }, // Sylveon
    ],
  },
  {
    id: 'olympia',
    leaderName: 'Olympia',
    badgeName: 'Insígnia Psíquica',
    locationId: 'anistar-city',
    team: [
      { speciesId: 561, level: 44 }, // Sigilyph
      { speciesId: 199, level: 45 }, // Slowking
      { speciesId: 678, level: 48 }, // Meowstic
    ],
  },
  {
    id: 'wulfric',
    leaderName: 'Wulfric',
    badgeName: 'Insígnia Nevasca',
    locationId: 'snowbelle-city',
    team: [
      { speciesId: 615, level: 55 }, // Cryogonal
      { speciesId: 460, level: 56 }, // Abomasnow
      { speciesId: 713, level: 59 }, // Avalugg
    ],
  },
]
