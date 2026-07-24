import { useState } from 'react'
import type { Gen1Entry } from '../../content/gen1/types'
import { TYPES, type TypeName } from '../../content/types'
import type { SaveData } from '../../engine/save'
import { isCaptured, rosterMember } from '../../systems/team/roster'
import { deriveStats } from '../../systems/team/stats'
import { TypeBadge } from '../components/TypeBadge'

interface PokedexScreenProps {
  gen1: Gen1Entry[]
  save: SaveData
}

type CapturedFilter = 'all' | 'captured' | 'not-captured'

export function PokedexScreen({ gen1, save }: PokedexScreenProps) {
  const [typeFilter, setTypeFilter] = useState<TypeName | 'all'>('all')
  const [capturedFilter, setCapturedFilter] = useState<CapturedFilter>('all')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const filtered = gen1.filter((entry) => {
    if (typeFilter !== 'all' && !entry.types.includes(typeFilter)) return false
    const captured = isCaptured(save, entry.id)
    if (capturedFilter === 'captured' && !captured) return false
    if (capturedFilter === 'not-captured' && captured) return false
    return true
  })

  const selected = selectedId !== null ? (gen1.find((entry) => entry.id === selectedId) ?? null) : null
  const selectedMember = selected ? rosterMember(save, selected.id) : null
  const selectedStats = selected && selectedMember ? deriveStats(selected, selectedMember.level) : null

  return (
    <div className="pokedex-screen">
      <h2>Pokédex</h2>
      <div className="pokedex-filters">
        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as TypeName | 'all')}>
          <option value="all">Todos os tipos</option>
          {TYPES.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <select value={capturedFilter} onChange={(event) => setCapturedFilter(event.target.value as CapturedFilter)}>
          <option value="all">Todos</option>
          <option value="captured">Capturados</option>
          <option value="not-captured">Não capturados</option>
        </select>
      </div>

      <div className="pokedex-grid">
        {filtered.map((entry) => {
          const captured = isCaptured(save, entry.id)
          return (
            <button
              key={entry.id}
              className={`pokedex-entry${captured ? '' : ' pokedex-entry--unknown'}`}
              onClick={() => captured && setSelectedId(entry.id)}
              disabled={!captured}
            >
              <img src={entry.sprite.local} alt={captured ? entry.name : '???'} />
              <span>{captured ? entry.name : '???'}</span>
            </button>
          )
        })}
      </div>

      {selected && selectedMember && selectedStats && (
        <div className="pokemon-detail">
          <button className="pokemon-detail-close" onClick={() => setSelectedId(null)}>
            Fechar
          </button>
          <h3>
            {selected.name} — Nv.{selectedMember.level}
          </h3>
          <p>
            {selected.types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </p>
          <ul>
            <li>HP: {selectedStats.hp}</li>
            <li>ATK: {selectedStats.atk}</li>
            <li>DEF: {selectedStats.def}</li>
            <li>Velocidade (base): {selected.stats.speed}</li>
          </ul>
        </div>
      )}
    </div>
  )
}
