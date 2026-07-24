import { useEffect, useRef, useState } from 'react'
import { gradeByCount, type QteResult } from '../../../systems/battle/qte/grading'

const STAR_COUNT = 3
const REVEAL_STEP_MS = 500

function shuffledOrder(count: number): number[] {
  const order = Array.from({ length: count }, (_, i) => i)
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

// "Traçar/clicar 3 estrelas na ordem certa" (roadmap section 3). Stars sit
// at 3 fixed positions; `order` is which position to click 1st/2nd/3rd.
export function FairyQte({ onComplete }: { onComplete: (result: QteResult) => void }) {
  const orderRef = useRef(shuffledOrder(STAR_COUNT))
  const [phase, setPhase] = useState<'showing' | 'input'>('showing')
  const [revealStep, setRevealStep] = useState(-1)
  const [litPosition, setLitPosition] = useState<number | null>(null)
  const inputIndexRef = useRef(0)
  const correctRef = useRef(0)
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    for (let step = 0; step < STAR_COUNT; step++) {
      timers.push(setTimeout(() => setRevealStep(step), REVEAL_STEP_MS * step))
    }
    timers.push(setTimeout(() => setPhase('input'), REVEAL_STEP_MS * STAR_COUNT))
    return () => timers.forEach(clearTimeout)
  }, [])

  function handleStarClick(position: number) {
    if (phase !== 'input' || doneRef.current) return

    setLitPosition(position)
    setTimeout(() => setLitPosition(null), 150)

    if (position === orderRef.current[inputIndexRef.current]) correctRef.current += 1
    inputIndexRef.current += 1

    if (inputIndexRef.current >= STAR_COUNT) {
      doneRef.current = true
      onCompleteRef.current(gradeByCount(correctRef.current, STAR_COUNT, Math.ceil(STAR_COUNT / 2)))
    }
  }

  return (
    <div className="qte-screen">
      <p>{phase === 'showing' ? 'Memorize a ordem!' : 'Clique as estrelas na ordem certa!'}</p>
      <div className="qte-star-row">
        {Array.from({ length: STAR_COUNT }, (_, position) => {
          const sequenceNumber = orderRef.current.indexOf(position) + 1
          const showLabel = phase === 'showing' && orderRef.current[revealStep] === position
          return (
            <button
              key={position}
              className={`qte-star${litPosition === position ? ' qte-star--lit' : ''}`}
              onClick={() => handleStarClick(position)}
              disabled={phase !== 'input'}
            >
              {showLabel ? sequenceNumber : '★'}
            </button>
          )
        })}
      </div>
    </div>
  )
}
