import { XP_BOOST_COST, XP_BOOST_DURATION_MS, XP_BOOST_ID, XP_BOOST_MULTIPLIER } from '../../content/shop'
import { POKEBALLS } from '../../content/pokeballs'
import type { SpeciesEntry } from '../../content/gen1/types'
import { formatBigNumber } from '../../engine/numberFormat'
import { formatDuration } from '../../engine/offlineProgress'
import type { RegionSave } from '../../engine/save'
import { isBuffActive, rareCandyCost } from '../../systems/economy/candyShop'
import { ballCount } from '../../systems/capture/pokeballs'
import { UpgradeCard } from '../components/UpgradeCard'

interface CandyShopScreenProps {
  gen1: SpeciesEntry[]
  region: RegionSave
  now: number
  onBuyRareCandy: (speciesId: number) => void
  onBuyXpBoost: () => void
  onBuyPokeball: (id: string) => void
}

export function CandyShopScreen({ gen1, region, now, onBuyRareCandy, onBuyXpBoost, onBuyPokeball }: CandyShopScreenProps) {
  const boostActive = isBuffActive(region, XP_BOOST_ID, now)
  const boostRemaining = region.buffs[XP_BOOST_ID] ? region.buffs[XP_BOOST_ID] - now : 0

  return (
    <div className="candy-shop-screen">
      <h2>Loja de Doces</h2>

      <div className="pokemon-detail">
        <h3>Reforço de treino</h3>
        <p>
          {XP_BOOST_MULTIPLIER}x de XP por 10 min. {boostActive && `Ativo por mais ${formatDuration(boostRemaining)}.`}
        </p>
        <UpgradeCard
          name="Reforço de treino"
          effectLabel={`Dobra o XP ganho pelo time por ${formatDuration(XP_BOOST_DURATION_MS)}.`}
          flavor="Comprar de novo enquanto já está ativo estende o tempo restante, não reinicia."
        >
          <button onClick={onBuyXpBoost} disabled={region.candies < XP_BOOST_COST}>
            Comprar — {formatBigNumber(XP_BOOST_COST)} doces
          </button>
        </UpgradeCard>
      </div>

      <h3>Pokébolas</h3>
      <ul className="roster-list">
        {POKEBALLS.filter((def) => def.cost !== undefined).map((def) => {
          const cost = def.cost ?? 0
          const owned = ballCount(region, def.id)

          return (
            <li key={def.id}>
              <UpgradeCard
                name={def.name}
                effectLabel={`Chance de captura x${def.catchMultiplier}.`}
                flavor="Consumida a cada arremesso, acerte ou erre — só a Pokébola normal é infinita."
              >
                <button className="roster-entry" onClick={() => onBuyPokeball(def.id)} disabled={region.candies < cost}>
                  <span>
                    {def.name} ({owned})
                  </span>
                  <span>{formatBigNumber(cost)} doces</span>
                </button>
              </UpgradeCard>
            </li>
          )
        })}
      </ul>

      <h3>Rare Candy</h3>
      <ul className="roster-list">
        {region.roster.map((member) => {
          const entry = gen1.find((candidate) => candidate.id === member.speciesId)
          if (!entry) return null
          const cost = rareCandyCost(member.level)

          return (
            <li key={member.speciesId}>
              <UpgradeCard
                name={`Rare Candy — ${entry.name}`}
                effectLabel={`Sobe ${entry.name} do Nv.${member.level} pro Nv.${member.level + 1} na hora.`}
                flavor={`${formatBigNumber(cost)} doces.`}
              >
                <button className="roster-entry" onClick={() => onBuyRareCandy(member.speciesId)} disabled={region.candies < cost}>
                  <img src={entry.sprite.local} alt={entry.name} />
                  <span>
                    {entry.name} Nv.{member.level}
                  </span>
                  <span>{formatBigNumber(cost)} doces</span>
                </button>
              </UpgradeCard>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
