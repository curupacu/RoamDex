import type { RegionSave } from '../../engine/save'

export function upgradeEarned(region: RegionSave, id: string): number {
  return region.upgradeEarnings[id] ?? 0
}

export function recordUpgradeEarnings(region: RegionSave, id: string, amount: number): RegionSave {
  if (amount <= 0) return region
  return { ...region, upgradeEarnings: { ...region.upgradeEarnings, [id]: upgradeEarned(region, id) + amount } }
}

// Folds a whole tick/click's worth of per-upgrade contributions (from
// systems/economy/upgrades.ts's contributionsByKind) into the region at
// once, so callers don't need one setSave per upgrade.
export function recordManyUpgradeEarnings(region: RegionSave, contributions: { id: string; amount: number }[]): RegionSave {
  return contributions.reduce((current, { id, amount }) => recordUpgradeEarnings(current, id, amount), region)
}
