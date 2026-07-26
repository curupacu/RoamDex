import { REBIRTH_UPGRADES, type RebirthUpgradeDefinition, type RebirthUpgradeKind } from '../../content/rebirthShop'
import type { SaveData } from '../../engine/save'

// Steeper than the run upgrades' 1.15 (systems/economy/upgrades.ts) —
// Insígnias are earned once per rebirth, not by the second like candies, so
// the curve needs to bite sooner. Provisional, see content/rebirthShop.ts.
const REBIRTH_COST_GROWTH = 1.6

export function ownedRebirthLevel(save: SaveData, id: string): number {
  return save.rebirthUpgrades[id] ?? 0
}

export function rebirthUpgradeCost(def: RebirthUpgradeDefinition, owned: number): number {
  return Math.ceil(def.baseCost * REBIRTH_COST_GROWTH ** owned)
}

export function isRebirthUpgradeMaxed(def: RebirthUpgradeDefinition, save: SaveData): boolean {
  return def.maxLevel !== undefined && ownedRebirthLevel(save, def.id) >= def.maxLevel
}

export function buyRebirthUpgrade(save: SaveData, id: string): SaveData {
  const def = REBIRTH_UPGRADES.find((upgrade) => upgrade.id === id)
  if (!def) return save

  const owned = ownedRebirthLevel(save, id)
  if (isRebirthUpgradeMaxed(def, save)) return save

  const cost = rebirthUpgradeCost(def, owned)
  if (save.insignias < cost) return save

  return {
    ...save,
    insignias: save.insignias - cost,
    rebirthUpgrades: { ...save.rebirthUpgrades, [id]: owned + 1 },
  }
}

// Sums levels across every definition of a kind (mirrors economy/upgrades.ts'
// sumEffect) — lets a kind have more than one purchasable definition later
// without any of the getters below needing to change.
function levelOf(save: SaveData, kind: RebirthUpgradeKind): number {
  return REBIRTH_UPGRADES.filter((def) => def.kind === kind).reduce(
    (total, def) => total + def.effect * ownedRebirthLevel(save, def.id),
    0,
  )
}

// Flat candies granted the moment a rebirth completes.
export function startingCandiesBonus(save: SaveData): number {
  return levelOf(save, 'startingCandies')
}

// Levels above 1 the roster starts at post-rebirth.
export function startingLevelBonus(save: SaveData): number {
  return levelOf(save, 'startingLevel')
}

// Multiplicative factors (>= 1), same convention as
// systems/economy/typeBonuses.ts's economyMultiplier — callers just
// multiply this into whatever other multiplier they already have.
export function cpsMultiplierBonus(save: SaveData): number {
  return 1 + levelOf(save, 'cpsPercent')
}

export function xpGainMultiplierBonus(save: SaveData): number {
  return 1 + levelOf(save, 'xpGainPercent')
}

export function wildSpawnRateMultiplierBonus(save: SaveData): number {
  return 1 + levelOf(save, 'wildSpawnRate')
}

export function rareWildChanceMultiplierBonus(save: SaveData): number {
  return 1 + levelOf(save, 'rareWildChance')
}

export function hasCaptureRetry(save: SaveData): boolean {
  return levelOf(save, 'captureRetry') > 0
}
