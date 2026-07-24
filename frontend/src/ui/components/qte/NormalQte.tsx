import { useEffect, useRef, useState } from 'react'
import { GameLoop } from '../../../engine/gameLoop'
import { gradeByOffset, type QteResult } from '../../../systems/battle/qte/grading'

const BEAT_INTERVAL_MS = 500
const BEAT_COUNT = 4
const FULL_WITHIN_MS = 120
const PARTIAL_WITHIN_MS = 250

// "Clique ritmado: manter o ritmo do medidor" (roadmap section 3). Graded
// by average distance from each tap to the nearest beat.
export function NormalQte({ onComplete }: { onComplete: (result: QteResult) => void }) {
  const [pulseCount, setPulseCount] = useState(0)
  const offsetsRef = useRef<number[]>([])
  const elapsedRef = useRef(0)
  const nextBeatIndexRef = useRef(1)
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const loop = new GameLoop()
    const unsubscribe = loop.subscribe((deltaMs) => {
      if (doneRef.current) return
      elapsedRef.current += deltaMs

      if (elapsedRef.current >= nextBeatIndexRef.current * BEAT_INTERVAL_MS) {
        setPulseCount(nextBeatIndexRef.current)
        nextBeatIndexRef.current += 1
      }

      if (elapsedRef.current >= BEAT_INTERVAL_MS * (BEAT_COUNT + 1)) {
        doneRef.current = true
        const offsets = offsetsRef.current
        if (offsets.length === 0) {
          onCompleteRef.current('weak')
          return
        }
        const avg = offsets.reduce((sum, value) => sum + value, 0) / offsets.length
        onCompleteRef.current(gradeByOffset(avg, FULL_WITHIN_MS, PARTIAL_WITHIN_MS))
      }
    })
    loop.start()
    return () => {
      unsubscribe()
      loop.stop()
    }
  }, [])

  function handleTap() {
    if (doneRef.current) return
    const nearestBeat = Math.round(elapsedRef.current / BEAT_INTERVAL_MS) * BEAT_INTERVAL_MS
    offsetsRef.current.push(Math.abs(elapsedRef.current - nearestBeat))
  }

  return (
    <div className="qte-screen">
      <p>Clique no ritmo!</p>
      <div key={pulseCount} className="qte-beat-pulse" />
      <button className="qte-action-button" onClick={handleTap}>
        Atacar!
      </button>
    </div>
  )
}
