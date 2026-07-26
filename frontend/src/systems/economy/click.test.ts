import { describe, expect, it } from 'vitest'
import { makeRegionSave } from '../../engine/save.testUtils'
import { UPGRADES } from '../../content/gen1/upgrades'
import { REGIONS } from '../../content/regions'
import { applyClick, CANDY_PER_CLICK, clickValue } from './click'

const kanto = REGIONS.kanto

describe('applyClick', () => {
  it('adds exactly CANDY_PER_CLICK candies with no upgrades owned', () => {
    const result = applyClick(kanto, makeRegionSave({ candies: 10 }))
    expect(result.candies).toBe(10 + CANDY_PER_CLICK)
    expect(result.lifetimeCandies).toBe(CANDY_PER_CLICK)
  })

  it('does not mutate the input save', () => {
    const save = makeRegionSave({ candies: 5 })
    applyClick(kanto, save)
    expect(save.candies).toBe(5)
  })

  it('adds the click-upgrade bonus on top of the base value', () => {
    const clickDef = UPGRADES.find((u) => u.kind === 'click')!
    const save = makeRegionSave({ upgrades: { [clickDef.id]: 2 } })

    expect(clickValue(kanto, save)).toBe(CANDY_PER_CLICK + clickDef.effect * 2)
    expect(applyClick(kanto, save).candies).toBe(clickValue(kanto, save))
  })
})
