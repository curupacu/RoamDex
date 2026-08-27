import type { GymTeamMember } from '../gen1/gyms'
import type { EliteFourMember } from '../gen1/eliteFour'
import { STARTER_IDS } from './starters'

// Galar não tem Elite Four de verdade — o pós-jogo é o torneio Champion Cup
// (Wyndon Stadium). Modelado como 4 "membros" + Campeão, mesmo formato de
// toda outra região; ordenados por nível crescente (o bracket real do jogo
// não é sequencial, ver docs/ROTAS-GALAR.md). LEVEL_BUMP/CHAMPION_LEVEL_BUMP
// no mesmo padrão default de Kanto (0018) — ainda não recalibrado por
// simulação de batalha real (ver docs/decisoes/00NN-sprint-galar-gen8.md).
const LEVEL_BUMP = 12
const CHAMPION_LEVEL_BUMP = 8

// Sources: docs/ROTAS-GALAR.md (Bulbapedia). Hop's Champion Cup team tinha
// um 5º Pokémon (o inicial dele, sempre o "vencedor" contra o do jogador) —
// omitido aqui: nosso EliteFourMember não tem um mecanismo pra variar por
// inicial fora do Campeão (só championTeamByStarter faz isso), e inventar
// uma escolha fixa seria pior que só encurtar o time em 1 Pokémon.
export const ELITE_FOUR: EliteFourMember[] = [
  {
    id: 'marnie',
    name: 'Marnie',
    team: [
      { speciesId: 510, level: 47 + LEVEL_BUMP }, // Liepard
      { speciesId: 454, level: 47 + LEVEL_BUMP }, // Toxicroak
      { speciesId: 560, level: 47 + LEVEL_BUMP }, // Scrafty
      { speciesId: 877, level: 48 + LEVEL_BUMP }, // Morpeko
      { speciesId: 861, level: 49 + LEVEL_BUMP }, // Grimmsnarl
    ],
  },
  {
    id: 'hop',
    name: 'Hop',
    team: [
      { speciesId: 832, level: 49 + LEVEL_BUMP }, // Dubwool
      { speciesId: 143, level: 49 + LEVEL_BUMP }, // Snorlax
      { speciesId: 823, level: 50 + LEVEL_BUMP }, // Corviknight
      { speciesId: 889, level: 50 + LEVEL_BUMP }, // Zamazenta
    ],
  },
  {
    id: 'raihan-cup',
    name: 'Raihan',
    team: [
      { speciesId: 324, level: 53 + LEVEL_BUMP }, // Torkoal
      { speciesId: 706, level: 54 + LEVEL_BUMP }, // Goodra
      { speciesId: 776, level: 54 + LEVEL_BUMP }, // Turtonator
      { speciesId: 330, level: 54 + LEVEL_BUMP }, // Flygon
      { speciesId: 884, level: 55 + LEVEL_BUMP }, // Duraludon
    ],
  },
  {
    id: 'bede',
    name: 'Bede',
    team: [
      { speciesId: 303, level: 61 + LEVEL_BUMP }, // Mawile
      { speciesId: 282, level: 61 + LEVEL_BUMP }, // Gardevoir
      { speciesId: 78, level: 62 + LEVEL_BUMP }, // Rapidash Galariana
      { speciesId: 700, level: 62 + LEVEL_BUMP }, // Sylveon
      { speciesId: 858, level: 63 + LEVEL_BUMP }, // Hatterene
    ],
  },
]

// Campeão (Leon) — 4 membros fixos + 2 que variam pelo inicial escolhido
// (docs/ROTAS-GALAR.md). Chaveado pelo id do starter (810 Grookey, 813
// Scorbunny, 816 Sobble) — ver systems/gyms/champion.ts.
export const CHAMPION_TEAM_BY_STARTER: Record<number, GymTeamMember[]> = {
  [STARTER_IDS[0]]: [
    // Player chose Grookey
    { speciesId: 681, level: 62 + CHAMPION_LEVEL_BUMP }, // Aegislash
    { speciesId: 887, level: 62 + CHAMPION_LEVEL_BUMP }, // Dragapult
    { speciesId: 612, level: 63 + CHAMPION_LEVEL_BUMP }, // Haxorus
    { speciesId: 537, level: 64 + CHAMPION_LEVEL_BUMP }, // Seismitoad
    { speciesId: 815, level: 64 + CHAMPION_LEVEL_BUMP }, // Cinderace
    { speciesId: 6, level: 65 + CHAMPION_LEVEL_BUMP }, // Charizard
  ],
  [STARTER_IDS[1]]: [
    // Player chose Scorbunny
    { speciesId: 681, level: 62 + CHAMPION_LEVEL_BUMP }, // Aegislash
    { speciesId: 887, level: 62 + CHAMPION_LEVEL_BUMP }, // Dragapult
    { speciesId: 612, level: 63 + CHAMPION_LEVEL_BUMP }, // Haxorus
    { speciesId: 866, level: 64 + CHAMPION_LEVEL_BUMP }, // Mr. Rime
    { speciesId: 818, level: 64 + CHAMPION_LEVEL_BUMP }, // Inteleon
    { speciesId: 6, level: 65 + CHAMPION_LEVEL_BUMP }, // Charizard
  ],
  [STARTER_IDS[2]]: [
    // Player chose Sobble
    { speciesId: 681, level: 62 + CHAMPION_LEVEL_BUMP }, // Aegislash
    { speciesId: 887, level: 62 + CHAMPION_LEVEL_BUMP }, // Dragapult
    { speciesId: 612, level: 63 + CHAMPION_LEVEL_BUMP }, // Haxorus
    { speciesId: 464, level: 64 + CHAMPION_LEVEL_BUMP }, // Rhyperior
    { speciesId: 812, level: 64 + CHAMPION_LEVEL_BUMP }, // Rillaboom
    { speciesId: 6, level: 65 + CHAMPION_LEVEL_BUMP }, // Charizard
  ],
}

export const CHAMPION_DEFAULT_STARTER_ID = STARTER_IDS[0]
