import type { GymTeamMember } from '../gen1/gyms'
import type { EliteFourMember } from '../gen1/eliteFour'
import { STARTER_IDS } from './starters'

// Provisional — same starting point Hoenn used (docs/decisoes/0043-*.md):
// Kanto's original LEVEL_BUMP=12 / CHAMPION_LEVEL_BUMP=8, not calibrated
// against tests/simulations/ yet for Sinnoh specifically.
const LEVEL_BUMP = 12
const CHAMPION_LEVEL_BUMP = 8

// Sources: docs/ROTAS-SINNOH.md (Bulbapedia, Pokémon Platinum, first-battle
// levels only — trainer pages list a lower "first battle" and a higher
// "rematch" level per Pokémon, only the first entered here) — levels below
// are the original Bulbapedia numbers + LEVEL_BUMP, not invented from
// scratch.
export const ELITE_FOUR: EliteFourMember[] = [
  {
    id: 'aaron',
    name: 'Aaron',
    team: [
      { speciesId: 469, level: 49 + LEVEL_BUMP }, // Yanmega
      { speciesId: 416, level: 50 + LEVEL_BUMP }, // Vespiquen
      { speciesId: 212, level: 49 + LEVEL_BUMP }, // Scizor
      { speciesId: 214, level: 51 + LEVEL_BUMP }, // Heracross
      { speciesId: 452, level: 53 + LEVEL_BUMP }, // Drapion
    ],
  },
  {
    id: 'bertha',
    name: 'Bertha',
    team: [
      { speciesId: 340, level: 50 + LEVEL_BUMP }, // Whiscash
      { speciesId: 450, level: 52 + LEVEL_BUMP }, // Hippowdon
      { speciesId: 76, level: 52 + LEVEL_BUMP }, // Golem
      { speciesId: 472, level: 53 + LEVEL_BUMP }, // Gliscor
      { speciesId: 464, level: 55 + LEVEL_BUMP }, // Rhyperior
    ],
  },
  {
    id: 'flint',
    name: 'Flint',
    team: [
      { speciesId: 229, level: 52 + LEVEL_BUMP }, // Houndoom
      { speciesId: 78, level: 53 + LEVEL_BUMP }, // Rapidash
      { speciesId: 136, level: 55 + LEVEL_BUMP }, // Flareon
      { speciesId: 392, level: 55 + LEVEL_BUMP }, // Infernape
      { speciesId: 467, level: 57 + LEVEL_BUMP }, // Magmortar
    ],
  },
  {
    id: 'lucian',
    name: 'Lucian',
    team: [
      { speciesId: 122, level: 53 + LEVEL_BUMP }, // Mr. Mime
      { speciesId: 437, level: 54 + LEVEL_BUMP }, // Bronzong
      { speciesId: 196, level: 55 + LEVEL_BUMP }, // Espeon
      { speciesId: 65, level: 56 + LEVEL_BUMP }, // Alakazam
      { speciesId: 475, level: 59 + LEVEL_BUMP }, // Gallade
    ],
  },
]

// Campeã — Cynthia. Time da primeira luta (docs/ROTAS-SINNOH.md), não a
// revanche pós-jogo. Assim como Lance/Wallace, o time de Cynthia NÃO varia
// pelo starter escolhido — mesmo time fixo, cada chave de STARTER_IDS
// abaixo aponta pro mesmo array.
const CYNTHIA_TEAM: GymTeamMember[] = [
  { speciesId: 442, level: 58 + CHAMPION_LEVEL_BUMP }, // Spiritomb
  { speciesId: 407, level: 58 + CHAMPION_LEVEL_BUMP }, // Roserade
  { speciesId: 350, level: 58 + CHAMPION_LEVEL_BUMP }, // Milotic
  { speciesId: 468, level: 60 + CHAMPION_LEVEL_BUMP }, // Togekiss
  { speciesId: 448, level: 60 + CHAMPION_LEVEL_BUMP }, // Lucario
  { speciesId: 445, level: 62 + CHAMPION_LEVEL_BUMP }, // Garchomp
]

export const CHAMPION_TEAM_BY_STARTER: Record<number, GymTeamMember[]> = {
  [STARTER_IDS[0]]: CYNTHIA_TEAM, // Turtwig
  [STARTER_IDS[1]]: CYNTHIA_TEAM, // Chimchar
  [STARTER_IDS[2]]: CYNTHIA_TEAM, // Piplup
}

export const CHAMPION_DEFAULT_STARTER_ID = STARTER_IDS[0]
