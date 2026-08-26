import { describe, expect, it } from 'vitest'
import { REGIONS } from '../regions'
import { makeRegionSave } from '../../engine/save.testUtils'
import { awardBadge, gymForLocation } from '../../systems/gyms/gymProgress'
import { canTravelTo, travelTo } from '../../systems/gyms/locations'
import { championTeam, eliteFourSequence } from '../../systems/gyms/champion'
import type { SpeciesEntry } from '../gen1/types'
import { STARTER_IDS } from './starters'
import gen6Data from '../../../public/data/gen6.json'

// End-to-end smoke test for the Kalos content pass — same shape as
// content/gen2/johto.smoke.test.ts, content/gen3/hoenn.smoke.test.ts and
// content/gen4/sinnoh.smoke.test.ts, no browser available in this
// environment.
const kalos = REGIONS.kalos
const gen6 = gen6Data as SpeciesEntry[]

describe('Kalos content is wired up in REGIONS', () => {
  it('ends in victory-road', () => {
    expect(kalos.locations[kalos.locations.length - 1].id).toBe('victory-road')
  })

  it('every wild encounter species exists in gen6.json', () => {
    const gen6Ids = new Set(gen6.map((entry) => entry.id))
    const missing = kalos.locations
      .flatMap((location) => location.encounters)
      .map((encounter) => encounter.speciesId)
      .filter((id) => !gen6Ids.has(id))
    expect(missing).toEqual([])
  })

  it('every gym/Elite Four/champion team member exists in gen6.json', () => {
    const gen6Ids = new Set(gen6.map((entry) => entry.id))
    const teamIds = [
      ...kalos.gyms.flatMap((gym) => gym.team.map((m) => m.speciesId)),
      ...kalos.eliteFour.flatMap((member) => member.team.map((m) => m.speciesId)),
      ...Object.values(kalos.championTeamByStarter).flatMap((team) => team.map((m) => m.speciesId)),
    ]
    const missing = teamIds.filter((id) => !gen6Ids.has(id))
    expect(missing).toEqual([])
  })

  it('each of the 8 gyms hosts at a real location', () => {
    for (const gym of kalos.gyms) {
      expect(kalos.locations.some((loc) => loc.id === gym.locationId)).toBe(true)
    }
    expect(kalos.gyms).toHaveLength(8)
  })

  it('unlockAt is monotonically non-decreasing across the whole route', () => {
    for (let i = 1; i < kalos.locations.length; i++) {
      expect(kalos.locations[i].unlockAt).toBeGreaterThanOrEqual(kalos.locations[i - 1].unlockAt)
    }
  })
})

describe('a full Kalos playthrough can walk every location', () => {
  it('travels from vaniville-town to victory-road, earning each badge along the way', () => {
    let save = makeRegionSave({ regionId: 'kalos', currentLocationId: 'vaniville-town', lifetimeCandies: 0 })

    for (let i = 1; i < kalos.locations.length; i++) {
      const target = kalos.locations[i]
      save = { ...save, lifetimeCandies: target.unlockAt }
      expect(canTravelTo(kalos, save, target.id)).toBe(true)
      save = travelTo(kalos, save, target.id)
      expect(save.currentLocationId).toBe(target.id)

      const gymHere = gymForLocation(kalos.gyms, target.id)
      if (gymHere) save = awardBadge(save, gymHere.id)
    }

    expect(save.currentLocationId).toBe('victory-road')
    expect(save.badges).toHaveLength(8)
  })

  it('blocks reaching route-21 if the last gym (Wulfric) was skipped', () => {
    const save = makeRegionSave({
      regionId: 'kalos',
      currentLocationId: 'snowbelle-city',
      lifetimeCandies: 1_000_000,
      badges: ['viola', 'grant', 'korrina', 'ramos', 'clemont', 'valerie', 'olympia'], // no 'wulfric'
    })
    expect(canTravelTo(kalos, save, 'route-21')).toBe(false)
  })
})

describe('Elite Four + Champion sequence', () => {
  it('has Malva, Siebold, Wikstrom, Drasna and a fixed Campeã at the end', () => {
    const save = makeRegionSave({ regionId: 'kalos', roster: [{ speciesId: STARTER_IDS[1], level: 5, xp: 0 }] })
    const sequence = eliteFourSequence(kalos, save, gen6)
    expect(sequence.map((entry) => entry.name)).toEqual(['Malva', 'Siebold', 'Wikstrom', 'Drasna', 'Campeão'])
    expect(sequence[4].team).toHaveLength(6)
  })

  it("Diantha's team does not depend on which starter was picked", () => {
    const teams = STARTER_IDS.map((id) => {
      const save = makeRegionSave({ regionId: 'kalos', roster: [{ speciesId: id, level: 5, xp: 0 }] })
      return championTeam(kalos, save, gen6)
    })
    expect(teams[0]).toBe(teams[1])
    expect(teams[1]).toBe(teams[2])
  })
})
