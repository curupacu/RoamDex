import { describe, expect, it } from 'vitest'
import { REGIONS } from '../regions'
import { makeRegionSave } from '../../engine/save.testUtils'
import { awardBadge, gymForLocation } from '../../systems/gyms/gymProgress'
import { canTravelTo, travelTo } from '../../systems/gyms/locations'
import { championTeam, eliteFourSequence } from '../../systems/gyms/champion'
import type { SpeciesEntry } from '../gen1/types'
import { STARTER_IDS } from './starters'
import gen9Data from '../../../public/data/gen9.json'

const paldea = REGIONS.paldea
const gen9 = gen9Data as SpeciesEntry[]

describe('Paldea content is wired up in REGIONS', () => {
  it('ends in victory-road', () => {
    expect(paldea.locations[paldea.locations.length - 1].id).toBe('victory-road')
  })

  it('every wild encounter species exists in gen9.json', () => {
    const gen9Ids = new Set(gen9.map((entry) => entry.id))
    const missing = paldea.locations
      .flatMap((location) => location.encounters)
      .map((encounter) => encounter.speciesId)
      .filter((id) => !gen9Ids.has(id))
    expect(missing).toEqual([])
  })

  it('every gym/Elite Four/champion team member exists in gen9.json', () => {
    const gen9Ids = new Set(gen9.map((entry) => entry.id))
    const teamIds = [
      ...paldea.gyms.flatMap((gym) => gym.team.map((m) => m.speciesId)),
      ...paldea.eliteFour.flatMap((member) => member.team.map((m) => m.speciesId)),
      ...Object.values(paldea.championTeamByStarter).flatMap((team) => team.map((m) => m.speciesId)),
    ]
    const missing = teamIds.filter((id) => !gen9Ids.has(id))
    expect(missing).toEqual([])
  })

  it('each of the 8 gyms hosts at a real location', () => {
    for (const gym of paldea.gyms) {
      expect(paldea.locations.some((loc) => loc.id === gym.locationId)).toBe(true)
    }
    expect(paldea.gyms).toHaveLength(8)
  })

  it('unlockAt is monotonically non-decreasing across the whole route', () => {
    for (let i = 1; i < paldea.locations.length; i++) {
      expect(paldea.locations[i].unlockAt).toBeGreaterThanOrEqual(paldea.locations[i - 1].unlockAt)
    }
  })
})

describe('a full Paldea playthrough can walk every location', () => {
  it('travels from cabo-poco to victory-road, earning each badge along the way', () => {
    let save = makeRegionSave({ regionId: 'paldea', currentLocationId: 'cabo-poco', lifetimeCandies: 0 })

    for (let i = 1; i < paldea.locations.length; i++) {
      const target = paldea.locations[i]
      save = { ...save, lifetimeCandies: target.unlockAt }
      expect(canTravelTo(paldea, save, target.id)).toBe(true)
      save = travelTo(paldea, save, target.id)
      expect(save.currentLocationId).toBe(target.id)

      const gymHere = gymForLocation(paldea.gyms, target.id)
      if (gymHere) save = awardBadge(save, gymHere.id)
    }

    expect(save.currentLocationId).toBe('victory-road')
    expect(save.badges).toHaveLength(8)
  })

  it('blocks reaching victory-road if the last gym (Grusha) was skipped', () => {
    const save = makeRegionSave({
      regionId: 'paldea',
      currentLocationId: 'glaseado-mountain-gym',
      lifetimeCandies: 1_000_000,
      badges: ['katy', 'brassius', 'iono', 'kofu', 'larry', 'ryme', 'tulip'], // no 'grusha'
    })
    expect(canTravelTo(paldea, save, 'victory-road')).toBe(false)
  })
})

describe('Elite Four + Campeã sequence', () => {
  it('has Rika, Poppy, Larry (Flying) and Hassel, and a fixed Campeã at the end', () => {
    const save = makeRegionSave({ regionId: 'paldea', roster: [{ speciesId: STARTER_IDS[1], level: 5, xp: 0 }] })
    const sequence = eliteFourSequence(paldea, save, gen9)
    expect(sequence.map((entry) => entry.name)).toEqual(['Rika', 'Poppy', 'Larry', 'Hassel', 'Campeão'])
    expect(sequence[4].team).toHaveLength(5)
  })

  it("Larry's Elite Four team is a different roster from his gym team (achado da pesquisa: mesma pessoa, 2 fases — Staraptor é o único Pokémon que se repete nas duas)", () => {
    const larryGym = paldea.gyms.find((gym) => gym.id === 'larry')!
    const larryElite = paldea.eliteFour.find((member) => member.id === 'larry-elite-four')!
    expect(larryElite.team).not.toEqual(larryGym.team)
    expect(larryElite.team.length).not.toBe(larryGym.team.length)
  })

  it("Geeta's team does not depend on which starter was picked (sem variação documentada, mesmo tratamento do Alder de Unova)", () => {
    const teams = STARTER_IDS.map((id) => {
      const save = makeRegionSave({ regionId: 'paldea', roster: [{ speciesId: id, level: 5, xp: 0 }] })
      return championTeam(paldea, save, gen9)
    })
    expect(teams[0]).toBe(teams[1])
    expect(teams[1]).toBe(teams[2])
  })
})
