import type { LocationDefinition } from '../../content/gen1/locations'
import type { RegionSave } from '../../engine/save'
import type { RegionDefinition } from '../../content/regions'
import { gymForLocation, hasBadge } from './gymProgress'

export function locationIndex(region: RegionDefinition, id: string): number {
  return region.locations.findIndex((location) => location.id === id)
}

// Falls back to the first location for an unknown/corrupt id instead of
// throwing — same defensive spirit as save.ts's own migrations.
export function locationById(region: RegionDefinition, id: string): LocationDefinition {
  const index = locationIndex(region, id)
  return index === -1 ? region.locations[0] : region.locations[index]
}

export function prevLocationOf(region: RegionDefinition, id: string): LocationDefinition | null {
  const index = locationIndex(region, id)
  return index > 0 ? region.locations[index - 1] : null
}

export function nextLocationOf(region: RegionDefinition, id: string): LocationDefinition | null {
  const index = locationIndex(region, id)
  return index !== -1 && index < region.locations.length - 1 ? region.locations[index + 1] : null
}

// Only one step at a time — going back is always free, going forward needs
// the lifetime-candy gate. No teleporting/skipping: the project owner's
// call to keep the region a single line instead of a real (tangled) map.
// Forward also requires the current location's own gym badge (if it hosts
// one) — otherwise the candy gate alone let players walk past an unbeaten
// gym straight to the next town.
export function canTravelTo(region: RegionDefinition, save: RegionSave, targetId: string): boolean {
  const currentIndex = locationIndex(region, save.currentLocationId)
  const targetIndex = locationIndex(region, targetId)
  if (currentIndex === -1 || targetIndex === -1) return false
  if (targetIndex === currentIndex - 1) return true
  if (targetIndex === currentIndex + 1) {
    if (save.lifetimeCandies < region.locations[targetIndex].unlockAt) return false
    const currentGym = gymForLocation(region.gyms, save.currentLocationId)
    return !currentGym || hasBadge(save, currentGym.id)
  }
  return false
}

export function travelTo(region: RegionDefinition, save: RegionSave, targetId: string): RegionSave {
  if (!canTravelTo(region, save, targetId)) return save
  return { ...save, currentLocationId: targetId }
}
