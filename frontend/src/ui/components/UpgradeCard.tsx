import type { ReactNode } from 'react'

interface UpgradeCardProps {
  name: string
  effectLabel: string
  flavor?: string
  earnedLabel?: string
  className?: string
  children: ReactNode
}

// Custom hover card (decisão do dono do projeto: nativo `title` "tá meio
// feio") — pura CSS (:hover revela `.upgrade-hover-card`), sem estado React,
// pra não precisar de handler de mouse por item numa lista que pode ter
// dezenas deles. Usa uma tipografia legível (não a pixel-font do resto do
// jogo) só aqui dentro, pra ficar fácil de ler texto mais longo.
export function UpgradeCard({ name, effectLabel, flavor, earnedLabel, className, children }: UpgradeCardProps) {
  return (
    <div className={`upgrade-hover-wrap${className ? ` ${className}` : ''}`}>
      {children}
      <div className="upgrade-hover-card">
        <strong className="upgrade-hover-card-name">{name}</strong>
        <p className="upgrade-hover-card-effect">{effectLabel}</p>
        {flavor && <p className="upgrade-hover-card-flavor">&ldquo;{flavor}&rdquo;</p>}
        {earnedLabel && <p className="upgrade-hover-card-earned">{earnedLabel}</p>}
      </div>
    </div>
  )
}
