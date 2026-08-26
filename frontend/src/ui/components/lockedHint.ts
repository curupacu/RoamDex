import type { RegionSave } from '../../engine/save'
import type { RegionDefinition } from '../../content/regions'
import type { UpgradeDefinition } from '../../content/gen1/upgrades'
import { formatBigNumber } from '../../engine/numberFormat'
import { TYPES } from '../../content/types'

// Locked-placeholder hint text (decisão 0030's "???" convention) — describes
// whichever gate isUnlocked() would actually fail on first, same check
// order (candies -> badges -> synergy) as systems/economy/upgrades.ts,
// since Padrão 3/4 upgrades can be locked by something other than doces
// acumulados (the only case the original placeholder text assumed).
export function lockedHint(def: UpgradeDefinition, regionDef: RegionDefinition, save: RegionSave): string {
  if (save.lifetimeCandies < def.unlockAt) {
    return `desbloqueia com ${formatBigNumber(def.unlockAt)} doces acumulados`
  }
  if (def.requiresBadges !== undefined && save.badges.length < def.requiresBadges) {
    return `desbloqueia com ${def.requiresBadges} insígnias de ginásio`
  }
  if (def.requiresSynergy) {
    const { upgradeId, count, teamType } = def.requiresSynergy
    const sourceName = regionDef.upgrades.find((candidate) => candidate.id === upgradeId)?.name ?? upgradeId
    const typeName = TYPES.find((type) => type.id === teamType)?.name ?? teamType
    return `desbloqueia com ${count}x ${sourceName} e um Pokémon de tipo ${typeName} no time ativo`
  }
  if (def.requiresBuildingOwned) {
    const { buildingId, count } = def.requiresBuildingOwned
    const buildingName = regionDef.upgrades.find((candidate) => candidate.id === buildingId)?.name ?? buildingId
    return `desbloqueia com ${count}x ${buildingName}`
  }
  return `desbloqueia com ${formatBigNumber(def.unlockAt)} doces acumulados`
}
