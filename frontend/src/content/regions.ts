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
import { GYMS as HOENN_GYMS } from './gen3/gyms'
import { HOENN_LOCATIONS } from './gen3/locations'
import {
  CHAMPION_DEFAULT_STARTER_ID as HOENN_CHAMPION_DEFAULT_STARTER_ID,
  CHAMPION_TEAM_BY_STARTER as HOENN_CHAMPION_TEAM_BY_STARTER,
  ELITE_FOUR as HOENN_ELITE_FOUR,
} from './gen3/eliteFour'
import { UPGRADES as HOENN_UPGRADES } from './gen3/upgrades'
import { STARTER_IDS as HOENN_STARTER_IDS, STARTER_LEVEL as HOENN_STARTER_LEVEL } from './gen3/starters'
import { GYMS as SINNOH_GYMS } from './gen4/gyms'
import { SINNOH_LOCATIONS } from './gen4/locations'
import {
  CHAMPION_DEFAULT_STARTER_ID as SINNOH_CHAMPION_DEFAULT_STARTER_ID,
  CHAMPION_TEAM_BY_STARTER as SINNOH_CHAMPION_TEAM_BY_STARTER,
  ELITE_FOUR as SINNOH_ELITE_FOUR,
} from './gen4/eliteFour'
import { UPGRADES as SINNOH_UPGRADES } from './gen4/upgrades'
import { STARTER_IDS as SINNOH_STARTER_IDS, STARTER_LEVEL as SINNOH_STARTER_LEVEL } from './gen4/starters'
import { GYMS as KALOS_GYMS } from './gen6/gyms'
import { KALOS_LOCATIONS } from './gen6/locations'
import {
  CHAMPION_DEFAULT_STARTER_ID as KALOS_CHAMPION_DEFAULT_STARTER_ID,
  CHAMPION_TEAM_BY_STARTER as KALOS_CHAMPION_TEAM_BY_STARTER,
  ELITE_FOUR as KALOS_ELITE_FOUR,
} from './gen6/eliteFour'
import { UPGRADES as KALOS_UPGRADES } from './gen6/upgrades'
import { STARTER_IDS as KALOS_STARTER_IDS, STARTER_LEVEL as KALOS_STARTER_LEVEL } from './gen6/starters'
import { GYMS as UNOVA_GYMS } from './gen5/gyms'
import { UNOVA_LOCATIONS } from './gen5/locations'
import {
  CHAMPION_DEFAULT_STARTER_ID as UNOVA_CHAMPION_DEFAULT_STARTER_ID,
  CHAMPION_TEAM_BY_STARTER as UNOVA_CHAMPION_TEAM_BY_STARTER,
  ELITE_FOUR as UNOVA_ELITE_FOUR,
} from './gen5/eliteFour'
import { UPGRADES as UNOVA_UPGRADES } from './gen5/upgrades'
import { STARTER_IDS as UNOVA_STARTER_IDS, STARTER_LEVEL as UNOVA_STARTER_LEVEL } from './gen5/starters'
import { GYMS as GALAR_GYMS } from './gen8/gyms'
import { GALAR_LOCATIONS } from './gen8/locations'
import {
  CHAMPION_DEFAULT_STARTER_ID as GALAR_CHAMPION_DEFAULT_STARTER_ID,
  CHAMPION_TEAM_BY_STARTER as GALAR_CHAMPION_TEAM_BY_STARTER,
  ELITE_FOUR as GALAR_ELITE_FOUR,
} from './gen8/eliteFour'
import { UPGRADES as GALAR_UPGRADES } from './gen8/upgrades'
import { STARTER_IDS as GALAR_STARTER_IDS, STARTER_LEVEL as GALAR_STARTER_LEVEL } from './gen8/starters'
import { GYMS as ALOLA_GYMS } from './gen7/gyms'
import { ALOLA_LOCATIONS } from './gen7/locations'
import {
  CHAMPION_DEFAULT_STARTER_ID as ALOLA_CHAMPION_DEFAULT_STARTER_ID,
  CHAMPION_TEAM_BY_STARTER as ALOLA_CHAMPION_TEAM_BY_STARTER,
  ELITE_FOUR as ALOLA_ELITE_FOUR,
} from './gen7/eliteFour'
import { UPGRADES as ALOLA_UPGRADES } from './gen7/upgrades'
import { STARTER_IDS as ALOLA_STARTER_IDS, STARTER_LEVEL as ALOLA_STARTER_LEVEL } from './gen7/starters'
import { GYMS as PALDEA_GYMS } from './gen9/gyms'
import { PALDEA_LOCATIONS } from './gen9/locations'
import {
  CHAMPION_DEFAULT_STARTER_ID as PALDEA_CHAMPION_DEFAULT_STARTER_ID,
  CHAMPION_TEAM_BY_STARTER as PALDEA_CHAMPION_TEAM_BY_STARTER,
  ELITE_FOUR as PALDEA_ELITE_FOUR,
} from './gen9/eliteFour'
import { UPGRADES as PALDEA_UPGRADES } from './gen9/upgrades'
import { STARTER_IDS as PALDEA_STARTER_IDS, STARTER_LEVEL as PALDEA_STARTER_LEVEL } from './gen9/starters'
import type { RegionId } from '../engine/save'

