import { useEffect, useRef, useState } from 'react'
import { GameLoop } from '../../../engine/gameLoop'
import { gradeByCount, type QteResult } from '../../../systems/battle/qte/grading'

const CRACK_COUNT = 4
const TIME_LIMIT_MS = 2_500

// "Clicar rachaduras pra quebrar o gelo antes do timer" (roadmap section 3).
export function IceQte({ onComplete }: { onComplete: (result: QteResult) => void }) {
  const [broken, setBroken] = useState<boolean[]>(Array(CRACK_COUNT).fill(false))
  const [msLeft, setMsLeft] = useState(TIME_LIMIT_MS)
  const brokenRef = useRef(0)
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
        onCompleteRef.current(gradeByCount(brokenRef.current, CRACK_COUNT, Math.ceil(CRACK_COUNT / 2)))
      }
    })
    loop.start()
    return () => {
      unsubscribe()
      loop.stop()
    }
  }, [])

  function handleCrack(index: number) {
    if (doneRef.current || broken[index]) return
    brokenRef.current += 1
    setBroken((current) => current.map((value, i) => (i === index ? true : value)))
  }

  return (
    <div className="qte-screen">
      <p>Quebre todas as rachaduras antes do gelo esfriar! ({Math.ceil(msLeft / 1000)}s)</p>
      <div className="qte-target-row">
        {broken.map((isBroken, index) => (
          <button
            key={index}
            className={`qte-target${isBroken ? ' qte-target--broken' : ''}`}
            onClick={() => handleCrack(index)}
            disabled={isBroken}
          />
        ))}
      </div>
    </div>
  )
}
