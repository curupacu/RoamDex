import type { GymDefinition } from '../../content/gen1/gyms'
import type { RegionSave } from '../../engine/save'
import type { RegionDefinition } from '../../content/regions'
import type { SpeciesEntry } from '../../content/gen1/types'
import { currentStarterRoot } from './champion'

export function gymForLocation(gyms: GymDefinition[], locationId: string): GymDefinition | null {
  return gyms.find((gym) => gym.locationId === locationId) ?? null
}

// Ginásio de Unova (Striaton) tem 3 líderes por trás do mesmo `id`/local —
// esta função troca leaderName/team pelo par certo (ver GymDefinition's
// teamByStarter/leaderNameByStarter) antes de qualquer tela ou batalha
// mostrar o ginásio. Ginásios de Galar (Bea/Allister, Gordie/Melony) usam o
// mesmo mecanismo, só que chaveado por RegionSave.versionVariant em vez do
// inicial (ver GymDefinition's teamByVersion/leaderNameByVersion). Sem
// nenhum dos dois campos (todas as outras regiões), é um no-op — devolve
// `gym` como veio.
export function resolveGym(region: RegionDefinition, gym: GymDefinition, save: RegionSave, gen1: SpeciesEntry[]): GymDefinition {
  if (gym.teamByVersion) {
    return {
      ...gym,
      team: gym.teamByVersion[save.versionVariant],
      leaderName: gym.leaderNameByVersion?.[save.versionVariant] ?? gym.leaderName,
    }
  }
  if (!gym.teamByStarter) return gym
  const rootId = currentStarterRoot(region, save, gen1) ?? region.defaultStarterId
  return {
    ...gym,
    team: gym.teamByStarter[rootId] ?? gym.team,
    leaderName: gym.leaderNameByStarter?.[rootId] ?? gym.leaderName,
  }
}

export function hasBadge(save: RegionSave, gymId: string): boolean {
  return save.badges.includes(gymId)
}

export function awardBadge(save: RegionSave, gymId: string): RegionSave {
  if (hasBadge(save, gymId)) return save
  return { ...save, badges: [...save.badges, gymId] }
}
