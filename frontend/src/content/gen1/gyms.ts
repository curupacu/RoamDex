export interface GymTeamMember {
  speciesId: number
  level: number
}

export interface GymDefinition {
  id: string
  leaderName: string
  badgeName: string
  // Which KANTO_LOCATIONS id hosts this gym (content/gen1/locations.ts).
  locationId: string
  // Team + levels from Bulbapedia (Pokémon Red) — not invented, see
  // docs/ROTAS-KANTO.md. Fought as one continuous battle: no heal between
  // the leader's own Pokémon, same as the real games (that's Elite Four-only).
  team: GymTeamMember[]
}

// Sources: https://bulbapedia.bulbagarden.net/wiki/Brock and the equivalent
// per-leader Bulbapedia pages listed in docs/ROTAS-KANTO.md.
export const GYMS: GymDefinition[] = [
  {
    id: 'brock',
    leaderName: 'Brock',
    badgeName: 'Insígnia Pedra',
    locationId: 'pewter-city',
    team: [
      { speciesId: 74, level: 12 }, // Geodude
      { speciesId: 95, level: 14 }, // Onix
    ],
  },
  {
    id: 'misty',
    leaderName: 'Misty',
    badgeName: 'Insígnia Cascata',
    locationId: 'cerulean-city',
    team: [
      { speciesId: 120, level: 18 }, // Staryu
      { speciesId: 121, level: 21 }, // Starmie
    ],
  },
  {
    id: 'lt-surge',
    leaderName: 'Lt. Surge',
    badgeName: 'Insígnia Trovão',
    locationId: 'vermilion-city',
    team: [
      { speciesId: 100, level: 21 }, // Voltorb
      { speciesId: 25, level: 18 }, // Pikachu
      { speciesId: 26, level: 24 }, // Raichu
    ],
  },
  {
    id: 'erika',
    leaderName: 'Erika',
    badgeName: 'Insígnia Arco-íris',
    locationId: 'celadon-city',
    team: [
      { speciesId: 71, level: 29 }, // Victreebel
      { speciesId: 114, level: 24 }, // Tangela
      { speciesId: 45, level: 29 }, // Vileplume
    ],
  },
  {
    id: 'koga',
    leaderName: 'Koga',
    badgeName: 'Insígnia Alma',
    locationId: 'fuchsia-city',
    team: [
      { speciesId: 109, level: 37 }, // Koffing
      { speciesId: 89, level: 39 }, // Muk
      { speciesId: 109, level: 37 }, // Koffing
      { speciesId: 110, level: 43 }, // Weezing
    ],
  },
  {
    id: 'sabrina',
    leaderName: 'Sabrina',
    badgeName: 'Insígnia Pântano',
    locationId: 'saffron-city',
    team: [
      { speciesId: 64, level: 38 }, // Kadabra
      { speciesId: 122, level: 37 }, // Mr. Mime
      { speciesId: 49, level: 38 }, // Venomoth
      { speciesId: 65, level: 43 }, // Alakazam
    ],
  },
  {
    id: 'blaine',
    leaderName: 'Blaine',
    badgeName: 'Insígnia Vulcão',
    locationId: 'cinnabar-island',
    team: [
      { speciesId: 58, level: 42 }, // Growlithe
      { speciesId: 77, level: 40 }, // Ponyta
      { speciesId: 78, level: 42 }, // Rapidash
      { speciesId: 59, level: 47 }, // Arcanine
    ],
  },
  {
    id: 'giovanni',
    leaderName: 'Giovanni',
    badgeName: 'Insígnia Terra',
    locationId: 'viridian-city',
    team: [
      { speciesId: 111, level: 45 }, // Rhyhorn
      { speciesId: 51, level: 42 }, // Dugtrio
      { speciesId: 31, level: 44 }, // Nidoqueen
      { speciesId: 34, level: 45 }, // Nidoking
      { speciesId: 112, level: 50 }, // Rhydon
    ],
  },
]
