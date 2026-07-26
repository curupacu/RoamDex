import { describe, expect, it } from 'vitest'
import { REGIONS } from '../regions'
import { makeRegionSave } from '../../engine/save.testUtils'
import { awardBadge, gymForLocation } from '../../systems/gyms/gymProgress'
import { canTravelTo, travelTo } from '../../systems/gyms/locations'
import { championTeam, eliteFourSequence } from '../../systems/gyms/champion'
import type { SpeciesEntry } from '../gen1/types'
import { STARTER_IDS } from './starters'
import gen2Data from '../../../public/data/gen2.json'

// End-to-end smoke test for Sprint 24 (Gen 2 completa) — no browser
// available in this environment (see docs/decisoes/0025-sprint24-gen2.md),
// so this drives the actual systems/ logic across every JOHTO_LOCATIONS
// entry instead of only asserting on the raw content data.
const johto = REGIONS.johto
const gen2 = gen2Data as SpeciesEntry[]

describe('Johto content is wired up in REGIONS', () => {
  it('has 39 locations ending in victory-road', () => {
    expect(johto.locations).toHaveLength(39)
    expect(johto.locations[johto.locations.length - 1].id).toBe('victory-road')
  })

  it('every wild encounter species exists in gen2.json', () => {
    const gen2Ids = new Set(gen2.map((entry) => entry.id))
    const missing = johto.locations
      .flatMap((location) => location.encounters)
      .map((encounter) => encounter.speciesId)
      .filter((id) => !gen2Ids.has(id))
    expect(missing).toEqual([])
  })

  it('every gym/Elite Four/champion team member exists in gen2.json', () => {
    const gen2Ids = new Set(gen2.map((entry) => entry.id))
    const teamIds = [
      ...johto.gyms.flatMap((gym) => gym.team.map((m) => m.speciesId)),
      ...johto.eliteFour.flatMap((member) => member.team.map((m) => m.speciesId)),
      ...Object.values(johto.championTeamByStarter).flatMap((team) => team.map((m) => m.speciesId)),
    ]
    const missing = teamIds.filter((id) => !gen2Ids.has(id))
    expect(missing).toEqual([])
  })

  it('each of the 8 gyms hosts at a real location', () => {
    for (const gym of johto.gyms) {
      expect(johto.locations.some((loc) => loc.id === gym.locationId)).toBe(true)
    }
    expect(johto.gyms).toHaveLength(8)
  })
})

describe('a full Johto playthrough can walk every location', () => {
  it('travels from new-bark-town to victory-road, earning each badge along the way', () => {
    let save = makeRegionSave({ regionId: 'johto', currentLocationId: 'new-bark-town', lifetimeCandies: 0 })

    for (let i = 1; i < johto.locations.length; i++) {
      const target = johto.locations[i]
      save = { ...save, lifetimeCandies: target.unlockAt }
      expect(canTravelTo(johto, save, target.id)).toBe(true)
      save = travelTo(johto, save, target.id)
      expect(save.currentLocationId).toBe(target.id)

      const gymHere = gymForLocation(johto.gyms, target.id)
      if (gymHere) save = awardBadge(save, gymHere.id)
    }

    expect(save.currentLocationId).toBe('victory-road')
    expect(save.badges).toHaveLength(8)
  })

  it('blocks reaching victory-road if the last gym (Clair) was skipped', () => {
    const save = makeRegionSave({
      regionId: 'johto',
      currentLocationId: 'blackthorn-city',
      lifetimeCandies: 1_000_000,
      badges: ['falkner', 'bugsy', 'whitney', 'morty', 'chuck', 'jasmine', 'pryce'], // no 'clair'
    })
    expect(canTravelTo(johto, save, 'route-26')).toBe(false)
  })
})

describe('Elite Four + Champion sequence', () => {
  it('has Will, Koga, Bruno, Karen and a fixed Campeão at the end', () => {
    const save = makeRegionSave({ regionId: 'johto', roster: [{ speciesId: STARTER_IDS[1], level: 5, xp: 0 }] })
    const sequence = eliteFourSequence(johto, save, gen2)
    expect(sequence.map((entry) => entry.name)).toEqual(['Will', 'Koga', 'Bruno', 'Karen', 'Campeão'])
    expect(sequence[4].team).toHaveLength(6)
  })

  it("Lance's team does not depend on which starter was picked", () => {
    const teams = STARTER_IDS.map((id) => {
      const save = makeRegionSave({ regionId: 'johto', roster: [{ speciesId: id, level: 5, xp: 0 }] })
      return championTeam(johto, save, gen2)
    })
    expect(teams[0]).toBe(teams[1])
    expect(teams[1]).toBe(teams[2])
  })
})
