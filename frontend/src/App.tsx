import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { GameLoop } from './engine/gameLoop'
import { formatBigNumber } from './engine/numberFormat'
import {
  calculateOfflineProgress,
  formatDuration,
  shouldShowOfflineBanner,
  type OfflineProgress,
} from './engine/offlineProgress'
import {
  currentRegion,
  emptyRegionSave,
  loadSave,
  withRegion,
  writeSave,
  type RegionId,
  type SaveData,
} from './engine/save'
import { signInAsGuest, signInWithEmail, signInWithGoogle, signUpWithEmail } from './services/auth'
import { auth } from './services/firebase'
import { fetchCloudSave, pushCloudSave, resolveSync } from './services/cloudSave'
import { REGIONS, type RegionDefinition } from './content/regions'
import type { SpeciesEntry } from './content/gen1/types'
import { BONUS_KIND_LABELS } from './content/types'
import { applyClick, clickValue } from './systems/economy/click'
import { buyRareCandy, buyXpBoost, xpMultiplierFromBuffs } from './systems/economy/candyShop'
import { bonusBreakdown, economyMultiplier, upgradeCostMultiplier, type TeamMember } from './systems/economy/typeBonuses'
import { buyUpgrade, totalCps, totalXpPerSecond } from './systems/economy/upgrades'
import { BATTLE_XP_ACTIVE_BONUS, BATTLE_XP_TEAM } from './content/battle'
import { gainMemberXp, gainTeamXp, xpForNextLevel } from './systems/team/leveling'
import { addToRoster, isCaptured, rosterMember, toggleActiveTeamMember } from './systems/team/roster'
import { rollCapture } from './systems/capture/capture'
import { applyLoot, rollLoot } from './systems/capture/loot'
import { RARITY_LABELS, rarityTier } from './systems/capture/rarityTier'
import { BASE_SPAWN_INTERVAL_MS, IGNORE_TIMEOUT_MS, spawnWildEncounter, type WildEncounter } from './systems/capture/wildEncounter'
import { awardBadge, gymForLocation, hasBadge } from './systems/gyms/gymProgress'
import { locationById, nextLocationOf, prevLocationOf, travelTo } from './systems/gyms/locations'
import { performRebirth, unlockNextRegion, victoryRoadSnapshot } from './systems/rebirth/rebirth'
import {
  buyRebirthUpgrade,
  cpsMultiplierBonus,
  hasCaptureRetry,
  rareWildChanceMultiplierBonus,
  wildSpawnRateMultiplierBonus,
  xpGainMultiplierBonus,
} from './systems/rebirth/rebirthShop'
import { AdminScreen } from './ui/screens/AdminScreen'
import { BattleScreen, type BattleEncounter } from './ui/screens/BattleScreen'
import { CandyShopScreen } from './ui/screens/CandyShopScreen'
import { LocationNav } from './ui/components/LocationNav'
import { HomeScreen } from './ui/screens/HomeScreen'
import { LoginScreen } from './ui/screens/LoginScreen'
import { TypeBadge } from './ui/components/TypeBadge'
import { UpgradesPanel } from './ui/components/UpgradesPanel'
import { NewGameScreen } from './ui/screens/NewGameScreen'
import { PokedexScreen } from './ui/screens/PokedexScreen'
import { RebirthShopScreen } from './ui/screens/RebirthShopScreen'
import { RegionSelectScreen } from './ui/screens/RegionSelectScreen'
import { TeamScreen } from './ui/screens/TeamScreen'
import { VictoryRoadScreen } from './ui/screens/VictoryRoadScreen'

const AUTOSAVE_INTERVAL_MS = 10_000 // README: "salva a cada 10s"
const CANDY_POP_LIFETIME_MS = 700

type View = 'clicker' | 'team' | 'pokedex' | 'shop' | 'battle' | 'admin' | 'victoryRoad' | 'rebirthShop'
type AuthStatus = 'loading' | 'signed-out' | 'signed-in'

