import type { SaveData } from '../../engine/save'
import { UPGRADES, type UpgradeDefinition } from '../../content/gen1/upgrades'

export function ownedCount(save: SaveData, id: string): number {
  return save.upgrades[id] ?? 0
}

export function isUnlocked(def: UpgradeDefinition, save: SaveData): boolean {
  return save.lifetimeCandies >= def.unlockAt
}

export function upgradeCost(def: UpgradeDefinition, owned: number): number {
  return Math.ceil(def.baseCost * 1.15 ** owned)
}

export function buyUpgrade(save: SaveData, id: string): SaveData {
  const def = UPGRADES.find((upgrade) => upgrade.id === id)
  if (!def) return save

  const owned = ownedCount(save, id)
  const cost = upgradeCost(def, owned)
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

export function totalCps(save: SaveData): number {
  return sumEffect(save, 'cps')
}
