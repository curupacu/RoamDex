import type { RegionDefinition } from '../../content/regions'
import type { UpgradeDefinition } from '../../content/gen1/upgrades'

// Frase de efeito legível pro hover card — compartilhada entre o grid de
// upgrades de compra única (ClickUpgradesGrid) e a loja de prédios
// repetíveis (UpgradesPanel), já que os dois agora podem mostrar qualquer
// `kind` de upgrade (feedback: os itens do Padrão 5/buildingBoost e os
// multiplicadores globais têm que ficar juntos dos quadradinhos, não na
// lista — só prédio de verdade, compra repetida, fica na lista).
export function upgradeEffectLabel(regionDef: RegionDefinition, def: UpgradeDefinition): string {
  if (def.kind === 'buildingBoost') {
    const boostedBuildingName = def.boostsBuilding
      ? (regionDef.upgrades.find((candidate) => candidate.id === def.boostsBuilding)?.name ?? def.boostsBuilding)
      : undefined
    return `+${(def.effect * 100).toFixed(0)}% na produção de ${boostedBuildingName}, permanente`
  }
  if (def.kind === 'globalMultiplier') return `+${(def.effect * 100).toFixed(0)}% em doces/clique e doces/s, permanente`
  if (def.scalesWith === 'rosterSize') {
    return def.kind === 'click' ? `+${def.effect} doces/clique por Pokémon capturado` : `+${def.effect} doces/s por Pokémon capturado`
  }
  if (def.kind === 'cps') return `+${def.effect} doces/s`
  if (def.kind === 'xp') return `+${def.effect} XP/s pro time`
  return `+${def.effect} doces/clique`
}
