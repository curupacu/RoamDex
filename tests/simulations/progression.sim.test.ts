import { describe, it } from 'vitest'
import { REGIONS } from '../../frontend/src/content/regions'
import { BATTLE_XP_ACTIVE_BONUS_PER_ENEMY_LEVEL, BATTLE_XP_PER_ENEMY_LEVEL } from '../../frontend/src/content/battle'
import { formatHours, simulateProgression } from './progressionSim'

const FIFTY_HOURS = 50 * 3600
const PRODUCTION_BATTLE_XP = { perLevelTeam: BATTLE_XP_PER_ENEMY_LEVEL, perLevelActiveBonus: BATTLE_XP_ACTIVE_BONUS_PER_ENEMY_LEVEL }

function report(regionName: string, regionDef: (typeof REGIONS)['kanto'], includeIdleXp: boolean) {
  const result = simulateProgression(regionDef, {
    clicksPerSecond: 2,
    durationSeconds: FIFTY_HOURS,
    battleXp: PRODUCTION_BATTLE_XP,
    includeIdleXp,
  })
  console.log(`\n=== ${regionName} — idleXp=${includeIdleXp} (valores reais de produção) ===`)
  for (const gym of result.gyms) {
    console.log(
      `${gym.leaderName.padEnd(12)} nívelMédio=${String(gym.averageTeamLevel).padStart(3)}  doce=${formatHours(gym.candyGateSeconds).padStart(8)}  nível-pronto=${formatHours(gym.levelReadySeconds).padStart(8)}  LIBERADO=${formatHours(gym.clearedAtSeconds).padStart(8)}`,
    )
  }
  console.log(
    `Elite Four  nívelMédio=${result.eliteFourAverageLevel}  LIBERADO=${formatHours(result.eliteFourClearedAtSeconds)}  (nível final em 50h: ${result.finalLevel})`,
  )
}

describe('progressão — valores de produção (Sprint 25)', () => {
  it('Kanto, com XP idle (Treinamento) + batalha', () => {
    report('KANTO com idle', REGIONS.kanto, true)
  })

  it('Kanto, SÓ batalha (Treinamento nunca comprado)', () => {
    report('KANTO só batalha', REGIONS.kanto, false)
  })

  it('Johto, com XP idle (Treinamento) + batalha', () => {
    report('JOHTO com idle', REGIONS.johto, true)
  })

  it('Johto, SÓ batalha (Treinamento nunca comprado)', () => {
    report('JOHTO só batalha', REGIONS.johto, false)
  })

  it('Hoenn, com XP idle (Treinamento) + batalha', () => {
    report('HOENN com idle', REGIONS.hoenn, true)
  })

  it('Hoenn, SÓ batalha (Treinamento nunca comprado)', () => {
    report('HOENN só batalha', REGIONS.hoenn, false)
  })

  it('Sinnoh, com XP idle (Treinamento) + batalha', () => {
    report('SINNOH com idle', REGIONS.sinnoh, true)
  })

  it('Sinnoh, SÓ batalha (Treinamento nunca comprado)', () => {
    report('SINNOH só batalha', REGIONS.sinnoh, false)
  })

  it('Kalos, com XP idle (Treinamento) + batalha', () => {
    report('KALOS com idle', REGIONS.kalos, true)
  })

  it('Kalos, SÓ batalha (Treinamento nunca comprado)', () => {
    report('KALOS só batalha', REGIONS.kalos, false)
  })

  it('Unova, com XP idle (Treinamento) + batalha', () => {
    report('UNOVA com idle', REGIONS.unova, true)
  })

  it('Unova, SÓ batalha (Treinamento nunca comprado)', () => {
    report('UNOVA só batalha', REGIONS.unova, false)
  })

  it('Galar, com XP idle (Treinamento) + batalha', () => {
    report('GALAR com idle', REGIONS.galar, true)
  })

  it('Galar, SÓ batalha (Treinamento nunca comprado)', () => {
    report('GALAR só batalha', REGIONS.galar, false)
  })

  it('Alola, com XP idle (Treinamento) + batalha', () => {
    report('ALOLA com idle', REGIONS.alola, true)
  })

  it('Alola, SÓ batalha (Treinamento nunca comprado)', () => {
    report('ALOLA só batalha', REGIONS.alola, false)
  })

  it('Paldea, com XP idle (Treinamento) + batalha', () => {
    report('PALDEA com idle', REGIONS.paldea, true)
  })

  it('Paldea, SÓ batalha (Treinamento nunca comprado)', () => {
    report('PALDEA só batalha', REGIONS.paldea, false)
  })
})
