import { describe, it } from 'vitest'
import { captureChance } from '../../frontend/src/systems/capture/capture'
import { POKEBALLS } from '../../frontend/src/content/pokeballs'

describe('chance de captura — diagnóstico', () => {
  it('tabela: captureRate x bola x bônus de time (Fada)', () => {
    const captureRates = [
      { label: 'comum (255, ex. Rattata)', rate: 255 },
      { label: 'comum baixo (150)', rate: 150 },
      { label: 'incomum (100)', rate: 100 },
      { label: 'incomum baixo (50)', rate: 50 },
      { label: 'raro (45, ex. Bulbasaur)', rate: 45 },
      { label: 'raro baixo (10)', rate: 10 },
      { label: 'raríssimo (3, ex. lendário)', rate: 3 },
    ]
    const teamBonuses = [
      { label: 'sem Fada', mult: 1 },
      { label: '1 Fada (+2%)', mult: 1.02 },
      { label: '3 Fada (+6%)', mult: 1.06 },
    ]

    for (const { label, rate } of captureRates) {
      console.log(`\n=== captureRate=${rate} (${label}) ===`)
      for (const ball of POKEBALLS) {
        for (const team of teamBonuses) {
          const chance = captureChance(rate, ball.catchMultiplier * team.mult)
          console.log(`  ${ball.name.padEnd(12)} x${team.label.padEnd(14)} -> ${(chance * 100).toFixed(1)}%`)
        }
      }
    }
  })
})
