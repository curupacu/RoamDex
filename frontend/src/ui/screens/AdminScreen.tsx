import { useState } from 'react'
import type { Gen1Entry } from '../../content/gen1/types'
import type { SaveData } from '../../engine/save'

// Temporary dev-only screen for manual testing (add Pokémon of any type
// without waiting for real capture, force a wild encounter instantly,
// pad candies, jump levels). Not part of any roadmap sprint — remove
// once there's a real way to reach this content in-game.
interface AdminScreenProps {
  gen1: Gen1Entry[]
  save: SaveData
  onAddCandies: (amount: number) => void
  onAddToRoster: (speciesId: number, level: number) => void
  onForceEncounter: (speciesId: number, level: number) => void
  onSetActiveLevel: (level: number) => void
  // The "Batalha" nav tab was removed from normal play (battles only
  // happen via real wild encounters now) — this is the only way left to
  // reach the Sprint 13 fixed test dummy for manual testing.
  onBattleTestDummy: () => void
}

export function AdminScreen({
  gen1,
  save,
  onAddCandies,
  onAddToRoster,
  onForceEncounter,
  onSetActiveLevel,
  onBattleTestDummy,
}: AdminScreenProps) {
  const [selectedSpeciesId, setSelectedSpeciesId] = useState(gen1[0]?.id ?? 1)
  const [level, setLevel] = useState(20)
  const [activeLevel, setActiveLevel] = useState(20)

  return (
    <div className="admin-screen">
      <h2>Admin (temporário)</h2>
      <p className="qte-count">Só pra teste — não é feature do jogo.</p>

      <div className="pokemon-detail">
        <h3>Doces</h3>
        <button onClick={() => onAddCandies(100_000)}>+ 100.000 doces</button>
      </div>

      <div className="pokemon-detail">
        <h3>Time / espécie</h3>
        <select value={selectedSpeciesId} onChange={(event) => setSelectedSpeciesId(Number(event.target.value))}>
          {gen1.map((entry) => (
            <option key={entry.id} value={entry.id}>
              #{entry.id} {entry.name} ({entry.types.join('/')})
            </option>
          ))}
        </select>
        <br />
        <label>
          Nível: <input type="number" min={1} max={100} value={level} onChange={(event) => setLevel(Number(event.target.value))} />
        </label>
        <br />
        <button onClick={() => onAddToRoster(selectedSpeciesId, level)}>Adicionar ao time</button>
        <button onClick={() => onForceEncounter(selectedSpeciesId, level)}>Forçar encontro selvagem com essa espécie/nível</button>
      </div>

      <div className="pokemon-detail">
        <h3>Nível do ativo</h3>
        <label>
          <input type="number" min={1} max={100} value={activeLevel} onChange={(event) => setActiveLevel(Number(event.target.value))} />
        </label>
        <button onClick={() => onSetActiveLevel(activeLevel)}>Definir nível do Pokémon ativo</button>
      </div>

      <div className="pokemon-detail">
        <h3>Batalha de teste</h3>
        <button onClick={onBattleTestDummy}>Batalhar contra o Rattata de teste (Sprint 13)</button>
      </div>

      <div className="pokemon-detail">
        <h3>Roster atual</h3>
        <ul>
          {save.roster.map((member) => (
            <li key={member.speciesId}>
              #{member.speciesId} Nv.{member.level} ({Math.floor(member.xp)} XP)
              {save.activeTeamIds.includes(member.speciesId) ? ' — no time' : ' — no banco'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
