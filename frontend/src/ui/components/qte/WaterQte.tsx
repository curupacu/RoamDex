import { useEffect, useRef, useState } from 'react'
import { GameLoop } from '../../../engine/gameLoop'
import { gradeByZone, type QteResult } from '../../../systems/battle/qte/grading'

const WAVE_PERIOD_MS = 900
const TIMEOUT_MS = 3_000
const FULL_ZONE: [number, number] = [85, 100]
const PARTIAL_ZONE: [number, number] = [55, 100]

// "Barra oscilando como onda; clicar no pico" (roadmap section 3).
export function WaterQte({ onComplete }: { onComplete: (result: QteResult) => void }) {
  const [value, setValue] = useState(50)
  const valueRef = useRef(50)
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const loop = new GameLoop()
    let elapsed = 0
    const unsubscribe = loop.subscribe((deltaMs) => {
      if (doneRef.current) return
      elapsed += deltaMs
      const wave = 50 + 50 * Math.sin((elapsed / WAVE_PERIOD_MS) * Math.PI * 2)
      valueRef.current = wave
      setValue(wave)
      if (elapsed >= TIMEOUT_MS) {
        doneRef.current = true
        onCompleteRef.current('weak')
      }
    })
    loop.start()
    return () => {
      unsubscribe()
      loop.stop()
    }
  }, [])

  function handleClick() {
    if (doneRef.current) return
    doneRef.current = true
    onComplete(gradeByZone(valueRef.current, FULL_ZONE, PARTIAL_ZONE))
  }

  return (
    <div className="qte-screen">
      <p>Clique quando a onda estiver no pico!</p>
      <div className="qte-bar qte-bar--wave">
        <div className="qte-wave-marker" style={{ left: `${value}%` }} />
      </div>
      <button className="qte-action-button" onClick={handleClick}>
        Atacar!
      </button>
    </div>
  )
}
