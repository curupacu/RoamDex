import type { RosterMember, SaveData } from '../../engine/save'

export const MAX_TEAM_SIZE = 6

export function isCaptured(save: SaveData, speciesId: number): boolean {
  return save.roster.some((member) => member.speciesId === speciesId)
}

export function rosterMember(save: SaveData, speciesId: number): RosterMember | null {
  return save.roster.find((member) => member.speciesId === speciesId) ?? null
}

export function isInActiveTeam(save: SaveData, speciesId: number): boolean {
  return save.activeTeamIds.includes(speciesId)
}

export function addToRoster(save: SaveData, speciesId: number, level: number): SaveData {
  if (isCaptured(save, speciesId)) return save

  const roster = [...save.roster, { speciesId, level }]
  const activeTeamIds =
    save.activeTeamIds.length < MAX_TEAM_SIZE ? [...save.activeTeamIds, speciesId] : save.activeTeamIds

  return { ...save, roster, activeTeamIds }
}

// No-op if speciesId isn't captured, or adding it would exceed MAX_TEAM_SIZE
// — the caller (UI) decides what to do about a full team, this just refuses
// to silently swap someone out.
export function toggleActiveTeamMember(save: SaveData, speciesId: number): SaveData {
  if (!isCaptured(save, speciesId)) return save

  if (isInActiveTeam(save, speciesId)) {
    return { ...save, activeTeamIds: save.activeTeamIds.filter((id) => id !== speciesId) }
  }

  if (save.activeTeamIds.length >= MAX_TEAM_SIZE) return save
  return { ...save, activeTeamIds: [...save.activeTeamIds, speciesId] }
}
