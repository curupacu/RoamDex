import type { GymTeamMember } from '../gen1/gyms'
import type { EliteFourMember } from '../gen1/eliteFour'
import { STARTER_IDS } from './starters'

// Hala, Olivia e Acerola são Kahunas/Capitã que REAPARECEM na Elite Four
// pós-jogo com times mais fortes (docs/ROTAS-ALOLA.md) — diferentes dos
// times usados em gyms.ts (Grande Provação/Totem). Nanu recusou a vaga;
// Acerola assume no lugar dele. LEVEL_BUMP/CHAMPION_LEVEL_BUMP no mesmo
// padrão default de Kanto (0018) — ainda não recalibrado por simulação de
// batalha real (ver docs/decisoes/00NN-sprint-alola-gen7.md).
const LEVEL_BUMP = 12
const CHAMPION_LEVEL_BUMP = 8

export const ELITE_FOUR: EliteFourMember[] = [
  {
    id: 'hala',
    name: 'Hala',
    team: [
      { speciesId: 297, level: 54 + LEVEL_BUMP }, // Hariyama
      { speciesId: 57, level: 54 + LEVEL_BUMP }, // Primeape
      { speciesId: 760, level: 54 + LEVEL_BUMP }, // Bewear
      { speciesId: 62, level: 54 + LEVEL_BUMP }, // Poliwrath
      { speciesId: 740, level: 55 + LEVEL_BUMP }, // Crabominable
    ],
  },
  {
    id: 'olivia',
    name: 'Olivia',
    team: [
      { speciesId: 369, level: 54 + LEVEL_BUMP }, // Relicanth
      { speciesId: 703, level: 54 + LEVEL_BUMP }, // Carbink
      { speciesId: 76, level: 54 + LEVEL_BUMP }, // Golem Alolano
      { speciesId: 476, level: 54 + LEVEL_BUMP }, // Probopass
      { speciesId: 745, level: 55 + LEVEL_BUMP }, // Lycanroc
    ],
  },
  {
    id: 'acerola',
    name: 'Acerola',
    team: [
      { speciesId: 302, level: 54 + LEVEL_BUMP }, // Sableye
      { speciesId: 426, level: 54 + LEVEL_BUMP }, // Drifblim
      { speciesId: 781, level: 54 + LEVEL_BUMP }, // Dhelmise
      { speciesId: 478, level: 54 + LEVEL_BUMP }, // Froslass
      { speciesId: 770, level: 55 + LEVEL_BUMP }, // Palossand
    ],
  },
  {
    id: 'kahili',
    name: 'Kahili',
    team: [
      { speciesId: 227, level: 54 + LEVEL_BUMP }, // Skarmory
      { speciesId: 169, level: 54 + LEVEL_BUMP }, // Crobat
      { speciesId: 741, level: 54 + LEVEL_BUMP }, // Oricorio
      { speciesId: 630, level: 54 + LEVEL_BUMP }, // Mandibuzz
      { speciesId: 733, level: 55 + LEVEL_BUMP }, // Toucannon
    ],
  },
]

// Campeão (Professor Kukui) — 5 membros fixos + 1 que varia pelo inicial
// escolhido (docs/ROTAS-ALOLA.md). Chaveado pelo id do starter (722
// Rowlet, 725 Litten, 728 Popplio) — ver systems/gyms/champion.ts.
export const CHAMPION_TEAM_BY_STARTER: Record<number, GymTeamMember[]> = {
  [STARTER_IDS[0]]: [
    // Player chose Rowlet -> Kukui's Incineroar (Fire, forte contra Grass)
    { speciesId: 745, level: 57 + CHAMPION_LEVEL_BUMP }, // Lycanroc
    { speciesId: 38, level: 56 + CHAMPION_LEVEL_BUMP }, // Ninetales Alolano
    { speciesId: 628, level: 56 + CHAMPION_LEVEL_BUMP }, // Braviary
    { speciesId: 462, level: 56 + CHAMPION_LEVEL_BUMP }, // Magnezone
    { speciesId: 143, level: 56 + CHAMPION_LEVEL_BUMP }, // Snorlax
    { speciesId: 727, level: 58 + CHAMPION_LEVEL_BUMP }, // Incineroar
  ],
  [STARTER_IDS[1]]: [
    // Player chose Litten -> Kukui's Primarina (Water, forte contra Fire)
    { speciesId: 745, level: 57 + CHAMPION_LEVEL_BUMP }, // Lycanroc
    { speciesId: 38, level: 56 + CHAMPION_LEVEL_BUMP }, // Ninetales Alolano
    { speciesId: 628, level: 56 + CHAMPION_LEVEL_BUMP }, // Braviary
    { speciesId: 462, level: 56 + CHAMPION_LEVEL_BUMP }, // Magnezone
    { speciesId: 143, level: 56 + CHAMPION_LEVEL_BUMP }, // Snorlax
    { speciesId: 730, level: 58 + CHAMPION_LEVEL_BUMP }, // Primarina
  ],
  [STARTER_IDS[2]]: [
    // Player chose Popplio -> Kukui's Decidueye (Grass, forte contra Water)
    { speciesId: 745, level: 57 + CHAMPION_LEVEL_BUMP }, // Lycanroc
    { speciesId: 38, level: 56 + CHAMPION_LEVEL_BUMP }, // Ninetales Alolano
    { speciesId: 628, level: 56 + CHAMPION_LEVEL_BUMP }, // Braviary
    { speciesId: 462, level: 56 + CHAMPION_LEVEL_BUMP }, // Magnezone
    { speciesId: 143, level: 56 + CHAMPION_LEVEL_BUMP }, // Snorlax
    { speciesId: 724, level: 58 + CHAMPION_LEVEL_BUMP }, // Decidueye
  ],
}

export const CHAMPION_DEFAULT_STARTER_ID = STARTER_IDS[0]
