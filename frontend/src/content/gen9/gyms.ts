import type { GymDefinition } from '../gen1/gyms'

// Sources: docs/ROTAS-PALDEA.md (Bulbapedia, Pokémon Scarlet). Paldea é
// mundo aberto de verdade — os 8 ginásios não têm ordem obrigatória no
// jogo real. Decisão de projeto: ordem fixa por nível recomendado
// crescente (Katy 14 → Brassius 16 → Iono 23 → Kofu 29 → Larry 35 →
// Ryme 41 → Tulip 44 → Grusha 47), não a ordem alfabética de insígnia.
export const GYMS: GymDefinition[] = [
  {
    id: 'katy',
    leaderName: 'Katy',
    badgeName: 'Insígnia Inseto',
    locationId: 'cortondo',
    team: [
      { speciesId: 919, level: 14 }, // Nymble
      { speciesId: 917, level: 14 }, // Tarountula
      { speciesId: 216, level: 15 }, // Teddiursa
    ],
  },
  {
    id: 'brassius',
    leaderName: 'Brassius',
    badgeName: 'Insígnia Grama',
    locationId: 'artazon',
    team: [
      { speciesId: 548, level: 16 }, // Petilil
      { speciesId: 928, level: 16 }, // Smoliv
      { speciesId: 185, level: 17 }, // Sudowoodo
    ],
  },
  {
    id: 'iono',
    leaderName: 'Iono',
    badgeName: 'Insígnia Elétrica',
    locationId: 'levincia',
    team: [
      { speciesId: 940, level: 23 }, // Wattrel
      { speciesId: 939, level: 23 }, // Bellibolt
      { speciesId: 404, level: 23 }, // Luxio
      { speciesId: 429, level: 24 }, // Mismagius
    ],
  },
  {
    id: 'kofu',
    leaderName: 'Kofu',
    badgeName: 'Insígnia Água',
    locationId: 'cascarrafa',
    team: [
      { speciesId: 976, level: 29 }, // Veluza
      { speciesId: 961, level: 29 }, // Wugtrio
      { speciesId: 740, level: 30 }, // Crabominable
    ],
  },
  {
    id: 'larry',
    leaderName: 'Larry',
    badgeName: 'Insígnia Normal',
    locationId: 'medali',
    team: [
      { speciesId: 775, level: 35 }, // Komala
      { speciesId: 982, level: 35 }, // Dudunsparce
      { speciesId: 398, level: 36 }, // Staraptor
    ],
  },
  {
    // Único ginásio 2v2 (dobra) do jogo real — jogado aqui como sequência
    // 1v1 normal, mesmo tratamento de "mecânica nova fora de escopo" já
    // dado a Dynamax/Terastalização (não inventamos batalha dupla nova
    // pro sistema de combate, ver docs/decisoes/00NN-sprint-paldea-gen9.md).
    id: 'ryme',
    leaderName: 'Ryme',
    badgeName: 'Insígnia Fantasma',
    locationId: 'montenevera',
    team: [
      { speciesId: 354, level: 41 }, // Banette
      { speciesId: 778, level: 41 }, // Mimikyu
      { speciesId: 972, level: 41 }, // Houndstone
      { speciesId: 849, level: 42 }, // Toxtricity
    ],
  },
  {
    id: 'tulip',
    leaderName: 'Tulip',
    badgeName: 'Insígnia Psíquica',
    locationId: 'alfornada',
    team: [
      { speciesId: 981, level: 44 }, // Farigiraf
      { speciesId: 282, level: 44 }, // Gardevoir
      { speciesId: 956, level: 44 }, // Espathra
      { speciesId: 671, level: 45 }, // Florges
    ],
  },
  {
    id: 'grusha',
    leaderName: 'Grusha',
    badgeName: 'Insígnia Gelo',
    // Não a 1ª passagem por Glaseado Mountain — ver
    // 'glaseado-mountain-gym' em content/gen9/locations.ts (mesmo padrão
    // de motostoke-gym/hammerlocke-gym em Galar).
    locationId: 'glaseado-mountain-gym',
    team: [
      { speciesId: 873, level: 47 }, // Frosmoth
      { speciesId: 614, level: 47 }, // Beartic
      { speciesId: 975, level: 47 }, // Cetitan
      { speciesId: 334, level: 48 }, // Altaria
    ],
  },
]
