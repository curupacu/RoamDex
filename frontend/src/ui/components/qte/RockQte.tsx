import { useEffect, useRef, useState } from 'react'
import { GameLoop } from '../../../engine/gameLoop'
import { gradeByZone, type QteResult } from '../../../systems/battle/qte/grading'

const HOLD_DURATION_MS = 1_800
const SHAKE_INTERVAL_MS = 250
const FULL_ZONE: [number, number] = [90, 100]
const PARTIAL_ZONE: [number, number] = [50, 100]

// "Segurar firme: manter o dedo/botão numa zona que treme" (roadmap
// section 3). The "tremor" nudges the target zone; releasing too early
// (or never holding) costs progress.
export function RockQte({ onComplete }: { onComplete: (result: QteResult) => void }) {
  const [heldPercent, setHeldPercent] = useState(0)
  const [shakeOffset, setShakeOffset] = useState(0)
  const holdingRef = useRef(false)
  const heldMsRef = useRef(0)
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const loop = new GameLoop()
    let elapsed = 0
    const unsubscribe = loop.subscribe((deltaMs) => {
      if (doneRef.current) return
      elapsed += deltaMs
      setShakeOffset(Math.sin(elapsed / SHAKE_INTERVAL_MS) * 8)

      if (holdingRef.current) {
        heldMsRef.current = Math.min(HOLD_DURATION_MS, heldMsRef.current + deltaMs)
      } else {
        heldMsRef.current = Math.max(0, heldMsRef.current - deltaMs * 1.5)
      }
      setHeldPercent((heldMsRef.current / HOLD_DURATION_MS) * 100)

      if (heldMsRef.current >= HOLD_DURATION_MS || elapsed >= HOLD_DURATION_MS * 3) {
        doneRef.current = true
        onCompleteRef.current(gradeByZone((heldMsRef.current / HOLD_DURATION_MS) * 100, FULL_ZONE, PARTIAL_ZONE))
      }
    })
    loop.start()
    return () => {
      unsubscribe()
      loop.stop()
    }
  }, [])

  return (
    <div className="qte-screen">
      <p>Segure firme apesar do tremor!</p>
      <div className="qte-bar">
        <div className="qte-bar-fill" style={{ width: `${heldPercent}%` }} />
      </div>
      <button
        className="qte-action-button"
        style={{ transform: `translateX(${shakeOffset}px)` }}
        onPointerDown={() => {
          holdingRef.current = true
        }}
        onPointerUp={() => {
          holdingRef.current = false
        }}
        onPointerLeave={() => {
          holdingRef.current = false
        }}
      >
        Segurar
      </button>
    </div>
  )
}
