import { KANTO_LOCATIONS } from '../../content/gen1/locations'
import type { Gen1Entry } from '../../content/gen1/types'
import type { SaveData, VictoryRoadEntry } from '../../engine/save'
import { startingCandiesBonus, startingLevelBonus } from './rebirthShop'

// Only Kanto exists so far (Gen 2 content is Sprint 24) — hardcoded until a
// second region needs this parameterized.
const REGION_ID = 'kanto'

// Provisional — Sprint 25 tunes these against real multi-rebirth play data,
// same treatment as every other economy number in the game. Rewards both
// axes the roadmap names: "Elite Four vencida" (flat base) + "marcos da
// run" (badges earned + how far the economy got before pressing rebirth).
const CHAMPION_BASE_INSIGNIAS = 10
const INSIGNIAS_PER_BADGE = 1
const LIFETIME_CANDIES_PER_INSIGNIA = 100_000

export function insigniasEarned(save: SaveData): number {
  return CHAMPION_BASE_INSIGNIAS + save.badges.length * INSIGNIAS_PER_BADGE + Math.floor(save.lifetimeCandies / LIFETIME_CANDIES_PER_INSIGNIA)
}

// Walks a species' own evolutionChain back to its 'initial' step, same
// lookup as systems/gyms/champion.ts's starterRootId but for any species,
// not just starters — every stage of a family carries the full chain, so
// this works no matter which stage `speciesId` currently is.
export function baseFormId(gen1: Gen1Entry[], speciesId: number): number {
  const entry = gen1.find((candidate) => candidate.id === speciesId)
  const root = entry?.evolutionChain.find((step) => step.trigger === 'initial')?.id
  return root ?? speciesId
}

// Snapshot of the active team at the moment the Champion falls (roadmap
// section 1: "espécies, formas e níveis no momento da vitória") — must be
// read from `save` before performRebirth resets anything.
export function victoryRoadSnapshot(save: SaveData): VictoryRoadEntry {
  return {
    region: REGION_ID,
    completedAt: Date.now(),
    team: save.activeTeamIds
      .map((speciesId) => {
        const member = save.roster.find((candidate) => candidate.speciesId === speciesId)
        return member ? { speciesId, level: member.level } : null
      })
      .filter((entry): entry is { speciesId: number; level: number } => entry !== null),
  }
}

// Resets everything the roadmap's rebirth table (section 1) says resets,
// keeps everything it says persists. `save.championBeaten` must already be
// true (set by the Elite Four win, which also appended the Victory Road
// entry) — this only performs the reset itself.
export function performRebirth(save: SaveData, gen1: Gen1Entry[]): SaveData {
  const startingLevel = 1 + startingLevelBonus(save)
  const resetRoster: SaveData['roster'] = []
  for (const member of save.roster) {
    const speciesId = baseFormId(gen1, member.speciesId)
    // A family can appear twice pre-rebirth (e.g. a wild-caught Caterpie
    // alongside an evolved Butterfree caught separately) — both collapse to
    // the same base-form id here, so dedupe instead of clobbering the
    // roster's one-entry-per-species invariant.
    if (!resetRoster.some((entry) => entry.speciesId === speciesId)) {
      resetRoster.push({ speciesId, level: startingLevel, xp: 0 })
    }
  }

  // Starting candies from the Rebirth Shop count as earned, same as any
  // other candy source (click/CPS/loot all bump both fields together) — so
  // they immediately count toward this run's first gym gate too.
  const startingCandies = startingCandiesBonus(save)

  return {
    ...save,
    candies: startingCandies,
    lifetimeCandies: startingCandies,
    upgrades: {},
    buffs: {},
    badges: [],
    currentLocationId: KANTO_LOCATIONS[0].id,
    roster: resetRoster,
    // "Time ativo: Reescolhido do zero" (roadmap section 1) — the player
    // picks the new active team from the Team screen instead of it carrying
    // over automatically.
    activeTeamIds: [],
    championBeaten: false,
    insignias: save.insignias + insigniasEarned(save),
  }
}
