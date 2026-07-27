import { describe, it } from 'vitest'
import { xpForNextLevel } from '../../frontend/src/systems/team/leveling'

describe('curva de XP — diagnóstico', () => {
  it('XP total acumulado do nível 5 até vários marcos', () => {
    console.log('\n=== XP necessário (xpForNextLevel soma) a partir do nível 5 ===')
    let total = 0
    for (let level = 5; level <= 80; level++) {
      total += xpForNextLevel(level)
      if ([13, 20, 21, 27, 29, 39, 43, 45, 50, 55, 60, 65, 70, 75, 78, 80].includes(level + 1)) {
        console.log(`até nível ${level + 1}: XP total acumulado = ${Math.round(total).toLocaleString('pt-BR')}`)
      }
    }
  })
})
