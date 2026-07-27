import { describe, expect, it } from 'vitest'
import { REGIONS } from '../../frontend/src/content/regions'
import { upgradeCost } from '../../frontend/src/systems/economy/upgrades'

// Sprint 25 — achado depois de conversar com o dono do projeto sobre os
// upgrades "lendários" (Fúria do Ho-Oh/Mewtwo, Fábrica do Lugia/Zapdos):
// nenhuma das simulações anteriores (economySim/progressionSim) simula
// captura de verdade, então um upgrade que escala com `roster.length`
// nunca aparecia como problema ali — precisava de uma checagem própria,
// olhando efeito-por-doce-gasto de cada upgrade isoladamente.
function roiOf(def: (typeof REGIONS)['kanto']['upgrades'][number]): number {
  return def.effect / upgradeCost(def, 0, 1)
}

describe.each([
  ['Kanto', REGIONS.kanto],
  ['Johto', REGIONS.johto],
] as const)('efeito por doce gasto (%s)', (regionName, regionDef) => {
  it('upgrades "lendários" (escalam com roster) precisam de um roster realista pra valer a pena', () => {
    const legendaryClick = regionDef.upgrades.find((d) => d.scalesWith === 'rosterSize' && d.kind === 'click')!
    const legendaryCps = regionDef.upgrades.find((d) => d.scalesWith === 'rosterSize' && d.kind === 'cps')!
    const previousClickTier = regionDef.upgrades.find((d) => d.kind === 'click' && d.unlockAt === 40_000)!
    const previousCpsTier = regionDef.upgrades.find((d) => d.kind === 'cps' && d.unlockAt === 40_000)!

    const rosterForClick = (roiOf(previousClickTier) * upgradeCost(legendaryClick, 0, 1)) / legendaryClick.effect
    const rosterForCps = (roiOf(previousCpsTier) * upgradeCost(legendaryCps, 0, 1)) / legendaryCps.effect

    console.log(
      `${regionName}: "${legendaryClick.name}" precisa de ${rosterForClick.toFixed(1)} Pokémon no roster pra empatar com "${previousClickTier.name}"; "${legendaryCps.name}" precisa de ${rosterForCps.toFixed(1)} pra empatar com "${previousCpsTier.name}".`,
    )
    // 40 Pokémon capturados é um roster generoso mas plausível numa run
    // (bem menos que o dex inteiro) — achado original (efeito=8/1.2) dava
    // 131, exigindo praticamente o dex inteiro só pra EMPATAR com o tier
    // anterior, o que não é realista.
    expect(rosterForClick).toBeLessThan(40)
    expect(rosterForCps).toBeLessThan(40)
  })

  it('o gap entre clique e CPS na mesma posição de tier fica dentro de uma faixa razoável (nem CPS inútil, nem clique irrelevante)', () => {
    const clickDefs = regionDef.upgrades.filter((d) => d.kind === 'click' && d.scalesWith === undefined)
    const cpsDefs = regionDef.upgrades.filter((d) => d.kind === 'cps' && d.scalesWith === undefined)

    // Emparelha por posição (1º upgrade infinito de clique vs 1º de cps,
    // 2º vs 2º, ...) — mesma ordem de tier em que aparecem no array.
    for (let i = 0; i < Math.min(clickDefs.length, cpsDefs.length); i++) {
      const ratio = roiOf(clickDefs[i]) / roiOf(cpsDefs[i])
      console.log(`${regionName}: ${clickDefs[i].name} / ${cpsDefs[i].name} -> clique rende ${ratio.toFixed(1)}x mais por doce que CPS`)
      // Era ~15x antes do ajuste (clique dominava completamente) — CPS só
      // "ganhava" por render offline/sem esforço, o que não aparece nessa
      // conta. Um gap de até ~6x deixa clique claramente melhor pra quem
      // joga ativo, sem fazer CPS parecer desperdício de doce.
      expect(ratio).toBeLessThan(6)
    }
  })
})
