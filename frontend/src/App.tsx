import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { GameLoop } from './engine/gameLoop'
import { formatBigNumber } from './engine/numberFormat'
import {
  calculateOfflineProgress,
  formatDuration,
  shouldShowOfflineBanner,
  type OfflineProgress,
} from './engine/offlineProgress'
import { loadSave, writeSave, type SaveData } from './engine/save'
import { ensureSignedIn } from './services/auth'
import { fetchCloudSave, pushCloudSave, resolveSync } from './services/cloudSave'
import { STARTER_LEVEL } from './content/gen1/starters'
import type { Gen1Entry } from './content/gen1/types'
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
import { AdminScreen } from './ui/screens/AdminScreen'
import { BattleScreen } from './ui/screens/BattleScreen'
import { CandyShopScreen } from './ui/screens/CandyShopScreen'
import { TypeBadge } from './ui/components/TypeBadge'
import { UpgradesPanel } from './ui/components/UpgradesPanel'
import { NewGameScreen } from './ui/screens/NewGameScreen'
import { PokedexScreen } from './ui/screens/PokedexScreen'
import { TeamScreen } from './ui/screens/TeamScreen'

const AUTOSAVE_INTERVAL_MS = 10_000 // README: "salva a cada 10s"
const CANDY_POP_LIFETIME_MS = 700

type View = 'clicker' | 'team' | 'pokedex' | 'shop' | 'battle' | 'admin'

