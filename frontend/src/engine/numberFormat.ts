const SUFFIXES = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc']
const MAX_TIER = SUFFIXES.length - 1 // Dc = 10^33; beyond this, scientific notation

function trimTrailingZeros(fixed: string): string {
  const [mantissa, exponent] = fixed.split('e')
  const trimmed = mantissa.includes('.') ? mantissa.replace(/0+$/, '').replace(/\.$/, '') : mantissa
  return exponent === undefined ? trimmed : `${trimmed}e${exponent}`
}

// Formats idle-game-scale numbers: plain below 1000, K/M/B/... suffixes up
// to Dc (10^33), then scientific notation beyond that.
export function formatBigNumber(value: number, decimals = 2): string {
  if (Number.isNaN(value)) return 'NaN'
  if (!Number.isFinite(value)) return value > 0 ? '∞' : '-∞'

  const sign = value < 0 ? '-' : ''
  const abs = Math.abs(value)

  if (abs < 1000) {
    return sign + trimTrailingZeros(abs.toFixed(Number.isInteger(abs) ? 0 : decimals))
  }

  let tier = Math.min(Math.floor(Math.log10(abs) / 3), MAX_TIER)
  let scaled = abs / 1000 ** tier

  // Rounding (e.g. 999.999 -> "1000.00") can spill into the next tier.
  if (Number(scaled.toFixed(decimals)) >= 1000 && tier < MAX_TIER) {
    tier++
    scaled = abs / 1000 ** tier
  }

  if (tier >= MAX_TIER && scaled >= 1000) {
    return sign + trimTrailingZeros(abs.toExponential(decimals).replace('e+', 'e'))
  }

  return sign + trimTrailingZeros(scaled.toFixed(decimals)) + SUFFIXES[tier]
}
