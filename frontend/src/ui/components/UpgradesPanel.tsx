import type { RegionSave } from '../../engine/save'
import type { RegionDefinition } from '../../content/regions'
import { formatBigNumber } from '../../engine/numberFormat'
import { isUnlocked, ownedCount, upgradeCost } from '../../systems/economy/upgrades'

interface UpgradesPanelProps {
  regionDef: RegionDefinition
  region: RegionSave
  onBuy: (id: string) => void
  costMultiplier?: number
}

export function UpgradesPanel({ regionDef, region, onBuy, costMultiplier = 1 }: UpgradesPanelProps) {
  const visible = regionDef.upgrades.filter((def) => isUnlocked(def, region))
  if (visible.length === 0) return null

  return (
    <aside className="upgrades-panel">
      <h2>Upgrades</h2>
      <ul>
        {visible.map((def) => {
          const owned = ownedCount(region, def.id)
          const cost = upgradeCost(def, owned, costMultiplier)
          const effectLabel =
            def.kind === 'click'
              ? `+${def.effect} doces por clique`
              : def.kind === 'cps'
                ? `+${def.effect} doces/s`
                : `+${def.effect} XP/s pro time`

          return (
            <li key={def.id}>
              <button onClick={() => onBuy(def.id)} disabled={region.candies < cost}>
                {def.name} ({owned}) — {formatBigNumber(cost)} doces
                <br />
                {effectLabel}
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
