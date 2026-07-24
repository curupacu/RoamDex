import { useEffect, useRef, useState } from 'react'
import { GameLoop } from '../../../engine/gameLoop'
import { gradeByCount, type QteResult } from '../../../systems/battle/qte/grading'

const PROMPT_COUNT = 6
const PROMPT_WINDOW_MS = 700

function expectedSide(index: number): 'left' | 'right' {
  return index % 2 === 0 ? 'left' : 'right'
}

// "Combo alternado: esquerda-direita-esquerda..." (roadmap section 3).
export function FightingQte({ onComplete }: { onComplete: (result: QteResult) => void }) {
  const [promptIndex, setPromptIndex] = useState(0)
  const correctRef = useRef(0)
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
      if (msInWindow < PROMPT_WINDOW_MS) return

      msInWindow = 0
      index += 1
      if (index >= PROMPT_COUNT) {
        doneRef.current = true
        onCompleteRef.current(gradeByCount(correctRef.current, PROMPT_COUNT, Math.ceil(PROMPT_COUNT / 2)))
        return
      }
      respondedRef.current = false
      setPromptIndex(index)
    })
    loop.start()
    return () => {
      unsubscribe()
      loop.stop()
    }
  }, [])

  function handlePress(side: 'left' | 'right') {
    if (doneRef.current || respondedRef.current) return
    respondedRef.current = true
    if (side === expectedSide(promptIndex)) correctRef.current += 1
  }

  return (
    <div className="qte-screen">
      <p>Alterne esquerda/direita no ritmo certo!</p>
      <p className="qte-combo-prompt">{expectedSide(promptIndex) === 'left' ? '⬅ Esquerda' : 'Direita ➡'}</p>
      <div className="qte-combo-buttons">
        <button onClick={() => handlePress('left')}>Esquerda</button>
        <button onClick={() => handlePress('right')}>Direita</button>
      </div>
    </div>
  )
}
