import type { Gen1Entry } from '../../content/gen1/types'
import type { SaveData } from '../../engine/save'

interface VictoryRoadScreenProps {
  gen1: Gen1Entry[]
  save: SaveData
}

const REGION_LABELS: Record<string, string> = { kanto: 'Kanto' }

// Read-only hall of fame (roadmap section 1: "por enquanto, somente-leitura")
// — one entry per region beaten, snapshotting the team at the moment of
// victory. Nothing here is clickable yet; raids (Fase 6) are what eventually
// reads these snapshots back into a battle.
export function VictoryRoadScreen({ gen1, save }: VictoryRoadScreenProps) {
  if (save.victoryRoad.length === 0) {
    return (
      <div className="victory-road-screen">
        <h2>Victory Road</h2>
        <p>Ainda ninguém venceu uma Elite Four por aqui.</p>
      </div>
    )
  }

  return (
    <div className="victory-road-screen">
      <h2>Victory Road</h2>
      <ul className="victory-road-list">
        {save.victoryRoad.map((entry, index) => (
          <li key={`${entry.region}-${entry.completedAt}-${index}`}>
            <h3>
              {REGION_LABELS[entry.region] ?? entry.region} — {new Date(entry.completedAt).toLocaleDateString()}
            </h3>
            <ul className="victory-road-team">
              {entry.team.map((member) => {
                const speciesEntry = gen1.find((candidate) => candidate.id === member.speciesId)
                if (!speciesEntry) return null
                return (
                  <li key={member.speciesId}>
                    <img src={speciesEntry.sprite.local} alt={speciesEntry.name} />
                    <span>
                      {speciesEntry.name} Nv.{member.level}
                    </span>
                  </li>
                )
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
