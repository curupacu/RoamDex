import { createDefaultSave, type SaveData } from './save'

// Shared fixture builder so a save-version bump only needs new defaults
// here, instead of touching every *.test.ts that constructs a SaveData.
export function makeSave(overrides: Partial<SaveData> = {}): SaveData {
  return { ...createDefaultSave(), lastSavedAt: 0, ...overrides }
}
