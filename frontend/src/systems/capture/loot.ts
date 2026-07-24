import { UPGRADES } from '../../content/gen1/upgrades'
import type { SaveData } from '../../engine/save'

// Provisional — Sprint 25 ("Balanceamento") tunes these.
const BASE_LOOT_CANDIES = 20
const LOOT_CANDIES_PER_LEVEL = 5
const UPGRADE_LOOT_CHANCE = 0.25

export type LootResult =
  | { kind: 'candies'; amount: number }
  | { kind: 'upgrade'; upgradeId: string; upgradeName: string }

// "Doces (comum, escala com o nível do inimigo), upgrade grátis (raro)" —
// roadmap section 6. The "item (futuro)" slot is deliberately not rolled:
// there's no item system yet (reserved for its own future sprint per
// roadmap section 13), and a loot outcome that does nothing would just
// read as a bug. See docs/decisoes/0013-*.md.
export function rollLoot(save: SaveData, enemyLevel: number): LootResult {
  const unlockedUpgrades = UPGRADES.filter((def) => save.lifetimeCandies >= def.unlockAt)

  if (unlockedUpgrades.length > 0 && Math.random() < UPGRADE_LOOT_CHANCE) {
    const def = unlockedUpgrades[Math.floor(Math.random() * unlockedUpgrades.length)]
    return { kind: 'upgrade', upgradeId: def.id, upgradeName: def.name }
  }

  return { kind: 'candies', amount: BASE_LOOT_CANDIES + enemyLevel * LOOT_CANDIES_PER_LEVEL }
}

export function applyLoot(save: SaveData, result: LootResult): SaveData {
  if (result.kind === 'candies') {
    return {
      ...save,
      candies: save.candies + result.amount,
      lifetimeCandies: save.lifetimeCandies + result.amount,
    }
  }

  const owned = save.upgrades[result.upgradeId] ?? 0
  return { ...save, upgrades: { ...save.upgrades, [result.upgradeId]: owned + 1 } }
}
