import { describe, expect, it } from 'vitest'
import { makeSave } from '../../engine/save.testUtils'
import { canTravelTo, locationById, locationIndex, nextLocationOf, prevLocationOf, travelTo } from './locations'

describe('locationById', () => {
  it('finds a location by id', () => {
    expect(locationById('route-1').name).toBe('Rota 1')
  })

  it('falls back to the first location for an unknown id', () => {
    expect(locationById('nowhere').id).toBe('pallet-town')
  })
})

describe('prevLocationOf / nextLocationOf', () => {
  it('has no previous location before the start', () => {
    expect(prevLocationOf('pallet-town')).toBeNull()
  })

  it('has no next location after the end', () => {
    expect(nextLocationOf('victory-road')).toBeNull()
  })

  it('walks one step in each direction', () => {
    expect(prevLocationOf('route-2')?.id).toBe('route-1')
    expect(nextLocationOf('route-2')?.id).toBe('viridian-forest')
  })
})

describe('canTravelTo', () => {
  it('always allows moving one step back, regardless of candies', () => {
    const save = makeSave({ currentLocationId: 'route-2', lifetimeCandies: 0 })
    expect(canTravelTo(save, 'route-1')).toBe(true)
  })

  it('blocks moving forward before the lifetime-candy gate is met', () => {
    const save = makeSave({ currentLocationId: 'route-1', lifetimeCandies: 199 })
    expect(canTravelTo(save, 'route-2')).toBe(false)
  })

  it('allows moving forward once the gate is met', () => {
    const save = makeSave({ currentLocationId: 'route-1', lifetimeCandies: 200 })
    expect(canTravelTo(save, 'route-2')).toBe(true)
  })

  it('refuses to skip more than one location at a time', () => {
    const save = makeSave({ currentLocationId: 'pallet-town', lifetimeCandies: 1_000_000 })
    expect(canTravelTo(save, 'viridian-forest')).toBe(false)
  })
})

describe('travelTo', () => {
  it('moves the player when travel is allowed', () => {
    const save = makeSave({ currentLocationId: 'pallet-town', lifetimeCandies: 0 })
    const result = travelTo(save, 'route-1')
    expect(result.currentLocationId).toBe('route-1')
  })

  it('is a no-op when travel is blocked', () => {
    const save = makeSave({ currentLocationId: 'route-1', lifetimeCandies: 0 })
    const result = travelTo(save, 'route-2')
    expect(result.currentLocationId).toBe('route-1')
  })
})

describe('locationIndex', () => {
  it('returns -1 for an unknown id', () => {
    expect(locationIndex('nowhere')).toBe(-1)
  })
})
