import type { RegionSave } from '../../engine/save'
import type { UpgradeDefinition } from '../../content/gen1/upgrades'
import type { RegionDefinition } from '../../content/regions'

export function ownedCount(save: RegionSave, id: string): number {
  return save.upgrades[id] ?? 0
}

export function isUnlocked(def: UpgradeDefinition, save: RegionSave): boolean {
  return save.lifetimeCandies >= def.unlockAt
}

// costMultiplier comes from type bonuses (Sprint 9, e.g. Ice's discount).
export function upgradeCost(def: UpgradeDefinition, owned: number, costMultiplier = 1): number {
  return Math.ceil(def.baseCost * 1.15 ** owned * costMultiplier)
}

export function buyUpgrade(region: RegionDefinition, save: RegionSave, id: string, costMultiplier = 1): RegionSave {
  const def = region.upgrades.find((upgrade) => upgrade.id === id)
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

function sumEffect(region: RegionDefinition, save: RegionSave, kind: UpgradeDefinition['kind']): number {
  return region.upgrades
    .filter((def) => def.kind === kind)
    .reduce((total, def) => total + def.effect * ownedCount(save, def.id), 0)
}

export function totalClickBonus(region: RegionDefinition, save: RegionSave): number {
  return sumEffect(region, save, 'click')
}

// multiplier comes from type bonuses (Sprint 9) — this module stays
// unaware of "types", it just applies whatever factor it's given.
export function totalCps(region: RegionDefinition, save: RegionSave, multiplier = 1): number {
  return sumEffect(region, save, 'cps') * multiplier
}

export function totalXpPerSecond(region: RegionDefinition, save: RegionSave): number {
  return sumEffect(region, save, 'xp')
}
