import { REBIRTH_UPGRADES } from '../../content/rebirthShop'
import type { SaveData } from '../../engine/save'
import { isRebirthUpgradeMaxed, ownedRebirthLevel, rebirthUpgradeCost } from '../../systems/rebirth/rebirthShop'

interface RebirthShopScreenProps {
  save: SaveData
  onBuy: (id: string) => void
}

// Permanent upgrades bought with Insígnias (roadmap section 9) — always
// visible (no unlock gate like the run's Upgrades panel), since owning 0
// Insígnias is itself informative before the player's first rebirth.
export function RebirthShopScreen({ save, onBuy }: RebirthShopScreenProps) {
  return (
    <div className="rebirth-shop-screen">
      <h2>Loja de Rebirth</h2>
      <p className="qte-count">Insígnias: {save.insignias}</p>
      <ul className="rebirth-shop-list">
        {REBIRTH_UPGRADES.map((def) => {
          const owned = ownedRebirthLevel(save, def.id)
          const maxed = isRebirthUpgradeMaxed(def, save)
          const cost = rebirthUpgradeCost(def, owned)

          return (
            <li key={def.id}>
              <button onClick={() => onBuy(def.id)} disabled={maxed || save.insignias < cost}>
                {def.name} ({owned}{def.maxLevel !== undefined ? `/${def.maxLevel}` : ''})
                {!maxed && <> — {cost} Insígnias</>}
                <br />
                {def.description}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
