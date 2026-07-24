import { STARTER_IDS } from '../../content/gen1/starters'
import type { Gen1Entry } from '../../content/gen1/types'

interface NewGameScreenProps {
  gen1: Gen1Entry[]
  onChoose: (speciesId: number) => void
}

export function NewGameScreen({ gen1, onChoose }: NewGameScreenProps) {
  const starters = STARTER_IDS.map((id) => gen1.find((entry) => entry.id === id)).filter(
    (entry): entry is Gen1Entry => entry !== undefined,
  )

  return (
    <div className="new-game-screen">
      <h2>Escolha seu inicial</h2>
      <div className="starter-choices">
        {starters.map((starter) => (
          <button key={starter.id} className="starter-choice" onClick={() => onChoose(starter.id)}>
            <img src={starter.sprite.local} alt={starter.name} />
            <span>{starter.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
