import type { GymDefinition } from '../gen1/gyms'

// Sources: https://bulbapedia.bulbagarden.net/wiki/Roxanne and the equivalent
// per-leader Bulbapedia pages listed in docs/ROTAS-HOENN.md (Pokémon
// Emerald — Juan, not Wallace, is gym 8; see the doc's Metodologia).
//
// Balance pass (docs/decisoes/0044-*.md): tests/simulations/battle.sim.test.ts
// found Norman unwinnable at the team's own average level (0% HP left,
// every other Hoenn gym passes comfortably) — root cause is Slaking's raw
// stats (base 160 ATK, this engine only models HP/ATK/DEF, roadmap seção 4),
// which in the real games is checked by the Truant ability (skips every
// other turn) that this project doesn't model at all. Same shape of problem
// as Lance's Dragonite trio in Johto (decisão 0038): a real-game Pokémon
// whose intended balance leans on a mechanic outside this engine's scope.
// Fix, same spirit as CHAMPION_LEVEL_BUMP: touch only the one broken team
// member, not the whole roster or the damage formula. Swept Slaking's level
// alone (script deleted after the finding was written up) — 31 (original)
// loses completely, 28 is the first value with a comfortable non-paper-thin
// margin (20% HP left, team average recomputes to 28 too). Norman is still
// the region's toughest normal gym battle (Slaking stays the team's highest
// level), just not an unmodeled-ability wall anymore.
const NORMAN_SLAKING_LEVEL = 28

export const GYMS: GymDefinition[] = [
  {
    id: 'roxanne',
    leaderName: 'Roxanne',
    badgeName: 'Insígnia Pedra',
    locationId: 'rustboro-city',
    team: [
      { speciesId: 74, level: 12 }, // Geodude
      { speciesId: 299, level: 15 }, // Nosepass
    ],
  },
  {
    id: 'brawly',
    leaderName: 'Brawly',
    badgeName: 'Insígnia Nó',
    locationId: 'dewford-town',
    team: [
      { speciesId: 66, level: 16 }, // Machop
      { speciesId: 307, level: 16 }, // Meditite
      { speciesId: 296, level: 19 }, // Makuhita
    ],
  },
  {
    id: 'wattson',
    leaderName: 'Wattson',
    badgeName: 'Insígnia Dínamo',
    locationId: 'mauville-city',
    team: [
      { speciesId: 100, level: 20 }, // Voltorb
      { speciesId: 309, level: 20 }, // Electrike
      { speciesId: 82, level: 22 }, // Magneton
      { speciesId: 310, level: 24 }, // Manectric
    ],
  },
  {
    id: 'flannery',
    leaderName: 'Flannery',
    badgeName: 'Insígnia Calor',
    locationId: 'lavaridge-town',
    team: [
      { speciesId: 322, level: 24 }, // Numel
      { speciesId: 218, level: 24 }, // Slugma
      { speciesId: 323, level: 26 }, // Camerupt
      { speciesId: 324, level: 29 }, // Torkoal
    ],
  },
  {
    id: 'norman',
    leaderName: 'Norman',
    badgeName: 'Insígnia Equilíbrio',
    // Não é a primeira passagem por Petalburg — ver 'petalburg-city-gym' em
    // content/gen3/locations.ts (Trecho 5, docs/ROTAS-HOENN.md): o jogador só
    // enfrenta Norman na volta, depois de já ter a insígnia de Flannery.
    locationId: 'petalburg-city-gym',
    team: [
      { speciesId: 327, level: 27 }, // Spinda
      { speciesId: 288, level: 27 }, // Vigoroth
      { speciesId: 264, level: 29 }, // Linoone
      { speciesId: 289, level: NORMAN_SLAKING_LEVEL }, // Slaking — original Bulbapedia level is 31, see comment above
    ],
  },
  {
    id: 'winona',
    leaderName: 'Winona',
    badgeName: 'Insígnia Pena',
    locationId: 'fortree-city',
    team: [
      { speciesId: 333, level: 29 }, // Swablu
      { speciesId: 357, level: 29 }, // Tropius
      { speciesId: 279, level: 30 }, // Pelipper
      { speciesId: 227, level: 31 }, // Skarmory
      { speciesId: 334, level: 33 }, // Altaria
    ],
  },
  {
    id: 'tate-and-liza',
    leaderName: 'Tate & Liza',
    badgeName: 'Insígnia Mente',
    locationId: 'mossdeep-city',
    // Double Battle no jogo original — o motor de batalha 1v1 deste projeto
    // não modela isso; tratado como sequência normal de 4, mesma
    // simplificação já aceita pro resto do jogo (ver docs/ROTAS-HOENN.md).
    team: [
      { speciesId: 344, level: 41 }, // Claydol
      { speciesId: 178, level: 41 }, // Xatu
      { speciesId: 337, level: 42 }, // Lunatone
      { speciesId: 338, level: 42 }, // Solrock
    ],
  },
  {
    id: 'juan',
    leaderName: 'Juan',
    badgeName: 'Insígnia Chuva',
    locationId: 'sootopolis-city',
    team: [
      { speciesId: 370, level: 41 }, // Luvdisc
      { speciesId: 340, level: 41 }, // Whiscash
      { speciesId: 364, level: 43 }, // Sealeo
      { speciesId: 342, level: 43 }, // Crawdaunt
      { speciesId: 230, level: 46 }, // Kingdra
    ],
  },
]
