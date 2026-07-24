import { XP_BOOST_COST, XP_BOOST_ID, XP_BOOST_MULTIPLIER } from '../../content/shop'
import type { Gen1Entry } from '../../content/gen1/types'
import { formatBigNumber } from '../../engine/numberFormat'
import { formatDuration } from '../../engine/offlineProgress'
import type { SaveData } from '../../engine/save'
import { isBuffActive, rareCandyCost } from '../../systems/economy/candyShop'

interface CandyShopScreenProps {
  gen1: Gen1Entry[]
  save: SaveData
  now: number
  onBuyRareCandy: (speciesId: number) => void
  onBuyXpBoost: () => void
}

export function CandyShopScreen({ gen1, save, now, onBuyRareCandy, onBuyXpBoost }: CandyShopScreenProps) {
  const boostActive = isBuffActive(save, XP_BOOST_ID, now)
  const boostRemaining = save.buffs[XP_BOOST_ID] ? save.buffs[XP_BOOST_ID] - now : 0

  return (
    <div className="candy-shop-screen">
      <h2>Loja de Doces</h2>

      <div className="pokemon-detail">
        <h3>Reforço de treino</h3>
        <p>
          {XP_BOOST_MULTIPLIER}x de XP por 10 min. {boostActive && `Ativo por mais ${formatDuration(boostRemaining)}.`}
        </p>
        <button onClick={onBuyXpBoost} disabled={save.candies < XP_BOOST_COST}>
          Comprar — {formatBigNumber(XP_BOOST_COST)} doces
        </button>
      </div>

      <h3>Rare Candy</h3>
      <ul className="roster-list">
        {save.roster.map((member) => {
          const entry = gen1.find((candidate) => candidate.id === member.speciesId)
          if (!entry) return null
          const cost = rareCandyCost(member.level)

          return (
            <li key={member.speciesId}>
              <button className="roster-entry" onClick={() => onBuyRareCandy(member.speciesId)} disabled={save.candies < cost}>
                <img src={entry.sprite.local} alt={entry.name} />
                <span>
                  {entry.name} Nv.{member.level}
                </span>
                <span>{formatBigNumber(cost)} doces</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
