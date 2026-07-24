import type { CSSProperties } from 'react'
import { TYPE_COLORS, TYPES, type TypeName } from '../../content/types'

export function TypeBadge({ type }: { type: TypeName }) {
  const def = TYPES.find((candidate) => candidate.id === type)
  return (
    <span className="type-badge" style={{ '--type-color': TYPE_COLORS[type] } as CSSProperties}>
      {def?.name ?? type}
    </span>
  )
}
