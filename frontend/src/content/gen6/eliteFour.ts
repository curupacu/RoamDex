import type { GymTeamMember } from '../gen1/gyms'
import type { EliteFourMember } from '../gen1/eliteFour'
import { STARTER_IDS } from './starters'

// Provisional — same starting point Hoenn/Sinnoh used (docs/decisoes/
// 0043-*.md, 0045-*.md): Kanto's original LEVEL_BUMP=12 / CHAMPION_LEVEL_
// BUMP=8, not calibrated against tests/simulations/ yet for Kalos
// specifically.
const LEVEL_BUMP = 12
const CHAMPION_LEVEL_BUMP = 8

// Sources: docs/ROTAS-KALOS.md (Bulbapedia, Pokémon X) — levels below are
// the original Bulbapedia numbers + LEVEL_BUMP, not invented from scratch.
export const ELITE_FOUR: EliteFourMember[] = [
  {
    id: 'malva',
    name: 'Malva',
    team: [
      { speciesId: 668, level: 63 + LEVEL_BUMP }, // Pyroar
      { speciesId: 324, level: 63 + LEVEL_BUMP }, // Torkoal
      { speciesId: 609, level: 63 + LEVEL_BUMP }, // Chandelure
      { speciesId: 663, level: 65 + LEVEL_BUMP }, // Talonflame
    ],
  },
  {
    id: 'siebold',
    name: 'Siebold',
    team: [
      { speciesId: 693, level: 63 + LEVEL_BUMP }, // Clawitzer
      { speciesId: 130, level: 63 + LEVEL_BUMP }, // Gyarados
      { speciesId: 121, level: 63 + LEVEL_BUMP }, // Starmie
      { speciesId: 689, level: 65 + LEVEL_BUMP }, // Barbaracle
    ],
  },
  {
    id: 'wikstrom',
    name: 'Wikstrom',
    team: [
      { speciesId: 707, level: 63 + LEVEL_BUMP }, // Klefki
      { speciesId: 476, level: 63 + LEVEL_BUMP }, // Probopass
      { speciesId: 212, level: 63 + LEVEL_BUMP }, // Scizor
      { speciesId: 681, level: 65 + LEVEL_BUMP }, // Aegislash
    ],
  },
  {
    id: 'drasna',
    name: 'Drasna',
    team: [
      { speciesId: 691, level: 63 + LEVEL_BUMP }, // Dragalge
      { speciesId: 621, level: 63 + LEVEL_BUMP }, // Druddigon
      { speciesId: 334, level: 63 + LEVEL_BUMP }, // Altaria
      { speciesId: 715, level: 65 + LEVEL_BUMP }, // Noivern
    ],
  },
]

// Campeã — Diantha. Mesmo padrão de Lance/Wallace/Cynthia: time fixo,
// independente do starter escolhido. No jogo original Diantha Mega Evolui
// a Gardevoir — Mega Evolução não existe neste projeto (fora do roadmap),
// mantida como Gardevoir comum.
const DIANTHA_TEAM: GymTeamMember[] = [
  { speciesId: 701, level: 64 + CHAMPION_LEVEL_BUMP }, // Hawlucha
  { speciesId: 696, level: 65 + CHAMPION_LEVEL_BUMP }, // Tyrantrum
  { speciesId: 699, level: 65 + CHAMPION_LEVEL_BUMP }, // Aurorus
  { speciesId: 711, level: 65 + CHAMPION_LEVEL_BUMP }, // Gourgeist
  { speciesId: 706, level: 66 + CHAMPION_LEVEL_BUMP }, // Goodra
  { speciesId: 282, level: 68 + CHAMPION_LEVEL_BUMP }, // Gardevoir
]

export const CHAMPION_TEAM_BY_STARTER: Record<number, GymTeamMember[]> = {
  [STARTER_IDS[0]]: DIANTHA_TEAM, // Chespin
  [STARTER_IDS[1]]: DIANTHA_TEAM, // Fennekin
  [STARTER_IDS[2]]: DIANTHA_TEAM, // Froakie
}

export const CHAMPION_DEFAULT_STARTER_ID = STARTER_IDS[0]
