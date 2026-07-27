import type { GymTeamMember } from '../gen1/gyms'
import type { EliteFourMember } from '../gen1/eliteFour'
import { STARTER_IDS } from './starters'

// Sprint 25 ("Balanceamento"): simulação de batalha (tests/simulations/
// battle.sim.test.ts, e4debug.sim.test.ts) achou que o Elite Four de Johto
// precisava de +20 níveis de folga acima do próprio nível médio do time
// (time dos 3 iniciais evoluídos) pra vencer — contra só +8 do Kanto já
// calibrado por playtest real (docs/decisoes/0019-*.md, LEVEL_BUMP=12).
// Baixar o bump sozinho não resolveu essa folga RELATIVA (testado: 25→15
// ainda pedia +20) — o motivo provável é a composição do time em si
// (Crobat/Steelix/Forretress são evoluções exclusivas da Gen II, com
// stats base mais altos que qualquer equivalente de Gen I na mesma
// "posição"), não só o nível. Baixado mesmo assim pra reduzir o piso
// absoluto (ajuda um pouco, e não atrapalha) — mas isso continua
// precisando de uma rodada de balanceamento dedicada, Pokémon por
// Pokémon, igual as duas rodadas reais que o Kanto já teve
// (docs/BACKLOG.md). Registrado em docs/decisoes/0033-*.md.
const LEVEL_BUMP = 18

// Sources: docs/ROTAS-JOHTO.md lines 834-898 (Bulbapedia, Pokémon Gold) —
// levels below are the original Bulbapedia numbers + LEVEL_BUMP, not
// invented from scratch.
export const ELITE_FOUR: EliteFourMember[] = [
  {
    id: 'will',
    name: 'Will',
    team: [
      { speciesId: 178, level: 40 + LEVEL_BUMP }, // Xatu
      { speciesId: 103, level: 41 + LEVEL_BUMP }, // Exeggutor
      { speciesId: 80, level: 41 + LEVEL_BUMP }, // Slowbro
      { speciesId: 124, level: 41 + LEVEL_BUMP }, // Jynx
      { speciesId: 178, level: 42 + LEVEL_BUMP }, // Xatu
    ],
  },
  {
    id: 'koga',
    name: 'Koga',
    team: [
      { speciesId: 168, level: 40 + LEVEL_BUMP }, // Ariados
      { speciesId: 49, level: 41 + LEVEL_BUMP }, // Venomoth
      { speciesId: 205, level: 43 + LEVEL_BUMP }, // Forretress
      { speciesId: 89, level: 42 + LEVEL_BUMP }, // Muk
      { speciesId: 169, level: 44 + LEVEL_BUMP }, // Crobat
    ],
  },
  {
    id: 'bruno',
    name: 'Bruno',
    team: [
      { speciesId: 237, level: 42 + LEVEL_BUMP }, // Hitmontop
      { speciesId: 106, level: 42 + LEVEL_BUMP }, // Hitmonlee
      { speciesId: 107, level: 42 + LEVEL_BUMP }, // Hitmonchan
      { speciesId: 95, level: 43 + LEVEL_BUMP }, // Onix
      { speciesId: 68, level: 46 + LEVEL_BUMP }, // Machamp
    ],
  },
  {
    id: 'karen',
    name: 'Karen',
    team: [
      { speciesId: 197, level: 42 + LEVEL_BUMP }, // Umbreon
      { speciesId: 45, level: 42 + LEVEL_BUMP }, // Vileplume
      { speciesId: 94, level: 45 + LEVEL_BUMP }, // Gengar
      { speciesId: 198, level: 44 + LEVEL_BUMP }, // Murkrow
      { speciesId: 229, level: 47 + LEVEL_BUMP }, // Houndoom
    ],
  },
]

// Campeão — Lance. Unlike Kanto's rival-style champion, Lance's team does
// NOT vary by starter in Gen II (confirmed against the source, see
// docs/ROTAS-JOHTO.md lines 900-908) — the same fixed team is used
// regardless of which starter the player picked, so every STARTER_IDS key
// below points at the same array. systems/gyms/champion.ts resolves this
// generically either way.
const LANCE_TEAM: GymTeamMember[] = [
  { speciesId: 130, level: 44 + LEVEL_BUMP }, // Gyarados
  { speciesId: 149, level: 47 + LEVEL_BUMP }, // Dragonite
  { speciesId: 6, level: 46 + LEVEL_BUMP }, // Charizard
  { speciesId: 142, level: 46 + LEVEL_BUMP }, // Aerodactyl
  { speciesId: 149, level: 47 + LEVEL_BUMP }, // Dragonite
  { speciesId: 149, level: 50 + LEVEL_BUMP }, // Dragonite
]

export const CHAMPION_TEAM_BY_STARTER: Record<number, GymTeamMember[]> = {
  [STARTER_IDS[0]]: LANCE_TEAM, // Chikorita
  [STARTER_IDS[1]]: LANCE_TEAM, // Cyndaquil
  [STARTER_IDS[2]]: LANCE_TEAM, // Totodile
}

export const CHAMPION_DEFAULT_STARTER_ID = STARTER_IDS[0]
