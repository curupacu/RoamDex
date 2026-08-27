import type { GymTeamMember } from '../gen1/gyms'
import type { EliteFourMember } from '../gen1/eliteFour'
import { STARTER_IDS } from './starters'

// LEVEL_BUMP/CHAMPION_LEVEL_BUMP no mesmo padrão default de Kanto (0018).
// Achado calibrando com a simulação de batalha real: ajustar só o bump
// não mudava nada (subir/descer o nível de todo mundo junto não muda a
// DIFERENÇA relativa entre jogador e inimigo, que é o que decide a
// batalha) — o problema de verdade era o TAMANHO da maratona: os times
// originais de Bulbapedia (5 Pokémon por membro + 6 da Campeã, 26 no
// total) formam uma sequência mais longa/statisticamente mais robusta
// que o Elite Four clássico de Kanto na mesma contagem de Pokémon,
// provavelmente pelo BST mais alto do elenco moderno de Paldea. Times
// abaixo já saem com 1 Pokémon a menos por membro (o de nível mais
// baixo de cada um) — ver docs/decisoes/0052-sprint-paldea-gen9.md.
const LEVEL_BUMP = 12
const CHAMPION_LEVEL_BUMP = 8

// Larry é a MESMA pessoa do ginásio (Normal, gyms.ts) — dobra como
// especialista Flying na Elite Four "a pedido da Geeta" (fato do jogo
// real, docs/ROTAS-PALDEA.md), com um time totalmente diferente.
// Modelado como um 2º EliteFourMember com o mesmo nome, não um mecanismo
// novo — é só um personagem que aparece 2x com times distintos, mesmo
// espírito de Hala/Olivia/Acerola em Alola (gen7/eliteFour.ts).
export const ELITE_FOUR: EliteFourMember[] = [
  {
    id: 'rika',
    name: 'Rika',
    team: [
      { speciesId: 323, level: 57 + LEVEL_BUMP }, // Camerupt
      { speciesId: 232, level: 57 + LEVEL_BUMP }, // Donphan
      { speciesId: 51, level: 57 + LEVEL_BUMP }, // Dugtrio
      { speciesId: 980, level: 58 + LEVEL_BUMP }, // Clodsire
    ],
  },
  {
    id: 'poppy',
    name: 'Poppy',
    team: [
      { speciesId: 462, level: 58 + LEVEL_BUMP }, // Magnezone
      { speciesId: 437, level: 58 + LEVEL_BUMP }, // Bronzong
      { speciesId: 823, level: 58 + LEVEL_BUMP }, // Corviknight
      { speciesId: 959, level: 59 + LEVEL_BUMP }, // Tinkaton
    ],
  },
  {
    id: 'larry-elite-four',
    name: 'Larry',
    team: [
      { speciesId: 741, level: 59 + LEVEL_BUMP }, // Oricorio (Pom-Pom)
      { speciesId: 334, level: 59 + LEVEL_BUMP }, // Altaria
      { speciesId: 398, level: 59 + LEVEL_BUMP }, // Staraptor
      { speciesId: 973, level: 60 + LEVEL_BUMP }, // Flamigo
    ],
  },
  {
    id: 'hassel',
    name: 'Hassel',
    team: [
      { speciesId: 612, level: 60 + LEVEL_BUMP }, // Haxorus
      { speciesId: 691, level: 60 + LEVEL_BUMP }, // Dragalge
      { speciesId: 841, level: 60 + LEVEL_BUMP }, // Flapple
      { speciesId: 998, level: 61 + LEVEL_BUMP }, // Baxcalibur
    ],
  },
]

// Campeã (Geeta) — time fixo, sem variação por inicial documentada na
// pesquisa (diferente de toda região anterior) — mesmo tratamento já
// dado ao Alder de Unova (gen5/eliteFour.ts): time igual pros 3
// iniciais, só pra bater com o formato `championTeamByStarter` que o
// resto do projeto espera.
const GEETA_TEAM: GymTeamMember[] = [
  { speciesId: 673, level: 61 + CHAMPION_LEVEL_BUMP }, // Gogoat
  { speciesId: 976, level: 61 + CHAMPION_LEVEL_BUMP }, // Veluza
  { speciesId: 713, level: 61 + CHAMPION_LEVEL_BUMP }, // Avalugg
  { speciesId: 983, level: 61 + CHAMPION_LEVEL_BUMP }, // Kingambit
  { speciesId: 970, level: 62 + CHAMPION_LEVEL_BUMP }, // Glimmora
]

export const CHAMPION_TEAM_BY_STARTER: Record<number, GymTeamMember[]> = {
  [STARTER_IDS[0]]: GEETA_TEAM,
  [STARTER_IDS[1]]: GEETA_TEAM,
  [STARTER_IDS[2]]: GEETA_TEAM,
}

export const CHAMPION_DEFAULT_STARTER_ID = STARTER_IDS[0]
