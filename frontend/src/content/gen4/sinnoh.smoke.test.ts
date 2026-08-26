import { describe, expect, it } from 'vitest'
import { REGIONS } from '../regions'
import { makeRegionSave } from '../../engine/save.testUtils'
import { awardBadge, gymForLocation } from '../../systems/gyms/gymProgress'
import { canTravelTo, travelTo } from '../../systems/gyms/locations'
import { championTeam, eliteFourSequence } from '../../systems/gyms/champion'
import type { SpeciesEntry } from '../gen1/types'
import { STARTER_IDS } from './starters'
import gen4Data from '../../../public/data/gen4.json'

// End-to-end smoke test for the Sinnoh content pass — same shape as
// content/gen2/johto.smoke.test.ts and content/gen3/hoenn.smoke.test.ts, no
// browser available in this environment.
const sinnoh = REGIONS.sinnoh
const gen4 = gen4Data as SpeciesEntry[]

describe('Sinnoh content is wired up in REGIONS', () => {
  it('ends in victory-road', () => {
    expect(sinnoh.locations[sinnoh.locations.length - 1].id).toBe('victory-road')
  })

  it('every wild encounter species exists in gen4.json', () => {
    const gen4Ids = new Set(gen4.map((entry) => entry.id))
    const missing = sinnoh.locations
      .flatMap((location) => location.encounters)
      .map((encounter) => encounter.speciesId)
      .filter((id) => !gen4Ids.has(id))
    expect(missing).toEqual([])
  })

  it('every gym/Elite Four/champion team member exists in gen4.json', () => {
    const gen4Ids = new Set(gen4.map((entry) => entry.id))
    const teamIds = [
      ...sinnoh.gyms.flatMap((gym) => gym.team.map((m) => m.speciesId)),
      ...sinnoh.eliteFour.flatMap((member) => member.team.map((m) => m.speciesId)),
      ...Object.values(sinnoh.championTeamByStarter).flatMap((team) => team.map((m) => m.speciesId)),
    ]
    const missing = teamIds.filter((id) => !gen4Ids.has(id))
    expect(missing).toEqual([])
  })

  it('each of the 8 gyms hosts at a real location', () => {
    for (const gym of sinnoh.gyms) {
      expect(sinnoh.locations.some((loc) => loc.id === gym.locationId)).toBe(true)
    }
    expect(sinnoh.gyms).toHaveLength(8)
  })

  it('unlockAt is monotonically non-decreasing across the whole route', () => {
    for (let i = 1; i < sinnoh.locations.length; i++) {
      expect(sinnoh.locations[i].unlockAt).toBeGreaterThanOrEqual(sinnoh.locations[i - 1].unlockAt)
    }
  })
})

describe('a full Sinnoh playthrough can walk every location', () => {
  it('travels from twinleaf-town to victory-road, earning each badge along the way', () => {
    let save = makeRegionSave({ regionId: 'sinnoh', currentLocationId: 'twinleaf-town', lifetimeCandies: 0 })

    for (let i = 1; i < sinnoh.locations.length; i++) {
      const target = sinnoh.locations[i]
      save = { ...save, lifetimeCandies: target.unlockAt }
      expect(canTravelTo(sinnoh, save, target.id)).toBe(true)
      save = travelTo(sinnoh, save, target.id)
      expect(save.currentLocationId).toBe(target.id)

      const gymHere = gymForLocation(sinnoh.gyms, target.id)
      if (gymHere) save = awardBadge(save, gymHere.id)
    }

    expect(save.currentLocationId).toBe('victory-road')
    expect(save.badges).toHaveLength(8)
  })

  it('blocks reaching victory-road if the last gym (Volkner) was skipped', () => {
    const save = makeRegionSave({
      regionId: 'sinnoh',
      currentLocationId: 'sunyshore-city',
      lifetimeCandies: 1_000_000,
      badges: ['roark', 'gardenia', 'fantina', 'maylene', 'crasher-wake', 'byron', 'candice'], // no 'volkner'
    })
    expect(canTravelTo(sinnoh, save, 'route-223')).toBe(false)
  })
})

describe('Elite Four + Champion sequence', () => {
  it('has Aaron, Bertha, Flint, Lucian and a fixed Campeã at the end', () => {
    const save = makeRegionSave({ regionId: 'sinnoh', roster: [{ speciesId: STARTER_IDS[1], level: 5, xp: 0 }] })
    const sequence = eliteFourSequence(sinnoh, save, gen4)
    expect(sequence.map((entry) => entry.name)).toEqual(['Aaron', 'Bertha', 'Flint', 'Lucian', 'Campeão'])
    expect(sequence[4].team).toHaveLength(6)
  })

  it("Cynthia's team does not depend on which starter was picked", () => {
    const teams = STARTER_IDS.map((id) => {
      const save = makeRegionSave({ regionId: 'sinnoh', roster: [{ speciesId: id, level: 5, xp: 0 }] })
      return championTeam(sinnoh, save, gen4)
    })
    expect(teams[0]).toBe(teams[1])
    expect(teams[1]).toBe(teams[2])
  })
})
