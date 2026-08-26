import type { GymTeamMember } from '../gen1/gyms'
import type { EliteFourMember } from '../gen1/eliteFour'
import { STARTER_IDS } from './starters'

// Provisional, same starting point Kanto/Johto used before their own
// Sprint 25 simulation passes tuned them (docs/decisoes/0019-*.md,
// 0038-*.md, 0042-*.md) — not calibrated against tests/simulations/ yet.
// Reusing Kanto's original LEVEL_BUMP=12 / CHAMPION_LEVEL_BUMP=8 as the
// starting guess rather than inventing new numbers from nothing.
const LEVEL_BUMP = 12
const CHAMPION_LEVEL_BUMP = 8

// Sources: docs/ROTAS-HOENN.md (Bulbapedia, Pokémon Emerald) — levels below
// are the original Bulbapedia numbers + LEVEL_BUMP, not invented from
// scratch.
export const ELITE_FOUR: EliteFourMember[] = [
  {
    id: 'sidney',
    name: 'Sidney',
    team: [
      { speciesId: 262, level: 46 + LEVEL_BUMP }, // Mightyena
      { speciesId: 332, level: 46 + LEVEL_BUMP }, // Cacturne
      { speciesId: 275, level: 48 + LEVEL_BUMP }, // Shiftry
      { speciesId: 342, level: 48 + LEVEL_BUMP }, // Crawdaunt
      { speciesId: 359, level: 49 + LEVEL_BUMP }, // Absol
    ],
  },
  {
    id: 'phoebe',
    name: 'Phoebe',
    team: [
      { speciesId: 356, level: 48 + LEVEL_BUMP }, // Dusclops
      { speciesId: 354, level: 49 + LEVEL_BUMP }, // Banette
      { speciesId: 354, level: 49 + LEVEL_BUMP }, // Banette
      { speciesId: 302, level: 50 + LEVEL_BUMP }, // Sableye
      { speciesId: 356, level: 51 + LEVEL_BUMP }, // Dusclops
    ],
  },
  {
    id: 'glacia',
    name: 'Glacia',
    team: [
      { speciesId: 364, level: 50 + LEVEL_BUMP }, // Sealeo
      { speciesId: 362, level: 50 + LEVEL_BUMP }, // Glalie
      { speciesId: 364, level: 52 + LEVEL_BUMP }, // Sealeo
      { speciesId: 362, level: 52 + LEVEL_BUMP }, // Glalie
      { speciesId: 365, level: 53 + LEVEL_BUMP }, // Walrein
    ],
  },
  {
    id: 'drake',
    name: 'Drake',
    team: [
      { speciesId: 372, level: 52 + LEVEL_BUMP }, // Shelgon
      { speciesId: 334, level: 54 + LEVEL_BUMP }, // Altaria
      { speciesId: 230, level: 53 + LEVEL_BUMP }, // Kingdra
      { speciesId: 330, level: 53 + LEVEL_BUMP }, // Flygon
      { speciesId: 373, level: 55 + LEVEL_BUMP }, // Salamence
    ],
  },
]

// Campeã — Wallace. Assim como o Lance de Johto, o time de Wallace NÃO varia
// pelo starter escolhido (confirmado contra a fonte, docs/ROTAS-HOENN.md) —
// mesmo time fixo independente do starter, cada chave de STARTER_IDS abaixo
// aponta pro mesmo array. systems/gyms/champion.ts resolve isso genericamente
// dos dois jeitos.
const WALLACE_TEAM: GymTeamMember[] = [
  { speciesId: 73, level: 55 + CHAMPION_LEVEL_BUMP }, // Tentacruel
  { speciesId: 272, level: 56 + CHAMPION_LEVEL_BUMP }, // Ludicolo
  { speciesId: 340, level: 56 + CHAMPION_LEVEL_BUMP }, // Whiscash
  { speciesId: 130, level: 56 + CHAMPION_LEVEL_BUMP }, // Gyarados
  { speciesId: 321, level: 57 + CHAMPION_LEVEL_BUMP }, // Wailord
  { speciesId: 350, level: 58 + CHAMPION_LEVEL_BUMP }, // Milotic
]

export const CHAMPION_TEAM_BY_STARTER: Record<number, GymTeamMember[]> = {
  [STARTER_IDS[0]]: WALLACE_TEAM, // Treecko
  [STARTER_IDS[1]]: WALLACE_TEAM, // Torchic
  [STARTER_IDS[2]]: WALLACE_TEAM, // Mudkip
}

export const CHAMPION_DEFAULT_STARTER_ID = STARTER_IDS[0]
