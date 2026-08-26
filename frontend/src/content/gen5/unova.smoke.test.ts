import { describe, expect, it } from 'vitest'
import { REGIONS } from '../regions'
import { makeRegionSave } from '../../engine/save.testUtils'
import { awardBadge, gymForLocation, resolveGym } from '../../systems/gyms/gymProgress'
import { canTravelTo, travelTo } from '../../systems/gyms/locations'
import { championTeam, eliteFourSequence } from '../../systems/gyms/champion'
import type { SpeciesEntry } from '../gen1/types'
import { STARTER_IDS } from './starters'
import gen5Data from '../../../public/data/gen5.json'

// End-to-end smoke test for the Unova content pass — same shape as
// content/gen2/johto.smoke.test.ts, gen3/hoenn.smoke.test.ts,
// gen4/sinnoh.smoke.test.ts e gen6/kalos.smoke.test.ts, no browser
// available in this environment.
const unova = REGIONS.unova
const gen5 = gen5Data as SpeciesEntry[]

describe('Unova content is wired up in REGIONS', () => {
  it('ends in victory-road', () => {
    expect(unova.locations[unova.locations.length - 1].id).toBe('victory-road')
  })

  it('every wild encounter species exists in gen5.json', () => {
    const gen5Ids = new Set(gen5.map((entry) => entry.id))
    const missing = unova.locations
      .flatMap((location) => location.encounters)
      .map((encounter) => encounter.speciesId)
      .filter((id) => !gen5Ids.has(id))
    expect(missing).toEqual([])
  })

  it('every gym/Elite Four/champion team member exists in gen5.json (including the 3 Striaton alternates)', () => {
    const gen5Ids = new Set(gen5.map((entry) => entry.id))
    const striaton = unova.gyms.find((gym) => gym.id === 'striaton')!
    const teamIds = [
      ...unova.gyms.flatMap((gym) => gym.team.map((m) => m.speciesId)),
      ...Object.values(striaton.teamByStarter ?? {}).flatMap((team) => team.map((m) => m.speciesId)),
      ...unova.eliteFour.flatMap((member) => member.team.map((m) => m.speciesId)),
      ...Object.values(unova.championTeamByStarter).flatMap((team) => team.map((m) => m.speciesId)),
    ]
    const missing = teamIds.filter((id) => !gen5Ids.has(id))
    expect(missing).toEqual([])
  })

  it('each of the 8 gyms hosts at a real location', () => {
    for (const gym of unova.gyms) {
      expect(unova.locations.some((loc) => loc.id === gym.locationId)).toBe(true)
    }
    expect(unova.gyms).toHaveLength(8)
  })

  it('unlockAt is monotonically non-decreasing across the whole route', () => {
    for (let i = 1; i < unova.locations.length; i++) {
      expect(unova.locations[i].unlockAt).toBeGreaterThanOrEqual(unova.locations[i - 1].unlockAt)
    }
  })
})

