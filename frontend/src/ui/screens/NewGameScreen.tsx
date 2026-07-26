import type { SpeciesEntry } from '../../content/gen1/types'
import type { RegionDefinition } from '../../content/regions'
import { TypeBadge } from '../components/TypeBadge'

interface NewGameScreenProps {
  regionDef: RegionDefinition
  gen1: SpeciesEntry[]
  onChoose: (speciesId: number) => void
}

export function NewGameScreen({ regionDef, gen1, onChoose }: NewGameScreenProps) {
  const starters = regionDef.starterIds.map((id) => gen1.find((entry) => entry.id === id)).filter(
    (entry): entry is SpeciesEntry => entry !== undefined,
  )

  return (
    <div className="new-game-screen">
      <h2>Escolha seu inicial</h2>
      <div className="starter-choices">
        {starters.map((starter) => (
          <button key={starter.id} className="starter-choice" onClick={() => onChoose(starter.id)}>
            <img src={starter.sprite.local} alt={starter.name} />
            <span>{starter.name}</span>
            <span>
              {starter.types.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
