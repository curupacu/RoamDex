import { KANTO_LOCATIONS, type LocationDefinition } from '../../content/gen1/locations'
import type { SaveData } from '../../engine/save'

export function locationIndex(id: string): number {
  return KANTO_LOCATIONS.findIndex((location) => location.id === id)
}

// Falls back to the first location for an unknown/corrupt id instead of
// throwing — same defensive spirit as save.ts's own migrations.
export function locationById(id: string): LocationDefinition {
  const index = locationIndex(id)
  return index === -1 ? KANTO_LOCATIONS[0] : KANTO_LOCATIONS[index]
}

export function prevLocationOf(id: string): LocationDefinition | null {
  const index = locationIndex(id)
  return index > 0 ? KANTO_LOCATIONS[index - 1] : null
}

export function nextLocationOf(id: string): LocationDefinition | null {
  const index = locationIndex(id)
  return index !== -1 && index < KANTO_LOCATIONS.length - 1 ? KANTO_LOCATIONS[index + 1] : null
}

// Only one step at a time — going back is always free, going forward needs
// the lifetime-candy gate. No teleporting/skipping: the project owner's
// call to keep the region a single line instead of a real (tangled) map.
export function canTravelTo(save: SaveData, targetId: string): boolean {
  const currentIndex = locationIndex(save.currentLocationId)
  const targetIndex = locationIndex(targetId)
  if (currentIndex === -1 || targetIndex === -1) return false
  if (targetIndex === currentIndex - 1) return true
  if (targetIndex === currentIndex + 1) return save.lifetimeCandies >= KANTO_LOCATIONS[targetIndex].unlockAt
  return false
}

export function travelTo(save: SaveData, targetId: string): SaveData {
  if (!canTravelTo(save, targetId)) return save
  return { ...save, currentLocationId: targetId }
}
