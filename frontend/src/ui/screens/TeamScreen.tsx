import type { Gen1Entry } from '../../content/gen1/types'
import type { SaveData } from '../../engine/save'
import { isInActiveTeam, MAX_TEAM_SIZE } from '../../systems/team/roster'

interface TeamScreenProps {
  gen1: Gen1Entry[]
  save: SaveData
  onToggle: (speciesId: number) => void
}

export function TeamScreen({ gen1, save, onToggle }: TeamScreenProps) {
  return (
    <div className="team-screen">
      <h2>
        Time ({save.activeTeamIds.length}/{MAX_TEAM_SIZE})
      </h2>
      <ul className="roster-list">
        {save.roster.map((member) => {
          const entry = gen1.find((candidate) => candidate.id === member.speciesId)
          if (!entry) return null
          const active = isInActiveTeam(save, member.speciesId)

          return (
            <li key={member.speciesId}>
              <button className={`roster-entry${active ? ' roster-entry--active' : ''}`} onClick={() => onToggle(member.speciesId)}>
                <img src={entry.sprite.local} alt={entry.name} />
                <span>
                  {entry.name} Nv.{member.level}
                </span>
                <span>{active ? 'No time' : 'No banco'}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
