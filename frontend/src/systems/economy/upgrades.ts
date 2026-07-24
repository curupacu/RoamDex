import type { SaveData } from '../../engine/save'
import { UPGRADES, type UpgradeDefinition } from '../../content/gen1/upgrades'

export function ownedCount(save: SaveData, id: string): number {
  return save.upgrades[id] ?? 0
}

export function isUnlocked(def: UpgradeDefinition, save: SaveData): boolean {
  return save.lifetimeCandies >= def.unlockAt
}

// costMultiplier comes from type bonuses (Sprint 9, e.g. Ice's discount).
export function upgradeCost(def: UpgradeDefinition, owned: number, costMultiplier = 1): number {
  return Math.ceil(def.baseCost * 1.15 ** owned * costMultiplier)
}

export function buyUpgrade(save: SaveData, id: string, costMultiplier = 1): SaveData {
  const def = UPGRADES.find((upgrade) => upgrade.id === id)
  if (!def) return save

  const owned = ownedCount(save, id)
  const cost = upgradeCost(def, owned, costMultiplier)
  if (save.candies < cost) return save

  return {
    ...save,
    candies: save.candies - cost,
    upgrades: { ...save.upgrades, [id]: owned + 1 },
  }
}

function sumEffect(save: SaveData, kind: UpgradeDefinition['kind']): number {
  return UPGRADES.filter((def) => def.kind === kind).reduce(
    (total, def) => total + def.effect * ownedCount(save, def.id),
    0,
  )
}

export function totalClickBonus(save: SaveData): number {
  return sumEffect(save, 'click')
}

// multiplier comes from type bonuses (Sprint 9) — this module stays
// unaware of "types", it just applies whatever factor it's given.
export function totalCps(save: SaveData, multiplier = 1): number {
  return sumEffect(save, 'cps') * multiplier
}
