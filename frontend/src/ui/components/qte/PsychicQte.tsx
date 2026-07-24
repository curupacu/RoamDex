import { useEffect, useRef, useState } from 'react'
import { gradeByCount, type QteResult } from '../../../systems/battle/qte/grading'

const SYMBOL_COUNT = 4
const SYMBOLS = ['◆', '●', '▲', '■']
const REVEAL_STEP_MS = 500

// "Simon says de 3–5 símbolos" (roadmap section 3).
export function PsychicQte({ onComplete }: { onComplete: (result: QteResult) => void }) {
  const sequenceRef = useRef<number[]>(
    Array.from({ length: SYMBOL_COUNT }, () => Math.floor(Math.random() * SYMBOLS.length)),
  )
  const [revealedCount, setRevealedCount] = useState(0)
  const [phase, setPhase] = useState<'showing' | 'input' | 'done'>('showing')
  const [inputIndex, setInputIndex] = useState(0)
  const [litIndex, setLitIndex] = useState<number | null>(null)
  const correctRef = useRef(0)
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    sequenceRef.current.forEach((_, index) => {
      timers.push(
        setTimeout(() => {
          setRevealedCount(index + 1)
        }, REVEAL_STEP_MS * index),
      )
    })
    timers.push(
      setTimeout(
        () => setPhase('input'),
        REVEAL_STEP_MS * sequenceRef.current.length,
      ),
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  function handleSymbolClick(symbolIndex: number) {
    if (phase !== 'input' || doneRef.current) return

    setLitIndex(symbolIndex)
    setTimeout(() => setLitIndex(null), 150)

    if (symbolIndex === sequenceRef.current[inputIndex]) correctRef.current += 1
    const nextInputIndex = inputIndex + 1
    setInputIndex(nextInputIndex)

    if (nextInputIndex >= sequenceRef.current.length) {
      doneRef.current = true
      setPhase('done')
      onCompleteRef.current(gradeByCount(correctRef.current, SYMBOL_COUNT, Math.ceil(SYMBOL_COUNT / 2)))
    }
  }

  return (
    <div className="qte-screen">
      <p>{phase === 'showing' ? 'Memorize a sequência!' : 'Repita a sequência!'}</p>
      <div className="qte-simon-sequence">
        {phase === 'showing' &&
          sequenceRef.current.slice(0, revealedCount).map((symbolIndex, i) => <span key={i}>{SYMBOLS[symbolIndex]}</span>)}
      </div>
      <div className="qte-simon-buttons">
        {SYMBOLS.map((symbol, index) => (
          <button
            key={index}
            className={`qte-simon-button${litIndex === index ? ' qte-simon-button--lit' : ''}`}
            onClick={() => handleSymbolClick(index)}
            disabled={phase !== 'input'}
          >
            {symbol}
          </button>
        ))}
      </div>
    </div>
  )
}
