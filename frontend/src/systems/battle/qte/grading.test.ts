import { describe, expect, it } from 'vitest'
import { gradeByCount, gradeByOffset, gradeByZone } from './grading'

describe('gradeByZone', () => {
  it('is full inside the full zone', () => {
    expect(gradeByZone(70, [60, 90], [40, 100])).toBe('full')
  })

  it('is partial inside the partial zone but outside the full zone', () => {
    expect(gradeByZone(45, [60, 90], [40, 100])).toBe('partial')
  })

  it('is weak outside both zones', () => {
    expect(gradeByZone(10, [60, 90], [40, 100])).toBe('weak')
  })
})

describe('gradeByCount', () => {
  it('is full at or above the full threshold', () => {
    expect(gradeByCount(15, 15, 8)).toBe('full')
    expect(gradeByCount(20, 15, 8)).toBe('full')
  })

  it('is partial between the two thresholds', () => {
    expect(gradeByCount(8, 15, 8)).toBe('partial')
  })

  it('is weak below the partial threshold', () => {
    expect(gradeByCount(3, 15, 8)).toBe('weak')
  })
})

describe('gradeByOffset', () => {
  it('is full within the full window', () => {
    expect(gradeByOffset(50, 120, 250)).toBe('full')
  })

  it('is partial within the partial window', () => {
    expect(gradeByOffset(200, 120, 250)).toBe('partial')
  })

  it('is weak beyond the partial window', () => {
    expect(gradeByOffset(400, 120, 250)).toBe('weak')
  })
})
