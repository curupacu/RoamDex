// Golden Encounter (decisão 0030) — evento de bônus surpresa tipo "golden
// cookie" do Cookie Clicker: um Pokémon raro aparece por alguns segundos,
// clicar a tempo dá uma "Frenzia" temporária (clique e CPS multiplicados).
// Intervalo é ALEATÓRIO de propósito (não fixo como o wildEncounter) —
// reforço de recompensa variável é o que faz o evento surpreender de
// verdade (ver docs/decisoes/0030-*.md, seção de pesquisa).
export const GOLDEN_MIN_INTERVAL_MS = 90_000
export const GOLDEN_MAX_INTERVAL_MS = 240_000
export const GOLDEN_VISIBLE_MS = 12_000

export const FRENZY_BUFF_ID = 'golden-frenzy'
export const FRENZY_DURATION_MS = 30_000
export const FRENZY_MULTIPLIER = 7

export function rollGoldenIntervalMs(): number {
  return GOLDEN_MIN_INTERVAL_MS + Math.random() * (GOLDEN_MAX_INTERVAL_MS - GOLDEN_MIN_INTERVAL_MS)
}
