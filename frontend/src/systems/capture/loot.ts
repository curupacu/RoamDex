import type { RegionSave } from '../../engine/save'
import type { RegionDefinition } from '../../content/regions'
import { addBalls, rollLootBall } from './pokeballs'

// Provisional — Sprint 25 ("Balanceamento") tunes these.
const BASE_LOOT_CANDIES = 20
const LOOT_CANDIES_PER_LEVEL = 5
const UPGRADE_LOOT_CHANCE = 0.25
const POKEBALL_LOOT_CHANCE = 0.2
const POKEBALL_LOOT_AMOUNT = 1

export type LootResult =
  | { kind: 'candies'; amount: number }
  | { kind: 'upgrade'; upgradeId: string; upgradeName: string }
  | { kind: 'pokeball'; ballId: string; ballName: string; amount: number }

// "Doces (comum, escala com o nível do inimigo), upgrade grátis (raro)" —
// roadmap section 6, mais Great/Ultra Ball (sistema de Pokébolas) na mesma
// mesa. Checado nessa ordem (upgrade > bola > doces) porque cada `if` já
// consome uma tentativa própria — mesmo tratamento provisório dos outros
// números daqui, sem simulação real por trás ainda. The "item (futuro)"
// slot is deliberately not rolled: there's no item system yet (reserved for
// its own future sprint per roadmap section 13), and a loot outcome that
// does nothing would just read as a bug. See docs/decisoes/0013-*.md.
export function rollLoot(region: RegionDefinition, save: RegionSave, enemyLevel: number): LootResult {
  const unlockedUpgrades = region.upgrades.filter((def) => save.lifetimeCandies >= def.unlockAt)

  if (unlockedUpgrades.length > 0 && Math.random() < UPGRADE_LOOT_CHANCE) {
    const def = unlockedUpgrades[Math.floor(Math.random() * unlockedUpgrades.length)]
    return { kind: 'upgrade', upgradeId: def.id, upgradeName: def.name }
  }

  if (Math.random() < POKEBALL_LOOT_CHANCE) {
    const ball = rollLootBall()
    return { kind: 'pokeball', ballId: ball.id, ballName: ball.name, amount: POKEBALL_LOOT_AMOUNT }
  }

  return { kind: 'candies', amount: BASE_LOOT_CANDIES + enemyLevel * LOOT_CANDIES_PER_LEVEL }
}

export function applyLoot(save: RegionSave, result: LootResult): RegionSave {
  if (result.kind === 'candies') {
    return {
      ...save,
      candies: save.candies + result.amount,
      lifetimeCandies: save.lifetimeCandies + result.amount,
    }
  }

  if (result.kind === 'pokeball') {
    return addBalls(save, result.ballId, result.amount)
  }

  const owned = save.upgrades[result.upgradeId] ?? 0
  return { ...save, upgrades: { ...save.upgrades, [result.upgradeId]: owned + 1 } }
}
