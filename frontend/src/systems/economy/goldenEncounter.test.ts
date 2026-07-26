import { describe, expect, it } from 'vitest'
import { FRENZY_BUFF_ID, FRENZY_DURATION_MS, FRENZY_MULTIPLIER } from '../../content/goldenEncounter'
import { makeRegionSave } from '../../engine/save.testUtils'
import { frenzyMultiplier, isFrenzyActive, triggerFrenzy } from './goldenEncounter'

describe('triggerFrenzy / isFrenzyActive / frenzyMultiplier', () => {
  it('activates the buff for FRENZY_DURATION_MS from now', () => {
    const save = makeRegionSave()
    const now = 1_000
    const result = triggerFrenzy(save, now)

    expect(result.buffs[FRENZY_BUFF_ID]).toBe(now + FRENZY_DURATION_MS)
    expect(isFrenzyActive(result, now)).toBe(true)
    expect(isFrenzyActive(result, now + FRENZY_DURATION_MS + 1)).toBe(false)
    expect(frenzyMultiplier(result, now)).toBe(FRENZY_MULTIPLIER)
  })

  it('extends from the current expiry instead of resetting when caught again while active', () => {
    const save = makeRegionSave()
    const now = 1_000
    const afterFirst = triggerFrenzy(save, now)
    const afterSecond = triggerFrenzy(afterFirst, now + 100)

    expect(afterSecond.buffs[FRENZY_BUFF_ID]).toBe(now + FRENZY_DURATION_MS * 2)
  })

  it('defaults to a 1x multiplier / inactive with no buff triggered', () => {
    const save = makeRegionSave()
    expect(isFrenzyActive(save, 0)).toBe(false)
    expect(frenzyMultiplier(save, 0)).toBe(1)
  })
})
