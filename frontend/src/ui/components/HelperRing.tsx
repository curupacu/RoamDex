import type { CSSProperties } from 'react'

interface HelperRingProps {
  count: number
}

// Anel de Magikarp em volta da Pokébola (pedido do dono do projeto,
// referência: os cursores do Cookie Clicker circulando o cookie). Cada
// cópia de "Ajudante Voluntário" vira um Magikarp bem pequeno, grudado no
// vizinho — feedback: "tem que ser vários magicarpzinho pequeninho bem
// colado um no outro", não umas fileiras espaçadas. Por isso a
// capacidade de cada anel não é um número fixo: é `circunferência /
// espaçamento`, then geometry decides quantos cabem grudados em cada
// raio — anéis mais externos (maiores) cabem mais peixinho, igual o
// Cookie Clicker de verdade. `rotate(angle) translateY(-raio)` gira a
// posição E o elemento juntos ao redor do mesmo ponto, então "baixo" (a
// barriga do sprite parado) sempre aponta pro centro, não importa o
// ângulo, sem precisar de flip extra.
const BASE_RADIUS_PX = 46
const RADIUS_STEP_PX = 14
const SPACING_PX = 14
const MAX_ICONS = 90

function layerCapacity(radius: number): number {
  return Math.max(6, Math.floor((2 * Math.PI * radius) / SPACING_PX))
}

export function HelperRing({ count }: HelperRingProps) {
  if (count <= 0) return null
  const visible = Math.min(count, MAX_ICONS)

  const icons: { angle: number; layer: number }[] = []
  let remaining = visible
  let layer = 0
  while (remaining > 0) {
    const radius = BASE_RADIUS_PX + layer * RADIUS_STEP_PX
    const inThisLayer = Math.min(layerCapacity(radius), remaining)
    for (let i = 0; i < inThisLayer; i++) {
      icons.push({ angle: (360 / inThisLayer) * i, layer })
    }
    remaining -= inThisLayer
    layer += 1
  }

  return (
    <div className="helper-ring" aria-hidden="true">
      {icons.map((icon, i) => {
        const style = {
          '--angle': `${icon.angle}deg`,
          '--layer': icon.layer,
          '--delay': `${(i % 8) * 0.18}s`,
        } as CSSProperties

        return <img key={i} className="helper-ring__icon" src="/sprites/129.png" alt="" style={style} />
      })}
    </div>
  )
}
