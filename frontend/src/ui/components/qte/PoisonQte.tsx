import { useEffect, useRef, useState } from 'react'
import { GameLoop } from '../../../engine/gameLoop'
import { gradeByCount, type QteResult } from '../../../systems/battle/qte/grading'

const BUBBLE_COUNT = 5
const BUBBLE_WINDOW_MS = 700

// "Estourar bolhas de veneno que sobem na tela" (roadmap section 3).
export function PoisonQte({ onComplete }: { onComplete: (result: QteResult) => void }) {
  const [bubble, setBubble] = useState<{ index: number; x: number } | null>(null)
  const [popped, setPopped] = useState(0)
  const poppedRef = useRef(0)
  const respondedRef = useRef(false)
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const loop = new GameLoop()
    let msInWindow = 0
    let index = 0
    setBubble({ index: 0, x: Math.random() * 80 + 10 })

    const unsubscribe = loop.subscribe((deltaMs) => {
      if (doneRef.current) return
      msInWindow += deltaMs
      if (msInWindow < BUBBLE_WINDOW_MS) return

      msInWindow = 0
      index += 1
      if (index >= BUBBLE_COUNT) {
        doneRef.current = true
        onCompleteRef.current(gradeByCount(poppedRef.current, BUBBLE_COUNT, Math.ceil(BUBBLE_COUNT / 2)))
        return
      }
      respondedRef.current = false
      setBubble({ index, x: Math.random() * 80 + 10 })
    })
    loop.start()
    return () => {
      unsubscribe()
      loop.stop()
    }
  }, [])

  function handlePop() {
    if (doneRef.current || respondedRef.current) return
    respondedRef.current = true
    poppedRef.current += 1
    setPopped(poppedRef.current)
  }

  return (
    <div className="qte-screen">
      <p>Estoure as bolhas de veneno assim que subirem!</p>
      <div className="qte-bubble-lane">
        {bubble && (
          <button key={bubble.index} className="qte-bubble" style={{ left: `${bubble.x}%` }} onClick={handlePop} />
        )}
      </div>
      <p className="qte-count">
        {popped}/{BUBBLE_COUNT}
      </p>
    </div>
  )
}
