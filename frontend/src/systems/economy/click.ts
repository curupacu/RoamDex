import type { SaveData } from '../../engine/save'
import { totalClickBonus } from './upgrades'

export const CANDY_PER_CLICK = 1

export function clickValue(save: SaveData): number {
  return CANDY_PER_CLICK + totalClickBonus(save)
}

export function applyClick(save: SaveData): SaveData {
  const gain = clickValue(save)
  return { ...save, candies: save.candies + gain, lifetimeCandies: save.lifetimeCandies + gain }
}
