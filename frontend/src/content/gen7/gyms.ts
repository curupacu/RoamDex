import type { GymDefinition } from '../gen1/gyms'

// Sources: docs/ROTAS-ALOLA.md (Bulbapedia, Pokémon Sun). Alola não tem
// ginásio de verdade — tem Provações (Totem + aliado(s), quem realmente
// bate é o Totem, não o Capitão) e Grandes Provações (Kahuna bate
// direto). Decisão de projeto: ambas viram GymDefinition, time = Totem+
// aliados nas Provações comuns / Kahuna nas Grandes Provações; o Capitão
// (quando tem time documentado) só vira comentário de flavor, não entra
// no `team` — é o Totem quem realmente luta.
export const GYMS: GymDefinition[] = [
  {
    // Capitão Ilima (flavor): Yungoos 9, Smeargle 10 — Normal.
    id: 'ilima',
    leaderName: 'Totem Gumshoos',
    badgeName: 'Certificado de Ilima',
    locationId: 'verdant-cavern',
    team: [
      { speciesId: 734, level: 10 }, // Yungoos (aliado)
      { speciesId: 735, level: 12 }, // Gumshoos (Totem)
    ],
  },
  {
    id: 'hala',
    leaderName: 'Hala',
    badgeName: 'Certificado de Hala',
    locationId: 'iki-town',
    team: [
      { speciesId: 56, level: 14 }, // Mankey
      { speciesId: 296, level: 14 }, // Makuhita
      { speciesId: 739, level: 15 }, // Crabrawler
    ],
  },
  {
    // Capitã Lana (flavor, provável time de rebatalha): Chinchou 26,
    // Shellder 26, Araquanid 27 — Water.
    id: 'lana',
    leaderName: 'Totem Wishiwashi',
    badgeName: 'Certificado de Lana',
    locationId: 'brooklet-hill',
    team: [
      { speciesId: 746, level: 18 }, // Wishiwashi (aliado)
      { speciesId: 594, level: 18 }, // Alomomola (aliado)
      { speciesId: 746, level: 20 }, // Wishiwashi Forma Cardume (Totem)
    ],
  },
  {
    // Capitão Kiawe (flavor, provável time de rebatalha): Growlithe 26,
    // Fletchinder 26, Marowak 27 — Fire.
    id: 'kiawe',
    leaderName: 'Totem Salazzle',
    badgeName: 'Certificado de Kiawe',
    locationId: 'wela-volcano-park',
    team: [
      { speciesId: 757, level: 20 }, // Salandit (aliado)
      { speciesId: 758, level: 22 }, // Salazzle (Totem)
    ],
  },
  {
    // Capitã Mallow (flavor, baixa confiança — só documentado pra Moon):
    // Phantump 26, Shiinotic 26, Steenee 27 — Grass.
    id: 'mallow',
    leaderName: 'Totem Lurantis',
    badgeName: 'Certificado de Mallow',
    locationId: 'lush-jungle',
    team: [
      { speciesId: 732, level: 22 }, // Trumbeak (aliado)
      { speciesId: 351, level: 22 }, // Castform (aliado)
      { speciesId: 754, level: 24 }, // Lurantis (Totem)
    ],
  },
  {
    id: 'olivia',
    leaderName: 'Olivia',
    badgeName: 'Certificado de Olivia',
    locationId: 'akala-outskirts',
    team: [
      { speciesId: 299, level: 26 }, // Nosepass
      { speciesId: 525, level: 26 }, // Boldore
      { speciesId: 745, level: 27 }, // Lycanroc
    ],
  },
  {
    // Capitão Sophocles: sem time pessoal documentado pra Sun — só o
    // Totem bate.
    id: 'sophocles',
    leaderName: 'Totem Vikavolt',
    badgeName: 'Certificado de Sophocles',
    locationId: 'mount-hokulani',
    team: [
      { speciesId: 737, level: 28 }, // Charjabug (aliado)
      { speciesId: 737, level: 28 }, // Charjabug (aliado)
      { speciesId: 738, level: 29 }, // Vikavolt (Totem)
    ],
  },
  {
    // Capitã Acerola: sem time pessoal documentado pra Sun — só o Totem
    // bate (ela reaparece na Elite Four com time próprio, ver eliteFour.ts).
    id: 'acerola',
    leaderName: 'Totem Mimikyu',
    badgeName: 'Certificado de Acerola',
    locationId: 'thrifty-megamart',
    team: [
      { speciesId: 93, level: 27 }, // Haunter (aliado)
      { speciesId: 94, level: 27 }, // Gengar (aliado)
      { speciesId: 778, level: 33 }, // Mimikyu (Totem)
    ],
  },
  {
    // Nanu recusou a vaga na Elite Four (Acerola assume no lugar dele) —
    // sem 2ª aparição, só esse time de Grande Provação.
    id: 'nanu',
    leaderName: 'Nanu',
    badgeName: 'Certificado de Nanu',
    locationId: 'haina-desert',
    team: [
      { speciesId: 302, level: 38 }, // Sableye
      { speciesId: 552, level: 38 }, // Krokorok
      { speciesId: 53, level: 39 }, // Persian Alolana
    ],
  },
  {
    // Única provação sem Capitão — o jogador enfrenta o Totem direto.
    id: 'totem-kommo-o',
    leaderName: 'Totem Kommo-o',
    badgeName: 'Certificado de Vast Poni Canyon',
    locationId: 'vast-poni-canyon',
    team: [
      { speciesId: 783, level: 32 }, // Hakamo-o (aliado)
      { speciesId: 212, level: 32 }, // Scizor (aliado)
      { speciesId: 784, level: 45 }, // Kommo-o (Totem)
    ],
  },
  {
    id: 'hapu',
    leaderName: 'Hapu',
    badgeName: 'Certificado de Hapu',
    locationId: 'poni-gauntlet',
    team: [
      { speciesId: 51, level: 47 }, // Dugtrio Alolano
      { speciesId: 423, level: 47 }, // Gastrodon (Mar do Leste)
      { speciesId: 330, level: 47 }, // Flygon
      { speciesId: 750, level: 48 }, // Mudsdale
    ],
  },
]
