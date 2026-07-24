import { useRef, useState, type PointerEvent } from 'react'
import { gradeByZone, type QteResult } from '../../../systems/battle/qte/grading'

const FULL_ZONE: [number, number] = [80, 100]
const PARTIAL_ZONE: [number, number] = [40, 100]

// "Arrastar/deslizar pra abrir a fenda no chão" (roadmap section 3).
export function GroundQte({ onComplete }: { onComplete: (result: QteResult) => void }) {
  const [dragPercent, setDragPercent] = useState(0)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const startXRef = useRef<number | null>(null)
  const doneRef = useRef(false)

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (doneRef.current) return
    startXRef.current = event.clientX
    setDragPercent(0)
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (doneRef.current || startXRef.current === null || !trackRef.current) return
    const width = trackRef.current.getBoundingClientRect().width
    const delta = event.clientX - startXRef.current
    setDragPercent(Math.max(0, Math.min(100, (delta / width) * 100)))
  }

  function handlePointerUp() {
    if (doneRef.current || startXRef.current === null) return
    doneRef.current = true
    startXRef.current = null
    onComplete(gradeByZone(dragPercent, FULL_ZONE, PARTIAL_ZONE))
  }

  return (
    <div className="qte-screen">
      <p>Arraste da esquerda pra direita pra abrir a fenda!</p>
      <div
        ref={trackRef}
        className="qte-drag-track"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div className="qte-drag-fill" style={{ width: `${dragPercent}%` }} />
      </div>
    </div>
  )
}
