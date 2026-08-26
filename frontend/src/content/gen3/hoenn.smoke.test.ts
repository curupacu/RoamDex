import { describe, expect, it } from 'vitest'
import { REGIONS } from '../regions'
import { makeRegionSave } from '../../engine/save.testUtils'
import { awardBadge, gymForLocation } from '../../systems/gyms/gymProgress'
import { canTravelTo, travelTo } from '../../systems/gyms/locations'
import { championTeam, eliteFourSequence } from '../../systems/gyms/champion'
import type { SpeciesEntry } from '../gen1/types'
import { STARTER_IDS } from './starters'
import gen3Data from '../../../public/data/gen3.json'

// End-to-end smoke test for the Hoenn content pass — same shape as
// content/gen2/johto.smoke.test.ts, no browser available in this
// environment.
const hoenn = REGIONS.hoenn
const gen3 = gen3Data as SpeciesEntry[]

describe('Hoenn content is wired up in REGIONS', () => {
  it('ends in victory-road', () => {
    expect(hoenn.locations[hoenn.locations.length - 1].id).toBe('victory-road')
  })

  it('every wild encounter species exists in gen3.json', () => {
    const gen3Ids = new Set(gen3.map((entry) => entry.id))
    const missing = hoenn.locations
      .flatMap((location) => location.encounters)
      .map((encounter) => encounter.speciesId)
      .filter((id) => !gen3Ids.has(id))
    expect(missing).toEqual([])
  })

  it('every gym/Elite Four/champion team member exists in gen3.json', () => {
    const gen3Ids = new Set(gen3.map((entry) => entry.id))
    const teamIds = [
      ...hoenn.gyms.flatMap((gym) => gym.team.map((m) => m.speciesId)),
      ...hoenn.eliteFour.flatMap((member) => member.team.map((m) => m.speciesId)),
      ...Object.values(hoenn.championTeamByStarter).flatMap((team) => team.map((m) => m.speciesId)),
    ]
    const missing = teamIds.filter((id) => !gen3Ids.has(id))
    expect(missing).toEqual([])
  })

  it('each of the 8 gyms hosts at a real location', () => {
    for (const gym of hoenn.gyms) {
      expect(hoenn.locations.some((loc) => loc.id === gym.locationId)).toBe(true)
    }
    expect(hoenn.gyms).toHaveLength(8)
  })

  it('unlockAt is monotonically non-decreasing across the whole route', () => {
    for (let i = 1; i < hoenn.locations.length; i++) {
      expect(hoenn.locations[i].unlockAt).toBeGreaterThanOrEqual(hoenn.locations[i - 1].unlockAt)
    }
  })
})

describe('a full Hoenn playthrough can walk every location', () => {
  it('travels from littleroot-town to victory-road, earning each badge along the way', () => {
    let save = makeRegionSave({ regionId: 'hoenn', currentLocationId: 'littleroot-town', lifetimeCandies: 0 })

    for (let i = 1; i < hoenn.locations.length; i++) {
      const target = hoenn.locations[i]
      save = { ...save, lifetimeCandies: target.unlockAt }
      expect(canTravelTo(hoenn, save, target.id)).toBe(true)
      save = travelTo(hoenn, save, target.id)
      expect(save.currentLocationId).toBe(target.id)

      const gymHere = gymForLocation(hoenn.gyms, target.id)
      if (gymHere) save = awardBadge(save, gymHere.id)
    }

    expect(save.currentLocationId).toBe('victory-road')
    expect(save.badges).toHaveLength(8)
  })

  it('blocks reaching victory-road if the last gym (Juan) was skipped', () => {
    const save = makeRegionSave({
      regionId: 'hoenn',
      currentLocationId: 'sootopolis-city',
      lifetimeCandies: 1_000_000,
      badges: ['roxanne', 'brawly', 'wattson', 'flannery', 'norman', 'winona', 'tate-and-liza'], // no 'juan'
    })
    expect(canTravelTo(hoenn, save, 'route-131')).toBe(false)
  })
})

describe('Elite Four + Champion sequence', () => {
  it('has Sidney, Phoebe, Glacia, Drake and a fixed Campeã at the end', () => {
    const save = makeRegionSave({ regionId: 'hoenn', roster: [{ speciesId: STARTER_IDS[1], level: 5, xp: 0 }] })
    const sequence = eliteFourSequence(hoenn, save, gen3)
    expect(sequence.map((entry) => entry.name)).toEqual(['Sidney', 'Phoebe', 'Glacia', 'Drake', 'Campeão'])
    expect(sequence[4].team).toHaveLength(6)
  })

  it("Wallace's team does not depend on which starter was picked", () => {
    const teams = STARTER_IDS.map((id) => {
      const save = makeRegionSave({ regionId: 'hoenn', roster: [{ speciesId: id, level: 5, xp: 0 }] })
      return championTeam(hoenn, save, gen3)
    })
    expect(teams[0]).toBe(teams[1])
    expect(teams[1]).toBe(teams[2])
  })
})
