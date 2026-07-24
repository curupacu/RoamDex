import { useEffect, useRef, useState } from 'react'
import { GameLoop } from '../../../engine/gameLoop'
import { gradeByCount, type QteResult } from '../../../systems/battle/qte/grading'

const APPEARANCE_COUNT = 4
const VISIBLE_MS = 500
const HIDDEN_MS = 300

// "Alvo que some e reaparece; clicar antes de sumir" (roadmap section 3).
export function GhostQte({ onComplete }: { onComplete: (result: QteResult) => void }) {
  const [visible, setVisible] = useState(false)
  const [hits, setHits] = useState(0)
  const hitsRef = useRef(0)
  const respondedRef = useRef(false)
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const loop = new GameLoop()
    let elapsed = 0
    let appearance = 0
    let phaseStart = 0
    let inVisiblePhase = true
    setVisible(true)

    const unsubscribe = loop.subscribe((deltaMs) => {
      if (doneRef.current) return
      elapsed += deltaMs
      const phaseDuration = inVisiblePhase ? VISIBLE_MS : HIDDEN_MS

      if (elapsed - phaseStart >= phaseDuration) {
        phaseStart = elapsed
        if (inVisiblePhase) {
          appearance += 1
          if (appearance >= APPEARANCE_COUNT) {
            doneRef.current = true
            onCompleteRef.current(gradeByCount(hitsRef.current, APPEARANCE_COUNT, Math.ceil(APPEARANCE_COUNT / 2)))
            return
          }
        }
        inVisiblePhase = !inVisiblePhase
        respondedRef.current = false
        setVisible(inVisiblePhase)
      }
    })
    loop.start()
    return () => {
      unsubscribe()
      loop.stop()
    }
  }, [])

  function handleClick() {
    if (doneRef.current || respondedRef.current || !visible) return
    respondedRef.current = true
    hitsRef.current += 1
    setHits(hitsRef.current)
  }

  return (
    <div className="qte-screen">
      <p>Clique antes dele sumir!</p>
      <div className="qte-ghost-lane">
        {visible && <button className="qte-ghost-target" onClick={handleClick} />}
      </div>
      <p className="qte-count">
        {hits}/{APPEARANCE_COUNT}
      </p>
    </div>
  )
}
