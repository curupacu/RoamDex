import { useEffect, useRef, useState } from 'react'
import { GameLoop } from '../../../engine/gameLoop'
import { gradeByZone, type QteResult } from '../../../systems/battle/qte/grading'

const CHARGE_DURATION_MS = 1_200
const FULL_ZONE: [number, number] = [60, 90]
const PARTIAL_ZONE: [number, number] = [35, 100]

// "Segurar pra carregar, soltar na zona verde da barra" (roadmap section 3).
export function GrassQte({ onComplete }: { onComplete: (result: QteResult) => void }) {
  const [charge, setCharge] = useState(0)
  const chargeRef = useRef(0)
  const holdingRef = useRef(false)
  const doneRef = useRef(false)

  useEffect(() => {
    const loop = new GameLoop()
    const unsubscribe = loop.subscribe((deltaMs) => {
      if (!holdingRef.current || doneRef.current) return
      chargeRef.current = Math.min(100, chargeRef.current + (deltaMs / CHARGE_DURATION_MS) * 100)
      setCharge(chargeRef.current)
    })
    loop.start()
    return () => {
      unsubscribe()
      loop.stop()
    }
  }, [])

  function handleRelease() {
    if (doneRef.current || !holdingRef.current) return
    holdingRef.current = false
    doneRef.current = true
    onComplete(gradeByZone(chargeRef.current, FULL_ZONE, PARTIAL_ZONE))
  }

  return (
    <div className="qte-screen">
      <p>Segure e solte na zona verde!</p>
      <div className="qte-bar">
        <div className="qte-bar-zone" style={{ left: `${FULL_ZONE[0]}%`, width: `${FULL_ZONE[1] - FULL_ZONE[0]}%` }} />
        <div className="qte-bar-fill" style={{ width: `${charge}%` }} />
      </div>
      <button
        className="qte-action-button"
        onPointerDown={() => {
          holdingRef.current = true
        }}
        onPointerUp={handleRelease}
        onPointerLeave={handleRelease}
      >
        Segurar
      </button>
    </div>
  )
}
