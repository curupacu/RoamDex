import type { GymDefinition } from '../gen1/gyms'
import { STARTER_IDS } from './starters'

// Sources: docs/ROTAS-UNOVA.md (Bulbapedia, Pokémon Black) — já pesquisado,
// ver esse doc pra fonte por líder.
//
// Striaton City é diferente de todo outro ginásio já feito: tem 3 líderes
// (Cilan/Chili/Cress), e o jogo original NÃO deixa escolher — cada um só
// bate com quem tem o inicial que ele é forte contra (achado registrado em
// ROTAS-UNOVA.md). Modelado com teamByStarter/leaderNameByStarter
// (GymDefinition, content/gen1/gyms.ts) em vez de fixar um dos três — é
// literalmente o MESMO ginásio (id/local/insígnia), só o oponente muda,
// resolvido em systems/gyms/gymProgress.ts's resolveGym.
const [SNIVY_ID, TEPIG_ID, OSHAWOTT_ID] = STARTER_IDS

export const GYMS: GymDefinition[] = [
  {
    id: 'striaton',
    // Nome-padrão (usado só se teamByStarter falhar em resolver por algum
    // motivo — não deveria acontecer pós-new-game) — Cilan é o 1º da
    // Trindade Restaurante Striaton na Bulbapedia.
    leaderName: 'Cilan',
    badgeName: 'Insígnia Trio',
    locationId: 'striaton-city',
    team: [
      { speciesId: 506, level: 12 }, // Lillipup
      { speciesId: 511, level: 14 }, // Pansage
    ],
    leaderNameByStarter: {
      [SNIVY_ID]: 'Chili',
      [TEPIG_ID]: 'Cress',
      [OSHAWOTT_ID]: 'Cilan',
    },
    teamByStarter: {
      // Escolheu Snivy (Grama) → enfrenta Chili (Fogo)
      [SNIVY_ID]: [
        { speciesId: 506, level: 12 }, // Lillipup
        { speciesId: 513, level: 14 }, // Pansear
      ],
      // Escolheu Tepig (Fogo) → enfrenta Cress (Água)
      [TEPIG_ID]: [
        { speciesId: 506, level: 12 }, // Lillipup
        { speciesId: 515, level: 14 }, // Panpour
      ],
      // Escolheu Oshawott (Água) → enfrenta Cilan (Grama)
      [OSHAWOTT_ID]: [
        { speciesId: 506, level: 12 }, // Lillipup
        { speciesId: 511, level: 14 }, // Pansage
      ],
    },
  },
  {
    id: 'lenora',
    leaderName: 'Lenora',
    badgeName: 'Insígnia Básica',
    locationId: 'nacrene-city',
    team: [
      { speciesId: 507, level: 18 }, // Herdier
      { speciesId: 505, level: 20 }, // Watchog
    ],
  },
  {
    id: 'burgh',
    leaderName: 'Burgh',
    badgeName: 'Insígnia Inseto',
    locationId: 'castelia-city',
    team: [
      { speciesId: 544, level: 21 }, // Whirlipede
      { speciesId: 557, level: 21 }, // Dwebble
      { speciesId: 542, level: 23 }, // Leavanny
    ],
  },
  {
    id: 'elesa',
    leaderName: 'Elesa',
    badgeName: 'Insígnia Raio',
    locationId: 'nimbasa-city',
    team: [
      { speciesId: 587, level: 25 }, // Emolga
      { speciesId: 587, level: 25 }, // Emolga
      { speciesId: 523, level: 27 }, // Zebstrika
    ],
  },
  {
    id: 'clay',
    leaderName: 'Clay',
    badgeName: 'Insígnia Tremor',
    locationId: 'driftveil-city',
    team: [
      { speciesId: 552, level: 29 }, // Krokorok
      { speciesId: 536, level: 29 }, // Palpitoad
      { speciesId: 530, level: 31 }, // Excadrill
    ],
  },
  {
    id: 'skyla',
    leaderName: 'Skyla',
    badgeName: 'Insígnia Jato',
    locationId: 'mistralton-city',
    team: [
      { speciesId: 528, level: 33 }, // Swoobat
      { speciesId: 521, level: 33 }, // Unfezant
      { speciesId: 581, level: 35 }, // Swanna
    ],
  },
  {
    id: 'brycen',
    leaderName: 'Brycen',
    badgeName: 'Insígnia Gelo',
    locationId: 'icirrus-city',
    team: [
      { speciesId: 583, level: 37 }, // Vanillish
      { speciesId: 615, level: 37 }, // Cryogonal
      { speciesId: 614, level: 39 }, // Beartic
    ],
  },
  {
    id: 'drayden',
    leaderName: 'Drayden',
    badgeName: 'Insígnia Lenda',
    locationId: 'opelucid-city',
    team: [
      { speciesId: 611, level: 41 }, // Fraxure
      { speciesId: 621, level: 41 }, // Druddigon
      { speciesId: 612, level: 43 }, // Haxorus
    ],
  },
]
