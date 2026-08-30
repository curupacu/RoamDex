import { useEffect, useRef, useState, type CSSProperties } from 'react'

interface HelperRingProps {
  count: number
}

// Anel de Magikarp em volta da Pokébola (pedido do dono do projeto,
// referência: os cursores do Cookie Clicker circulando o cookie). Cada
// cópia de "Ajudante Voluntário" vira um Magikarp bem pequeno, grudado no
// vizinho.
//
// Feedback que gerou a versão atual: com o raio calculado a partir de uma
// constante fixa em JS (só uma aproximação do clamp()/vw usado no CSS),
// o raio DE VERDADE renderizado variava com o tamanho da tela — e como a
// capacidade de cada anel (quantos peixinhos cabem grudados) era
// calculada em cima do raio aproximado, os peixinhos apareciam espalhados
// com vão entre eles em vez de colados, sempre que o raio real ficava
// maior que o assumido. Por isso agora o raio da bola é MEDIDO de
// verdade via ResizeObserver (não estimado) — captura o próprio
// `.click-ball` irmão no DOM — e tudo (raio base, tamanho do ícone,
// incremento por anel, espaçamento) deriva dessa medida real, então a
// geometria bate com o que está na tela em qualquer resolução.
//
// Os ícones NÃO giram mais (feedback: o Magikarp é um sprite comprido e
// assimétrico — rabo grande de um lado, bigode do outro — então girar
// ele pra "barriga sempre pro centro" deixava ele com uma cara estranha
// de teia/asa em vários ângulos, especialmente pequeno). Cada um fica
// sempre na mesma orientação (a do sprite original); só a posição no
// círculo (via seno/cosseno) muda por ângulo.
//
// Feedback: comprando mais rápido, o 2º anel "bugava" — virava um
// espiral em vez de círculo. Causa: a posição ia dentro de uma
// `@keyframes` via `var(--x)/var(--y)`, e como cada compra muda quantos
// ícones cabem em cada anel, o React reatribui --x/--y pros MESMOS nós
// do DOM (mesma `key`), mas a animação JÁ RODANDO não recalculava os
// keyframes com o valor novo direito — alguns ícones ficavam animando
// pra uma posição "fantasma" de antes da compra. Fix: a posição agora é
// um `transform: translate(...)` normal (recalculado no render, nunca
// animado), e a "barrigada" vira só um pulso de `scale` — não depende de
// x/y, então não tem valor nenhum pra ficar dessincronizado.
const MAX_ICONS = 90

function layerCapacity(radius: number, spacing: number): number {
  return Math.max(6, Math.floor((2 * Math.PI * radius) / spacing))
}

export function HelperRing({ count }: HelperRingProps) {
  const anchorRef = useRef<HTMLDivElement>(null)
  const [ballRadius, setBallRadius] = useState<number | null>(null)

  useEffect(() => {
    const ball = anchorRef.current?.parentElement?.querySelector<HTMLElement>('.click-ball')
    if (!ball) return
    const update = () => setBallRadius(ball.getBoundingClientRect().width / 2)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(ball)
    return () => observer.disconnect()
  }, [])

  if (count <= 0 || !ballRadius) return <div ref={anchorRef} className="helper-ring" aria-hidden="true" />

  const visible = Math.min(count, MAX_ICONS)
  const iconSize = ballRadius * 0.26
  const spacing = iconSize * 0.85 // < iconSize de propósito: fica meio sobreposto, "colado", não só encostando
  const radiusStep = iconSize * 1.05
  const baseRadius = ballRadius + iconSize * 0.6 // folga real acima da borda da bola, nunca por cima dela

  const icons: { angle: number; layer: number }[] = []
  let remaining = visible
  let layer = 0
  while (remaining > 0) {
    const radius = baseRadius + layer * radiusStep
    const inThisLayer = Math.min(layerCapacity(radius, spacing), remaining)
    for (let i = 0; i < inThisLayer; i++) {
      icons.push({ angle: (360 / inThisLayer) * i, layer })
    }
    remaining -= inThisLayer
    layer += 1
  }

  return (
    <div ref={anchorRef} className="helper-ring" aria-hidden="true">
      {icons.map((icon, i) => {
        const radius = baseRadius + icon.layer * radiusStep
        const rad = (icon.angle * Math.PI) / 180
        const x = radius * Math.sin(rad)
        const y = -radius * Math.cos(rad)
        const style = {
          transform: `translate(${x}px, ${y}px)`,
          '--delay': `${(i % 8) * 0.18}s`,
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          marginLeft: `${-iconSize / 2}px`,
          marginTop: `${-iconSize / 2}px`,
        } as CSSProperties

        return <img key={i} className="helper-ring__icon" src="/sprites/129.png" alt="" style={style} />
      })}
    </div>
  )
}
