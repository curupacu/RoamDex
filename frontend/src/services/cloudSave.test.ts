import { describe, expect, it } from 'vitest'
import { resolveSync } from './cloudSave'
import type { SaveData } from '../engine/save'

function makeSave(candies: number, lastSavedAt: number): SaveData {
  return { version: 1, candies, lastSavedAt }
}

describe('resolveSync', () => {
  it('uses local when there is no cloud save yet', () => {
    const local = makeSave(10, 1_000)
    expect(resolveSync(local, null)).toEqual({ kind: 'use-local' })
  })

  it('uses local when local is newer within the threshold', () => {
    const local = makeSave(10, 10_000)
    const cloud = makeSave(5, 9_500)
    expect(resolveSync(local, cloud)).toEqual({ kind: 'use-local' })
  })

  it('uses cloud when cloud is newer within the threshold', () => {
    const local = makeSave(10, 9_500)
    const cloud = makeSave(15, 10_000)
    expect(resolveSync(local, cloud)).toEqual({ kind: 'use-cloud', cloud })
  })

  it('flags a conflict when timestamps diverge beyond the threshold', () => {
    const local = makeSave(10, 200_000)
    const cloud = makeSave(15, 10_000)
    expect(resolveSync(local, cloud)).toEqual({ kind: 'conflict', local, cloud })
  })
})
