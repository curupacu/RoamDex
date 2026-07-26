import type { SpeciesEntry } from '../../content/gen1/types'
import type { RegionSave } from '../../engine/save'
import { isInActiveTeam, MAX_TEAM_SIZE } from '../../systems/team/roster'
import { TypeBadge } from '../components/TypeBadge'

interface TeamScreenProps {
  gen1: SpeciesEntry[]
  region: RegionSave
  onToggle: (speciesId: number) => void
}

export function TeamScreen({ gen1, region, onToggle }: TeamScreenProps) {
  return (
    <div className="team-screen">
      <h2>
        Time ({region.activeTeamIds.length}/{MAX_TEAM_SIZE})
      </h2>
      <ul className="roster-list">
        {region.roster.map((member) => {
          const entry = gen1.find((candidate) => candidate.id === member.speciesId)
          if (!entry) return null
          const active = isInActiveTeam(region, member.speciesId)

          return (
            <li key={member.speciesId}>
              <button className={`roster-entry${active ? ' roster-entry--active' : ''}`} onClick={() => onToggle(member.speciesId)}>
                <img src={entry.sprite.local} alt={entry.name} />
                <span>
                  {entry.name} Nv.{member.level}
                  {entry.types.map((type) => (
                    <TypeBadge key={type} type={type} />
                  ))}
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
