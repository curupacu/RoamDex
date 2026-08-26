import type { GymTeamMember } from '../gen1/gyms'
import type { EliteFourMember } from '../gen1/eliteFour'
import { STARTER_IDS } from './starters'

// Provisional — mesmo ponto de partida de Kanto/Hoenn/Sinnoh/Kalos (Sprint
// 25 style, ainda não simulado nesta implementação inicial).
const LEVEL_BUMP = 12
const CHAMPION_LEVEL_BUMP = 8

// Sources: docs/ROTAS-UNOVA.md (Bulbapedia, Pokémon Black) — levels abaixo
// são os originais da Bulbapedia + LEVEL_BUMP, não inventados do zero.
export const ELITE_FOUR: EliteFourMember[] = [
  {
    id: 'shauntal',
    name: 'Shauntal',
    team: [
      { speciesId: 563, level: 48 + LEVEL_BUMP }, // Cofagrigus
      { speciesId: 593, level: 48 + LEVEL_BUMP }, // Jellicent
      { speciesId: 623, level: 48 + LEVEL_BUMP }, // Golurk
      { speciesId: 609, level: 50 + LEVEL_BUMP }, // Chandelure
    ],
  },
  {
    id: 'marshal',
    name: 'Marshal',
    team: [
      { speciesId: 538, level: 48 + LEVEL_BUMP }, // Throh
      { speciesId: 539, level: 48 + LEVEL_BUMP }, // Sawk
      { speciesId: 534, level: 48 + LEVEL_BUMP }, // Conkeldurr
      { speciesId: 620, level: 50 + LEVEL_BUMP }, // Mienshao
    ],
  },
  {
    id: 'grimsley',
    name: 'Grimsley',
    team: [
      { speciesId: 560, level: 48 + LEVEL_BUMP }, // Scrafty
      { speciesId: 553, level: 48 + LEVEL_BUMP }, // Krookodile
      { speciesId: 510, level: 48 + LEVEL_BUMP }, // Liepard
      { speciesId: 625, level: 50 + LEVEL_BUMP }, // Bisharp
    ],
  },
  {
    id: 'caitlin',
    name: 'Caitlin',
    team: [
      { speciesId: 579, level: 48 + LEVEL_BUMP }, // Reuniclus
      { speciesId: 518, level: 48 + LEVEL_BUMP }, // Musharna
      { speciesId: 561, level: 48 + LEVEL_BUMP }, // Sigilyph
      { speciesId: 576, level: 50 + LEVEL_BUMP }, // Gothitelle
    ],
  },
]

// Campeão — Alder. Diferente de todas as regiões anteriores: o time dele é
// FIXO no jogo original (docs/ROTAS-UNOVA.md), não varia por inicial — os
// 3 iniciais só apontam pro mesmo time, sem precisar de um "time por
// inicial" de verdade.
const ALDER_TEAM: GymTeamMember[] = [
  { speciesId: 617, level: 75 + CHAMPION_LEVEL_BUMP }, // Accelgor
  { speciesId: 626, level: 75 + CHAMPION_LEVEL_BUMP }, // Bouffalant
  { speciesId: 621, level: 75 + CHAMPION_LEVEL_BUMP }, // Druddigon
  { speciesId: 584, level: 75 + CHAMPION_LEVEL_BUMP }, // Vanilluxe
  { speciesId: 589, level: 75 + CHAMPION_LEVEL_BUMP }, // Escavalier
  { speciesId: 637, level: 77 + CHAMPION_LEVEL_BUMP }, // Volcarona
]

export const CHAMPION_TEAM_BY_STARTER: Record<number, GymTeamMember[]> = {
  [STARTER_IDS[0]]: ALDER_TEAM, // Snivy
  [STARTER_IDS[1]]: ALDER_TEAM, // Tepig
  [STARTER_IDS[2]]: ALDER_TEAM, // Oshawott
}

export const CHAMPION_DEFAULT_STARTER_ID = STARTER_IDS[0]
