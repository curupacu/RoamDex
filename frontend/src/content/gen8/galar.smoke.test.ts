import { describe, expect, it } from 'vitest'
import { REGIONS } from '../regions'
import { makeRegionSave } from '../../engine/save.testUtils'
import { awardBadge, gymForLocation, resolveGym } from '../../systems/gyms/gymProgress'
import { canTravelTo, travelTo } from '../../systems/gyms/locations'
import { championTeam, eliteFourSequence } from '../../systems/gyms/champion'
import type { SpeciesEntry } from '../gen1/types'
import { STARTER_IDS } from './starters'
import gen8Data from '../../../public/data/gen8.json'

// End-to-end smoke test for the Galar content pass — same shape as
// content/gen5/unova.smoke.test.ts e content/gen6/kalos.smoke.test.ts, no
// browser available in this environment.
const galar = REGIONS.galar
const gen8 = gen8Data as SpeciesEntry[]

describe('Galar content is wired up in REGIONS', () => {
  it('ends in victory-road', () => {
    expect(galar.locations[galar.locations.length - 1].id).toBe('victory-road')
  })

  it('every wild encounter species exists in gen8.json', () => {
    const gen8Ids = new Set(gen8.map((entry) => entry.id))
    const missing = galar.locations
      .flatMap((location) => location.encounters)
      .map((encounter) => encounter.speciesId)
      .filter((id) => !gen8Ids.has(id))
    expect(missing).toEqual([])
  })

  it('every gym/Elite Four/champion team member exists in gen8.json (incluindo os 2 pares version-exclusive)', () => {
    const gen8Ids = new Set(gen8.map((entry) => entry.id))
    const teamIds = [
      ...galar.gyms.flatMap((gym) => gym.team.map((m) => m.speciesId)),
      ...galar.gyms.flatMap((gym) => Object.values(gym.teamByVersion ?? {}).flatMap((team) => team.map((m) => m.speciesId))),
      ...galar.eliteFour.flatMap((member) => member.team.map((m) => m.speciesId)),
      ...Object.values(galar.championTeamByStarter).flatMap((team) => team.map((m) => m.speciesId)),
    ]
    const missing = teamIds.filter((id) => !gen8Ids.has(id))
    expect(missing).toEqual([])
  })

  it('each of the 8 gyms hosts at a real location', () => {
    for (const gym of galar.gyms) {
      expect(galar.locations.some((loc) => loc.id === gym.locationId)).toBe(true)
    }
    expect(galar.gyms).toHaveLength(8)
  })

  it('unlockAt is monotonically non-decreasing across the whole route', () => {
    for (let i = 1; i < galar.locations.length; i++) {
      expect(galar.locations[i].unlockAt).toBeGreaterThanOrEqual(galar.locations[i - 1].unlockAt)
    }
  })
})

