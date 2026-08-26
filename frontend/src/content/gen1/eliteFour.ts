import type { GymTeamMember } from './gyms'
import { STARTER_IDS } from './starters'

export interface EliteFourMember {
  id: string
  name: string
  team: GymTeamMember[]
  // Ver nota em content/gen1/gyms.ts's GymDefinition.trainerSprite.
  trainerSprite?: string
}

// Provisional — Sprint 25 tunes this for real. Bumped after playtest: the
// original games' reference levels (below, unchanged) are calibrated for a
// turn-based RPG with a single save file, not this idle game's pacing —
// docs/ROTAS-KANTO.md's own "Pontos em aberto" section already flags them as
// "referência de proporção, não número absoluto." A level 67 Dragonite
// (well within reach by the time someone's at Victory Road) never dropped
// below half HP through the whole 26-mon sequence at the original levels.
const LEVEL_BUMP = 12

// Champion (Blue)-only bump, LOWER than the other 4 members' LEVEL_BUMP —
// same pattern (and, coincidentally, same value) as Johto's
// CHAMPION_LEVEL_BUMP (content/gen2/eliteFour.ts, decision 0038). Raising
// DAMAGE_SCALE for the 2026-07-28 difficulty pass (systems/battle/engine.ts)
// tipped Blue's 6-mon team (already the longest, most level-varied roster in
// the sequence, right after 4 trainers with only a single 50% heal to show
// for it) past the "wins with the standard +8 level cushion" bar the battle
// simulation checks, while the other 4 Elite Four members stayed fine
// untouched. Calibrated the same way as 0038 (temp script, deleted after):
// swept the bump down from LEVEL_BUMP and re-ran the sim at each value —
// 8 is the highest value that still lets the +8-cushion fight land a
// victory (4% HP left, same "barely won" margin 0038 found for Johto).
const CHAMPION_LEVEL_BUMP = 8

// Sources: docs/ROTAS-KANTO.md lines 686-728 (Bulbapedia, Pokémon Red) —
// already researched, see decision 0018. Levels below are the original
// Bulbapedia numbers + LEVEL_BUMP, not invented from scratch.
export const ELITE_FOUR: EliteFourMember[] = [
  {
    id: 'lorelei',
    name: 'Lorelei',
    team: [
      { speciesId: 87, level: 54 + LEVEL_BUMP }, // Dewgong
      { speciesId: 91, level: 53 + LEVEL_BUMP }, // Cloyster
      { speciesId: 80, level: 54 + LEVEL_BUMP }, // Slowbro
      { speciesId: 124, level: 56 + LEVEL_BUMP }, // Jynx
      { speciesId: 131, level: 56 + LEVEL_BUMP }, // Lapras
    ],
    trainerSprite: '/trainers/kanto/lorelei.png',
  },
  {
    id: 'bruno',
    name: 'Bruno',
    team: [
      { speciesId: 95, level: 53 + LEVEL_BUMP }, // Onix
      { speciesId: 107, level: 55 + LEVEL_BUMP }, // Hitmonchan
      { speciesId: 106, level: 55 + LEVEL_BUMP }, // Hitmonlee
      { speciesId: 95, level: 56 + LEVEL_BUMP }, // Onix
      { speciesId: 68, level: 58 + LEVEL_BUMP }, // Machamp
    ],
    trainerSprite: '/trainers/kanto/bruno.png',
  },
  {
    id: 'agatha',
    name: 'Agatha',
    team: [
      { speciesId: 94, level: 56 + LEVEL_BUMP }, // Gengar
      { speciesId: 42, level: 56 + LEVEL_BUMP }, // Golbat
      { speciesId: 93, level: 55 + LEVEL_BUMP }, // Haunter
      { speciesId: 24, level: 58 + LEVEL_BUMP }, // Arbok
      { speciesId: 94, level: 60 + LEVEL_BUMP }, // Gengar
    ],
    trainerSprite: '/trainers/kanto/agatha.png',
  },
  {
    id: 'lance',
    name: 'Lance',
    team: [
      { speciesId: 130, level: 58 + LEVEL_BUMP }, // Gyarados
      { speciesId: 148, level: 56 + LEVEL_BUMP }, // Dragonair
      { speciesId: 148, level: 56 + LEVEL_BUMP }, // Dragonair
      { speciesId: 142, level: 60 + LEVEL_BUMP }, // Aerodactyl
      { speciesId: 149, level: 62 + LEVEL_BUMP }, // Dragonite
    ],
    trainerSprite: '/trainers/kanto/lance.png',
  },
]

// Campeão (rival) — 4 membros fixos + 2 que variam pelo starter escolhido
// (docs/ROTAS-KANTO.md linhas 730-764). Chaveado pelo id-raiz do starter
// (STARTER_IDS: 1 Bulbasaur, 4 Charmander, 7 Squirtle) — ver
// systems/gyms/champion.ts pra como isso é resolvido a partir do save.
export const CHAMPION_TEAM_BY_STARTER: Record<number, GymTeamMember[]> = {
  1: [
    // Player chose Bulbasaur
    { speciesId: 18, level: 61 + CHAMPION_LEVEL_BUMP }, // Pidgeot
    { speciesId: 65, level: 59 + CHAMPION_LEVEL_BUMP }, // Alakazam
    { speciesId: 112, level: 61 + CHAMPION_LEVEL_BUMP }, // Rhydon
    { speciesId: 103, level: 61 + CHAMPION_LEVEL_BUMP }, // Exeggutor
    { speciesId: 130, level: 63 + CHAMPION_LEVEL_BUMP }, // Gyarados
    { speciesId: 6, level: 65 + CHAMPION_LEVEL_BUMP }, // Charizard
  ],
  4: [
    // Player chose Charmander
    { speciesId: 18, level: 61 + CHAMPION_LEVEL_BUMP }, // Pidgeot
    { speciesId: 65, level: 59 + CHAMPION_LEVEL_BUMP }, // Alakazam
    { speciesId: 112, level: 61 + CHAMPION_LEVEL_BUMP }, // Rhydon
    { speciesId: 59, level: 61 + CHAMPION_LEVEL_BUMP }, // Arcanine
    { speciesId: 103, level: 63 + CHAMPION_LEVEL_BUMP }, // Exeggutor
    { speciesId: 9, level: 65 + CHAMPION_LEVEL_BUMP }, // Blastoise
  ],
  7: [
    // Player chose Squirtle
    { speciesId: 18, level: 61 + CHAMPION_LEVEL_BUMP }, // Pidgeot
    { speciesId: 65, level: 59 + CHAMPION_LEVEL_BUMP }, // Alakazam
    { speciesId: 112, level: 61 + CHAMPION_LEVEL_BUMP }, // Rhydon
    { speciesId: 130, level: 61 + CHAMPION_LEVEL_BUMP }, // Gyarados
    { speciesId: 59, level: 63 + CHAMPION_LEVEL_BUMP }, // Arcanine
    { speciesId: 3, level: 65 + CHAMPION_LEVEL_BUMP }, // Venusaur
  ],
}

export const CHAMPION_DEFAULT_STARTER_ID = STARTER_IDS[0]
