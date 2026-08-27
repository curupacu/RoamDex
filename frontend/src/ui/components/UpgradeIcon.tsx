import { useState, type CSSProperties } from 'react'

interface UpgradeIconProps {
  id: string
  alt: string
  className?: string
  style?: CSSProperties
}

// Tenta .png primeiro, cai pra .gif se não existir. Achado revisando as
// telas: só Kanto (gen1) tem arte própria pra cada upgrade — Johto até
// Unova têm dezenas de ids sem nenhum arquivo em
// frontend/public/icons/upgrades/, então as faixas de prédio dessas
// regiões renderizavam vazias (nenhum ícone, mas a contagem tava certa).
// Em vez de esconder (`return null`), cai numa pokébola genérica: garante
// que toda faixa sempre tem ALGO visível representando a quantidade
// possuída, sem depender de arte nova por região/upgrade.
const FALLBACK_SRC = '/items/poke-ball.png'

export function UpgradeIcon({ id, alt, className, style }: UpgradeIconProps) {
  const [stage, setStage] = useState<'png' | 'gif' | 'fallback'>('png')
  const src = stage === 'fallback' ? FALLBACK_SRC : `/icons/upgrades/${id}.${stage}`

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setStage((current) => (current === 'png' ? 'gif' : 'fallback'))}
    />
  )
}
