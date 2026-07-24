interface HpBarProps {
  current: number
  max: number
}

export function HpBar({ current, max }: HpBarProps) {
  const percent = max > 0 ? Math.max(0, Math.min(100, (current / max) * 100)) : 0

  return (
    <div className="hp-bar">
      <div className="hp-bar-fill" style={{ width: `${percent}%` }} />
      <span className="hp-bar-label">
        {Math.ceil(current)}/{max}
      </span>
    </div>
  )
}
