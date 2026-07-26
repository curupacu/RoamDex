import { REGION_ORDER, REGIONS, UPCOMING_REGIONS } from '../../content/regions'
import type { RegionId, SaveData } from '../../engine/save'

interface RegionSelectScreenProps {
  save: SaveData
  onSelect: (regionId: RegionId) => void
}

// Hub screen (referência Pokelike: cards de região com cadeado) — landing
// spot whenever save.currentRegionId is null, and reachable any time from
// the main nav's "Regiões" button to switch which region's run is active.
export function RegionSelectScreen({ save, onSelect }: RegionSelectScreenProps) {
  return (
    <div className="region-select-screen">
      <h2>Regiões</h2>
      <div className="region-grid">
        {REGION_ORDER.map((id) => {
          const regionDef = REGIONS[id]
          const unlocked = save.regionsUnlocked.includes(id)
          const regionSave = save.regions[id]

          return (
            <button
              key={id}
              className="region-card"
              disabled={!unlocked}
              onClick={() => unlocked && onSelect(id)}
            >
              <h3>{regionDef.name}</h3>
              {!unlocked && <p className="region-card-locked">Bloqueada</p>}
              {unlocked && !regionSave && <p>Ainda não iniciada</p>}
              {unlocked && regionSave && (
                <ul>
                  <li>Insígnias: {regionSave.badges.length}/{regionDef.gyms.length}</li>
                  <li>Pokédex: {regionSave.roster.length}</li>
                  <li>{regionSave.championBeaten ? 'Campeão derrotado' : 'Campeão não derrotado'}</li>
                </ul>
              )}
            </button>
          )
        })}

        {UPCOMING_REGIONS.map((region) => (
          <div key={region.id} className="region-card region-card--locked">
            <h3>{region.name}</h3>
            <p className="region-card-locked">Bloqueada</p>
          </div>
        ))}
      </div>
      <p className="region-select-hint">Mais regiões a caminho. Enquanto isso, jogue as regiões liberadas!</p>
    </div>
  )
}