// Achado de pesquisa (docs/ROTAS-UNOVA.md): Striaton City tem 3 líderes
// (Cilan/Chili/Cress) por trás do MESMO id/local — o jogo original resolve
// automaticamente por qual inicial o jogador escolheu (nunca uma tela de
// escolha), modelado aqui via GymDefinition.teamByStarter +
// systems/gyms/gymProgress.ts's resolveGym.
describe('Striaton gym resolves the right leader by starter (Padrão novo, achado da pesquisa)', () => {
  const striaton = unova.gyms.find((gym) => gym.id === 'striaton')!
  const [snivyId, tepigId, oshawottId] = STARTER_IDS

  it('Snivy (Grass) → fights Chili (Fire)', () => {
    const save = makeRegionSave({ regionId: 'unova', roster: [{ speciesId: snivyId, level: 5, xp: 0 }] })
    const resolved = resolveGym(unova, striaton, save, gen5)
    expect(resolved.leaderName).toBe('Chili')
    expect(resolved.team.some((m) => m.speciesId === 513)).toBe(true) // Pansear
  })

  it('Tepig (Fire) → fights Cress (Water)', () => {
    const save = makeRegionSave({ regionId: 'unova', roster: [{ speciesId: tepigId, level: 5, xp: 0 }] })
    const resolved = resolveGym(unova, striaton, save, gen5)
    expect(resolved.leaderName).toBe('Cress')
    expect(resolved.team.some((m) => m.speciesId === 515)).toBe(true) // Panpour
  })

  it('Oshawott (Water) → fights Cilan (Grass)', () => {
    const save = makeRegionSave({ regionId: 'unova', roster: [{ speciesId: oshawottId, level: 5, xp: 0 }] })
    const resolved = resolveGym(unova, striaton, save, gen5)
    expect(resolved.leaderName).toBe('Cilan')
    expect(resolved.team.some((m) => m.speciesId === 511)).toBe(true) // Pansage
  })

  it('id/badgeName/locationId stay the same regardless of which leader resolves (one shared badge)', () => {
    const save = makeRegionSave({ regionId: 'unova', roster: [{ speciesId: snivyId, level: 5, xp: 0 }] })
    const resolved = resolveGym(unova, striaton, save, gen5)
    expect(resolved.id).toBe('striaton')
    expect(resolved.badgeName).toBe(striaton.badgeName)
    expect(resolved.locationId).toBe(striaton.locationId)
  })

  it('is a no-op for gyms without teamByStarter (every other Unova gym)', () => {
    const lenora = unova.gyms.find((gym) => gym.id === 'lenora')!
    const save = makeRegionSave({ regionId: 'unova', roster: [{ speciesId: snivyId, level: 5, xp: 0 }] })
    expect(resolveGym(unova, lenora, save, gen5)).toBe(lenora)
  })
})

describe('a full Unova playthrough can walk every location', () => {
  it('travels from nuvema-town to victory-road, earning each badge along the way', () => {
    let save = makeRegionSave({ regionId: 'unova', currentLocationId: 'nuvema-town', lifetimeCandies: 0 })

    for (let i = 1; i < unova.locations.length; i++) {
      const target = unova.locations[i]
      save = { ...save, lifetimeCandies: target.unlockAt }
      expect(canTravelTo(unova, save, target.id)).toBe(true)
      save = travelTo(unova, save, target.id)
      expect(save.currentLocationId).toBe(target.id)

      const gymHere = gymForLocation(unova.gyms, target.id)
      if (gymHere) save = awardBadge(save, gymHere.id)
    }

    expect(save.currentLocationId).toBe('victory-road')
    expect(save.badges).toHaveLength(8)
  })

  it('blocks reaching route-10 if the last gym (Drayden) was skipped', () => {
    const save = makeRegionSave({
      regionId: 'unova',
      currentLocationId: 'opelucid-city',
      lifetimeCandies: 1_000_000,
      badges: ['striaton', 'lenora', 'burgh', 'elesa', 'clay', 'skyla', 'brycen'], // no 'drayden'
    })
    expect(canTravelTo(unova, save, 'route-10')).toBe(false)
  })
})

describe('Elite Four + Champion sequence', () => {
  it('has Shauntal, Marshal, Grimsley, Caitlin and a fixed Campeão at the end', () => {
    const save = makeRegionSave({ regionId: 'unova', roster: [{ speciesId: STARTER_IDS[1], level: 5, xp: 0 }] })
    const sequence = eliteFourSequence(unova, save, gen5)
    expect(sequence.map((entry) => entry.name)).toEqual(['Shauntal', 'Marshal', 'Grimsley', 'Caitlin', 'Campeão'])
    expect(sequence[4].team).toHaveLength(6)
  })

  it("Alder's team does not depend on which starter was picked (time fixo, achado da pesquisa)", () => {
    const teams = STARTER_IDS.map((id) => {
      const save = makeRegionSave({ regionId: 'unova', roster: [{ speciesId: id, level: 5, xp: 0 }] })
      return championTeam(unova, save, gen5)
    })
    expect(teams[0]).toBe(teams[1])
    expect(teams[1]).toBe(teams[2])
  })
})
