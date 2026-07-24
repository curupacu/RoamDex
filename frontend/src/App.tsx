import { useEffect, useRef, useState } from 'react'
import { GameLoop } from './engine/gameLoop'
import { formatBigNumber } from './engine/numberFormat'
import { loadSave, writeSave, type SaveData } from './engine/save'
import { ensureSignedIn } from './services/auth'
import { fetchCloudSave, pushCloudSave, resolveSync } from './services/cloudSave'

interface Gen1Entry {
  id: number
  name: string
}

const CANDIES_PER_SECOND = 1
const AUTOSAVE_INTERVAL_MS = 10_000 // README: "salva a cada 10s"

function App() {
  const [gen1Count, setGen1Count] = useState<number | null>(null)
  const [save, setSave] = useState<SaveData>(() => loadSave())
  const saveRef = useRef(save)
  saveRef.current = save
  const uidRef = useRef<string | null>(null)

  useEffect(() => {
    fetch('/data/gen1.json')
      .then((res) => res.json() as Promise<Gen1Entry[]>)
      .then((data) => setGen1Count(data.length))
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
      setSave((current) => ({ ...current, candies: current.candies + (CANDIES_PER_SECOND * deltaMs) / 1000 }))

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

  return (
    <main>
      <h1>PokéIdle</h1>
      <p>gen1.json carregado: {gen1Count ?? '...'} Pokémon</p>
      <p>Doces (save v{save.version}, ticking @{CANDIES_PER_SECOND}/s): {formatBigNumber(save.candies)}</p>
    </main>
  )
}

export default App
