import { describe, expect, it } from 'vitest'
import { REBIRTH_UPGRADES } from '../../content/rebirthShop'
import { makeSave } from '../../engine/save.testUtils'
import {
  buyRebirthUpgrade,
  cpsMultiplierBonus,
  hasCaptureRetry,
  isRebirthUpgradeMaxed,
  ownedRebirthLevel,
  rareWildChanceMultiplierBonus,
  rebirthUpgradeCost,
  startingCandiesBonus,
  startingLevelBonus,
  wildSpawnRateMultiplierBonus,
  xpGainMultiplierBonus,
} from './rebirthShop'

const infiniteDef = REBIRTH_UPGRADES.find((def) => def.maxLevel === undefined)!
const cappedDef = REBIRTH_UPGRADES.find((def) => def.maxLevel !== undefined)!

describe('rebirthUpgradeCost', () => {
  it('scales the base cost by 1.6^owned, rounded up', () => {
    expect(rebirthUpgradeCost(infiniteDef, 0)).toBe(infiniteDef.baseCost)
    expect(rebirthUpgradeCost(infiniteDef, 1)).toBe(Math.ceil(infiniteDef.baseCost * 1.6))
    expect(rebirthUpgradeCost(infiniteDef, 2)).toBe(Math.ceil(infiniteDef.baseCost * 1.6 ** 2))
  })
})

describe('buyRebirthUpgrade', () => {
  it('deducts Insígnias and increments the owned level when affordable', () => {
    const save = makeSave({ insignias: infiniteDef.baseCost })

    const result = buyRebirthUpgrade(save, infiniteDef.id)

    expect(result.insignias).toBe(0)
    expect(ownedRebirthLevel(result, infiniteDef.id)).toBe(1)
  })

  it('is a no-op when the player cannot afford it', () => {
    const save = makeSave({ insignias: infiniteDef.baseCost - 1 })

    expect(buyRebirthUpgrade(save, infiniteDef.id)).toEqual(save)
  })

  it('is a no-op for an unknown upgrade id', () => {
    const save = makeSave({ insignias: 1_000_000 })
    expect(buyRebirthUpgrade(save, 'does-not-exist')).toEqual(save)
  })

  it('refuses to buy past maxLevel even with enough Insígnias', () => {
    const save = makeSave({ insignias: 1_000_000, rebirthUpgrades: { [cappedDef.id]: cappedDef.maxLevel! } })

    expect(isRebirthUpgradeMaxed(cappedDef, save)).toBe(true)
    expect(buyRebirthUpgrade(save, cappedDef.id)).toEqual(save)
  })
})

describe('bonus getters', () => {
  it('return 0/1× (no-op) when nothing is owned', () => {
    const save = makeSave()

    expect(startingCandiesBonus(save)).toBe(0)
    expect(startingLevelBonus(save)).toBe(0)
    expect(cpsMultiplierBonus(save)).toBe(1)
    expect(xpGainMultiplierBonus(save)).toBe(1)
    expect(wildSpawnRateMultiplierBonus(save)).toBe(1)
    expect(rareWildChanceMultiplierBonus(save)).toBe(1)
    expect(hasCaptureRetry(save)).toBe(false)
  })

  it('scale with owned levels of the matching kind', () => {
    const startingCandiesDef = REBIRTH_UPGRADES.find((def) => def.kind === 'startingCandies')!
    const cpsDef = REBIRTH_UPGRADES.find((def) => def.kind === 'cpsPercent')!
    const save = makeSave({ rebirthUpgrades: { [startingCandiesDef.id]: 2, [cpsDef.id]: 3 } })

    expect(startingCandiesBonus(save)).toBe(startingCandiesDef.effect * 2)
    expect(cpsMultiplierBonus(save)).toBeCloseTo(1 + cpsDef.effect * 3)
  })

  it('hasCaptureRetry is true once the capture-retry upgrade is owned', () => {
    const retryDef = REBIRTH_UPGRADES.find((def) => def.kind === 'captureRetry')!
    expect(hasCaptureRetry(makeSave({ rebirthUpgrades: { [retryDef.id]: 1 } }))).toBe(true)
  })
})
