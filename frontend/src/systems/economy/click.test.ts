import { describe, expect, it } from 'vitest'
import type { SaveData } from '../../engine/save'
import { applyClick, CANDY_PER_CLICK } from './click'

function makeSave(candies: number): SaveData {
  return { version: 1, candies, lastSavedAt: 0 }
}

describe('applyClick', () => {
  it('adds exactly CANDY_PER_CLICK candies', () => {
    const result = applyClick(makeSave(10))
    expect(result.candies).toBe(10 + CANDY_PER_CLICK)
  })

  it('does not mutate the input save', () => {
    const save = makeSave(5)
    applyClick(save)
    expect(save.candies).toBe(5)
  })
})
