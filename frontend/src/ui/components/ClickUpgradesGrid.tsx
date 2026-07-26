import type { RegionSave } from '../../engine/save'
import type { RegionDefinition } from '../../content/regions'
import { formatBigNumber } from '../../engine/numberFormat'
import { isUnlocked, nextLocked, ownedCount, upgradeCost } from '../../systems/economy/upgrades'
import { UpgradeIcon } from './UpgradeIcon'

interface ClickUpgradesGridProps {
  regionDef: RegionDefinition
  region: RegionSave
  onBuy: (id: string) => void
  costMultiplier?: number
}

// Small square icon buttons in the corner of the click stage — separate
// from the CPS "Store" list (UpgradesPanel), matching the split in the
// reference screenshot the project owner brought (docs/decisoes/0028-*.md).
// Title (native tooltip) carries name/cost/effect since there's no room for
// text in a 32px square.
export function ClickUpgradesGrid({ regionDef, region, onBuy, costMultiplier = 1 }: ClickUpgradesGridProps) {
  const clickDefs = regionDef.upgrades.filter((def) => def.kind === 'click')
  const visible = clickDefs.filter((def) => isUnlocked(def, region))
  const upcoming = nextLocked(clickDefs, region)
  if (visible.length === 0 && !upcoming) return null

  return (
    <div className="click-upgrades-grid">
      {visible.map((def) => {
        const owned = ownedCount(region, def.id)
        const cost = upgradeCost(def, owned, costMultiplier)
        const soldOut = def.maxPurchases !== undefined && owned >= def.maxPurchases
        const effectLabel =
          def.scalesWith === 'rosterSize'
            ? `+${def.effect} doces/clique por Pokémon capturado`
            : `+${def.effect} doces/clique`
        const title = soldOut
          ? `${def.name} (comprado) — ${effectLabel}${def.flavor ? ` — "${def.flavor}"` : ''}`
          : `${def.name} — ${formatBigNumber(cost)} doces — ${effectLabel}${def.flavor ? ` — "${def.flavor}"` : ''}`

        return (
          <button
            key={def.id}
            className="click-upgrade-square"
            title={title}
            onClick={() => onBuy(def.id)}
            disabled={soldOut || region.candies < cost}
          >
            <UpgradeIcon id={def.id} alt={def.name} />
            {!soldOut && <span className="click-upgrade-cost">{formatBigNumber(cost)}</span>}
            {def.maxPurchases === 1 && soldOut && <span className="click-upgrade-badge click-upgrade-badge--done">✓</span>}
            {def.maxPurchases === undefined && owned > 0 && <span className="click-upgrade-badge">{owned}</span>}
          </button>
        )
      })}
      {upcoming && (
        <button
          className="click-upgrade-square click-upgrade-square--locked"
          title={`??? — desbloqueia com ${formatBigNumber(upcoming.unlockAt)} doces acumulados`}
          disabled
        >
          <span className="click-upgrade-locked-mark">?</span>
        </button>
      )}
    </div>
  )
}
