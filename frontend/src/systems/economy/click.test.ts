import { describe, expect, it } from 'vitest'
import { makeSave } from '../../engine/save.testUtils'
import { UPGRADES } from '../../content/gen1/upgrades'
import { applyClick, CANDY_PER_CLICK, clickValue } from './click'

describe('applyClick', () => {
  it('adds exactly CANDY_PER_CLICK candies with no upgrades owned', () => {
    const result = applyClick(makeSave({ candies: 10 }))
    expect(result.candies).toBe(10 + CANDY_PER_CLICK)
    expect(result.lifetimeCandies).toBe(CANDY_PER_CLICK)
  })

  it('does not mutate the input save', () => {
    const save = makeSave({ candies: 5 })
    applyClick(save)
    expect(save.candies).toBe(5)
  })

  it('adds the click-upgrade bonus on top of the base value', () => {
    const clickDef = UPGRADES.find((u) => u.kind === 'click')!
    const save = makeSave({ upgrades: { [clickDef.id]: 2 } })

    expect(clickValue(save)).toBe(CANDY_PER_CLICK + clickDef.effect * 2)
    expect(applyClick(save).candies).toBe(clickValue(save))
  })
})
