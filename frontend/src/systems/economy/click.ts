import type { SaveData } from '../../engine/save'

export const CANDY_PER_CLICK = 1

export function applyClick(save: SaveData): SaveData {
  return { ...save, candies: save.candies + CANDY_PER_CLICK }
}
