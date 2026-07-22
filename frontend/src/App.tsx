import { useEffect, useRef, useState } from 'react'
import { GameLoop } from './engine/gameLoop'
import { formatBigNumber } from './engine/numberFormat'
import { loadSave, writeSave, type SaveData } from './engine/save'

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

  useEffect(() => {
    fetch('/data/gen1.json')
      .then((res) => res.json() as Promise<Gen1Entry[]>)
      .then((data) => setGen1Count(data.length))
  }, [])

  useEffect(() => {
    const loop = new GameLoop()
    let msSinceSave = 0

    const unsubscribe = loop.subscribe((deltaMs) => {
      setSave((current) => ({ ...current, candies: current.candies + (CANDIES_PER_SECOND * deltaMs) / 1000 }))

      msSinceSave += deltaMs
      if (msSinceSave >= AUTOSAVE_INTERVAL_MS) {
        msSinceSave = 0
        writeSave(saveRef.current)
      }
    })
    loop.start()

    const saveOnExit = () => writeSave(saveRef.current)
    window.addEventListener('beforeunload', saveOnExit)

    return () => {
      unsubscribe()
      loop.stop()
      window.removeEventListener('beforeunload', saveOnExit)
      saveOnExit()
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
