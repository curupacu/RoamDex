import { UPGRADES } from '../../content/gen1/upgrades'
import type { SaveData } from '../../engine/save'
import { formatBigNumber } from '../../engine/numberFormat'
import { isUnlocked, ownedCount, upgradeCost } from '../../systems/economy/upgrades'

interface UpgradesPanelProps {
  save: SaveData
  onBuy: (id: string) => void
}

export function UpgradesPanel({ save, onBuy }: UpgradesPanelProps) {
  const visible = UPGRADES.filter((def) => isUnlocked(def, save))
  if (visible.length === 0) return null

  return (
    <aside className="upgrades-panel">
      <h2>Upgrades</h2>
      <ul>
        {visible.map((def) => {
          const owned = ownedCount(save, def.id)
          const cost = upgradeCost(def, owned)
          const effectLabel = def.kind === 'click' ? `+${def.effect} por clique` : `+${def.effect}/s`

          return (
            <li key={def.id}>
              <button onClick={() => onBuy(def.id)} disabled={save.candies < cost}>
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
