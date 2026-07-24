// "QTE bem executado = golpe com dano cheio + bônus; QTE mediano = dano
// parcial; falhou = golpe fraco. Nunca é punição além disso." — roadmap
// section 3. "weak" still deals real damage, same floor as a basic hit.
export type QteResult = 'full' | 'partial' | 'weak'

// Provisional — Sprint 25 ("Balanceamento") tunes these.
export const QTE_RESULT_MULTIPLIER: Record<QteResult, number> = {
  full: 2.5,
  partial: 1.6,
  weak: 1,
}

export function gradeByZone(value: number, fullZone: [number, number], partialZone: [number, number]): QteResult {
  if (value >= fullZone[0] && value <= fullZone[1]) return 'full'
  if (value >= partialZone[0] && value <= partialZone[1]) return 'partial'
  return 'weak'
}

export function gradeByCount(count: number, fullAt: number, partialAt: number): QteResult {
  if (count >= fullAt) return 'full'
  if (count >= partialAt) return 'partial'
  return 'weak'
}

export function gradeByOffset(offsetMs: number, fullWithinMs: number, partialWithinMs: number): QteResult {
  if (offsetMs <= fullWithinMs) return 'full'
  if (offsetMs <= partialWithinMs) return 'partial'
  return 'weak'
}
