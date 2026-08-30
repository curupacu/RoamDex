import { RARE_CANDY_XP_FRACTION, XP_BOOST_ID } from '../../content/shop'
import { POKEBALLS } from '../../content/pokeballs'
import type { SpeciesEntry } from '../../content/gen1/types'
import type { RegionDefinition } from '../../content/regions'
import { formatBigNumber } from '../../engine/numberFormat'
import { formatDuration } from '../../engine/offlineProgress'
import type { RegionSave } from '../../engine/save'
import { bestXpBoostTier, isBuffActive, nextXpBoostTier, rareCandyCost } from '../../systems/economy/candyShop'
import { ballCount } from '../../systems/capture/pokeballs'
import { xpForNextLevel } from '../../systems/team/leveling'
import { UpgradeCard } from '../components/UpgradeCard'

interface CandyShopScreenProps {
  gen1: SpeciesEntry[]
  regionDef: RegionDefinition | null
  region: RegionSave
  now: number
  onBuyRareCandy: (speciesId: number) => void
  onBuyXpBoost: () => void
  onBuyPokeball: (id: string) => void
}

// Decisão 0053: mesma ideia do "??? — desbloqueia com X" que os grids de
// upgrade já usam (ui/components/lockedHint.ts), mas pro tier de Reforço
// (não é um UpgradeDefinition de região, então não dá pra reaproveitar
// aquela função direto).
function nextTierHint(regionDef: RegionDefinition | null, region: RegionSave): string {
  const next = nextXpBoostTier(region)
  if (!next) return ''
  if (region.lifetimeCandies < next.unlockAt) return `próximo tier: ${formatBigNumber(next.unlockAt)} doces acumulados`
  if (region.badges.length < next.requiresBadges) return `próximo tier: ${next.requiresBadges} insígnias de ginásio`
  if (next.requiresTrainingUpgradeId) {
    const name = regionDef?.upgrades.find((candidate) => candidate.id === next.requiresTrainingUpgradeId)?.name
    return `próximo tier: possuir ${name ?? 'o próximo upgrade de Treinamento'}`
  }
  return ''
}

export function CandyShopScreen({ gen1, regionDef, region, now, onBuyRareCandy, onBuyXpBoost, onBuyPokeball }: CandyShopScreenProps) {
  const boostActive = isBuffActive(region, XP_BOOST_ID, now)
  const boostRemaining = region.buffs[XP_BOOST_ID] ? region.buffs[XP_BOOST_ID] - now : 0
  const currentTier = bestXpBoostTier(region)
  const hint = nextTierHint(regionDef, region)

  return (
    <div className="candy-shop-screen">
      <h2>Loja de Doces</h2>

      <div className="pokemon-detail">
        <h3>Reforço de treino</h3>
        <p>
          {currentTier.multiplier}x de XP por {formatDuration(currentTier.durationMs)}.{' '}
          {boostActive && `Ativo por mais ${formatDuration(boostRemaining)}.`}
        </p>
        <UpgradeCard
          name="Reforço de treino"
          effectLabel={`${currentTier.multiplier}x o XP ganho pelo time por ${formatDuration(currentTier.durationMs)}.`}
          flavor={
            hint
              ? `Comprar de novo enquanto já está ativo estende o tempo restante, não reinicia. ${hint}.`
              : 'Comprar de novo enquanto já está ativo estende o tempo restante, não reinicia. Tier máximo já desbloqueado.'
          }
        >
          <button onClick={onBuyXpBoost} disabled={region.candies < currentTier.cost}>
            Comprar — {formatBigNumber(currentTier.cost)} doces
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
          const cost = rareCandyCost(member.level, region.badges.length)
          const xpGain = Math.round(xpForNextLevel(member.level) * RARE_CANDY_XP_FRACTION)

          return (
            <li key={member.speciesId}>
              <UpgradeCard
                name={`Rare Candy — ${entry.name}`}
                effectLabel={`+${formatBigNumber(xpGain)} XP pra ${entry.name} na hora (${Math.round(RARE_CANDY_XP_FRACTION * 100)}% do próximo nível).`}
                flavor={`${formatBigNumber(cost)} doces — mais barato com mais insígnias de ginásio.`}
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
