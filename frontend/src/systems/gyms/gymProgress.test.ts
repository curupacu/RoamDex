import { describe, expect, it } from 'vitest'
import { makeSave } from '../../engine/save.testUtils'
import { awardBadge, gymForLocation, hasBadge } from './gymProgress'

describe('gymForLocation', () => {
  it('finds the gym hosted at a location', () => {
    expect(gymForLocation('pewter-city')?.id).toBe('brock')
  })

  it('returns null for a location with no gym', () => {
    expect(gymForLocation('route-1')).toBeNull()
  })
})

describe('hasBadge / awardBadge', () => {
  it('starts without any badges', () => {
    expect(hasBadge(makeSave(), 'brock')).toBe(false)
  })

  it('awards a badge exactly once', () => {
    const save = awardBadge(makeSave(), 'brock')
    expect(hasBadge(save, 'brock')).toBe(true)

    const again = awardBadge(save, 'brock')
    expect(again.badges).toEqual(['brock'])
  })
})