// Order the regions unlock in — index N+1 unlocks the moment index N's
// Champion falls (systems/rebirth/rebirth.ts's unlockNextRegion).
export const REGION_ORDER: RegionId[] = ['kanto', 'johto', 'hoenn', 'sinnoh', 'kalos', 'unova', 'galar', 'alola', 'paldea']

// Display-only placeholders for the region-select screen (referência
// Pokelike: cards bloqueados "mais regiões a caminho") — not real RegionIds,
// no content behind them yet.
export interface UpcomingRegion {
  id: string
  name: string
}

// Vazio por enquanto — Alola/Paldea ainda têm rupturas estruturais maiores
// (docs/PESQUISA-GEN3-9-ESQUELETO.md: sem ginásio tradicional/sem Elite
// Four fixa) que precisam de pesquisa antes de virar conteúdo. Galar (2
// ginásios version-exclusive) já entrou — ver content/gen8/gyms.ts's
// teamByVersion + RegionSave.versionVariant.
export const UPCOMING_REGIONS: UpcomingRegion[] = []

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
  hoenn: {
    id: 'hoenn',
    name: 'Hoenn',
    dataUrl: '/data/gen3.json',
    locations: HOENN_LOCATIONS,
    gyms: HOENN_GYMS,
    eliteFour: HOENN_ELITE_FOUR,
    championTeamByStarter: HOENN_CHAMPION_TEAM_BY_STARTER,
    defaultStarterId: HOENN_CHAMPION_DEFAULT_STARTER_ID,
    upgrades: HOENN_UPGRADES,
    starterIds: HOENN_STARTER_IDS,
    starterLevel: HOENN_STARTER_LEVEL,
  },
  sinnoh: {
    id: 'sinnoh',
    name: 'Sinnoh',
    dataUrl: '/data/gen4.json',
    locations: SINNOH_LOCATIONS,
    gyms: SINNOH_GYMS,
    eliteFour: SINNOH_ELITE_FOUR,
    championTeamByStarter: SINNOH_CHAMPION_TEAM_BY_STARTER,
    defaultStarterId: SINNOH_CHAMPION_DEFAULT_STARTER_ID,
    upgrades: SINNOH_UPGRADES,
    starterIds: SINNOH_STARTER_IDS,
    starterLevel: SINNOH_STARTER_LEVEL,
  },
  kalos: {
    id: 'kalos',
    name: 'Kalos',
    dataUrl: '/data/gen6.json',
    locations: KALOS_LOCATIONS,
    gyms: KALOS_GYMS,
    eliteFour: KALOS_ELITE_FOUR,
    championTeamByStarter: KALOS_CHAMPION_TEAM_BY_STARTER,
    defaultStarterId: KALOS_CHAMPION_DEFAULT_STARTER_ID,
    upgrades: KALOS_UPGRADES,
    starterIds: KALOS_STARTER_IDS,
    starterLevel: KALOS_STARTER_LEVEL,
  },
  unova: {
    id: 'unova',
    name: 'Unova',
    dataUrl: '/data/gen5.json',
    locations: UNOVA_LOCATIONS,
    gyms: UNOVA_GYMS,
    eliteFour: UNOVA_ELITE_FOUR,
    championTeamByStarter: UNOVA_CHAMPION_TEAM_BY_STARTER,
    defaultStarterId: UNOVA_CHAMPION_DEFAULT_STARTER_ID,
    upgrades: UNOVA_UPGRADES,
    starterIds: UNOVA_STARTER_IDS,
    starterLevel: UNOVA_STARTER_LEVEL,
  },
  galar: {
    id: 'galar',
    name: 'Galar',
    dataUrl: '/data/gen8.json',
    locations: GALAR_LOCATIONS,
    gyms: GALAR_GYMS,
    eliteFour: GALAR_ELITE_FOUR,
    championTeamByStarter: GALAR_CHAMPION_TEAM_BY_STARTER,
    defaultStarterId: GALAR_CHAMPION_DEFAULT_STARTER_ID,
    upgrades: GALAR_UPGRADES,
    starterIds: GALAR_STARTER_IDS,
    starterLevel: GALAR_STARTER_LEVEL,
  },
  alola: {
    id: 'alola',
    name: 'Alola',
    dataUrl: '/data/gen7.json',
    locations: ALOLA_LOCATIONS,
    gyms: ALOLA_GYMS,
    eliteFour: ALOLA_ELITE_FOUR,
    championTeamByStarter: ALOLA_CHAMPION_TEAM_BY_STARTER,
    defaultStarterId: ALOLA_CHAMPION_DEFAULT_STARTER_ID,
    upgrades: ALOLA_UPGRADES,
    starterIds: ALOLA_STARTER_IDS,
    starterLevel: ALOLA_STARTER_LEVEL,
  },
  paldea: {
    id: 'paldea',
    name: 'Paldea',
    dataUrl: '/data/gen9.json',
    locations: PALDEA_LOCATIONS,
    gyms: PALDEA_GYMS,
    eliteFour: PALDEA_ELITE_FOUR,
    championTeamByStarter: PALDEA_CHAMPION_TEAM_BY_STARTER,
    defaultStarterId: PALDEA_CHAMPION_DEFAULT_STARTER_ID,
    upgrades: PALDEA_UPGRADES,
    starterIds: PALDEA_STARTER_IDS,
    starterLevel: PALDEA_STARTER_LEVEL,
  },
}
