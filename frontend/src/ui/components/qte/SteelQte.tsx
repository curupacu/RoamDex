import { useEffect, useRef, useState } from 'react'
import { GameLoop } from '../../../engine/gameLoop'
import { gradeByZone, type QteResult } from '../../../systems/battle/qte/grading'

const APPROACH_DURATION_MS = 1_400
const FULL_ZONE: [number, number] = [90, 100]
const PARTIAL_ZONE: [number, number] = [70, 100]

// "Parry: clicar no exato momento do ataque inimigo" (roadmap section 3).
export function SteelQte({ onComplete }: { onComplete: (result: QteResult) => void }) {
  const [progress, setProgress] = useState(0)
  const progressRef = useRef(0)
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const loop = new GameLoop()
    let elapsed = 0
    const unsubscribe = loop.subscribe((deltaMs) => {
      if (doneRef.current) return
      elapsed += deltaMs
      const value = Math.min(100, (elapsed / APPROACH_DURATION_MS) * 100)
      progressRef.current = value
      setProgress(value)
      if (elapsed >= APPROACH_DURATION_MS + 300) {
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
    onCompleteRef.current(gradeByZone(progressRef.current, FULL_ZONE, PARTIAL_ZONE))
  }

  return (
    <div className="qte-screen">
      <p>Aguarde e clique no exato momento do impacto!</p>
      <div className="qte-bar">
        <div className="qte-bar-zone" style={{ left: `${PARTIAL_ZONE[0]}%`, width: `${100 - PARTIAL_ZONE[0]}%` }} />
        <div className="qte-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <button className="qte-action-button" onClick={handleClick}>
        Parry!
      </button>
    </div>
  )
}
