import { useEffect, useRef, useState } from 'react'
import type { RegionSave } from '../../engine/save'
import type { RegionDefinition } from '../../content/regions'
import { formatBigNumber } from '../../engine/numberFormat'
import { isUnlocked, nextLocked, ownedCount, upgradeCost } from '../../systems/economy/upgrades'
import type { UpgradeDefinition } from '../../content/gen1/upgrades'
import { UpgradeIcon } from './UpgradeIcon'

interface UpgradesPanelProps {
  regionDef: RegionDefinition
  region: RegionSave
  onBuy: (id: string) => void
  costMultiplier?: number
}

// "Store" list — the CPS/XP generators (docs/decisoes/0028-*.md). Click
// upgrades live in the separate ClickUpgradesGrid corner instead, same
// split the reference screenshot the project owner brought shows (buildings
// list vs. a compact icon row).
export function UpgradesPanel({ regionDef, region, onBuy, costMultiplier = 1 }: UpgradesPanelProps) {
  const storeDefs = regionDef.upgrades.filter((def) => def.kind !== 'click')
  const visible = storeDefs.filter((def) => isUnlocked(def, region))
  const upcoming = nextLocked(storeDefs, region)
  if (visible.length === 0 && !upcoming) return null

  return (
    <aside className="upgrades-panel">
      <h2>Upgrades</h2>
      <ul>
        {visible.map((def) => (
          <UpgradeRow key={def.id} def={def} region={region} onBuy={onBuy} costMultiplier={costMultiplier} />
        ))}
        {upcoming && (
          <li>
            <button disabled className="upgrade-row upgrade-locked-row">
              <span className="upgrade-icon upgrade-icon--locked">
                <span className="upgrade-locked-mark">?</span>
              </span>
              <span className="upgrade-info">
                <strong>???</strong>
                <span className="upgrade-cost">Desbloqueia com {formatBigNumber(upcoming.unlockAt)} doces acumulados</span>
              </span>
            </button>
          </li>
        )}
      </ul>
    </aside>
  )
}

function tickAmount(def: UpgradeDefinition, region: RegionSave): number {
  return def.scalesWith === 'rosterSize' ? def.effect * region.roster.length : def.effect
}

function UpgradeRow({
  def,
  region,
  onBuy,
  costMultiplier,
}: {
  def: UpgradeDefinition
  region: RegionSave
  onBuy: (id: string) => void
  costMultiplier: number
}) {
  const owned = ownedCount(region, def.id)
  const cost = upgradeCost(def, owned, costMultiplier)
  const amount = tickAmount(def, region)
  const effectLabel =
    def.scalesWith === 'rosterSize'
      ? `+${def.effect} doces/s por Pokémon capturado`
      : def.kind === 'cps'
        ? `+${def.effect} doces/s`
        : `+${def.effect} XP/s pro time`
  const soldOut = def.maxPurchases !== undefined && owned >= def.maxPurchases

  // Small idle-life flourish: once owned, this row periodically pops its
  // own +N, same float-and-fade as the click area's candy-pop, so an owned
  // generator visibly "does something" instead of just sitting in a list.
  // Purely cosmetic — the real CPS math lives in systems/economy/upgrades.
  const [pops, setPops] = useState<{ id: number }[]>([])
  const nextPopId = useRef(0)

  useEffect(() => {
    if (owned === 0 || def.kind !== 'cps') return
    const interval = setInterval(() => {
      const id = nextPopId.current++
      setPops((current) => [...current, { id }])
      setTimeout(() => setPops((current) => current.filter((pop) => pop.id !== id)), 900)
    }, 2_500)
    return () => clearInterval(interval)
  }, [owned, def.kind])

  const affordable = !soldOut && region.candies >= cost
  const title = soldOut
    ? `${def.name} (comprado) — ${effectLabel}${def.flavor ? ` — "${def.flavor}"` : ''}`
    : `${def.name} — ${effectLabel}${def.flavor ? ` — "${def.flavor}"` : ''}`

  return (
    <li>
      <button className="upgrade-row" onClick={() => onBuy(def.id)} disabled={soldOut || !affordable} title={title}>
        <span className="upgrade-icon">
          <UpgradeIcon id={def.id} alt="" />
          {pops.map((pop) => (
            <span key={pop.id} className="upgrade-pop">
              +{formatBigNumber(amount)}
            </span>
          ))}
        </span>
        <span className="upgrade-info">
          <strong>
            {def.name} {def.maxPurchases === 1 ? (soldOut ? '(comprado)' : '') : `(${owned})`}
          </strong>
          <span className="upgrade-cost">{!soldOut && `${formatBigNumber(cost)} doces`}</span>
        </span>
      </button>
    </li>
  )
}
