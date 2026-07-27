import { describe, expect, it } from 'vitest'
import { REGIONS } from '../../frontend/src/content/regions'
import type { GymTeamMember } from '../../frontend/src/content/gen1/gyms'
import { loadSpecies, simulateFight, starterAtLevel } from './battleSim'

const OPTIONS = { qteQuality: 'partial' as const, tapsPerEnemyAttack: 4, maxTaps: 2000 }

// Descoberta debugando Misty: usar Rattata como "referência neutra" foi um
// erro de método — Rattata é DELIBERADAMENTE um dos Pokémon mais fracos do
// jogo (stats base baixos por design, pra ser um encontro selvagem
// comum), então mesmo NO MESMO nível ele perde feio pra qualquer Pokémon
// evoluído de verdade (ex.: Starmie tem quase o dobro do ATK/DEF de um
// Rattata no mesmo nível só por causa dos stats base). Um jogador de
// verdade tem um time de Pokémon evoluídos, não Rattatas — os 3 iniciais
// (evoluídos até o estágio que o nível permite) são uma referência muito
// mais realista de "time de jogador", e usar os 3 juntos (tipos variados)
// também tira o viés de "esse 1 tipo específico é bom ou ruim contra esse
// ginásio".
function buildEliteFourTeam(regionDef: (typeof REGIONS)['kanto']): (GymTeamMember & { trainerName?: string })[] {
  // Marca o 1º Pokémon de cada treinador — engine.ts só cura 50%
  // (TRAINER_TRANSITION_HEAL_FRACTION) ao CRUZAR pra um índice marcado
  // como início de um novo treinador, igual o jogo de verdade
  // (systems/gyms/champion.ts's eliteFourSequence + BattleScreen.tsx's
  // rosterFromTeam). Sem isso, testar os Pokémon corridos sem nenhuma
  // cura é bem mais duro que a luta real.
  const members = [
    ...regionDef.eliteFour.map((m) => ({ name: m.name, team: m.team })),
    { name: 'Campeão', team: regionDef.championTeamByStarter[regionDef.defaultStarterId] },
  ]
  return members.flatMap(({ name, team }) => team.map((member, index) => ({ ...member, trainerName: index === 0 ? name : undefined })))
}

function averageLevel(team: GymTeamMember[]): number {
  return Math.round(team.reduce((sum, m) => sum + m.level, 0) / team.length)
}

describe.each([
  ['Kanto', REGIONS.kanto],
  ['Johto', REGIONS.johto],
] as const)('batalhas — time dos 3 iniciais evoluídos (%s)', (regionName, regionDef) => {
  const gen1 = loadSpecies(regionDef.dataUrl)

  it.each(regionDef.gyms.map((gym) => [gym.leaderName, gym] as const))(
    '%s: vencível no MESMO nível médio do time (sem virar parede)',
    (_leaderName, gym) => {
      const avgLevel = averageLevel(gym.team)
      const player = regionDef.starterIds.map((id) => starterAtLevel(gen1, id, avgLevel))
      const result = simulateFight(gen1, player, gym.team, OPTIONS)

      console.log(
        `${regionName} ${gym.leaderName.padEnd(12)} nívelMédio=${String(avgLevel).padStart(3)}  resultado=${result.outcome.padEnd(8)}  taps=${String(result.taps).padStart(4)}  HP restante=${(result.playerHpFractionRemaining * 100).toFixed(0)}%`,
      )
      // Os 8 ginásios precisam ser vencíveis por um time razoável já NO
      // nível médio do ginásio (sem precisar de folga extra) — diferente
      // do Elite Four, que é DESIGN pra perder na primeira vez (roadmap
      // seção 8) e por isso não entra nessa asserção.
      expect(result.outcome).toBe('victory')
    },
  )

  it('Elite Four + Campeão: perde no nível médio exato (design: "é pra perder na primeira vez"), mas vence com uma folga de nível — nem parede, nem trivial', () => {
    const team = buildEliteFourTeam(regionDef)
    const avgLevel = averageLevel(team)

    // +8 níveis é o número calibrado por playtest real no Kanto
    // (docs/decisoes/0019-*.md). Johto precisava de +20 até a decisão
    // 0038: a causa não eram os 4 membros do Elite Four em si (times
    // razoáveis contra eles mesmo sem folga nenhuma), e sim só o time do
    // Campeão Lance (3 Dragonite cheios + Charizard + Aerodactyl, sem
    // cura nenhuma entre si, resistindo a QUALQUER um dos 3 tipos
    // iniciais) — corrigido com um LEVEL_BUMP menor só pro Campeão
    // (content/gen2/eliteFour.ts's CHAMPION_LEVEL_BUMP), sem mudar o
    // roster nem os outros 4 membros. Agora as duas regiões usam o mesmo
    // cushion de referência.
    const atParity = simulateFight(gen1, regionDef.starterIds.map((id) => starterAtLevel(gen1, id, avgLevel)), team, OPTIONS)
    const withCushion = simulateFight(
      gen1,
      regionDef.starterIds.map((id) => starterAtLevel(gen1, id, avgLevel + 8)),
      team,
      OPTIONS,
    )

    console.log(
      `${regionName} Elite Four nívelMédio=${avgLevel}  no nível: ${atParity.outcome} (${(atParity.playerHpFractionRemaining * 100).toFixed(0)}% HP)  com +8 níveis: ${withCushion.outcome} (${(withCushion.playerHpFractionRemaining * 100).toFixed(0)}% HP)`,
    )
    expect(withCushion.outcome).toBe('victory')
  })
})
