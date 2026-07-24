import type { Gen1Entry } from '../../content/gen1/types'
import {
  RARE_CANDY_BASE_COST,
  RARE_CANDY_COST_PER_LEVEL,
  XP_BOOST_COST,
  XP_BOOST_DURATION_MS,
  XP_BOOST_ID,
  XP_BOOST_MULTIPLIER,
} from '../../content/shop'
import type { SaveData } from '../../engine/save'
import { resolveEvolutionSafely } from '../team/leveling'
import { rosterMember } from '../team/roster'

export function rareCandyCost(level: number): number {
  return RARE_CANDY_BASE_COST + RARE_CANDY_COST_PER_LEVEL * level
}

// "Sobe 1 nível instantâneo" (roadmap section 7) — an instant level-up can
// cross an evolution threshold same as normal XP gain does.
export function buyRareCandy(save: SaveData, gen1: Gen1Entry[], speciesId: number): SaveData {
  const member = rosterMember(save, speciesId)
  if (!member) return save

  const cost = rareCandyCost(member.level)
  if (save.candies < cost) return save

  const newLevel = member.level + 1
  const newSpeciesId = resolveEvolutionSafely(save, gen1, speciesId, newLevel)

  const roster = save.roster.map((candidate) =>
    candidate.speciesId === speciesId ? { ...candidate, level: newLevel, speciesId: newSpeciesId } : candidate,
  )
  const activeTeamIds = save.activeTeamIds.map((id) => (id === speciesId ? newSpeciesId : id))

  return { ...save, candies: save.candies - cost, roster, activeTeamIds }
}

export function isBuffActive(save: SaveData, buffId: string, now: number): boolean {
  return (save.buffs[buffId] ?? 0) > now
}

// >1 while the XP boost buff is active, otherwise 1 — this module stays
// unaware of "types" or upgrades, callers combine it with those separately.
export function xpMultiplierFromBuffs(save: SaveData, now: number): number {
  return isBuffActive(save, XP_BOOST_ID, now) ? XP_BOOST_MULTIPLIER : 1
}

// Buying again while still active extends from the current expiry instead
// of resetting the timer, so stacking purchases is never a bad move.
export function buyXpBoost(save: SaveData, now: number): SaveData {
  if (save.candies < XP_BOOST_COST) return save

  const currentExpiry = Math.max(save.buffs[XP_BOOST_ID] ?? 0, now)
  return {
    ...save,
    candies: save.candies - XP_BOOST_COST,
    buffs: { ...save.buffs, [XP_BOOST_ID]: currentExpiry + XP_BOOST_DURATION_MS },
  }
}
