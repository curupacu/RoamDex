import { describe, expect, it } from 'vitest'
import { REGIONS } from '../../content/regions'
import { makeRegionSave } from '../../engine/save.testUtils'
import { canTravelTo, locationById, locationIndex, nextLocationOf, prevLocationOf, travelTo } from './locations'

const kanto = REGIONS.kanto

describe('locationById', () => {
  it('finds a location by id', () => {
    expect(locationById(kanto, 'route-1').name).toBe('Rota 1')
  })

  it('falls back to the first location for an unknown id', () => {
    expect(locationById(kanto, 'nowhere').id).toBe('pallet-town')
  })
})

describe('prevLocationOf / nextLocationOf', () => {
  it('has no previous location before the start', () => {
    expect(prevLocationOf(kanto, 'pallet-town')).toBeNull()
  })

  it('has no next location after the end', () => {
    expect(nextLocationOf(kanto, 'victory-road')).toBeNull()
  })

  it('walks one step in each direction', () => {
    expect(prevLocationOf(kanto, 'route-2')?.id).toBe('route-1')
    expect(nextLocationOf(kanto, 'route-2')?.id).toBe('viridian-forest')
  })
})

describe('canTravelTo', () => {
  it('always allows moving one step back, regardless of candies', () => {
    const save = makeRegionSave({ currentLocationId: 'route-2', lifetimeCandies: 0 })
    expect(canTravelTo(kanto, save, 'route-1')).toBe(true)
  })

  it('blocks moving forward before the lifetime-candy gate is met', () => {
    const save = makeRegionSave({ currentLocationId: 'route-1', lifetimeCandies: 199 })
    expect(canTravelTo(kanto, save, 'route-2')).toBe(false)
  })

  it('allows moving forward once the gate is met', () => {
    const save = makeRegionSave({ currentLocationId: 'route-1', lifetimeCandies: 200 })
    expect(canTravelTo(kanto, save, 'route-2')).toBe(true)
  })

  it('refuses to skip more than one location at a time', () => {
    const save = makeRegionSave({ currentLocationId: 'pallet-town', lifetimeCandies: 1_000_000 })
    expect(canTravelTo(kanto, save, 'viridian-forest')).toBe(false)
  })

  it('blocks moving past a gym location whose badge has not been earned', () => {
    const save = makeRegionSave({ currentLocationId: 'pewter-city', lifetimeCandies: 1_000_000, badges: [] })
    expect(canTravelTo(kanto, save, 'route-3')).toBe(false)
  })

  it('allows moving past a gym location once its badge is earned', () => {
    const save = makeRegionSave({ currentLocationId: 'pewter-city', lifetimeCandies: 1_000_000, badges: ['brock'] })
    expect(canTravelTo(kanto, save, 'route-3')).toBe(true)
  })

  it('does not gate travel out of a location with no gym', () => {
    const save = makeRegionSave({ currentLocationId: 'route-1', lifetimeCandies: 1_000_000, badges: [] })
    expect(canTravelTo(kanto, save, 'route-2')).toBe(true)
  })
})

describe('travelTo', () => {
  it('moves the player when travel is allowed', () => {
    const save = makeRegionSave({ currentLocationId: 'pallet-town', lifetimeCandies: 0 })
    const result = travelTo(kanto, save, 'route-1')
    expect(result.currentLocationId).toBe('route-1')
  })

  it('is a no-op when travel is blocked', () => {
    const save = makeRegionSave({ currentLocationId: 'route-1', lifetimeCandies: 0 })
    const result = travelTo(kanto, save, 'route-2')
    expect(result.currentLocationId).toBe('route-1')
  })
})

describe('locationIndex', () => {
  it('returns -1 for an unknown id', () => {
    expect(locationIndex(kanto, 'nowhere')).toBe(-1)
  })
})
