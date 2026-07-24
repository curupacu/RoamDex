import { describe, expect, it } from 'vitest'
import { makeSave } from '../../engine/save.testUtils'
import { addToRoster, isCaptured, isInActiveTeam, MAX_TEAM_SIZE, toggleActiveTeamMember } from './roster'

describe('addToRoster', () => {
  it('adds a new species to the roster and to the active team', () => {
    const result = addToRoster(makeSave(), 1, 5)
    expect(isCaptured(result, 1)).toBe(true)
    expect(isInActiveTeam(result, 1)).toBe(true)
  })

  it('does not duplicate an already-captured species', () => {
    const withOne = addToRoster(makeSave(), 1, 5)
    const result = addToRoster(withOne, 1, 5)
    expect(result.roster).toHaveLength(1)
  })

  it('does not auto-add to the active team once it is full', () => {
    let save = makeSave()
    for (let id = 1; id <= MAX_TEAM_SIZE; id++) save = addToRoster(save, id, 5)

    const result = addToRoster(save, 999, 5)
    expect(isCaptured(result, 999)).toBe(true)
    expect(isInActiveTeam(result, 999)).toBe(false)
    expect(result.activeTeamIds).toHaveLength(MAX_TEAM_SIZE)
  })
})

describe('toggleActiveTeamMember', () => {
  it('removes a species from the active team if it is already there', () => {
    const save = addToRoster(makeSave(), 1, 5)
    const result = toggleActiveTeamMember(save, 1)
    expect(isInActiveTeam(result, 1)).toBe(false)
  })

  it('adds a captured species back to the active team', () => {
    const save = toggleActiveTeamMember(addToRoster(makeSave(), 1, 5), 1)
    const result = toggleActiveTeamMember(save, 1)
    expect(isInActiveTeam(result, 1)).toBe(true)
  })

  it('is a no-op for a species that was never captured', () => {
    const save = makeSave()
    expect(toggleActiveTeamMember(save, 1)).toEqual(save)
  })

  it('refuses to add past MAX_TEAM_SIZE instead of swapping anyone out', () => {
    let save = makeSave()
    for (let id = 1; id <= MAX_TEAM_SIZE; id++) save = addToRoster(save, id, 5)
    save = addToRoster(save, 999, 5) // captured but benched, per the test above

    const result = toggleActiveTeamMember(save, 999)
    expect(result).toEqual(save)
  })
})