// Only called from handlers reachable after the region gates below have
// confirmed currentRegionId is set — same "guaranteed by the render tree,
// not provable by the type system" pattern gen1Ref already relies on.
function regionDefFor(save: SaveData): RegionDefinition {
  return REGIONS[save.currentRegionId as RegionId]
}

function App() {
  const [gen1, setGen1] = useState<SpeciesEntry[] | null>(null)
  const gen1Ref = useRef(gen1)
  gen1Ref.current = gen1
  const [save, setSave] = useState<SaveData>(() => loadSave())
  const saveRef = useRef(save)
  saveRef.current = save
  const uidRef = useRef<string | null>(null)
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loading')
  const [authError, setAuthError] = useState<string | null>(null)
  const [authPending, setAuthPending] = useState(false)
  const [candyPops, setCandyPops] = useState<{ id: number; x: number; gain: number }[]>([])
  const nextPopId = useRef(0)
  const [offlineSummary, setOfflineSummary] = useState<OfflineProgress | null>(null)
  const offlineAppliedRef = useRef(false)
  const [view, setView] = useState<View>('clicker')
  const [wildEncounter, setWildEncounter] = useState<WildEncounter | null>(null)
  const wildEncounterRef = useRef(wildEncounter)
  wildEncounterRef.current = wildEncounter
  const [activeGymId, setActiveGymId] = useState<string | null>(null)
  const [challengingEliteFour, setChallengingEliteFour] = useState(false)
  // Menu principal pós-login (referência Pokelike) — só relevante enquanto
  // currentRegionId é null; não é salvo, sempre volta pro Menu depois de um
  // login novo ou de "Regiões" no nav.
  const [hubView, setHubView] = useState<'home' | 'regions'>('home')

  const activeRegionDef = save.currentRegionId ? REGIONS[save.currentRegionId] : null
  const regionSave = save.currentRegionId ? save.regions[save.currentRegionId] : undefined

  // Index 0 is the one you click/battle with (roadmap section 4, "1v1 com troca").
  const clickerEntry = gen1?.find((entry) => entry.id === regionSave?.activeTeamIds[0]) ?? null
  const clickerMember = clickerEntry && regionSave ? rosterMember(regionSave, clickerEntry.id) : null
  const wildEntry = wildEncounter ? (gen1?.find((entry) => entry.id === wildEncounter.speciesId) ?? null) : null
  const team: TeamMember[] = (regionSave?.activeTeamIds ?? [])
    .map((id) => gen1?.find((entry) => entry.id === id))
    .filter((entry): entry is SpeciesEntry => entry !== undefined)
    .map((entry) => ({ types: entry.types }))
  const teamRef = useRef(team)
  teamRef.current = team

  // Sprint 20's route/gym "trilha" (roadmap section 8) — where the player
  // currently is in the region, and what's adjacent to travel to.
  const currentLocation = activeRegionDef && regionSave ? locationById(activeRegionDef, regionSave.currentLocationId) : null
  const prevLocation = activeRegionDef && regionSave ? prevLocationOf(activeRegionDef, regionSave.currentLocationId) : null
  const nextLocation = activeRegionDef && regionSave ? nextLocationOf(activeRegionDef, regionSave.currentLocationId) : null
  const gymHere = activeRegionDef && regionSave ? gymForLocation(activeRegionDef.gyms, regionSave.currentLocationId) : null

  // Which fight BattleScreen is showing: an explicit gym or Elite Four
  // challenge wins over a pending wild encounter (none of these should
  // normally coexist), which wins over the Sprint 13 fixed test dummy
  // (Admin-only fallback).
  const activeGym = activeGymId ? (activeRegionDef?.gyms.find((gym) => gym.id === activeGymId) ?? null) : null
  const battleEncounter: BattleEncounter | null =
    view !== 'battle'
      ? null
      : activeGym
        ? { kind: 'gym', gym: activeGym }
        : challengingEliteFour
          ? { kind: 'elite-four' }
          : wildEncounter
            ? { kind: 'wild', speciesId: wildEncounter.speciesId, level: wildEncounter.level }
            : { kind: 'dummy' }

  // Fundo muda por local (docs/decisoes/0024-fundos-por-local.md) — cada
  // LocationDefinition declara seu próprio arquivo (public/backgrounds/);
  // este efeito só troca a custom property que index.css já lê, sem
  // duplicar a lógica de fallback (login/seleção de região mantêm o
  // padrão de forest.jpg do CSS, já que não há location ativa ali).
  useEffect(() => {
    if (!currentLocation) return
    document.body.style.setProperty('--bg-image', `url(/backgrounds/${currentLocation.background})`)
  }, [currentLocation])

  // Runs once gen1 has loaded (so the team's type bonuses are known),
  // against the save as read from disk before any other effect touches it.
  useEffect(() => {
    if (!gen1 || offlineAppliedRef.current) return
    offlineAppliedRef.current = true

    const region = currentRegion(saveRef.current)
    const regionDef = regionDefFor(saveRef.current)
    const cps = totalCps(regionDef, region, economyMultiplier(teamRef.current, 'cps') * cpsMultiplierBonus(saveRef.current))
    const progress = calculateOfflineProgress(saveRef.current, Date.now(), cps)
    if (progress.candiesEarned > 0) {
      setSave((current) => {
        const currentRegionSave = currentRegion(current)
        return withRegion(current, {
          ...currentRegionSave,
          candies: currentRegionSave.candies + progress.candiesEarned,
          lifetimeCandies: currentRegionSave.lifetimeCandies + progress.candiesEarned,
        })
      })
    }

    const xpPerSecond =
      totalXpPerSecond(regionDef, region) * xpMultiplierFromBuffs(region, Date.now()) * xpGainMultiplierBonus(saveRef.current)
    if (xpPerSecond > 0) {
      const xpGain = (xpPerSecond * progress.elapsedMs) / 1000
      setSave((current) => withRegion(current, gainTeamXp(currentRegion(current), gen1, xpGain)))
    }

    if (shouldShowOfflineBanner(progress)) setOfflineSummary(progress)
  }, [gen1])

  // Fetches the CURRENT region's species data — re-runs whenever the player
  // switches region (region-select screen), never PokeAPI at runtime
  // (CLAUDE.md rule 1), always the build-time JSON for that region.
  useEffect(() => {
    if (!save.currentRegionId) return
    setGen1(null)
    fetch(REGIONS[save.currentRegionId].dataUrl)
      .then((res) => res.json() as Promise<SpeciesEntry[]>)
      .then(setGen1)
  }, [save.currentRegionId])

  // Login gate (referência PokéRogue): no mais anônimo automático no mount —
  // o jogador escolhe Google / email / "continuar sem conta" na LoginScreen
  // abaixo. O Firebase persiste a escolha, então quem já entrou uma vez
  // resolve direto pra 'signed-in' aqui sem ver essa tela de novo.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        uidRef.current = null
        setAuthStatus('signed-out')
        return
      }
      uidRef.current = user.uid
      setAuthStatus('signed-in')

      // Cloud sync runs in the background and never blocks the game loop —
      // if it fails (offline, missing config), the game keeps running 100% local.
      fetchCloudSave(user.uid)
        .then((cloud) => {
          const resolution = resolveSync(saveRef.current, cloud)
          if (resolution.kind === 'use-cloud') {
            setSave(resolution.cloud)
          } else if (resolution.kind === 'conflict') {
            const useCloud = window.confirm(
              'Seu save local e o da nuvem divergem bastante. Clique OK para usar o save da nuvem, ' +
                'ou Cancelar para manter o save deste aparelho.',
            )
            if (useCloud) setSave(resolution.cloud)
          }
        })
        .catch((error) => console.warn('cloud sync unavailable, staying local-first:', error))
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    const loop = new GameLoop()
    let msSinceSave = 0

    const persist = () => {
      writeSave(saveRef.current)
      const uid = uidRef.current
      if (uid) pushCloudSave(uid, saveRef.current).catch((error) => console.warn('failed to sync save:', error))
    }

    const unsubscribe = loop.subscribe((deltaMs) => {
      const regionId = saveRef.current.currentRegionId
      if (regionId) {
        const region = currentRegion(saveRef.current)
        const regionDef = REGIONS[regionId]
        const cps = totalCps(regionDef, region, economyMultiplier(teamRef.current, 'cps') * cpsMultiplierBonus(saveRef.current))
        if (cps > 0) {
          const gain = (cps * deltaMs) / 1000
          setSave((current) => {
            const currentRegionSave = currentRegion(current)
            return withRegion(current, {
              ...currentRegionSave,
              candies: currentRegionSave.candies + gain,
              lifetimeCandies: currentRegionSave.lifetimeCandies + gain,
            })
          })
        }

        const xpPerSecond =
          totalXpPerSecond(regionDef, region) * xpMultiplierFromBuffs(region, Date.now()) * xpGainMultiplierBonus(saveRef.current)
        if (xpPerSecond > 0) {
          const xpGain = (xpPerSecond * deltaMs) / 1000
          setSave((current) => withRegion(current, gainTeamXp(currentRegion(current), gen1Ref.current ?? [], xpGain)))
        }
      }

      msSinceSave += deltaMs
      if (msSinceSave >= AUTOSAVE_INTERVAL_MS) {
        msSinceSave = 0
        persist()
      }
    })
    loop.start()

    window.addEventListener('beforeunload', persist)

    return () => {
      unsubscribe()
      loop.stop()
      window.removeEventListener('beforeunload', persist)
      persist()
    }
  }, [])

  // "Durante o clicker, a cada X tempo... aparece um selvagem" (roadmap
  // section 5), drawn from the CURRENT LOCATION's own pool (Sprint 20 — see
  // docs/ROTAS-KANTO.md) instead of a global pool; towns/gyms have no
  // encounters at all. Voador's wildSpawnRate bonus shortens the interval;
  // Inseto's rareWildChance biases which species spawns. Only one encounter
  // at a time; a second timer auto-dismisses it if ignored too long.
  useEffect(() => {
    const loop = new GameLoop()
    let msUntilSpawn = BASE_SPAWN_INTERVAL_MS

    const unsubscribe = loop.subscribe((deltaMs) => {
      const regionId = saveRef.current.currentRegionId
      const currentGen1 = gen1Ref.current
      if (!regionId || !currentGen1?.length) return

      const region = currentRegion(saveRef.current)
      const location = locationById(REGIONS[regionId], region.currentLocationId)
      if (wildEncounterRef.current || region.roster.length === 0 || location.encounters.length === 0) {
        return
      }

      const spawnRateMultiplier = economyMultiplier(teamRef.current, 'wildSpawnRate') * wildSpawnRateMultiplierBonus(saveRef.current)
      msUntilSpawn -= deltaMs * spawnRateMultiplier
      if (msUntilSpawn <= 0) {
        msUntilSpawn = BASE_SPAWN_INTERVAL_MS
        const rareBonus = economyMultiplier(teamRef.current, 'rareWildChance') * rareWildChanceMultiplierBonus(saveRef.current)
        const spawned = spawnWildEncounter(location, currentGen1, rareBonus)
        if (spawned) setWildEncounter(spawned)
      }
    })
    loop.start()

    return () => {
      unsubscribe()
      loop.stop()
    }
  }, [])

  // The 20s "decide or it leaves" window only applies while it's showing
  // in the clicker view — once the player commits to battling, the
  // encounter must survive for the whole fight regardless of how long the
  // QTEs take.
  useEffect(() => {
    if (!wildEncounter || view !== 'clicker') return
    const id = setTimeout(() => setWildEncounter(null), IGNORE_TIMEOUT_MS)
    return () => clearTimeout(id)
  }, [wildEncounter, view])

  // --- Auth (login gate) ---
  function handleGoogleLogin() {
    setAuthPending(true)
    setAuthError(null)
    signInWithGoogle()
      .catch((error) => setAuthError(error instanceof Error ? error.message : String(error)))
      .finally(() => setAuthPending(false))
  }

  function handleEmailSignUp(email: string, password: string) {
    setAuthPending(true)
    setAuthError(null)
    signUpWithEmail(email, password)
      .catch((error) => setAuthError(error instanceof Error ? error.message : String(error)))
      .finally(() => setAuthPending(false))
  }

  function handleEmailSignIn(email: string, password: string) {
    setAuthPending(true)
    setAuthError(null)
    signInWithEmail(email, password)
      .catch((error) => setAuthError(error instanceof Error ? error.message : String(error)))
      .finally(() => setAuthPending(false))
  }

  function handleGuestLogin() {
    setAuthPending(true)
    setAuthError(null)
    signInAsGuest()
      .catch((error) => setAuthError(error instanceof Error ? error.message : String(error)))
      .finally(() => setAuthPending(false))
  }

  // --- Region hub ---
  function handleSelectRegion(regionId: RegionId) {
    setSave((current) => {
      if (current.regions[regionId]) return { ...current, currentRegionId: regionId }
      const def = REGIONS[regionId]
      return {
        ...current,
        currentRegionId: regionId,
        regions: { ...current.regions, [regionId]: emptyRegionSave(regionId, def.locations[0].id) },
      }
    })
  }

  function handleGoToRegionSelect() {
    setHubView('regions')
    setSave((current) => ({ ...current, currentRegionId: null }))
  }

  function handleChooseStarter(speciesId: number) {
    setSave((current) => {
      const def = regionDefFor(current)
      return withRegion(current, addToRoster(currentRegion(current), speciesId, def.starterLevel))
    })
  }

  function handleToggleTeamMember(speciesId: number) {
    setSave((current) => withRegion(current, toggleActiveTeamMember(currentRegion(current), speciesId)))
  }

  function handleClick() {
    if (!activeRegionDef || !regionSave) return
    const multiplier = economyMultiplier(team, 'clickCandies')
    const gain = clickValue(activeRegionDef, regionSave, multiplier)
    setSave((current) => withRegion(current, applyClick(regionDefFor(current), currentRegion(current), multiplier)))

    const id = nextPopId.current++
    const x = Math.random() * 40 - 20
    setCandyPops((current) => [...current, { id, x, gain }])
    setTimeout(() => {
      setCandyPops((current) => current.filter((pop) => pop.id !== id))
    }, CANDY_POP_LIFETIME_MS)
  }

  function handleBuyUpgrade(id: string) {
    setSave((current) => withRegion(current, buyUpgrade(regionDefFor(current), currentRegion(current), id, upgradeCostMultiplier(team))))
  }

  function handleBuyRareCandy(speciesId: number) {
    setSave((current) => withRegion(current, buyRareCandy(currentRegion(current), gen1Ref.current ?? [], speciesId)))
  }

  function handleBuyXpBoost() {
    setSave((current) => withRegion(current, buyXpBoost(currentRegion(current), Date.now())))
  }

  // Grants XP right away, whether the player then captures, loots, or the
  // battle was just the "Batalha" tab's fixed test dummy.
  function handleVictory(activeSpeciesId: number) {
    setSave((current) => {
      const xpMultiplier = xpGainMultiplierBonus(current)
      const withTeamXp = gainTeamXp(currentRegion(current), gen1Ref.current ?? [], BATTLE_XP_TEAM * xpMultiplier)
      const withMemberXp = gainMemberXp(withTeamXp, gen1Ref.current ?? [], activeSpeciesId, BATTLE_XP_ACTIVE_BONUS * xpMultiplier)
      return withRegion(current, withMemberXp)
    })
  }

  function handleExitBattle() {
    setWildEncounter(null)
    setActiveGymId(null)
    setChallengingEliteFour(false)
    setView('clicker')
  }

  function handleBattleWild() {
    setView('battle')
  }

  function handleIgnoreWild() {
    setWildEncounter(null)
  }

  function handleTravel(locationId: string) {
    setSave((current) => withRegion(current, travelTo(regionDefFor(current), currentRegion(current), locationId)))
  }

  function handleChallengeGym(gymId: string) {
    setActiveGymId(gymId)
    setView('battle')
  }

  function handleChallengeEliteFour() {
    setChallengingEliteFour(true)
    setView('battle')
  }

  function handleGymVictory(gymId: string) {
    setSave((current) => withRegion(current, awardBadge(currentRegion(current), gymId)))
  }

  // Runs once, right when the Champion falls: registers the Victory Road
  // snapshot, flips championBeaten (só nessa região) so o botão de Rebirth
  // aparece na tela do clicker, e libera a próxima região — unlock e
  // rebirth são escolhas independentes do jogador (docs/decisoes/00NN-*.md).
  function handleEliteFourVictory() {
    setSave((current) => {
      const region = currentRegion(current)
      if (region.championBeaten) return current
      const withBadge = withRegion(current, { ...region, championBeaten: true })
      const withVictory = { ...withBadge, victoryRoad: [...withBadge.victoryRoad, victoryRoadSnapshot(region)] }
      return unlockNextRegion(withVictory, region.regionId)
    })
  }

  function handleBuyRebirthUpgrade(id: string) {
    setSave((current) => buyRebirthUpgrade(current, id))
  }

  function handleRebirth() {
    if (!window.confirm('Rebirth: perde todos os doces e upgrades da run, e seu time volta pro lvl 1 / forma base. Continuar?')) {
      return
    }
    setSave((current) => performRebirth(regionDefFor(current), current, gen1Ref.current ?? []))
  }

  // "Falhou a bola → o Pokémon foge" (roadmap section 6) — a single roll,
  // no second chance... unless the Rebirth Shop's "Segunda Pokébola" is
  // owned, which grants exactly one immediate retry on the same encounter.
  // Doesn't clear wildEncounter itself: BattleScreen still needs it to show
  // the result, onExit clears it once dismissed.
  function handleCaptureWild(): string {
    const encounter = wildEncounterRef.current
    const entry = encounter ? (gen1Ref.current?.find((candidate) => candidate.id === encounter.speciesId) ?? null) : null
    if (!encounter || !entry) return ''

    const region = currentRegion(saveRef.current)
    // The roster can't hold two of the same species yet — be honest about
    // it instead of claiming a capture that doesn't actually change anything.
    if (isCaptured(region, entry.id)) return `Você já tem um ${entry.name}!`

    const bonusMultiplier = economyMultiplier(teamRef.current, 'captureChance')
    let success = rollCapture(entry.captureRate, bonusMultiplier)
    let usedRetry = false
    if (!success && hasCaptureRetry(saveRef.current)) {
      usedRetry = true
      success = rollCapture(entry.captureRate, bonusMultiplier)
    }

    if (success) setSave((current) => withRegion(current, addToRoster(currentRegion(current), entry.id, encounter.level)))
    if (success) return `${entry.name} foi capturado!${usedRetry ? ' (na segunda tentativa)' : ''}`
    return `A Pokébola falhou${usedRetry ? ' de novo' : ''}... ${entry.name} fugiu!`
  }

  function handleLootWild(): string {
    const encounter = wildEncounterRef.current
    if (!encounter) return ''

    const result = rollLoot(regionDefFor(saveRef.current), currentRegion(saveRef.current), encounter.level)
    setSave((current) => withRegion(current, applyLoot(currentRegion(current), result)))
    return result.kind === 'candies'
      ? `Você achou ${formatBigNumber(result.amount)} doces!`
      : `Você achou uma cópia grátis de ${result.upgradeName}!`
  }

  // --- Admin (temporary, for manual testing — see AdminScreen.tsx) ---
  function handleAdminAddCandies(amount: number) {
    setSave((current) => {
      const region = currentRegion(current)
      return withRegion(current, { ...region, candies: region.candies + amount, lifetimeCandies: region.lifetimeCandies + amount })
    })
  }

  function handleAdminAddInsignias(amount: number) {
    setSave((current) => ({ ...current, insignias: current.insignias + amount }))
  }

  function handleAdminAddToRoster(speciesId: number, level: number) {
    setSave((current) => withRegion(current, addToRoster(currentRegion(current), speciesId, level)))
  }

  function handleAdminForceEncounter(speciesId: number, level: number) {
    const entry = gen1Ref.current?.find((candidate) => candidate.id === speciesId)
    if (!entry) return
    setWildEncounter({ speciesId, level, tier: rarityTier(entry.captureRate) })
  }

  function handleAdminUnlockEliteFour() {
    setSave((current) => {
      const def = regionDefFor(current)
      const region = currentRegion(current)
      return withRegion(current, {
        ...region,
        lifetimeCandies: Math.max(region.lifetimeCandies, locationById(def, 'victory-road').unlockAt),
        badges: def.gyms.map((gym) => gym.id),
        currentLocationId: 'victory-road',
      })
    })
  }

  function handleAdminSetActiveLevel(level: number) {
    const activeId = currentRegion(saveRef.current).activeTeamIds[0]
    if (!activeId) return
    setSave((current) => {
      const region = currentRegion(current)
      return withRegion(current, {
        ...region,
        roster: region.roster.map((member) => (member.speciesId === activeId ? { ...member, level, xp: 0 } : member)),
      })
    })
  }

  if (authStatus === 'loading') {
    return (
      <main>
        <h1>PokéIdle</h1>
        <p>Carregando...</p>
      </main>
    )
  }

  if (authStatus === 'signed-out') {
    return (
      <main>
        <h1>PokéIdle</h1>
        <LoginScreen
          onGoogle={handleGoogleLogin}
          onEmailSignUp={handleEmailSignUp}
          onEmailSignIn={handleEmailSignIn}
          onGuest={handleGuestLogin}
          error={authError}
          pending={authPending}
        />
      </main>
    )
  }

  if (!activeRegionDef) {
    return (
      <main>
        <h1>PokéIdle</h1>
        {hubView === 'home' ? (
          <HomeScreen onPlayHistory={() => setHubView('regions')} />
        ) : (
          <RegionSelectScreen save={save} onSelect={handleSelectRegion} />
        )}
      </main>
    )
  }

  if (!gen1) {
    return (
      <main>
        <h1>PokéIdle</h1>
        <p>Carregando...</p>
      </main>
    )
  }

  if (!regionSave || regionSave.roster.length === 0) {
    return (
      <main>
        <h1>PokéIdle</h1>
        <NewGameScreen regionDef={activeRegionDef} gen1={gen1} onChoose={handleChooseStarter} />
      </main>
    )
  }

  return (
    <main>
      <h1>PokéIdle</h1>
      <nav className="main-nav">
        <button onClick={() => setView('clicker')} disabled={view === 'clicker'}>
          Clicker
        </button>
        <button onClick={() => setView('team')} disabled={view === 'team'}>
          Time
        </button>
        <button onClick={() => setView('pokedex')} disabled={view === 'pokedex'}>
          Pokédex
        </button>
        <button onClick={() => setView('shop')} disabled={view === 'shop'}>
          Loja
        </button>
        {save.victoryRoad.length > 0 && (
          <button onClick={() => setView('victoryRoad')} disabled={view === 'victoryRoad'}>
            Victory Road
          </button>
        )}
        {save.hasRebirthed && (
          <button onClick={() => setView('rebirthShop')} disabled={view === 'rebirthShop'}>
            Loja de Rebirth
          </button>
        )}
        <button onClick={handleGoToRegionSelect}>Regiões</button>
        <button onClick={() => setView('admin')} disabled={view === 'admin'}>
          Admin
        </button>
      </nav>

      {view === 'admin' && (
        <AdminScreen
          gen1={gen1}
          region={regionSave}
          insignias={save.insignias}
          onAddCandies={handleAdminAddCandies}
          onAddInsignias={handleAdminAddInsignias}
          onAddToRoster={handleAdminAddToRoster}
          onForceEncounter={handleAdminForceEncounter}
          onSetActiveLevel={handleAdminSetActiveLevel}
          onBattleTestDummy={() => setView('battle')}
          onUnlockEliteFour={handleAdminUnlockEliteFour}
        />
      )}
      {view === 'team' && <TeamScreen gen1={gen1} region={regionSave} onToggle={handleToggleTeamMember} />}
      {view === 'pokedex' && <PokedexScreen gen1={gen1} region={regionSave} />}
      {view === 'victoryRoad' && <VictoryRoadScreen gen1={gen1} save={save} />}
      {view === 'rebirthShop' && <RebirthShopScreen save={save} onBuy={handleBuyRebirthUpgrade} />}
      {view === 'shop' && (
        <CandyShopScreen
          gen1={gen1}
          region={regionSave}
          now={Date.now()}
          onBuyRareCandy={handleBuyRareCandy}
          onBuyXpBoost={handleBuyXpBoost}
        />
      )}
      {view === 'battle' && battleEncounter && (
        <BattleScreen
          gen1={gen1}
          regionDef={activeRegionDef}
          region={regionSave}
          encounter={battleEncounter}
          onVictory={handleVictory}
          onCapture={handleCaptureWild}
          onLoot={handleLootWild}
          onGymVictory={handleGymVictory}
          onEliteFourVictory={handleEliteFourVictory}
          onExit={handleExitBattle}
        />
      )}

      {view === 'clicker' && currentLocation && (
        <>
          {regionSave.championBeaten && (
            <div className="rebirth-banner">
              <p>Você já venceu o Campeão nesta run. Farme mais um pouco, ou faça rebirth quando quiser.</p>
              <button onClick={handleRebirth}>Rebirth</button>
            </div>
          )}
          <LocationNav
            location={currentLocation}
            prevLocation={prevLocation}
            nextLocation={nextLocation}
            lifetimeCandies={regionSave.lifetimeCandies}
            onTravel={handleTravel}
            gym={gymHere}
            hasBadge={gymHere ? hasBadge(regionSave, gymHere.id) : false}
            onChallengeGym={() => gymHere && handleChallengeGym(gymHere.id)}
            eliteFourAvailable={currentLocation.id === 'victory-road'}
            onChallengeEliteFour={handleChallengeEliteFour}
          />
          {wildEncounter && wildEntry && (
            <div className="wild-encounter-banner">
              <img src={wildEntry.sprite.local} alt={wildEntry.name} />
              <p>
                Um {wildEntry.name} selvagem apareceu! Nv.{wildEncounter.level} ({RARITY_LABELS[wildEncounter.tier]})
              </p>
              <div className="wild-encounter-actions">
                <button onClick={handleBattleWild}>Batalhar</button>
                <button onClick={handleIgnoreWild}>Ignorar</button>
              </div>
            </div>
          )}
          {offlineSummary && (
            <div className="offline-banner">
              <p>
                Enquanto você estava fora ({formatDuration(offlineSummary.elapsedMs)}), você ganhou{' '}
                {formatBigNumber(offlineSummary.candiesEarned)} doces.
              </p>
              <button onClick={() => setOfflineSummary(null)}>Continuar</button>
            </div>
          )}
          <div className="candy-counter">
            Saldo: {formatBigNumber(regionSave.candies)}
            <br />
            Acumulado: {formatBigNumber(regionSave.lifetimeCandies)}
          </div>
          {clickerEntry && clickerMember && (
            <p>
              {clickerEntry.name} Nv.{clickerMember.level} ({Math.floor(clickerMember.xp)}/
              {xpForNextLevel(clickerMember.level)} XP)
            </p>
          )}
          <div className="game-area">
            <button className="click-area" onClick={handleClick} disabled={!clickerEntry}>
              {clickerEntry && <img src={clickerEntry.sprite.local} alt={clickerEntry.name} />}
              {candyPops.map((pop) => (
                <span key={pop.id} className="candy-pop" style={{ '--pop-x': `${pop.x}px` } as CSSProperties}>
                  +{formatBigNumber(pop.gain)}
                </span>
              ))}
            </button>
            <UpgradesPanel regionDef={activeRegionDef} region={regionSave} onBuy={handleBuyUpgrade} costMultiplier={upgradeCostMultiplier(team)} />
          </div>
          {bonusBreakdown(team).length > 0 && (
            <ul className="type-bonuses">
              {bonusBreakdown(team).map((entry) => (
                <li key={entry.typeId}>
                  <TypeBadge type={entry.typeId} /> +{(entry.percent * 100).toFixed(0)}%{' '}
                  {entry.isLive ? '' : '(em breve) '}
                  {BONUS_KIND_LABELS[entry.bonusKind]}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  )
}

export default App
