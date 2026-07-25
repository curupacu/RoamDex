import { useEffect, useRef, useState } from 'react'
import { GameLoop } from '../../../engine/gameLoop'
import { gradeByCount, type QteResult } from '../../../systems/battle/qte/grading'

const FLASH_COUNT = 4
const FLASH_WINDOW_MS = 550

// "Tela escurece; clicar no brilho que pisca" (roadmap section 3).
// Lazy initializer instead of useState(null) + setFlash() inside the
// effect — that gap (blank on the first render, position set only once the
// effect fires a render later) was the "flicada ao surgir" bug: the target
// popped in a beat after the modal, sometimes at a different spot than
// what the player had already started aiming for.
function randomFlash(index: number): { index: number; x: number; y: number } {
  return { index, x: Math.random() * 80 + 10, y: Math.random() * 60 + 20 }
}

export function DarkQte({ onComplete }: { onComplete: (result: QteResult) => void }) {
  const [flash, setFlash] = useState(() => randomFlash(0))
  const [hits, setHits] = useState(0)
  const hitsRef = useRef(0)
  const respondedRef = useRef(false)
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const loop = new GameLoop()
    let msInWindow = 0
    let index = 0

    const unsubscribe = loop.subscribe((deltaMs) => {
      if (doneRef.current) return
      msInWindow += deltaMs
      if (msInWindow < FLASH_WINDOW_MS) return

      msInWindow = 0
      index += 1
      if (index >= FLASH_COUNT) {
        doneRef.current = true
        onCompleteRef.current(gradeByCount(hitsRef.current, FLASH_COUNT, Math.ceil(FLASH_COUNT / 2)))
        return
      }
      respondedRef.current = false
      setFlash(randomFlash(index))
    })
    loop.start()
    return () => {
      unsubscribe()
      loop.stop()
    }
  }, [])

  function handleFlashClick() {
    if (doneRef.current || respondedRef.current) return
    respondedRef.current = true
    hitsRef.current += 1
    setHits(hitsRef.current)
  }

  return (
    <div className="qte-screen">
      <p>A tela escurece — clique no brilho que pisca!</p>
      <div className="qte-dark-lane">
        <button
          key={flash.index}
          className="qte-dark-flash"
          style={{ left: `${flash.x}%`, top: `${flash.y}%` }}
          onClick={handleFlashClick}
        />
      </div>
      <p className="qte-count">
        {hits}/{FLASH_COUNT}
      </p>
    </div>
  )
}
