import type { CSSProperties } from 'react'

interface HelperRingProps {
  count: number
}

// Anel de Magikarp em volta da Pokébola (pedido do dono do projeto,
// referência: os cursores do Cookie Clicker circulando o cookie). Cada
// cópia de "Ajudante Voluntário" (volunteer-helper, agora o mesmo id/ícone
// em toda região) vira um Magikarp na borda, sempre virado de barriga pra
// bola — o truque de CSS é `rotate(angle) translateY(-raio)`: como o
// rotate roda a posição E o elemento juntos ao redor do mesmo ponto,
// "baixo" (a barriga, no sprite parado) sempre aponta pro centro, não
// importa o ângulo. De tempos em tempos cada um dá uma "barrigada" (lunge
// pra dentro + escala) na bola, com atraso escalonado por índice pra não
// animar tudo em sincronia. Acima de RING_CAPACITY, sobra pra um anel mais
// externo (mesma ideia do Cookie Clicker quando os cursores lotam o
// primeiro anel); MAX_ICONS limita quantos <img> renderizar de verdade —
// só decorativo, não precisa desenhar todos os 100+ possuídos.
const RING_CAPACITY = 12
const MAX_ICONS = 60

export function HelperRing({ count }: HelperRingProps) {
  if (count <= 0) return null
  const visible = Math.min(count, MAX_ICONS)

  return (
    <div className="helper-ring" aria-hidden="true">
      {Array.from({ length: visible }, (_, i) => {
        const layer = Math.floor(i / RING_CAPACITY)
        const indexInLayer = i % RING_CAPACITY
        const countInLayer = Math.min(RING_CAPACITY, visible - layer * RING_CAPACITY)
        const angle = (360 / countInLayer) * indexInLayer
        const style = {
          '--angle': `${angle}deg`,
          '--layer': layer,
          '--delay': `${(i % 8) * 0.18}s`,
        } as CSSProperties

        return <img key={i} className="helper-ring__icon" src="/sprites/129.png" alt="" style={style} />
      })}
    </div>
  )
}
