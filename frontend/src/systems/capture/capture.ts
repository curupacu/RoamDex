// "Chance de captura baseada no capture_rate + bônus (Fada, upgrades)" —
// roadmap section 6. No capture-boosting upgrade exists yet, so today the
// bonus only comes from Fada's team type bonus (economyMultiplier(team,
// 'captureChance'), passed in by the caller).
export function captureChance(captureRate: number, bonusMultiplier: number): number {
  const base = Math.min(0.95, Math.max(0.05, captureRate / 255))
  return Math.min(0.95, base * bonusMultiplier)
}

// "Falhou a bola → o Pokémon foge" — a single roll, no second chance.
export function rollCapture(captureRate: number, bonusMultiplier: number): boolean {
  return Math.random() < captureChance(captureRate, bonusMultiplier)
}
