import type { GymTeamMember } from '../gen1/gyms'
import type { EliteFourMember } from '../gen1/eliteFour'
import { STARTER_IDS } from './starters'

// Provisional, same spirit as content/gen1/eliteFour.ts's own LEVEL_BUMP
// (docs/decisoes/0019-*.md) — no Johto playtest data exists yet to tune
// this against. Johto's own Bulbapedia reference levels (Will 40-42 up to
// Lance 44-50, docs/ROTAS-JOHTO.md) are noticeably lower than Kanto's
// pre-bump Elite Four (Lorelei 53-56 up to Lance 56-62) even though this
// region is meant to be just as full a standalone run — the gap tracks
// Gen II's own in-game pacing (Johto's story caps out lower than Kanto's
// post-game). Bump picked to land Johto's final range (~65-78) a bit above
// Kanto's tuned range (~65-77), matching a second region played on top of
// Rebirth Shop bonuses from a first Kanto clear. Needs a real playtest pass
// to confirm, same as Kanto's own two rounds of adjustment
// (docs/BACKLOG.md).
const LEVEL_BUMP = 25

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
