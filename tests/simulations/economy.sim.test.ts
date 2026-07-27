import { describe, it } from 'vitest'
import { REGIONS } from '../../frontend/src/content/regions'
import { formatHours, simulateEconomy } from './economySim'

const FIFTY_HOURS = 50 * 3600

describe('economia idle (Sprint 25) — diagnóstico', () => {
  it('Kanto, 100% idle (0 clique/s), até 50h', () => {
    const result = simulateEconomy(REGIONS.kanto, { clicksPerSecond: 0, durationSeconds: FIFTY_HOURS })
    console.log('\n=== KANTO — idle puro, 0 clique/s ===')
    for (const gate of result.gates) {
      console.log(`${gate.name.padEnd(24)} unlockAt=${String(gate.unlockAt).padStart(9)}  ->  ${formatHours(gate.reachedAtSeconds)}`)
    }
    console.log('doces acumulados finais:', Math.round(result.finalLifetimeCandies))
    console.log('upgrades:', result.upgradesOwned)
  })

  it('Johto, 100% idle (0 clique/s), até 50h', () => {
    const result = simulateEconomy(REGIONS.johto, { clicksPerSecond: 0, durationSeconds: FIFTY_HOURS })
    console.log('\n=== JOHTO — idle puro, 0 clique/s ===')
    for (const gate of result.gates) {
      console.log(`${gate.name.padEnd(28)} unlockAt=${String(gate.unlockAt).padStart(9)}  ->  ${formatHours(gate.reachedAtSeconds)}`)
    }
    console.log('doces acumulados finais:', Math.round(result.finalLifetimeCandies))
    console.log('upgrades:', result.upgradesOwned)
  })

  it('Kanto, jogador ativo (2 clique/s), até 50h', () => {
    const result = simulateEconomy(REGIONS.kanto, { clicksPerSecond: 2, durationSeconds: FIFTY_HOURS })
    console.log('\n=== KANTO — ativo, 2 clique/s ===')
    for (const gate of result.gates) {
      console.log(`${gate.name.padEnd(24)} unlockAt=${String(gate.unlockAt).padStart(9)}  ->  ${formatHours(gate.reachedAtSeconds)}`)
    }
    console.log('\ncheckpoints:')
    for (const cp of result.checkpoints) {
      console.log(`  t=${cp.second}s lifetimeCandies=${Math.round(cp.lifetimeCandies)} upgrades=${JSON.stringify(cp.upgradesOwned)}`)
    }
  })
})
