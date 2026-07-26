import { createDefaultSave, emptyRegionSave, withRegion, type RegionSave, type SaveData } from './save'

// Shared fixture builder so a save-version bump only needs new defaults
// here, instead of touching every *.test.ts that constructs a SaveData.
export function makeSave(overrides: Partial<SaveData> = {}): SaveData {
  return { ...createDefaultSave(), lastSavedAt: 0, ...overrides }
}

// Most system functions operate on a single region's slice (RegionSave) now,
// not the whole account-level SaveData — this is the region-scoped
// equivalent of makeSave, defaulting to a fresh Kanto slot.
export function makeRegionSave(overrides: Partial<RegionSave> = {}): RegionSave {
  return { ...emptyRegionSave('kanto', 'pallet-town'), ...overrides }
}

// For the few tests exercising the full account-level SaveData (rebirth
// across regions, migrations) with a specific region's contents. Also
// makes that region the active one (currentRegionId) — createDefaultSave()
// no longer assumes 'kanto' is active by default (a brand-new account
// starts at the region-select menu instead), so tests that need an active
// region have to say so explicitly, same as production code does.
export function makeSaveWithRegion(overrides: Partial<RegionSave> = {}): SaveData {
  const region = makeRegionSave(overrides)
  return { ...withRegion(makeSave(), region), currentRegionId: region.regionId }
}
