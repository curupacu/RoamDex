import { useEffect, useRef, useState } from 'react'
import { GameLoop } from '../../../engine/gameLoop'
import { gradeByZone, type QteResult } from '../../../systems/battle/qte/grading'

const SHRINK_DURATION_MS = 1_800
const TARGET_SIZE = 40
const FULL_ZONE: [number, number] = [TARGET_SIZE - 6, TARGET_SIZE + 6]
const PARTIAL_ZONE: [number, number] = [TARGET_SIZE - 16, TARGET_SIZE + 16]

// "Anéis que encolhem; clicar quando o anel cruza o alvo" (roadmap section 3).
export function DragonQte({ onComplete }: { onComplete: (result: QteResult) => void }) {
  const [ringSize, setRingSize] = useState(100)
  const ringSizeRef = useRef(100)
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const loop = new GameLoop()
    let elapsed = 0
    const unsubscribe = loop.subscribe((deltaMs) => {
      if (doneRef.current) return
      elapsed += deltaMs
      const size = Math.max(TARGET_SIZE - 30, 100 - (elapsed / SHRINK_DURATION_MS) * 100)
      ringSizeRef.current = size
      setRingSize(size)
      if (elapsed >= SHRINK_DURATION_MS + 500) {
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
    onCompleteRef.current(gradeByZone(ringSizeRef.current, FULL_ZONE, PARTIAL_ZONE))
  }

  return (
    <div className="qte-screen">
      <p>Clique quando o anel cruzar o alvo!</p>
      <div className="qte-dragon-lane">
        <div className="qte-dragon-target" style={{ width: `${TARGET_SIZE}px`, height: `${TARGET_SIZE}px` }} />
        <div
          className="qte-dragon-ring"
          style={{ width: `${ringSize}px`, height: `${ringSize}px` }}
          onClick={handleClick}
        />
      </div>
      <button className="qte-action-button" onClick={handleClick}>
        Atacar!
      </button>
    </div>
  )
}
