import { describe, expect, it } from 'vitest'
import { REGIONS } from '../regions'
import { makeRegionSave } from '../../engine/save.testUtils'
import { awardBadge, gymForLocation } from '../../systems/gyms/gymProgress'
import { canTravelTo, travelTo } from '../../systems/gyms/locations'
import { championTeam, eliteFourSequence } from '../../systems/gyms/champion'
import type { SpeciesEntry } from '../gen1/types'
import { STARTER_IDS } from './starters'
import gen7Data from '../../../public/data/gen7.json'

const alola = REGIONS.alola
const gen7 = gen7Data as SpeciesEntry[]

describe('Alola content is wired up in REGIONS', () => {
  it('ends in victory-road', () => {
    expect(alola.locations[alola.locations.length - 1].id).toBe('victory-road')
  })

  it('every wild encounter species exists in gen7.json', () => {
    const gen7Ids = new Set(gen7.map((entry) => entry.id))
    const missing = alola.locations
      .flatMap((location) => location.encounters)
      .map((encounter) => encounter.speciesId)
      .filter((id) => !gen7Ids.has(id))
    expect(missing).toEqual([])
  })

  it('every gym/Elite Four/champion team member exists in gen7.json', () => {
    const gen7Ids = new Set(gen7.map((entry) => entry.id))
    const teamIds = [
      ...alola.gyms.flatMap((gym) => gym.team.map((m) => m.speciesId)),
      ...alola.eliteFour.flatMap((member) => member.team.map((m) => m.speciesId)),
      ...Object.values(alola.championTeamByStarter).flatMap((team) => team.map((m) => m.speciesId)),
    ]
    const missing = teamIds.filter((id) => !gen7Ids.has(id))
    expect(missing).toEqual([])
  })

  it('each of the 11 trials/grand trials hosts at a real location', () => {
    for (const gym of alola.gyms) {
      expect(alola.locations.some((loc) => loc.id === gym.locationId)).toBe(true)
    }
    expect(alola.gyms).toHaveLength(11)
  })

  it('unlockAt is monotonically non-decreasing across the whole route', () => {
    for (let i = 1; i < alola.locations.length; i++) {
      expect(alola.locations[i].unlockAt).toBeGreaterThanOrEqual(alola.locations[i - 1].unlockAt)
    }
  })
})

describe('a full Alola playthrough can walk every location', () => {
  it('travels from hauoli-city to victory-road, earning each certificate along the way', () => {
    let save = makeRegionSave({ regionId: 'alola', currentLocationId: 'hauoli-city', lifetimeCandies: 0 })

    for (let i = 1; i < alola.locations.length; i++) {
      const target = alola.locations[i]
      save = { ...save, lifetimeCandies: target.unlockAt }
      expect(canTravelTo(alola, save, target.id)).toBe(true)
      save = travelTo(alola, save, target.id)
      expect(save.currentLocationId).toBe(target.id)

      const gymHere = gymForLocation(alola.gyms, target.id)
      if (gymHere) save = awardBadge(save, gymHere.id)
    }

    expect(save.currentLocationId).toBe('victory-road')
    expect(save.badges).toHaveLength(11)
  })

  it('blocks reaching victory-road if the last trial (Hapu) was skipped', () => {
    const save = makeRegionSave({
      regionId: 'alola',
      currentLocationId: 'poni-gauntlet',
      lifetimeCandies: 1_000_000,
      badges: ['ilima', 'hala', 'lana', 'kiawe', 'mallow', 'olivia', 'sophocles', 'acerola', 'nanu', 'totem-kommo-o'], // no 'hapu'
    })
    expect(canTravelTo(alola, save, 'victory-road')).toBe(false)
  })
})

describe('Elite Four + Campeão sequence', () => {
  it('has Hala, Olivia, Acerola, Kahili and a fixed Campeão at the end', () => {
    const save = makeRegionSave({ regionId: 'alola', roster: [{ speciesId: STARTER_IDS[1], level: 5, xp: 0 }] })
    const sequence = eliteFourSequence(alola, save, gen7)
    expect(sequence.map((entry) => entry.name)).toEqual(['Hala', 'Olivia', 'Acerola', 'Kahili', 'Campeão'])
    expect(sequence[4].team).toHaveLength(6)
  })

  it("Kukui's team depends on which starter was picked (achado da pesquisa: contra-ataque de tipo)", () => {
    const teams = STARTER_IDS.map((id) => {
      const save = makeRegionSave({ regionId: 'alola', roster: [{ speciesId: id, level: 5, xp: 0 }] })
      return championTeam(alola, save, gen7)
    })
    expect(teams[0]).not.toBe(teams[1])
    expect(teams[1]).not.toBe(teams[2])
  })
})
