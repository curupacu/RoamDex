import { useEffect, useRef, useState } from 'react'
import type { RegionSave } from '../../engine/save'
import type { RegionDefinition } from '../../content/regions'
import type { TypeName } from '../../content/types'
import { formatBigNumber } from '../../engine/numberFormat'
import { isUnlocked, nextLocked, ownedCount, upgradeCost } from '../../systems/economy/upgrades'
import { upgradeEarned } from '../../systems/economy/upgradeEarnings'
import type { UpgradeDefinition } from '../../content/gen1/upgrades'
import { lockedHint } from './lockedHint'
import { UpgradeCard } from './UpgradeCard'
import { UpgradeIcon } from './UpgradeIcon'

interface UpgradesPanelProps {
  regionDef: RegionDefinition
  region: RegionSave
  activeTypes?: TypeName[]
  onBuy: (id: string) => void
  costMultiplier?: number
}

// "Store" list — the CPS/XP generators (docs/decisoes/0028-*.md), plus the
// Padrão 3/4 upgrades (sinergia/marco global) which aren't 'click' either.
// Click upgrades live in the separate ClickUpgradesGrid corner instead, same
// split the reference screenshot the project owner brought shows (buildings
// list vs. a compact icon row).
export function UpgradesPanel({ regionDef, region, activeTypes = [], onBuy, costMultiplier = 1 }: UpgradesPanelProps) {
  const storeDefs = regionDef.upgrades.filter((def) => def.kind !== 'click')
  const visible = storeDefs.filter((def) => isUnlocked(def, region, activeTypes))
  const upcoming = nextLocked(storeDefs, region, activeTypes)
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
                <span className="upgrade-cost">
                  {lockedHint(upcoming, regionDef, region).replace(/^./, (c) => c.toUpperCase())}
                </span>
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
        : def.kind === 'globalMultiplier'
          ? `+${(def.effect * 100).toFixed(0)}% em doces/clique e doces/s, permanente`
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
  const earnedUnit = def.kind === 'xp' ? 'XP' : 'doces'
  // globalMultiplier (Padrão 4) não passa por contributionsByKind — nunca
  // acumula "já rendeu" próprio, é um multiplicador em cima do resto.
  const earnedLabel =
    def.kind === 'globalMultiplier' ? undefined : `Já rendeu ${formatBigNumber(upgradeEarned(region, def.id))} ${earnedUnit}`

  return (
    <li>
      <UpgradeCard
        name={def.name}
        effectLabel={soldOut ? `${effectLabel} (comprado)` : effectLabel}
        flavor={def.flavor}
        earnedLabel={earnedLabel}
      >
        <button className="upgrade-row" onClick={() => onBuy(def.id)} disabled={soldOut || !affordable}>
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
      </UpgradeCard>
    </li>
  )
}