// Achado de pesquisa (docs/ROTAS-GALAR.md): 2 ginásios (Stow-on-Side e
// Circhester) têm 2 líderes version-exclusive de verdade (não dependem do
// inicial, diferente de Striaton em Unova) — decisão do dono do projeto:
// sorteado uma vez na criação do save (RegionSave.versionVariant) e fica
// fixo. resolveGym troca team/leaderName pelo lado sorteado.
describe('Stow-on-Side e Circhester resolvem o lado certo por versionVariant (Padrão novo)', () => {
  const stowOnSide = galar.gyms.find((gym) => gym.id === 'stow-on-side')!
  const circhester = galar.gyms.find((gym) => gym.id === 'circhester')!

  it('versionVariant "a" → Bea (Fighting) em Stow-on-Side, Gordie (Rock) em Circhester', () => {
    const save = { ...makeRegionSave({ regionId: 'galar' }), versionVariant: 'a' as const }
    const resolvedStow = resolveGym(galar, stowOnSide, save, gen8)
    const resolvedCirc = resolveGym(galar, circhester, save, gen8)
    expect(resolvedStow.leaderName).toBe('Bea')
    expect(resolvedStow.team.some((m) => m.speciesId === 68)).toBe(true) // Machamp
    expect(resolvedCirc.leaderName).toBe('Gordie')
    expect(resolvedCirc.team.some((m) => m.speciesId === 839)).toBe(true) // Coalossal
  })

  it('versionVariant "b" → Allister (Ghost) em Stow-on-Side, Melony (Ice) em Circhester', () => {
    const save = { ...makeRegionSave({ regionId: 'galar' }), versionVariant: 'b' as const }
    const resolvedStow = resolveGym(galar, stowOnSide, save, gen8)
    const resolvedCirc = resolveGym(galar, circhester, save, gen8)
    expect(resolvedStow.leaderName).toBe('Allister')
    expect(resolvedStow.team.some((m) => m.speciesId === 94)).toBe(true) // Gengar
    expect(resolvedCirc.leaderName).toBe('Melony')
    expect(resolvedCirc.team.some((m) => m.speciesId === 131)).toBe(true) // Lapras
  })

  it('id/badgeName/locationId ficam iguais nos dois lados (é o mesmo ginásio, só o oponente muda)', () => {
    const save = { ...makeRegionSave({ regionId: 'galar' }), versionVariant: 'a' as const }
    const resolved = resolveGym(galar, stowOnSide, save, gen8)
    expect(resolved.id).toBe('stow-on-side')
    expect(resolved.badgeName).toBe(stowOnSide.badgeName)
    expect(resolved.locationId).toBe(stowOnSide.locationId)
  })

  it('é um no-op pros outros 6 ginásios (sem teamByVersion)', () => {
    const milo = galar.gyms.find((gym) => gym.id === 'milo')!
    const save = { ...makeRegionSave({ regionId: 'galar' }), versionVariant: 'a' as const }
    expect(resolveGym(galar, milo, save, gen8)).toBe(milo)
  })
})

describe('a full Galar playthrough can walk every location', () => {
  it('travels from postwick to victory-road, earning each badge along the way', () => {
    let save = makeRegionSave({ regionId: 'galar', currentLocationId: 'postwick', lifetimeCandies: 0 })

    for (let i = 1; i < galar.locations.length; i++) {
      const target = galar.locations[i]
      save = { ...save, lifetimeCandies: target.unlockAt }
      expect(canTravelTo(galar, save, target.id)).toBe(true)
      save = travelTo(galar, save, target.id)
      expect(save.currentLocationId).toBe(target.id)

      const gymHere = gymForLocation(galar.gyms, target.id)
      if (gymHere) save = awardBadge(save, gymHere.id)
    }

    expect(save.currentLocationId).toBe('victory-road')
    expect(save.badges).toHaveLength(8)
  })

  it('blocks reaching victory-road if the last gym (Raihan) was skipped', () => {
    const save = makeRegionSave({
      regionId: 'galar',
      currentLocationId: 'hammerlocke-gym',
      lifetimeCandies: 1_000_000,
      badges: ['milo', 'nessa', 'kabu', 'stow-on-side', 'opal', 'circhester', 'piers'], // no 'raihan'
    })
    expect(canTravelTo(galar, save, 'victory-road')).toBe(false)
  })
})

describe('Champion Cup + Campeão sequence', () => {
  it('has Marnie, Hop, Raihan, Bede and a fixed Campeão at the end', () => {
    const save = makeRegionSave({ regionId: 'galar', roster: [{ speciesId: STARTER_IDS[1], level: 5, xp: 0 }] })
    const sequence = eliteFourSequence(galar, save, gen8)
    expect(sequence.map((entry) => entry.name)).toEqual(['Marnie', 'Hop', 'Raihan', 'Bede', 'Campeão'])
    expect(sequence[4].team).toHaveLength(6)
  })

  it("Leon's team depends on which starter was picked (achado da pesquisa: contra-ataque de tipo)", () => {
    const teams = STARTER_IDS.map((id) => {
      const save = makeRegionSave({ regionId: 'galar', roster: [{ speciesId: id, level: 5, xp: 0 }] })
      return championTeam(galar, save, gen8)
    })
    expect(teams[0]).not.toBe(teams[1])
    expect(teams[1]).not.toBe(teams[2])
  })
})
