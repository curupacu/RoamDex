import { GYMS, type GymDefinition } from '../../content/gen1/gyms'
import type { SaveData } from '../../engine/save'

export function gymForLocation(locationId: string): GymDefinition | null {
  return GYMS.find((gym) => gym.locationId === locationId) ?? null
}

export function hasBadge(save: SaveData, gymId: string): boolean {
  return save.badges.includes(gymId)
}

export function awardBadge(save: SaveData, gymId: string): SaveData {
  if (hasBadge(save, gymId)) return save
  return { ...save, badges: [...save.badges, gymId] }
}
