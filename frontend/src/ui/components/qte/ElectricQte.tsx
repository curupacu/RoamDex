import { useEffect, useRef, useState } from 'react'
import { GameLoop } from '../../../engine/gameLoop'
import { gradeByCount, type QteResult } from '../../../systems/battle/qte/grading'

const TARGET_COUNT = 4
const WINDOW_MS = 600

// "4 alvos acendem em sequência rápida; clicar cada um" (roadmap section 3).
export function ElectricQte({ onComplete }: { onComplete: (result: QteResult) => void }) {
  const [activeTarget, setActiveTarget] = useState(0)
  const [hits, setHits] = useState(0)
  const hitsRef = useRef(0)
  const respondedRef = useRef(false)
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const loop = new GameLoop()
    let msInWindow = 0
    let target = 0
    const unsubscribe = loop.subscribe((deltaMs) => {
      if (doneRef.current) return
      msInWindow += deltaMs
      if (msInWindow < WINDOW_MS) return

      msInWindow = 0
      target += 1
      if (target >= TARGET_COUNT) {
        doneRef.current = true
        onCompleteRef.current(gradeByCount(hitsRef.current, TARGET_COUNT, Math.ceil(TARGET_COUNT / 2)))
        return
      }
      respondedRef.current = false
      setActiveTarget(target)
    })
    loop.start()
    return () => {
      unsubscribe()
      loop.stop()
    }
  }, [])

  function handleTargetClick(index: number) {
    if (doneRef.current || respondedRef.current || index !== activeTarget) return
    respondedRef.current = true
    hitsRef.current += 1
    setHits(hitsRef.current)
  }

  return (
    <div className="qte-screen">
      <p>Clique cada alvo assim que ele acender!</p>
      <div className="qte-target-row">
        {Array.from({ length: TARGET_COUNT }, (_, index) => (
          <button
            key={index}
            className={`qte-target${index === activeTarget ? ' qte-target--lit' : ''}`}
            onClick={() => handleTargetClick(index)}
          />
        ))}
      </div>
      <p className="qte-count">
        {hits}/{TARGET_COUNT}
      </p>
    </div>
  )
}
