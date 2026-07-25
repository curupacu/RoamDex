import type { GymDefinition } from '../../content/gen1/gyms'
import type { LocationDefinition } from '../../content/gen1/locations'
import { formatBigNumber } from '../../engine/numberFormat'

interface LocationNavProps {
  location: LocationDefinition
  prevLocation: LocationDefinition | null
  nextLocation: LocationDefinition | null
  lifetimeCandies: number
  onTravel: (locationId: string) => void
  gym: GymDefinition | null
  hasBadge: boolean
  onChallengeGym: () => void
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
}: LocationNavProps) {
  const nextLocked = nextLocation !== null && lifetimeCandies < nextLocation.unlockAt

  return (
    <div className="location-nav">
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
    </div>
  )
}
