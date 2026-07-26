import type { GymDefinition } from '../gen1/gyms'

// Sources: https://bulbapedia.bulbagarden.net/wiki/Falkner and the equivalent
// per-leader Bulbapedia pages listed in docs/ROTAS-JOHTO.md (Pokémon Gold).
export const GYMS: GymDefinition[] = [
  {
    id: 'falkner',
    leaderName: 'Falkner',
    badgeName: 'Insígnia Zéfiro',
    locationId: 'violet-city',
    team: [
      { speciesId: 16, level: 7 }, // Pidgey
      { speciesId: 17, level: 9 }, // Pidgeotto
    ],
  },
  {
    id: 'bugsy',
    leaderName: 'Bugsy',
    badgeName: 'Insígnia Colmeia',
    locationId: 'azalea-town',
    team: [
      { speciesId: 11, level: 14 }, // Metapod
      { speciesId: 14, level: 14 }, // Kakuna
      { speciesId: 123, level: 16 }, // Scyther
    ],
  },
  {
    id: 'whitney',
    leaderName: 'Whitney',
    badgeName: 'Insígnia Planície',
    locationId: 'goldenrod-city',
    team: [
      { speciesId: 35, level: 18 }, // Clefairy
      { speciesId: 241, level: 20 }, // Miltank
    ],
  },
  {
    id: 'morty',
    leaderName: 'Morty',
    badgeName: 'Insígnia Névoa',
    locationId: 'ecruteak-city',
    team: [
      { speciesId: 92, level: 21 }, // Gastly
      { speciesId: 93, level: 21 }, // Haunter
      { speciesId: 94, level: 25 }, // Gengar
      { speciesId: 93, level: 23 }, // Haunter
    ],
  },
  {
    id: 'chuck',
    leaderName: 'Chuck',
    badgeName: 'Insígnia Tempestade',
    locationId: 'cianwood-city',
    team: [
      { speciesId: 57, level: 27 }, // Primeape
      { speciesId: 62, level: 30 }, // Poliwrath
    ],
  },
  {
    id: 'jasmine',
    leaderName: 'Jasmine',
    badgeName: 'Insígnia Mineral',
    // Not Olivine's first pass-through stop — see the 'olivine-city-gym'
    // entry in content/gen2/locations.ts (Trecho 6, docs/ROTAS-JOHTO.md):
    // the player only fights Jasmine on the return trip, after curing Amphy
    // with the SecretPotion gotten from Chuck.
    locationId: 'olivine-city-gym',
    team: [
      { speciesId: 81, level: 30 }, // Magnemite
      { speciesId: 81, level: 30 }, // Magnemite
      { speciesId: 208, level: 35 }, // Steelix
    ],
  },
  {
    id: 'pryce',
    leaderName: 'Pryce',
    badgeName: 'Insígnia Gelo',
    locationId: 'mahogany-town',
    team: [
      { speciesId: 86, level: 27 }, // Seel
      { speciesId: 87, level: 29 }, // Dewgong
      { speciesId: 221, level: 31 }, // Piloswine
    ],
  },
  {
    id: 'clair',
    leaderName: 'Clair',
    badgeName: 'Insígnia Ascensão',
    locationId: 'blackthorn-city',
    team: [
      { speciesId: 148, level: 37 }, // Dragonair
      { speciesId: 148, level: 37 }, // Dragonair
      { speciesId: 148, level: 37 }, // Dragonair
      { speciesId: 230, level: 40 }, // Kingdra
    ],
  },
]
