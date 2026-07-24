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
import { applyClick, clickValue } from './systems/economy/click'
import { buyUpgrade, totalCps } from './systems/economy/upgrades'
import { UpgradesPanel } from './ui/components/UpgradesPanel'

interface Gen1Entry {
  id: number
  name: string
  sprite: { url: string; local: string }
}

// Sprint 8 adds the new-game starter picker; until then it's fixed.
const PLACEHOLDER_STARTER_ID = 1
const AUTOSAVE_INTERVAL_MS = 10_000 // README: "salva a cada 10s"
const CANDY_POP_LIFETIME_MS = 700

function App() {
  const [gen1, setGen1] = useState<Gen1Entry[] | null>(null)
  const [save, setSave] = useState<SaveData>(() => loadSave())
  const saveRef = useRef(save)
  saveRef.current = save
  const uidRef = useRef<string | null>(null)
  const [candyPops, setCandyPops] = useState<{ id: number; x: number; gain: number }[]>([])
  const nextPopId = useRef(0)
  const [offlineSummary, setOfflineSummary] = useState<OfflineProgress | null>(null)

  // Computed once against the save as it was loaded from disk, before any
  // other effect (cloud sync, CPS ticking) touches it.
  useEffect(() => {
    const progress = calculateOfflineProgress(saveRef.current, Date.now(), totalCps(saveRef.current))
    if (progress.candiesEarned > 0) {
      setSave((current) => ({
        ...current,
        candies: current.candies + progress.candiesEarned,
        lifetimeCandies: current.lifetimeCandies + progress.candiesEarned,
      }))
    }
    if (shouldShowOfflineBanner(progress)) setOfflineSummary(progress)
  }, [])

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
      const cps = totalCps(saveRef.current)
      if (cps > 0) {
        const gain = (cps * deltaMs) / 1000
        setSave((current) => ({
          ...current,
          candies: current.candies + gain,
          lifetimeCandies: current.lifetimeCandies + gain,
        }))
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

  const starter = gen1?.find((entry) => entry.id === PLACEHOLDER_STARTER_ID) ?? null

  function handleClick() {
    const gain = clickValue(saveRef.current)
    setSave((current) => applyClick(current))

    const id = nextPopId.current++
    const x = Math.random() * 40 - 20
    setCandyPops((current) => [...current, { id, x, gain }])
    setTimeout(() => {
      setCandyPops((current) => current.filter((pop) => pop.id !== id))
    }, CANDY_POP_LIFETIME_MS)
  }

  function handleBuyUpgrade(id: string) {
    setSave((current) => buyUpgrade(current, id))
  }

  return (
    <main>
      <h1>PokéIdle</h1>
      {offlineSummary && (
        <div className="offline-banner">
          <p>
            Enquanto você estava fora ({formatDuration(offlineSummary.elapsedMs)}), você ganhou{' '}
            {formatBigNumber(offlineSummary.candiesEarned)} doces.
          </p>
          <button onClick={() => setOfflineSummary(null)}>Continuar</button>
        </div>
      )}
      <p>Doces (save v{save.version}): {formatBigNumber(save.candies)}</p>
      <div className="game-area">
        <button className="click-area" onClick={handleClick} disabled={!starter}>
          {starter && <img src={starter.sprite.local} alt={starter.name} />}
          {candyPops.map((pop) => (
            <span key={pop.id} className="candy-pop" style={{ '--pop-x': `${pop.x}px` } as CSSProperties}>
              +{formatBigNumber(pop.gain)}
            </span>
          ))}
        </button>
        <UpgradesPanel save={save} onBuy={handleBuyUpgrade} />
      </div>
    </main>
  )
}

export default App
