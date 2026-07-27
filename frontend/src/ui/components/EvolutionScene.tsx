import { useEffect, useRef, useState } from 'react'
import type { SpeciesEntry } from '../../content/gen1/types'

interface EvolutionSceneProps {
  fromSpecies: SpeciesEntry
  toSpecies: SpeciesEntry
  onDone: () => void
}

type Phase = 'enter' | 'flash' | 'reveal' | 'hold' | 'exit'

const ENTER_MS = 500
const FLASH_MS = 900
const REVEAL_MS = 700
const HOLD_MS = 1300
const EXIT_MS = 450

// Tela cheia de evolução (pedido do dono do projeto, referência direta aos
// jogos oficiais): silhueta em preto e branco (filtro CSS em cima do sprite
// normal já existente, sem asset novo) -> fundo dá um flash -> crossfade pra
// o sprite colorido da forma evoluída -> segura um instante -> fecha. App.tsx
// só monta isso enquanto há uma evolução na fila (evolutionQueue) e desmonta
// via onDone, que avança pro próximo item da fila se houver mais de um
// (várias evoluções de um só tick idle, por exemplo).
export function EvolutionScene({ fromSpecies, toSpecies, onDone }: EvolutionSceneProps) {
  const [phase, setPhase] = useState<Phase>('enter')
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    const timeouts = [
      window.setTimeout(() => setPhase('flash'), ENTER_MS),
      window.setTimeout(() => setPhase('reveal'), ENTER_MS + FLASH_MS),
      window.setTimeout(() => setPhase('hold'), ENTER_MS + FLASH_MS + REVEAL_MS),
      window.setTimeout(() => setPhase('exit'), ENTER_MS + FLASH_MS + REVEAL_MS + HOLD_MS),
      window.setTimeout(() => onDoneRef.current(), ENTER_MS + FLASH_MS + REVEAL_MS + HOLD_MS + EXIT_MS),
    ]
    return () => timeouts.forEach((id) => window.clearTimeout(id))
  }, [])

  const revealed = phase === 'reveal' || phase === 'hold' || phase === 'exit'

  return (
    <div
      className={`evolution-overlay${phase === 'enter' ? ' evolution-overlay--enter' : ''}${
        phase === 'exit' ? ' evolution-overlay--exit' : ''
      }`}
    >
      <div className={`evolution-flash${phase === 'flash' ? ' evolution-flash--active' : ''}`} />
      <div className="evolution-stage">
        <img
          src={fromSpecies.sprite.local}
          alt=""
          className={`evolution-sprite evolution-sprite--silhouette${phase === 'flash' ? ' evolution-sprite--pulsing' : ''}${
            revealed ? ' evolution-sprite--hidden' : ''
          }`}
        />
        <img
          src={toSpecies.sprite.local}
          alt={toSpecies.name}
          className={`evolution-sprite evolution-sprite--evolved${revealed ? ' evolution-sprite--visible' : ''}`}
        />
      </div>
      <p className={`evolution-caption${revealed ? ' evolution-caption--visible' : ''}`}>
        {fromSpecies.name} evoluiu para {toSpecies.name}!
      </p>
    </div>
  )
}
