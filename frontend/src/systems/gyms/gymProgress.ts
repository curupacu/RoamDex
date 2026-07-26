import type { GymDefinition } from '../../content/gen1/gyms'
import type { RegionSave } from '../../engine/save'

export function gymForLocation(gyms: GymDefinition[], locationId: string): GymDefinition | null {
  return gyms.find((gym) => gym.locationId === locationId) ?? null
}

export function hasBadge(save: RegionSave, gymId: string): boolean {
  return save.badges.includes(gymId)
}

export function awardBadge(save: RegionSave, gymId: string): RegionSave {
  if (hasBadge(save, gymId)) return save
  return { ...save, badges: [...save.badges, gymId] }
}
