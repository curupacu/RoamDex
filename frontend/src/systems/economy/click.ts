import type { SaveData } from '../../engine/save'
import { totalClickBonus } from './upgrades'

export const CANDY_PER_CLICK = 1

// multiplier comes from type bonuses (Sprint 9) — this module stays
// unaware of "types", it just applies whatever factor it's given.
export function clickValue(save: SaveData, multiplier = 1): number {
  return (CANDY_PER_CLICK + totalClickBonus(save)) * multiplier
}

export function applyClick(save: SaveData, multiplier = 1): SaveData {
  const gain = clickValue(save, multiplier)
  return { ...save, candies: save.candies + gain, lifetimeCandies: save.lifetimeCandies + gain }
}
