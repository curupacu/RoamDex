import type { GymTeamMember } from '../gen1/gyms'
import type { EliteFourMember } from '../gen1/eliteFour'
import { STARTER_IDS } from './starters'

// Sprint 25 ("Balanceamento"): simulação de batalha (tests/simulations/
// battle.sim.test.ts) achou que o Elite Four de Johto precisava de +20
// níveis de folga acima do próprio nível médio do time (3 iniciais
// evoluídos) pra vencer — contra só +8 do Kanto já calibrado por playtest
// real (docs/decisoes/0019-*.md, LEVEL_BUMP=12). Baixar o bump sozinho não
// resolvia essa folga RELATIVA (testado: 25→15 ainda pedia +20).
//
// Decisão 0038 (rodada dedicada, Pokémon por Pokémon): a causa raiz não é
// os 4 membros do Elite Four (Will/Koga/Bruno/Karen) — uma simulação
// passo a passo (deletada depois de incorporada aqui) mostrou o time do
// jogador com 70-100% de HP durante os 4, mesmo SEM folga nenhuma. O
// colapso é 100% dentro do time do CAMPEÃO (Lance): Gyarados + 3x
// Dragonite cheio + Charizard + Aerodactyl, os 6 na MESMA sequência sem
// cura nenhuma entre si (só há cura de 50% uma vez, ao CRUZAR de Karen
// pro Campeão) — e Dragão leva só 0.5x de QUALQUER um dos 3 tipos
// iniciais (grama/fogo/água todos resistidos, `content/typeEffectiveness.
// ts`). O Kanto não sofre disso porque os 3 dragões dele (2 Dragonair +
// 1 Dragonite, mais fracos que 3 Dragonite cheios) ficam no PRÓPRIO
// Elite Four "Lance" e são "descartados" pela cura de 50% ANTES de entrar
// no campeão (que, pro starter Bulbasaur, não tem dragão nenhum).
const LEVEL_BUMP = 18

// Bump menor SÓ pro time do Campeão — testado isoladamente: com o bump
// cheio (18) e o jogador com +8 de folga (o número calibrado do Kanto), o
// time do Campeão sozinho é o que perde a luta (0% HP, nem chega no
// último Dragonite). Com esse bump menor, +8 de folga vence com ~3% de HP
// restante — mesma margem apertada do Kanto no mesmo cushion, sem mudar o
// roster (continua fiel à fonte, só o nível difere).
const CHAMPION_LEVEL_BUMP = 8

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
  { speciesId: 130, level: 44 + CHAMPION_LEVEL_BUMP }, // Gyarados
  { speciesId: 149, level: 47 + CHAMPION_LEVEL_BUMP }, // Dragonite
  { speciesId: 6, level: 46 + CHAMPION_LEVEL_BUMP }, // Charizard
  { speciesId: 142, level: 46 + CHAMPION_LEVEL_BUMP }, // Aerodactyl
  { speciesId: 149, level: 47 + CHAMPION_LEVEL_BUMP }, // Dragonite
  { speciesId: 149, level: 50 + CHAMPION_LEVEL_BUMP }, // Dragonite
]

export const CHAMPION_TEAM_BY_STARTER: Record<number, GymTeamMember[]> = {
  [STARTER_IDS[0]]: LANCE_TEAM, // Chikorita
  [STARTER_IDS[1]]: LANCE_TEAM, // Cyndaquil
  [STARTER_IDS[2]]: LANCE_TEAM, // Totodile
}

export const CHAMPION_DEFAULT_STARTER_ID = STARTER_IDS[0]
