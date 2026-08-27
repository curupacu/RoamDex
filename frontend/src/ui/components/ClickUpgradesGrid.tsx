import type { RegionSave } from '../../engine/save'
import type { RegionDefinition } from '../../content/regions'
import type { TypeName } from '../../content/types'
import { formatBigNumber } from '../../engine/numberFormat'
import { isUnlocked, nextLocked, ownedCount, upgradeCost } from '../../systems/economy/upgrades'
import { upgradeEarned } from '../../systems/economy/upgradeEarnings'
import { lockedHint } from './lockedHint'
import { UpgradeCard } from './UpgradeCard'
import { UpgradeIcon } from './UpgradeIcon'
import { upgradeEffectLabel } from './upgradeEffectLabel'

interface ClickUpgradesGridProps {
  regionDef: RegionDefinition
  region: RegionSave
  activeTypes?: TypeName[]
  onBuy: (id: string) => void
  costMultiplier?: number
}

// Small square icon buttons — agora é QUALQUER upgrade de compra única
// (maxPurchases definido), não só 'kind: click' — feedback:
// os itens do Padrão 5 (buildingBoost) e os multiplicadores globais têm
// que ficar aqui, junto dos quadradinhos, não na lista de prédios
// (UpgradesPanel). A lista fica só pra prédio de verdade (compra
// repetida, sem maxPurchases) — mesma separação buildings/upgrades do
// Cookie Clicker real. UpgradeCard (hover card) carries name/cost/effect/
// earned since there's no room for text in a small square.
export function ClickUpgradesGrid({ regionDef, region, activeTypes = [], onBuy, costMultiplier = 1 }: ClickUpgradesGridProps) {
  const oneTimeDefs = regionDef.upgrades.filter((def) => def.maxPurchases !== undefined)
  const visible = oneTimeDefs.filter((def) => isUnlocked(def, region, activeTypes))
  const upcoming = nextLocked(oneTimeDefs, region, activeTypes)
  if (visible.length === 0 && !upcoming) return null

  return (
    <div className="click-upgrades-grid">
      {visible.map((def) => {
        const owned = ownedCount(region, def.id)
        const cost = upgradeCost(def, owned, costMultiplier)
        const soldOut = def.maxPurchases !== undefined && owned >= def.maxPurchases
        const effectLabel = upgradeEffectLabel(regionDef, def)
        // globalMultiplier/buildingBoost não acumulam "já rendeu" próprio
        // (multiplicam o resto, não produzem nada sozinhos) — mesma regra
        // de UpgradesPanel.tsx's UpgradeRow.
        const earnedLabel =
          def.kind === 'globalMultiplier' || def.kind === 'buildingBoost'
            ? undefined
            : `Já rendeu ${formatBigNumber(upgradeEarned(region, def.id))} ${def.kind === 'xp' ? 'XP' : 'doces'}`

        return (
          <UpgradeCard
            key={def.id}
            name={def.name}
            effectLabel={soldOut ? `${effectLabel} (comprado)` : `${effectLabel} — ${formatBigNumber(cost)} doces`}
            flavor={def.flavor}
            earnedLabel={earnedLabel}
            className="upgrade-hover-wrap--below"
          >
            <button className="click-upgrade-square" onClick={() => onBuy(def.id)} disabled={soldOut || region.candies < cost}>
              <UpgradeIcon id={def.id} alt={def.name} />
              {!soldOut && <span className="click-upgrade-cost">{formatBigNumber(cost)}</span>}
              {def.maxPurchases === 1 && soldOut && <span className="click-upgrade-badge click-upgrade-badge--done">✓</span>}
              {def.maxPurchases === undefined && owned > 0 && <span className="click-upgrade-badge">{owned}</span>}
            </button>
          </UpgradeCard>
        )
      })}
      {upcoming && (
        <button
          className="click-upgrade-square click-upgrade-square--locked"
          title={`??? — ${lockedHint(upcoming, regionDef, region)}`}
          disabled
        >
          <span className="click-upgrade-locked-mark">?</span>
        </button>
      )}
    </div>
  )
}
