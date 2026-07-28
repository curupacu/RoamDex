import { useState } from 'react'
import type { LocationDefinition } from '../../content/gen1/locations'
import type { SpeciesEntry } from '../../content/gen1/types'
import { encounterRates } from '../../systems/capture/encounterRates'

interface EncounterRatesButtonProps {
  location: LocationDefinition
  gen1: SpeciesEntry[]
}

// Small "%" toggle in the corner of the route panel — lists this location's
// wild encounter odds on demand, for every route that has any (towns/gyms
// have an empty encounters array and render nothing here).
export function EncounterRatesButton({ location, gen1 }: EncounterRatesButtonProps) {
  const [open, setOpen] = useState(false)

  if (location.encounters.length === 0) return null

  return (
    <div className="encounter-rates">
      <button
        type="button"
        className="encounter-rates-toggle"
        onClick={() => setOpen((current) => !current)}
        aria-label="Chances de encontro selvagem nesta rota"
      >
        %
      </button>
      {open && (
        <div className="encounter-rates-panel">
          <p className="encounter-rates-title">Chances em {location.name}</p>
          <ul>
            {encounterRates(location).map((rate) => {
              const entry = gen1.find((candidate) => candidate.id === rate.speciesId)
              return (
                <li key={rate.speciesId}>
                  {entry && <img src={entry.sprite.local} alt={entry.name} />}
                  <span className="encounter-rates-name">{entry?.name ?? `#${rate.speciesId}`}</span>
                  <span className="encounter-rates-percent">{rate.percent.toFixed(1)}%</span>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
