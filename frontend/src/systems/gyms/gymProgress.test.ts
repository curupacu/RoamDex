import { describe, expect, it } from 'vitest'
import { REGIONS } from '../../content/regions'
import { makeRegionSave } from '../../engine/save.testUtils'
import { awardBadge, gymForLocation, hasBadge } from './gymProgress'

const kanto = REGIONS.kanto

describe('gymForLocation', () => {
  it('finds the gym hosted at a location', () => {
    expect(gymForLocation(kanto.gyms, 'pewter-city')?.id).toBe('brock')
  })

  it('returns null for a location with no gym', () => {
    expect(gymForLocation(kanto.gyms, 'route-1')).toBeNull()
  })
})

describe('hasBadge / awardBadge', () => {
  it('starts without any badges', () => {
    expect(hasBadge(makeRegionSave(), 'brock')).toBe(false)
  })

  it('awards a badge exactly once', () => {
    const save = awardBadge(makeRegionSave(), 'brock')
    expect(hasBadge(save, 'brock')).toBe(true)

    const again = awardBadge(save, 'brock')
    expect(again.badges).toEqual(['brock'])
  })
})
