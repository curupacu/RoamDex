import type { RegionSave } from '../../engine/save'
import type { RegionDefinition } from '../../content/regions'
import { totalClickBonus } from './upgrades'

export const CANDY_PER_CLICK = 1

// multiplier comes from type bonuses (Sprint 9) — this module stays
// unaware of "types", it just applies whatever factor it's given.
export function clickValue(region: RegionDefinition, save: RegionSave, multiplier = 1): number {
  return (CANDY_PER_CLICK + totalClickBonus(region, save)) * multiplier
}

export function applyClick(region: RegionDefinition, save: RegionSave, multiplier = 1): RegionSave {
  const gain = clickValue(region, save, multiplier)
  return { ...save, candies: save.candies + gain, lifetimeCandies: save.lifetimeCandies + gain }
}
