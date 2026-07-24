import { useEffect, useRef, useState } from 'react'
import { GameLoop } from '../../../engine/gameLoop'
import { gradeByCount, type QteResult } from '../../../systems/battle/qte/grading'

const MASH_DURATION_MS = 3_000
const FULL_AT = 15
const PARTIAL_AT = 8

// "Mash: clicar o máximo em 3s pra 'soprar as chamas'" (roadmap section 3).
export function FireQte({ onComplete }: { onComplete: (result: QteResult) => void }) {
  const [taps, setTaps] = useState(0)
  const [msLeft, setMsLeft] = useState(MASH_DURATION_MS)
  const tapsRef = useRef(0)
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const loop = new GameLoop()
    let remaining = MASH_DURATION_MS
    const unsubscribe = loop.subscribe((deltaMs) => {
      if (doneRef.current) return
      remaining -= deltaMs
      setMsLeft(Math.max(0, remaining))
      if (remaining <= 0) {
        doneRef.current = true
        onCompleteRef.current(gradeByCount(tapsRef.current, FULL_AT, PARTIAL_AT))
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
    tapsRef.current += 1
    setTaps(tapsRef.current)
  }

  return (
    <div className="qte-screen">
      <p>Clique o máximo que puder! ({Math.ceil(msLeft / 1000)}s)</p>
      <p className="qte-count">{taps}</p>
      <button className="qte-action-button" onClick={handleTap}>
        Atacar!
      </button>
    </div>
  )
}
