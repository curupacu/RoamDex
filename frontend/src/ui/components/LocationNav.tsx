import type { GymDefinition } from '../../content/gen1/gyms'
import type { LocationDefinition } from '../../content/gen1/locations'
import type { SpeciesEntry } from '../../content/gen1/types'
import { formatBigNumber } from '../../engine/numberFormat'
import { EncounterRatesButton } from './EncounterRatesButton'

interface LocationNavProps {
  location: LocationDefinition
  prevLocation: LocationDefinition | null
  nextLocation: LocationDefinition | null
  lifetimeCandies: number
  onTravel: (locationId: string) => void
  gym: GymDefinition | null
  hasBadge: boolean
  onChallengeGym: () => void
  // Location-only gate (victory-road) — App.tsx trusts canTravelTo's badge
  // chain as the single source of truth for "can the player even be here",
  // same trust model as `gym` above. See systems/gyms/locations.ts.
  eliteFourAvailable: boolean
  onChallengeEliteFour: () => void
  gen1: SpeciesEntry[]
}

export function LocationNav({
  location,
  prevLocation,
  nextLocation,
  lifetimeCandies,
  onTravel,
  gym,
  hasBadge,
  onChallengeGym,
  eliteFourAvailable,
  onChallengeEliteFour,
  gen1,
}: LocationNavProps) {
  const nextLocked = nextLocation !== null && lifetimeCandies < nextLocation.unlockAt

  return (
    <div className="location-nav">
      <EncounterRatesButton location={location} gen1={gen1} />
      <div className="location-nav-row">
        <button disabled={!prevLocation} onClick={() => prevLocation && onTravel(prevLocation.id)}>
          ← {prevLocation ? prevLocation.name : ''}
        </button>
        <h2>{location.name}</h2>
        <button disabled={!nextLocation || nextLocked} onClick={() => nextLocation && onTravel(nextLocation.id)}>
          {nextLocation ? `${nextLocation.name} →` : '—'}
        </button>
      </div>

      {nextLocked && nextLocation && (
        <p className="location-locked-hint">
          Precisa de {formatBigNumber(nextLocation.unlockAt)} doces acumulados pra ir pra {nextLocation.name}
        </p>
      )}

      {gym && (
        <button className="location-gym-button" onClick={onChallengeGym}>
          {hasBadge ? `${gym.leaderName} derrotado ✓` : `Desafiar ${gym.leaderName}`}
        </button>
      )}

      {eliteFourAvailable && (
        <button className="location-gym-button" onClick={onChallengeEliteFour}>
          Desafiar a Elite Four
        </button>
      )}
    </div>
  )
}
