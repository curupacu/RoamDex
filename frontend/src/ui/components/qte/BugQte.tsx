import { useEffect, useRef, useState } from 'react'
import { GameLoop } from '../../../engine/gameLoop'
import { gradeByCount, type QteResult } from '../../../systems/battle/qte/grading'

const TARGET_COUNT = 6
const TIME_LIMIT_MS = 2_500

// "Vários alvos pequenos simultâneos; limpar todos" (roadmap section 3).
export function BugQte({ onComplete }: { onComplete: (result: QteResult) => void }) {
  const [cleared, setCleared] = useState<boolean[]>(Array(TARGET_COUNT).fill(false))
  const [msLeft, setMsLeft] = useState(TIME_LIMIT_MS)
  const clearedRef = useRef(0)
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const loop = new GameLoop()
    let remaining = TIME_LIMIT_MS
    const unsubscribe = loop.subscribe((deltaMs) => {
      if (doneRef.current) return
      remaining -= deltaMs
      setMsLeft(Math.max(0, remaining))
      if (remaining <= 0) {
        doneRef.current = true
        onCompleteRef.current(gradeByCount(clearedRef.current, TARGET_COUNT, Math.ceil(TARGET_COUNT / 2)))
      }
    })
    loop.start()
    return () => {
      unsubscribe()
      loop.stop()
    }
  }, [])

  function handleClear(index: number) {
    if (doneRef.current || cleared[index]) return
    clearedRef.current += 1
    setCleared((current) => current.map((value, i) => (i === index ? true : value)))
  }

  return (
    <div className="qte-screen">
      <p>Limpe todos os insetinhos! ({Math.ceil(msLeft / 1000)}s)</p>
      <div className="qte-target-grid">
        {cleared.map((isCleared, index) => (
          <button
            key={index}
            className={`qte-small-target${isCleared ? ' qte-small-target--cleared' : ''}`}
            onClick={() => handleClear(index)}
            disabled={isCleared}
          />
        ))}
      </div>
    </div>
  )
}