function App() {
  const [gen1, setGen1] = useState<Gen1Entry[] | null>(null)
  const gen1Ref = useRef(gen1)
  gen1Ref.current = gen1
  const [save, setSave] = useState<SaveData>(() => loadSave())
  const saveRef = useRef(save)
  saveRef.current = save
  const uidRef = useRef<string | null>(null)
  const [candyPops, setCandyPops] = useState<{ id: number; x: number; gain: number }[]>([])
  const nextPopId = useRef(0)
  const [offlineSummary, setOfflineSummary] = useState<OfflineProgress | null>(null)
  const offlineAppliedRef = useRef(false)
  const [view, setView] = useState<View>('clicker')
  const [wildEncounter, setWildEncounter] = useState<WildEncounter | null>(null)
  const wildEncounterRef = useRef(wildEncounter)
  wildEncounterRef.current = wildEncounter

  // Index 0 is the one you click/battle with (roadmap section 4, "1v1 com troca").
  const clickerEntry = gen1?.find((entry) => entry.id === save.activeTeamIds[0]) ?? null
  const clickerMember = clickerEntry ? rosterMember(save, clickerEntry.id) : null
  const wildEntry = wildEncounter ? (gen1?.find((entry) => entry.id === wildEncounter.speciesId) ?? null) : null
  const team: TeamMember[] = save.activeTeamIds
    .map((id) => gen1?.find((entry) => entry.id === id))
    .filter((entry): entry is Gen1Entry => entry !== undefined)
    .map((entry) => ({ types: entry.types }))
  const teamRef = useRef(team)
  teamRef.current = team

  // Runs once gen1 has loaded (so the team's type bonuses are known),
  // against the save as read from disk before any other effect touches it.
  useEffect(() => {
    if (!gen1 || offlineAppliedRef.current) return
    offlineAppliedRef.current = true

    const cps = totalCps(saveRef.current, economyMultiplier(teamRef.current, 'cps'))
    const progress = calculateOfflineProgress(saveRef.current, Date.now(), cps)
    if (progress.candiesEarned > 0) {
      setSave((current) => ({
        ...current,
        candies: current.candies + progress.candiesEarned,
        lifetimeCandies: current.lifetimeCandies + progress.candiesEarned,
      }))
    }

    const xpPerSecond = totalXpPerSecond(saveRef.current) * xpMultiplierFromBuffs(saveRef.current, Date.now())
    if (xpPerSecond > 0) {
      const xpGain = (xpPerSecond * progress.elapsedMs) / 1000
      setSave((current) => gainTeamXp(current, gen1, xpGain))
    }

    if (shouldShowOfflineBanner(progress)) setOfflineSummary(progress)
  }, [gen1])

  useEffect(() => {
    fetch('/data/gen1.json')
      .then((res) => res.json() as Promise<Gen1Entry[]>)
      .then(setGen1)
  }, [])

  // Cloud sync runs in the background and never blocks the game loop —
  // if it fails (offline, missing config), the game keeps running 100% local.
  useEffect(() => {
    ensureSignedIn()
      .then(async (user) => {
        uidRef.current = user.uid
        const cloud = await fetchCloudSave(user.uid)
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
      const cps = totalCps(saveRef.current, economyMultiplier(teamRef.current, 'cps'))
      if (cps > 0) {
        const gain = (cps * deltaMs) / 1000
        setSave((current) => ({
          ...current,
          candies: current.candies + gain,
          lifetimeCandies: current.lifetimeCandies + gain,
        }))
      }

      const xpPerSecond = totalXpPerSecond(saveRef.current) * xpMultiplierFromBuffs(saveRef.current, Date.now())
      if (xpPerSecond > 0) {
        const xpGain = (xpPerSecond * deltaMs) / 1000
        setSave((current) => gainTeamXp(current, gen1Ref.current ?? [], xpGain))
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
  // section 5). Voador's wildSpawnRate bonus shortens the interval; Inseto's
  // rareWildChance biases which species spawns. Only one encounter at a
  // time; a second timer auto-dismisses it if ignored too long.
  useEffect(() => {
    const loop = new GameLoop()
    let msUntilSpawn = BASE_SPAWN_INTERVAL_MS

    const unsubscribe = loop.subscribe((deltaMs) => {
      const currentGen1 = gen1Ref.current
      if (wildEncounterRef.current || saveRef.current.roster.length === 0 || !currentGen1?.length) return

      const spawnRateMultiplier = economyMultiplier(teamRef.current, 'wildSpawnRate')
      msUntilSpawn -= deltaMs * spawnRateMultiplier
      if (msUntilSpawn <= 0) {
        msUntilSpawn = BASE_SPAWN_INTERVAL_MS
        const rareBonus = economyMultiplier(teamRef.current, 'rareWildChance')
        setWildEncounter(spawnWildEncounter(currentGen1, saveRef.current.lifetimeCandies, rareBonus))
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

  function handleChooseStarter(speciesId: number) {
    setSave((current) => addToRoster(current, speciesId, STARTER_LEVEL))
  }

  function handleToggleTeamMember(speciesId: number) {
    setSave((current) => toggleActiveTeamMember(current, speciesId))
  }

  function handleClick() {
    const multiplier = economyMultiplier(team, 'clickCandies')
    const gain = clickValue(saveRef.current, multiplier)
    setSave((current) => applyClick(current, multiplier))

    const id = nextPopId.current++
    const x = Math.random() * 40 - 20
    setCandyPops((current) => [...current, { id, x, gain }])
    setTimeout(() => {
      setCandyPops((current) => current.filter((pop) => pop.id !== id))
    }, CANDY_POP_LIFETIME_MS)
  }

  function handleBuyUpgrade(id: string) {
    setSave((current) => buyUpgrade(current, id, upgradeCostMultiplier(team)))
  }

  function handleBuyRareCandy(speciesId: number) {
    setSave((current) => buyRareCandy(current, gen1Ref.current ?? [], speciesId))
  }

  function handleBuyXpBoost() {
    setSave((current) => buyXpBoost(current, Date.now()))
  }

  // Grants XP right away, whether the player then captures, loots, or the
  // battle was just the "Batalha" tab's fixed test dummy.
  function handleVictory(activeSpeciesId: number) {
    setSave((current) => {
      const withTeamXp = gainTeamXp(current, gen1Ref.current ?? [], BATTLE_XP_TEAM)
      return gainMemberXp(withTeamXp, gen1Ref.current ?? [], activeSpeciesId, BATTLE_XP_ACTIVE_BONUS)
    })
  }

  function handleExitBattle() {
    setWildEncounter(null)
    setView('clicker')
  }

  function handleBattleWild() {
    setView('battle')
  }

  function handleIgnoreWild() {
    setWildEncounter(null)
  }

  // "Falhou a bola → o Pokémon foge" (roadmap section 6) — a single roll,
  // no second chance. Doesn't clear wildEncounter itself: BattleScreen
  // still needs it to show the result, onExit clears it once dismissed.
  function handleCaptureWild(): string {
    const encounter = wildEncounterRef.current
    const entry = encounter ? (gen1Ref.current?.find((candidate) => candidate.id === encounter.speciesId) ?? null) : null
    if (!encounter || !entry) return ''

    // The roster can't hold two of the same species yet — be honest about
    // it instead of claiming a capture that doesn't actually change anything.
    if (isCaptured(saveRef.current, entry.id)) return `Você já tem um ${entry.name}!`

    const success = rollCapture(entry.captureRate, economyMultiplier(teamRef.current, 'captureChance'))
    if (success) setSave((current) => addToRoster(current, entry.id, encounter.level))
    return success ? `${entry.name} foi capturado!` : `A Pokébola falhou... ${entry.name} fugiu!`
  }

  function handleLootWild(): string {
    const encounter = wildEncounterRef.current
    if (!encounter) return ''

    const result = rollLoot(saveRef.current, encounter.level)
    setSave((current) => applyLoot(current, result))
    return result.kind === 'candies'
      ? `Você achou ${formatBigNumber(result.amount)} doces!`
      : `Você achou uma cópia grátis de ${result.upgradeName}!`
  }

  // --- Admin (temporary, for manual testing — see AdminScreen.tsx) ---
  function handleAdminAddCandies(amount: number) {
    setSave((current) => ({ ...current, candies: current.candies + amount, lifetimeCandies: current.lifetimeCandies + amount }))
  }

  function handleAdminAddToRoster(speciesId: number, level: number) {
    setSave((current) => addToRoster(current, speciesId, level))
  }

  function handleAdminForceEncounter(speciesId: number) {
    const entry = gen1Ref.current?.find((candidate) => candidate.id === speciesId)
    if (!entry) return
    setWildEncounter({ speciesId, level: 10, tier: rarityTier(entry.captureRate) })
  }

  function handleAdminSetActiveLevel(level: number) {
    const activeId = saveRef.current.activeTeamIds[0]
    if (!activeId) return
    setSave((current) => ({
      ...current,
      roster: current.roster.map((member) => (member.speciesId === activeId ? { ...member, level, xp: 0 } : member)),
    }))
  }

  if (!gen1) {
    return (
      <main>
        <h1>PokéIdle</h1>
        <p>Carregando...</p>
      </main>
    )
  }

  if (save.roster.length === 0) {
    return (
      <main>
        <h1>PokéIdle</h1>
        <NewGameScreen gen1={gen1} onChoose={handleChooseStarter} />
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
        <button onClick={() => setView('battle')} disabled={view === 'battle'}>
          Batalha
        </button>
        <button onClick={() => setView('admin')} disabled={view === 'admin'}>
          Admin
        </button>
      </nav>

      {view === 'admin' && (
        <AdminScreen
          gen1={gen1}
          save={save}
          onAddCandies={handleAdminAddCandies}
          onAddToRoster={handleAdminAddToRoster}
          onForceEncounter={handleAdminForceEncounter}
          onSetActiveLevel={handleAdminSetActiveLevel}
        />
      )}
      {view === 'team' && <TeamScreen gen1={gen1} save={save} onToggle={handleToggleTeamMember} />}
      {view === 'pokedex' && <PokedexScreen gen1={gen1} save={save} />}
      {view === 'shop' && (
        <CandyShopScreen
          gen1={gen1}
          save={save}
          now={Date.now()}
          onBuyRareCandy={handleBuyRareCandy}
          onBuyXpBoost={handleBuyXpBoost}
        />
      )}
      {view === 'battle' && (
        <BattleScreen
          gen1={gen1}
          save={save}
          opponent={wildEncounter ? { speciesId: wildEncounter.speciesId, level: wildEncounter.level } : undefined}
          onVictory={handleVictory}
          onCapture={handleCaptureWild}
          onLoot={handleLootWild}
          onExit={handleExitBattle}
        />
      )}

      {view === 'clicker' && (
        <>
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
            Saldo: {formatBigNumber(save.candies)}
            <br />
            Acumulado: {formatBigNumber(save.lifetimeCandies)}
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
            <UpgradesPanel save={save} onBuy={handleBuyUpgrade} costMultiplier={upgradeCostMultiplier(team)} />
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
