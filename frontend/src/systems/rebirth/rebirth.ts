import type { SpeciesEntry } from '../../content/gen1/types'
import { REGION_ORDER, type RegionDefinition } from '../../content/regions'
import { currentRegion, withRegion, type RegionId, type RegionSave, type RosterMember, type SaveData, type VictoryRoadEntry } from '../../engine/save'
import { startingCandiesBonus, startingLevelBonus } from './rebirthShop'

// Provisional — Sprint 25 tunes these against real multi-rebirth play data,
// same treatment as every other economy number in the game. Rewards both
// axes the roadmap names: "Elite Four vencida" (flat base) + "marcos da
// run" (badges earned + how far the economy got before pressing rebirth).
const CHAMPION_BASE_INSIGNIAS = 10
const INSIGNIAS_PER_BADGE = 1
const LIFETIME_CANDIES_PER_INSIGNIA = 100_000

export function insigniasEarned(regionSave: RegionSave): number {
  return (
    CHAMPION_BASE_INSIGNIAS +
    regionSave.badges.length * INSIGNIAS_PER_BADGE +
    Math.floor(regionSave.lifetimeCandies / LIFETIME_CANDIES_PER_INSIGNIA)
  )
}

// Walks a species' own evolutionChain back to its 'initial' step, same
// lookup as systems/gyms/champion.ts's starterRootId but for any species,
// not just starters — every stage of a family carries the full chain, so
// this works no matter which stage `speciesId` currently is.
export function baseFormId(gen1: SpeciesEntry[], speciesId: number): number {
  const entry = gen1.find((candidate) => candidate.id === speciesId)
  const root = entry?.evolutionChain.find((step) => step.trigger === 'initial')?.id
  return root ?? speciesId
}

// Snapshot of the active team at the moment the Champion falls (roadmap
// section 1: "espécies, formas e níveis no momento da vitória") — must be
// read from the region's save before performRebirth resets anything.
export function victoryRoadSnapshot(regionSave: RegionSave): VictoryRoadEntry {
  return {
    region: regionSave.regionId,
    completedAt: Date.now(),
    team: regionSave.activeTeamIds
      .map((speciesId) => {
        const member = regionSave.roster.find((candidate) => candidate.speciesId === speciesId)
        return member ? { speciesId, level: member.level } : null
      })
      .filter((entry): entry is { speciesId: number; level: number } => entry !== null),
  }
}

// The region that unlocks the moment `regionId`'s Champion falls — called
// independently of rebirth (unlock and rebirth are separate player choices,
// see docs/decisoes/00NN-multi-regiao-e-login.md). No-op past the last
// defined region, or if it's already unlocked.
export function unlockNextRegion(save: SaveData, regionId: RegionId): SaveData {
  const index = REGION_ORDER.indexOf(regionId)
  const next = index === -1 ? undefined : REGION_ORDER[index + 1]
  if (!next || save.regionsUnlocked.includes(next)) return save
  return { ...save, regionsUnlocked: [...save.regionsUnlocked, next] }
}

// Resets everything the roadmap's rebirth table (section 1) says resets,
// keeps everything it says persists — scoped to a SINGLE region's save now
// (multi-região: rebirth is opt-in per region, not a forced move to the
// next one). `championBeaten` on that region must already be true (set by
// the Elite Four win, which also appended the Victory Road entry and
// unlocked the next region) — this only performs the reset itself.
export function performRebirth(region: RegionDefinition, save: SaveData, gen1: SpeciesEntry[]): SaveData {
  const before = currentRegion(save)
  const startingLevel = 1 + startingLevelBonus(save)
  const resetRoster: RosterMember[] = []
  for (const member of before.roster) {
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

  const resetRegion: RegionSave = {
    regionId: before.regionId,
    candies: startingCandies,
    lifetimeCandies: startingCandies,
    upgrades: {},
    buffs: {},
    badges: [],
    currentLocationId: region.locations[0].id,
    roster: resetRoster,
    // "Time ativo: Reescolhido do zero" (roadmap section 1) — the player
    // picks the new active team from the Team screen instead of it carrying
    // over automatically.
    activeTeamIds: [],
    championBeaten: false,
    upgradeEarnings: {},
    pokeballs: {},
  }

  return withRegion({ ...save, insignias: save.insignias + insigniasEarned(before), hasRebirthed: true }, resetRegion)
}
