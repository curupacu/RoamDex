import { useEffect, useRef, useState } from 'react'
import { GameLoop } from '../../../engine/gameLoop'
import { gradeByCount, type QteResult } from '../../../systems/battle/qte/grading'

const SWEEP_COUNT = 3
const SWEEP_DURATION_MS = 900

// "Seguir e clicar um alvo em movimento" (roadmap section 3).
export function FlyingQte({ onComplete }: { onComplete: (result: QteResult) => void }) {
  const [position, setPosition] = useState(0)
  const [hits, setHits] = useState(0)
  const hitsRef = useRef(0)
  const hitThisSweepRef = useRef(false)
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const loop = new GameLoop()
    let elapsed = 0
    let currentSweep = 0
    const unsubscribe = loop.subscribe((deltaMs) => {
      if (doneRef.current) return
      elapsed += deltaMs

      const sweepsDone = Math.floor(elapsed / SWEEP_DURATION_MS)
      if (sweepsDone >= SWEEP_COUNT) {
        doneRef.current = true
        onCompleteRef.current(gradeByCount(hitsRef.current, SWEEP_COUNT, Math.ceil(SWEEP_COUNT / 2)))
        return
      }
      if (sweepsDone !== currentSweep) {
        currentSweep = sweepsDone
        hitThisSweepRef.current = false
      }

      const progress = (elapsed % SWEEP_DURATION_MS) / SWEEP_DURATION_MS
      const bounce = Math.abs(Math.sin(progress * Math.PI))
      setPosition(bounce * 90)
    })
    loop.start()
    return () => {
      unsubscribe()
      loop.stop()
    }
  }, [])

  function handleClick() {
    if (doneRef.current || hitThisSweepRef.current) return
    hitThisSweepRef.current = true
    hitsRef.current += 1
    setHits(hitsRef.current)
  }

  return (
    <div className="qte-screen">
      <p>Clique o alvo enquanto ele voa!</p>
      <div className="qte-flying-lane">
        <button className="qte-flying-target" style={{ left: `${position}%` }} onClick={handleClick} />
      </div>
      <p className="qte-count">
        {hits}/{SWEEP_COUNT}
      </p>
    </div>
  )
}
