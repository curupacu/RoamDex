import type { RegionSave } from '../../engine/save'
import type { UpgradeDefinition } from '../../content/gen1/upgrades'
import type { RegionDefinition } from '../../content/regions'

export function ownedCount(save: RegionSave, id: string): number {
  return save.upgrades[id] ?? 0
}

export function isUnlocked(def: UpgradeDefinition, save: RegionSave): boolean {
  return save.lifetimeCandies >= def.unlockAt
}

// Próximo upgrade ainda bloqueado, o mais barato de destravar (decisão
// 0030) — usado pra mostrar um "???" na loja/grid em vez de simplesmente
// sumir da lista, criando expectativa (mesma ideia dos prédios com "???"
// no Cookie Clicker antes de você ter dinheiro suficiente).
export function nextLocked(defs: UpgradeDefinition[], save: RegionSave): UpgradeDefinition | undefined {
  return defs
    .filter((def) => !isUnlocked(def, save))
    .sort((a, b) => a.unlockAt - b.unlockAt)[0]
}

// costMultiplier comes from type bonuses (Sprint 9, e.g. Ice's discount).
export function upgradeCost(def: UpgradeDefinition, owned: number, costMultiplier = 1): number {
  return Math.ceil(def.baseCost * 1.15 ** owned * costMultiplier)
}

export function buyUpgrade(region: RegionDefinition, save: RegionSave, id: string, costMultiplier = 1): RegionSave {
  const def = region.upgrades.find((upgrade) => upgrade.id === id)
  if (!def) return save

  const owned = ownedCount(save, id)
  if (def.maxPurchases !== undefined && owned >= def.maxPurchases) return save

  const cost = upgradeCost(def, owned, costMultiplier)
  if (save.candies < cost) return save

  return {
    ...save,
    candies: save.candies - cost,
    upgrades: { ...save.upgrades, [id]: owned + 1 },
  }
}

// The "cadeia de tier" nature-change (decisão 0026): once a scalesWith
// upgrade is owned, its effect is per-unit of this instead of per-copy —
// there's only ever 0 or 1 copies owned (maxPurchases: 1), so this is what
// actually grows the bonus over time as the run progresses.
function scaleValue(save: RegionSave, scalesWith: UpgradeDefinition['scalesWith']): number {
  switch (scalesWith) {
    case 'rosterSize':
      return save.roster.length
    default:
      return 1
  }
}

// One definition's own share of its kind's total, before the caller's
// economy multiplier — same math sumEffect sums across a whole region, kept
// separate so callers can attribute output to a specific upgrade instead of
// just the region total (the "já rendeu X" line on the upgrade hover card,
// ui/components/UpgradeCard.tsx, and the tick handlers in App.tsx that feed
// systems/economy/upgradeEarnings.ts).
export function upgradeContribution(save: RegionSave, def: UpgradeDefinition): number {
  const owned = ownedCount(save, def.id)
  if (owned === 0) return 0
  const multiplier = def.scalesWith ? scaleValue(save, def.scalesWith) : owned
  return def.effect * multiplier
}

function sumEffect(region: RegionDefinition, save: RegionSave, kind: UpgradeDefinition['kind']): number {
  return region.upgrades
    .filter((def) => def.kind === kind)
    .reduce((total, def) => total + upgradeContribution(save, def), 0)
}

// Per-definition breakdown for one kind, owned-only — id/amount pairs ready
// to multiply by whatever global multiplier the caller is already applying
// and fold into RegionSave.upgradeEarnings.
export function contributionsByKind(
  region: RegionDefinition,
  save: RegionSave,
  kind: UpgradeDefinition['kind'],
): { id: string; amount: number }[] {
  return region.upgrades
    .filter((def) => def.kind === kind)
    .map((def) => ({ id: def.id, amount: upgradeContribution(save, def) }))
    .filter((entry) => entry.amount > 0)
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
