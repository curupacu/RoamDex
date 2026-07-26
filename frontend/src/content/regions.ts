import { GYMS, type GymDefinition, type GymTeamMember } from './gen1/gyms'
import { KANTO_LOCATIONS, type LocationDefinition } from './gen1/locations'
import { CHAMPION_DEFAULT_STARTER_ID, CHAMPION_TEAM_BY_STARTER, ELITE_FOUR, type EliteFourMember } from './gen1/eliteFour'
import { UPGRADES, type UpgradeDefinition } from './gen1/upgrades'
import { STARTER_IDS, STARTER_LEVEL } from './gen1/starters'
import { GYMS as JOHTO_GYMS } from './gen2/gyms'
import { JOHTO_LOCATIONS } from './gen2/locations'
import {
  CHAMPION_DEFAULT_STARTER_ID as JOHTO_CHAMPION_DEFAULT_STARTER_ID,
  CHAMPION_TEAM_BY_STARTER as JOHTO_CHAMPION_TEAM_BY_STARTER,
  ELITE_FOUR as JOHTO_ELITE_FOUR,
} from './gen2/eliteFour'
import { UPGRADES as JOHTO_UPGRADES } from './gen2/upgrades'
import { STARTER_IDS as JOHTO_STARTER_IDS, STARTER_LEVEL as JOHTO_STARTER_LEVEL } from './gen2/starters'
import type { RegionId } from '../engine/save'

// Order the regions unlock in — index N+1 unlocks the moment index N's
// Champion falls (systems/rebirth/rebirth.ts's unlockNextRegion).
export const REGION_ORDER: RegionId[] = ['kanto', 'johto']

// Display-only placeholders for the region-select screen (referência
// Pokelike: cards bloqueados "mais regiões a caminho") — not real RegionIds,
// no content behind them yet.
export interface UpcomingRegion {
  id: string
  name: string
}

export const UPCOMING_REGIONS: UpcomingRegion[] = [
  { id: 'hoenn', name: 'Hoenn' },
  { id: 'sinnoh', name: 'Sinnoh' },
]

// Everything a system/screen needs to run a region, bundled — replaces the
// scattered direct `content/gen1/*` imports that used to hardcode Kanto
// throughout systems/ and ui/.
export interface RegionDefinition {
  id: RegionId
  name: string
  // Species JSON fetched at runtime (build-time output, never PokeAPI at
  // runtime) — see scripts/build-data/.
  dataUrl: string
  locations: LocationDefinition[]
  gyms: GymDefinition[]
  eliteFour: EliteFourMember[]
  // Champion's team varies by which starter the player picked at the start
  // of this region's run — see systems/gyms/champion.ts.
  championTeamByStarter: Record<number, GymTeamMember[]>
  defaultStarterId: number
  upgrades: UpgradeDefinition[]
  starterIds: number[]
  starterLevel: number
}

export const REGIONS: Record<RegionId, RegionDefinition> = {
  kanto: {
    id: 'kanto',
    name: 'Kanto',
    dataUrl: '/data/gen1.json',
    locations: KANTO_LOCATIONS,
    gyms: GYMS,
    eliteFour: ELITE_FOUR,
    championTeamByStarter: CHAMPION_TEAM_BY_STARTER,
    defaultStarterId: CHAMPION_DEFAULT_STARTER_ID,
    upgrades: UPGRADES,
    starterIds: STARTER_IDS,
    starterLevel: STARTER_LEVEL,
  },
  johto: {
    id: 'johto',
    name: 'Johto',
    dataUrl: '/data/gen2.json',
    locations: JOHTO_LOCATIONS,
    gyms: JOHTO_GYMS,
    eliteFour: JOHTO_ELITE_FOUR,
    championTeamByStarter: JOHTO_CHAMPION_TEAM_BY_STARTER,
    defaultStarterId: JOHTO_CHAMPION_DEFAULT_STARTER_ID,
    upgrades: JOHTO_UPGRADES,
    starterIds: JOHTO_STARTER_IDS,
    starterLevel: JOHTO_STARTER_LEVEL,
  },
}
