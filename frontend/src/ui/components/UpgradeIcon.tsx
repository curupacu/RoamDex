import { useState, type CSSProperties } from 'react'

interface UpgradeIconProps {
  id: string
  alt: string
  className?: string
  style?: CSSProperties
}

// Tenta .png primeiro, cai pra .gif se não existir, esconde de vez se
// nenhum dos dois existir (decisão 0028/0030/0031) — assim tanto arte
// estática quanto animada funciona com a mesma convenção de nome
// (frontend/public/icons/upgrades/{id}.png ou .gif), sem o código
// precisar saber de antemão qual delas o dono do projeto vai usar.
export function UpgradeIcon({ id, alt, className, style }: UpgradeIconProps) {
  const [ext, setExt] = useState<'png' | 'gif' | null>('png')
  if (!ext) return null

  return (
    <img
      src={`/icons/upgrades/${id}.${ext}`}
      alt={alt}
      className={className}
      style={style}
      onError={() => setExt((current) => (current === 'png' ? 'gif' : null))}
    />
  )
}
